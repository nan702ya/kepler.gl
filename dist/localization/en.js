"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _locales = require("./locales");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = {
  property: {
    weight: 'weight',
    label: 'label',
    fillColor: 'fill color',
    color: 'color',
    coverage: 'coverage',
    strokeColor: 'stroke color',
    radius: 'radius',
    outline: 'outline',
    stroke: 'stroke',
    density: 'density',
    height: 'height',
    sum: 'sum',
    pointCount: 'Point Count'
  },
  placeholder: {
    search: 'Search',
    selectField: 'Select a field',
    yAxis: 'Y Axis',
    selectType: 'Select A Type',
    selectValue: 'Select A Value',
    enterValue: 'Enter a value',
    empty: 'empty'
  },
  misc: {
    by: '',
    valuesIn: 'Values in',
    valueEquals: 'Value equals',
    dataSource: 'Data Source',
    brushRadius: 'Brush Radius (km)',
    empty: ' '
  },
  mapLayers: {
    title: 'Map Layers',
    label: 'Label',
    road: 'Road',
    border: 'Border',
    building: 'Building',
    water: 'Water',
    land: 'Land',
    '3dBuilding': '3d Building'
  },
  panel: {
    text: {
      label: 'label',
      labelWithId: 'Label {labelId}',
      fontSize: 'Font size',
      fontColor: 'Font color',
      textAnchor: 'Text anchor',
      alignment: 'Alignment',
      addMoreLabel: 'Add More Label'
    }
  },
  sidebar: {
    panels: {
      layer: 'Layers',
      filter: 'Filters',
      interaction: 'Interactions',
      basemap: 'Base map'
    }
  },
  layer: {
    required: 'Required*',
    radius: 'Radius',
    color: 'Color',
    fillColor: 'Fill Color',
    outline: 'Outline',
    weight: 'Weight',
    propertyBasedOn: '{property} based on',
    coverage: 'Coverage',
    stroke: 'Stroke',
    strokeWidth: 'Stroke Width',
    strokeColor: 'Stroke Color',
    basic: 'Basic',
    trailLength: 'Trail Length',
    trailLengthDescription: 'Number of seconds for a path to completely fade out',
    newLayer: 'new layer',
    elevationByDescription: 'When off, height is based on count of points',
    colorByDescription: 'When off, color is based on count of points',
    aggregateBy: 'Aggregate {field} by',
    '3DModel': '3D Model',
    '3DModelOptions': '3D Model Options',
    type: {
      point: 'point',
      arc: 'arc',
      line: 'line',
      grid: 'grid',
      hexbin: 'hexbin',
      polygon: 'polygon',
      geojson: 'geojson',
      cluster: 'cluster',
      icon: 'icon',
      heatmap: 'heatmap',
      hexagon: 'hexagon',
      hexagonid: 'H3',
      trip: 'trip',
      s2: 'S2',
      '3d': '3D',
      sk: 'SK'
    }
  },
  layerVisConfigs: {
    angle: 'Angle',
    strokeWidth: 'Stroke Width (Pixels)',
    strokeWidthRange: 'Stroke Width Range',
    radius: 'Radius',
    fixedRadius: 'Fixed Radius to meter',
    fixedRadiusDescription: 'Map radius to absolute radius in meters, e.g. 5 to 5 meters',
    radiusRange: 'Radius Range',
    clusterRadius: 'Cluster Radius in Pixels',
    radiusRangePixels: 'Radius Range in pixels',
    opacity: 'Opacity',
    coverage: 'Coverage',
    outline: 'Outline',
    colorRange: 'Color range',
    stroke: 'Stroke',
    strokeColor: 'Stroke Color',
    strokeColorRange: 'Stroke Color range',
    targetColor: 'Target Color',
    colorAggregation: 'Color Aggregation',
    heightAggregation: 'Height Aggregation',
    resolutionRange: 'Resolution range',
    sizeScale: 'Size Scale',
    worldUnitSize: 'World Unit Size',
    elevationScale: 'Elevation Scale',
    enableElevationZoomFactor: 'Use elevation zoom factor',
    enableElevationZoomFactorDescription: 'Adjust height/elevation based on current zoom factor',
    enableHeightZoomFactor: 'Use height zoom factor',
    heightScale: 'Height Scale',
    coverageRange: 'Coverage Range',
    highPrecisionRendering: 'High Precision Rendering',
    highPrecisionRenderingDescription: 'High precision will result in slower performance',
    height: 'Height',
    heightDescription: 'Click button at top right of the map to switch to 3d view',
    fill: 'Fill',
    enablePolygonHeight: 'Enable Polygon Height',
    showWireframe: 'Show Wireframe',
    weightIntensity: 'Weight Intensity',
    zoomScale: 'Zoom Scale',
    heightRange: 'Height Range',
    heightMultiplier: 'Height Multiplier'
  },
  layerManager: {
    addData: 'Add Data',
    addLayer: 'Add Layer',
    layerBlending: 'Layer Blending'
  },
  mapManager: {
    mapStyle: 'Map style',
    addMapStyle: 'Add Map Style',
    '3dBuildingColor': '3D Building Color'
  },
  layerConfiguration: {
    defaultDescription: 'Calculate {property} based on selected field',
    howTo: 'How to'
  },
  filterManager: {
    addFilter: 'Add Filter'
  },
  datasetTitle: {
    showDataTable: 'Show data table',
    removeDataset: 'Remove dataset'
  },
  datasetInfo: {
    rowCount: '{rowCount} rows'
  },
  tooltip: {
    hideLayer: 'hide layer',
    showLayer: 'show layer',
    hideFeature: 'Hide Feature',
    showFeature: 'Show feature',
    hide: 'hide',
    show: 'show',
    removeLayer: 'Remove layer',
    duplicateLayer: 'Duplicate layer',
    layerSettings: 'Layer settings',
    closePanel: 'Close current panel',
    switchToDualView: 'Switch to dual map view',
    showLegend: 'show legend',
    disable3DMap: 'Disable 3D Map',
    DrawOnMap: 'Draw on map',
    selectLocale: 'Select locale',
    hideLayerPanel: 'Hide layer panel',
    showLayerPanel: 'Show layer panel',
    moveToTop: 'Move to top of data layers',
    selectBaseMapStyle: 'Select Base Map Style',
    "delete": 'Delete',
    timePlayback: 'Time Playback',
    cloudStorage: 'Cloud Storage',
    '3DMap': '3D Map',
    animationByWindow: 'Moving Time Window',
    animationByIncremental: 'Incremental Time Window',
    speed: 'speed',
    play: 'play',
    pause: 'pause',
    reset: 'reset'
  },
  toolbar: _objectSpread({
    exportImage: 'Export Image',
    exportData: 'Export Data',
    exportMap: 'Export Map',
    shareMapURL: 'Share Map URL',
    saveMap: 'Save Map',
    select: 'Select',
    polygon: 'Polygon',
    rectangle: 'Rectangle',
    hide: 'Hide',
    show: 'Show'
  }, _locales.LOCALES),
  editor: {
    filterLayer: 'Filter Layers',
    copyGeometry: 'Copy Geometry'
  },
  modal: {
    title: {
      deleteDataset: 'Delete Dataset',
      addDataToMap: 'Add Data To Map',
      exportImage: 'Export Image',
      exportData: 'Export Data',
      exportMap: 'Export Map',
      addCustomMapboxStyle: 'Add Custom Map Style',
      saveMap: 'Save Map',
      shareURL: 'Share URL'
    },
    button: {
      "delete": 'Delete',
      download: 'Download',
      "export": 'Export',
      addStyle: 'Add Style',
      save: 'Save',
      defaultCancel: 'Cancel',
      defaultConfirm: 'Confirm'
    },
    exportImage: {
      ratioTitle: 'Ratio',
      ratioDescription: 'Choose the ratio for various usages.',
      ratioOriginalScreen: 'Original Screen',
      ratioCustom: 'Custom',
      ratio4_3: '4:3',
      ratio16_9: '16:9',
      resolutionTitle: 'Resolution',
      resolutionDescription: 'High resolution is better for prints.',
      mapLegendTitle: 'Map Legend',
      mapLegendAdd: 'Add legend on map'
    },
    exportData: {
      datasetTitle: 'Dataset',
      datasetSubtitle: 'Choose the datasets you want to export',
      allDatasets: 'All',
      dataTypeTitle: 'Data Type',
      dataTypeSubtitle: 'Choose the type of data you want to export',
      filterDataTitle: 'Filter Data',
      filterDataSubtitle: 'You can choose exporting original data or filtered data',
      filteredData: 'Filtered data',
      unfilteredData: 'Unfiltered Data',
      fileCount: '{fileCount} Files',
      rowCount: '{rowCount} Rows'
    },
    deleteData: {
      warning: 'you are going to delete this dataset. It will affect {length} layers'
    },
    addStyle: {
      publishTitle: '2. If entered mapbox stule url in step.1, publish your style at mapbox or provide access token. (Optional)',
      publishSubtitle1: 'You can create your own map style at',
      publishSubtitle2: 'and',
      publishSubtitle3: 'publish',
      publishSubtitle4: 'it.',
      publishSubtitle5: 'To use private style, paste your',
      publishSubtitle6: 'access token',
      publishSubtitle7: 'here. *kepler.gl is a client-side application, data stays in your browser..',
      exampleToken: 'e.g. pk.abcdefg.xxxxxx',
      pasteTitle: '1. Paste style url',
      pasteSubtitle0: 'Style url can be a mapbox',
      pasteSubtitle1: 'What is a',
      pasteSubtitle2: 'style URL',
      pasteSubtitle3: 'or a style.json using the',
      pasteSubtitle4: 'Mapbox GL Style Spec',
      namingTitle: '3. Name your style'
    },
    shareMap: {
      shareUriTitle: 'Share Map Url',
      shareUriSubtitle: 'Generate a map url to share with others',
      cloudTitle: 'Cloud storage',
      cloudSubtitle: 'Login and upload map data to your personal cloud storage',
      shareDisclaimer: 'kepler.gl will save your map data to your personal cloud storage, only people with the URL can access your map and data. ' + 'You can edit/delete the data file in your cloud account anytime.',
      gotoPage: 'Go to your Kepler.gl {currentProvider} page'
    },
    statusPanel: {
      mapUploading: 'Map Uploading',
      error: 'Error'
    },
    saveMap: {
      title: 'Cloud storage',
      subtitle: 'Login to save map to your personal cloud storage'
    },
    exportMap: {
      formatTitle: 'Map format',
      formatSubtitle: 'Choose the format to export your map to',
      html: {
        selection: 'Export your map into an interactive html file.',
        tokenTitle: 'Mapbox access token',
        tokenSubtitle: 'Use your own Mapbox access token in the html (optional)',
        tokenPlaceholder: 'Paste your Mapbox access token',
        tokenMisuseWarning: '* If you do not provide your own token, the map may fail to display at any time when we replace ours to avoid misuse. ',
        tokenDisclaimer: 'You can change the Mapbox token later using the following instructions: ',
        tokenUpdate: 'How to update an existing map token.',
        modeTitle: 'Map Mode',
        modeSubtitle1: 'Select the app mode. More ',
        modeSubtitle2: 'info',
        modeDescription: 'Allow users to {mode} the map',
        read: 'read',
        edit: 'edit'
      },
      json: {
        configTitle: 'Map Config',
        configDisclaimer: 'Map config will be included in the Json file. If you are using kepler.gl in your own app. You can copy this config and pass it to ',
        selection: 'Export current map data and config into a single Json file. You can later open the same map by uploading this file to kepler.gl.',
        disclaimer: '* Map config is coupled with loaded datasets. ‘dataId’ is used to bind layers, filters, and tooltips to a specific dataset. ' + 'When passing this config to addDataToMap, make sure the dataset id matches the dataId/s in this config.'
      }
    },
    loadingDialog: {
      loading: 'Loading...'
    },
    loadData: {
      upload: 'Load Files',
      storage: 'Load from Storage'
    },
    tripInfo: {
      title: 'How to enable trip animation',
      description1: 'In order to animate the path, the geoJSON data needs to contain `LineString` in its feature geometry, and the coordinates in the LineString need to have 4 elements in the formats of',
      code: ' [longitude, latitude, altitude, timestamp] ',
      description2: 'with the last element being a timestamp. Valid timestamp formats include unix in seconds such as `1564184363` or in milliseconds such as `1564184363000`.',
      example: 'Example:'
    },
    iconInfo: {
      title: 'How to draw icons',
      description1: 'In your csv, create a column, put the name of the icon you want to draw in it. You can leave the cell empty if you do not want the icon to show for some points. When the column is named',
      code: 'icon',
      description2: ' kepler.gl will automatically create a icon layer for you.',
      example: 'Example:',
      icons: 'Icons'
    },
    storageMapViewer: {
      lastModified: 'Last modified {lastUpdated} ago',
      back: 'Back'
    },
    overwriteMap: {
      title: 'Saving map...',
      alreadyExists: 'already exists in your {mapSaved}. Would you like to overwrite it?'
    },
    loadStorageMap: {
      back: 'Back',
      goToPage: 'Go to your Kepler.gl {displayName} page',
      storageMaps: 'Storage / Maps',
      noSavedMaps: 'No saved maps yet'
    }
  },
  header: {
    visibleLayers: 'Visible layers',
    layerLegend: 'Legend'
  },
  interactions: {
    tooltip: 'Tooltip',
    brush: 'Brush',
    coordinate: 'Coordinates',
    geocoder: 'Geocoder'
  },
  layerBlending: {
    title: 'Layer Blending',
    additive: 'additive',
    normal: 'normal',
    subtractive: 'subtractive'
  },
  columns: {
    title: 'Columns',
    lat: 'lat',
    lng: 'lon',
    altitude: 'altitude',
    icon: 'icon',
    geojson: 'geojson',
    token: 'token',
    arc: {
      lat0: 'source lat',
      lng0: 'source lng',
      lat1: 'target lat',
      lng1: 'target lng'
    },
    line: {
      alt0: 'source altitude',
      alt1: 'target altitude'
    },
    grid: {
      worldUnitSize: 'Grid Size (km)'
    },
    hexagon: {
      worldUnitSize: 'Hexagon Radius (km)'
    },
    hex_id: 'hex id',
    sk: {
      code: 'Code'
    }
  },
  color: {
    customPalette: 'Custom Palette',
    steps: 'steps',
    type: 'type',
    reversed: 'reversed'
  },
  scale: {
    colorScale: 'Color Scale',
    sizeScale: 'Size Scale',
    strokeScale: 'Stroke Scale',
    scale: 'Scale'
  },
  fileUploader: {
    message: 'Drag & Drop Your File(s) Here',
    chromeMessage: '*Chrome user: Limit file size to 250mb, if need to upload larger file, try Safari',
    disclaimer: '*kepler.gl is a client-side application with no server backend. Data lives only on your machine/browser. ' + 'No information or map data is sent to any server.',
    configUploadMessage: 'Upload {fileFormatNames} or saved map **Json**. Read more about [**supported file formats**]',
    browseFiles: 'browse your files',
    uploading: 'Uploading',
    fileNotSupported: 'File {errorFiles} is not supported.',
    or: 'or'
  },
  geocoder: {
    title: 'Enter an address or coordinates, ex 37.79,-122.40'
  },
  fieldSelector: {
    clearAll: 'Clear All',
    formatting: 'Formatting'
  },
  compare: {
    modeLabel: 'Comparison Mode',
    typeLabel: 'Comparison Type',
    types: {
      absolute: 'Absolute',
      relative: 'Relative'
    }
  },
  mapPopover: {
    primary: 'Primary'
  },
  density: 'density',
  'Bug Report': 'Bug Report',
  'User Guide': 'User Guide',
  Save: 'Save',
  Share: 'Share'
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2NhbGl6YXRpb24vZW4uanMiXSwibmFtZXMiOlsicHJvcGVydHkiLCJ3ZWlnaHQiLCJsYWJlbCIsImZpbGxDb2xvciIsImNvbG9yIiwiY292ZXJhZ2UiLCJzdHJva2VDb2xvciIsInJhZGl1cyIsIm91dGxpbmUiLCJzdHJva2UiLCJkZW5zaXR5IiwiaGVpZ2h0Iiwic3VtIiwicG9pbnRDb3VudCIsInBsYWNlaG9sZGVyIiwic2VhcmNoIiwic2VsZWN0RmllbGQiLCJ5QXhpcyIsInNlbGVjdFR5cGUiLCJzZWxlY3RWYWx1ZSIsImVudGVyVmFsdWUiLCJlbXB0eSIsIm1pc2MiLCJieSIsInZhbHVlc0luIiwidmFsdWVFcXVhbHMiLCJkYXRhU291cmNlIiwiYnJ1c2hSYWRpdXMiLCJtYXBMYXllcnMiLCJ0aXRsZSIsInJvYWQiLCJib3JkZXIiLCJidWlsZGluZyIsIndhdGVyIiwibGFuZCIsInBhbmVsIiwidGV4dCIsImxhYmVsV2l0aElkIiwiZm9udFNpemUiLCJmb250Q29sb3IiLCJ0ZXh0QW5jaG9yIiwiYWxpZ25tZW50IiwiYWRkTW9yZUxhYmVsIiwic2lkZWJhciIsInBhbmVscyIsImxheWVyIiwiZmlsdGVyIiwiaW50ZXJhY3Rpb24iLCJiYXNlbWFwIiwicmVxdWlyZWQiLCJwcm9wZXJ0eUJhc2VkT24iLCJzdHJva2VXaWR0aCIsImJhc2ljIiwidHJhaWxMZW5ndGgiLCJ0cmFpbExlbmd0aERlc2NyaXB0aW9uIiwibmV3TGF5ZXIiLCJlbGV2YXRpb25CeURlc2NyaXB0aW9uIiwiY29sb3JCeURlc2NyaXB0aW9uIiwiYWdncmVnYXRlQnkiLCJ0eXBlIiwicG9pbnQiLCJhcmMiLCJsaW5lIiwiZ3JpZCIsImhleGJpbiIsInBvbHlnb24iLCJnZW9qc29uIiwiY2x1c3RlciIsImljb24iLCJoZWF0bWFwIiwiaGV4YWdvbiIsImhleGFnb25pZCIsInRyaXAiLCJzMiIsInNrIiwibGF5ZXJWaXNDb25maWdzIiwiYW5nbGUiLCJzdHJva2VXaWR0aFJhbmdlIiwiZml4ZWRSYWRpdXMiLCJmaXhlZFJhZGl1c0Rlc2NyaXB0aW9uIiwicmFkaXVzUmFuZ2UiLCJjbHVzdGVyUmFkaXVzIiwicmFkaXVzUmFuZ2VQaXhlbHMiLCJvcGFjaXR5IiwiY29sb3JSYW5nZSIsInN0cm9rZUNvbG9yUmFuZ2UiLCJ0YXJnZXRDb2xvciIsImNvbG9yQWdncmVnYXRpb24iLCJoZWlnaHRBZ2dyZWdhdGlvbiIsInJlc29sdXRpb25SYW5nZSIsInNpemVTY2FsZSIsIndvcmxkVW5pdFNpemUiLCJlbGV2YXRpb25TY2FsZSIsImVuYWJsZUVsZXZhdGlvblpvb21GYWN0b3IiLCJlbmFibGVFbGV2YXRpb25ab29tRmFjdG9yRGVzY3JpcHRpb24iLCJlbmFibGVIZWlnaHRab29tRmFjdG9yIiwiaGVpZ2h0U2NhbGUiLCJjb3ZlcmFnZVJhbmdlIiwiaGlnaFByZWNpc2lvblJlbmRlcmluZyIsImhpZ2hQcmVjaXNpb25SZW5kZXJpbmdEZXNjcmlwdGlvbiIsImhlaWdodERlc2NyaXB0aW9uIiwiZmlsbCIsImVuYWJsZVBvbHlnb25IZWlnaHQiLCJzaG93V2lyZWZyYW1lIiwid2VpZ2h0SW50ZW5zaXR5Iiwiem9vbVNjYWxlIiwiaGVpZ2h0UmFuZ2UiLCJoZWlnaHRNdWx0aXBsaWVyIiwibGF5ZXJNYW5hZ2VyIiwiYWRkRGF0YSIsImFkZExheWVyIiwibGF5ZXJCbGVuZGluZyIsIm1hcE1hbmFnZXIiLCJtYXBTdHlsZSIsImFkZE1hcFN0eWxlIiwibGF5ZXJDb25maWd1cmF0aW9uIiwiZGVmYXVsdERlc2NyaXB0aW9uIiwiaG93VG8iLCJmaWx0ZXJNYW5hZ2VyIiwiYWRkRmlsdGVyIiwiZGF0YXNldFRpdGxlIiwic2hvd0RhdGFUYWJsZSIsInJlbW92ZURhdGFzZXQiLCJkYXRhc2V0SW5mbyIsInJvd0NvdW50IiwidG9vbHRpcCIsImhpZGVMYXllciIsInNob3dMYXllciIsImhpZGVGZWF0dXJlIiwic2hvd0ZlYXR1cmUiLCJoaWRlIiwic2hvdyIsInJlbW92ZUxheWVyIiwiZHVwbGljYXRlTGF5ZXIiLCJsYXllclNldHRpbmdzIiwiY2xvc2VQYW5lbCIsInN3aXRjaFRvRHVhbFZpZXciLCJzaG93TGVnZW5kIiwiZGlzYWJsZTNETWFwIiwiRHJhd09uTWFwIiwic2VsZWN0TG9jYWxlIiwiaGlkZUxheWVyUGFuZWwiLCJzaG93TGF5ZXJQYW5lbCIsIm1vdmVUb1RvcCIsInNlbGVjdEJhc2VNYXBTdHlsZSIsInRpbWVQbGF5YmFjayIsImNsb3VkU3RvcmFnZSIsImFuaW1hdGlvbkJ5V2luZG93IiwiYW5pbWF0aW9uQnlJbmNyZW1lbnRhbCIsInNwZWVkIiwicGxheSIsInBhdXNlIiwicmVzZXQiLCJ0b29sYmFyIiwiZXhwb3J0SW1hZ2UiLCJleHBvcnREYXRhIiwiZXhwb3J0TWFwIiwic2hhcmVNYXBVUkwiLCJzYXZlTWFwIiwic2VsZWN0IiwicmVjdGFuZ2xlIiwiTE9DQUxFUyIsImVkaXRvciIsImZpbHRlckxheWVyIiwiY29weUdlb21ldHJ5IiwibW9kYWwiLCJkZWxldGVEYXRhc2V0IiwiYWRkRGF0YVRvTWFwIiwiYWRkQ3VzdG9tTWFwYm94U3R5bGUiLCJzaGFyZVVSTCIsImJ1dHRvbiIsImRvd25sb2FkIiwiYWRkU3R5bGUiLCJzYXZlIiwiZGVmYXVsdENhbmNlbCIsImRlZmF1bHRDb25maXJtIiwicmF0aW9UaXRsZSIsInJhdGlvRGVzY3JpcHRpb24iLCJyYXRpb09yaWdpbmFsU2NyZWVuIiwicmF0aW9DdXN0b20iLCJyYXRpbzRfMyIsInJhdGlvMTZfOSIsInJlc29sdXRpb25UaXRsZSIsInJlc29sdXRpb25EZXNjcmlwdGlvbiIsIm1hcExlZ2VuZFRpdGxlIiwibWFwTGVnZW5kQWRkIiwiZGF0YXNldFN1YnRpdGxlIiwiYWxsRGF0YXNldHMiLCJkYXRhVHlwZVRpdGxlIiwiZGF0YVR5cGVTdWJ0aXRsZSIsImZpbHRlckRhdGFUaXRsZSIsImZpbHRlckRhdGFTdWJ0aXRsZSIsImZpbHRlcmVkRGF0YSIsInVuZmlsdGVyZWREYXRhIiwiZmlsZUNvdW50IiwiZGVsZXRlRGF0YSIsIndhcm5pbmciLCJwdWJsaXNoVGl0bGUiLCJwdWJsaXNoU3VidGl0bGUxIiwicHVibGlzaFN1YnRpdGxlMiIsInB1Ymxpc2hTdWJ0aXRsZTMiLCJwdWJsaXNoU3VidGl0bGU0IiwicHVibGlzaFN1YnRpdGxlNSIsInB1Ymxpc2hTdWJ0aXRsZTYiLCJwdWJsaXNoU3VidGl0bGU3IiwiZXhhbXBsZVRva2VuIiwicGFzdGVUaXRsZSIsInBhc3RlU3VidGl0bGUwIiwicGFzdGVTdWJ0aXRsZTEiLCJwYXN0ZVN1YnRpdGxlMiIsInBhc3RlU3VidGl0bGUzIiwicGFzdGVTdWJ0aXRsZTQiLCJuYW1pbmdUaXRsZSIsInNoYXJlTWFwIiwic2hhcmVVcmlUaXRsZSIsInNoYXJlVXJpU3VidGl0bGUiLCJjbG91ZFRpdGxlIiwiY2xvdWRTdWJ0aXRsZSIsInNoYXJlRGlzY2xhaW1lciIsImdvdG9QYWdlIiwic3RhdHVzUGFuZWwiLCJtYXBVcGxvYWRpbmciLCJlcnJvciIsInN1YnRpdGxlIiwiZm9ybWF0VGl0bGUiLCJmb3JtYXRTdWJ0aXRsZSIsImh0bWwiLCJzZWxlY3Rpb24iLCJ0b2tlblRpdGxlIiwidG9rZW5TdWJ0aXRsZSIsInRva2VuUGxhY2Vob2xkZXIiLCJ0b2tlbk1pc3VzZVdhcm5pbmciLCJ0b2tlbkRpc2NsYWltZXIiLCJ0b2tlblVwZGF0ZSIsIm1vZGVUaXRsZSIsIm1vZGVTdWJ0aXRsZTEiLCJtb2RlU3VidGl0bGUyIiwibW9kZURlc2NyaXB0aW9uIiwicmVhZCIsImVkaXQiLCJqc29uIiwiY29uZmlnVGl0bGUiLCJjb25maWdEaXNjbGFpbWVyIiwiZGlzY2xhaW1lciIsImxvYWRpbmdEaWFsb2ciLCJsb2FkaW5nIiwibG9hZERhdGEiLCJ1cGxvYWQiLCJzdG9yYWdlIiwidHJpcEluZm8iLCJkZXNjcmlwdGlvbjEiLCJjb2RlIiwiZGVzY3JpcHRpb24yIiwiZXhhbXBsZSIsImljb25JbmZvIiwiaWNvbnMiLCJzdG9yYWdlTWFwVmlld2VyIiwibGFzdE1vZGlmaWVkIiwiYmFjayIsIm92ZXJ3cml0ZU1hcCIsImFscmVhZHlFeGlzdHMiLCJsb2FkU3RvcmFnZU1hcCIsImdvVG9QYWdlIiwic3RvcmFnZU1hcHMiLCJub1NhdmVkTWFwcyIsImhlYWRlciIsInZpc2libGVMYXllcnMiLCJsYXllckxlZ2VuZCIsImludGVyYWN0aW9ucyIsImJydXNoIiwiY29vcmRpbmF0ZSIsImdlb2NvZGVyIiwiYWRkaXRpdmUiLCJub3JtYWwiLCJzdWJ0cmFjdGl2ZSIsImNvbHVtbnMiLCJsYXQiLCJsbmciLCJhbHRpdHVkZSIsInRva2VuIiwibGF0MCIsImxuZzAiLCJsYXQxIiwibG5nMSIsImFsdDAiLCJhbHQxIiwiaGV4X2lkIiwiY3VzdG9tUGFsZXR0ZSIsInN0ZXBzIiwicmV2ZXJzZWQiLCJzY2FsZSIsImNvbG9yU2NhbGUiLCJzdHJva2VTY2FsZSIsImZpbGVVcGxvYWRlciIsIm1lc3NhZ2UiLCJjaHJvbWVNZXNzYWdlIiwiY29uZmlnVXBsb2FkTWVzc2FnZSIsImJyb3dzZUZpbGVzIiwidXBsb2FkaW5nIiwiZmlsZU5vdFN1cHBvcnRlZCIsIm9yIiwiZmllbGRTZWxlY3RvciIsImNsZWFyQWxsIiwiZm9ybWF0dGluZyIsImNvbXBhcmUiLCJtb2RlTGFiZWwiLCJ0eXBlTGFiZWwiLCJ0eXBlcyIsImFic29sdXRlIiwicmVsYXRpdmUiLCJtYXBQb3BvdmVyIiwicHJpbWFyeSIsIlNhdmUiLCJTaGFyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFvQkE7Ozs7OztlQUVlO0FBQ2JBLEVBQUFBLFFBQVEsRUFBRTtBQUNSQyxJQUFBQSxNQUFNLEVBQUUsUUFEQTtBQUVSQyxJQUFBQSxLQUFLLEVBQUUsT0FGQztBQUdSQyxJQUFBQSxTQUFTLEVBQUUsWUFISDtBQUlSQyxJQUFBQSxLQUFLLEVBQUUsT0FKQztBQUtSQyxJQUFBQSxRQUFRLEVBQUUsVUFMRjtBQU1SQyxJQUFBQSxXQUFXLEVBQUUsY0FOTDtBQU9SQyxJQUFBQSxNQUFNLEVBQUUsUUFQQTtBQVFSQyxJQUFBQSxPQUFPLEVBQUUsU0FSRDtB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LEtBQUssRUFBRTtBQUpGLEdBdmFNO0FBNmFiRyxFQUFBQSxZQUFZLEVBQUU7QUFDWkMsSUFBQUEsT0FBTyxFQUFFLCtCQURHO0FBRVpDLElBQUFBLGFBQWEsRUFDWCxtRkFIVTtBQUlacEQsSUFBQUEsVUFBVSxFQUNSLDhHQUNBLG1EQU5VO0FBT1pxRCxJQUFBQSxtQkFBbUIsRUFDakIsOEZBUlU7QUFTWkMsSUFBQUEsV0FBVyxFQUFFLG1CQVREO0FBVVpDLElBQUFBLFNBQVMsRUFBRSxXQVZDO0FBV1pDLElBQUFBLGdCQUFnQixFQUFFLHFDQVhOO0FBWVpDLElBQUFBLEVBQUUsRUFBRTtBQVpRLEdBN2FEO0FBMmJiN0IsRUFBQUEsUUFBUSxFQUFFO0FBQ1JsUCxJQUFBQSxLQUFLLEVBQUU7QUFEQyxHQTNiRztBQThiYmdSLEVBQUFBLGFBQWEsRUFBRTtBQUNiQyxJQUFBQSxRQUFRLEVBQUUsV0FERztBQUViQyxJQUFBQSxVQUFVLEVBQUU7QUFGQyxHQTliRjtBQWtjYkMsRUFBQUEsT0FBTyxFQUFFO0FBQ1BDLElBQUFBLFNBQVMsRUFBRSxpQkFESjtBQUVQQyxJQUFBQSxTQUFTLEVBQUUsaUJBRko7QUFHUEMsSUFBQUEsS0FBSyxFQUFFO0FBQ0xDLE1BQUFBLFFBQVEsRUFBRSxVQURMO0FBRUxDLE1BQUFBLFFBQVEsRUFBRTtBQUZMO0FBSEEsR0FsY0k7QUEwY2JDLEVBQUFBLFVBQVUsRUFBRTtBQUNWQyxJQUFBQSxPQUFPLEVBQUU7QUFEQyxHQTFjQztBQTZjYjdTLEVBQUFBLE9BQU8sRUFBRSxTQTdjSTtBQThjYixnQkFBYyxZQTljRDtBQStjYixnQkFBYyxZQS9jRDtBQWdkYjhTLEVBQUFBLElBQUksRUFBRSxNQWhkTztBQWlkYkMsRUFBQUEsS0FBSyxFQUFFO0FBamRNLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjEgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge0xPQ0FMRVN9IGZyb20gJy4vbG9jYWxlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcGVydHk6IHtcbiAgICB3ZWlnaHQ6ICd3ZWlnaHQnLFxuICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgIGZpbGxDb2xvcjogJ2ZpbGwgY29sb3InLFxuICAgIGNvbG9yOiAnY29sb3InLFxuICAgIGNvdmVyYWdlOiAnY292ZXJhZ2UnLFxuICAgIHN0cm9rZUNvbG9yOiAnc3Ryb2tlIGNvbG9yJyxcbiAgICByYWRpdXM6ICdyYWRpdXMnLFxuICAgIG91dGxpbmU6ICdvdXRsaW5lJyxcbiAgICBzdHJva2U6ICdzdHJva2UnLFxuICAgIGRlbnNpdHk6ICdkZW5zaXR5JyxcbiAgICBoZWlnaHQ6ICdoZWlnaHQnLFxuICAgIHN1bTogJ3N1bScsXG4gICAgcG9pbnRDb3VudDogJ1BvaW50IENvdW50J1xuICB9LFxuICBwbGFjZWhvbGRlcjoge1xuICAgIHNlYXJjaDogJ1NlYXJjaCcsXG4gICAgc2VsZWN0RmllbGQ6ICdTZWxlY3QgYSBmaWVsZCcsXG4gICAgeUF4aXM6ICdZIEF4aXMnLFxuICAgIHNlbGVjdFR5cGU6ICdTZWxlY3QgQSBUeXBlJyxcbiAgICBzZWxlY3RWYWx1ZTogJ1NlbGVjdCBBIFZhbHVlJyxcbiAgICBlbnRlclZhbHVlOiAnRW50ZXIgYSB2YWx1ZScsXG4gICAgZW1wdHk6ICdlbXB0eSdcbiAgfSxcbiAgbWlzYzoge1xuICAgIGJ5OiAnJyxcbiAgICB2YWx1ZXNJbjogJ1ZhbHVlcyBpbicsXG4gICAgdmFsdWVFcXVhbHM6ICdWYWx1ZSBlcXVhbHMnLFxuICAgIGRhdGFTb3VyY2U6ICdEYXRhIFNvdXJjZScsXG4gICAgYnJ1c2hSYWRpdXM6ICdCcnVzaCBSYWRpdXMgKGttKScsXG4gICAgZW1wdHk6ICcgJ1xuICB9LFxuICBtYXBMYXllcnM6IHtcbiAgICB0aXRsZTogJ01hcCBMYXllcnMnLFxuICAgIGxhYmVsOiAnTGFiZWwnLFxuICAgIHJvYWQ6ICdSb2FkJyxcbiAgICBib3JkZXI6ICdCb3JkZXInLFxuICAgIGJ1aWxkaW5nOiAnQnVpbGRpbmcnLFxuICAgIHdhdGVyOiAnV2F0ZXInLFxuICAgIGxhbmQ6ICdMYW5kJyxcbiAgICAnM2RCdWlsZGluZyc6ICczZCBCdWlsZGluZydcbiAgfSxcbiAgcGFuZWw6IHtcbiAgICB0ZXh0OiB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIGxhYmVsV2l0aElkOiAnTGFiZWwge2xhYmVsSWR9JyxcbiAgICAgIGZvbnRTaXplOiAnRm9udCBzaXplJyxcbiAgICAgIGZvbnRDb2xvcjogJ0ZvbnQgY29sb3InLFxuICAgICAgdGV4dEFuY2hvcjogJ1RleHQgYW5jaG9yJyxcbiAgICAgIGFsaWdubWVudDogJ0FsaWdubWVudCcsXG4gICAgICBhZGRNb3JlTGFiZWw6ICdBZGQgTW9yZSBMYWJlbCdcbiAgICB9XG4gIH0sXG4gIHNpZGViYXI6IHtcbiAgICBwYW5lbHM6IHtcbiAgICAgIGxheWVyOiAnTGF5ZXJzJyxcbiAgICAgIGZpbHRlcjogJ0ZpbHRlcnMnLFxuICAgICAgaW50ZXJhY3Rpb246ICdJbnRlcmFjdGlvbnMnLFxuICAgICAgYmFzZW1hcDogJ0Jhc2UgbWFwJ1xuICAgIH1cbiAgfSxcbiAgbGF5ZXI6IHtcbiAgICByZXF1aXJlZDogJ1JlcXVpcmVkKicsXG4gICAgcmFkaXVzOiAnUmFkaXVzJyxcbiAgICBjb2xvcjogJ0NvbG9yJyxcbiAgICBmaWxsQ29sb3I6ICdGaWxsIENvbG9yJyxcbiAgICBvdXRsaW5lOiAnT3V0bGluZScsXG4gICAgd2VpZ2h0OiAnV2VpZ2h0JyxcbiAgICBwcm9wZXJ0eUJhc2VkT246ICd7cHJvcGVydHl9IGJhc2VkIG9uJyxcbiAgICBjb3ZlcmFnZTogJ0NvdmVyYWdlJyxcbiAgICBzdHJva2U6ICdTdHJva2UnLFxuICAgIHN0cm9rZVdpZHRoOiAnU3Ryb2tlIFdpZHRoJyxcbiAgICBzdHJva2VDb2xvcjogJ1N0cm9rZSBDb2xvcicsXG4gICAgYmFzaWM6ICdCYXNpYycsXG4gICAgdHJhaWxMZW5ndGg6ICdUcmFpbCBMZW5ndGgnLFxuICAgIHRyYWlsTGVuZ3RoRGVzY3JpcHRpb246ICdOdW1iZXIgb2Ygc2Vjb25kcyBmb3IgYSBwYXRoIHRvIGNvbXBsZXRlbHkgZmFkZSBvdXQnLFxuICAgIG5ld0xheWVyOiAnbmV3IGxheWVyJyxcbiAgICBlbGV2YXRpb25CeURlc2NyaXB0aW9uOiAnV2hlbiBvZmYsIGhlaWdodCBpcyBiYXNlZCBvbiBjb3VudCBvZiBwb2ludHMnLFxuICAgIGNvbG9yQnlEZXNjcmlwdGlvbjogJ1doZW4gb2ZmLCBjb2xvciBpcyBiYXNlZCBvbiBjb3VudCBvZiBwb2ludHMnLFxuICAgIGFnZ3JlZ2F0ZUJ5OiAnQWdncmVnYXRlIHtmaWVsZH0gYnknLFxuICAgICczRE1vZGVsJzogJzNEIE1vZGVsJyxcbiAgICAnM0RNb2RlbE9wdGlvbnMnOiAnM0QgTW9kZWwgT3B0aW9ucycsXG4gICAgdHlwZToge1xuICAgICAgcG9pbnQ6ICdwb2ludCcsXG4gICAgICBhcmM6ICdhcmMnLFxuICAgICAgbGluZTogJ2xpbmUnLFxuICAgICAgZ3JpZDogJ2dyaWQnLFxuICAgICAgaGV4YmluOiAnaGV4YmluJyxcbiAgICAgIHBvbHlnb246ICdwb2x5Z29uJyxcbiAgICAgIGdlb2pzb246ICdnZW9qc29uJyxcbiAgICAgIGNsdXN0ZXI6ICdjbHVzdGVyJyxcbiAgICAgIGljb246ICdpY29uJyxcbiAgICAgIGhlYXRtYXA6ICdoZWF0bWFwJyxcbiAgICAgIGhleGFnb246ICdoZXhhZ29uJyxcbiAgICAgIGhleGFnb25pZDogJ0gzJyxcbiAgICAgIHRyaXA6ICd0cmlwJyxcbiAgICAgIHMyOiAnUzInLFxuICAgICAgJzNkJzogJzNEJyxcbiAgICAgIHNrOiAnU0snXG4gICAgfVxuICB9LFxuICBsYXllclZpc0NvbmZpZ3M6IHtcbiAgICBhbmdsZTogJ0FuZ2xlJyxcbiAgICBzdHJva2VXaWR0aDogJ1N0cm9rZSBXaWR0aCAoUGl4ZWxzKScsXG4gICAgc3Ryb2tlV2lkdGhSYW5nZTogJ1N0cm9rZSBXaWR0aCBSYW5nZScsXG4gICAgcmFkaXVzOiAnUmFkaXVzJyxcbiAgICBmaXhlZFJhZGl1czogJ0ZpeGVkIFJhZGl1cyB0byBtZXRlcicsXG4gICAgZml4ZWRSYWRpdXNEZXNjcmlwdGlvbjogJ01hcCByYWRpdXMgdG8gYWJzb2x1dGUgcmFkaXVzIGluIG1ldGVycywgZS5nLiA1IHRvIDUgbWV0ZXJzJyxcbiAgICByYWRpdXNSYW5nZTogJ1JhZGl1cyBSYW5nZScsXG4gICAgY2x1c3RlclJhZGl1czogJ0NsdXN0ZXIgUmFkaXVzIGluIFBpeGVscycsXG4gICAgcmFkaXVzUmFuZ2VQaXhlbHM6ICdSYWRpdXMgUmFuZ2UgaW4gcGl4ZWxzJyxcbiAgICBvcGFjaXR5OiAnT3BhY2l0eScsXG4gICAgY292ZXJhZ2U6ICdDb3ZlcmFnZScsXG4gICAgb3V0bGluZTogJ091dGxpbmUnLFxuICAgIGNvbG9yUmFuZ2U6ICdDb2xvciByYW5nZScsXG4gICAgc3Ryb2tlOiAnU3Ryb2tlJyxcbiAgICBzdHJva2VDb2xvcjogJ1N0cm9rZSBDb2xvcicsXG4gICAgc3Ryb2tlQ29sb3JSYW5nZTogJ1N0cm9rZSBDb2xvciByYW5nZScsXG4gICAgdGFyZ2V0Q29sb3I6ICdUYXJnZXQgQ29sb3InLFxuICAgIGNvbG9yQWdncmVnYXRpb246ICdDb2xvciBBZ2dyZWdhdGlvbicsXG4gICAgaGVpZ2h0QWdncmVnYXRpb246ICdIZWlnaHQgQWdncmVnYXRpb24nLFxuICAgIHJlc29sdXRpb25SYW5nZTogJ1Jlc29sdXRpb24gcmFuZ2UnLFxuICAgIHNpemVTY2FsZTogJ1NpemUgU2NhbGUnLFxuICAgIHdvcmxkVW5pdFNpemU6ICdXb3JsZCBVbml0IFNpemUnLFxuICAgIGVsZXZhdGlvblNjYWxlOiAnRWxldmF0aW9uIFNjYWxlJyxcbiAgICBlbmFibGVFbGV2YXRpb25ab29tRmFjdG9yOiAnVXNlIGVsZXZhdGlvbiB6b29tIGZhY3RvcicsXG4gICAgZW5hYmxlRWxldmF0aW9uWm9vbUZhY3RvckRlc2NyaXB0aW9uOiAnQWRqdXN0IGhlaWdodC9lbGV2YXRpb24gYmFzZWQgb24gY3VycmVudCB6b29tIGZhY3RvcicsXG4gICAgZW5hYmxlSGVpZ2h0Wm9vbUZhY3RvcjogJ1VzZSBoZWlnaHQgem9vbSBmYWN0b3InLFxuICAgIGhlaWdodFNjYWxlOiAnSGVpZ2h0IFNjYWxlJyxcbiAgICBjb3ZlcmFnZVJhbmdlOiAnQ292ZXJhZ2UgUmFuZ2UnLFxuICAgIGhpZ2hQcmVjaXNpb25SZW5kZXJpbmc6ICdIaWdoIFByZWNpc2lvbiBSZW5kZXJpbmcnLFxuICAgIGhpZ2hQcmVjaXNpb25SZW5kZXJpbmdEZXNjcmlwdGlvbjogJ0hpZ2ggcHJlY2lzaW9uIHdpbGwgcmVzdWx0IGluIHNsb3dlciBwZXJmb3JtYW5jZScsXG4gICAgaGVpZ2h0OiAnSGVpZ2h0JyxcbiAgICBoZWlnaHREZXNjcmlwdGlvbjogJ0NsaWNrIGJ1dHRvbiBhdCB0b3AgcmlnaHQgb2YgdGhlIG1hcCB0byBzd2l0Y2ggdG8gM2QgdmlldycsXG4gICAgZmlsbDogJ0ZpbGwnLFxuICAgIGVuYWJsZVBvbHlnb25IZWlnaHQ6ICdFbmFibGUgUG9seWdvbiBIZWlnaHQnLFxuICAgIHNob3dXaXJlZnJhbWU6ICdTaG93IFdpcmVmcmFtZScsXG4gICAgd2VpZ2h0SW50ZW5zaXR5OiAnV2VpZ2h0IEludGVuc2l0eScsXG4gICAgem9vbVNjYWxlOiAnWm9vbSBTY2FsZScsXG4gICAgaGVpZ2h0UmFuZ2U6ICdIZWlnaHQgUmFuZ2UnLFxuICAgIGhlaWdodE11bHRpcGxpZXI6ICdIZWlnaHQgTXVsdGlwbGllcidcbiAgfSxcbiAgbGF5ZXJNYW5hZ2VyOiB7XG4gICAgYWRkRGF0YTogJ0FkZCBEYXRhJyxcbiAgICBhZGRMYXllcjogJ0FkZCBMYXllcicsXG4gICAgbGF5ZXJCbGVuZGluZzogJ0xheWVyIEJsZW5kaW5nJ1xuICB9LFxuICBtYXBNYW5hZ2VyOiB7XG4gICAgbWFwU3R5bGU6ICdNYXAgc3R5bGUnLFxuICAgIGFkZE1hcFN0eWxlOiAnQWRkIE1hcCBTdHlsZScsXG4gICAgJzNkQnVpbGRpbmdDb2xvcic6ICczRCBCdWlsZGluZyBDb2xvcidcbiAgfSxcbiAgbGF5ZXJDb25maWd1cmF0aW9uOiB7XG4gICAgZGVmYXVsdERlc2NyaXB0aW9uOiAnQ2FsY3VsYXRlIHtwcm9wZXJ0eX0gYmFzZWQgb24gc2VsZWN0ZWQgZmllbGQnLFxuICAgIGhvd1RvOiAnSG93IHRvJ1xuICB9LFxuICBmaWx0ZXJNYW5hZ2VyOiB7XG4gICAgYWRkRmlsdGVyOiAnQWRkIEZpbHRlcidcbiAgfSxcbiAgZGF0YXNldFRpdGxlOiB7XG4gICAgc2hvd0RhdGFUYWJsZTogJ1Nob3cgZGF0YSB0YWJsZScsXG4gICAgcmVtb3ZlRGF0YXNldDogJ1JlbW92ZSBkYXRhc2V0J1xuICB9LFxuICBkYXRhc2V0SW5mbzoge1xuICAgIHJvd0NvdW50OiAne3Jvd0NvdW50fSByb3dzJ1xuICB9LFxuICB0b29sdGlwOiB7XG4gICAgaGlkZUxheWVyOiAnaGlkZSBsYXllcicsXG4gICAgc2hvd0xheWVyOiAnc2hvdyBsYXllcicsXG4gICAgaGlkZUZlYXR1cmU6ICdIaWRlIEZlYXR1cmUnLFxuICAgIHNob3dGZWF0dXJlOiAnU2hvdyBmZWF0dXJlJyxcbiAgICBoaWRlOiAnaGlkZScsXG4gICAgc2hvdzogJ3Nob3cnLFxuICAgIHJlbW92ZUxheWVyOiAnUmVtb3ZlIGxheWVyJyxcbiAgICBkdXBsaWNhdGVMYXllcjogJ0R1cGxpY2F0ZSBsYXllcicsXG4gICAgbGF5ZXJTZXR0aW5nczogJ0xheWVyIHNldHRpbmdzJyxcbiAgICBjbG9zZVBhbmVsOiAnQ2xvc2UgY3VycmVudCBwYW5lbCcsXG4gICAgc3dpdGNoVG9EdWFsVmlldzogJ1N3aXRjaCB0byBkdWFsIG1hcCB2aWV3JyxcbiAgICBzaG93TGVnZW5kOiAnc2hvdyBsZWdlbmQnLFxuICAgIGRpc2FibGUzRE1hcDogJ0Rpc2FibGUgM0QgTWFwJyxcbiAgICBEcmF3T25NYXA6ICdEcmF3IG9uIG1hcCcsXG4gICAgc2VsZWN0TG9jYWxlOiAnU2VsZWN0IGxvY2FsZScsXG4gICAgaGlkZUxheWVyUGFuZWw6ICdIaWRlIGxheWVyIHBhbmVsJyxcbiAgICBzaG93TGF5ZXJQYW5lbDogJ1Nob3cgbGF5ZXIgcGFuZWwnLFxuICAgIG1vdmVUb1RvcDogJ01vdmUgdG8gdG9wIG9mIGRhdGEgbGF5ZXJzJyxcbiAgICBzZWxlY3RCYXNlTWFwU3R5bGU6ICdTZWxlY3QgQmFzZSBNYXAgU3R5bGUnLFxuICAgIGRlbGV0ZTogJ0RlbGV0ZScsXG4gICAgdGltZVBsYXliYWNrOiAnVGltZSBQbGF5YmFjaycsXG4gICAgY2xvdWRTdG9yYWdlOiAnQ2xvdWQgU3RvcmFnZScsXG4gICAgJzNETWFwJzogJzNEIE1hcCcsXG4gICAgYW5pbWF0aW9uQnlXaW5kb3c6ICdNb3ZpbmcgVGltZSBXaW5kb3cnLFxuICAgIGFuaW1hdGlvbkJ5SW5jcmVtZW50YWw6ICdJbmNyZW1lbnRhbCBUaW1lIFdpbmRvdycsXG4gICAgc3BlZWQ6ICdzcGVlZCcsXG4gICAgcGxheTogJ3BsYXknLFxuICAgIHBhdXNlOiAncGF1c2UnLFxuICAgIHJlc2V0OiAncmVzZXQnXG4gIH0sXG4gIHRvb2xiYXI6IHtcbiAgICBleHBvcnRJbWFnZTogJ0V4cG9ydCBJbWFnZScsXG4gICAgZXhwb3J0RGF0YTogJ0V4cG9ydCBEYXRhJyxcbiAgICBleHBvcnRNYXA6ICdFeHBvcnQgTWFwJyxcbiAgICBzaGFyZU1hcFVSTDogJ1NoYXJlIE1hcCBVUkwnLFxuICAgIHNhdmVNYXA6ICdTYXZlIE1hcCcsXG4gICAgc2VsZWN0OiAnU2VsZWN0JyxcbiAgICBwb2x5Z29uOiAnUG9seWdvbicsXG4gICAgcmVjdGFuZ2xlOiAnUmVjdGFuZ2xlJyxcbiAgICBoaWRlOiAnSGlkZScsXG4gICAgc2hvdzogJ1Nob3cnLFxuICAgIC4uLkxPQ0FMRVNcbiAgfSxcbiAgZWRpdG9yOiB7XG4gICAgZmlsdGVyTGF5ZXI6ICdGaWx0ZXIgTGF5ZXJzJyxcbiAgICBjb3B5R2VvbWV0cnk6ICdDb3B5IEdlb21ldHJ5J1xuICB9LFxuXG4gIG1vZGFsOiB7XG4gICAgdGl0bGU6IHtcbiAgICAgIGRlbGV0ZURhdGFzZXQ6ICdEZWxldGUgRGF0YXNldCcsXG4gICAgICBhZGREYXRhVG9NYXA6ICdBZGQgRGF0YSBUbyBNYXAnLFxuICAgICAgZXhwb3J0SW1hZ2U6ICdFeHBvcnQgSW1hZ2UnLFxuICAgICAgZXhwb3J0RGF0YTogJ0V4cG9ydCBEYXRhJyxcbiAgICAgIGV4cG9ydE1hcDogJ0V4cG9ydCBNYXAnLFxuICAgICAgYWRkQ3VzdG9tTWFwYm94U3R5bGU6ICdBZGQgQ3VzdG9tIE1hcCBTdHlsZScsXG4gICAgICBzYXZlTWFwOiAnU2F2ZSBNYXAnLFxuICAgICAgc2hhcmVVUkw6ICdTaGFyZSBVUkwnXG4gICAgfSxcbiAgICBidXR0b246IHtcbiAgICAgIGRlbGV0ZTogJ0RlbGV0ZScsXG4gICAgICBkb3dubG9hZDogJ0Rvd25sb2FkJyxcbiAgICAgIGV4cG9ydDogJ0V4cG9ydCcsXG4gICAgICBhZGRTdHlsZTogJ0FkZCBTdHlsZScsXG4gICAgICBzYXZlOiAnU2F2ZScsXG4gICAgICBkZWZhdWx0Q2FuY2VsOiAnQ2FuY2VsJyxcbiAgICAgIGRlZmF1bHRDb25maXJtOiAnQ29uZmlybSdcbiAgICB9LFxuICAgIGV4cG9ydEltYWdlOiB7XG4gICAgICByYXRpb1RpdGxlOiAnUmF0aW8nLFxuICAgICAgcmF0aW9EZXNjcmlwdGlvbjogJ0Nob29zZSB0aGUgcmF0aW8gZm9yIHZhcmlvdXMgdXNhZ2VzLicsXG4gICAgICByYXRpb09yaWdpbmFsU2NyZWVuOiAnT3JpZ2luYWwgU2NyZWVuJyxcbiAgICAgIHJhdGlvQ3VzdG9tOiAnQ3VzdG9tJyxcbiAgICAgIHJhdGlvNF8zOiAnNDozJyxcbiAgICAgIHJhdGlvMTZfOTogJzE2OjknLFxuICAgICAgcmVzb2x1dGlvblRpdGxlOiAnUmVzb2x1dGlvbicsXG4gICAgICByZXNvbHV0aW9uRGVzY3JpcHRpb246ICdIaWdoIHJlc29sdXRpb24gaXMgYmV0dGVyIGZvciBwcmludHMuJyxcbiAgICAgIG1hcExlZ2VuZFRpdGxlOiAnTWFwIExlZ2VuZCcsXG4gICAgICBtYXBMZWdlbmRBZGQ6ICdBZGQgbGVnZW5kIG9uIG1hcCdcbiAgICB9LFxuICAgIGV4cG9ydERhdGE6IHtcbiAgICAgIGRhdGFzZXRUaXRsZTogJ0RhdGFzZXQnLFxuICAgICAgZGF0YXNldFN1YnRpdGxlOiAnQ2hvb3NlIHRoZSBkYXRhc2V0cyB5b3Ugd2FudCB0byBleHBvcnQnLFxuICAgICAgYWxsRGF0YXNldHM6ICdBbGwnLFxuICAgICAgZGF0YVR5cGVUaXRsZTogJ0RhdGEgVHlwZScsXG4gICAgICBkYXRhVHlwZVN1YnRpdGxlOiAnQ2hvb3NlIHRoZSB0eXBlIG9mIGRhdGEgeW91IHdhbnQgdG8gZXhwb3J0JyxcbiAgICAgIGZpbHRlckRhdGFUaXRsZTogJ0ZpbHRlciBEYXRhJyxcbiAgICAgIGZpbHRlckRhdGFTdWJ0aXRsZTogJ1lvdSBjYW4gY2hvb3NlIGV4cG9ydGluZyBvcmlnaW5hbCBkYXRhIG9yIGZpbHRlcmVkIGRhdGEnLFxuICAgICAgZmlsdGVyZWREYXRhOiAnRmlsdGVyZWQgZGF0YScsXG4gICAgICB1bmZpbHRlcmVkRGF0YTogJ1VuZmlsdGVyZWQgRGF0YScsXG4gICAgICBmaWxlQ291bnQ6ICd7ZmlsZUNvdW50fSBGaWxlcycsXG4gICAgICByb3dDb3VudDogJ3tyb3dDb3VudH0gUm93cydcbiAgICB9LFxuICAgIGRlbGV0ZURhdGE6IHtcbiAgICAgIHdhcm5pbmc6ICd5b3UgYXJlIGdvaW5nIHRvIGRlbGV0ZSB0aGlzIGRhdGFzZXQuIEl0IHdpbGwgYWZmZWN0IHtsZW5ndGh9IGxheWVycydcbiAgICB9LFxuICAgIGFkZFN0eWxlOiB7XG4gICAgICBwdWJsaXNoVGl0bGU6XG4gICAgICAgICcyLiBJZiBlbnRlcmVkIG1hcGJveCBzdHVsZSB1cmwgaW4gc3RlcC4xLCBwdWJsaXNoIHlvdXIgc3R5bGUgYXQgbWFwYm94IG9yIHByb3ZpZGUgYWNjZXNzIHRva2VuLiAoT3B0aW9uYWwpJyxcbiAgICAgIHB1Ymxpc2hTdWJ0aXRsZTE6ICdZb3UgY2FuIGNyZWF0ZSB5b3VyIG93biBtYXAgc3R5bGUgYXQnLFxuICAgICAgcHVibGlzaFN1YnRpdGxlMjogJ2FuZCcsXG4gICAgICBwdWJsaXNoU3VidGl0bGUzOiAncHVibGlzaCcsXG4gICAgICBwdWJsaXNoU3VidGl0bGU0OiAnaXQuJyxcbiAgICAgIHB1Ymxpc2hTdWJ0aXRsZTU6ICdUbyB1c2UgcHJpdmF0ZSBzdHlsZSwgcGFzdGUgeW91cicsXG4gICAgICBwdWJsaXNoU3VidGl0bGU2OiAnYWNjZXNzIHRva2VuJyxcbiAgICAgIHB1Ymxpc2hTdWJ0aXRsZTc6XG4gICAgICAgICdoZXJlLiAqa2VwbGVyLmdsIGlzIGEgY2xpZW50LXNpZGUgYXBwbGljYXRpb24sIGRhdGEgc3RheXMgaW4geW91ciBicm93c2VyLi4nLFxuICAgICAgZXhhbXBsZVRva2VuOiAnZS5nLiBway5hYmNkZWZnLnh4eHh4eCcsXG4gICAgICBwYXN0ZVRpdGxlOiAnMS4gUGFzdGUgc3R5bGUgdXJsJyxcbiAgICAgIHBhc3RlU3VidGl0bGUwOiAnU3R5bGUgdXJsIGNhbiBiZSBhIG1hcGJveCcsXG4gICAgICBwYXN0ZVN1YnRpdGxlMTogJ1doYXQgaXMgYScsXG4gICAgICBwYXN0ZVN1YnRpdGxlMjogJ3N0eWxlIFVSTCcsXG4gICAgICBwYXN0ZVN1YnRpdGxlMzogJ29yIGEgc3R5bGUuanNvbiB1c2luZyB0aGUnLFxuICAgICAgcGFzdGVTdWJ0aXRsZTQ6ICdNYXBib3ggR0wgU3R5bGUgU3BlYycsXG4gICAgICBuYW1pbmdUaXRsZTogJzMuIE5hbWUgeW91ciBzdHlsZSdcbiAgICB9LFxuICAgIHNoYXJlTWFwOiB7XG4gICAgICBzaGFyZVVyaVRpdGxlOiAnU2hhcmUgTWFwIFVybCcsXG4gICAgICBzaGFyZVVyaVN1YnRpdGxlOiAnR2VuZXJhdGUgYSBtYXAgdXJsIHRvIHNoYXJlIHdpdGggb3RoZXJzJyxcbiAgICAgIGNsb3VkVGl0bGU6ICdDbG91ZCBzdG9yYWdlJyxcbiAgICAgIGNsb3VkU3VidGl0bGU6ICdMb2dpbiBhbmQgdXBsb2FkIG1hcCBkYXRhIHRvIHlvdXIgcGVyc29uYWwgY2xvdWQgc3RvcmFnZScsXG4gICAgICBzaGFyZURpc2NsYWltZXI6XG4gICAgICAgICdrZXBsZXIuZ2wgd2lsbCBzYXZlIHlvdXIgbWFwIGRhdGEgdG8geW91ciBwZXJzb25hbCBjbG91ZCBzdG9yYWdlLCBvbmx5IHBlb3BsZSB3aXRoIHRoZSBVUkwgY2FuIGFjY2VzcyB5b3VyIG1hcCBhbmQgZGF0YS4gJyArXG4gICAgICAgICdZb3UgY2FuIGVkaXQvZGVsZXRlIHRoZSBkYXRhIGZpbGUgaW4geW91ciBjbG91ZCBhY2NvdW50IGFueXRpbWUuJyxcbiAgICAgIGdvdG9QYWdlOiAnR28gdG8geW91ciBLZXBsZXIuZ2wge2N1cnJlbnRQcm92aWRlcn0gcGFnZSdcbiAgICB9LFxuICAgIHN0YXR1c1BhbmVsOiB7XG4gICAgICBtYXBVcGxvYWRpbmc6ICdNYXAgVXBsb2FkaW5nJyxcbiAgICAgIGVycm9yOiAnRXJyb3InXG4gICAgfSxcbiAgICBzYXZlTWFwOiB7XG4gICAgICB0aXRsZTogJ0Nsb3VkIHN0b3JhZ2UnLFxuICAgICAgc3VidGl0bGU6ICdMb2dpbiB0byBzYXZlIG1hcCB0byB5b3VyIHBlcnNvbmFsIGNsb3VkIHN0b3JhZ2UnXG4gICAgfSxcbiAgICBleHBvcnRNYXA6IHtcbiAgICAgIGZvcm1hdFRpdGxlOiAnTWFwIGZvcm1hdCcsXG4gICAgICBmb3JtYXRTdWJ0aXRsZTogJ0Nob29zZSB0aGUgZm9ybWF0IHRvIGV4cG9ydCB5b3VyIG1hcCB0bycsXG4gICAgICBodG1sOiB7XG4gICAgICAgIHNlbGVjdGlvbjogJ0V4cG9ydCB5b3VyIG1hcCBpbnRvIGFuIGludGVyYWN0aXZlIGh0bWwgZmlsZS4nLFxuICAgICAgICB0b2tlblRpdGxlOiAnTWFwYm94IGFjY2VzcyB0b2tlbicsXG4gICAgICAgIHRva2VuU3VidGl0bGU6ICdVc2UgeW91ciBvd24gTWFwYm94IGFjY2VzcyB0b2tlbiBpbiB0aGUgaHRtbCAob3B0aW9uYWwpJyxcbiAgICAgICAgdG9rZW5QbGFjZWhvbGRlcjogJ1Bhc3RlIHlvdXIgTWFwYm94IGFjY2VzcyB0b2tlbicsXG4gICAgICAgIHRva2VuTWlzdXNlV2FybmluZzpcbiAgICAgICAgICAnKiBJZiB5b3UgZG8gbm90IHByb3ZpZGUgeW91ciBvd24gdG9rZW4sIHRoZSBtYXAgbWF5IGZhaWwgdG8gZGlzcGxheSBhdCBhbnkgdGltZSB3aGVuIHdlIHJlcGxhY2Ugb3VycyB0byBhdm9pZCBtaXN1c2UuICcsXG4gICAgICAgIHRva2VuRGlzY2xhaW1lcjogJ1lvdSBjYW4gY2hhbmdlIHRoZSBNYXBib3ggdG9rZW4gbGF0ZXIgdXNpbmcgdGhlIGZvbGxvd2luZyBpbnN0cnVjdGlvbnM6ICcsXG4gICAgICAgIHRva2VuVXBkYXRlOiAnSG93IHRvIHVwZGF0ZSBhbiBleGlzdGluZyBtYXAgdG9rZW4uJyxcbiAgICAgICAgbW9kZVRpdGxlOiAnTWFwIE1vZGUnLFxuICAgICAgICBtb2RlU3VidGl0bGUxOiAnU2VsZWN0IHRoZSBhcHAgbW9kZS4gTW9yZSAnLFxuICAgICAgICBtb2RlU3VidGl0bGUyOiAnaW5mbycsXG4gICAgICAgIG1vZGVEZXNjcmlwdGlvbjogJ0FsbG93IHVzZXJzIHRvIHttb2RlfSB0aGUgbWFwJyxcbiAgICAgICAgcmVhZDogJ3JlYWQnLFxuICAgICAgICBlZGl0OiAnZWRpdCdcbiAgICAgIH0sXG4gICAgICBqc29uOiB7XG4gICAgICAgIGNvbmZpZ1RpdGxlOiAnTWFwIENvbmZpZycsXG4gICAgICAgIGNvbmZpZ0Rpc2NsYWltZXI6XG4gICAgICAgICAgJ01hcCBjb25maWcgd2lsbCBiZSBpbmNsdWRlZCBpbiB0aGUgSnNvbiBmaWxlLiBJZiB5b3UgYXJlIHVzaW5nIGtlcGxlci5nbCBpbiB5b3VyIG93biBhcHAuIFlvdSBjYW4gY29weSB0aGlzIGNvbmZpZyBhbmQgcGFzcyBpdCB0byAnLFxuICAgICAgICBzZWxlY3Rpb246XG4gICAgICAgICAgJ0V4cG9ydCBjdXJyZW50IG1hcCBkYXRhIGFuZCBjb25maWcgaW50byBhIHNpbmdsZSBKc29uIGZpbGUuIFlvdSBjYW4gbGF0ZXIgb3BlbiB0aGUgc2FtZSBtYXAgYnkgdXBsb2FkaW5nIHRoaXMgZmlsZSB0byBrZXBsZXIuZ2wuJyxcbiAgICAgICAgZGlzY2xhaW1lcjpcbiAgICAgICAgICAnKiBNYXAgY29uZmlnIGlzIGNvdXBsZWQgd2l0aCBsb2FkZWQgZGF0YXNldHMuIOKAmGRhdGFJZOKAmSBpcyB1c2VkIHRvIGJpbmQgbGF5ZXJzLCBmaWx0ZXJzLCBhbmQgdG9vbHRpcHMgdG8gYSBzcGVjaWZpYyBkYXRhc2V0LiAnICtcbiAgICAgICAgICAnV2hlbiBwYXNzaW5nIHRoaXMgY29uZmlnIHRvIGFkZERhdGFUb01hcCwgbWFrZSBzdXJlIHRoZSBkYXRhc2V0IGlkIG1hdGNoZXMgdGhlIGRhdGFJZC9zIGluIHRoaXMgY29uZmlnLidcbiAgICAgIH1cbiAgICB9LFxuICAgIGxvYWRpbmdEaWFsb2c6IHtcbiAgICAgIGxvYWRpbmc6ICdMb2FkaW5nLi4uJ1xuICAgIH0sXG4gICAgbG9hZERhdGE6IHtcbiAgICAgIHVwbG9hZDogJ0xvYWQgRmlsZXMnLFxuICAgICAgc3RvcmFnZTogJ0xvYWQgZnJvbSBTdG9yYWdlJ1xuICAgIH0sXG4gICAgdHJpcEluZm86IHtcbiAgICAgIHRpdGxlOiAnSG93IHRvIGVuYWJsZSB0cmlwIGFuaW1hdGlvbicsXG4gICAgICBkZXNjcmlwdGlvbjE6XG4gICAgICAgICdJbiBvcmRlciB0byBhbmltYXRlIHRoZSBwYXRoLCB0aGUgZ2VvSlNPTiBkYXRhIG5lZWRzIHRvIGNvbnRhaW4gYExpbmVTdHJpbmdgIGluIGl0cyBmZWF0dXJlIGdlb21ldHJ5LCBhbmQgdGhlIGNvb3JkaW5hdGVzIGluIHRoZSBMaW5lU3RyaW5nIG5lZWQgdG8gaGF2ZSA0IGVsZW1lbnRzIGluIHRoZSBmb3JtYXRzIG9mJyxcbiAgICAgIGNvZGU6ICcgW2xvbmdpdHVkZSwgbGF0aXR1ZGUsIGFsdGl0dWRlLCB0aW1lc3RhbXBdICcsXG4gICAgICBkZXNjcmlwdGlvbjI6XG4gICAgICAgICd3aXRoIHRoZSBsYXN0IGVsZW1lbnQgYmVpbmcgYSB0aW1lc3RhbXAuIFZhbGlkIHRpbWVzdGFtcCBmb3JtYXRzIGluY2x1ZGUgdW5peCBpbiBzZWNvbmRzIHN1Y2ggYXMgYDE1NjQxODQzNjNgIG9yIGluIG1pbGxpc2Vjb25kcyBzdWNoIGFzIGAxNTY0MTg0MzYzMDAwYC4nLFxuICAgICAgZXhhbXBsZTogJ0V4YW1wbGU6J1xuICAgIH0sXG4gICAgaWNvbkluZm86IHtcbiAgICAgIHRpdGxlOiAnSG93IHRvIGRyYXcgaWNvbnMnLFxuICAgICAgZGVzY3JpcHRpb24xOlxuICAgICAgICAnSW4geW91ciBjc3YsIGNyZWF0ZSBhIGNvbHVtbiwgcHV0IHRoZSBuYW1lIG9mIHRoZSBpY29uIHlvdSB3YW50IHRvIGRyYXcgaW4gaXQuIFlvdSBjYW4gbGVhdmUgdGhlIGNlbGwgZW1wdHkgaWYgeW91IGRvIG5vdCB3YW50IHRoZSBpY29uIHRvIHNob3cgZm9yIHNvbWUgcG9pbnRzLiBXaGVuIHRoZSBjb2x1bW4gaXMgbmFtZWQnLFxuICAgICAgY29kZTogJ2ljb24nLFxuICAgICAgZGVzY3JpcHRpb24yOiAnIGtlcGxlci5nbCB3aWxsIGF1dG9tYXRpY2FsbHkgY3JlYXRlIGEgaWNvbiBsYXllciBmb3IgeW91LicsXG4gICAgICBleGFtcGxlOiAnRXhhbXBsZTonLFxuICAgICAgaWNvbnM6ICdJY29ucydcbiAgICB9LFxuICAgIHN0b3JhZ2VNYXBWaWV3ZXI6IHtcbiAgICAgIGxhc3RNb2RpZmllZDogJ0xhc3QgbW9kaWZpZWQge2xhc3RVcGRhdGVkfSBhZ28nLFxuICAgICAgYmFjazogJ0JhY2snXG4gICAgfSxcbiAgICBvdmVyd3JpdGVNYXA6IHtcbiAgICAgIHRpdGxlOiAnU2F2aW5nIG1hcC4uLicsXG4gICAgICBhbHJlYWR5RXhpc3RzOiAnYWxyZWFkeSBleGlzdHMgaW4geW91ciB7bWFwU2F2ZWR9LiBXb3VsZCB5b3UgbGlrZSB0byBvdmVyd3JpdGUgaXQ/J1xuICAgIH0sXG4gICAgbG9hZFN0b3JhZ2VNYXA6IHtcbiAgICAgIGJhY2s6ICdCYWNrJyxcbiAgICAgIGdvVG9QYWdlOiAnR28gdG8geW91ciBLZXBsZXIuZ2wge2Rpc3BsYXlOYW1lfSBwYWdlJyxcbiAgICAgIHN0b3JhZ2VNYXBzOiAnU3RvcmFnZSAvIE1hcHMnLFxuICAgICAgbm9TYXZlZE1hcHM6ICdObyBzYXZlZCBtYXBzIHlldCdcbiAgICB9XG4gIH0sXG4gIGhlYWRlcjoge1xuICAgIHZpc2libGVMYXllcnM6ICdWaXNpYmxlIGxheWVycycsXG4gICAgbGF5ZXJMZWdlbmQ6ICdMZWdlbmQnXG4gIH0sXG4gIGludGVyYWN0aW9uczoge1xuICAgIHRvb2x0aXA6ICdUb29sdGlwJyxcbiAgICBicnVzaDogJ0JydXNoJyxcbiAgICBjb29yZGluYXRlOiAnQ29vcmRpbmF0ZXMnLFxuICAgIGdlb2NvZGVyOiAnR2VvY29kZXInXG4gIH0sXG4gIGxheWVyQmxlbmRpbmc6IHtcbiAgICB0aXRsZTogJ0xheWVyIEJsZW5kaW5nJyxcbiAgICBhZGRpdGl2ZTogJ2FkZGl0aXZlJyxcbiAgICBub3JtYWw6ICdub3JtYWwnLFxuICAgIHN1YnRyYWN0aXZlOiAnc3VidHJhY3RpdmUnXG4gIH0sXG4gIGNvbHVtbnM6IHtcbiAgICB0aXRsZTogJ0NvbHVtbnMnLFxuICAgIGxhdDogJ2xhdCcsXG4gICAgbG5nOiAnbG9uJyxcbiAgICBhbHRpdHVkZTogJ2FsdGl0dWRlJyxcbiAgICBpY29uOiAnaWNvbicsXG4gICAgZ2VvanNvbjogJ2dlb2pzb24nLFxuICAgIHRva2VuOiAndG9rZW4nLFxuICAgIGFyYzoge1xuICAgICAgbGF0MDogJ3NvdXJjZSBsYXQnLFxuICAgICAgbG5nMDogJ3NvdXJjZSBsbmcnLFxuICAgICAgbGF0MTogJ3RhcmdldCBsYXQnLFxuICAgICAgbG5nMTogJ3RhcmdldCBsbmcnXG4gICAgfSxcbiAgICBsaW5lOiB7XG4gICAgICBhbHQwOiAnc291cmNlIGFsdGl0dWRlJyxcbiAgICAgIGFsdDE6ICd0YXJnZXQgYWx0aXR1ZGUnXG4gICAgfSxcbiAgICBncmlkOiB7XG4gICAgICB3b3JsZFVuaXRTaXplOiAnR3JpZCBTaXplIChrbSknXG4gICAgfSxcbiAgICBoZXhhZ29uOiB7XG4gICAgICB3b3JsZFVuaXRTaXplOiAnSGV4YWdvbiBSYWRpdXMgKGttKSdcbiAgICB9LFxuICAgIGhleF9pZDogJ2hleCBpZCcsXG4gICAgc2s6IHtcbiAgICAgIGNvZGU6ICdDb2RlJ1xuICAgIH1cbiAgfSxcbiAgY29sb3I6IHtcbiAgICBjdXN0b21QYWxldHRlOiAnQ3VzdG9tIFBhbGV0dGUnLFxuICAgIHN0ZXBzOiAnc3RlcHMnLFxuICAgIHR5cGU6ICd0eXBlJyxcbiAgICByZXZlcnNlZDogJ3JldmVyc2VkJ1xuICB9LFxuICBzY2FsZToge1xuICAgIGNvbG9yU2NhbGU6ICdDb2xvciBTY2FsZScsXG4gICAgc2l6ZVNjYWxlOiAnU2l6ZSBTY2FsZScsXG4gICAgc3Ryb2tlU2NhbGU6ICdTdHJva2UgU2NhbGUnLFxuICAgIHNjYWxlOiAnU2NhbGUnXG4gIH0sXG4gIGZpbGVVcGxvYWRlcjoge1xuICAgIG1lc3NhZ2U6ICdEcmFnICYgRHJvcCBZb3VyIEZpbGUocykgSGVyZScsXG4gICAgY2hyb21lTWVzc2FnZTpcbiAgICAgICcqQ2hyb21lIHVzZXI6IExpbWl0IGZpbGUgc2l6ZSB0byAyNTBtYiwgaWYgbmVlZCB0byB1cGxvYWQgbGFyZ2VyIGZpbGUsIHRyeSBTYWZhcmknLFxuICAgIGRpc2NsYWltZXI6XG4gICAgICAnKmtlcGxlci5nbCBpcyBhIGNsaWVudC1zaWRlIGFwcGxpY2F0aW9uIHdpdGggbm8gc2VydmVyIGJhY2tlbmQuIERhdGEgbGl2ZXMgb25seSBvbiB5b3VyIG1hY2hpbmUvYnJvd3Nlci4gJyArXG4gICAgICAnTm8gaW5mb3JtYXRpb24gb3IgbWFwIGRhdGEgaXMgc2VudCB0byBhbnkgc2VydmVyLicsXG4gICAgY29uZmlnVXBsb2FkTWVzc2FnZTpcbiAgICAgICdVcGxvYWQge2ZpbGVGb3JtYXROYW1lc30gb3Igc2F2ZWQgbWFwICoqSnNvbioqLiBSZWFkIG1vcmUgYWJvdXQgWyoqc3VwcG9ydGVkIGZpbGUgZm9ybWF0cyoqXScsXG4gICAgYnJvd3NlRmlsZXM6ICdicm93c2UgeW91ciBmaWxlcycsXG4gICAgdXBsb2FkaW5nOiAnVXBsb2FkaW5nJyxcbiAgICBmaWxlTm90U3VwcG9ydGVkOiAnRmlsZSB7ZXJyb3JGaWxlc30gaXMgbm90IHN1cHBvcnRlZC4nLFxuICAgIG9yOiAnb3InXG4gIH0sXG4gIGdlb2NvZGVyOiB7XG4gICAgdGl0bGU6ICdFbnRlciBhbiBhZGRyZXNzIG9yIGNvb3JkaW5hdGVzLCBleCAzNy43OSwtMTIyLjQwJ1xuICB9LFxuICBmaWVsZFNlbGVjdG9yOiB7XG4gICAgY2xlYXJBbGw6ICdDbGVhciBBbGwnLFxuICAgIGZvcm1hdHRpbmc6ICdGb3JtYXR0aW5nJ1xuICB9LFxuICBjb21wYXJlOiB7XG4gICAgbW9kZUxhYmVsOiAnQ29tcGFyaXNvbiBNb2RlJyxcbiAgICB0eXBlTGFiZWw6ICdDb21wYXJpc29uIFR5cGUnLFxuICAgIHR5cGVzOiB7XG4gICAgICBhYnNvbHV0ZTogJ0Fic29sdXRlJyxcbiAgICAgIHJlbGF0aXZlOiAnUmVsYXRpdmUnXG4gICAgfVxuICB9LFxuICBtYXBQb3BvdmVyOiB7XG4gICAgcHJpbWFyeTogJ1ByaW1hcnknXG4gIH0sXG4gIGRlbnNpdHk6ICdkZW5zaXR5JyxcbiAgJ0J1ZyBSZXBvcnQnOiAnQnVnIFJlcG9ydCcsXG4gICdVc2VyIEd1aWRlJzogJ1VzZXIgR3VpZGUnLFxuICBTYXZlOiAnU2F2ZScsXG4gIFNoYXJlOiAnU2hhcmUnXG59O1xuIl19