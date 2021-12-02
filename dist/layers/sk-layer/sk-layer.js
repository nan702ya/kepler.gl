"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.codeAccessor = exports.skColumnLabels = exports.skRequiredColumns = exports.SkVisConfigs = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _baseLayer = _interopRequireWildcard(require("../base-layer"));

var _layers = require("@deck.gl/layers");

var _skUtils = require("./sk-utils");

var _defaultSettings = require("../../constants/default-settings");

var _layerFactory = require("../layer-factory");

var _dataContainerUtils = require("../../utils/table-utils/data-container-utils.js");

var _skLayerIcon = _interopRequireDefault(require("./sk-layer-icon"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var SkVisConfigs = {
  filled: 'filled',
  colorRange: 'colorRange',
  opacity: 'opacity',
  colorAggregation: 'aggregation',
  stroked: 'stroked',
  strokeColor: 'strokeColor',
  strokeColorRange: 'strokeColorRange',
  strokeOpacity: _objectSpread(_objectSpread({}, _layerFactory.LAYER_VIS_CONFIGS.opacity), {}, {
    property: 'strokeOpacity'
  }),
  thickness: _objectSpread(_objectSpread({}, _layerFactory.LAYER_VIS_CONFIGS.thickness), {}, {
    defaultValue: 0.5,
    range: [0, 2]
  }),
  sizeRange: 'elevationRange',
  sizeAggregation: 'aggregation',
  elevationScale: 'elevationScale',
  enableElevationZoomFactor: 'enableElevationZoomFactor',
  enable3d: 'enable3d',
  wireframe: 'wireframe'
};
exports.SkVisConfigs = SkVisConfigs;
var skRequiredColumns = ['code'];
exports.skRequiredColumns = skRequiredColumns;
var skColumnLabels = {
  code: 'sk.code'
};
exports.skColumnLabels = skColumnLabels;

var codeAccessor = function codeAccessor(_ref) {
  var code = _ref.code;
  return function (dc) {
    return function (d) {
      return dc.valueAt(d.index, code.fieldIdx);
    };
  };
};

exports.codeAccessor = codeAccessor;

var SkLayer = /*#__PURE__*/function (_Layer) {
  (0, _inherits2["default"])(SkLayer, _Layer);

  var _super = _createSuper(SkLayer);

  function SkLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, SkLayer);
    _this = _super.call(this, props);
    _this.codeToData = {};
    _this.dataToFeature = [];
    _this.filteredIndexLength = 0;

    _this.registerVisConfig(SkVisConfigs);

    _this.getPositionAccessor = function (dataContainer) {
      return codeAccessor(_this.config.columns)(dataContainer);
    };

    return _this;
  }

  (0, _createClass2["default"])(SkLayer, [{
    key: "type",
    get: function get() {
      return 'sk';
    }
  }, {
    key: "name",
    get: function get() {
      return 'SK';
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _skLayerIcon["default"];
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return skRequiredColumns;
    }
  }, {
    key: "columnLabels",
    get: function get() {
      return skColumnLabels;
    }
  }, {
    key: "noneLayerDataAffectingProps",
    get: function get() {
      return ['label', 'opacity', 'thickness', 'isVisible', 'hidden', 'colorRange', 'colorDomain'];
    }
  }, {
    key: "visualChannels",
    get: function get() {
      var visualChannels = (0, _get2["default"])((0, _getPrototypeOf2["default"])(SkLayer.prototype), "visualChannels", this);
      return {
        color: _objectSpread(_objectSpread({}, visualChannels.color), {}, {
          accessor: 'getFillColor',
          condition: function condition(config) {
            return config.colorField;
          },
          getAttributeValue: function getAttributeValue(config) {
            return config.color;
          },
          aggregation: 'colorAggregation',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.colorAggr // defaultMeasure: 'property.pointCount'

        }),
        strokeColor: {
          key: 'strokeColor',
          property: 'strokeColor',
          field: 'strokeColorField',
          scale: 'strokeColorScale',
          domain: 'strokeColorDomain',
          range: 'strokeColorRange',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.color,
          accessor: 'getLineColor',
          nullValue: visualChannels.color.nullValue,
          getAttributeValue: function getAttributeValue(config) {
            return config.visConfig.strokeColor || config.color;
          },
          // used this to get updateTriggers
          defaultValue: function defaultValue(config) {
            return config.visConfig.strokeColor || config.color;
          }
        },
        size: _objectSpread(_objectSpread({}, visualChannels.size), {}, {
          aggregation: 'sizeAggregation',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.sizeAggr,
          condition: function condition(config) {
            return config.sizeField;
          },
          accessor: 'getElevation' // defaultMeasure: 'property.pointCount'

        })
      };
    }
  }, {
    key: "getDefaultLayerConfig",
    value: function getDefaultLayerConfig() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _objectSpread(_objectSpread({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(SkLayer.prototype), "getDefaultLayerConfig", this).call(this, props)), {}, {
        colorScale: _defaultSettings.AGGREGATION_TYPES.count,
        sizeScale: _defaultSettings.AGGREGATION_TYPES.count,
        // add stroke color visual channel
        strokeColorField: null,
        strokeColorDomain: [0, 1],
        strokeColorScale: 'quantile'
      });
    }
  }, {
    key: "getHoverData",
    value: function getHoverData(object, dataContainer) {
      // index of dataContainer is saved to feature.properties.filteredIndex
      var indexLength = object.properties.filteredIndex.length;

      if (indexLength > 1) {
        return (0, _dataContainerUtils.createIndexedDataContainer)(dataContainer, object.properties.filteredIndex.map(function (i) {
          return i.index;
        }));
      } else if (indexLength == 1) {
        return dataContainer.row(object.properties.filteredIndex[0].index);
      }

      return null;
    }
    /**
     * Validate aggregation type on top of basic layer visual channel validation
     * @param channel
     */

  }, {
    key: "validateVisualChannel",
    value: function validateVisualChannel(channel) {
      // field type decides aggregation type decides scale type
      this.validateFieldType(channel);
      this.validateAggregationType(channel);
      this.validateScale(channel);
    }
    /**
     * Validate aggregation type based on selected field
     */

  }, {
    key: "validateAggregationType",
    value: function validateAggregationType(channel) {
      var visualChannel = this.visualChannels[channel];
      var field = visualChannel.field,
          aggregation = visualChannel.aggregation;

      if (!aggregation) {
        return;
      }

      var aggregationOptions = this.getAggregationOptions(channel);

      if (!aggregationOptions.length) {
        // if field cannot be aggregated, set field to null
        this.updateLayerConfig((0, _defineProperty2["default"])({}, field, null));
      } else if (!aggregationOptions.includes(this.config.visConfig[aggregation])) {
        // current aggregation type is not supported by this field
        // set aggregation to the first supported option
        this.updateLayerVisConfig((0, _defineProperty2["default"])({}, aggregation, aggregationOptions[0]));
      }
    }
  }, {
    key: "getAggregationOptions",
    value: function getAggregationOptions(channel) {
      var visualChannel = this.visualChannels[channel];
      var field = visualChannel.field,
          channelScaleType = visualChannel.channelScaleType;
      return Object.keys(this.config[field] ? _defaultSettings.FIELD_OPTS[this.config[field].type].scale[channelScaleType] : _defaultSettings.DEFAULT_AGGREGATION[channelScaleType]);
    }
    /**
     * Get scale options based on current field and aggregation type
     * @param {string} channel
     * @returns {string[]}
     */

  }, {
    key: "getScaleOptions",
    value: function getScaleOptions(channel) {
      var visualChannel = this.visualChannels[channel];
      var field = visualChannel.field,
          scale = visualChannel.scale,
          aggregation = visualChannel.aggregation,
          channelScaleType = visualChannel.channelScaleType;
      var aggregationType = this.config.visConfig[aggregation];

      if (aggregation) {
        return this.config[field] ? // scale options based on aggregation
        _defaultSettings.FIELD_OPTS[this.config[field].type].scale[channelScaleType][aggregationType] : // default scale options for count
        _defaultSettings.DEFAULT_AGGREGATION[channelScaleType][_defaultSettings.AGGREGATION_TYPES.count];
      } else {
        return this.config[field] ? _defaultSettings.FIELD_OPTS[this.config[field].type].scale[channelScaleType] : [this.getDefaultLayerConfig()[scale]];
      }
    }
  }, {
    key: "calculateDataAttribute",
    value: function calculateDataAttribute(_ref2, getPosition) {
      var dataContainer = _ref2.dataContainer,
          filteredIndex = _ref2.filteredIndex;
      if (!this.dataToFeature) return null;

      for (var i = 0; i < this.dataToFeature.length; i++) {
        this.dataToFeature[i].properties.filteredIndex = [];
      }

      var code, index;
      var getCode = this.getPositionAccessor(dataContainer);
      this.filteredIndexLength = filteredIndex.length;

      for (var _i = 0; _i < filteredIndex.length; _i++) {
        index = filteredIndex[_i];
        code = getCode({
          index: index
        });
        this.dataToFeature[this.codeToData[code]].properties.filteredIndex.push({
          index: index
        });
      }

      return this.dataToFeature;
    }
  }, {
    key: "formatLayerData",
    value: function formatLayerData(datasets, oldLayerData) {
      var _datasets$this$config = datasets[this.config.dataId],
          gpuFilter = _datasets$this$config.gpuFilter,
          dataContainer = _datasets$this$config.dataContainer;

      var _this$updateData = this.updateData(datasets, oldLayerData),
          data = _this$updateData.data;

      var indexAccessor = function indexAccessor(f) {
        return f.properties.filteredIndex.length ? f.properties.filteredIndex.map(function (fi) {
          return fi.index;
        }) : null;
      };

      var customFilterValueAccessor = function customFilterValueAccessor(dc, d, fieldIndex) {
        return d.properties.filteredIndex.length ? d.properties.filteredIndex.map(function (f) {
          return dc.valueAt(f.index, fieldIndex);
        }) : null;
      }; // const indexAccessor = f => (f.properties.filteredIndex.length ? f.properties.filteredIndex[0].index : null);
      // const customFilterValueAccessor = (dc, d, fieldIndex) => {
      //   return d.properties.filteredIndex.length ?
      //     dc.valueAt(d.properties.filteredIndex[0].index, fieldIndex)
      //     : null ;
      // };


      var dataAccessor = function dataAccessor(dc) {
        return function (d) {
          return d.properties.filteredIndex.length ? {
            index: d.properties.filteredIndex[0].index
          } : null;
        };
      };

      var accessors = this.getAttributeAccessors({
        dataAccessor: dataAccessor,
        dataContainer: dataContainer
      });
      return _objectSpread({
        data: data,
        getFilterValue: gpuFilter.filterValueAccessor(dataContainer)(indexAccessor, customFilterValueAccessor)
      }, accessors);
    }
  }, {
    key: "getAttributeAccessors",
    value: function getAttributeAccessors(_ref3) {
      var _this2 = this;

      var _ref3$dataAccessor = _ref3.dataAccessor,
          dataAccessor = _ref3$dataAccessor === void 0 ? defaultDataAccessor : _ref3$dataAccessor,
          dataContainer = _ref3.dataContainer;
      var attributeAccessors = {};
      Object.keys(this.visualChannels).forEach(function (channel) {
        var _this2$visualChannels = _this2.visualChannels[channel],
            field = _this2$visualChannels.field,
            fixed = _this2$visualChannels.fixed,
            scale = _this2$visualChannels.scale,
            domain = _this2$visualChannels.domain,
            range = _this2$visualChannels.range,
            accessor = _this2$visualChannels.accessor,
            defaultValue = _this2$visualChannels.defaultValue,
            getAttributeValue = _this2$visualChannels.getAttributeValue,
            nullValue = _this2$visualChannels.nullValue,
            channelScaleType = _this2$visualChannels.channelScaleType,
            aggregation = _this2$visualChannels.aggregation;
        var shouldGetScale = _this2.config[field];

        if (shouldGetScale) {
          var args = [_this2.config[scale], _this2.config[domain], _this2.config.visConfig[range]];
          var isFixed = fixed && _this2.config.visConfig[fixed];
          var scaleFunction = channelScaleType === _defaultSettings.CHANNEL_SCALES.color || channelScaleType === _defaultSettings.CHANNEL_SCALES.colorAggr ? _this2.getColorScale.apply(_this2, args) : _this2.getVisChannelScale.apply(_this2, args.concat([isFixed]));

          if (channelScaleType === _defaultSettings.CHANNEL_SCALES.colorAggr || channelScaleType === _defaultSettings.CHANNEL_SCALES.sizeAggr) {
            attributeAccessors[accessor] = function (d) {
              return scaleFunction((0, _skUtils.getValueAggrFunc)(_this2.config[field], _this2.config.visConfig[aggregation], args[1][0])(d));
            };
          } else {
            attributeAccessors[accessor] = function (d) {
              return _this2.getEncodedChannelValue(scaleFunction, dataAccessor(dataContainer)(d), _this2.config[field], nullValue);
            };
          }
        } else if (typeof getAttributeValue === 'function') {
          attributeAccessors[accessor] = getAttributeValue(_this2.config);
        } else {
          attributeAccessors[accessor] = typeof defaultValue === 'function' ? defaultValue(_this2.config) : defaultValue;
        }

        if (!attributeAccessors[accessor]) {
          Console.warn("Failed to provide accessor function for ".concat(accessor || channel));
        }
      });
      return attributeAccessors;
    }
  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(dataContainer) {
      var getCode = this.getPositionAccessor(dataContainer);

      var _getGeojsonDataMaps = (0, _skUtils.getGeojsonDataMaps)(dataContainer, getCode);

      var _getGeojsonDataMaps2 = (0, _slicedToArray2["default"])(_getGeojsonDataMaps, 2);

      this.dataToFeature = _getGeojsonDataMaps2[0];
      this.codeToData = _getGeojsonDataMaps2[1];

      if (!this.dataToFeature) {
        return;
      } // get bounds from features


      var bounds = (0, _skUtils.getGeojsonBounds)(this.dataToFeature); // sk layer is always polygon

      var featureTypes = {
        polygon: true
      };
      this.updateMeta({
        bounds: bounds,
        featureTypes: featureTypes
      });
    }
  }, {
    key: "setInitialLayerConfig",
    value: function setInitialLayerConfig(_ref4) {
      var dataContainer = _ref4.dataContainer;
      this.updateLayerMeta(dataContainer); // set both fill and stroke to true

      return this.updateLayerVisConfig({
        filled: true,
        stroked: true,
        strokeColor: _baseLayer.colorMaker.next().value
      });
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(opts) {
      var data = opts.data,
          gpuFilter = opts.gpuFilter,
          objectHovered = opts.objectHovered,
          mapState = opts.mapState,
          interactionConfig = opts.interactionConfig;
      var featureTypes = this.meta.featureTypes;
      var zoomFactor = this.getZoomFactor(mapState);
      var eleZoomFactor = this.getElevationZoomFactor(mapState);
      var visConfig = this.config.visConfig;
      var layerProps = {
        lineWidthScale: visConfig.thickness * zoomFactor * 8,
        elevationScale: visConfig.elevationScale * eleZoomFactor,
        lineMiterLimit: 2
      };

      var updateTriggers = _objectSpread(_objectSpread({}, this.getVisualChannelUpdateTriggers()), {}, {
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
      });

      var defaultLayerProps = this.getDefaultDeckLayerProps(opts);
      var opaOverwrite = {
        opacity: visConfig.strokeOpacity
      };
      var pickable = interactionConfig.tooltip.enabled;
      var hoveredObject = this.hasHoveredObject(objectHovered);
      return [new _layers.GeoJsonLayer(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, defaultLayerProps), layerProps), data), {}, {
        filled: visConfig.filled,
        stroked: visConfig.stroked,
        extruded: visConfig.enable3d,
        wireframe: visConfig.wireframe,
        pickable: pickable,
        highlightColor: _defaultSettings.HIGHLIGH_COLOR_3D,
        autoHighlight: visConfig.enable3d && pickable,
        wrapLongitude: false,
        rounded: true,
        updateTriggers: updateTriggers,
        _subLayerProps: _objectSpread(_objectSpread(_objectSpread({}, featureTypes.polygon ? {
          'polygons-stroke': opaOverwrite
        } : {}), featureTypes.line ? {
          'line-strings': opaOverwrite
        } : {}), featureTypes.point ? {
          points: {
            lineOpacity: visConfig.strokeOpacity
          }
        } : {})
      }))].concat((0, _toConsumableArray2["default"])(hoveredObject && !visConfig.enable3d ? [new _layers.GeoJsonLayer(_objectSpread(_objectSpread(_objectSpread({}, this.getDefaultHoverLayerProps()), layerProps), {}, {
        wrapLongitude: false,
        data: [hoveredObject],
        getElevation: data.getElevation,
        getLineColor: this.config.highlightColor,
        getFillColor: this.config.highlightColor,
        // always draw outline
        stroked: true,
        filled: false
      }))] : []));
    }
  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(_ref5) {
      var _this3 = this;

      var label = _ref5.label,
          _ref5$fields = _ref5.fields,
          fields = _ref5$fields === void 0 ? [] : _ref5$fields;

      var defaultColumns = _objectSpread({}, _defaultSettings.SK_FIELDS);

      var foundColumns = this.findDefaultColumnField(defaultColumns, fields);

      if (!foundColumns || !foundColumns.length) {
        return {
          props: []
        };
      }

      return {
        props: foundColumns.map(function (columns) {
          return {
            label: typeof label === 'string' && label.replace(/\.[^/.]+$/, '') || _this3.type,
            columns: columns,
            isVisible: true
          };
        })
      };
    }
  }]);
  return SkLayer;
}(_baseLayer["default"]);

