// Copyright (c) 2021 SK Telecom, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import Layer, {colorMaker} from '../base-layer';
import {GeoJsonLayer as DeckGLGeoJsonLayer} from '@deck.gl/layers';
import {getGeojsonDataMaps, getGeojsonBounds, getValueAggrFunc} from './sk-utils';
import {
  SK_FIELDS,
  HIGHLIGH_COLOR_3D,
  CHANNEL_SCALES,
  FIELD_OPTS,
  DEFAULT_AGGREGATION,
  AGGREGATION_TYPES
} from 'constants/default-settings';
import {LAYER_VIS_CONFIGS} from 'layers/layer-factory';
import {createIndexedDataContainer} from 'utils/table-utils/data-container-utils.js';

import SkLayerIcon from './sk-layer-icon';

export const SkVisConfigs = {
  filled: 'filled',
  colorRange: 'colorRange',
  opacity: 'opacity',
  colorAggregation: 'aggregation',
  
  stroked: 'stroked',
  strokeColor: 'strokeColor',
  strokeColorRange: 'strokeColorRange',
  strokeOpacity: {
    ...LAYER_VIS_CONFIGS.opacity,
    property: 'strokeOpacity'
  },
  thickness: {
    ...LAYER_VIS_CONFIGS.thickness,
    defaultValue: 0.5,
    range: [0, 2]
  },

  sizeRange: 'elevationRange',
  sizeAggregation: 'aggregation',
  elevationScale: 'elevationScale',
  enableElevationZoomFactor: 'enableElevationZoomFactor',
  enable3d: 'enable3d',
  wireframe: 'wireframe'
};

export const skRequiredColumns = ['code'];
export const skColumnLabels = {
  code: 'sk.code'
};
export const codeAccessor = ({code}) => dc => d => dc.valueAt(d.index, code.fieldIdx);

export default class SkLayer extends Layer {
  constructor(props) {
    super(props);

    this.codeToData = {};
    this.dataToFeature = [];
    this.filteredIndexLength = 0;
    this.registerVisConfig(SkVisConfigs);
    this.getPositionAccessor = dataContainer => codeAccessor(this.config.columns)(dataContainer);
  }

  get type() {
    return 'sk';
  }

  get name() {
    return 'SK';
  }

  get layerIcon() {
    return SkLayerIcon;
  }
  
  get requiredLayerColumns() {
    return skRequiredColumns;
  }

  get columnLabels() {
    return skColumnLabels;
  }

  get noneLayerDataAffectingProps() {
    return ['label', 'opacity', 'thickness', 'isVisible', 'hidden', 'colorRange', 'colorDomain'];
  }

  get visualChannels() {
    const visualChannels = super.visualChannels;
    return {
      color: {
        ...visualChannels.color,
        accessor: 'getFillColor',
        condition: config => config.colorField,
        getAttributeValue: config => config.color,
        aggregation: 'colorAggregation',
        channelScaleType: CHANNEL_SCALES.colorAggr
        // defaultMeasure: 'property.pointCount'
      },
      strokeColor: {
        key: 'strokeColor',
        property: 'strokeColor',
        field: 'strokeColorField',
        scale: 'strokeColorScale',
        domain: 'strokeColorDomain',
        range: 'strokeColorRange',
        channelScaleType: CHANNEL_SCALES.color,
        accessor: 'getLineColor',
        nullValue: visualChannels.color.nullValue,
        getAttributeValue: config => config.visConfig.strokeColor || config.color,
        // used this to get updateTriggers
        defaultValue: config => config.visConfig.strokeColor || config.color
      },
      size: {
        ...visualChannels.size,
        aggregation: 'sizeAggregation',
        channelScaleType: CHANNEL_SCALES.sizeAggr,
        condition: config => config.sizeField,
        accessor: 'getElevation'
        // defaultMeasure: 'property.pointCount'
      }
    };   
  }

  static findDefaultLayerProps({label, fields = []}) {
    const defaultColumns = {
      ...SK_FIELDS
    };

    const foundColumns = this.findDefaultColumnField(defaultColumns, fields);
    if (!foundColumns || !foundColumns.length) {
      return {props: []};
    }

    return {
      props: foundColumns.map(columns => ({
        label: (typeof label === 'string' && label.replace(/\.[^/.]+$/, '')) || this.type,
        columns,
        isVisible: true
      }))
    };
  }

  getDefaultLayerConfig(props = {}) {
    return {
      ...super.getDefaultLayerConfig(props),

      colorScale: AGGREGATION_TYPES.count,
      sizeScale: AGGREGATION_TYPES.count,
      // add stroke color visual channel
      strokeColorField: null,
      strokeColorDomain: [0, 1],
      strokeColorScale: 'quantile'
    };
  }

