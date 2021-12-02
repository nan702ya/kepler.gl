"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.aggregateRequiredColumns = exports.getFilterDataFunc = exports.getValueAggrFunc = exports.pointPosResolver = exports.pointPosAccessor = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _lodash = _interopRequireDefault(require("lodash.memoize"));

var _baseLayer = _interopRequireDefault(require("./base-layer"));

var _colorUtils = require("../utils/color-utils");

var _aggregateUtils = require("../utils/aggregate-utils");

var _defaultSettings = require("../constants/default-settings");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var pointPosAccessor = function pointPosAccessor(_ref) {
  var lat = _ref.lat,
      lng = _ref.lng;
  return function (dc) {
    return function (d) {
      return [dc.valueAt(d.index, lng.fieldIdx), dc.valueAt(d.index, lat.fieldIdx)];
    };
  };
};

exports.pointPosAccessor = pointPosAccessor;

var pointPosResolver = function pointPosResolver(_ref2) {
  var lat = _ref2.lat,
      lng = _ref2.lng;
  return "".concat(lat.fieldIdx, "-").concat(lng.fieldIdx);
};

exports.pointPosResolver = pointPosResolver;

var getValueAggrFunc = function getValueAggrFunc(field, aggregation) {
  return function (points) {
    return field ? (0, _aggregateUtils.aggregate)(points.map(function (p) {
      return field.valueAccessor(p);
    }), aggregation) : points.length;
  };
};

exports.getValueAggrFunc = getValueAggrFunc;

var getFilterDataFunc = function getFilterDataFunc(filterRange, getFilterValue) {
  return function (pt) {
    return getFilterValue(pt).every(function (val, i) {
      return val >= filterRange[i][0] && val <= filterRange[i][1];
    });
  };
};

exports.getFilterDataFunc = getFilterDataFunc;

var getLayerColorRange = function getLayerColorRange(colorRange) {
  return colorRange.colors.map(_colorUtils.hexToRgb);
};

var aggregateRequiredColumns = ['lat', 'lng'];
exports.aggregateRequiredColumns = aggregateRequiredColumns;