exports["default"] = SkLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvc2stbGF5ZXIvc2stbGF5ZXIuanMiXSwibmFtZXMiOlsiU2tWaXNDb25maWdzIiwiZmlsbGVkIiwiY29sb3JSYW5nZSIsIm9wYWNpdHkiLCJjb2xvckFnZ3JlZ2F0aW9uIiwic3Ryb2tlZCIsInN0cm9rZUNvbG9yIiwic3Ryb2tlQ29sb3JSYW5nZSIsInN0cm9rZU9wYWNpdHkiLCJMQVlFUl9WSVNfQ09ORklHUyIsInByb3BlcnR5IiwidGhpY2tuZXNzIiwiZGVmYXVsdFZhbHVlIiwicmFuZ2UiLCJzaXplUmFuZ2UiLCJzaXplQWdncmVnYXRpb24iLCJlbGV2YXRpb25TY2FsZSIsImVuYWJsZUVsZXZhdGlvblpvb21GYWN0b3IiLCJlbmFibGUzZCIsIndpcmVmcmFtZSIsInNrUmVxdWlyZWRDb2x1bW5zIiwic2tDb2x1bW5MYWJlbHMiLCJjb2RlIiwiY29kZUFjY2Vzc29yIiwiZGMiLCJkIiwidmFsdWVBdCIsImluZGV4IiwiZmllbGRJZHgiLCJTa0xheWVyIiwicHJvcHMiLCJjb2RlVG9EYXRhIiwiZGF0YVRvRmVhdHVyZSIsImZpbHRlcmVkSW5kZXhMZW5ndGgiLCJyZWdpc3RlclZpc0NvbmZpZyIsImdldFBvc2l0aW9uQWNjZXNzb3IiLCJkYXRhQ29udGFpbmVyIiwiY29uZmlnIiwiY29sdW1ucyIsIlNrTGF5ZXJJY29uIiwidmlzdWFsQ2hhbm5lbHMiLCJjb2xvciIsImFjY2Vzc29yIiwiY29uZGl0aW9uIiwiY29sb3JGaWVsZCIsImdldEF0dHJpYnV0ZVZhbHVlIiwiYWdncmVnYXRpb24iLCJjaGFubmVsU2NhbGVUeXBlIiwiQ0hBTk5FTF9TQ0FMRVMiLCJjb2xvckFnZ3IiLCJrZXkiLCJmaWVsZCIsInNjYWxlIiwiZG9tYWluIiwibnVsbFZhbHVlIiwidmlzQ29uZmlnIiwic2l6ZSIsInNpemVBZ2dyIiwic2l6ZUZpZWxkIiwiY29sb3JTY2FsZSIsIkFHR1JFR0FUSU9OX1RZUEVTIiwiY291bnQiLCJzaXplU2NhbGUiLCJzdHJva2VDb2xvckZpZWxkIiwic3Ryb2tlQ29sb3JEb21haW4iLCJzdHJva2VDb2xvclNjYWxlIiwib2JqZWN0IiwiaW5kZXhMZW5ndGgiLCJwcm9wZXJ0aWVzIiwiZmlsdGVyZWRJbmRleCIsImxlbmd0aCIsIm1hcCIsImkiLCJyb3ciLCJjaGFubmVsIiwidmFsaWRhdGVGaWVsZFR5cGUiLCJ2YWxpZGF0ZUFnZ3JlZ2F0aW9uVHlwZSIsInZhbGlkYXRlU2NhbGUiLCJ2aXN1YWxDaGFubmVsIiwiYWdncmVnYXRpb25PcHRpb25zIiwiZ2V0QWdncmVnYXRpb25PcHRpb25zIiwidXBkYXRlTGF5ZXJDb25maWciLCJpbmNsdWRlcyIsInVwZGF0ZUxheWVyVmlzQ29uZmlnIiwiT2JqZWN0Iiwia2V5cyIsIkZJRUxEX09QVFMiLCJ0eXBlIiwiREVGQVVMVF9BR0dSRUdBVElPTiIsImFnZ3JlZ2F0aW9uVHlwZSIsImdldERlZmF1bHRMYXllckNvbmZpZyIsImdldFBvc2l0aW9uIiwiZ2V0Q29kZSIsInB1c2giLCJkYXRhc2V0cyIsIm9sZExheWVyRGF0YSIsImRhdGFJZCIsImdwdUZpbHRlciIsInVwZGF0ZURhdGEiLCJkYXRhIiwiaW5kZXhBY2Nlc3NvciIsImYiLCJmaSIsImN1c3RvbUZpbHRlclZhbHVlQWNjZXNzb3IiLCJmaWVsZEluZGV4IiwiZGF0YUFjY2Vzc29yIiwiYWNjZXNzb3JzIiwiZ2V0QXR0cmlidXRlQWNjZXNzb3JzIiwiZ2V0RmlsdGVyVmFsdWUiLCJmaWx0ZXJWYWx1ZUFjY2Vzc29yIiwiZGVmYXVsdERhdGFBY2Nlc3NvciIsImF0dHJpYnV0ZUFjY2Vzc29ycyIsImZvckVhY2giLCJmaXhlZCIsInNob3VsZEdldFNjYWxlIiwiYXJncyIsImlzRml4ZWQiLCJzY2FsZUZ1bmN0aW9uIiwiZ2V0Q29sb3JTY2FsZSIsImdldFZpc0NoYW5uZWxTY2FsZSIsImdldEVuY29kZWRDaGFubmVsVmFsdWUiLCJDb25zb2xlIiwid2FybiIsImJvdW5kcyIsImZlYXR1cmVUeXBlcyIsInBvbHlnb24iLCJ1cGRhdGVNZXRhIiwidXBkYXRlTGF5ZXJNZXRhIiwiY29sb3JNYWtlciIsIm5leHQiLCJ2YWx1ZSIsIm9wdHMiLCJvYmplY3RIb3ZlcmVkIiwibWFwU3RhdGUiLCJpbnRlcmFjdGlvbkNvbmZpZyIsIm1ldGEiLCJ6b29tRmFjdG9yIiwiZ2V0Wm9vbUZhY3RvciIsImVsZVpvb21GYWN0b3IiLCJnZXRFbGV2YXRpb25ab29tRmFjdG9yIiwibGF5ZXJQcm9wcyIsImxpbmVXaWR0aFNjYWxlIiwibGluZU1pdGVyTGltaXQiLCJ1cGRhdGVUcmlnZ2VycyIsImdldFZpc3VhbENoYW5uZWxVcGRhdGVUcmlnZ2VycyIsImZpbHRlclZhbHVlVXBkYXRlVHJpZ2dlcnMiLCJnZXRGaWxsQ29sb3IiLCJnZXRFbGV2YXRpb24iLCJkZWZhdWx0TGF5ZXJQcm9wcyIsImdldERlZmF1bHREZWNrTGF5ZXJQcm9wcyIsIm9wYU92ZXJ3cml0ZSIsInBpY2thYmxlIiwidG9vbHRpcCIsImVuYWJsZWQiLCJob3ZlcmVkT2JqZWN0IiwiaGFzSG92ZXJlZE9iamVjdCIsIkRlY2tHTEdlb0pzb25MYXllciIsImV4dHJ1ZGVkIiwiaGlnaGxpZ2h0Q29sb3IiLCJISUdITElHSF9DT0xPUl8zRCIsImF1dG9IaWdobGlnaHQiLCJ3cmFwTG9uZ2l0dWRlIiwicm91bmRlZCIsIl9zdWJMYXllclByb3BzIiwibGluZSIsInBvaW50IiwicG9pbnRzIiwibGluZU9wYWNpdHkiLCJnZXREZWZhdWx0SG92ZXJMYXllclByb3BzIiwiZ2V0TGluZUNvbG9yIiwibGFiZWwiLCJmaWVsZHMiLCJkZWZhdWx0Q29sdW1ucyIsIlNLX0ZJRUxEUyIsImZvdW5kQ29sdW1ucyIsImZpbmREZWZhdWx0Q29sdW1uRmllbGQiLCJyZXBsYWNlIiwiaXNWaXNpYmxlIiwiTGF5ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQVFBOztBQUNBOztBQUVBOzs7Ozs7Ozs7O0FBRU8s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QUwsQ0FBNEJILGNBQTVCLEVBQTRDRCxNQUE1QyxDQUFyQjs7QUFDQSxVQUFJLENBQUNHLFlBQUQsSUFBaUIsQ0FBQ0EsWUFBWSxDQUFDeEcsTUFBbkMsRUFBMkM7QUFDekMsZUFBTztBQUFDeEMsVUFBQUEsS0FBSyxFQUFFO0FBQVIsU0FBUDtBQUNEOztBQUVELGFBQU87QUFDTEEsUUFBQUEsS0FBSyxFQUFFZ0osWUFBWSxDQUFDdkcsR0FBYixDQUFpQixVQUFBakMsT0FBTztBQUFBLGlCQUFLO0FBQ2xDb0ksWUFBQUEsS0FBSyxFQUFHLE9BQU9BLEtBQVAsS0FBaUIsUUFBakIsSUFBNkJBLEtBQUssQ0FBQ00sT0FBTixDQUFjLFdBQWQsRUFBMkIsRUFBM0IsQ0FBOUIsSUFBaUUsTUFBSSxDQUFDekYsSUFEM0M7QUFFbENqRCxZQUFBQSxPQUFPLEVBQVBBLE9BRmtDO0FBR2xDMkksWUFBQUEsU0FBUyxFQUFFO0FBSHVCLFdBQUw7QUFBQSxTQUF4QjtBQURGLE9BQVA7QUFPRDs7O0VBekZrQ0MscUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjEgU0sgVGVsZWNvbSwgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBMYXllciwge2NvbG9yTWFrZXJ9IGZyb20gJy4uL2Jhc2UtbGF5ZXInO1xuaW1wb3J0IHtHZW9Kc29uTGF5ZXIgYXMgRGVja0dMR2VvSnNvbkxheWVyfSBmcm9tICdAZGVjay5nbC9sYXllcnMnO1xuaW1wb3J0IHtnZXRHZW9qc29uRGF0YU1hcHMsIGdldEdlb2pzb25Cb3VuZHMsIGdldFZhbHVlQWdnckZ1bmN9IGZyb20gJy4vc2stdXRpbHMnO1xuaW1wb3J0IHtcbiAgU0tfRklFTERTLFxuICBISUdITElHSF9DT0xPUl8zRCxcbiAgQ0hBTk5FTF9TQ0FMRVMsXG4gIEZJRUxEX09QVFMsXG4gIERFRkFVTFRfQUdHUkVHQVRJT04sXG4gIEFHR1JFR0FUSU9OX1RZUEVTXG59IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcbmltcG9ydCB7TEFZRVJfVklTX0NPTkZJR1N9IGZyb20gJ2xheWVycy9sYXllci1mYWN0b3J5JztcbmltcG9ydCB7Y3JlYXRlSW5kZXhlZERhdGFDb250YWluZXJ9IGZyb20gJ3V0aWxzL3RhYmxlLXV0aWxzL2RhdGEtY29udGFpbmVyLXV0aWxzLmpzJztcblxuaW1wb3J0IFNrTGF5ZXJJY29uIGZyb20gJy4vc2stbGF5ZXItaWNvbic7XG5cbmV4cG9ydCBjb25zdCBTa1Zpc0NvbmZpZ3MgPSB7XG4gIGZpbGxlZDogJ2ZpbGxlZCcsXG4gIGNvbG9yUmFuZ2U6ICdjb2xvclJhbmdlJyxcbiAgb3BhY2l0eTogJ29wYWNpdHknLFxuICBjb2xvckFnZ3JlZ2F0aW9uOiAnYWdncmVnYXRpb24nLFxuICBcbiAgc3Ryb2tlZDogJ3N0cm9rZWQnLFxuICBzdHJva2VDb2xvcjogJ3N0cm9rZUNvbG9yJyxcbiAgc3Ryb2tlQ29sb3JSYW5nZTogJ3N0cm9rZUNvbG9yUmFuZ2UnLFxuICBzdHJva2VPcGFjaXR5OiB7XG4gICAgLi4uTEFZRVJfVklTX0NPTkZJR1Mub3BhY2l0eSxcbiAgICBwcm9wZXJ0eTogJ3N0cm9rZU9wYWNpdHknXG4gIH0sXG4gIHRoaWNrbmVzczoge1xuICAgIC4uLkxBWUVSX1ZJU19DT05GSUdTLnRoaWNrbmVzcyxcbiAgICBkZWZhdWx0VmFsdWU6IDAuNSxcbiAgICByYW5nZTogWzAsIDJdXG4gIH0sXG5cbiAgc2l6ZVJhbmdlOiAnZWxldmF0aW9uUmFuZ2UnLFxuICBzaXplQWdncmVnYXRpb246ICdhZ2dyZWdhdGlvbicsXG4gIGVsZXZhdGlvblNjYWxlOiAnZWxldmF0aW9uU2NhbGUnLFxuICBlbmFibGVFbGV2YXRpb25ab29tRmFjdG9yOiAnZW5hYmxlRWxldmF0aW9uWm9vbUZhY3RvcicsXG4gIGVuYWJsZTNkOiAnZW5hYmxlM2QnLFxuICB3aXJlZnJhbWU6ICd3aXJlZnJhbWUnXG59O1xuXG5leHBvcnQgY29uc3Qgc2tSZXF1aXJlZENvbHVtbnMgPSBbJ2NvZGUnXTtcbmV4cG9ydCBjb25zdCBza0NvbHVtbkxhYmVscyA9IHtcbiAgY29kZTogJ3NrLmNvZGUnXG59O1xuZXhwb3J0IGNvbnN0IGNvZGVBY2Nlc3NvciA9ICh7Y29kZX0pID0+IGRjID0+IGQgPT4gZGMudmFsdWVBdChkLmluZGV4LCBjb2RlLmZpZWxkSWR4KTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2tMYXllciBleHRlbmRzIExheWVyIHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLmNvZGVUb0RhdGEgPSB7fTtcbiAgICB0aGlzLmRhdGFUb0ZlYXR1cmUgPSBbXTtcbiAgICB0aGlzLmZpbHRlcmVkSW5kZXhMZW5ndGggPSAwO1xuICAgIHRoaXMucmVnaXN0ZXJWaXNDb25maWcoU2tWaXNDb25maWdzKTtcbiAgICB0aGlzLmdldFBvc2l0aW9uQWNjZXNzb3IgPSBkYXRhQ29udGFpbmVyID0+IGNvZGVBY2Nlc3Nvcih0aGlzLmNvbmZpZy5jb2x1bW5zKShkYXRhQ29udGFpbmVyKTtcbiAgfVxuXG4gIGdldCB0eXBlKCkge1xuICAgIHJldHVybiAnc2snO1xuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuICdTSyc7XG4gIH1cblxuICBnZXQgbGF5ZXJJY29uKCkge1xuICAgIHJldHVybiBTa0xheWVySWNvbjtcbiAgfVxuICBcbiAgZ2V0IHJlcXVpcmVkTGF5ZXJDb2x1bW5zKCkge1xuICAgIHJldHVybiBza1JlcXVpcmVkQ29sdW1ucztcbiAgfVxuXG4gIGdldCBjb2x1bW5MYWJlbHMoKSB7XG4gICAgcmV0dXJuIHNrQ29sdW1uTGFiZWxzO1xuICB9XG5cbiAgZ2V0IG5vbmVMYXllckRhdGFBZmZlY3RpbmdQcm9wcygpIHtcbiAgICByZXR1cm4gWydsYWJlbCcsICdvcGFjaXR5JywgJ3RoaWNrbmVzcycsICdpc1Zpc2libGUnLCAnaGlkZGVuJywgJ2NvbG9yUmFuZ2UnLCAnY29sb3JEb21haW4nXTtcbiAgfVxuXG4gIGdldCB2aXN1YWxDaGFubmVscygpIHtcbiAgICBjb25zdCB2aXN1YWxDaGFubmVscyA9IHN1cGVyLnZpc3VhbENoYW5uZWxzO1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjoge1xuICAgICAgICAuLi52aXN1YWxDaGFubmVscy5jb2xvcixcbiAgICAgICAgYWNjZXNzb3I6ICdnZXRGaWxsQ29sb3InLFxuICAgICAgICBjb25kaXRpb246IGNvbmZpZyA9PiBjb25maWcuY29sb3JGaWVsZCxcbiAgICAgICAgZ2V0QXR0cmlidXRlVmFsdWU6IGNvbmZpZyA9PiBjb25maWcuY29sb3IsXG4gICAgICAgIGFnZ3JlZ2F0aW9uOiAnY29sb3JBZ2dyZWdhdGlvbicsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6IENIQU5ORUxfU0NBTEVTLmNvbG9yQWdnclxuICAgICAgICAvLyBkZWZhdWx0TWVhc3VyZTogJ3Byb3BlcnR5LnBvaW50Q291bnQnXG4gICAgICB9LFxuICAgICAgc3Ryb2tlQ29sb3I6IHtcbiAgICAgICAga2V5OiAnc3Ryb2tlQ29sb3InLFxuICAgICAgICBwcm9wZXJ0eTogJ3N0cm9rZUNvbG9yJyxcbiAgICAgICAgZmllbGQ6ICdzdHJva2VDb2xvckZpZWxkJyxcbiAgICAgICAgc2NhbGU6ICdzdHJva2VDb2xvclNjYWxlJyxcbiAgICAgICAgZG9tYWluOiAnc3Ryb2tlQ29sb3JEb21haW4nLFxuICAgICAgICByYW5nZTogJ3N0cm9rZUNvbG9yUmFuZ2UnLFxuICAgICAgICBjaGFubmVsU2NhbGVUeXBlOiBDSEFOTkVMX1NDQUxFUy5jb2xvcixcbiAgICAgICAgYWNjZXNzb3I6ICdnZXRMaW5lQ29sb3InLFxuICAgICAgICBudWxsVmFsdWU6IHZpc3VhbENoYW5uZWxzLmNvbG9yLm51bGxWYWx1ZSxcbiAgICAgICAgZ2V0QXR0cmlidXRlVmFsdWU6IGNvbmZpZyA9PiBjb25maWcudmlzQ29uZmlnLnN0cm9rZUNvbG9yIHx8IGNvbmZpZy5jb2xvcixcbiAgICAgICAgLy8gdXNlZCB0aGlzIHRvIGdldCB1cGRhdGVUcmlnZ2Vyc1xuICAgICAgICBkZWZhdWx0VmFsdWU6IGNvbmZpZyA9PiBjb25maWcudmlzQ29uZmlnLnN0cm9rZUNvbG9yIHx8IGNvbmZpZy5jb2xvclxuICAgICAgfSxcbiAgICAgIHNpemU6IHtcbiAgICAgICAgLi4udmlzdWFsQ2hhbm5lbHMuc2l6ZSxcbiAgICAgICAgYWdncmVnYXRpb246ICdzaXplQWdncmVnYXRpb24nLFxuICAgICAgICBjaGFubmVsU2NhbGVUeXBlOiBDSEFOTkVMX1NDQUxFUy5zaXplQWdncixcbiAgICAgICAgY29uZGl0aW9uOiBjb25maWcgPT4gY29uZmlnLnNpemVGaWVsZCxcbiAgICAgICAgYWNjZXNzb3I6ICdnZXRFbGV2YXRpb24nXG4gICAgICAgIC8vIGRlZmF1bHRNZWFzdXJlOiAncHJvcGVydHkucG9pbnRDb3VudCdcbiAgICAgIH1cbiAgICB9OyAgIFxuICB9XG5cbiAgc3RhdGljIGZpbmREZWZhdWx0TGF5ZXJQcm9wcyh7bGFiZWwsIGZpZWxkcyA9IFtdfSkge1xuICAgIGNvbnN0IGRlZmF1bHRDb2x1bW5zID0ge1xuICAgICAgLi4uU0tfRklFTERTXG4gICAgfTtcblxuICAgIGNvbnN0IGZvdW5kQ29sdW1ucyA9IHRoaXMuZmluZERlZmF1bHRDb2x1bW5GaWVsZChkZWZhdWx0Q29sdW1ucywgZmllbGRzKTtcbiAgICBpZiAoIWZvdW5kQ29sdW1ucyB8fCAhZm91bmRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHtwcm9wczogW119O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBwcm9wczogZm91bmRDb2x1bW5zLm1hcChjb2x1bW5zID0+ICh7XG4gICAgICAgIGxhYmVsOiAodHlwZW9mIGxhYmVsID09PSAnc3RyaW5nJyAmJiBsYWJlbC5yZXBsYWNlKC9cXC5bXi8uXSskLywgJycpKSB8fCB0aGlzLnR5cGUsXG4gICAgICAgIGNvbHVtbnMsXG4gICAgICAgIGlzVmlzaWJsZTogdHJ1ZVxuICAgICAgfSkpXG4gICAgfTtcbiAgfVxuXG4gIGdldERlZmF1bHRMYXllckNvbmZpZyhwcm9wcyA9IHt9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN1cGVyLmdldERlZmF1bHRMYXllckNvbmZpZyhwcm9wcyksXG5cbiAgICAgIGNvbG9yU2NhbGU6IEFHR1JFR0FUSU9OX1RZUEVTLmNvdW50LFxuICAgICAgc2l6ZVNjYWxlOiBBR0dSRUdBVElPTl9UWVBFUy5jb3VudCxcbiAgICAgIC8vIGFkZCBzdHJva2UgY29sb3IgdmlzdWFsIGNoYW5uZWxcbiAgICAgIHN0cm9rZUNvbG9yRmllbGQ6IG51bGwsXG4gICAgICBzdHJva2VDb2xvckRvbWFpbjogWzAsIDFdLFxuICAgICAgc3Ryb2tlQ29sb3JTY2FsZTogJ3F1YW50aWxlJ1xuICAgIH07XG4gIH1cblxuICBnZXRIb3ZlckRhdGEob2JqZWN0LCBkYXRhQ29udGFpbmVyKSB7XG4gICAgLy8gaW5kZXggb2YgZGF0YUNvbnRhaW5lciBpcyBzYXZlZCB0byBmZWF0dXJlLnByb3BlcnRpZXMuZmlsdGVyZWRJbmRleFxuICAgIGNvbnN0IGluZGV4TGVuZ3RoID0gb2JqZWN0LnByb3BlcnRpZXMuZmlsdGVyZWRJbmRleC5sZW5ndGg7XG4gICAgaWYgKGluZGV4TGVuZ3RoID4gMSkge1xuICAgICAgcmV0dXJuIGNyZWF0ZUluZGV4ZWREYXRhQ29udGFpbmVyKGRhdGFDb250YWluZXIsIG9iamVjdC5wcm9wZXJ0aWVzLmZpbHRlcmVkSW5kZXgubWFwKGkgPT4gaS5pbmRleCkpO1xuICAgIH0gZWxzZSBpZiAoaW5kZXhMZW5ndGggPT0gMSkge1xuICAgICAgcmV0dXJuIGRhdGFDb250YWluZXIucm93KG9iamVjdC5wcm9wZXJ0aWVzLmZpbHRlcmVkSW5kZXhbMF0uaW5kZXgpO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIGFnZ3JlZ2F0aW9uIHR5cGUgb24gdG9wIG9mIGJhc2ljIGxheWVyIHZpc3VhbCBjaGFubmVsIHZhbGlkYXRpb25cbiAgICogQHBhcmFtIGNoYW5uZWxcbiAgICovXG4gIHZhbGlkYXRlVmlzdWFsQ2hhbm5lbChjaGFubmVsKSB7XG4gICAgLy8gZmllbGQgdHlwZSBkZWNpZGVzIGFnZ3JlZ2F0aW9uIHR5cGUgZGVjaWRlcyBzY2FsZSB0eXBlXG4gICAgdGhpcy52YWxpZGF0ZUZpZWxkVHlwZShjaGFubmVsKTtcbiAgICB0aGlzLnZhbGlkYXRlQWdncmVnYXRpb25UeXBlKGNoYW5uZWwpO1xuICAgIHRoaXMudmFsaWRhdGVTY2FsZShjaGFubmVsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSBhZ2dyZWdhdGlvbiB0eXBlIGJhc2VkIG9uIHNlbGVjdGVkIGZpZWxkXG4gICAqL1xuICB2YWxpZGF0ZUFnZ3JlZ2F0aW9uVHlwZShjaGFubmVsKSB7XG4gICAgY29uc3QgdmlzdWFsQ2hhbm5lbCA9IHRoaXMudmlzdWFsQ2hhbm5lbHNbY2hhbm5lbF07XG4gICAgY29uc3Qge2ZpZWxkLCBhZ2dyZWdhdGlvbn0gPSB2aXN1YWxDaGFubmVsO1xuICAgIFxuICAgIGlmICghYWdncmVnYXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhZ2dyZWdhdGlvbk9wdGlvbnMgPSB0aGlzLmdldEFnZ3JlZ2F0aW9uT3B0aW9ucyhjaGFubmVsKTtcblxuICAgIGlmICghYWdncmVnYXRpb25PcHRpb25zLmxlbmd0aCkge1xuICAgICAgLy8gaWYgZmllbGQgY2Fubm90IGJlIGFnZ3JlZ2F0ZWQsIHNldCBmaWVsZCB0byBudWxsXG4gICAgICB0aGlzLnVwZGF0ZUxheWVyQ29uZmlnKHtbZmllbGRdOiBudWxsfSk7XG4gICAgfSBlbHNlIGlmICghYWdncmVnYXRpb25PcHRpb25zLmluY2x1ZGVzKHRoaXMuY29uZmlnLnZpc0NvbmZpZ1thZ2dyZWdhdGlvbl0pKSB7XG4gICAgICAvLyBjdXJyZW50IGFnZ3JlZ2F0aW9uIHR5cGUgaXMgbm90IHN1cHBvcnRlZCBieSB0aGlzIGZpZWxkXG4gICAgICAvLyBzZXQgYWdncmVnYXRpb24gdG8gdGhlIGZpcnN0IHN1cHBvcnRlZCBvcHRpb25cbiAgICAgIHRoaXMudXBkYXRlTGF5ZXJWaXNDb25maWcoe1thZ2dyZWdhdGlvbl06IGFnZ3JlZ2F0aW9uT3B0aW9uc1swXX0pO1xuICAgIH1cbiAgfVxuXG4gIGdldEFnZ3JlZ2F0aW9uT3B0aW9ucyhjaGFubmVsKSB7XG4gICAgY29uc3QgdmlzdWFsQ2hhbm5lbCA9IHRoaXMudmlzdWFsQ2hhbm5lbHNbY2hhbm5lbF07XG4gICAgY29uc3Qge2ZpZWxkLCBjaGFubmVsU2NhbGVUeXBlfSA9IHZpc3VhbENoYW5uZWw7XG4gICAgXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKFxuICAgICAgdGhpcy5jb25maWdbZmllbGRdXG4gICAgICAgID8gRklFTERfT1BUU1t0aGlzLmNvbmZpZ1tmaWVsZF0udHlwZV0uc2NhbGVbY2hhbm5lbFNjYWxlVHlwZV1cbiAgICAgICAgOiBERUZBVUxUX0FHR1JFR0FUSU9OW2NoYW5uZWxTY2FsZVR5cGVdXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgc2NhbGUgb3B0aW9ucyBiYXNlZCBvbiBjdXJyZW50IGZpZWxkIGFuZCBhZ2dyZWdhdGlvbiB0eXBlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFubmVsXG4gICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAgICovXG4gIGdldFNjYWxlT3B0aW9ucyhjaGFubmVsKSB7XG4gICAgY29uc3QgdmlzdWFsQ2hhbm5lbCA9IHRoaXMudmlzdWFsQ2hhbm5lbHNbY2hhbm5lbF07XG4gICAgY29uc3Qge2ZpZWxkLCBzY2FsZSwgYWdncmVnYXRpb24sIGNoYW5uZWxTY2FsZVR5cGV9ID0gdmlzdWFsQ2hhbm5lbDtcbiAgICBjb25zdCBhZ2dyZWdhdGlvblR5cGUgPSB0aGlzLmNvbmZpZy52aXNDb25maWdbYWdncmVnYXRpb25dO1xuICAgIGlmIChhZ2dyZWdhdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnW2ZpZWxkXVxuICAgICAgICA/IC8vIHNjYWxlIG9wdGlvbnMgYmFzZWQgb24gYWdncmVnYXRpb25cbiAgICAgICAgICBGSUVMRF9PUFRTW3RoaXMuY29uZmlnW2ZpZWxkXS50eXBlXS5zY2FsZVtjaGFubmVsU2NhbGVUeXBlXVthZ2dyZWdhdGlvblR5cGVdXG4gICAgICAgIDogLy8gZGVmYXVsdCBzY2FsZSBvcHRpb25zIGZvciBjb3VudFxuICAgICAgICAgIERFRkFVTFRfQUdHUkVHQVRJT05bY2hhbm5lbFNjYWxlVHlwZV1bQUdHUkVHQVRJT05fVFlQRVMuY291bnRdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWdbZmllbGRdXG4gICAgICAgID8gRklFTERfT1BUU1t0aGlzLmNvbmZpZ1tmaWVsZF0udHlwZV0uc2NhbGVbY2hhbm5lbFNjYWxlVHlwZV1cbiAgICAgICAgOiBbdGhpcy5nZXREZWZhdWx0TGF5ZXJDb25maWcoKVtzY2FsZV1dO1xuICAgIH1cbiAgfVxuXG4gIGNhbGN1bGF0ZURhdGFBdHRyaWJ1dGUoe2RhdGFDb250YWluZXIsIGZpbHRlcmVkSW5kZXh9LCBnZXRQb3NpdGlvbikge1xuICAgIGlmICghdGhpcy5kYXRhVG9GZWF0dXJlKVxuICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YVRvRmVhdHVyZS5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5kYXRhVG9GZWF0dXJlW2ldLnByb3BlcnRpZXMuZmlsdGVyZWRJbmRleCA9IFtdO1xuICAgIH1cblxuICAgIGxldCBjb2RlLCBpbmRleDtcbiAgICBjb25zdCBnZXRDb2RlID0gdGhpcy5nZXRQb3NpdGlvbkFjY2Vzc29yKGRhdGFDb250YWluZXIpO1xuICAgIHRoaXMuZmlsdGVyZWRJbmRleExlbmd0aCA9IGZpbHRlcmVkSW5kZXgubGVuZ3RoXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWx0ZXJlZEluZGV4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpbmRleCA9IGZpbHRlcmVkSW5kZXhbaV07XG4gICAgICBjb2RlID0gZ2V0Q29kZSh7aW5kZXh9KTtcbiAgICAgIHRoaXMuZGF0YVRvRmVhdHVyZVt0aGlzLmNvZGVUb0RhdGFbY29kZV1dLnByb3BlcnRpZXMuZmlsdGVyZWRJbmRleC5wdXNoKHtpbmRleH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmRhdGFUb0ZlYXR1cmU7XG4gIH1cblxuICBmb3JtYXRMYXllckRhdGEoZGF0YXNldHMsIG9sZExheWVyRGF0YSkge1xuICAgIGNvbnN0IHtncHVGaWx0ZXIsIGRhdGFDb250YWluZXJ9ID0gZGF0YXNldHNbdGhpcy5jb25maWcuZGF0YUlkXTtcblxuICAgIGNvbnN0IHtkYXRhfSA9IHRoaXMudXBkYXRlRGF0YShkYXRhc2V0cywgb2xkTGF5ZXJEYXRhKTtcblxuICAgIGNvbnN0IGluZGV4QWNjZXNzb3IgPSBmID0+IChmLnByb3BlcnRpZXMuZmlsdGVyZWRJbmRleC5sZW5ndGggPyBmLnByb3BlcnRpZXMuZmlsdGVyZWRJbmRleC5tYXAoZmkgPT4gZmkuaW5kZXgpIDogbnVsbCk7XG4gICAgY29uc3QgY3VzdG9tRmlsdGVyVmFsdWVBY2Nlc3NvciA9IChkYywgZCwgZmllbGRJbmRleCkgPT4ge1xuICAgICAgcmV0dXJuIGQucHJvcGVydGllcy5maWx0ZXJlZEluZGV4Lmxlbmd0aCA/XG4gICAgICAgIGQucHJvcGVydGllcy5maWx0ZXJlZEluZGV4Lm1hcChmID0+IGRjLnZhbHVlQXQoZi5pbmRleCwgZmllbGRJbmRleCkpXG4gICAgICAgIDogbnVsbCA7XG4gICAgfTtcbiAgICAvLyBjb25zdCBpbmRleEFjY2Vzc29yID0gZiA9PiAoZi5wcm9wZXJ0aWVzLmZpbHRlcmVkSW5kZXgubGVuZ3RoID8gZi5wcm9wZXJ0aWVzLmZpbHRlcmVkSW5kZXhbMF0uaW5kZXggOiBudWxsKTtcbiAgICAvLyBjb25zdCBjdXN0b21GaWx0ZXJWYWx1ZUFjY2Vzc29yID0gKGRjLCBkLCBmaWVsZEluZGV4KSA9PiB7XG4gICAgLy8gICByZXR1cm4gZC5wcm9wZXJ0aWVzLmZpbHRlcmVkSW5kZXgubGVuZ3RoID9cbiAgICAvLyAgICAgZGMudmFsdWVBdChkLnByb3BlcnRpZXMuZmlsdGVyZWRJbmRleFswXS5pbmRleCwgZmllbGRJbmRleClcbiAgICAvLyAgICAgOiBudWxsIDtcbiAgICAvLyB9O1xuXG4gICAgY29uc3QgZGF0YUFjY2Vzc29yID0gZGMgPT4gZCA9PiAoZC5wcm9wZXJ0aWVzLmZpbHRlcmVkSW5kZXgubGVuZ3RoID8ge2luZGV4OiBkLnByb3BlcnRpZXMuZmlsdGVyZWRJbmRleFswXS5pbmRleH0gOiBudWxsKTtcbiAgICBjb25zdCBhY2Nlc3NvcnMgPSB0aGlzLmdldEF0dHJpYnV0ZUFjY2Vzc29ycyh7ZGF0YUFjY2Vzc29yLCBkYXRhQ29udGFpbmVyfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZGF0YSxcbiAgICAgIGdldEZpbHRlclZhbHVlOiBncHVGaWx0ZXIuZmlsdGVyVmFsdWVBY2Nlc3NvcihkYXRhQ29udGFpbmVyKShcbiAgICAgICAgaW5kZXhBY2Nlc3NvcixcbiAgICAgICAgY3VzdG9tRmlsdGVyVmFsdWVBY2Nlc3NvclxuICAgICAgKSxcbiAgICAgIC4uLmFjY2Vzc29yc1xuICAgIH07XG4gIH1cblxuICBnZXRBdHRyaWJ1dGVBY2Nlc3NvcnMoe2RhdGFBY2Nlc3NvciA9IGRlZmF1bHREYXRhQWNjZXNzb3IsIGRhdGFDb250YWluZXJ9KSB7XG4gICAgY29uc3QgYXR0cmlidXRlQWNjZXNzb3JzID0ge307XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLnZpc3VhbENoYW5uZWxzKS5mb3JFYWNoKGNoYW5uZWwgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBmaWVsZCxcbiAgICAgICAgZml4ZWQsXG4gICAgICAgIHNjYWxlLFxuICAgICAgICBkb21haW4sXG4gICAgICAgIHJhbmdlLFxuICAgICAgICBhY2Nlc3NvcixcbiAgICAgICAgZGVmYXVsdFZhbHVlLFxuICAgICAgICBnZXRBdHRyaWJ1dGVWYWx1ZSxcbiAgICAgICAgbnVsbFZhbHVlLFxuICAgICAgICBjaGFubmVsU2NhbGVUeXBlLFxuICAgICAgICBhZ2dyZWdhdGlvblxuICAgICAgfSA9IHRoaXMudmlzdWFsQ2hhbm5lbHNbY2hhbm5lbF07XG5cbiAgICAgIGNvbnN0IHNob3VsZEdldFNjYWxlID0gdGhpcy5jb25maWdbZmllbGRdO1xuXG4gICAgICBpZiAoc2hvdWxkR2V0U2NhbGUpIHtcbiAgICAgICAgY29uc3QgYXJncyA9IFt0aGlzLmNvbmZpZ1tzY2FsZV0sIHRoaXMuY29uZmlnW2RvbWFpbl0sIHRoaXMuY29uZmlnLnZpc0NvbmZpZ1tyYW5nZV1dO1xuICAgICAgICBjb25zdCBpc0ZpeGVkID0gZml4ZWQgJiYgdGhpcy5jb25maWcudmlzQ29uZmlnW2ZpeGVkXTtcblxuICAgICAgICBjb25zdCBzY2FsZUZ1bmN0aW9uID1cbiAgICAgICAgICAoY2hhbm5lbFNjYWxlVHlwZSA9PT0gQ0hBTk5FTF9TQ0FMRVMuY29sb3IpIHx8IChjaGFubmVsU2NhbGVUeXBlID09PSBDSEFOTkVMX1NDQUxFUy5jb2xvckFnZ3IpXG4gICAgICAgICAgICA/IHRoaXMuZ2V0Q29sb3JTY2FsZSguLi5hcmdzKVxuICAgICAgICAgICAgOiB0aGlzLmdldFZpc0NoYW5uZWxTY2FsZSguLi5hcmdzLCBpc0ZpeGVkKTtcblxuICAgICAgICBpZiAoKGNoYW5uZWxTY2FsZVR5cGUgPT09IENIQU5ORUxfU0NBTEVTLmNvbG9yQWdncikgfHwgKGNoYW5uZWxTY2FsZVR5cGUgPT09IENIQU5ORUxfU0NBTEVTLnNpemVBZ2dyKSkge1xuICAgICAgICAgIGF0dHJpYnV0ZUFjY2Vzc29yc1thY2Nlc3Nvcl0gPSBkID0+IFxuICAgICAgICAgICAgc2NhbGVGdW5jdGlvbihcbiAgICAgICAgICAgICAgZ2V0VmFsdWVBZ2dyRnVuYyh0aGlzLmNvbmZpZ1tmaWVsZF0sIHRoaXMuY29uZmlnLnZpc0NvbmZpZ1thZ2dyZWdhdGlvbl0sIGFyZ3NbMV1bMF0pKGQpXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF0dHJpYnV0ZUFjY2Vzc29yc1thY2Nlc3Nvcl0gPSBkID0+XG4gICAgICAgICAgICB0aGlzLmdldEVuY29kZWRDaGFubmVsVmFsdWUoXG4gICAgICAgICAgICAgIHNjYWxlRnVuY3Rpb24sXG4gICAgICAgICAgICAgIGRhdGFBY2Nlc3NvcihkYXRhQ29udGFpbmVyKShkKSxcbiAgICAgICAgICAgICAgdGhpcy5jb25maWdbZmllbGRdLFxuICAgICAgICAgICAgICBudWxsVmFsdWVcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGdldEF0dHJpYnV0ZVZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGF0dHJpYnV0ZUFjY2Vzc29yc1thY2Nlc3Nvcl0gPSBnZXRBdHRyaWJ1dGVWYWx1ZSh0aGlzLmNvbmZpZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhdHRyaWJ1dGVBY2Nlc3NvcnNbYWNjZXNzb3JdID1cbiAgICAgICAgICB0eXBlb2YgZGVmYXVsdFZhbHVlID09PSAnZnVuY3Rpb24nID8gZGVmYXVsdFZhbHVlKHRoaXMuY29uZmlnKSA6IGRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFhdHRyaWJ1dGVBY2Nlc3NvcnNbYWNjZXNzb3JdKSB7XG4gICAgICAgIENvbnNvbGUud2FybihgRmFpbGVkIHRvIHByb3ZpZGUgYWNjZXNzb3IgZnVuY3Rpb24gZm9yICR7YWNjZXNzb3IgfHwgY2hhbm5lbH1gKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBhdHRyaWJ1dGVBY2Nlc3NvcnM7XG4gIH1cblxuICB1cGRhdGVMYXllck1ldGEoZGF0YUNvbnRhaW5lcikge1xuICAgIGNvbnN0IGdldENvZGUgPSB0aGlzLmdldFBvc2l0aW9uQWNjZXNzb3IoZGF0YUNvbnRhaW5lcik7XG4gICAgW3RoaXMuZGF0YVRvRmVhdHVyZSwgdGhpcy5jb2RlVG9EYXRhXSA9IGdldEdlb2pzb25EYXRhTWFwcyhkYXRhQ29udGFpbmVyLCBnZXRDb2RlKTtcbiAgICBcbiAgICBpZiAoIXRoaXMuZGF0YVRvRmVhdHVyZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGdldCBib3VuZHMgZnJvbSBmZWF0dXJlc1xuICAgIGNvbnN0IGJvdW5kcyA9IGdldEdlb2pzb25Cb3VuZHModGhpcy5kYXRhVG9GZWF0dXJlKTtcbiAgICBcbiAgICAvLyBzayBsYXllciBpcyBhbHdheXMgcG9seWdvblxuICAgIGNvbnN0IGZlYXR1cmVUeXBlcyA9IHtwb2x5Z29uOiB0cnVlfTtcblxuICAgIHRoaXMudXBkYXRlTWV0YSh7Ym91bmRzLCBmZWF0dXJlVHlwZXN9KTtcbiAgfVxuXG4gIHNldEluaXRpYWxMYXllckNvbmZpZyh7ZGF0YUNvbnRhaW5lcn0pIHtcbiAgICB0aGlzLnVwZGF0ZUxheWVyTWV0YShkYXRhQ29udGFpbmVyKTtcblxuICAgIC8vIHNldCBib3RoIGZpbGwgYW5kIHN0cm9rZSB0byB0cnVlXG4gICAgcmV0dXJuIHRoaXMudXBkYXRlTGF5ZXJWaXNDb25maWcoe1xuICAgICAgZmlsbGVkOiB0cnVlLFxuICAgICAgc3Ryb2tlZDogdHJ1ZSxcbiAgICAgIHN0cm9rZUNvbG9yOiBjb2xvck1ha2VyLm5leHQoKS52YWx1ZVxuICAgIH0pO1xuICB9XG4gIFxuICByZW5kZXJMYXllcihvcHRzKSB7XG4gICAgY29uc3Qge2RhdGEsIGdwdUZpbHRlciwgb2JqZWN0SG92ZXJlZCwgbWFwU3RhdGUsIGludGVyYWN0aW9uQ29uZmlnfSA9IG9wdHM7XG4gICAgXG4gICAgY29uc3Qge2ZlYXR1cmVUeXBlc30gPSB0aGlzLm1ldGE7XG4gICAgY29uc3Qgem9vbUZhY3RvciA9IHRoaXMuZ2V0Wm9vbUZhY3RvcihtYXBTdGF0ZSk7XG4gICAgY29uc3QgZWxlWm9vbUZhY3RvciA9IHRoaXMuZ2V0RWxldmF0aW9uWm9vbUZhY3RvcihtYXBTdGF0ZSk7XG5cbiAgICBjb25zdCB7dmlzQ29uZmlnfSA9IHRoaXMuY29uZmlnO1xuXG4gICAgY29uc3QgbGF5ZXJQcm9wcyA9IHtcbiAgICAgIGxpbmVXaWR0aFNjYWxlOiB2aXNDb25maWcudGhpY2tuZXNzICogem9vbUZhY3RvciAqIDgsXG4gICAgICBlbGV2YXRpb25TY2FsZTogdmlzQ29uZmlnLmVsZXZhdGlvblNjYWxlICogZWxlWm9vbUZhY3RvcixcbiAgICAgIGxpbmVNaXRlckxpbWl0OiAyXG4gICAgfTtcblxuICAgIGNvbnN0IHVwZGF0ZVRyaWdnZXJzID0ge1xuICAgICAgLi4udGhpcy5nZXRWaXN1YWxDaGFubmVsVXBkYXRlVHJpZ2dlcnMoKSxcbiAgICAgIGdldEZpbHRlclZhbHVlOiBncHVGaWx0ZXIuZmlsdGVyVmFsdWVVcGRhdGVUcmlnZ2VycyxcbiAgICAgIGdldEZpbGxDb2xvcjoge1xuICAgICAgICBjb2xvckZpZWxkOiB0aGlzLmNvbmZpZy5jb2xvckZpZWxkLFxuICAgICAgICBjb2xvckFnZ3JlZ2F0aW9uOiB2aXNDb25maWcuY29sb3JBZ2dyZWdhdGlvbixcbiAgICAgICAgZmlsdGVyZWRJbmRleExlbmd0aDogdGhpcy5maWx0ZXJlZEluZGV4TGVuZ3RoXG4gICAgICB9LFxuICAgICAgZ2V0RWxldmF0aW9uOiB7XG4gICAgICAgIHNpemVGaWVsZDogdGhpcy5jb25maWcuc2l6ZUZpZWxkLFxuICAgICAgICBzaXplQWdncmVnYXRpb246IHRoaXMuY29uZmlnLnZpc0NvbmZpZy5zaXplQWdncmVnYXRpb25cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgZGVmYXVsdExheWVyUHJvcHMgPSB0aGlzLmdldERlZmF1bHREZWNrTGF5ZXJQcm9wcyhvcHRzKTtcbiAgICBjb25zdCBvcGFPdmVyd3JpdGUgPSB7XG4gICAgICBvcGFjaXR5OiB2aXNDb25maWcuc3Ryb2tlT3BhY2l0eVxuICAgIH07XG5cbiAgICBjb25zdCBwaWNrYWJsZSA9IGludGVyYWN0aW9uQ29uZmlnLnRvb2x0aXAuZW5hYmxlZDtcbiAgICBjb25zdCBob3ZlcmVkT2JqZWN0ID0gdGhpcy5oYXNIb3ZlcmVkT2JqZWN0KG9iamVjdEhvdmVyZWQpO1xuICAgIFxuICAgIHJldHVybiBbXG4gICAgICBuZXcgRGVja0dMR2VvSnNvbkxheWVyKHtcbiAgICAgICAgLi4uZGVmYXVsdExheWVyUHJvcHMsXG4gICAgICAgIC4uLmxheWVyUHJvcHMsXG4gICAgICAgIFxuICAgICAgICAuLi5kYXRhLFxuXG4gICAgICAgIGZpbGxlZDogdmlzQ29uZmlnLmZpbGxlZCxcbiAgICAgICAgc3Ryb2tlZDogdmlzQ29uZmlnLnN0cm9rZWQsXG4gICAgICAgIGV4dHJ1ZGVkOiB2aXNDb25maWcuZW5hYmxlM2QsXG4gICAgICAgIHdpcmVmcmFtZTogdmlzQ29uZmlnLndpcmVmcmFtZSxcbiAgICAgICAgXG4gICAgICAgIHBpY2thYmxlLFxuICAgICAgICBoaWdobGlnaHRDb2xvcjogSElHSExJR0hfQ09MT1JfM0QsXG4gICAgICAgIGF1dG9IaWdobGlnaHQ6IHZpc0NvbmZpZy5lbmFibGUzZCAmJiBwaWNrYWJsZSxcbiAgICAgICAgd3JhcExvbmdpdHVkZTogZmFsc2UsXG4gICAgICAgIHJvdW5kZWQ6IHRydWUsXG5cbiAgICAgICAgdXBkYXRlVHJpZ2dlcnMsXG5cbiAgICAgICAgX3N1YkxheWVyUHJvcHM6IHtcbiAgICAgICAgICAuLi4oZmVhdHVyZVR5cGVzLnBvbHlnb24gPyB7J3BvbHlnb25zLXN0cm9rZSc6IG9wYU92ZXJ3cml0ZX0gOiB7fSksXG4gICAgICAgICAgLi4uKGZlYXR1cmVUeXBlcy5saW5lID8geydsaW5lLXN0cmluZ3MnOiBvcGFPdmVyd3JpdGV9IDoge30pLFxuICAgICAgICAgIC4uLihmZWF0dXJlVHlwZXMucG9pbnRcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIHBvaW50czoge1xuICAgICAgICAgICAgICAgICAgbGluZU9wYWNpdHk6IHZpc0NvbmZpZy5zdHJva2VPcGFjaXR5XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA6IHt9KVxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIC4uLihob3ZlcmVkT2JqZWN0ICYmICF2aXNDb25maWcuZW5hYmxlM2RcbiAgICAgICAgPyBbXG4gICAgICAgICAgICBuZXcgRGVja0dMR2VvSnNvbkxheWVyKHtcbiAgICAgICAgICAgICAgLi4udGhpcy5nZXREZWZhdWx0SG92ZXJMYXllclByb3BzKCksXG4gICAgICAgICAgICAgIC4uLmxheWVyUHJvcHMsXG4gICAgICAgICAgICAgIHdyYXBMb25naXR1ZGU6IGZhbHNlLFxuICAgICAgICAgICAgICBkYXRhOiBbaG92ZXJlZE9iamVjdF0sXG4gICAgICAgICAgICAgIGdldEVsZXZhdGlvbjogZGF0YS5nZXRFbGV2YXRpb24sXG4gICAgICAgICAgICAgIGdldExpbmVDb2xvcjogdGhpcy5jb25maWcuaGlnaGxpZ2h0Q29sb3IsXG4gICAgICAgICAgICAgIGdldEZpbGxDb2xvcjogdGhpcy5jb25maWcuaGlnaGxpZ2h0Q29sb3IsXG4gICAgICAgICAgICAgIC8vIGFsd2F5cyBkcmF3IG91dGxpbmVcbiAgICAgICAgICAgICAgc3Ryb2tlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgZmlsbGVkOiBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdXG4gICAgICAgIDogW10pXG4gICAgXTtcbiAgfVxufVxuIl19