  getHoverData(object, dataContainer) {
    // index of dataContainer is saved to feature.properties.filteredIndex
    const indexLength = object.properties.filteredIndex.length;
    if (indexLength > 1) {
      return createIndexedDataContainer(dataContainer, object.properties.filteredIndex.map(i => i.index));
    } else if (indexLength == 1) {
      return dataContainer.row(object.properties.filteredIndex[0].index);
    }

    return null;
  }

  /**
   * Validate aggregation type on top of basic layer visual channel validation
   * @param channel
   */
  validateVisualChannel(channel) {
    // field type decides aggregation type decides scale type
    this.validateFieldType(channel);
    this.validateAggregationType(channel);
    this.validateScale(channel);
  }

  /**
   * Validate aggregation type based on selected field
   */
  validateAggregationType(channel) {
    const visualChannel = this.visualChannels[channel];
    const {field, aggregation} = visualChannel;
    
    if (!aggregation) {
      return;
    }

    const aggregationOptions = this.getAggregationOptions(channel);

    if (!aggregationOptions.length) {
      // if field cannot be aggregated, set field to null
      this.updateLayerConfig({[field]: null});
    } else if (!aggregationOptions.includes(this.config.visConfig[aggregation])) {
      // current aggregation type is not supported by this field
      // set aggregation to the first supported option
      this.updateLayerVisConfig({[aggregation]: aggregationOptions[0]});
    }
  }

  getAggregationOptions(channel) {
    const visualChannel = this.visualChannels[channel];
    const {field, channelScaleType} = visualChannel;
    
    return Object.keys(
      this.config[field]
        ? FIELD_OPTS[this.config[field].type].scale[channelScaleType]
        : DEFAULT_AGGREGATION[channelScaleType]
    );
  }

  /**
   * Get scale options based on current field and aggregation type
   * @param {string} channel
   * @returns {string[]}
   */
  getScaleOptions(channel) {
    const visualChannel = this.visualChannels[channel];
    const {field, scale, aggregation, channelScaleType} = visualChannel;
    const aggregationType = this.config.visConfig[aggregation];
    if (aggregation) {
      return this.config[field]
        ? // scale options based on aggregation
          FIELD_OPTS[this.config[field].type].scale[channelScaleType][aggregationType]
        : // default scale options for count
          DEFAULT_AGGREGATION[channelScaleType][AGGREGATION_TYPES.count];
    } else {
      return this.config[field]
        ? FIELD_OPTS[this.config[field].type].scale[channelScaleType]
        : [this.getDefaultLayerConfig()[scale]];
    }
  }

  calculateDataAttribute({dataContainer, filteredIndex}, getPosition) {
    if (!this.dataToFeature)
      return null;

    for (let i = 0; i < this.dataToFeature.length; i++) {
      this.dataToFeature[i].properties.filteredIndex = [];
    }

    let code, index;
    const getCode = this.getPositionAccessor(dataContainer);
    this.filteredIndexLength = filteredIndex.length
    for (let i = 0; i < filteredIndex.length; i++) {
      index = filteredIndex[i];
      code = getCode({index});
      this.dataToFeature[this.codeToData[code]].properties.filteredIndex.push({index});
    }

    return this.dataToFeature;
  }

  formatLayerData(datasets, oldLayerData) {
    const {gpuFilter, dataContainer} = datasets[this.config.dataId];

    const {data} = this.updateData(datasets, oldLayerData);

    const indexAccessor = f => (f.properties.filteredIndex.length ? f.properties.filteredIndex.map(fi => fi.index) : null);
    const customFilterValueAccessor = (dc, d, fieldIndex) => {
      return d.properties.filteredIndex.length ?
        d.properties.filteredIndex.map(f => dc.valueAt(f.index, fieldIndex))
        : null ;
    };
    // const indexAccessor = f => (f.properties.filteredIndex.length ? f.properties.filteredIndex[0].index : null);
    // const customFilterValueAccessor = (dc, d, fieldIndex) => {
    //   return d.properties.filteredIndex.length ?
    //     dc.valueAt(d.properties.filteredIndex[0].index, fieldIndex)
    //     : null ;
    // };

    const dataAccessor = dc => d => (d.properties.filteredIndex.length ? {index: d.properties.filteredIndex[0].index} : null);
    const accessors = this.getAttributeAccessors({dataAccessor, dataContainer});

    return {
      data,
      getFilterValue: gpuFilter.filterValueAccessor(dataContainer)(
        indexAccessor,
        customFilterValueAccessor
      ),
      ...accessors
    };
  }