var AggregationLayer = /*#__PURE__*/function (_Layer) {
  (0, _inherits2["default"])(AggregationLayer, _Layer);

  var _super = _createSuper(AggregationLayer);

  function AggregationLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, AggregationLayer);
    _this = _super.call(this, props);

    _this.getPositionAccessor = function (dataContainer) {
      return pointPosAccessor(_this.config.columns)(dataContainer);
    };

    _this.getColorRange = (0, _lodash["default"])(getLayerColorRange);
    return _this;
  }

  (0, _createClass2["default"])(AggregationLayer, [{
    key: "isAggregated",
    get: function get() {
      return true;
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return aggregateRequiredColumns;
    }
  }, {
    key: "columnPairs",
    get: function get() {
      return this.defaultPointColumnPairs;
    }
  }, {
    key: "noneLayerDataAffectingProps",
    get: function get() {
      return [].concat((0, _toConsumableArray2["default"])((0, _get2["default"])((0, _getPrototypeOf2["default"])(AggregationLayer.prototype), "noneLayerDataAffectingProps", this)), ['enable3d', 'colorRange', 'colorDomain', 'sizeRange', 'sizeScale', 'sizeDomain', 'percentile', 'coverage', 'elevationPercentile', 'elevationScale', 'enableElevationZoomFactor']);
    }
  }, {
    key: "visualChannels",
    get: function get() {
      return {
        color: {
          aggregation: 'colorAggregation',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.colorAggr,
          defaultMeasure: 'property.pointCount',
          domain: 'colorDomain',
          field: 'colorField',
          key: 'color',
          property: 'color',
          range: 'colorRange',
          scale: 'colorScale'
        },
        size: {
          aggregation: 'sizeAggregation',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.sizeAggr,
          condition: function condition(config) {
            return config.visConfig.enable3d;
          },
          defaultMeasure: 'property.pointCount',
          domain: 'sizeDomain',
          field: 'sizeField',
          key: 'size',
          property: 'height',
          range: 'sizeRange',
          scale: 'sizeScale'
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
      // e.g. label: Color, measure: Average of ETA
      var _this$visualChannels$ = this.visualChannels[key],
          range = _this$visualChannels$.range,
          field = _this$visualChannels$.field,
          defaultMeasure = _this$visualChannels$.defaultMeasure,
          aggregation = _this$visualChannels$.aggregation;
      var fieldConfig = this.config[field];
      return {
        label: this.visConfigSettings[range].label,
        measure: fieldConfig ? "".concat(this.config.visConfig[aggregation], " of ").concat(fieldConfig.displayName || fieldConfig.name) : defaultMeasure
      };
    }
  }, {
    key: "getHoverData",
    value: function getHoverData(object) {
      // return aggregated object
      return object;
    }
    /**
     * Aggregation layer handles visual channel aggregation inside deck.gl layer
     */

  }, {
    key: "updateLayerVisualChannel",
    value: function updateLayerVisualChannel(_ref3, channel) {
      var data = _ref3.data,
          dataContainer = _ref3.dataContainer;
      this.validateVisualChannel(channel);
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
      var aggregationOptions = this.getAggregationOptions(channel);

      if (!aggregation) {
        return;
      }

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
          aggregation = visualChannel.aggregation,
          channelScaleType = visualChannel.channelScaleType;
      var aggregationType = this.config.visConfig[aggregation];
      return this.config[field] ? // scale options based on aggregation
      _defaultSettings.FIELD_OPTS[this.config[field].type].scale[channelScaleType][aggregationType] : // default scale options for point count
      _defaultSettings.DEFAULT_AGGREGATION[channelScaleType][aggregationType];
    }
    /**
     * Aggregation layer handles visual channel aggregation inside deck.gl layer
     */

  }, {
    key: "updateLayerDomain",
    value: function updateLayerDomain(datasets, newFilter) {
      return this;
    }
  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(dataContainer, getPosition) {
      // get bounds from points
      var bounds = this.getPointsBounds(dataContainer, getPosition);
      this.updateMeta({
        bounds: bounds
      });
    }
  }, {
    key: "calculateDataAttribute",
    value: function calculateDataAttribute(_ref4, getPosition) {
      var dataContainer = _ref4.dataContainer,
          filteredIndex = _ref4.filteredIndex;
      var data = [];

      for (var i = 0; i < filteredIndex.length; i++) {
        var index = filteredIndex[i];
        var pos = getPosition({
          index: index
        }); // if doesn't have point lat or lng, do not add the point
        // deck.gl can't handle position = null

        if (pos.every(Number.isFinite)) {
          data.push({
            index: index
          });
        }
      }

      return data;
    }
  }, {
    key: "formatLayerData",
    value: function formatLayerData(datasets, oldLayerData) {
      var _datasets$this$config = datasets[this.config.dataId],
          gpuFilter = _datasets$this$config.gpuFilter,
          dataContainer = _datasets$this$config.dataContainer;
      var getPosition = this.getPositionAccessor(dataContainer);
      var getColorValue = getValueAggrFunc(this.config.colorField, this.config.visConfig.colorAggregation);
      var getElevationValue = getValueAggrFunc(this.config.sizeField, this.config.visConfig.sizeAggregation);
      var hasFilter = Object.values(gpuFilter.filterRange).some(function (arr) {
        return arr.some(function (v) {
          return v !== 0;
        });
      });
      var getFilterValue = gpuFilter.filterValueAccessor(dataContainer)();
      var filterData = hasFilter ? getFilterDataFunc(gpuFilter.filterRange, getFilterValue) : undefined;

      var _this$updateData = this.updateData(datasets, oldLayerData),
          data = _this$updateData.data;

      return _objectSpread(_objectSpread({
        data: data,
        getPosition: getPosition,
        _filterData: filterData
      }, getColorValue ? {
        getColorValue: getColorValue
      } : {}), getElevationValue ? {
        getElevationValue: getElevationValue
      } : {});
    }
  }, {
    key: "getDefaultDeckLayerProps",
    value: function getDefaultDeckLayerProps(opts) {
      var baseProp = (0, _get2["default"])((0, _getPrototypeOf2["default"])(AggregationLayer.prototype), "getDefaultDeckLayerProps", this).call(this, opts);
      return _objectSpread(_objectSpread({}, baseProp), {}, {
        highlightColor: _defaultSettings.HIGHLIGH_COLOR_3D,
        // gpu data filtering is not supported in aggregation layer
        extensions: [],
        autoHighlight: this.config.visConfig.enable3d
      });
    }
  }, {
    key: "getDefaultAggregationLayerProp",
    value: function getDefaultAggregationLayerProp(opts) {
      var gpuFilter = opts.gpuFilter,
          mapState = opts.mapState,
          _opts$layerCallbacks = opts.layerCallbacks,
          layerCallbacks = _opts$layerCallbacks === void 0 ? {} : _opts$layerCallbacks;
      var visConfig = this.config.visConfig;
      var eleZoomFactor = this.getElevationZoomFactor(mapState);
      var updateTriggers = {
        getColorValue: {
          colorField: this.config.colorField,
          colorAggregation: this.config.visConfig.colorAggregation
        },
        getElevationValue: {
          sizeField: this.config.sizeField,
          sizeAggregation: this.config.visConfig.sizeAggregation
        },
        _filterData: _objectSpread({
          filterRange: gpuFilter.filterRange
        }, gpuFilter.filterValueUpdateTriggers)
      };
      return _objectSpread(_objectSpread({}, this.getDefaultDeckLayerProps(opts)), {}, {
        coverage: visConfig.coverage,
        // color
        colorRange: this.getColorRange(visConfig.colorRange),
        colorScaleType: this.config.colorScale,
        upperPercentile: visConfig.percentile[1],
        lowerPercentile: visConfig.percentile[0],
        colorAggregation: visConfig.colorAggregation,
        // elevation
        extruded: visConfig.enable3d,
        elevationScale: visConfig.elevationScale * eleZoomFactor,
        elevationScaleType: this.config.sizeScale,
        elevationRange: visConfig.sizeRange,
        elevationLowerPercentile: visConfig.elevationPercentile[0],
        elevationUpperPercentile: visConfig.elevationPercentile[1],
        // updateTriggers
        updateTriggers: updateTriggers,
        // callbacks
        onSetColorDomain: layerCallbacks.onSetLayerDomain
      });
    }
  }]);
  return AggregationLayer;
}(_baseLayer["default"]);

exports["default"] = AggregationLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvYWdncmVnYXRpb24tbGF5ZXIuanMiXSwibmFtZXMiOlsicG9pbnRQb3NBY2Nlc3NvciIsImxhdCIsImxuZyIsImRjIiwiZCIsInZhbHVlQXQiLCJpbmRleCIsImZpZWxkSWR4IiwicG9pbnRQb3NSZXNvbHZlciIsImdldFZhbHVlQWdnckZ1bmMiLCJmaWVsZCIsImFnZ3JlZ2F0aW9uIiwicG9pbnRzIiwibWFwIiwicCIsInZhbHVlQWNjZXNzb3IiLCJsZW5ndGgiLCJnZXRGaWx0ZXJEYXRhRnVuYyIsImZpbHRlclJhbmdlIiwiZ2V0RmlsdGVyVmFsdWUiLCJwdCIsImV2ZXJ5IiwidmFsIiwiaSIsImdldExheWVyQ29sb3JSYW5nZSIsImNvbG9yUmFuZ2UiLCJjb2xvcnMiLCJoZXhUb1JnYiIsImFnZ3JlZ2F0ZVJlcXVpcmVkQ29sdW1ucyIsIkFnZ3JlZ2F0aW9uTGF5ZXIiLCJwcm9wcyIsImdldFBvc2l0aW9uQWNjZXNzb3IiLCJkYXRhQ29udGFpbmVyIiwiY29uZmlnIiwiY29sdW1ucyIsImdldENvbG9yUmFuZ2UiLCJkZWZhdWx0UG9pbnRDb2x1bW5QYWlycyIsImNvbG9yIiwiY2hhbm5lbFNjYWxlVHlwZSIsIkNIQU5ORUxfU0NBTEVTIiwiY29sb3JBZ2dyIiwiZGVmYXVsdE1lYXN1cmUiLCJkb21haW4iLCJrZXkiLCJwcm9wZXJ0eSIsInJhbmdlIiwic2NhbGUiLCJzaXplIiwic2l6ZUFnZ3IiLCJjb25kaXRpb24iLCJ2aXNDb25maWciLCJlbmFibGUzZCIsInZpc3VhbENoYW5uZWxzIiwiZmllbGRDb25maWciLCJsYWJlbCIsInZpc0NvbmZpZ1NldHRpbmdzIiwibWVhc3VyZSIsImRpc3BsYXlOYW1lIiwibmFtZSIsIm9iamVjdCIsImNoYW5uZWwiLCJkYXRhIiwidmFsaWRhdGVWaXN1YWxDaGFubmVsIiwidmFsaWRhdGVGaWVsZFR5cGUiLCJ2YWxpZGF0ZUFnZ3JlZ2F0aW9uVHlwZSIsInZhbGlkYXRlU2NhbGUiLCJ2aXN1YWxDaGFubmVsIiwiYWdncmVnYXRpb25PcHRpb25zIiwiZ2V0QWdncmVnYXRpb25PcHRpb25zIiwidXBkYXRlTGF5ZXJDb25maWciLCJpbmNsdWRlcyIsInVwZGF0ZUxheWVyVmlzQ29uZmlnIiwiT2JqZWN0Iiwia2V5cyIsIkZJRUxEX09QVFMiLCJ0eXBlIiwiREVGQVVMVF9BR0dSRUdBVElPTiIsImFnZ3JlZ2F0aW9uVHlwZSIsImRhdGFzZXRzIiwibmV3RmlsdGVyIiwiZ2V0UG9zaXRpb24iLCJib3VuZHMiLCJnZXRQb2ludHNCb3VuZHMiLCJ1cGRhdGVNZXRhIiwiZmlsdGVyZWRJbmRleCIsInBvcyIsIk51bWJlciIsImlzRmluaXRlIiwicHVzaCIsIm9sZExheWVyRGF0YSIsImRhdGFJZCIsImdwdUZpbHRlciIsImdldENvbG9yVmFsdWUiLCJjb2xvckZpZWxkIiwiY29sb3JBZ2dyZWdhdGlvbiIsImdldEVsZXZhdGlvblZhbHVlIiwic2l6ZUZpZWxkIiwic2l6ZUFnZ3JlZ2F0aW9uIiwiaGFzRmlsdGVyIiwidmFsdWVzIiwic29tZSIsImFyciIsInYiLCJmaWx0ZXJWYWx1ZUFjY2Vzc29yIiwiZmlsdGVyRGF0YSIsInVuZGVmaW5lZCIsInVwZGF0ZURhdGEiLCJfZmlsdGVyRGF0YSIsIm9wdHMiLCJiYXNlUHJvcCIsImhpZ2hsaWdodENvbG9yIiwiSElHSExJR0hfQ09MT1JfM0QiLCJleHRlbnNpb25zIiwiYXV0b0hpZ2hsaWdodCIsIm1hcFN0YXRlIiwibGF5ZXJDYWxsYmFja3MiLCJlbGVab29tRmFjdG9yIiwiZ2V0RWxldmF0aW9uWm9vbUZhY3RvciIsInVwZGF0ZVRyaWdnZXJzIiwiZmlsdGVyVmFsdWVVcGRhdGVUcmlnZ2VycyIsImdldERlZmF1bHREZWNrTGF5ZXJQcm9wcyIsImNvdmVyYWdlIiwiY29sb3JTY2FsZVR5cGUiLCJjb2xvclNjYWxlIiwidXBwZXJQZXJjZW50aWxlIiwicGVyY2VudGlsZSIsImxvd2VyUGVyY2VudGlsZSIsImV4dHJ1ZGVkIiwiZWxldmF0aW9uU2NhbGUiLCJlbGV2YXRpb25TY2FsZVR5cGUiLCJzaXplU2NhbGUiLCJlbGV2YXRpb25SYW5nZSIsInNpemVSYW5nZSIsImVsZXZhdGlvbkxvd2VyUGVyY2VudGlsZSIsImVsZXZhdGlvblBlcmNlbnRpbGUiLCJlbGV2YXRpb25VcHBlclBlcmNlbnRpbGUiLCJvblNldENvbG9yRG9tYWluIiwib25TZXRMYXllckRvbWFpbiIsIkxheWVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBSU8sSUFBTUEsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQjtBQUFBLE1BQUVDLEdBQUYsUUFBRUEsR0FBRjtBQUFBLE1BQU9DLEdBQVAsUUFBT0EsR0FBUDtBQUFBLFNBQWdCLFVBQUFDLEVBQUU7QUFBQSxXQUFJLFVBQUFDLENBQUM7QUFBQSxhQUFJLENBQ3pERCxFQUFFLENBQUNFLE9BQUgsQ0FBV0QsQ0FBQyxDQUFDRSxLQUFiLEVBQW9CSixHQUFHLENBQUNLLFFBQXhCLENBRHlELEVBRXpESixFQUFFLENBQUNFLE9BQUgsQ0FBV0QsQ0FBQyxDQUFDRSxLQUFiLEVBQW9CTCxHQUFHLENBQUNNLFFBQXhCLENBRnlELENBQUo7QUFBQSxLQUFMO0FBQUEsR0FBbEI7QUFBQSxDQUF6Qjs7OztBQUtBLElBQU1DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUI7QUFBQSxNQUFFUCxHQUFGLFNBQUVBLEdBQUY7QUFBQSxNQUFPQyxHQUFQLFNBQU9BLEdBQVA7QUFBQSxtQkFBbUJELEdBQUcsQ0FBQ00sUUFBdkIsY0FBbUNMLEdBQUcsQ0FBQ0ssUUFBdkM7QUFBQSxDQUF6Qjs7OztBQUVBLElBQU1FLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQ0MsS0FBRCxFQUFRQyxXQUFSLEVBQXdCO0FBQ3RELFNBQU8sVUFBQUMsTUFBTSxFQUFJO0FBQ2YsV0FBT0YsS0FBSyxHQUNSLCtCQUNFRSxNQUFNLENBQUNDLEdBQVAsQ0FBVyxV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QSxRQUFRLEVBQUU3RSxTQUFTLENBQUNDLFFBWnRCO0FBYUU2RSxRQUFBQSxjQUFjLEVBQUU5RSxTQUFTLENBQUM4RSxjQUFWLEdBQTJCWixhQWI3QztBQWNFYSxRQUFBQSxrQkFBa0IsRUFBRSxLQUFLaEcsTUFBTCxDQUFZaUcsU0FkbEM7QUFlRUMsUUFBQUEsY0FBYyxFQUFFakYsU0FBUyxDQUFDa0YsU0FmNUI7QUFnQkVDLFFBQUFBLHdCQUF3QixFQUFFbkYsU0FBUyxDQUFDb0YsbUJBQVYsQ0FBOEIsQ0FBOUIsQ0FoQjVCO0FBaUJFQyxRQUFBQSx3QkFBd0IsRUFBRXJGLFNBQVMsQ0FBQ29GLG1CQUFWLENBQThCLENBQTlCLENBakI1QjtBQW1CRTtBQUNBaEIsUUFBQUEsY0FBYyxFQUFkQSxjQXBCRjtBQXNCRTtBQUNBa0IsUUFBQUEsZ0JBQWdCLEVBQUVyQixjQUFjLENBQUNzQjtBQXZCbkM7QUF5QkQ7OztFQW5SMkNDLHFCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIxIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IG1lbW9pemUgZnJvbSAnbG9kYXNoLm1lbW9pemUnO1xuaW1wb3J0IExheWVyIGZyb20gJy4vYmFzZS1sYXllcic7XG5pbXBvcnQge2hleFRvUmdifSBmcm9tICd1dGlscy9jb2xvci11dGlscyc7XG5pbXBvcnQge2FnZ3JlZ2F0ZX0gZnJvbSAndXRpbHMvYWdncmVnYXRlLXV0aWxzJztcbmltcG9ydCB7SElHSExJR0hfQ09MT1JfM0R9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuaW1wb3J0IHtDSEFOTkVMX1NDQUxFUywgRklFTERfT1BUUywgREVGQVVMVF9BR0dSRUdBVElPTn0gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG5leHBvcnQgY29uc3QgcG9pbnRQb3NBY2Nlc3NvciA9ICh7bGF0LCBsbmd9KSA9PiBkYyA9PiBkID0+IFtcbiAgZGMudmFsdWVBdChkLmluZGV4LCBsbmcuZmllbGRJZHgpLFxuICBkYy52YWx1ZUF0KGQuaW5kZXgsIGxhdC5maWVsZElkeClcbl07XG5cbmV4cG9ydCBjb25zdCBwb2ludFBvc1Jlc29sdmVyID0gKHtsYXQsIGxuZ30pID0+IGAke2xhdC5maWVsZElkeH0tJHtsbmcuZmllbGRJZHh9YDtcblxuZXhwb3J0IGNvbnN0IGdldFZhbHVlQWdnckZ1bmMgPSAoZmllbGQsIGFnZ3JlZ2F0aW9uKSA9PiB7XG4gIHJldHVybiBwb2ludHMgPT4ge1xuICAgIHJldHVybiBmaWVsZFxuICAgICAgPyBhZ2dyZWdhdGUoXG4gICAgICAgICAgcG9pbnRzLm1hcChwID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmaWVsZC52YWx1ZUFjY2Vzc29yKHApO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIGFnZ3JlZ2F0aW9uXG4gICAgICAgIClcbiAgICAgIDogcG9pbnRzLmxlbmd0aDtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRGaWx0ZXJEYXRhRnVuYyA9IChmaWx0ZXJSYW5nZSwgZ2V0RmlsdGVyVmFsdWUpID0+IHB0ID0+XG4gIGdldEZpbHRlclZhbHVlKHB0KS5ldmVyeSgodmFsLCBpKSA9PiB2YWwgPj0gZmlsdGVyUmFuZ2VbaV1bMF0gJiYgdmFsIDw9IGZpbHRlclJhbmdlW2ldWzFdKTtcblxuY29uc3QgZ2V0TGF5ZXJDb2xvclJhbmdlID0gY29sb3JSYW5nZSA9PiBjb2xvclJhbmdlLmNvbG9ycy5tYXAoaGV4VG9SZ2IpO1xuXG5leHBvcnQgY29uc3QgYWdncmVnYXRlUmVxdWlyZWRDb2x1bW5zID0gWydsYXQnLCAnbG5nJ107XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFnZ3JlZ2F0aW9uTGF5ZXIgZXh0ZW5kcyBMYXllciB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5nZXRQb3NpdGlvbkFjY2Vzc29yID0gZGF0YUNvbnRhaW5lciA9PlxuICAgICAgcG9pbnRQb3NBY2Nlc3Nvcih0aGlzLmNvbmZpZy5jb2x1bW5zKShkYXRhQ29udGFpbmVyKTtcbiAgICB0aGlzLmdldENvbG9yUmFuZ2UgPSBtZW1vaXplKGdldExheWVyQ29sb3JSYW5nZSk7XG4gIH1cblxuICBnZXQgaXNBZ2dyZWdhdGVkKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0IHJlcXVpcmVkTGF5ZXJDb2x1bW5zKCkge1xuICAgIHJldHVybiBhZ2dyZWdhdGVSZXF1aXJlZENvbHVtbnM7XG4gIH1cblxuICBnZXQgY29sdW1uUGFpcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVmYXVsdFBvaW50Q29sdW1uUGFpcnM7XG4gIH1cblxuICBnZXQgbm9uZUxheWVyRGF0YUFmZmVjdGluZ1Byb3BzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAuLi5zdXBlci5ub25lTGF5ZXJEYXRhQWZmZWN0aW5nUHJvcHMsXG4gICAgICAnZW5hYmxlM2QnLFxuICAgICAgJ2NvbG9yUmFuZ2UnLFxuICAgICAgJ2NvbG9yRG9tYWluJyxcbiAgICAgICdzaXplUmFuZ2UnLFxuICAgICAgJ3NpemVTY2FsZScsXG4gICAgICAnc2l6ZURvbWFpbicsXG4gICAgICAncGVyY2VudGlsZScsXG4gICAgICAnY292ZXJhZ2UnLFxuICAgICAgJ2VsZXZhdGlvblBlcmNlbnRpbGUnLFxuICAgICAgJ2VsZXZhdGlvblNjYWxlJyxcbiAgICAgICdlbmFibGVFbGV2YXRpb25ab29tRmFjdG9yJ1xuICAgIF07XG4gIH1cblxuICBnZXQgdmlzdWFsQ2hhbm5lbHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiB7XG4gICAgICAgIGFnZ3JlZ2F0aW9uOiAnY29sb3JBZ2dyZWdhdGlvbicsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6IENIQU5ORUxfU0NBTEVTLmNvbG9yQWdncixcbiAgICAgICAgZGVmYXVsdE1lYXN1cmU6ICdwcm9wZXJ0eS5wb2ludENvdW50JyxcbiAgICAgICAgZG9tYWluOiAnY29sb3JEb21haW4nLFxuICAgICAgICBmaWVsZDogJ2NvbG9yRmllbGQnLFxuICAgICAgICBrZXk6ICdjb2xvcicsXG4gICAgICAgIHByb3BlcnR5OiAnY29sb3InLFxuICAgICAgICByYW5nZTogJ2NvbG9yUmFuZ2UnLFxuICAgICAgICBzY2FsZTogJ2NvbG9yU2NhbGUnXG4gICAgICB9LFxuICAgICAgc2l6ZToge1xuICAgICAgICBhZ2dyZWdhdGlvbjogJ3NpemVBZ2dyZWdhdGlvbicsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6IENIQU5ORUxfU0NBTEVTLnNpemVBZ2dyLFxuICAgICAgICBjb25kaXRpb246IGNvbmZpZyA9PiBjb25maWcudmlzQ29uZmlnLmVuYWJsZTNkLFxuICAgICAgICBkZWZhdWx0TWVhc3VyZTogJ3Byb3BlcnR5LnBvaW50Q291bnQnLFxuICAgICAgICBkb21haW46ICdzaXplRG9tYWluJyxcbiAgICAgICAgZmllbGQ6ICdzaXplRmllbGQnLFxuICAgICAgICBrZXk6ICdzaXplJyxcbiAgICAgICAgcHJvcGVydHk6ICdoZWlnaHQnLFxuICAgICAgICByYW5nZTogJ3NpemVSYW5nZScsXG4gICAgICAgIHNjYWxlOiAnc2l6ZVNjYWxlJ1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkZXNjcmlwdGlvbiBvZiBhIHZpc3VhbENoYW5uZWwgY29uZmlnXG4gICAqIEBwYXJhbSBrZXlcbiAgICogQHJldHVybnMge3tsYWJlbDogc3RyaW5nLCBtZWFzdXJlOiAoc3RyaW5nfHN0cmluZyl9fVxuICAgKi9cbiAgZ2V0VmlzdWFsQ2hhbm5lbERlc2NyaXB0aW9uKGtleSkge1xuICAgIC8vIGUuZy4gbGFiZWw6IENvbG9yLCBtZWFzdXJlOiBBdmVyYWdlIG9mIEVUQVxuICAgIGNvbnN0IHtyYW5nZSwgZmllbGQsIGRlZmF1bHRNZWFzdXJlLCBhZ2dyZWdhdGlvbn0gPSB0aGlzLnZpc3VhbENoYW5uZWxzW2tleV07XG4gICAgY29uc3QgZmllbGRDb25maWcgPSB0aGlzLmNvbmZpZ1tmaWVsZF07XG4gICAgcmV0dXJuIHtcbiAgICAgIGxhYmVsOiB0aGlzLnZpc0NvbmZpZ1NldHRpbmdzW3JhbmdlXS5sYWJlbCxcbiAgICAgIG1lYXN1cmU6IGZpZWxkQ29uZmlnXG4gICAgICAgID8gYCR7dGhpcy5jb25maWcudmlzQ29uZmlnW2FnZ3JlZ2F0aW9uXX0gb2YgJHtmaWVsZENvbmZpZy5kaXNwbGF5TmFtZSB8fCBmaWVsZENvbmZpZy5uYW1lfWBcbiAgICAgICAgOiBkZWZhdWx0TWVhc3VyZVxuICAgIH07XG4gIH1cblxuICBnZXRIb3ZlckRhdGEob2JqZWN0KSB7XG4gICAgLy8gcmV0dXJuIGFnZ3JlZ2F0ZWQgb2JqZWN0XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZ2dyZWdhdGlvbiBsYXllciBoYW5kbGVzIHZpc3VhbCBjaGFubmVsIGFnZ3JlZ2F0aW9uIGluc2lkZSBkZWNrLmdsIGxheWVyXG4gICAqL1xuICB1cGRhdGVMYXllclZpc3VhbENoYW5uZWwoe2RhdGEsIGRhdGFDb250YWluZXJ9LCBjaGFubmVsKSB7XG4gICAgdGhpcy52YWxpZGF0ZVZpc3VhbENoYW5uZWwoY2hhbm5lbCk7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGUgYWdncmVnYXRpb24gdHlwZSBvbiB0b3Agb2YgYmFzaWMgbGF5ZXIgdmlzdWFsIGNoYW5uZWwgdmFsaWRhdGlvblxuICAgKiBAcGFyYW0gY2hhbm5lbFxuICAgKi9cbiAgdmFsaWRhdGVWaXN1YWxDaGFubmVsKGNoYW5uZWwpIHtcbiAgICAvLyBmaWVsZCB0eXBlIGRlY2lkZXMgYWdncmVnYXRpb24gdHlwZSBkZWNpZGVzIHNjYWxlIHR5cGVcbiAgICB0aGlzLnZhbGlkYXRlRmllbGRUeXBlKGNoYW5uZWwpO1xuICAgIHRoaXMudmFsaWRhdGVBZ2dyZWdhdGlvblR5cGUoY2hhbm5lbCk7XG4gICAgdGhpcy52YWxpZGF0ZVNjYWxlKGNoYW5uZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIGFnZ3JlZ2F0aW9uIHR5cGUgYmFzZWQgb24gc2VsZWN0ZWQgZmllbGRcbiAgICovXG4gIHZhbGlkYXRlQWdncmVnYXRpb25UeXBlKGNoYW5uZWwpIHtcbiAgICBjb25zdCB2aXN1YWxDaGFubmVsID0gdGhpcy52aXN1YWxDaGFubmVsc1tjaGFubmVsXTtcbiAgICBjb25zdCB7ZmllbGQsIGFnZ3JlZ2F0aW9ufSA9IHZpc3VhbENoYW5uZWw7XG4gICAgY29uc3QgYWdncmVnYXRpb25PcHRpb25zID0gdGhpcy5nZXRBZ2dyZWdhdGlvbk9wdGlvbnMoY2hhbm5lbCk7XG5cbiAgICBpZiAoIWFnZ3JlZ2F0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFhZ2dyZWdhdGlvbk9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAvLyBpZiBmaWVsZCBjYW5ub3QgYmUgYWdncmVnYXRlZCwgc2V0IGZpZWxkIHRvIG51bGxcbiAgICAgIHRoaXMudXBkYXRlTGF5ZXJDb25maWcoe1tmaWVsZF06IG51bGx9KTtcbiAgICB9IGVsc2UgaWYgKCFhZ2dyZWdhdGlvbk9wdGlvbnMuaW5jbHVkZXModGhpcy5jb25maWcudmlzQ29uZmlnW2FnZ3JlZ2F0aW9uXSkpIHtcbiAgICAgIC8vIGN1cnJlbnQgYWdncmVnYXRpb24gdHlwZSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgZmllbGRcbiAgICAgIC8vIHNldCBhZ2dyZWdhdGlvbiB0byB0aGUgZmlyc3Qgc3VwcG9ydGVkIG9wdGlvblxuICAgICAgdGhpcy51cGRhdGVMYXllclZpc0NvbmZpZyh7W2FnZ3JlZ2F0aW9uXTogYWdncmVnYXRpb25PcHRpb25zWzBdfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0QWdncmVnYXRpb25PcHRpb25zKGNoYW5uZWwpIHtcbiAgICBjb25zdCB2aXN1YWxDaGFubmVsID0gdGhpcy52aXN1YWxDaGFubmVsc1tjaGFubmVsXTtcbiAgICBjb25zdCB7ZmllbGQsIGNoYW5uZWxTY2FsZVR5cGV9ID0gdmlzdWFsQ2hhbm5lbDtcbiAgICBcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoXG4gICAgICB0aGlzLmNvbmZpZ1tmaWVsZF1cbiAgICAgICAgPyBGSUVMRF9PUFRTW3RoaXMuY29uZmlnW2ZpZWxkXS50eXBlXS5zY2FsZVtjaGFubmVsU2NhbGVUeXBlXVxuICAgICAgICA6IERFRkFVTFRfQUdHUkVHQVRJT05bY2hhbm5lbFNjYWxlVHlwZV1cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBzY2FsZSBvcHRpb25zIGJhc2VkIG9uIGN1cnJlbnQgZmllbGQgYW5kIGFnZ3JlZ2F0aW9uIHR5cGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWxcbiAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgKi9cbiAgZ2V0U2NhbGVPcHRpb25zKGNoYW5uZWwpIHtcbiAgICBjb25zdCB2aXN1YWxDaGFubmVsID0gdGhpcy52aXN1YWxDaGFubmVsc1tjaGFubmVsXTtcbiAgICBjb25zdCB7ZmllbGQsIGFnZ3JlZ2F0aW9uLCBjaGFubmVsU2NhbGVUeXBlfSA9IHZpc3VhbENoYW5uZWw7XG4gICAgY29uc3QgYWdncmVnYXRpb25UeXBlID0gdGhpcy5jb25maWcudmlzQ29uZmlnW2FnZ3JlZ2F0aW9uXTtcbiAgICByZXR1cm4gdGhpcy5jb25maWdbZmllbGRdXG4gICAgICA/IC8vIHNjYWxlIG9wdGlvbnMgYmFzZWQgb24gYWdncmVnYXRpb25cbiAgICAgICAgRklFTERfT1BUU1t0aGlzLmNvbmZpZ1tmaWVsZF0udHlwZV0uc2NhbGVbY2hhbm5lbFNjYWxlVHlwZV1bYWdncmVnYXRpb25UeXBlXVxuICAgICAgOiAvLyBkZWZhdWx0IHNjYWxlIG9wdGlvbnMgZm9yIHBvaW50IGNvdW50XG4gICAgICAgIERFRkFVTFRfQUdHUkVHQVRJT05bY2hhbm5lbFNjYWxlVHlwZV1bYWdncmVnYXRpb25UeXBlXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZ2dyZWdhdGlvbiBsYXllciBoYW5kbGVzIHZpc3VhbCBjaGFubmVsIGFnZ3JlZ2F0aW9uIGluc2lkZSBkZWNrLmdsIGxheWVyXG4gICAqL1xuICB1cGRhdGVMYXllckRvbWFpbihkYXRhc2V0cywgbmV3RmlsdGVyKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB1cGRhdGVMYXllck1ldGEoZGF0YUNvbnRhaW5lciwgZ2V0UG9zaXRpb24pIHtcbiAgICAvLyBnZXQgYm91bmRzIGZyb20gcG9pbnRzXG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRQb2ludHNCb3VuZHMoZGF0YUNvbnRhaW5lciwgZ2V0UG9zaXRpb24pO1xuXG4gICAgdGhpcy51cGRhdGVNZXRhKHtib3VuZHN9KTtcbiAgfVxuXG4gIGNhbGN1bGF0ZURhdGFBdHRyaWJ1dGUoe2RhdGFDb250YWluZXIsIGZpbHRlcmVkSW5kZXh9LCBnZXRQb3NpdGlvbikge1xuICAgIGNvbnN0IGRhdGEgPSBbXTtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbHRlcmVkSW5kZXgubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gZmlsdGVyZWRJbmRleFtpXTtcbiAgICAgIGNvbnN0IHBvcyA9IGdldFBvc2l0aW9uKHtpbmRleH0pO1xuXG4gICAgICAvLyBpZiBkb2Vzbid0IGhhdmUgcG9pbnQgbGF0IG9yIGxuZywgZG8gbm90IGFkZCB0aGUgcG9pbnRcbiAgICAgIC8vIGRlY2suZ2wgY2FuJ3QgaGFuZGxlIHBvc2l0aW9uID0gbnVsbFxuICAgICAgaWYgKHBvcy5ldmVyeShOdW1iZXIuaXNGaW5pdGUpKSB7XG4gICAgICAgIGRhdGEucHVzaCh7XG4gICAgICAgICAgaW5kZXhcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBmb3JtYXRMYXllckRhdGEoZGF0YXNldHMsIG9sZExheWVyRGF0YSkge1xuICAgIGNvbnN0IHtncHVGaWx0ZXIsIGRhdGFDb250YWluZXJ9ID0gZGF0YXNldHNbdGhpcy5jb25maWcuZGF0YUlkXTtcbiAgICBjb25zdCBnZXRQb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb25BY2Nlc3NvcihkYXRhQ29udGFpbmVyKTtcblxuICAgIGNvbnN0IGdldENvbG9yVmFsdWUgPSBnZXRWYWx1ZUFnZ3JGdW5jKFxuICAgICAgdGhpcy5jb25maWcuY29sb3JGaWVsZCxcbiAgICAgIHRoaXMuY29uZmlnLnZpc0NvbmZpZy5jb2xvckFnZ3JlZ2F0aW9uXG4gICAgKTtcblxuICAgIGNvbnN0IGdldEVsZXZhdGlvblZhbHVlID0gZ2V0VmFsdWVBZ2dyRnVuYyhcbiAgICAgIHRoaXMuY29uZmlnLnNpemVGaWVsZCxcbiAgICAgIHRoaXMuY29uZmlnLnZpc0NvbmZpZy5zaXplQWdncmVnYXRpb25cbiAgICApO1xuICAgIGNvbnN0IGhhc0ZpbHRlciA9IE9iamVjdC52YWx1ZXMoZ3B1RmlsdGVyLmZpbHRlclJhbmdlKS5zb21lKGFyciA9PiBhcnIuc29tZSh2ID0+IHYgIT09IDApKTtcblxuICAgIGNvbnN0IGdldEZpbHRlclZhbHVlID0gZ3B1RmlsdGVyLmZpbHRlclZhbHVlQWNjZXNzb3IoZGF0YUNvbnRhaW5lcikoKTtcbiAgICBjb25zdCBmaWx0ZXJEYXRhID0gaGFzRmlsdGVyXG4gICAgICA/IGdldEZpbHRlckRhdGFGdW5jKGdwdUZpbHRlci5maWx0ZXJSYW5nZSwgZ2V0RmlsdGVyVmFsdWUpXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgXG4gICAgY29uc3Qge2RhdGF9ID0gdGhpcy51cGRhdGVEYXRhKGRhdGFzZXRzLCBvbGRMYXllckRhdGEpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGEsXG4gICAgICBnZXRQb3NpdGlvbixcbiAgICAgIF9maWx0ZXJEYXRhOiBmaWx0ZXJEYXRhLFxuICAgICAgLi4uKGdldENvbG9yVmFsdWUgPyB7Z2V0Q29sb3JWYWx1ZX0gOiB7fSksXG4gICAgICAuLi4oZ2V0RWxldmF0aW9uVmFsdWUgPyB7Z2V0RWxldmF0aW9uVmFsdWV9IDoge30pXG4gICAgfTtcbiAgfVxuXG4gIGdldERlZmF1bHREZWNrTGF5ZXJQcm9wcyhvcHRzKSB7XG4gICAgY29uc3QgYmFzZVByb3AgPSBzdXBlci5nZXREZWZhdWx0RGVja0xheWVyUHJvcHMob3B0cyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmJhc2VQcm9wLFxuICAgICAgaGlnaGxpZ2h0Q29sb3I6IEhJR0hMSUdIX0NPTE9SXzNELFxuICAgICAgLy8gZ3B1IGRhdGEgZmlsdGVyaW5nIGlzIG5vdCBzdXBwb3J0ZWQgaW4gYWdncmVnYXRpb24gbGF5ZXJcbiAgICAgIGV4dGVuc2lvbnM6IFtdLFxuICAgICAgYXV0b0hpZ2hsaWdodDogdGhpcy5jb25maWcudmlzQ29uZmlnLmVuYWJsZTNkXG4gICAgfTtcbiAgfVxuXG4gIGdldERlZmF1bHRBZ2dyZWdhdGlvbkxheWVyUHJvcChvcHRzKSB7XG4gICAgY29uc3Qge2dwdUZpbHRlciwgbWFwU3RhdGUsIGxheWVyQ2FsbGJhY2tzID0ge319ID0gb3B0cztcbiAgICBjb25zdCB7dmlzQ29uZmlnfSA9IHRoaXMuY29uZmlnO1xuICAgIGNvbnN0IGVsZVpvb21GYWN0b3IgPSB0aGlzLmdldEVsZXZhdGlvblpvb21GYWN0b3IobWFwU3RhdGUpO1xuXG4gICAgY29uc3QgdXBkYXRlVHJpZ2dlcnMgPSB7XG4gICAgICBnZXRDb2xvclZhbHVlOiB7XG4gICAgICAgIGNvbG9yRmllbGQ6IHRoaXMuY29uZmlnLmNvbG9yRmllbGQsXG4gICAgICAgIGNvbG9yQWdncmVnYXRpb246IHRoaXMuY29uZmlnLnZpc0NvbmZpZy5jb2xvckFnZ3JlZ2F0aW9uXG4gICAgICB9LFxuICAgICAgZ2V0RWxldmF0aW9uVmFsdWU6IHtcbiAgICAgICAgc2l6ZUZpZWxkOiB0aGlzLmNvbmZpZy5zaXplRmllbGQsXG4gICAgICAgIHNpemVBZ2dyZWdhdGlvbjogdGhpcy5jb25maWcudmlzQ29uZmlnLnNpemVBZ2dyZWdhdGlvblxuICAgICAgfSxcbiAgICAgIF9maWx0ZXJEYXRhOiB7XG4gICAgICAgIGZpbHRlclJhbmdlOiBncHVGaWx0ZXIuZmlsdGVyUmFuZ2UsXG4gICAgICAgIC4uLmdwdUZpbHRlci5maWx0ZXJWYWx1ZVVwZGF0ZVRyaWdnZXJzXG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLmdldERlZmF1bHREZWNrTGF5ZXJQcm9wcyhvcHRzKSxcbiAgICAgIGNvdmVyYWdlOiB2aXNDb25maWcuY292ZXJhZ2UsXG5cbiAgICAgIC8vIGNvbG9yXG4gICAgICBjb2xvclJhbmdlOiB0aGlzLmdldENvbG9yUmFuZ2UodmlzQ29uZmlnLmNvbG9yUmFuZ2UpLFxuICAgICAgY29sb3JTY2FsZVR5cGU6IHRoaXMuY29uZmlnLmNvbG9yU2NhbGUsXG4gICAgICB1cHBlclBlcmNlbnRpbGU6IHZpc0NvbmZpZy5wZXJjZW50aWxlWzFdLFxuICAgICAgbG93ZXJQZXJjZW50aWxlOiB2aXNDb25maWcucGVyY2VudGlsZVswXSxcbiAgICAgIGNvbG9yQWdncmVnYXRpb246IHZpc0NvbmZpZy5jb2xvckFnZ3JlZ2F0aW9uLFxuXG4gICAgICAvLyBlbGV2YXRpb25cbiAgICAgIGV4dHJ1ZGVkOiB2aXNDb25maWcuZW5hYmxlM2QsXG4gICAgICBlbGV2YXRpb25TY2FsZTogdmlzQ29uZmlnLmVsZXZhdGlvblNjYWxlICogZWxlWm9vbUZhY3RvcixcbiAgICAgIGVsZXZhdGlvblNjYWxlVHlwZTogdGhpcy5jb25maWcuc2l6ZVNjYWxlLFxuICAgICAgZWxldmF0aW9uUmFuZ2U6IHZpc0NvbmZpZy5zaXplUmFuZ2UsXG4gICAgICBlbGV2YXRpb25Mb3dlclBlcmNlbnRpbGU6IHZpc0NvbmZpZy5lbGV2YXRpb25QZXJjZW50aWxlWzBdLFxuICAgICAgZWxldmF0aW9uVXBwZXJQZXJjZW50aWxlOiB2aXNDb25maWcuZWxldmF0aW9uUGVyY2VudGlsZVsxXSxcblxuICAgICAgLy8gdXBkYXRlVHJpZ2dlcnNcbiAgICAgIHVwZGF0ZVRyaWdnZXJzLFxuXG4gICAgICAvLyBjYWxsYmFja3NcbiAgICAgIG9uU2V0Q29sb3JEb21haW46IGxheWVyQ2FsbGJhY2tzLm9uU2V0TGF5ZXJEb21haW5cbiAgICB9O1xuICB9XG59XG4iXX0=