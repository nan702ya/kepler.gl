"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.colorMaker = exports.layerColors = exports.OVERLAY_TYPE = exports.LAYER_ID_LENGTH = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _window = require("global/window");

var _keymirror = _interopRequireDefault(require("keymirror"));

var _extensions = require("@deck.gl/extensions");

var _core = require("@deck.gl/core");

var _layers = require("@deck.gl/layers");

var _defaultLayerIcon = _interopRequireDefault(require("./default-layer-icon"));

var _layerUpdate = require("./layer-update");

var _defaultSettings = require("../constants/default-settings");

var _colorRanges = require("../constants/color-ranges");

var _customColorRanges = require("../constants/custom-color-ranges");

var _layerFactory = require("./layer-factory");

var _utils = require("../utils/utils");

var _dataUtils = require("../utils/data-utils");

var _dataContainerUtils = require("../utils/table-utils/data-container-utils");

var _colorUtils = require("../utils/color-utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _marked = /*#__PURE__*/_regenerator["default"].mark(generateColor);

/** @typedef {import('./index').Layer} LayerClass} */

/**
 * Approx. number of points to sample in a large data set
 * @type {number}
 */
var LAYER_ID_LENGTH = 6;
exports.LAYER_ID_LENGTH = LAYER_ID_LENGTH;
var MAX_SAMPLE_SIZE = 5000;
var defaultDomain = [0, 1];
var dataFilterExtension = new _extensions.DataFilterExtension({
  filterSize: _defaultSettings.MAX_GPU_FILTERS
});

var defaultDataAccessor = function defaultDataAccessor(dc) {
  return function (d) {
    return d;
  };
};

var defaultGetFieldValue = function defaultGetFieldValue(field, d) {
  return field.valueAccessor(d);
};

var OVERLAY_TYPE = (0, _keymirror["default"])({
  deckgl: null,
  mapboxgl: null
});
exports.OVERLAY_TYPE = OVERLAY_TYPE;
var layerColors = Object.values(_customColorRanges.DataVizColors).map(_colorUtils.hexToRgb);
exports.layerColors = layerColors;

function generateColor() {
  var index;
  return _regenerator["default"].wrap(function generateColor$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          index = 0;

        case 1:
          if (!(index < layerColors.length + 1)) {
            _context.next = 7;
            break;
          }

          if (index === layerColors.length) {
            index = 0;
          }

          _context.next = 5;
          return layerColors[index++];

        case 5:
          _context.next = 1;
          break;

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var colorMaker = generateColor();
/** @type {LayerClass} */

exports.colorMaker = colorMaker;

var Layer = /*#__PURE__*/function () {
  function Layer() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Layer);
    this.id = props.id || (0, _utils.generateHashId)(LAYER_ID_LENGTH); // meta

    this.meta = {}; // visConfigSettings

    this.visConfigSettings = {}; // @ts-ignore

    this.config = this.getDefaultLayerConfig(_objectSpread({
      columns: this.getLayerColumns()
    }, props));
  }

  (0, _createClass2["default"])(Layer, [{
    key: "layerIcon",
    get: function get() {
      return _defaultLayerIcon["default"];
    }
  }, {
    key: "overlayType",
    get: function get() {
      return OVERLAY_TYPE.deckgl;
    }
  }, {
    key: "type",
    get: function get() {
      return null;
    }
  }, {
    key: "name",
    get: function get() {
      return this.type;
    }
  }, {
    key: "isAggregated",
    get: function get() {
      return false;
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return [];
    }
  }, {
    key: "optionalColumns",
    get: function get() {
      return [];
    }
  }, {
    key: "noneLayerDataAffectingProps",
    get: function get() {
      return ['label', 'opacity', 'thickness', 'isVisible', 'hidden'];
    }
  }, {
    key: "visualChannels",
    get: function get() {
      return {
        color: {
          property: 'color',
          field: 'colorField',
          scale: 'colorScale',
          domain: 'colorDomain',
          range: 'colorRange',
          key: 'color',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.color,
          nullValue: _defaultSettings.NO_VALUE_COLOR,
          defaultValue: function defaultValue(config) {
            return config.color;
          }
        },
        size: {
          property: 'size',
          field: 'sizeField',
          scale: 'sizeScale',
          domain: 'sizeDomain',
          range: 'sizeRange',
          key: 'size',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.size,
          nullValue: 0,
          defaultValue: 1
        }
      };
    }
    /*
     * Column pairs maps layer column to a specific field pairs,
     * By default, it is set to null
     */

  }, {
    key: "columnPairs",
    get: function get() {
      return null;
    }
    /*
     * Default point column pairs, can be used for point based layers: point, icon etc.
     */

  }, {
    key: "defaultPointColumnPairs",
    get: function get() {
      return {
        lat: {
          pair: 'lng',
          fieldPairKey: 'lat'
        },
        lng: {
          pair: 'lat',
          fieldPairKey: 'lng'
        }
      };
    }
    /*
     * Default link column pairs, can be used for link based layers: arc, line etc
     */

  }, {
    key: "defaultLinkColumnPairs",
    get: function get() {
      return {
        lat0: {
          pair: 'lng0',
          fieldPairKey: 'lat'
        },
        lng0: {
          pair: 'lat0',
          fieldPairKey: 'lng'
        },
        lat1: {
          pair: 'lng1',
          fieldPairKey: 'lat'
        },
        lng1: {
          pair: 'lat1',
          fieldPairKey: 'lng'
        }
      };
    }
    /**
     * Return a React component for to render layer instructions in a modal
     * @returns {object} - an object
     * @example
     *  return {
     *    id: 'iconInfo',
     *    template: IconInfoModal,
     *    modalProps: {
     *      title: 'How to draw icons'
     *   };
     * }
     */

  }, {
    key: "layerInfoModal",
    get: function get() {
      return null;
    }
    /*
     * Given a dataset, automatically find props to create layer based on it
     * and return the props and previous found layers.
     * By default, no layers will be found
     */

  }, {
    key: "getDefaultLayerConfig",
    value: function getDefaultLayerConfig() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return {
        dataId: props.dataId || null,
        label: props.label || _layerFactory.DEFAULT_LAYER_LABEL,
        color: props.color || colorMaker.next().value,
        columns: props.columns || null,
        isVisible: props.isVisible || false,
        isConfigActive: props.isConfigActive || false,
        highlightColor: props.highlightColor || _layerFactory.DEFAULT_HIGHLIGHT_COLOR,
        hidden: props.hidden || false,
        // TODO: refactor this into separate visual Channel config
        // color by field, domain is set by filters, field, scale type
        colorField: null,
        colorDomain: [0, 1],
        colorScale: _defaultSettings.SCALE_TYPES.quantile,
        // color by size, domain is set by filters, field, scale type
        sizeDomain: [0, 1],
        sizeScale: _defaultSettings.SCALE_TYPES.linear,
        sizeField: null,
        visConfig: {},
        textLabel: [_layerFactory.DEFAULT_TEXT_LABEL],
        colorUI: {
          color: _layerFactory.DEFAULT_COLOR_UI,
          colorRange: _layerFactory.DEFAULT_COLOR_UI
        },
        animation: {
          enabled: false
        }
      };
    }
    /**
     * Get the description of a visualChannel config
     * @param key
     * @returns {{label: string, measure: (string|string)}}
     */

  }, {
    key: "getVisualChannelDescription",
    value: function getVisualChannelDescription(key) {
      // e.g. label: Color, measure: Vehicle Type
      return {
        label: this.visConfigSettings[this.visualChannels[key].range].label,
        measure: this.config[this.visualChannels[key].field] ? this.config[this.visualChannels[key].field].displayName || this.config[this.visualChannels[key].field].name : this.visualChannels[key].defaultMeasure
      };
    }
    /**
     * Assign a field to layer column, return column config
     * @param key - Column Key
     * @param field - Selected field
     * @returns {{}} - Column config
     */

  }, {
    key: "assignColumn",
    value: function assignColumn(key, field) {
      // field value could be null for optional columns
      var update = field ? {
        value: field.name,
        fieldIdx: field.fieldIdx
      } : {
        value: null,
        fieldIdx: -1
      };
      return _objectSpread(_objectSpread({}, this.config.columns), {}, (0, _defineProperty2["default"])({}, key, _objectSpread(_objectSpread({}, this.config.columns[key]), update)));
    }
    /**
     * Assign a field pair to column config, return column config
     * @param key - Column Key
     * @param pair - field Pair
     * @returns {object} - Column config
     */

  }, {
    key: "assignColumnPairs",
    value: function assignColumnPairs(key, pair) {
      var _this$columnPairs, _this$columnPairs2, _this$columnPairs3, _objectSpread3;

      if (!this.columnPairs || !((_this$columnPairs = this.columnPairs) !== null && _this$columnPairs !== void 0 && _this$columnPairs[key])) {
        // should not end in this state
        return this.config.columns;
      }

      var _this$columnPairs$key = (_this$columnPairs2 = this.columnPairs) === null || _this$columnPairs2 === void 0 ? void 0 : _this$columnPairs2[key],
          partnerKey = _this$columnPairs$key.pair,
          fieldPairKey = _this$columnPairs$key.fieldPairKey;

      var _this$columnPairs$par = (_this$columnPairs3 = this.columnPairs) === null || _this$columnPairs3 === void 0 ? void 0 : _this$columnPairs3[partnerKey],
          partnerFieldPairKey = _this$columnPairs$par.fieldPairKey;

      return _objectSpread(_objectSpread({}, this.config.columns), {}, (_objectSpread3 = {}, (0, _defineProperty2["default"])(_objectSpread3, key, pair[fieldPairKey]), (0, _defineProperty2["default"])(_objectSpread3, partnerKey, pair[partnerFieldPairKey]), _objectSpread3));
    }
    /**
     * Calculate a radius zoom multiplier to render points, so they are visible in all zoom level
     * @param {object} mapState
     * @param {number} mapState.zoom - actual zoom
     * @param {number | void} mapState.zoomOffset - zoomOffset when render in the plot container for export image
     * @returns {number}
     */

  }, {
    key: "getZoomFactor",
    value: function getZoomFactor(_ref) {
      var zoom = _ref.zoom,
          _ref$zoomOffset = _ref.zoomOffset,
          zoomOffset = _ref$zoomOffset === void 0 ? 0 : _ref$zoomOffset;
      return Math.pow(2, Math.max(14 - zoom + zoomOffset, 0));
    }
    /**
     * Calculate a elevation zoom multiplier to render points, so they are visible in all zoom level
     * @param {object} mapState
     * @param {number} mapState.zoom - actual zoom
     * @param {number | void} mapState.zoomOffset - zoomOffset when render in the plot container for export image
     * @returns {number}
     */

  }, {
    key: "getElevationZoomFactor",
    value: function getElevationZoomFactor(_ref2) {
      var zoom = _ref2.zoom,
          _ref2$zoomOffset = _ref2.zoomOffset,
          zoomOffset = _ref2$zoomOffset === void 0 ? 0 : _ref2$zoomOffset;
      return this.config.visConfig.enableElevationZoomFactor ? Math.pow(2, Math.max(8 - zoom + zoomOffset, 0)) : 1;
    }
  }, {
    key: "formatLayerData",
    value: function formatLayerData(datasets, filteredIndex) {
      return {};
    }
  }, {
    key: "renderLayer",
    value: function renderLayer() {
      return [];
    }
  }, {
    key: "getHoverData",
    value: function getHoverData(object, dataContainer) {
      if (!object) {
        return null;
      } // By default, each entry of layerData should have an index of a row in the original data container.
      // Each layer can implement its own getHoverData method


      return dataContainer.row(object.index);
    }
    /**
     * When change layer type, try to copy over layer configs as much as possible
     * @param configToCopy - config to copy over
     * @param visConfigSettings - visConfig settings of config to copy
     */

  }, {
    key: "assignConfigToLayer",
    value: function assignConfigToLayer(configToCopy, visConfigSettings) {
      var _this = this;

      // don't deep merge visualChannel field
      // don't deep merge color range, reversed: is not a key by default
      var shallowCopy = ['colorRange', 'strokeColorRange'].concat(Object.values(this.visualChannels).map(function (v) {
        return v.field;
      })); // don't copy over domain and animation

      var notToCopy = ['animation'].concat(Object.values(this.visualChannels).map(function (v) {
        return v.domain;
      })); // if range is for the same property group copy it, otherwise, not to copy

      Object.values(this.visualChannels).forEach(function (v) {
        if (configToCopy.visConfig[v.range] && _this.visConfigSettings[v.range] && visConfigSettings[v.range].group !== _this.visConfigSettings[v.range].group) {
          notToCopy.push(v.range);
        }
      }); // don't copy over visualChannel range

      var currentConfig = this.config;
      var copied = this.copyLayerConfig(currentConfig, configToCopy, {
        shallowCopy: shallowCopy,
        notToCopy: notToCopy
      });
      this.updateLayerConfig(copied); // validate visualChannel field type and scale types

      Object.keys(this.visualChannels).forEach(function (channel) {
        _this.validateVisualChannel(channel);
      });
    }
    /*
     * Recursively copy config over to an empty layer
     * when received saved config, or copy config over from a different layer type
     * make sure to only copy over value to existing keys
     * @param {object} currentConfig - existing config to be override
     * @param {object} configToCopy - new Config to copy over
     * @param {string[]} shallowCopy - array of properties to not to be deep copied
     * @param {string[]} notToCopy - array of properties not to copy
     * @returns {object} - copied config
     */

  }, {
    key: "copyLayerConfig",
    value: function copyLayerConfig(currentConfig, configToCopy) {
      var _this2 = this;

      var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref3$shallowCopy = _ref3.shallowCopy,
          shallowCopy = _ref3$shallowCopy === void 0 ? [] : _ref3$shallowCopy,
          _ref3$notToCopy = _ref3.notToCopy,
          notToCopy = _ref3$notToCopy === void 0 ? [] : _ref3$notToCopy;

      var copied = {};
      Object.keys(currentConfig).forEach(function (key) {
        if ((0, _utils.isPlainObject)(currentConfig[key]) && (0, _utils.isPlainObject)(configToCopy[key]) && !shallowCopy.includes(key) && !notToCopy.includes(key)) {
          // recursively assign object value
          copied[key] = _this2.copyLayerConfig(currentConfig[key], configToCopy[key], {
            shallowCopy: shallowCopy,
            notToCopy: notToCopy
          });
        } else if ((0, _dataUtils.notNullorUndefined)(configToCopy[key]) && !notToCopy.includes(key)) {
          // copy
          copied[key] = configToCopy[key];
        } else {
          // keep existing
          copied[key] = currentConfig[key];
        }
      });
      return copied;
    }
  }, {
    key: "registerVisConfig",
    value: function registerVisConfig(layerVisConfigs) {
      var _this3 = this;

      Object.keys(layerVisConfigs).forEach(function (item) {
        if (typeof item === 'string' && _layerFactory.LAYER_VIS_CONFIGS[layerVisConfigs[item]]) {
          // if assigned one of default LAYER_CONFIGS
          _this3.config.visConfig[item] = _layerFactory.LAYER_VIS_CONFIGS[layerVisConfigs[item]].defaultValue;
          _this3.visConfigSettings[item] = _layerFactory.LAYER_VIS_CONFIGS[layerVisConfigs[item]];
        } else if (['type', 'defaultValue'].every(function (p) {
          return layerVisConfigs[item].hasOwnProperty(p);
        })) {
          // if provided customized visConfig, and has type && defaultValue
          // TODO: further check if customized visConfig is valid
          _this3.config.visConfig[item] = layerVisConfigs[item].defaultValue;
          _this3.visConfigSettings[item] = layerVisConfigs[item];
        }
      });
    }
  }, {
    key: "getLayerColumns",
    value: function getLayerColumns() {
      var columnValidators = this.columnValidators || {};
      var required = this.requiredLayerColumns.reduce(function (accu, key) {
        return _objectSpread(_objectSpread({}, accu), {}, (0, _defineProperty2["default"])({}, key, columnValidators[key] ? {
          value: null,
          fieldIdx: -1,
          validator: columnValidators[key]
        } : {
          value: null,
          fieldIdx: -1
        }));
      }, {});
      var optional = this.optionalColumns.reduce(function (accu, key) {
        return _objectSpread(_objectSpread({}, accu), {}, (0, _defineProperty2["default"])({}, key, {
          value: null,
          fieldIdx: -1,
          optional: true
        }));
      }, {});
      return _objectSpread(_objectSpread({}, required), optional);
    }
  }, {
    key: "updateLayerConfig",
    value: function updateLayerConfig(newConfig) {
      this.config = _objectSpread(_objectSpread({}, this.config), newConfig);
      return this;
    }
  }, {
    key: "updateLayerVisConfig",
    value: function updateLayerVisConfig(newVisConfig) {
      this.config.visConfig = _objectSpread(_objectSpread({}, this.config.visConfig), newVisConfig);
      return this;
    }
  }, {
    key: "updateLayerColorUI",
    value: function updateLayerColorUI(prop, newConfig) {
      var _this$config = this.config,
          previous = _this$config.colorUI,
          visConfig = _this$config.visConfig;

      if (!(0, _utils.isPlainObject)(newConfig) || typeof prop !== 'string') {
        return this;
      }

      var colorUIProp = Object.entries(newConfig).reduce(function (accu, _ref4) {
        var _ref5 = (0, _slicedToArray2["default"])(_ref4, 2),
            key = _ref5[0],
            value = _ref5[1];

        return _objectSpread(_objectSpread({}, accu), {}, (0, _defineProperty2["default"])({}, key, (0, _utils.isPlainObject)(accu[key]) && (0, _utils.isPlainObject)(value) ? _objectSpread(_objectSpread({}, accu[key]), value) : value));
      }, previous[prop] || _layerFactory.DEFAULT_COLOR_UI);

      var colorUI = _objectSpread(_objectSpread({}, previous), {}, (0, _defineProperty2["default"])({}, prop, colorUIProp));

      this.updateLayerConfig({
        colorUI: colorUI
      }); // if colorUI[prop] is colorRange

      var isColorRange = visConfig[prop] && visConfig[prop].colors;

      if (isColorRange) {
        this.updateColorUIByColorRange(newConfig, prop);
        this.updateColorRangeByColorUI(newConfig, previous, prop);
        this.updateCustomPalette(newConfig, previous, prop);
      }

      return this;
    }
  }, {
    key: "updateCustomPalette",
    value: function updateCustomPalette(newConfig, previous, prop) {
      if (!newConfig.colorRangeConfig || !newConfig.colorRangeConfig.custom) {
        return;
      }

      var _this$config2 = this.config,
          colorUI = _this$config2.colorUI,
          visConfig = _this$config2.visConfig;
      if (!visConfig[prop]) return;
      var colors = visConfig[prop].colors;

      var customPalette = _objectSpread(_objectSpread({}, colorUI[prop].customPalette), {}, {
        name: 'Custom Palette',
        colors: (0, _toConsumableArray2["default"])(colors)
      });

      this.updateLayerConfig({
        colorUI: _objectSpread(_objectSpread({}, colorUI), {}, (0, _defineProperty2["default"])({}, prop, _objectSpread(_objectSpread({}, colorUI[prop]), {}, {
          customPalette: customPalette
        })))
      });
    }
    /**
     * if open dropdown and prop is color range
     * Automatically set colorRangeConfig's step and reversed
     * @param {*} newConfig
     * @param {*} prop
     */

  }, {
    key: "updateColorUIByColorRange",
    value: function updateColorUIByColorRange(newConfig, prop) {
      if (typeof newConfig.showDropdown !== 'number') return;
      var _this$config3 = this.config,
          colorUI = _this$config3.colorUI,
          visConfig = _this$config3.visConfig;
      this.updateLayerConfig({
        colorUI: _objectSpread(_objectSpread({}, colorUI), {}, (0, _defineProperty2["default"])({}, prop, _objectSpread(_objectSpread({}, colorUI[prop]), {}, {
          colorRangeConfig: _objectSpread(_objectSpread({}, colorUI[prop].colorRangeConfig), {}, {
            steps: visConfig[prop].colors.length,
            reversed: Boolean(visConfig[prop].reversed)
          })
        })))
      });
    }
  }, {
    key: "updateColorRangeByColorUI",
    value: function updateColorRangeByColorUI(newConfig, previous, prop) {
      // only update colorRange if changes in UI is made to 'reversed', 'steps' or steps
      var shouldUpdate = newConfig.colorRangeConfig && ['reversed', 'steps'].some(function (key) {
        return newConfig.colorRangeConfig.hasOwnProperty(key) && newConfig.colorRangeConfig[key] !== (previous[prop] || _layerFactory.DEFAULT_COLOR_UI).colorRangeConfig[key];
      });
      if (!shouldUpdate) return;
      var _this$config4 = this.config,
          colorUI = _this$config4.colorUI,
          visConfig = _this$config4.visConfig;
      var _colorUI$prop$colorRa = colorUI[prop].colorRangeConfig,
          steps = _colorUI$prop$colorRa.steps,
          reversed = _colorUI$prop$colorRa.reversed;
      var colorRange = visConfig[prop]; // find based on step or reversed

      var update;

      if (newConfig.colorRangeConfig.hasOwnProperty('steps')) {
        var group = (0, _colorUtils.getColorGroupByName)(colorRange);

        if (group) {
          var sameGroup = _colorRanges.COLOR_RANGES.filter(function (cr) {
            return (0, _colorUtils.getColorGroupByName)(cr) === group;
          });

          update = sameGroup.find(function (cr) {
            return cr.colors.length === steps;
          });

          if (update && colorRange.reversed) {
            update = (0, _colorUtils.reverseColorRange)(true, update);
          }
        }
      }

      if (newConfig.colorRangeConfig.hasOwnProperty('reversed')) {
        update = (0, _colorUtils.reverseColorRange)(reversed, update || colorRange);
      }

      if (update) {
        this.updateLayerVisConfig((0, _defineProperty2["default"])({}, prop, update));
      }
    }
    /**
     * Check whether layer has all columns
     * @returns {boolean} yes or no
     */

  }, {
    key: "hasAllColumns",
    value: function hasAllColumns() {
      var columns = this.config.columns;
      return columns && Object.values(columns).every(function (v) {
        return Boolean(v.optional || v.value && v.fieldIdx > -1);
      });
    }
    /**
     * Check whether layer has data
     *
     * @param {Array | Object} layerData
     * @returns {boolean} yes or no
     */

  }, {
    key: "hasLayerData",
    value: function hasLayerData(layerData) {
      if (!layerData) {
        return false;
      }

      return Boolean(layerData.data && layerData.data.length);
    }
  }, {
    key: "isValidToSave",
    value: function isValidToSave() {
      return this.type && this.hasAllColumns();
    }
  }, {
    key: "shouldRenderLayer",
    value: function shouldRenderLayer(data) {
      return this.type && this.hasAllColumns() && this.hasLayerData(data) && typeof this.renderLayer === 'function';
    }
  }, {
    key: "getColorScale",
    value: function getColorScale(colorScale, colorDomain, colorRange) {
      if (Array.isArray(colorRange.colorMap)) {
        var cMap = new Map();
        colorRange.colorMap.forEach(function (_ref6) {
          var _ref7 = (0, _slicedToArray2["default"])(_ref6, 2),
              k = _ref7[0],
              v = _ref7[1];

          cMap.set(k, typeof v === 'string' ? (0, _colorUtils.hexToRgb)(v) : v);
        });

        var scale = _defaultSettings.SCALE_FUNC[_defaultSettings.SCALE_TYPES.ordinal]().domain(cMap.keys()).range(cMap.values()).unknown(cMap.get(_layerFactory.UNKNOWN_COLOR_KEY) || _defaultSettings.NO_VALUE_COLOR);

        return scale;
      }

      return this.getVisChannelScale(colorScale, colorDomain, colorRange.colors.map(_colorUtils.hexToRgb));
    }
    /**
     * Mapping from visual channels to deck.gl accesors
     * @param {Object} param Parameters
     * @param {Function} param.dataAccessor Access kepler.gl layer data from deck.gl layer
     * @param {import('utils/table-utils/data-container-interface').DataContainerInterface} param.dataContainer DataContainer to use use with dataAccessor
     * @return {Object} attributeAccessors - deck.gl layer attribute accessors
     */

  }, {
    key: "getAttributeAccessors",
    value: function getAttributeAccessors(_ref8) {
      var _this4 = this;

      var _ref8$dataAccessor = _ref8.dataAccessor,
          dataAccessor = _ref8$dataAccessor === void 0 ? defaultDataAccessor : _ref8$dataAccessor,
          dataContainer = _ref8.dataContainer;
      var attributeAccessors = {};
      Object.keys(this.visualChannels).forEach(function (channel) {
        var _this4$visualChannels = _this4.visualChannels[channel],
            field = _this4$visualChannels.field,
            fixed = _this4$visualChannels.fixed,
            scale = _this4$visualChannels.scale,
            domain = _this4$visualChannels.domain,
            range = _this4$visualChannels.range,
            accessor = _this4$visualChannels.accessor,
            defaultValue = _this4$visualChannels.defaultValue,
            getAttributeValue = _this4$visualChannels.getAttributeValue,
            nullValue = _this4$visualChannels.nullValue,
            channelScaleType = _this4$visualChannels.channelScaleType;
        var shouldGetScale = _this4.config[field];

        if (shouldGetScale) {
          var args = [_this4.config[scale], _this4.config[domain], _this4.config.visConfig[range]];
          var isFixed = fixed && _this4.config.visConfig[fixed];
          var scaleFunction = channelScaleType === _defaultSettings.CHANNEL_SCALES.color ? _this4.getColorScale.apply(_this4, args) : _this4.getVisChannelScale.apply(_this4, args.concat([isFixed]));

          attributeAccessors[accessor] = function (d) {
            return _this4.getEncodedChannelValue(scaleFunction, dataAccessor(dataContainer)(d), _this4.config[field], nullValue);
          };
        } else if (typeof getAttributeValue === 'function') {
          attributeAccessors[accessor] = getAttributeValue(_this4.config);
        } else {
          attributeAccessors[accessor] = typeof defaultValue === 'function' ? defaultValue(_this4.config) : defaultValue;
        }

        if (!attributeAccessors[accessor]) {
          _window.console.warn("Failed to provide accessor function for ".concat(accessor || channel));
        }
      });
      return attributeAccessors;
    }
  }, {
    key: "getVisChannelScale",
    value: function getVisChannelScale(scale, domain, range, fixed) {
      return _defaultSettings.SCALE_FUNC[fixed ? 'linear' : scale]().domain(domain).range(fixed ? domain : range);
    }
    /**
     * Get longitude and latitude bounds of the data.
     * @param {import('utils/table-utils/data-container-interface').DataContainerInterface} dataContainer DataContainer to calculate bounds for.
     * @param {(d: {index: number}, dc: import('utils/table-utils/data-container-interface').DataContainerInterface) => number[]} getPosition Access kepler.gl layer data from deck.gl layer
     * @return {number[]|null} bounds of the data.
     */

  }, {
    key: "getPointsBounds",
    value: function getPointsBounds(dataContainer, getPosition) {
      // no need to loop through the entire dataset
      // get a sample of data to calculate bounds
      var sampleData = dataContainer.numRows() > MAX_SAMPLE_SIZE ? (0, _dataContainerUtils.getSampleData)(dataContainer, MAX_SAMPLE_SIZE) : dataContainer;
      var points = sampleData.mapIndex(getPosition);
      var latBounds = (0, _dataUtils.getLatLngBounds)(points, 1, [-90, 90]);
      var lngBounds = (0, _dataUtils.getLatLngBounds)(points, 0, [-180, 180]);

      if (!latBounds || !lngBounds) {
        return null;
      }

      return [lngBounds[0], latBounds[0], lngBounds[1], latBounds[1]];
    }
  }, {
    key: "getChangedTriggers",
    value: function getChangedTriggers(dataUpdateTriggers) {
      var triggerChanged = (0, _layerUpdate.diffUpdateTriggers)(dataUpdateTriggers, this._oldDataUpdateTriggers);
      this._oldDataUpdateTriggers = dataUpdateTriggers;
      return triggerChanged;
    }
  }, {
    key: "getEncodedChannelValue",
    value: function getEncodedChannelValue(scale, data, field) {
      var nullValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _defaultSettings.NO_VALUE_COLOR;
      var getValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaultGetFieldValue;
      var type = field.type;
      var value = getValue(field, data);

      if (!(0, _dataUtils.notNullorUndefined)(value)) {
        return nullValue;
      }

      var attributeValue;

      if (type === _defaultSettings.ALL_FIELD_TYPES.timestamp) {
        // shouldn't need to convert here
        // scale Function should take care of it
        attributeValue = scale(new Date(value));
      } else {
        attributeValue = scale(value);
      }

      if (!(0, _dataUtils.notNullorUndefined)(attributeValue)) {
        attributeValue = nullValue;
      }

      return attributeValue;
    }
  }, {
    key: "updateMeta",
    value: function updateMeta(meta) {
      this.meta = _objectSpread(_objectSpread({}, this.meta), meta);
    }
  }, {
    key: "getDataUpdateTriggers",
    value: function getDataUpdateTriggers(_ref9) {
      var filteredIndex = _ref9.filteredIndex,
          id = _ref9.id,
          allData = _ref9.allData;
      var columns = this.config.columns;
      return _objectSpread({
        getData: {
          datasetId: id,
          allData: allData,
          columns: columns,
          filteredIndex: filteredIndex
        },
        getMeta: {
          datasetId: id,
          allData: allData,
          columns: columns
        }
      }, (this.config.textLabel || []).reduce(function (accu, tl, i) {
        return _objectSpread(_objectSpread({}, accu), {}, (0, _defineProperty2["default"])({}, "getLabelCharacterSet-".concat(i), tl.field ? tl.field.name : null));
      }, {}));
    }
  }, {
    key: "updateData",
    value: function updateData(datasets, oldLayerData) {
      if (!this.config.dataId) {
        return {};
      }

      var layerDataset = datasets[this.config.dataId];
      var dataContainer = layerDataset.dataContainer;
      var getPosition = this.getPositionAccessor(dataContainer);
      var dataUpdateTriggers = this.getDataUpdateTriggers(layerDataset);
      var triggerChanged = this.getChangedTriggers(dataUpdateTriggers);

      if (triggerChanged.getMeta) {
        this.updateLayerMeta(dataContainer, getPosition);
      }

      var data = [];

      if (!triggerChanged.getData && oldLayerData && oldLayerData.data) {
        // same data
        data = oldLayerData.data;
      } else {
        data = this.calculateDataAttribute(layerDataset, getPosition);
      }

      return {
        data: data,
        triggerChanged: triggerChanged
      };
    }
    /**
     * helper function to update one layer domain when state.data changed
     * if state.data change is due ot update filter, newFiler will be passed
     * called by updateAllLayerDomainData
     * @param {Object} datasets
     * @param {Object} newFilter
     * @returns {object} layer
     */

  }, {
    key: "updateLayerDomain",
    value: function updateLayerDomain(datasets, newFilter) {
      var _this5 = this;

      var table = this.getDataset(datasets);

      if (!table) {
        return this;
      }

      Object.values(this.visualChannels).forEach(function (channel) {
        var scale = channel.scale;
        var scaleType = _this5.config[scale]; // ordinal domain is based on dataContainer, if only filter changed
        // no need to update ordinal domain

        if (!newFilter || scaleType !== _defaultSettings.SCALE_TYPES.ordinal) {
          var domain = channel.domain;

          var updatedDomain = _this5.calculateLayerDomain(table, channel);

          _this5.updateLayerConfig((0, _defineProperty2["default"])({}, domain, updatedDomain));
        }
      });
      return this;
    }
  }, {
    key: "getDataset",
    value: function getDataset(datasets) {
      return this.config.dataId ? datasets[this.config.dataId] : null;
    }
    /**
     * Validate visual channel field and scales based on supported field & scale type
     * @param channel
     */

  }, {
    key: "validateVisualChannel",
    value: function validateVisualChannel(channel) {
      this.validateFieldType(channel);
      this.validateScale(channel);
    }
    /**
     * Validate field type based on channelScaleType
     */

  }, {
    key: "validateFieldType",
    value: function validateFieldType(channel) {
      var visualChannel = this.visualChannels[channel];
      var field = visualChannel.field,
          channelScaleType = visualChannel.channelScaleType,
          supportedFieldTypes = visualChannel.supportedFieldTypes;

      if (this.config[field]) {
        // if field is selected, check if field type is supported
        var channelSupportedFieldTypes = supportedFieldTypes || _defaultSettings.CHANNEL_SCALE_SUPPORTED_FIELDS[channelScaleType];

        if (!channelSupportedFieldTypes.includes(this.config[field].type)) {
          // field type is not supported, set it back to null
          // set scale back to default
          this.updateLayerConfig((0, _defineProperty2["default"])({}, field, null));
        }
      }
    }
    /**
     * Validate scale type based on aggregation
     */

  }, {
    key: "validateScale",
    value: function validateScale(channel) {
      var visualChannel = this.visualChannels[channel];
      var scale = visualChannel.scale;

      if (!scale) {
        // visualChannel doesn't have scale
        return;
      }

      var scaleOptions = this.getScaleOptions(channel); // check if current selected scale is
      // supported, if not, change to default

      if (!scaleOptions.includes(this.config[scale])) {
        this.updateLayerConfig((0, _defineProperty2["default"])({}, scale, scaleOptions[0]));
      }
    }
    /**
     * Get scale options based on current field
     * @param {string} channel
     * @returns {string[]}
     */

  }, {
    key: "getScaleOptions",
    value: function getScaleOptions(channel) {
      var visualChannel = this.visualChannels[channel];
      var field = visualChannel.field,
          scale = visualChannel.scale,
          channelScaleType = visualChannel.channelScaleType;
      return this.config[field] ? _defaultSettings.FIELD_OPTS[this.config[field].type].scale[channelScaleType] : [this.getDefaultLayerConfig()[scale]];
    }
  }, {
    key: "updateLayerVisualChannel",
    value: function updateLayerVisualChannel(dataset, channel) {
      var visualChannel = this.visualChannels[channel];
      this.validateVisualChannel(channel); // calculate layer channel domain

      var updatedDomain = this.calculateLayerDomain(dataset, visualChannel);
      this.updateLayerConfig((0, _defineProperty2["default"])({}, visualChannel.domain, updatedDomain));
    }
  }, {
    key: "getVisualChannelUpdateTriggers",
    value: function getVisualChannelUpdateTriggers() {
      var _this6 = this;

      var updateTriggers = {};
      Object.values(this.visualChannels).forEach(function (visualChannel) {
        var _objectSpread11;

        // field range scale domain
        var accessor = visualChannel.accessor,
            field = visualChannel.field,
            scale = visualChannel.scale,
            domain = visualChannel.domain,
            range = visualChannel.range,
            defaultValue = visualChannel.defaultValue,
            fixed = visualChannel.fixed;
        updateTriggers[accessor] = _objectSpread((_objectSpread11 = {}, (0, _defineProperty2["default"])(_objectSpread11, field, _this6.config[field]), (0, _defineProperty2["default"])(_objectSpread11, scale, _this6.config[scale]), (0, _defineProperty2["default"])(_objectSpread11, domain, _this6.config[domain]), (0, _defineProperty2["default"])(_objectSpread11, range, _this6.config.visConfig[range]), (0, _defineProperty2["default"])(_objectSpread11, "defaultValue", typeof defaultValue === 'function' ? defaultValue(_this6.config) : defaultValue), _objectSpread11), fixed ? (0, _defineProperty2["default"])({}, fixed, _this6.config.visConfig[fixed]) : {});
      });
      return updateTriggers;
    }
  }, {
    key: "calculateLayerDomain",
    value: function calculateLayerDomain(dataset, visualChannel) {
      var scale = visualChannel.scale;
      var scaleType = this.config[scale];
      var field = this.config[visualChannel.field];

      if (!field) {
        // if colorField or sizeField were set back to null
        return defaultDomain;
      }

      return dataset.getColumnLayerDomain(field, scaleType) || defaultDomain;
    }
  }, {
    key: "hasHoveredObject",
    value: function hasHoveredObject(objectInfo) {
      return this.isLayerHovered(objectInfo) && objectInfo.object ? objectInfo.object : null;
    }
  }, {
    key: "isLayerHovered",
    value: function isLayerHovered(objectInfo) {
      var _objectInfo$layer, _objectInfo$layer$pro;

      return (objectInfo === null || objectInfo === void 0 ? void 0 : objectInfo.picked) && (objectInfo === null || objectInfo === void 0 ? void 0 : (_objectInfo$layer = objectInfo.layer) === null || _objectInfo$layer === void 0 ? void 0 : (_objectInfo$layer$pro = _objectInfo$layer.props) === null || _objectInfo$layer$pro === void 0 ? void 0 : _objectInfo$layer$pro.id) === this.id;
    }
  }, {
    key: "getRadiusScaleByZoom",
    value: function getRadiusScaleByZoom(mapState, fixedRadius) {
      var radiusChannel = Object.values(this.visualChannels).find(function (vc) {
        return vc.property === 'radius';
      });

      if (!radiusChannel) {
        return 1;
      }

      var field = radiusChannel.field;
      var fixed = fixedRadius === undefined ? this.config.visConfig.fixedRadius : fixedRadius;
      var radius = this.config.visConfig.radius; // @ts-ignore

      return fixed ? 1 : (this.config[field] ? 1 : radius) * this.getZoomFactor(mapState);
    }
  }, {
    key: "shouldCalculateLayerData",
    value: function shouldCalculateLayerData(props) {
      var _this7 = this;

      return props.some(function (p) {
        return !_this7.noneLayerDataAffectingProps.includes(p);
      });
    }
  }, {
    key: "getBrushingExtensionProps",
    value: function getBrushingExtensionProps(interactionConfig, brushingTarget) {
      var brush = interactionConfig.brush;
      return {
        // brushing
        autoHighlight: !brush.enabled,
        brushingRadius: brush.config.size * 1000,
        brushingTarget: brushingTarget || 'source',
        brushingEnabled: brush.enabled
      };
    }
  }, {
    key: "getDefaultDeckLayerProps",
    value: function getDefaultDeckLayerProps(_ref11) {
      var idx = _ref11.idx,
          gpuFilter = _ref11.gpuFilter,
          mapState = _ref11.mapState,
          visible = _ref11.visible;
      return {
        id: this.id,
        idx: idx,
        coordinateSystem: _core.COORDINATE_SYSTEM.LNGLAT,
        pickable: true,
        wrapLongitude: true,
        parameters: {
          depthTest: Boolean(mapState.dragRotate || this.config.visConfig.enable3d)
        },
        hidden: this.config.hidden,
        // visconfig
        opacity: this.config.visConfig.opacity,
        highlightColor: this.config.highlightColor,
        // data filtering
        extensions: [dataFilterExtension],
        filterRange: gpuFilter ? gpuFilter.filterRange : undefined,
        // layer should be visible and if splitMap, shown in to one of panel
        visible: this.config.isVisible && visible
      };
    }
  }, {
    key: "getDefaultHoverLayerProps",
    value: function getDefaultHoverLayerProps() {
      return {
        id: "".concat(this.id, "-hovered"),
        pickable: false,
        wrapLongitude: true,
        coordinateSystem: _core.COORDINATE_SYSTEM.LNGLAT
      };
    }
  }, {
    key: "renderTextLabelLayer",
    value: function renderTextLabelLayer(_ref12, renderOpts) {
      var _this8 = this;

      var getPosition = _ref12.getPosition,
          getPixelOffset = _ref12.getPixelOffset,
          updateTriggers = _ref12.updateTriggers,
          sharedProps = _ref12.sharedProps;
      var data = renderOpts.data,
          mapState = renderOpts.mapState;
      var textLabel = this.config.textLabel;
      return data.textLabels.reduce(function (accu, d, i) {
        if (d.getText) {
          var _textLabel$i$field, _textLabel$i$field2;

          accu.push(new _layers.TextLayer(_objectSpread(_objectSpread({}, sharedProps), {}, {
            id: "".concat(_this8.id, "-label-").concat((_textLabel$i$field = textLabel[i].field) === null || _textLabel$i$field === void 0 ? void 0 : _textLabel$i$field.name),
            data: data.data,
            getText: d.getText,
            getPosition: getPosition,
            characterSet: d.characterSet,
            getPixelOffset: getPixelOffset(textLabel[i]),
            getSize: 1,
            sizeScale: textLabel[i].size,
            getTextAnchor: textLabel[i].anchor,
            getAlignmentBaseline: textLabel[i].alignment,
            getColor: textLabel[i].color,
            parameters: {
              // text will always show on top of all layers
              depthTest: false
            },
            getFilterValue: data.getFilterValue,
            updateTriggers: _objectSpread(_objectSpread({}, updateTriggers), {}, {
              getText: (_textLabel$i$field2 = textLabel[i].field) === null || _textLabel$i$field2 === void 0 ? void 0 : _textLabel$i$field2.name,
              getPixelOffset: _objectSpread(_objectSpread({}, updateTriggers.getRadius), {}, {
                mapState: mapState,
                anchor: textLabel[i].anchor,
                alignment: textLabel[i].alignment
              }),
              getTextAnchor: textLabel[i].anchor,
              getAlignmentBaseline: textLabel[i].alignment,
              getColor: textLabel[i].color
            })
          })));
        }

        return accu;
      }, []);
    }
  }, {
    key: "calculateDataAttribute",
    value: function calculateDataAttribute(keplerTable, getPosition) {
      // implemented in subclasses
      return [];
    }
  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(dataContainer, getPosition) {// implemented in subclasses
    }
  }, {
    key: "getPositionAccessor",
    value: function getPositionAccessor(dataContainer) {
      // implemented in subclasses
      return function () {
        return null;
      };
    }
  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(dataset, foundLayers) {
      return {
        props: [],
        foundLayers: foundLayers
      };
    }
    /**
     * Given a array of preset required column names
     * found field that has the same name to set as layer column
     *
     * @param {object} defaultFields
     * @param {object[]} allFields
     * @returns {object[] | null} all possible required layer column pairs
     */

  }, {
    key: "findDefaultColumnField",
    value: function findDefaultColumnField(defaultFields, allFields) {
      // find all matched fields for each required col
      var requiredColumns = Object.keys(defaultFields).reduce(function (prev, key) {
        var requiredFields = allFields.filter(function (f) {
          return f.name === defaultFields[key] || defaultFields[key].includes(f.name);
        });
        prev[key] = requiredFields.length ? requiredFields.map(function (f) {
          return {
            value: f.name,
            fieldIdx: f.fieldIdx
          };
        }) : null;
        return prev;
      }, {});

      if (!Object.values(requiredColumns).every(Boolean)) {
        // if any field missing, return null
        return null;
      }

      return this.getAllPossibleColumnParis(requiredColumns);
    }
  }, {
    key: "getAllPossibleColumnParis",
    value: function getAllPossibleColumnParis(requiredColumns) {
      // for multiple matched field for one required column, return multiple
      // combinations, e. g. if column a has 2 matched, column b has 3 matched
      // 6 possible column pairs will be returned
      var allKeys = Object.keys(requiredColumns);
      var pointers = allKeys.map(function (k, i) {
        return i === allKeys.length - 1 ? -1 : 0;
      });
      var countPerKey = allKeys.map(function (k) {
        return requiredColumns[k].length;
      });
      var pairs = [];
      /* eslint-disable no-loop-func */

      while (incrementPointers(pointers, countPerKey, pointers.length - 1)) {
        var newPair = pointers.reduce(function (prev, cuur, i) {
          prev[allKeys[i]] = requiredColumns[allKeys[i]][cuur];
          return prev;
        }, {});
        pairs.push(newPair);
      }
      /* eslint-enable no-loop-func */
      // recursively increment pointers


      function incrementPointers(pts, counts, index) {
        if (index === 0 && pts[0] === counts[0] - 1) {
          // nothing to increment
          return false;
        }

        if (pts[index] + 1 < counts[index]) {
          pts[index] = pts[index] + 1;
          return true;
        }

        pts[index] = 0;
        return incrementPointers(pts, counts, index - 1);
      }

      return pairs;
    }
  }, {
    key: "hexToRgb",
    value: function hexToRgb(c) {
      return (0, _colorUtils.hexToRgb)(c);
    }
  }]);
  return Layer;
}();