  getAttributeAccessors({dataAccessor = defaultDataAccessor, dataContainer}) {
    const attributeAccessors = {};

    Object.keys(this.visualChannels).forEach(channel => {
      const {
        field,
        fixed,
        scale,
        domain,
        range,
        accessor,
        defaultValue,
        getAttributeValue,
        nullValue,
        channelScaleType,
        aggregation
      } = this.visualChannels[channel];

      const shouldGetScale = this.config[field];

      if (shouldGetScale) {
        const args = [this.config[scale], this.config[domain], this.config.visConfig[range]];
        const isFixed = fixed && this.config.visConfig[fixed];

        const scaleFunction =
          (channelScaleType === CHANNEL_SCALES.color) || (channelScaleType === CHANNEL_SCALES.colorAggr)
            ? this.getColorScale(...args)
            : this.getVisChannelScale(...args, isFixed);

        if ((channelScaleType === CHANNEL_SCALES.colorAggr) || (channelScaleType === CHANNEL_SCALES.sizeAggr)) {
          attributeAccessors[accessor] = d => 
            scaleFunction(
              getValueAggrFunc(this.config[field], this.config.visConfig[aggregation], args[1][0])(d)
            );
        } else {
          attributeAccessors[accessor] = d =>
            this.getEncodedChannelValue(
              scaleFunction,
              dataAccessor(dataContainer)(d),
              this.config[field],
              nullValue
            );
        }
      } else if (typeof getAttributeValue === 'function') {
        attributeAccessors[accessor] = getAttributeValue(this.config);
      } else {
        attributeAccessors[accessor] =
          typeof defaultValue === 'function' ? defaultValue(this.config) : defaultValue;
      }

      if (!attributeAccessors[accessor]) {
        Console.warn(`Failed to provide accessor function for ${accessor || channel}`);
      }
    });

    return attributeAccessors;
  }

  updateLayerMeta(dataContainer) {
    const getCode = this.getPositionAccessor(dataContainer);
    [this.dataToFeature, this.codeToData] = getGeojsonDataMaps(dataContainer, getCode);
    
    if (!this.dataToFeature) {
      return;
    }

    // get bounds from features
    const bounds = getGeojsonBounds(this.dataToFeature);
    
    // sk layer is always polygon
    const featureTypes = {polygon: true};

    this.updateMeta({bounds, featureTypes});
  }

  setInitialLayerConfig({dataContainer}) {
    this.updateLayerMeta(dataContainer);

    // set both fill and stroke to true
    return this.updateLayerVisConfig({
      filled: true,
      stroked: true,
      strokeColor: colorMaker.next().value
    });
  }
  
  renderLayer(opts) {
    const {data, gpuFilter, objectHovered, mapState, interactionConfig} = opts;
    
    const {featureTypes} = this.meta;
    const zoomFactor = this.getZoomFactor(mapState);
    const eleZoomFactor = this.getElevationZoomFactor(mapState);

    const {visConfig} = this.config;

    const layerProps = {
      lineWidthScale: visConfig.thickness * zoomFactor * 8,
      elevationScale: visConfig.elevationScale * eleZoomFactor,
      lineMiterLimit: 2
    };

    const updateTriggers = {
      ...this.getVisualChannelUpdateTriggers(),
      getFilterValue: gpuFilter.filterValueUpdateTriggers,
      getFillColor: {
        colorField: this.config.colorField,
        colorAggregation: visConfig.colorAggregation,
        filteredIndexLength: this.filteredIndexLength
      },
      getElevation: {
        sizeField: this.config.sizeField,
        sizeAggregation: this.config.visConfig.sizeAggregation
      }
    };

    const defaultLayerProps = this.getDefaultDeckLayerProps(opts);
    const opaOverwrite = {
      opacity: visConfig.strokeOpacity
    };

    const pickable = interactionConfig.tooltip.enabled;
    const hoveredObject = this.hasHoveredObject(objectHovered);
    
    return [
      new DeckGLGeoJsonLayer({
        ...defaultLayerProps,
        ...layerProps,
        
        ...data,

        filled: visConfig.filled,
        stroked: visConfig.stroked,
        extruded: visConfig.enable3d,
        wireframe: visConfig.wireframe,
        
        pickable,
        highlightColor: HIGHLIGH_COLOR_3D,
        autoHighlight: visConfig.enable3d && pickable,
        wrapLongitude: false,
        rounded: true,

        updateTriggers,

        _subLayerProps: {
          ...(featureTypes.polygon ? {'polygons-stroke': opaOverwrite} : {}),
          ...(featureTypes.line ? {'line-strings': opaOverwrite} : {}),
          ...(featureTypes.point
            ? {
                points: {
                  lineOpacity: visConfig.strokeOpacity
                }
              }
            : {})
        }
      }),
      ...(hoveredObject && !visConfig.enable3d
        ? [
            new DeckGLGeoJsonLayer({
              ...this.getDefaultHoverLayerProps(),
              ...layerProps,
              wrapLongitude: false,
              data: [hoveredObject],
              getElevation: data.getElevation,
              getLineColor: this.config.highlightColor,
              getFillColor: this.config.highlightColor,
              // always draw outline
              stroked: true,
              filled: false
            })
          ]
        : [])
    ];
  }
}