var _default = Layer;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvYmFzZS1sYXllci5qcyJdLCJuYW1lcyI6WyJnZW5lcmF0ZUNvbG9yIiwiTEFZRVJfSURfTEVOR1RIIiwiTUFYX1NBTVBMRV9TSVpFIiwiZGVmYXVsdERvbWFpbiIsImRhdGFGaWx0ZXJFeHRlbnNpb24iLCJEYXRhRmlsdGVyRXh0ZW5zaW9uIiwiZmlsdGVyU2l6ZSIsIk1BWF9HUFVfRklMVEVSUyIsImRlZmF1bHREYXRhQWNjZXNzb3IiLCJkYyIsImQiLCJkZWZhdWx0R2V0RmllbGRWYWx1ZSIsImZpZWxkIiwidmFsdWVBY2Nlc3NvciIsIk9WRVJMQVlfVFlQRSIsImRlY2tnbCIsIm1hcGJveGdsIiwibGF5ZXJDb2xvcnMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJEYXRhVml6Q29sb3JzIiwibWFwIiwiaGV4VG9SZ2IiLCJpbmRleCIsImxlbmd0aCIsImNvbG9yTWFrZXIiLCJMYXllciIsInByb3BzIiwiaWQiLCJtZXRhIiwidmlzQ29uZmlnU2V0dGluZ3MiLCJjb25maWciLCJnZXREZWZhdWx0TGF5ZXJDb25maWciLCJjb2x1bW5zIiwiZ2V0TGF5ZXJDb2x1bW5zIiwiRGVmYXVsdExheWVySWNvbiIsInR5cGUiLCJjb2xvciIsInByb3BlcnR5Iiwic2NhbGUiLCJkb21haW4iLCJyYW5nZSIsImtleSIsImNoYW5uZWxTY2FsZVR5cGUiLCJDSEFOTkVMX1NDQUxFUyIsIm51bGxWYWx1ZSIsIk5PX1ZBTFVFX0NPTE9SIiwiZGVmYXVsdFZhbHVlIiwic2l6ZSIsImxhdCIsInBhaXIiLCJmaWVsZFBhaXJLZXkiLCJsbmciLCJsYXQwIiwibG5nMCIsImxhdDEiLCJsbmcxIiwiZGF0YUlkIiwibGFiZWwiLCJERUZBVUxUX0xBWUVSX0xBQkVMIiwibmV4dCIsInZhbHVlIiwiaXNWaXNpYmxlIiwiaXNDb25maWdBY3RpdmUiLCJoaWdobGlnaHRDb2xvciIsIkRFRkFVTFRfSElHSExJR0hUX0NPTE9SIiwiaGlkZGVuIiwiY29sb3JGaWVsZCIsImNvbG9yRG9tYWluIiwiY29sb3JTY2FsZSIsIlNDQUxFX1RZUEVTIiwicXVhbnRpbGUiLCJzaXplRG9tYWluIiwic2l6ZVNjYWxlIiwibGluZWFyIiwic2l6ZUZpZWxkIiwidmlzQ29uZmlnIiwidGV4dExhYmVsIiwiREVGQVVMVF9URVhUX0xBQkVMIiwiY29sb3JVSSIsIkRFRkFVTFRfQ09MT1JfVUkiLCJjb2xvclJhbmdlIiwiYW5pbWF0aW9uIiwiZW5hYmxlZCIsInZpc3VhbENoYW5uZWxzIiwibWVhc3VyZSIsImRpc3BsYXlOYW1lIiwibmFtZSIsImRlZmF1bHRNZWFzdXJlIiwidXBkYXRlIiwiZmllbGRJZHgiLCJjb2x1bW5QYWlycyIsInBhcnRuZXJLZXkiLCJwYXJ0bmVyRmllbGRQYWlyS2V5Iiwiem9vbSIsInpvb21PZmZzZXQiLCJNYXRoIiwicG93IiwibWF4IiwiZW5hYmxlRWxldmF0aW9uWm9vbUZhY3RvciIsImRhdGFzZXRzIiwiZmlsdGVyZWRJbmRleCIsIm9iamVjdCIsImRhdGFDb250YWluZXIiLCJyb3ciLCJjb25maWdUb0NvcHkiLCJzaGFsbG93Q29weSIsImNvbmNhdCIsInYiLCJub3RUb0NvcHkiLCJmb3JFYWNoIiwiZ3JvdXAiLCJwdXNoIiwiY3VycmVudENvbmZpZyIsImNvcGllZCIsImNvcHlMYXllckNvbmZpZyIsInVwZGF0ZUxheWVyQ29uZmlnIiwia2V5cyIsImNoYW5uZWwiLCJ2YWxpZGF0ZVZpc3VhbENoYW5uZWwiLCJpbmNsdWRlcyIsImxheWVyVmlzQ29uZmlncyIsIml0ZW0iLCJMQVlFUl9WSVNfQ09ORklHUyIsImV2ZXJ5IiwicCIsImhhc093blByb3BlcnR5IiwiY29sdW1uVmFsaWRhdG9ycyIsInJlcXVpcmVkIiwicmVxdWlyZWRMYXllckNvbHVtbnMiLCJyZWR1Y2UiLCJhY2N1IiwidmFsaWRhdG9yIiwib3B0aW9uYWwiLCJvcHRpb25hbENvbHVtbnMiLCJuZXdDb25maWciLCJuZXdWaXNDb25maWciLCJwcm9wIiwicHJldmlvdXMiLCJjb2xvclVJUHJvcCIsImVudHJpZXMiLCJpc0NvbG9yUmFuZ2UiLCJjb2xvcnMiLCJ1cGRhdGVDb2xvclVJQnlDb2xvclJhbmdlIiwidXBkYXRlQ29sb3JSYW5nZUJ5Q29sb3JVSSIsInVwZGF0ZUN1c3RvbVBhbGV0dGUiLCJjb2xvclJhbmdlQ29uZmlnIiwiY3VzdG9tIiwiY3VzdG9tUGFsZXR0ZSIsInNob3dEcm9wZG93biIsInN0ZXBzIiwicmV2ZXJzZWQiLCJCb29sZWFuIiwic2hvdWxkVXBkYXRlIiwic29tZSIsInNhbWVHcm91cCIsIkNPTE9SX1JBTkdFUyIsImZpbHRlciIsImNyIiwiZmluZCIsInVwZGF0ZUxheWVyVmlzQ29uZmlnIiwibGF5ZXJEYXRhIiwiZGF0YSIsImhhc0FsbENvbHVtbnMiLCJoYXNMYXllckRhdGEiLCJyZW5kZXJMYXllciIsIkFycmF5IiwiaXNBcnJheSIsImNvbG9yTWFwIiwiY01hcCIsIk1hcCIsImsiLCJzZXQiLCJTQ0FMRV9GVU5DIiwib3JkaW5hbCIsInVua25vd24iLCJnZXQiLCJVTktOT1dOX0NPTE9SX0tFWSIsImdldFZpc0NoYW5uZWxTY2FsZSIsImRhdGFBY2Nlc3NvciIsImF0dHJpYnV0ZUFjY2Vzc29ycyIsImZpeGVkIiwiYWNjZXNzb3IiLCJnZXRBdHRyaWJ1dGVWYWx1ZSIsInNob3VsZEdldFNjYWxlIiwiYXJncyIsImlzRml4ZWQiLCJzY2FsZUZ1bmN0aW9uIiwiZ2V0Q29sb3JTY2FsZSIsImdldEVuY29kZWRDaGFubmVsVmFsdWUiLCJDb25zb2xlIiwid2FybiIsImdldFBvc2l0aW9uIiwic2FtcGxlRGF0YSIsIm51bVJvd3MiLCJwb2ludHMiLCJtYXBJbmRleCIsImxhdEJvdW5kcyIsImxuZ0JvdW5kcyIsImRhdGFVcGRhdGVUcmlnZ2VycyIsInRyaWdnZXJDaGFuZ2VkIiwiX29sZERhdGFVcGRhdGVUcmlnZ2VycyIsImdldFZhbHVlIiwiYXR0cmlidXRlVmFsdWUiLCJBTExfRklFTERfVFlQRVMiLCJ0aW1lc3RhbXAiLCJEYXRlIiwiYWxsRGF0YSIsImdldERhdGEiLCJkYXRhc2V0SWQiLCJnZXRNZXRhIiwidGwiLCJpIiwib2xkTGF5ZXJEYXRhIiwibGF5ZXJEYXRhc2V0IiwiZ2V0UG9zaXRpb25BY2Nlc3NvciIsImdldERhdGFVcGRhdGVUcmlnZ2VycyIsImdldENoYW5nZWRUcmlnZ2VycyIsInVwZGF0ZUxheWVyTWV0YSIsImNhbGN1bGF0ZURhdGFBdHRyaWJ1dGUiLCJuZXdGaWx0ZXIiLCJ0YWJsZSIsImdldERhdGFzZXQiLCJzY2FsZVR5cGUiLCJ1cGRhdGVkRG9tYWluIiwiY2FsY3VsYXRlTGF5ZXJEb21haW4iLCJ2YWxpZGF0ZUZpZWxkVHlwZSIsInZhbGlkYXRlU2NhbGUiLCJ2aXN1YWxDaGFubmVsIiwic3VwcG9ydGVkRmllbGRUeXBlcyIsImNoYW5uZWxTdXBwb3J0ZWRGaWVsZFR5cGVzIiwiQ0hBTk5FTF9TQ0FMRV9TVVBQT1JURURfRklFTERTIiwic2NhbGVPcHRpb25zIiwiZ2V0U2NhbGVPcHRpb25zIiwiRklFTERfT1BUUyIsImRhdGFzZXQiLCJ1cGRhdGVUcmlnZ2VycyIsImdldENvbHVtbkxheWVyRG9tYWluIiwib2JqZWN0SW5mbyIsImlzTGF5ZXJIb3ZlcmVkIiwicGlja2VkIiwibGF5ZXIiLCJtYXBTdGF0ZSIsImZpeGVkUmFkaXVzIiwicmFkaXVzQ2hhbm5lbCIsInZjIiwidW5kZWZpbmVkIiwicmFkaXVzIiwiZ2V0Wm9vbUZhY3RvciIsIm5vbmVMYXllckRhdGFBZmZlY3RpbmdQcm9wcyIsImludGVyYWN0aW9uQ29uZmlnIiwiYnJ1c2hpbmdUYXJnZXQiLCJicnVzaCIsImF1dG9IaWdobGlnaHQiLCJicnVzaGluZ1JhZGl1cyIsImJydXNoaW5nRW5hYmxlZCIsImlkeCIsImdwdUZpbHRlciIsInZpc2libGUiLCJjb29yZGluYXRlU3lzdGVtIiwiQ09PUkRJTkFURV9TWVNURU0iLCJMTkdMQVQiLCJwaWNrYWJsZSIsIndyYXBMb25naXR1ZGUiLCJwYXJhbWV0ZXJzIiwiZGVwdGhUZXN0IiwiZHJhZ1JvdGF0ZSIsImVuYWJsZTNkIiwib3BhY2l0eSIsImV4dGVuc2lvbnMiLCJmaWx0ZXJSYW5nZSIsInJlbmRlck9wdHMiLCJnZXRQaXhlbE9mZnNldCIsInNoYXJlZFByb3BzIiwidGV4dExhYmVscyIsImdldFRleHQiLCJUZXh0TGF5ZXIiLCJjaGFyYWN0ZXJTZXQiLCJnZXRTaXplIiwiZ2V0VGV4dEFuY2hvciIsImFuY2hvciIsImdldEFsaWdubWVudEJhc2VsaW5lIiwiYWxpZ25tZW50IiwiZ2V0Q29sb3IiLCJnZXRGaWx0ZXJWYWx1ZSIsImdldFJhZGl1cyIsImtlcGxlclRhYmxlIiwiZm91bmRMYXllcnMiLCJkZWZhdWx0RmllbGRzIiwiYWxsRmllbGRzIiwicmVxdWlyZWRDb2x1bW5zIiwicHJldiIsInJlcXVpcmVkRmllbGRzIiwiZiIsImdldEFsbFBvc3NpYmxlQ29sdW1uUGFyaXMiLCJhbGxLZXlzIiwicG9pbnRlcnMiLCJjb3VudFBlcktleSIsInBhaXJzIiwiaW5jcmVtZW50UG9pbnRlcnMiLCJuZXdQYWlyIiwiY3V1ciIsInB0cyIsImNvdW50cyIsImMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFVQTs7QUFDQTs7QUFDQTs7QUFTQTs7QUFFQTs7QUFDQTs7QUFFQTs7Ozs7O3dEQXVCVUEsYTs7QUFyQlY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDTyxJQUFNQyxlQUFlLEdBQUcsQ0FBeEI7O0FBRVAsSUFBTUMsZUFBZSxHQUFHLElBQXhCO0FBQ0EsSUFBTUMsYUFBYSxHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBdEI7QUFDQSxJQUFNQyxtQkFBbUIsR0FBRyxJQUFJQywrQkFBSixDQUF3QjtBQUFDQyxFQUFBQSxVQUFVLEVBQUVDO0FBQWIsQ0FBeEIsQ0FBNUI7O0FBRUEsSUFBTUMsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixDQUFBQyxFQUFFO0FBQUEsU0FBSSxVQUFBQyxDQUFDO0FBQUEsV0FBSUEs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QUFPb1IsaUJBQWlCLENBQUNHLEdBQUQsRUFBTUMsTUFBTixFQUFjeFIsS0FBSyxHQUFHLENBQXRCLENBQXhCO0FBQ0Q7O0FBRUQsYUFBT21SLEtBQVA7QUFDRDs7O1dBRUQsa0JBQWdCTSxDQUFoQixFQUFtQjtBQUNqQixhQUFPLDBCQUFTQSxDQUFULENBQVA7QUFDRDs7Ozs7ZUEyMkJZdFIsSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7Y29uc29sZSBhcyBDb25zb2xlfSBmcm9tICdnbG9iYWwvd2luZG93JztcbmltcG9ydCBrZXltaXJyb3IgZnJvbSAna2V5bWlycm9yJztcbmltcG9ydCB7RGF0YUZpbHRlckV4dGVuc2lvbn0gZnJvbSAnQGRlY2suZ2wvZXh0ZW5zaW9ucyc7XG5pbXBvcnQge0NPT1JESU5BVEVfU1lTVEVNfSBmcm9tICdAZGVjay5nbC9jb3JlJztcbmltcG9ydCB7VGV4dExheWVyfSBmcm9tICdAZGVjay5nbC9sYXllcnMnO1xuXG5pbXBvcnQgRGVmYXVsdExheWVySWNvbiBmcm9tICcuL2RlZmF1bHQtbGF5ZXItaWNvbic7XG5pbXBvcnQge2RpZmZVcGRhdGVUcmlnZ2Vyc30gZnJvbSAnLi9sYXllci11cGRhdGUnO1xuXG5pbXBvcnQge1xuICBBTExfRklFTERfVFlQRVMsXG4gIE5PX1ZBTFVFX0NPTE9SLFxuICBTQ0FMRV9UWVBFUyxcbiAgQ0hBTk5FTF9TQ0FMRVMsXG4gIEZJRUxEX09QVFMsXG4gIFNDQUxFX0ZVTkMsXG4gIENIQU5ORUxfU0NBTEVfU1VQUE9SVEVEX0ZJRUxEUyxcbiAgTUFYX0dQVV9GSUxURVJTXG59IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcbmltcG9ydCB7Q09MT1JfUkFOR0VTfSBmcm9tICdjb25zdGFudHMvY29sb3ItcmFuZ2VzJztcbmltcG9ydCB7RGF0YVZpekNvbG9yc30gZnJvbSAnY29uc3RhbnRzL2N1c3RvbS1jb2xvci1yYW5nZXMnO1xuaW1wb3J0IHtcbiAgTEFZRVJfVklTX0NPTkZJR1MsXG4gIERFRkFVTFRfVEVYVF9MQUJFTCxcbiAgREVGQVVMVF9DT0xPUl9VSSxcbiAgVU5LTk9XTl9DT0xPUl9LRVksXG4gIERFRkFVTFRfSElHSExJR0hUX0NPTE9SLFxuICBERUZBVUxUX0xBWUVSX0xBQkVMXG59IGZyb20gJy4vbGF5ZXItZmFjdG9yeSc7XG5cbmltcG9ydCB7Z2VuZXJhdGVIYXNoSWQsIGlzUGxhaW5PYmplY3R9IGZyb20gJ3V0aWxzL3V0aWxzJztcblxuaW1wb3J0IHtnZXRMYXRMbmdCb3VuZHMsIG5vdE51bGxvclVuZGVmaW5lZH0gZnJvbSAndXRpbHMvZGF0YS11dGlscyc7XG5pbXBvcnQge2dldFNhbXBsZURhdGF9IGZyb20gJ3V0aWxzL3RhYmxlLXV0aWxzL2RhdGEtY29udGFpbmVyLXV0aWxzJztcblxuaW1wb3J0IHtoZXhUb1JnYiwgZ2V0Q29sb3JHcm91cEJ5TmFtZSwgcmV2ZXJzZUNvbG9yUmFuZ2V9IGZyb20gJ3V0aWxzL2NvbG9yLXV0aWxzJztcblxuLyoqIEB0eXBlZGVmIHtpbXBvcnQoJy4vaW5kZXgnKS5MYXllcn0gTGF5ZXJDbGFzc30gKi9cblxuLyoqXG4gKiBBcHByb3guIG51bWJlciBvZiBwb2ludHMgdG8gc2FtcGxlIGluIGEgbGFyZ2UgZGF0YSBzZXRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBMQVlFUl9JRF9MRU5HVEggPSA2O1xuXG5jb25zdCBNQVhfU0FNUExFX1NJWkUgPSA1MDAwO1xuY29uc3QgZGVmYXVsdERvbWFpbiA9IFswLCAxXTtcbmNvbnN0IGRhdGFGaWx0ZXJFeHRlbnNpb24gPSBuZXcgRGF0YUZpbHRlckV4dGVuc2lvbih7ZmlsdGVyU2l6ZTogTUFYX0dQVV9GSUxURVJTfSk7XG5cbmNvbnN0IGRlZmF1bHREYXRhQWNjZXNzb3IgPSBkYyA9PiBkID0+IGQ7XG5jb25zdCBkZWZhdWx0R2V0RmllbGRWYWx1ZSA9IChmaWVsZCwgZCkgPT4gZmllbGQudmFsdWVBY2Nlc3NvcihkKTtcblxuZXhwb3J0IGNvbnN0IE9WRVJMQVlfVFlQRSA9IGtleW1pcnJvcih7XG4gIGRlY2tnbDogbnVsbCxcbiAgbWFwYm94Z2w6IG51bGxcbn0pO1xuXG5leHBvcnQgY29uc3QgbGF5ZXJDb2xvcnMgPSBPYmplY3QudmFsdWVzKERhdGFWaXpDb2xvcnMpLm1hcChoZXhUb1JnYik7XG5mdW5jdGlvbiogZ2VuZXJhdGVDb2xvcigpIHtcbiAgbGV0IGluZGV4ID0gMDtcbiAgd2hpbGUgKGluZGV4IDwgbGF5ZXJDb2xvcnMubGVuZ3RoICsgMSkge1xuICAgIGlmIChpbmRleCA9PT0gbGF5ZXJDb2xvcnMubGVuZ3RoKSB7XG4gICAgICBpbmRleCA9IDA7XG4gICAgfVxuICAgIHlpZWxkIGxheWVyQ29sb3JzW2luZGV4KytdO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBjb2xvck1ha2VyID0gZ2VuZXJhdGVDb2xvcigpO1xuXG4vKiogQHR5cGUge0xheWVyQ2xhc3N9ICovXG5jbGFzcyBMYXllciB7XG4gIGNvbnN0cnVjdG9yKHByb3BzID0ge30pIHtcbiAgICB0aGlzLmlkID0gcHJvcHMuaWQgfHwgZ2VuZXJhdGVIYXNoSWQoTEFZRVJfSURfTEVOR1RIKTtcblxuICAgIC8vIG1ldGFcbiAgICB0aGlzLm1ldGEgPSB7fTtcblxuICAgIC8vIHZpc0NvbmZpZ1NldHRpbmdzXG4gICAgdGhpcy52aXNDb25maWdTZXR0aW5ncyA9IHt9O1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXMuY29uZmlnID0gdGhpcy5nZXREZWZhdWx0TGF5ZXJDb25maWcoe1xuICAgICAgY29sdW1uczogdGhpcy5nZXRMYXllckNvbHVtbnMoKSxcbiAgICAgIC4uLnByb3BzXG4gICAgfSk7XG4gIH1cblxuICBnZXQgbGF5ZXJJY29uKCkge1xuICAgIHJldHVybiBEZWZhdWx0TGF5ZXJJY29uO1xuICB9XG5cbiAgZ2V0IG92ZXJsYXlUeXBlKCkge1xuICAgIHJldHVybiBPVkVSTEFZX1RZUEUuZGVja2dsO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlO1xuICB9XG5cbiAgZ2V0IGlzQWdncmVnYXRlZCgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXQgcmVxdWlyZWRMYXllckNvbHVtbnMoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgZ2V0IG9wdGlvbmFsQ29sdW1ucygpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXQgbm9uZUxheWVyRGF0YUFmZmVjdGluZ1Byb3BzKCkge1xuICAgIHJldHVybiBbJ2xhYmVsJywgJ29wYWNpdHknLCAndGhpY2tuZXNzJywgJ2lzVmlzaWJsZScsICdoaWRkZW4nXTtcbiAgfVxuXG4gIGdldCB2aXN1YWxDaGFubmVscygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6IHtcbiAgICAgICAgcHJvcGVydHk6ICdjb2xvcicsXG4gICAgICAgIGZpZWxkOiAnY29sb3JGaWVsZCcsXG4gICAgICAgIHNjYWxlOiAnY29sb3JTY2FsZScsXG4gICAgICAgIGRvbWFpbjogJ2NvbG9yRG9tYWluJyxcbiAgICAgICAgcmFuZ2U6ICdjb2xvclJhbmdlJyxcbiAgICAgICAga2V5OiAnY29sb3InLFxuICAgICAgICBjaGFubmVsU2NhbGVUeXBlOiBDSEFOTkVMX1NDQUxFUy5jb2xvcixcbiAgICAgICAgbnVsbFZhbHVlOiBOT19WQUxVRV9DT0xPUixcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBjb25maWcgPT4gY29uZmlnLmNvbG9yXG4gICAgICB9LFxuICAgICAgc2l6ZToge1xuICAgICAgICBwcm9wZXJ0eTogJ3NpemUnLFxuICAgICAgICBmaWVsZDogJ3NpemVGaWVsZCcsXG4gICAgICAgIHNjYWxlOiAnc2l6ZVNjYWxlJyxcbiAgICAgICAgZG9tYWluOiAnc2l6ZURvbWFpbicsXG4gICAgICAgIHJhbmdlOiAnc2l6ZVJhbmdlJyxcbiAgICAgICAga2V5OiAnc2l6ZScsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6IENIQU5ORUxfU0NBTEVTLnNpemUsXG4gICAgICAgIG51bGxWYWx1ZTogMCxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiAxXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qXG4gICAqIENvbHVtbiBwYWlycyBtYXBzIGxheWVyIGNvbHVtbiB0byBhIHNwZWNpZmljIGZpZWxkIHBhaXJzLFxuICAgKiBCeSBkZWZhdWx0LCBpdCBpcyBzZXQgdG8gbnVsbFxuICAgKi9cbiAgZ2V0IGNvbHVtblBhaXJzKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLypcbiAgICogRGVmYXVsdCBwb2ludCBjb2x1bW4gcGFpcnMsIGNhbiBiZSB1c2VkIGZvciBwb2ludCBiYXNlZCBsYXllcnM6IHBvaW50LCBpY29uIGV0Yy5cbiAgICovXG4gIGdldCBkZWZhdWx0UG9pbnRDb2x1bW5QYWlycygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGF0OiB7cGFpcjogJ2xuZycsIGZpZWxkUGFpcktleTogJ2xhdCd9LFxuICAgICAgbG5nOiB7cGFpcjogJ2xhdCcsIGZpZWxkUGFpcktleTogJ2xuZyd9XG4gICAgfTtcbiAgfVxuXG4gIC8qXG4gICAqIERlZmF1bHQgbGluayBjb2x1bW4gcGFpcnMsIGNhbiBiZSB1c2VkIGZvciBsaW5rIGJhc2VkIGxheWVyczogYXJjLCBsaW5lIGV0Y1xuICAgKi9cbiAgZ2V0IGRlZmF1bHRMaW5rQ29sdW1uUGFpcnMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxhdDA6IHtwYWlyOiAnbG5nMCcsIGZpZWxkUGFpcktleTogJ2xhdCd9LFxuICAgICAgbG5nMDoge3BhaXI6ICdsYXQwJywgZmllbGRQYWlyS2V5OiAnbG5nJ30sXG4gICAgICBsYXQxOiB7cGFpcjogJ2xuZzEnLCBmaWVsZFBhaXJLZXk6ICdsYXQnfSxcbiAgICAgIGxuZzE6IHtwYWlyOiAnbGF0MScsIGZpZWxkUGFpcktleTogJ2xuZyd9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBSZWFjdCBjb21wb25lbnQgZm9yIHRvIHJlbmRlciBsYXllciBpbnN0cnVjdGlvbnMgaW4gYSBtb2RhbFxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIGFuIG9iamVjdFxuICAgKiBAZXhhbXBsZVxuICAgKiAgcmV0dXJuIHtcbiAgICogICAgaWQ6ICdpY29uSW5mbycsXG4gICAqICAgIHRlbXBsYXRlOiBJY29uSW5mb01vZGFsLFxuICAgKiAgICBtb2RhbFByb3BzOiB7XG4gICAqICAgICAgdGl0bGU6ICdIb3cgdG8gZHJhdyBpY29ucydcbiAgICogICB9O1xuICAgKiB9XG4gICAqL1xuICBnZXQgbGF5ZXJJbmZvTW9kYWwoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLypcbiAgICogR2l2ZW4gYSBkYXRhc2V0LCBhdXRvbWF0aWNhbGx5IGZpbmQgcHJvcHMgdG8gY3JlYXRlIGxheWVyIGJhc2VkIG9uIGl0XG4gICAqIGFuZCByZXR1cm4gdGhlIHByb3BzIGFuZCBwcmV2aW91cyBmb3VuZCBsYXllcnMuXG4gICAqIEJ5IGRlZmF1bHQsIG5vIGxheWVycyB3aWxsIGJlIGZvdW5kXG4gICAqL1xuICBzdGF0aWMgZmluZERlZmF1bHRMYXllclByb3BzKGRhdGFzZXQsIGZvdW5kTGF5ZXJzKSB7XG4gICAgcmV0dXJuIHtwcm9wczogW10sIGZvdW5kTGF5ZXJzfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHaXZlbiBhIGFycmF5IG9mIHByZXNldCByZXF1aXJlZCBjb2x1bW4gbmFtZXNcbiAgICogZm91bmQgZmllbGQgdGhhdCBoYXMgdGhlIHNhbWUgbmFtZSB0byBzZXQgYXMgbGF5ZXIgY29sdW1uXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBkZWZhdWx0RmllbGRzXG4gICAqIEBwYXJhbSB7b2JqZWN0W119IGFsbEZpZWxkc1xuICAgKiBAcmV0dXJucyB7b2JqZWN0W10gfCBudWxsfSBhbGwgcG9zc2libGUgcmVxdWlyZWQgbGF5ZXIgY29sdW1uIHBhaXJzXG4gICAqL1xuICBzdGF0aWMgZmluZERlZmF1bHRDb2x1bW5GaWVsZChkZWZhdWx0RmllbGRzLCBhbGxGaWVsZHMpIHtcbiAgICAvLyBmaW5kIGFsbCBtYXRjaGVkIGZpZWxkcyBmb3IgZWFjaCByZXF1aXJlZCBjb2xcbiAgICBjb25zdCByZXF1aXJlZENvbHVtbnMgPSBPYmplY3Qua2V5cyhkZWZhdWx0RmllbGRzKS5yZWR1Y2UoKHByZXYsIGtleSkgPT4ge1xuICAgICAgY29uc3QgcmVxdWlyZWRGaWVsZHMgPSBhbGxGaWVsZHMuZmlsdGVyKFxuICAgICAgICBmID0+IGYubmFtZSA9PT0gZGVmYXVsdEZpZWxkc1trZXldIHx8IGRlZmF1bHRGaWVsZHNba2V5XS5pbmNsdWRlcyhmLm5hbWUpXG4gICAgICApO1xuXG4gICAgICBwcmV2W2tleV0gPSByZXF1aXJlZEZpZWxkcy5sZW5ndGhcbiAgICAgICAgPyByZXF1aXJlZEZpZWxkcy5tYXAoZiA9PiAoe1xuICAgICAgICAgICAgdmFsdWU6IGYubmFtZSxcbiAgICAgICAgICAgIGZpZWxkSWR4OiBmLmZpZWxkSWR4XG4gICAgICAgICAgfSkpXG4gICAgICAgIDogbnVsbDtcbiAgICAgIHJldHVybiBwcmV2O1xuICAgIH0sIHt9KTtcblxuICAgIGlmICghT2JqZWN0LnZhbHVlcyhyZXF1aXJlZENvbHVtbnMpLmV2ZXJ5KEJvb2xlYW4pKSB7XG4gICAgICAvLyBpZiBhbnkgZmllbGQgbWlzc2luZywgcmV0dXJuIG51bGxcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmdldEFsbFBvc3NpYmxlQ29sdW1uUGFyaXMocmVxdWlyZWRDb2x1bW5zKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRBbGxQb3NzaWJsZUNvbHVtblBhcmlzKHJlcXVpcmVkQ29sdW1ucykge1xuICAgIC8vIGZvciBtdWx0aXBsZSBtYXRjaGVkIGZpZWxkIGZvciBvbmUgcmVxdWlyZWQgY29sdW1uLCByZXR1cm4gbXVsdGlwbGVcbiAgICAvLyBjb21iaW5hdGlvbnMsIGUuIGcuIGlmIGNvbHVtbiBhIGhhcyAyIG1hdGNoZWQsIGNvbHVtbiBiIGhhcyAzIG1hdGNoZWRcbiAgICAvLyA2IHBvc3NpYmxlIGNvbHVtbiBwYWlycyB3aWxsIGJlIHJldHVybmVkXG4gICAgY29uc3QgYWxsS2V5cyA9IE9iamVjdC5rZXlzKHJlcXVpcmVkQ29sdW1ucyk7XG4gICAgY29uc3QgcG9pbnRlcnMgPSBhbGxLZXlzLm1hcCgoaywgaSkgPT4gKChpID09PSBhbGxLZXlzLmxlbmd0aCAtIDEgPyAtMSA6IDApKSk7XG4gICAgY29uc3QgY291bnRQZXJLZXkgPSBhbGxLZXlzLm1hcChrID0+IHJlcXVpcmVkQ29sdW1uc1trXS5sZW5ndGgpO1xuICAgIGNvbnN0IHBhaXJzID0gW107XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1sb29wLWZ1bmMgKi9cbiAgICB3aGlsZSAoaW5jcmVtZW50UG9pbnRlcnMocG9pbnRlcnMsIGNvdW50UGVyS2V5LCBwb2ludGVycy5sZW5ndGggLSAxKSkge1xuICAgICAgY29uc3QgbmV3UGFpciA9IHBvaW50ZXJzLnJlZHVjZSgocHJldiwgY3V1ciwgaSkgPT4ge1xuICAgICAgICBwcmV2W2FsbEtleXNbaV1dID0gcmVxdWlyZWRDb2x1bW5zW2FsbEtleXNbaV1dW2N1dXJdO1xuICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgIH0sIHt9KTtcblxuICAgICAgcGFpcnMucHVzaChuZXdQYWlyKTtcbiAgICB9XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby1sb29wLWZ1bmMgKi9cblxuICAgIC8vIHJlY3Vyc2l2ZWx5IGluY3JlbWVudCBwb2ludGVyc1xuICAgIGZ1bmN0aW9uIGluY3JlbWVudFBvaW50ZXJzKHB0cywgY291bnRzLCBpbmRleCkge1xuICAgICAgaWYgKGluZGV4ID09PSAwICYmIHB0c1swXSA9PT0gY291bnRzWzBdIC0gMSkge1xuICAgICAgICAvLyBub3RoaW5nIHRvIGluY3JlbWVudFxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChwdHNbaW5kZXhdICsgMSA8IGNvdW50c1tpbmRleF0pIHtcbiAgICAgICAgcHRzW2luZGV4XSA9IHB0c1tpbmRleF0gKyAxO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcHRzW2luZGV4XSA9IDA7XG4gICAgICByZXR1cm4gaW5jcmVtZW50UG9pbnRlcnMocHRzLCBjb3VudHMsIGluZGV4IC0gMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhaXJzO1xuICB9XG5cbiAgc3RhdGljIGhleFRvUmdiKGMpIHtcbiAgICByZXR1cm4gaGV4VG9SZ2IoYyk7XG4gIH1cblxuICBnZXREZWZhdWx0TGF5ZXJDb25maWcocHJvcHMgPSB7fSkge1xuICAgIHJldHVybiB7XG4gICAgICBkYXRhSWQ6IHByb3BzLmRhdGFJZCB8fCBudWxsLFxuICAgICAgbGFiZWw6IHByb3BzLmxhYmVsIHx8IERFRkFVTFRfTEFZRVJfTEFCRUwsXG4gICAgICBjb2xvcjogcHJvcHMuY29sb3IgfHwgY29sb3JNYWtlci5uZXh0KCkudmFsdWUsXG4gICAgICBjb2x1bW5zOiBwcm9wcy5jb2x1bW5zIHx8IG51bGwsXG4gICAgICBpc1Zpc2libGU6IHByb3BzLmlzVmlzaWJsZSB8fCBmYWxzZSxcbiAgICAgIGlzQ29uZmlnQWN0aXZlOiBwcm9wcy5pc0NvbmZpZ0FjdGl2ZSB8fCBmYWxzZSxcbiAgICAgIGhpZ2hsaWdodENvbG9yOiBwcm9wcy5oaWdobGlnaHRDb2xvciB8fCBERUZBVUxUX0hJR0hMSUdIVF9DT0xPUixcbiAgICAgIGhpZGRlbjogcHJvcHMuaGlkZGVuIHx8IGZhbHNlLFxuXG4gICAgICAvLyBUT0RPOiByZWZhY3RvciB0aGlzIGludG8gc2VwYXJhdGUgdmlzdWFsIENoYW5uZWwgY29uZmlnXG4gICAgICAvLyBjb2xvciBieSBmaWVsZCwgZG9tYWluIGlzIHNldCBieSBmaWx0ZXJzLCBmaWVsZCwgc2NhbGUgdHlwZVxuICAgICAgY29sb3JGaWVsZDogbnVsbCxcbiAgICAgIGNvbG9yRG9tYWluOiBbMCwgMV0sXG4gICAgICBjb2xvclNjYWxlOiBTQ0FMRV9UWVBFUy5xdWFudGlsZSxcblxuICAgICAgLy8gY29sb3IgYnkgc2l6ZSwgZG9tYWluIGlzIHNldCBieSBmaWx0ZXJzLCBmaWVsZCwgc2NhbGUgdHlwZVxuICAgICAgc2l6ZURvbWFpbjogWzAsIDFdLFxuICAgICAgc2l6ZVNjYWxlOiBTQ0FMRV9UWVBFUy5saW5lYXIsXG4gICAgICBzaXplRmllbGQ6IG51bGwsXG5cbiAgICAgIHZpc0NvbmZpZzoge30sXG5cbiAgICAgIHRleHRMYWJlbDogW0RFRkFVTFRfVEVYVF9MQUJFTF0sXG5cbiAgICAgIGNvbG9yVUk6IHtcbiAgICAgICAgY29sb3I6IERFRkFVTFRfQ09MT1JfVUksXG4gICAgICAgIGNvbG9yUmFuZ2U6IERFRkFVTFRfQ09MT1JfVUlcbiAgICAgIH0sXG4gICAgICBhbmltYXRpb246IHtlbmFibGVkOiBmYWxzZX1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZGVzY3JpcHRpb24gb2YgYSB2aXN1YWxDaGFubmVsIGNvbmZpZ1xuICAgKiBAcGFyYW0ga2V5XG4gICAqIEByZXR1cm5zIHt7bGFiZWw6IHN0cmluZywgbWVhc3VyZTogKHN0cmluZ3xzdHJpbmcpfX1cbiAgICovXG4gIGdldFZpc3VhbENoYW5uZWxEZXNjcmlwdGlvbihrZXkpIHtcbiAgICAvLyBlLmcuIGxhYmVsOiBDb2xvciwgbWVhc3VyZTogVmVoaWNsZSBUeXBlXG4gICAgcmV0dXJuIHtcbiAgICAgIGxhYmVsOiB0aGlzLnZpc0NvbmZpZ1NldHRpbmdzW3RoaXMudmlzdWFsQ2hhbm5lbHNba2V5XS5yYW5nZV0ubGFiZWwsXG4gICAgICBtZWFzdXJlOiB0aGlzLmNvbmZpZ1t0aGlzLnZpc3VhbENoYW5uZWxzW2tleV0uZmllbGRdXG4gICAgICAgID8gKHRoaXMuY29uZmlnW3RoaXMudmlzdWFsQ2hhbm5lbHNba2V5XS5maWVsZF0uZGlzcGxheU5hbWUgfHxcbiAgICAgICAgICB0aGlzLmNvbmZpZ1t0aGlzLnZpc3VhbENoYW5uZWxzW2tleV0uZmllbGRdLm5hbWUpXG4gICAgICAgIDogdGhpcy52aXN1YWxDaGFubmVsc1trZXldLmRlZmF1bHRNZWFzdXJlXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBc3NpZ24gYSBmaWVsZCB0byBsYXllciBjb2x1bW4sIHJldHVybiBjb2x1bW4gY29uZmlnXG4gICAqIEBwYXJhbSBrZXkgLSBDb2x1bW4gS2V5XG4gICAqIEBwYXJhbSBmaWVsZCAtIFNlbGVjdGVkIGZpZWxkXG4gICAqIEByZXR1cm5zIHt7fX0gLSBDb2x1bW4gY29uZmlnXG4gICAqL1xuICBhc3NpZ25Db2x1bW4oa2V5LCBmaWVsZCkge1xuICAgIC8vIGZpZWxkIHZhbHVlIGNvdWxkIGJlIG51bGwgZm9yIG9wdGlvbmFsIGNvbHVtbnNcbiAgICBjb25zdCB1cGRhdGUgPSBmaWVsZFxuICAgICAgPyB7XG4gICAgICAgICAgdmFsdWU6IGZpZWxkLm5hbWUsXG4gICAgICAgICAgZmllbGRJZHg6IGZpZWxkLmZpZWxkSWR4XG4gICAgICAgIH1cbiAgICAgIDoge3ZhbHVlOiBudWxsLCBmaWVsZElkeDogLTF9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMuY29uZmlnLmNvbHVtbnMsXG4gICAgICBba2V5XToge1xuICAgICAgICAuLi50aGlzLmNvbmZpZy5jb2x1bW5zW2tleV0sXG4gICAgICAgIC4uLnVwZGF0ZVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQXNzaWduIGEgZmllbGQgcGFpciB0byBjb2x1bW4gY29uZmlnLCByZXR1cm4gY29sdW1uIGNvbmZpZ1xuICAgKiBAcGFyYW0ga2V5IC0gQ29sdW1uIEtleVxuICAgKiBAcGFyYW0gcGFpciAtIGZpZWxkIFBhaXJcbiAgICogQHJldHVybnMge29iamVjdH0gLSBDb2x1bW4gY29uZmlnXG4gICAqL1xuICBhc3NpZ25Db2x1bW5QYWlycyhrZXksIHBhaXIpIHtcbiAgICBpZiAoIXRoaXMuY29sdW1uUGFpcnMgfHwgIXRoaXMuY29sdW1uUGFpcnM/LltrZXldKSB7XG4gICAgICAvLyBzaG91bGQgbm90IGVuZCBpbiB0aGlzIHN0YXRlXG4gICAgICByZXR1cm4gdGhpcy5jb25maWcuY29sdW1ucztcbiAgICB9XG5cbiAgICBjb25zdCB7cGFpcjogcGFydG5lcktleSwgZmllbGRQYWlyS2V5fSA9IHRoaXMuY29sdW1uUGFpcnM/LltrZXldO1xuICAgIGNvbnN0IHtmaWVsZFBhaXJLZXk6IHBhcnRuZXJGaWVsZFBhaXJLZXl9ID0gdGhpcy5jb2x1bW5QYWlycz8uW3BhcnRuZXJLZXldO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMuY29uZmlnLmNvbHVtbnMsXG4gICAgICBba2V5XTogcGFpcltmaWVsZFBhaXJLZXldLFxuICAgICAgW3BhcnRuZXJLZXldOiBwYWlyW3BhcnRuZXJGaWVsZFBhaXJLZXldXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgYSByYWRpdXMgem9vbSBtdWx0aXBsaWVyIHRvIHJlbmRlciBwb2ludHMsIHNvIHRoZXkgYXJlIHZpc2libGUgaW4gYWxsIHpvb20gbGV2ZWxcbiAgICogQHBhcmFtIHtvYmplY3R9IG1hcFN0YXRlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtYXBTdGF0ZS56b29tIC0gYWN0dWFsIHpvb21cbiAgICogQHBhcmFtIHtudW1iZXIgfCB2b2lkfSBtYXBTdGF0ZS56b29tT2Zmc2V0IC0gem9vbU9mZnNldCB3aGVuIHJlbmRlciBpbiB0aGUgcGxvdCBjb250YWluZXIgZm9yIGV4cG9ydCBpbWFnZVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0Wm9vbUZhY3Rvcih7em9vbSwgem9vbU9mZnNldCA9IDB9KSB7XG4gICAgcmV0dXJuIE1hdGgucG93KDIsIE1hdGgubWF4KDE0IC0gem9vbSArIHpvb21PZmZzZXQsIDApKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgYSBlbGV2YXRpb24gem9vbSBtdWx0aXBsaWVyIHRvIHJlbmRlciBwb2ludHMsIHNvIHRoZXkgYXJlIHZpc2libGUgaW4gYWxsIHpvb20gbGV2ZWxcbiAgICogQHBhcmFtIHtvYmplY3R9IG1hcFN0YXRlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtYXBTdGF0ZS56b29tIC0gYWN0dWFsIHpvb21cbiAgICogQHBhcmFtIHtudW1iZXIgfCB2b2lkfSBtYXBTdGF0ZS56b29tT2Zmc2V0IC0gem9vbU9mZnNldCB3aGVuIHJlbmRlciBpbiB0aGUgcGxvdCBjb250YWluZXIgZm9yIGV4cG9ydCBpbWFnZVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0RWxldmF0aW9uWm9vbUZhY3Rvcih7em9vbSwgem9vbU9mZnNldCA9IDB9KSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLnZpc0NvbmZpZy5lbmFibGVFbGV2YXRpb25ab29tRmFjdG9yXG4gICAgICA/IE1hdGgucG93KDIsIE1hdGgubWF4KDggLSB6b29tICsgem9vbU9mZnNldCwgMCkpXG4gICAgICA6IDE7XG4gIH1cblxuICBmb3JtYXRMYXllckRhdGEoZGF0YXNldHMsIGZpbHRlcmVkSW5kZXgpIHtcbiAgICByZXR1cm4ge307XG4gIH1cblxuICByZW5kZXJMYXllcigpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXRIb3ZlckRhdGEob2JqZWN0LCBkYXRhQ29udGFpbmVyKSB7XG4gICAgaWYgKCFvYmplY3QpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIEJ5IGRlZmF1bHQsIGVhY2ggZW50cnkgb2YgbGF5ZXJEYXRhIHNob3VsZCBoYXZlIGFuIGluZGV4IG9mIGEgcm93IGluIHRoZSBvcmlnaW5hbCBkYXRhIGNvbnRhaW5lci5cbiAgICAvLyBFYWNoIGxheWVyIGNhbiBpbXBsZW1lbnQgaXRzIG93biBnZXRIb3ZlckRhdGEgbWV0aG9kXG4gICAgcmV0dXJuIGRhdGFDb250YWluZXIucm93KG9iamVjdC5pbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiBjaGFuZ2UgbGF5ZXIgdHlwZSwgdHJ5IHRvIGNvcHkgb3ZlciBsYXllciBjb25maWdzIGFzIG11Y2ggYXMgcG9zc2libGVcbiAgICogQHBhcmFtIGNvbmZpZ1RvQ29weSAtIGNvbmZpZyB0byBjb3B5IG92ZXJcbiAgICogQHBhcmFtIHZpc0NvbmZpZ1NldHRpbmdzIC0gdmlzQ29uZmlnIHNldHRpbmdzIG9mIGNvbmZpZyB0byBjb3B5XG4gICAqL1xuICBhc3NpZ25Db25maWdUb0xheWVyKGNvbmZpZ1RvQ29weSwgdmlzQ29uZmlnU2V0dGluZ3MpIHtcbiAgICAvLyBkb24ndCBkZWVwIG1lcmdlIHZpc3VhbENoYW5uZWwgZmllbGRcbiAgICAvLyBkb24ndCBkZWVwIG1lcmdlIGNvbG9yIHJhbmdlLCByZXZlcnNlZDogaXMgbm90IGEga2V5IGJ5IGRlZmF1bHRcbiAgICBjb25zdCBzaGFsbG93Q29weSA9IFsnY29sb3JSYW5nZScsICdzdHJva2VDb2xvclJhbmdlJ10uY29uY2F0KFxuICAgICAgT2JqZWN0LnZhbHVlcyh0aGlzLnZpc3VhbENoYW5uZWxzKS5tYXAodiA9PiB2LmZpZWxkKVxuICAgICk7XG5cbiAgICAvLyBkb24ndCBjb3B5IG92ZXIgZG9tYWluIGFuZCBhbmltYXRpb25cbiAgICBjb25zdCBub3RUb0NvcHkgPSBbJ2FuaW1hdGlvbiddLmNvbmNhdChPYmplY3QudmFsdWVzKHRoaXMudmlzdWFsQ2hhbm5lbHMpLm1hcCh2ID0+IHYuZG9tYWluKSk7XG4gICAgLy8gaWYgcmFuZ2UgaXMgZm9yIHRoZSBzYW1lIHByb3BlcnR5IGdyb3VwIGNvcHkgaXQsIG90aGVyd2lzZSwgbm90IHRvIGNvcHlcbiAgICBPYmplY3QudmFsdWVzKHRoaXMudmlzdWFsQ2hhbm5lbHMpLmZvckVhY2godiA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIGNvbmZpZ1RvQ29weS52aXNDb25maWdbdi5yYW5nZV0gJiZcbiAgICAgICAgdGhpcy52aXNDb25maWdTZXR0aW5nc1t2LnJhbmdlXSAmJlxuICAgICAgICB2aXNDb25maWdTZXR0aW5nc1t2LnJhbmdlXS5ncm91cCAhPT0gdGhpcy52aXNDb25maWdTZXR0aW5nc1t2LnJhbmdlXS5ncm91cFxuICAgICAgKSB7XG4gICAgICAgIG5vdFRvQ29weS5wdXNoKHYucmFuZ2UpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gZG9uJ3QgY29weSBvdmVyIHZpc3VhbENoYW5uZWwgcmFuZ2VcbiAgICBjb25zdCBjdXJyZW50Q29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgY29uc3QgY29waWVkID0gdGhpcy5jb3B5TGF5ZXJDb25maWcoY3VycmVudENvbmZpZywgY29uZmlnVG9Db3B5LCB7XG4gICAgICBzaGFsbG93Q29weSxcbiAgICAgIG5vdFRvQ29weVxuICAgIH0pO1xuXG4gICAgdGhpcy51cGRhdGVMYXllckNvbmZpZyhjb3BpZWQpO1xuICAgIC8vIHZhbGlkYXRlIHZpc3VhbENoYW5uZWwgZmllbGQgdHlwZSBhbmQgc2NhbGUgdHlwZXNcbiAgICBPYmplY3Qua2V5cyh0aGlzLnZpc3VhbENoYW5uZWxzKS5mb3JFYWNoKGNoYW5uZWwgPT4ge1xuICAgICAgdGhpcy52YWxpZGF0ZVZpc3VhbENoYW5uZWwoY2hhbm5lbCk7XG4gICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiBSZWN1cnNpdmVseSBjb3B5IGNvbmZpZyBvdmVyIHRvIGFuIGVtcHR5IGxheWVyXG4gICAqIHdoZW4gcmVjZWl2ZWQgc2F2ZWQgY29uZmlnLCBvciBjb3B5IGNvbmZpZyBvdmVyIGZyb20gYSBkaWZmZXJlbnQgbGF5ZXIgdHlwZVxuICAgKiBtYWtlIHN1cmUgdG8gb25seSBjb3B5IG92ZXIgdmFsdWUgdG8gZXhpc3Rpbmcga2V5c1xuICAgKiBAcGFyYW0ge29iamVjdH0gY3VycmVudENvbmZpZyAtIGV4aXN0aW5nIGNvbmZpZyB0byBiZSBvdmVycmlkZVxuICAgKiBAcGFyYW0ge29iamVjdH0gY29uZmlnVG9Db3B5IC0gbmV3IENvbmZpZyB0byBjb3B5IG92ZXJcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gc2hhbGxvd0NvcHkgLSBhcnJheSBvZiBwcm9wZXJ0aWVzIHRvIG5vdCB0byBiZSBkZWVwIGNvcGllZFxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBub3RUb0NvcHkgLSBhcnJheSBvZiBwcm9wZXJ0aWVzIG5vdCB0byBjb3B5XG4gICAqIEByZXR1cm5zIHtvYmplY3R9IC0gY29waWVkIGNvbmZpZ1xuICAgKi9cbiAgY29weUxheWVyQ29uZmlnKGN1cnJlbnRDb25maWcsIGNvbmZpZ1RvQ29weSwge3NoYWxsb3dDb3B5ID0gW10sIG5vdFRvQ29weSA9IFtdfSA9IHt9KSB7XG4gICAgY29uc3QgY29waWVkID0ge307XG4gICAgT2JqZWN0LmtleXMoY3VycmVudENvbmZpZykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBpc1BsYWluT2JqZWN0KGN1cnJlbnRDb25maWdba2V5XSkgJiZcbiAgICAgICAgaXNQbGFpbk9iamVjdChjb25maWdUb0NvcHlba2V5XSkgJiZcbiAgICAgICAgIXNoYWxsb3dDb3B5LmluY2x1ZGVzKGtleSkgJiZcbiAgICAgICAgIW5vdFRvQ29weS5pbmNsdWRlcyhrZXkpXG4gICAgICApIHtcbiAgICAgICAgLy8gcmVjdXJzaXZlbHkgYXNzaWduIG9iamVjdCB2YWx1ZVxuICAgICAgICBjb3BpZWRba2V5XSA9IHRoaXMuY29weUxheWVyQ29uZmlnKGN1cnJlbnRDb25maWdba2V5XSwgY29uZmlnVG9Db3B5W2tleV0sIHtcbiAgICAgICAgICBzaGFsbG93Q29weSxcbiAgICAgICAgICBub3RUb0NvcHlcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKG5vdE51bGxvclVuZGVmaW5lZChjb25maWdUb0NvcHlba2V5XSkgJiYgIW5vdFRvQ29weS5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgIC8vIGNvcHlcbiAgICAgICAgY29waWVkW2tleV0gPSBjb25maWdUb0NvcHlba2V5XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGtlZXAgZXhpc3RpbmdcbiAgICAgICAgY29waWVkW2tleV0gPSBjdXJyZW50Q29uZmlnW2tleV07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29waWVkO1xuICB9XG5cbiAgcmVnaXN0ZXJWaXNDb25maWcobGF5ZXJWaXNDb25maWdzKSB7XG4gICAgT2JqZWN0LmtleXMobGF5ZXJWaXNDb25maWdzKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJyAmJiBMQVlFUl9WSVNfQ09ORklHU1tsYXllclZpc0NvbmZpZ3NbaXRlbV1dKSB7XG4gICAgICAgIC8vIGlmIGFzc2lnbmVkIG9uZSBvZiBkZWZhdWx0IExBWUVSX0NPTkZJR1NcbiAgICAgICAgdGhpcy5jb25maWcudmlzQ29uZmlnW2l0ZW1dID0gTEFZRVJfVklTX0NPTkZJR1NbbGF5ZXJWaXNDb25maWdzW2l0ZW1dXS5kZWZhdWx0VmFsdWU7XG4gICAgICAgIHRoaXMudmlzQ29uZmlnU2V0dGluZ3NbaXRlbV0gPSBMQVlFUl9WSVNfQ09ORklHU1tsYXllclZpc0NvbmZpZ3NbaXRlbV1dO1xuICAgICAgfSBlbHNlIGlmIChbJ3R5cGUnLCAnZGVmYXVsdFZhbHVlJ10uZXZlcnkocCA9PiBsYXllclZpc0NvbmZpZ3NbaXRlbV0uaGFzT3duUHJvcGVydHkocCkpKSB7XG4gICAgICAgIC8vIGlmIHByb3ZpZGVkIGN1c3RvbWl6ZWQgdmlzQ29uZmlnLCBhbmQgaGFzIHR5cGUgJiYgZGVmYXVsdFZhbHVlXG4gICAgICAgIC8vIFRPRE86IGZ1cnRoZXIgY2hlY2sgaWYgY3VzdG9taXplZCB2aXNDb25maWcgaXMgdmFsaWRcbiAgICAgICAgdGhpcy5jb25maWcudmlzQ29uZmlnW2l0ZW1dID0gbGF5ZXJWaXNDb25maWdzW2l0ZW1dLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgdGhpcy52aXNDb25maWdTZXR0aW5nc1tpdGVtXSA9IGxheWVyVmlzQ29uZmlnc1tpdGVtXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldExheWVyQ29sdW1ucygpIHtcbiAgICBjb25zdCBjb2x1bW5WYWxpZGF0b3JzID0gdGhpcy5jb2x1bW5WYWxpZGF0b3JzIHx8IHt9O1xuICAgIGNvbnN0IHJlcXVpcmVkID0gdGhpcy5yZXF1aXJlZExheWVyQ29sdW1ucy5yZWR1Y2UoXG4gICAgICAoYWNjdSwga2V5KSA9PiAoe1xuICAgICAgICAuLi5hY2N1LFxuICAgICAgICBba2V5XTogY29sdW1uVmFsaWRhdG9yc1trZXldXG4gICAgICAgICAgPyB7dmFsdWU6IG51bGwsIGZpZWxkSWR4OiAtMSwgdmFsaWRhdG9yOiBjb2x1bW5WYWxpZGF0b3JzW2tleV19XG4gICAgICAgICAgOiB7dmFsdWU6IG51bGwsIGZpZWxkSWR4OiAtMX1cbiAgICAgIH0pLFxuICAgICAge31cbiAgICApO1xuICAgIGNvbnN0IG9wdGlvbmFsID0gdGhpcy5vcHRpb25hbENvbHVtbnMucmVkdWNlKFxuICAgICAgKGFjY3UsIGtleSkgPT4gKHtcbiAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgW2tleV06IHt2YWx1ZTogbnVsbCwgZmllbGRJZHg6IC0xLCBvcHRpb25hbDogdHJ1ZX1cbiAgICAgIH0pLFxuICAgICAge31cbiAgICApO1xuXG4gICAgcmV0dXJuIHsuLi5yZXF1aXJlZCwgLi4ub3B0aW9uYWx9O1xuICB9XG5cbiAgdXBkYXRlTGF5ZXJDb25maWcobmV3Q29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSB7Li4udGhpcy5jb25maWcsIC4uLm5ld0NvbmZpZ307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB1cGRhdGVMYXllclZpc0NvbmZpZyhuZXdWaXNDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZy52aXNDb25maWcgPSB7Li4udGhpcy5jb25maWcudmlzQ29uZmlnLCAuLi5uZXdWaXNDb25maWd9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdXBkYXRlTGF5ZXJDb2xvclVJKHByb3AsIG5ld0NvbmZpZykge1xuICAgIGNvbnN0IHtjb2xvclVJOiBwcmV2aW91cywgdmlzQ29uZmlnfSA9IHRoaXMuY29uZmlnO1xuXG4gICAgaWYgKCFpc1BsYWluT2JqZWN0KG5ld0NvbmZpZykgfHwgdHlwZW9mIHByb3AgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb25zdCBjb2xvclVJUHJvcCA9IE9iamVjdC5lbnRyaWVzKG5ld0NvbmZpZykucmVkdWNlKChhY2N1LCBba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmFjY3UsXG4gICAgICAgIFtrZXldOiBpc1BsYWluT2JqZWN0KGFjY3Vba2V5XSkgJiYgaXNQbGFpbk9iamVjdCh2YWx1ZSkgPyB7Li4uYWNjdVtrZXldLCAuLi52YWx1ZX0gOiB2YWx1ZVxuICAgICAgfTtcbiAgICB9LCBwcmV2aW91c1twcm9wXSB8fCBERUZBVUxUX0NPTE9SX1VJKTtcblxuICAgIGNvbnN0IGNvbG9yVUkgPSB7XG4gICAgICAuLi5wcmV2aW91cyxcbiAgICAgIFtwcm9wXTogY29sb3JVSVByb3BcbiAgICB9O1xuXG4gICAgdGhpcy51cGRhdGVMYXllckNvbmZpZyh7Y29sb3JVSX0pO1xuICAgIC8vIGlmIGNvbG9yVUlbcHJvcF0gaXMgY29sb3JSYW5nZVxuICAgIGNvbnN0IGlzQ29sb3JSYW5nZSA9IHZpc0NvbmZpZ1twcm9wXSAmJiB2aXNDb25maWdbcHJvcF0uY29sb3JzO1xuXG4gICAgaWYgKGlzQ29sb3JSYW5nZSkge1xuICAgICAgdGhpcy51cGRhdGVDb2xvclVJQnlDb2xvclJhbmdlKG5ld0NvbmZpZywgcHJvcCk7XG4gICAgICB0aGlzLnVwZGF0ZUNvbG9yUmFuZ2VCeUNvbG9yVUkobmV3Q29uZmlnLCBwcmV2aW91cywgcHJvcCk7XG4gICAgICB0aGlzLnVwZGF0ZUN1c3RvbVBhbGV0dGUobmV3Q29uZmlnLCBwcmV2aW91cywgcHJvcCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB1cGRhdGVDdXN0b21QYWxldHRlKG5ld0NvbmZpZywgcHJldmlvdXMsIHByb3ApIHtcbiAgICBpZiAoIW5ld0NvbmZpZy5jb2xvclJhbmdlQ29uZmlnIHx8ICFuZXdDb25maWcuY29sb3JSYW5nZUNvbmZpZy5jdXN0b20pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7Y29sb3JVSSwgdmlzQ29uZmlnfSA9IHRoaXMuY29uZmlnO1xuXG4gICAgaWYgKCF2aXNDb25maWdbcHJvcF0pIHJldHVybjtcbiAgICBjb25zdCB7Y29sb3JzfSA9IHZpc0NvbmZpZ1twcm9wXTtcbiAgICBjb25zdCBjdXN0b21QYWxldHRlID0ge1xuICAgICAgLi4uY29sb3JVSVtwcm9wXS5jdXN0b21QYWxldHRlLFxuICAgICAgbmFtZTogJ0N1c3RvbSBQYWxldHRlJyxcbiAgICAgIGNvbG9yczogWy4uLmNvbG9yc11cbiAgICB9O1xuICAgIHRoaXMudXBkYXRlTGF5ZXJDb25maWcoe1xuICAgICAgY29sb3JVSToge1xuICAgICAgICAuLi5jb2xvclVJLFxuICAgICAgICBbcHJvcF06IHtcbiAgICAgICAgICAuLi5jb2xvclVJW3Byb3BdLFxuICAgICAgICAgIGN1c3RvbVBhbGV0dGVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiBpZiBvcGVuIGRyb3Bkb3duIGFuZCBwcm9wIGlzIGNvbG9yIHJhbmdlXG4gICAqIEF1dG9tYXRpY2FsbHkgc2V0IGNvbG9yUmFuZ2VDb25maWcncyBzdGVwIGFuZCByZXZlcnNlZFxuICAgKiBAcGFyYW0geyp9IG5ld0NvbmZpZ1xuICAgKiBAcGFyYW0geyp9IHByb3BcbiAgICovXG4gIHVwZGF0ZUNvbG9yVUlCeUNvbG9yUmFuZ2UobmV3Q29uZmlnLCBwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBuZXdDb25maWcuc2hvd0Ryb3Bkb3duICE9PSAnbnVtYmVyJykgcmV0dXJuO1xuXG4gICAgY29uc3Qge2NvbG9yVUksIHZpc0NvbmZpZ30gPSB0aGlzLmNvbmZpZztcbiAgICB0aGlzLnVwZGF0ZUxheWVyQ29uZmlnKHtcbiAgICAgIGNvbG9yVUk6IHtcbiAgICAgICAgLi4uY29sb3JVSSxcbiAgICAgICAgW3Byb3BdOiB7XG4gICAgICAgICAgLi4uY29sb3JVSVtwcm9wXSxcbiAgICAgICAgICBjb2xvclJhbmdlQ29uZmlnOiB7XG4gICAgICAgICAgICAuLi5jb2xvclVJW3Byb3BdLmNvbG9yUmFuZ2VDb25maWcsXG4gICAgICAgICAgICBzdGVwczogdmlzQ29uZmlnW3Byb3BdLmNvbG9ycy5sZW5ndGgsXG4gICAgICAgICAgICByZXZlcnNlZDogQm9vbGVhbih2aXNDb25maWdbcHJvcF0ucmV2ZXJzZWQpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVDb2xvclJhbmdlQnlDb2xvclVJKG5ld0NvbmZpZywgcHJldmlvdXMsIHByb3ApIHtcbiAgICAvLyBvbmx5IHVwZGF0ZSBjb2xvclJhbmdlIGlmIGNoYW5nZXMgaW4gVUkgaXMgbWFkZSB0byAncmV2ZXJzZWQnLCAnc3RlcHMnIG9yIHN0ZXBzXG4gICAgY29uc3Qgc2hvdWxkVXBkYXRlID1cbiAgICAgIG5ld0NvbmZpZy5jb2xvclJhbmdlQ29uZmlnICYmXG4gICAgICBbJ3JldmVyc2VkJywgJ3N0ZXBzJ10uc29tZShcbiAgICAgICAga2V5ID0+XG4gICAgICAgICAgbmV3Q29uZmlnLmNvbG9yUmFuZ2VDb25maWcuaGFzT3duUHJvcGVydHkoa2V5KSAmJlxuICAgICAgICAgIG5ld0NvbmZpZy5jb2xvclJhbmdlQ29uZmlnW2tleV0gIT09XG4gICAgICAgICAgICAocHJldmlvdXNbcHJvcF0gfHwgREVGQVVMVF9DT0xPUl9VSSkuY29sb3JSYW5nZUNvbmZpZ1trZXldXG4gICAgICApO1xuICAgIGlmICghc2hvdWxkVXBkYXRlKSByZXR1cm47XG5cbiAgICBjb25zdCB7Y29sb3JVSSwgdmlzQ29uZmlnfSA9IHRoaXMuY29uZmlnO1xuICAgIGNvbnN0IHtzdGVwcywgcmV2ZXJzZWR9ID0gY29sb3JVSVtwcm9wXS5jb2xvclJhbmdlQ29uZmlnO1xuICAgIGNvbnN0IGNvbG9yUmFuZ2UgPSB2aXNDb25maWdbcHJvcF07XG4gICAgLy8gZmluZCBiYXNlZCBvbiBzdGVwIG9yIHJldmVyc2VkXG4gICAgbGV0IHVwZGF0ZTtcbiAgICBpZiAobmV3Q29uZmlnLmNvbG9yUmFuZ2VDb25maWcuaGFzT3duUHJvcGVydHkoJ3N0ZXBzJykpIHtcbiAgICAgIGNvbnN0IGdyb3VwID0gZ2V0Q29sb3JHcm91cEJ5TmFtZShjb2xvclJhbmdlKTtcblxuICAgICAgaWYgKGdyb3VwKSB7XG4gICAgICAgIGNvbnN0IHNhbWVHcm91cCA9IENPTE9SX1JBTkdFUy5maWx0ZXIoY3IgPT4gZ2V0Q29sb3JHcm91cEJ5TmFtZShjcikgPT09IGdyb3VwKTtcblxuICAgICAgICB1cGRhdGUgPSBzYW1lR3JvdXAuZmluZChjciA9PiBjci5jb2xvcnMubGVuZ3RoID09PSBzdGVwcyk7XG5cbiAgICAgICAgaWYgKHVwZGF0ZSAmJiBjb2xvclJhbmdlLnJldmVyc2VkKSB7XG4gICAgICAgICAgdXBkYXRlID0gcmV2ZXJzZUNvbG9yUmFuZ2UodHJ1ZSwgdXBkYXRlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChuZXdDb25maWcuY29sb3JSYW5nZUNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgncmV2ZXJzZWQnKSkge1xuICAgICAgdXBkYXRlID0gcmV2ZXJzZUNvbG9yUmFuZ2UocmV2ZXJzZWQsIHVwZGF0ZSB8fCBjb2xvclJhbmdlKTtcbiAgICB9XG5cbiAgICBpZiAodXBkYXRlKSB7XG4gICAgICB0aGlzLnVwZGF0ZUxheWVyVmlzQ29uZmlnKHtbcHJvcF06IHVwZGF0ZX0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIGxheWVyIGhhcyBhbGwgY29sdW1uc1xuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0geWVzIG9yIG5vXG4gICAqL1xuICBoYXNBbGxDb2x1bW5zKCkge1xuICAgIGNvbnN0IHtjb2x1bW5zfSA9IHRoaXMuY29uZmlnO1xuICAgIHJldHVybiAoXG4gICAgICAoY29sdW1ucyAmJlxuICAgICAgT2JqZWN0LnZhbHVlcyhjb2x1bW5zKS5ldmVyeSh2ID0+IHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4odi5vcHRpb25hbCB8fCAodi52YWx1ZSAmJiB2LmZpZWxkSWR4ID4gLTEpKTtcbiAgICAgIH0pKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgd2hldGhlciBsYXllciBoYXMgZGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5IHwgT2JqZWN0fSBsYXllckRhdGFcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHllcyBvciBub1xuICAgKi9cbiAgaGFzTGF5ZXJEYXRhKGxheWVyRGF0YSkge1xuICAgIGlmICghbGF5ZXJEYXRhKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBCb29sZWFuKGxheWVyRGF0YS5kYXRhICYmIGxheWVyRGF0YS5kYXRhLmxlbmd0aCk7XG4gIH1cblxuICBpc1ZhbGlkVG9TYXZlKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGUgJiYgdGhpcy5oYXNBbGxDb2x1bW5zKCk7XG4gIH1cblxuICBzaG91bGRSZW5kZXJMYXllcihkYXRhKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICh0aGlzLnR5cGUgJiZcbiAgICAgIHRoaXMuaGFzQWxsQ29sdW1ucygpICYmXG4gICAgICB0aGlzLmhhc0xheWVyRGF0YShkYXRhKSAmJlxuICAgICAgdHlwZW9mIHRoaXMucmVuZGVyTGF5ZXIgPT09ICdmdW5jdGlvbicpXG4gICAgKTtcbiAgfVxuXG4gIGdldENvbG9yU2NhbGUoY29sb3JTY2FsZSwgY29sb3JEb21haW4sIGNvbG9yUmFuZ2UpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb2xvclJhbmdlLmNvbG9yTWFwKSkge1xuICAgICAgY29uc3QgY01hcCA9IG5ldyBNYXAoKTtcbiAgICAgIGNvbG9yUmFuZ2UuY29sb3JNYXAuZm9yRWFjaCgoW2ssIHZdKSA9PiB7XG4gICAgICAgIGNNYXAuc2V0KGssIHR5cGVvZiB2ID09PSAnc3RyaW5nJyA/IGhleFRvUmdiKHYpIDogdik7XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgc2NhbGUgPSBTQ0FMRV9GVU5DW1NDQUxFX1RZUEVTLm9yZGluYWxdKClcbiAgICAgICAgLmRvbWFpbihjTWFwLmtleXMoKSlcbiAgICAgICAgLnJhbmdlKGNNYXAudmFsdWVzKCkpXG4gICAgICAgIC51bmtub3duKGNNYXAuZ2V0KFVOS05PV05fQ09MT1JfS0VZKSB8fCBOT19WQUxVRV9DT0xPUik7XG4gICAgICByZXR1cm4gc2NhbGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZ2V0VmlzQ2hhbm5lbFNjYWxlKGNvbG9yU2NhbGUsIGNvbG9yRG9tYWluLCBjb2xvclJhbmdlLmNvbG9ycy5tYXAoaGV4VG9SZ2IpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYXBwaW5nIGZyb20gdmlzdWFsIGNoYW5uZWxzIHRvIGRlY2suZ2wgYWNjZXNvcnNcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtIFBhcmFtZXRlcnNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyYW0uZGF0YUFjY2Vzc29yIEFjY2VzcyBrZXBsZXIuZ2wgbGF5ZXIgZGF0YSBmcm9tIGRlY2suZ2wgbGF5ZXJcbiAgICogQHBhcmFtIHtpbXBvcnQoJ3V0aWxzL3RhYmxlLXV0aWxzL2RhdGEtY29udGFpbmVyLWludGVyZmFjZScpLkRhdGFDb250YWluZXJJbnRlcmZhY2V9IHBhcmFtLmRhdGFDb250YWluZXIgRGF0YUNvbnRhaW5lciB0byB1c2UgdXNlIHdpdGggZGF0YUFjY2Vzc29yXG4gICAqIEByZXR1cm4ge09iamVjdH0gYXR0cmlidXRlQWNjZXNzb3JzIC0gZGVjay5nbCBsYXllciBhdHRyaWJ1dGUgYWNjZXNzb3JzXG4gICAqL1xuICBnZXRBdHRyaWJ1dGVBY2Nlc3NvcnMoe2RhdGFBY2Nlc3NvciA9IGRlZmF1bHREYXRhQWNjZXNzb3IsIGRhdGFDb250YWluZXJ9KSB7XG4gICAgY29uc3QgYXR0cmlidXRlQWNjZXNzb3JzID0ge307XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLnZpc3VhbENoYW5uZWxzKS5mb3JFYWNoKGNoYW5uZWwgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBmaWVsZCxcbiAgICAgICAgZml4ZWQsXG4gICAgICAgIHNjYWxlLFxuICAgICAgICBkb21haW4sXG4gICAgICAgIHJhbmdlLFxuICAgICAgICBhY2Nlc3NvcixcbiAgICAgICAgZGVmYXVsdFZhbHVlLFxuICAgICAgICBnZXRBdHRyaWJ1dGVWYWx1ZSxcbiAgICAgICAgbnVsbFZhbHVlLFxuICAgICAgICBjaGFubmVsU2NhbGVUeXBlXG4gICAgICB9ID0gdGhpcy52aXN1YWxDaGFubmVsc1tjaGFubmVsXTtcblxuICAgICAgY29uc3Qgc2hvdWxkR2V0U2NhbGUgPSB0aGlzLmNvbmZpZ1tmaWVsZF07XG5cbiAgICAgIGlmIChzaG91bGRHZXRTY2FsZSkge1xuICAgICAgICBjb25zdCBhcmdzID0gW3RoaXMuY29uZmlnW3NjYWxlXSwgdGhpcy5jb25maWdbZG9tYWluXSwgdGhpcy5jb25maWcudmlzQ29uZmlnW3JhbmdlXV07XG4gICAgICAgIGNvbnN0IGlzRml4ZWQgPSBmaXhlZCAmJiB0aGlzLmNvbmZpZy52aXNDb25maWdbZml4ZWRdO1xuXG4gICAgICAgIGNvbnN0IHNjYWxlRnVuY3Rpb24gPVxuICAgICAgICAgIGNoYW5uZWxTY2FsZVR5cGUgPT09IENIQU5ORUxfU0NBTEVTLmNvbG9yXG4gICAgICAgICAgICA/IHRoaXMuZ2V0Q29sb3JTY2FsZSguLi5hcmdzKVxuICAgICAgICAgICAgOiB0aGlzLmdldFZpc0NoYW5uZWxTY2FsZSguLi5hcmdzLCBpc0ZpeGVkKTtcblxuICAgICAgICBhdHRyaWJ1dGVBY2Nlc3NvcnNbYWNjZXNzb3JdID0gZCA9PlxuICAgICAgICAgIHRoaXMuZ2V0RW5jb2RlZENoYW5uZWxWYWx1ZShcbiAgICAgICAgICAgIHNjYWxlRnVuY3Rpb24sXG4gICAgICAgICAgICBkYXRhQWNjZXNzb3IoZGF0YUNvbnRhaW5lcikoZCksXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0sXG4gICAgICAgICAgICBudWxsVmFsdWVcbiAgICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZ2V0QXR0cmlidXRlVmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgYXR0cmlidXRlQWNjZXNzb3JzW2FjY2Vzc29yXSA9IGdldEF0dHJpYnV0ZVZhbHVlKHRoaXMuY29uZmlnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF0dHJpYnV0ZUFjY2Vzc29yc1thY2Nlc3Nvcl0gPVxuICAgICAgICAgIHR5cGVvZiBkZWZhdWx0VmFsdWUgPT09ICdmdW5jdGlvbicgPyBkZWZhdWx0VmFsdWUodGhpcy5jb25maWcpIDogZGVmYXVsdFZhbHVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWF0dHJpYnV0ZUFjY2Vzc29yc1thY2Nlc3Nvcl0pIHtcbiAgICAgICAgQ29uc29sZS53YXJuKGBGYWlsZWQgdG8gcHJvdmlkZSBhY2Nlc3NvciBmdW5jdGlvbiBmb3IgJHthY2Nlc3NvciB8fCBjaGFubmVsfWApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGF0dHJpYnV0ZUFjY2Vzc29ycztcbiAgfVxuXG4gIGdldFZpc0NoYW5uZWxTY2FsZShzY2FsZSwgZG9tYWluLCByYW5nZSwgZml4ZWQpIHtcbiAgICByZXR1cm4gU0NBTEVfRlVOQ1tmaXhlZCA/ICdsaW5lYXInIDogc2NhbGVdKClcbiAgICAgIC5kb21haW4oZG9tYWluKVxuICAgICAgLnJhbmdlKGZpeGVkID8gZG9tYWluIDogcmFuZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBsb25naXR1ZGUgYW5kIGxhdGl0dWRlIGJvdW5kcyBvZiB0aGUgZGF0YS5cbiAgICogQHBhcmFtIHtpbXBvcnQoJ3V0aWxzL3RhYmxlLXV0aWxzL2RhdGEtY29udGFpbmVyLWludGVyZmFjZScpLkRhdGFDb250YWluZXJJbnRlcmZhY2V9IGRhdGFDb250YWluZXIgRGF0YUNvbnRhaW5lciB0byBjYWxjdWxhdGUgYm91bmRzIGZvci5cbiAgICogQHBhcmFtIHsoZDoge2luZGV4OiBudW1iZXJ9LCBkYzogaW1wb3J0KCd1dGlscy90YWJsZS11dGlscy9kYXRhLWNvbnRhaW5lci1pbnRlcmZhY2UnKS5EYXRhQ29udGFpbmVySW50ZXJmYWNlKSA9PiBudW1iZXJbXX0gZ2V0UG9zaXRpb24gQWNjZXNzIGtlcGxlci5nbCBsYXllciBkYXRhIGZyb20gZGVjay5nbCBsYXllclxuICAgKiBAcmV0dXJuIHtudW1iZXJbXXxudWxsfSBib3VuZHMgb2YgdGhlIGRhdGEuXG4gICAqL1xuICBnZXRQb2ludHNCb3VuZHMoZGF0YUNvbnRhaW5lciwgZ2V0UG9zaXRpb24pIHtcbiAgICAvLyBubyBuZWVkIHRvIGxvb3AgdGhyb3VnaCB0aGUgZW50aXJlIGRhdGFzZXRcbiAgICAvLyBnZXQgYSBzYW1wbGUgb2YgZGF0YSB0byBjYWxjdWxhdGUgYm91bmRzXG4gICAgY29uc3Qgc2FtcGxlRGF0YSA9XG4gICAgICBkYXRhQ29udGFpbmVyLm51bVJvd3MoKSA+IE1BWF9TQU1QTEVfU0laRVxuICAgICAgICA/IGdldFNhbXBsZURhdGEoZGF0YUNvbnRhaW5lciwgTUFYX1NBTVBMRV9TSVpFKVxuICAgICAgICA6IGRhdGFDb250YWluZXI7XG5cbiAgICBjb25zdCBwb2ludHMgPSBzYW1wbGVEYXRhLm1hcEluZGV4KGdldFBvc2l0aW9uKTtcblxuICAgIGNvbnN0IGxhdEJvdW5kcyA9IGdldExhdExuZ0JvdW5kcyhwb2ludHMsIDEsIFstOTAsIDkwXSk7XG4gICAgY29uc3QgbG5nQm91bmRzID0gZ2V0TGF0TG5nQm91bmRzKHBvaW50cywgMCwgWy0xODAsIDE4MF0pO1xuXG4gICAgaWYgKCFsYXRCb3VuZHMgfHwgIWxuZ0JvdW5kcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtsbmdCb3VuZHNbMF0sIGxhdEJvdW5kc1swXSwgbG5nQm91bmRzWzFdLCBsYXRCb3VuZHNbMV1dO1xuICB9XG5cbiAgZ2V0Q2hhbmdlZFRyaWdnZXJzKGRhdGFVcGRhdGVUcmlnZ2Vycykge1xuICAgIGNvbnN0IHRyaWdnZXJDaGFuZ2VkID0gZGlmZlVwZGF0ZVRyaWdnZXJzKGRhdGFVcGRhdGVUcmlnZ2VycywgdGhpcy5fb2xkRGF0YVVwZGF0ZVRyaWdnZXJzKTtcbiAgICB0aGlzLl9vbGREYXRhVXBkYXRlVHJpZ2dlcnMgPSBkYXRhVXBkYXRlVHJpZ2dlcnM7XG5cbiAgICByZXR1cm4gdHJpZ2dlckNoYW5nZWQ7XG4gIH1cblxuICBnZXRFbmNvZGVkQ2hhbm5lbFZhbHVlKFxuICAgIHNjYWxlLFxuICAgIGRhdGEsXG4gICAgZmllbGQsXG4gICAgbnVsbFZhbHVlID0gTk9fVkFMVUVfQ09MT1IsXG4gICAgZ2V0VmFsdWUgPSBkZWZhdWx0R2V0RmllbGRWYWx1ZVxuICApIHtcbiAgICBjb25zdCB7dHlwZX0gPSBmaWVsZDtcbiAgICBjb25zdCB2YWx1ZSA9IGdldFZhbHVlKGZpZWxkLCBkYXRhKTtcblxuICAgIGlmICghbm90TnVsbG9yVW5kZWZpbmVkKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIG51bGxWYWx1ZTtcbiAgICB9XG5cbiAgICBsZXQgYXR0cmlidXRlVmFsdWU7XG4gICAgaWYgKHR5cGUgPT09IEFMTF9GSUVMRF9UWVBFUy50aW1lc3RhbXApIHtcbiAgICAgIC8vIHNob3VsZG4ndCBuZWVkIHRvIGNvbnZlcnQgaGVyZVxuICAgICAgLy8gc2NhbGUgRnVuY3Rpb24gc2hvdWxkIHRha2UgY2FyZSBvZiBpdFxuICAgICAgYXR0cmlidXRlVmFsdWUgPSBzY2FsZShuZXcgRGF0ZSh2YWx1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhdHRyaWJ1dGVWYWx1ZSA9IHNjYWxlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAoIW5vdE51bGxvclVuZGVmaW5lZChhdHRyaWJ1dGVWYWx1ZSkpIHtcbiAgICAgIGF0dHJpYnV0ZVZhbHVlID0gbnVsbFZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBhdHRyaWJ1dGVWYWx1ZTtcbiAgfVxuXG4gIHVwZGF0ZU1ldGEobWV0YSkge1xuICAgIHRoaXMubWV0YSA9IHsuLi50aGlzLm1ldGEsIC4uLm1ldGF9O1xuICB9XG5cbiAgZ2V0RGF0YVVwZGF0ZVRyaWdnZXJzKHtmaWx0ZXJlZEluZGV4LCBpZCwgYWxsRGF0YX0pIHtcbiAgICBjb25zdCB7Y29sdW1uc30gPSB0aGlzLmNvbmZpZztcblxuICAgIHJldHVybiB7XG4gICAgICBnZXREYXRhOiB7ZGF0YXNldElkOiBpZCwgYWxsRGF0YSwgY29sdW1ucywgZmlsdGVyZWRJbmRleH0sXG4gICAgICBnZXRNZXRhOiB7ZGF0YXNldElkOiBpZCwgYWxsRGF0YSwgY29sdW1uc30sXG4gICAgICAuLi4odGhpcy5jb25maWcudGV4dExhYmVsIHx8IFtdKS5yZWR1Y2UoXG4gICAgICAgIChhY2N1LCB0bCwgaSkgPT4gKHtcbiAgICAgICAgICAuLi5hY2N1LFxuICAgICAgICAgIFtgZ2V0TGFiZWxDaGFyYWN0ZXJTZXQtJHtpfWBdOiB0bC5maWVsZCA/IHRsLmZpZWxkLm5hbWUgOiBudWxsXG4gICAgICAgIH0pLFxuICAgICAgICB7fVxuICAgICAgKVxuICAgIH07XG4gIH1cblxuICB1cGRhdGVEYXRhKGRhdGFzZXRzLCBvbGRMYXllckRhdGEpIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLmRhdGFJZCkge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICBjb25zdCBsYXllckRhdGFzZXQgPSBkYXRhc2V0c1t0aGlzLmNvbmZpZy5kYXRhSWRdO1xuICAgIGNvbnN0IHtkYXRhQ29udGFpbmVyfSA9IGxheWVyRGF0YXNldDtcblxuICAgIGNvbnN0IGdldFBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbkFjY2Vzc29yKGRhdGFDb250YWluZXIpO1xuICAgIGNvbnN0IGRhdGFVcGRhdGVUcmlnZ2VycyA9IHRoaXMuZ2V0RGF0YVVwZGF0ZVRyaWdnZXJzKGxheWVyRGF0YXNldCk7XG4gICAgY29uc3QgdHJpZ2dlckNoYW5nZWQgPSB0aGlzLmdldENoYW5nZWRUcmlnZ2VycyhkYXRhVXBkYXRlVHJpZ2dlcnMpO1xuXG4gICAgaWYgKHRyaWdnZXJDaGFuZ2VkLmdldE1ldGEpIHtcbiAgICAgIHRoaXMudXBkYXRlTGF5ZXJNZXRhKGRhdGFDb250YWluZXIsIGdldFBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBsZXQgZGF0YSA9IFtdO1xuXG4gICAgaWYgKCF0cmlnZ2VyQ2hhbmdlZC5nZXREYXRhICYmIG9sZExheWVyRGF0YSAmJiBvbGRMYXllckRhdGEuZGF0YSkge1xuICAgICAgLy8gc2FtZSBkYXRhXG4gICAgICBkYXRhID0gb2xkTGF5ZXJEYXRhLmRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSB0aGlzLmNhbGN1bGF0ZURhdGFBdHRyaWJ1dGUobGF5ZXJEYXRhc2V0LCBnZXRQb3NpdGlvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtkYXRhLCB0cmlnZ2VyQ2hhbmdlZH07XG4gIH1cblxuICAvKipcbiAgICogaGVscGVyIGZ1bmN0aW9uIHRvIHVwZGF0ZSBvbmUgbGF5ZXIgZG9tYWluIHdoZW4gc3RhdGUuZGF0YSBjaGFuZ2VkXG4gICAqIGlmIHN0YXRlLmRhdGEgY2hhbmdlIGlzIGR1ZSBvdCB1cGRhdGUgZmlsdGVyLCBuZXdGaWxlciB3aWxsIGJlIHBhc3NlZFxuICAgKiBjYWxsZWQgYnkgdXBkYXRlQWxsTGF5ZXJEb21haW5EYXRhXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhc2V0c1xuICAgKiBAcGFyYW0ge09iamVjdH0gbmV3RmlsdGVyXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IGxheWVyXG4gICAqL1xuICB1cGRhdGVMYXllckRvbWFpbihkYXRhc2V0cywgbmV3RmlsdGVyKSB7XG4gICAgY29uc3QgdGFibGUgPSB0aGlzLmdldERhdGFzZXQoZGF0YXNldHMpO1xuICAgIGlmICghdGFibGUpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBPYmplY3QudmFsdWVzKHRoaXMudmlzdWFsQ2hhbm5lbHMpLmZvckVhY2goY2hhbm5lbCA9PiB7XG4gICAgICBjb25zdCB7c2NhbGV9ID0gY2hhbm5lbDtcbiAgICAgIGNvbnN0IHNjYWxlVHlwZSA9IHRoaXMuY29uZmlnW3NjYWxlXTtcbiAgICAgIC8vIG9yZGluYWwgZG9tYWluIGlzIGJhc2VkIG9uIGRhdGFDb250YWluZXIsIGlmIG9ubHkgZmlsdGVyIGNoYW5nZWRcbiAgICAgIC8vIG5vIG5lZWQgdG8gdXBkYXRlIG9yZGluYWwgZG9tYWluXG4gICAgICBpZiAoIW5ld0ZpbHRlciB8fCBzY2FsZVR5cGUgIT09IFNDQUxFX1RZUEVTLm9yZGluYWwpIHtcbiAgICAgICAgY29uc3Qge2RvbWFpbn0gPSBjaGFubmVsO1xuICAgICAgICBjb25zdCB1cGRhdGVkRG9tYWluID0gdGhpcy5jYWxjdWxhdGVMYXllckRvbWFpbih0YWJsZSwgY2hhbm5lbCk7XG4gICAgICAgIHRoaXMudXBkYXRlTGF5ZXJDb25maWcoe1tkb21haW5dOiB1cGRhdGVkRG9tYWlufSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldERhdGFzZXQoZGF0YXNldHMpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuZGF0YUlkID8gZGF0YXNldHNbdGhpcy5jb25maWcuZGF0YUlkXSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGUgdmlzdWFsIGNoYW5uZWwgZmllbGQgYW5kIHNjYWxlcyBiYXNlZCBvbiBzdXBwb3J0ZWQgZmllbGQgJiBzY2FsZSB0eXBlXG4gICAqIEBwYXJhbSBjaGFubmVsXG4gICAqL1xuICB2YWxpZGF0ZVZpc3VhbENoYW5uZWwoY2hhbm5lbCkge1xuICAgIHRoaXMudmFsaWRhdGVGaWVsZFR5cGUoY2hhbm5lbCk7XG4gICAgdGhpcy52YWxpZGF0ZVNjYWxlKGNoYW5uZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIGZpZWxkIHR5cGUgYmFzZWQgb24gY2hhbm5lbFNjYWxlVHlwZVxuICAgKi9cbiAgdmFsaWRhdGVGaWVsZFR5cGUoY2hhbm5lbCkge1xuICAgIGNvbnN0IHZpc3VhbENoYW5uZWwgPSB0aGlzLnZpc3VhbENoYW5uZWxzW2NoYW5uZWxdO1xuICAgIGNvbnN0IHtmaWVsZCwgY2hhbm5lbFNjYWxlVHlwZSwgc3VwcG9ydGVkRmllbGRUeXBlc30gPSB2aXN1YWxDaGFubmVsO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnW2ZpZWxkXSkge1xuICAgICAgLy8gaWYgZmllbGQgaXMgc2VsZWN0ZWQsIGNoZWNrIGlmIGZpZWxkIHR5cGUgaXMgc3VwcG9ydGVkXG4gICAgICBjb25zdCBjaGFubmVsU3VwcG9ydGVkRmllbGRUeXBlcyA9XG4gICAgICAgIHN1cHBvcnRlZEZpZWxkVHlwZXMgfHwgQ0hBTk5FTF9TQ0FMRV9TVVBQT1JURURfRklFTERTW2NoYW5uZWxTY2FsZVR5cGVdO1xuXG4gICAgICBpZiAoIWNoYW5uZWxTdXBwb3J0ZWRGaWVsZFR5cGVzLmluY2x1ZGVzKHRoaXMuY29uZmlnW2ZpZWxkXS50eXBlKSkge1xuICAgICAgICAvLyBmaWVsZCB0eXBlIGlzIG5vdCBzdXBwb3J0ZWQsIHNldCBpdCBiYWNrIHRvIG51bGxcbiAgICAgICAgLy8gc2V0IHNjYWxlIGJhY2sgdG8gZGVmYXVsdFxuICAgICAgICB0aGlzLnVwZGF0ZUxheWVyQ29uZmlnKHtbZmllbGRdOiBudWxsfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIHNjYWxlIHR5cGUgYmFzZWQgb24gYWdncmVnYXRpb25cbiAgICovXG4gIHZhbGlkYXRlU2NhbGUoY2hhbm5lbCkge1xuICAgIGNvbnN0IHZpc3VhbENoYW5uZWwgPSB0aGlzLnZpc3VhbENoYW5uZWxzW2NoYW5uZWxdO1xuICAgIGNvbnN0IHtzY2FsZX0gPSB2aXN1YWxDaGFubmVsO1xuICAgIGlmICghc2NhbGUpIHtcbiAgICAgIC8vIHZpc3VhbENoYW5uZWwgZG9lc24ndCBoYXZlIHNjYWxlXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHNjYWxlT3B0aW9ucyA9IHRoaXMuZ2V0U2NhbGVPcHRpb25zKGNoYW5uZWwpO1xuICAgIC8vIGNoZWNrIGlmIGN1cnJlbnQgc2VsZWN0ZWQgc2NhbGUgaXNcbiAgICAvLyBzdXBwb3J0ZWQsIGlmIG5vdCwgY2hhbmdlIHRvIGRlZmF1bHRcbiAgICBpZiAoIXNjYWxlT3B0aW9ucy5pbmNsdWRlcyh0aGlzLmNvbmZpZ1tzY2FsZV0pKSB7XG4gICAgICB0aGlzLnVwZGF0ZUxheWVyQ29uZmlnKHtbc2NhbGVdOiBzY2FsZU9wdGlvbnNbMF19KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHNjYWxlIG9wdGlvbnMgYmFzZWQgb24gY3VycmVudCBmaWVsZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhbm5lbFxuICAgKiBAcmV0dXJucyB7c3RyaW5nW119XG4gICAqL1xuICBnZXRTY2FsZU9wdGlvbnMoY2hhbm5lbCkge1xuICAgIGNvbnN0IHZpc3VhbENoYW5uZWwgPSB0aGlzLnZpc3VhbENoYW5uZWxzW2NoYW5uZWxdO1xuICAgIGNvbnN0IHtmaWVsZCwgc2NhbGUsIGNoYW5uZWxTY2FsZVR5cGV9ID0gdmlzdWFsQ2hhbm5lbDtcblxuICAgIHJldHVybiB0aGlzLmNvbmZpZ1tmaWVsZF1cbiAgICAgID8gRklFTERfT1BUU1t0aGlzLmNvbmZpZ1tmaWVsZF0udHlwZV0uc2NhbGVbY2hhbm5lbFNjYWxlVHlwZV1cbiAgICAgIDogW3RoaXMuZ2V0RGVmYXVsdExheWVyQ29uZmlnKClbc2NhbGVdXTtcbiAgfVxuXG4gIHVwZGF0ZUxheWVyVmlzdWFsQ2hhbm5lbChkYXRhc2V0LCBjaGFubmVsKSB7XG4gICAgY29uc3QgdmlzdWFsQ2hhbm5lbCA9IHRoaXMudmlzdWFsQ2hhbm5lbHNbY2hhbm5lbF07XG4gICAgdGhpcy52YWxpZGF0ZVZpc3VhbENoYW5uZWwoY2hhbm5lbCk7XG4gICAgLy8gY2FsY3VsYXRlIGxheWVyIGNoYW5uZWwgZG9tYWluXG4gICAgY29uc3QgdXBkYXRlZERvbWFpbiA9IHRoaXMuY2FsY3VsYXRlTGF5ZXJEb21haW4oZGF0YXNldCwgdmlzdWFsQ2hhbm5lbCk7XG4gICAgdGhpcy51cGRhdGVMYXllckNvbmZpZyh7W3Zpc3VhbENoYW5uZWwuZG9tYWluXTogdXBkYXRlZERvbWFpbn0pO1xuICB9XG5cbiAgZ2V0VmlzdWFsQ2hhbm5lbFVwZGF0ZVRyaWdnZXJzKCkge1xuICAgIGNvbnN0IHVwZGF0ZVRyaWdnZXJzID0ge307XG4gICAgT2JqZWN0LnZhbHVlcyh0aGlzLnZpc3VhbENoYW5uZWxzKS5mb3JFYWNoKHZpc3VhbENoYW5uZWwgPT4ge1xuICAgICAgLy8gZmllbGQgcmFuZ2Ugc2NhbGUgZG9tYWluXG4gICAgICBjb25zdCB7YWNjZXNzb3IsIGZpZWxkLCBzY2FsZSwgZG9tYWluLCByYW5nZSwgZGVmYXVsdFZhbHVlLCBmaXhlZH0gPSB2aXN1YWxDaGFubmVsO1xuXG4gICAgICB1cGRhdGVUcmlnZ2Vyc1thY2Nlc3Nvcl0gPSB7XG4gICAgICAgIFtmaWVsZF06IHRoaXMuY29uZmlnW2ZpZWxkXSxcbiAgICAgICAgW3NjYWxlXTogdGhpcy5jb25maWdbc2NhbGVdLFxuICAgICAgICBbZG9tYWluXTogdGhpcy5jb25maWdbZG9tYWluXSxcbiAgICAgICAgW3JhbmdlXTogdGhpcy5jb25maWcudmlzQ29uZmlnW3JhbmdlXSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB0eXBlb2YgZGVmYXVsdFZhbHVlID09PSAnZnVuY3Rpb24nID8gZGVmYXVsdFZhbHVlKHRoaXMuY29uZmlnKSA6IGRlZmF1bHRWYWx1ZSxcbiAgICAgICAgLi4uKGZpeGVkID8ge1tmaXhlZF06IHRoaXMuY29uZmlnLnZpc0NvbmZpZ1tmaXhlZF19IDoge30pXG4gICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiB1cGRhdGVUcmlnZ2VycztcbiAgfVxuXG4gIGNhbGN1bGF0ZUxheWVyRG9tYWluKGRhdGFzZXQsIHZpc3VhbENoYW5uZWwpIHtcbiAgICBjb25zdCB7c2NhbGV9ID0gdmlzdWFsQ2hhbm5lbDtcbiAgICBjb25zdCBzY2FsZVR5cGUgPSB0aGlzLmNvbmZpZ1tzY2FsZV07XG5cbiAgICBjb25zdCBmaWVsZCA9IHRoaXMuY29uZmlnW3Zpc3VhbENoYW5uZWwuZmllbGRdO1xuICAgIGlmICghZmllbGQpIHtcbiAgICAgIC8vIGlmIGNvbG9yRmllbGQgb3Igc2l6ZUZpZWxkIHdlcmUgc2V0IGJhY2sgdG8gbnVsbFxuICAgICAgcmV0dXJuIGRlZmF1bHREb21haW47XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGFzZXQuZ2V0Q29sdW1uTGF5ZXJEb21haW4oZmllbGQsIHNjYWxlVHlwZSkgfHwgZGVmYXVsdERvbWFpbjtcbiAgfVxuXG4gIGhhc0hvdmVyZWRPYmplY3Qob2JqZWN0SW5mbykge1xuICAgIHJldHVybiB0aGlzLmlzTGF5ZXJIb3ZlcmVkKG9iamVjdEluZm8pICYmIG9iamVjdEluZm8ub2JqZWN0ID8gb2JqZWN0SW5mby5vYmplY3QgOiBudWxsO1xuICB9XG5cbiAgaXNMYXllckhvdmVyZWQob2JqZWN0SW5mbykge1xuICAgIHJldHVybiBvYmplY3RJbmZvPy5waWNrZWQgJiYgb2JqZWN0SW5mbz8ubGF5ZXI/LnByb3BzPy5pZCA9PT0gdGhpcy5pZDtcbiAgfVxuXG4gIGdldFJhZGl1c1NjYWxlQnlab29tKG1hcFN0YXRlLCBmaXhlZFJhZGl1cykge1xuICAgIGNvbnN0IHJhZGl1c0NoYW5uZWwgPSBPYmplY3QudmFsdWVzKHRoaXMudmlzdWFsQ2hhbm5lbHMpLmZpbmQodmMgPT4gdmMucHJvcGVydHkgPT09ICdyYWRpdXMnKTtcblxuICAgIGlmICghcmFkaXVzQ2hhbm5lbCkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgY29uc3QgZmllbGQgPSByYWRpdXNDaGFubmVsLmZpZWxkO1xuICAgIGNvbnN0IGZpeGVkID0gZml4ZWRSYWRpdXMgPT09IHVuZGVmaW5lZCA/IHRoaXMuY29uZmlnLnZpc0NvbmZpZy5maXhlZFJhZGl1cyA6IGZpeGVkUmFkaXVzO1xuICAgIGNvbnN0IHtyYWRpdXN9ID0gdGhpcy5jb25maWcudmlzQ29uZmlnO1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHJldHVybiBmaXhlZCA/IDEgOiAodGhpcy5jb25maWdbZmllbGRdID8gMSA6IHJhZGl1cykgKiB0aGlzLmdldFpvb21GYWN0b3IobWFwU3RhdGUpO1xuICB9XG5cbiAgc2hvdWxkQ2FsY3VsYXRlTGF5ZXJEYXRhKHByb3BzKSB7XG4gICAgcmV0dXJuIHByb3BzLnNvbWUocCA9PiAhdGhpcy5ub25lTGF5ZXJEYXRhQWZmZWN0aW5nUHJvcHMuaW5jbHVkZXMocCkpO1xuICB9XG5cbiAgZ2V0QnJ1c2hpbmdFeHRlbnNpb25Qcm9wcyhpbnRlcmFjdGlvbkNvbmZpZywgYnJ1c2hpbmdUYXJnZXQpIHtcbiAgICBjb25zdCB7YnJ1c2h9ID0gaW50ZXJhY3Rpb25Db25maWc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLy8gYnJ1c2hpbmdcbiAgICAgIGF1dG9IaWdobGlnaHQ6ICFicnVzaC5lbmFibGVkLFxuICAgICAgYnJ1c2hpbmdSYWRpdXM6IGJydXNoLmNvbmZpZy5zaXplICogMTAwMCxcbiAgICAgIGJydXNoaW5nVGFyZ2V0OiBicnVzaGluZ1RhcmdldCB8fCAnc291cmNlJyxcbiAgICAgIGJydXNoaW5nRW5hYmxlZDogYnJ1c2guZW5hYmxlZFxuICAgIH07XG4gIH1cblxuICBnZXREZWZhdWx0RGVja0xheWVyUHJvcHMoe2lkeCwgZ3B1RmlsdGVyLCBtYXBTdGF0ZSwgdmlzaWJsZX0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICBpZHgsXG4gICAgICBjb29yZGluYXRlU3lzdGVtOiBDT09SRElOQVRFX1NZU1RFTS5MTkdMQVQsXG4gICAgICBwaWNrYWJsZTogdHJ1ZSxcbiAgICAgIHdyYXBMb25naXR1ZGU6IHRydWUsXG4gICAgICBwYXJhbWV0ZXJzOiB7ZGVwdGhUZXN0OiBCb29sZWFuKG1hcFN0YXRlLmRyYWdSb3RhdGUgfHwgdGhpcy5jb25maWcudmlzQ29uZmlnLmVuYWJsZTNkKX0sXG4gICAgICBoaWRkZW46IHRoaXMuY29uZmlnLmhpZGRlbixcbiAgICAgIC8vIHZpc2NvbmZpZ1xuICAgICAgb3BhY2l0eTogdGhpcy5jb25maWcudmlzQ29uZmlnLm9wYWNpdHksXG4gICAgICBoaWdobGlnaHRDb2xvcjogdGhpcy5jb25maWcuaGlnaGxpZ2h0Q29sb3IsXG4gICAgICAvLyBkYXRhIGZpbHRlcmluZ1xuICAgICAgZXh0ZW5zaW9uczogW2RhdGFGaWx0ZXJFeHRlbnNpb25dLFxuICAgICAgZmlsdGVyUmFuZ2U6IGdwdUZpbHRlciA/IGdwdUZpbHRlci5maWx0ZXJSYW5nZSA6IHVuZGVmaW5lZCxcblxuICAgICAgLy8gbGF5ZXIgc2hvdWxkIGJlIHZpc2libGUgYW5kIGlmIHNwbGl0TWFwLCBzaG93biBpbiB0byBvbmUgb2YgcGFuZWxcbiAgICAgIHZpc2libGU6IHRoaXMuY29uZmlnLmlzVmlzaWJsZSAmJiB2aXNpYmxlXG4gICAgfTtcbiAgfVxuXG4gIGdldERlZmF1bHRIb3ZlckxheWVyUHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiBgJHt0aGlzLmlkfS1ob3ZlcmVkYCxcbiAgICAgIHBpY2thYmxlOiBmYWxzZSxcbiAgICAgIHdyYXBMb25naXR1ZGU6IHRydWUsXG4gICAgICBjb29yZGluYXRlU3lzdGVtOiBDT09SRElOQVRFX1NZU1RFTS5MTkdMQVRcbiAgICB9O1xuICB9XG5cbiAgcmVuZGVyVGV4dExhYmVsTGF5ZXIoe2dldFBvc2l0aW9uLCBnZXRQaXhlbE9mZnNldCwgdXBkYXRlVHJpZ2dlcnMsIHNoYXJlZFByb3BzfSwgcmVuZGVyT3B0cykge1xuICAgIGNvbnN0IHtkYXRhLCBtYXBTdGF0ZX0gPSByZW5kZXJPcHRzO1xuICAgIGNvbnN0IHt0ZXh0TGFiZWx9ID0gdGhpcy5jb25maWc7XG5cbiAgICByZXR1cm4gZGF0YS50ZXh0TGFiZWxzLnJlZHVjZSgoYWNjdSwgZCwgaSkgPT4ge1xuICAgICAgaWYgKGQuZ2V0VGV4dCkge1xuICAgICAgICBhY2N1LnB1c2goXG4gICAgICAgICAgbmV3IFRleHRMYXllcih7XG4gICAgICAgICAgICAuLi5zaGFyZWRQcm9wcyxcbiAgICAgICAgICAgIGlkOiBgJHt0aGlzLmlkfS1sYWJlbC0ke3RleHRMYWJlbFtpXS5maWVsZD8ubmFtZX1gLFxuICAgICAgICAgICAgZGF0YTogZGF0YS5kYXRhLFxuICAgICAgICAgICAgZ2V0VGV4dDogZC5nZXRUZXh0LFxuICAgICAgICAgICAgZ2V0UG9zaXRpb24sXG4gICAgICAgICAgICBjaGFyYWN0ZXJTZXQ6IGQuY2hhcmFjdGVyU2V0LFxuICAgICAgICAgICAgZ2V0UGl4ZWxPZmZzZXQ6IGdldFBpeGVsT2Zmc2V0KHRleHRMYWJlbFtpXSksXG4gICAgICAgICAgICBnZXRTaXplOiAxLFxuICAgICAgICAgICAgc2l6ZVNjYWxlOiB0ZXh0TGFiZWxbaV0uc2l6ZSxcbiAgICAgICAgICAgIGdldFRleHRBbmNob3I6IHRleHRMYWJlbFtpXS5hbmNob3IsXG4gICAgICAgICAgICBnZXRBbGlnbm1lbnRCYXNlbGluZTogdGV4dExhYmVsW2ldLmFsaWdubWVudCxcbiAgICAgICAgICAgIGdldENvbG9yOiB0ZXh0TGFiZWxbaV0uY29sb3IsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAgIC8vIHRleHQgd2lsbCBhbHdheXMgc2hvdyBvbiB0b3Agb2YgYWxsIGxheWVyc1xuICAgICAgICAgICAgICBkZXB0aFRlc3Q6IGZhbHNlXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXRGaWx0ZXJWYWx1ZTogZGF0YS5nZXRGaWx0ZXJWYWx1ZSxcbiAgICAgICAgICAgIHVwZGF0ZVRyaWdnZXJzOiB7XG4gICAgICAgICAgICAgIC4uLnVwZGF0ZVRyaWdnZXJzLFxuICAgICAgICAgICAgICBnZXRUZXh0OiB0ZXh0TGFiZWxbaV0uZmllbGQ/Lm5hbWUsXG4gICAgICAgICAgICAgIGdldFBpeGVsT2Zmc2V0OiB7XG4gICAgICAgICAgICAgICAgLi4udXBkYXRlVHJpZ2dlcnMuZ2V0UmFkaXVzLFxuICAgICAgICAgICAgICAgIG1hcFN0YXRlLFxuICAgICAgICAgICAgICAgIGFuY2hvcjogdGV4dExhYmVsW2ldLmFuY2hvcixcbiAgICAgICAgICAgICAgICBhbGlnbm1lbnQ6IHRleHRMYWJlbFtpXS5hbGlnbm1lbnRcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZ2V0VGV4dEFuY2hvcjogdGV4dExhYmVsW2ldLmFuY2hvcixcbiAgICAgICAgICAgICAgZ2V0QWxpZ25tZW50QmFzZWxpbmU6IHRleHRMYWJlbFtpXS5hbGlnbm1lbnQsXG4gICAgICAgICAgICAgIGdldENvbG9yOiB0ZXh0TGFiZWxbaV0uY29sb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjY3U7XG4gICAgfSwgW10pO1xuICB9XG5cbiAgY2FsY3VsYXRlRGF0YUF0dHJpYnV0ZShrZXBsZXJUYWJsZSwgZ2V0UG9zaXRpb24pIHtcbiAgICAvLyBpbXBsZW1lbnRlZCBpbiBzdWJjbGFzc2VzXG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgdXBkYXRlTGF5ZXJNZXRhKGRhdGFDb250YWluZXIsIGdldFBvc2l0aW9uKSB7XG4gICAgLy8gaW1wbGVtZW50ZWQgaW4gc3ViY2xhc3Nlc1xuICB9XG5cbiAgZ2V0UG9zaXRpb25BY2Nlc3NvcihkYXRhQ29udGFpbmVyKSB7XG4gICAgLy8gaW1wbGVtZW50ZWQgaW4gc3ViY2xhc3Nlc1xuICAgIHJldHVybiAoKSA9PiBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExheWVyO1xuIl19