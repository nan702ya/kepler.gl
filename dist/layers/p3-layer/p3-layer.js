"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.hexagonVisConfigs = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _layers = require("@deck.gl/layers");

var _aggregationLayer = _interopRequireDefault(require("../aggregation-layer"));

var _enhancedHexagonLayer = _interopRequireDefault(require("../../deckgl-layers/hexagon-layer/enhanced-hexagon-layer"));

var _p3Utils = require("./p3-utils");

var _p3LayerIcon = _interopRequireDefault(require("./p3-layer-icon"));

var _dataUtils = require("../../utils/data-utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var hexagonVisConfigs = {
  opacity: 'opacity',
  worldUnitSize: 'worldUnitSize',
  resolution: 'resolution',
  colorRange: 'colorRange',
  coverage: 'coverage',
  sizeRange: 'elevationRange',
  percentile: 'percentile',
  elevationPercentile: 'elevationPercentile',
  elevationScale: 'elevationScale',
  enableElevationZoomFactor: 'enableElevationZoomFactor',
  colorAggregation: 'aggregation',
  sizeAggregation: 'sizeAggregation',
  enable3d: 'enable3d'
};
exports.hexagonVisConfigs = hexagonVisConfigs;

var P3Layer = /*#__PURE__*/function (_AggregationLayer) {
  (0, _inherits2["default"])(P3Layer, _AggregationLayer);

  var _super = _createSuper(P3Layer);

  function P3Layer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, P3Layer);
    _this = _super.call(this, props);

    _this.registerVisConfig(hexagonVisConfigs);

    _this.visConfigSettings.worldUnitSize.label = 'columns.hexagon.worldUnitSize';
    return _this;
  }

  (0, _createClass2["default"])(P3Layer, [{
    key: "type",
    get: function get() {
      return 'p3';
    }
  }, {
    key: "name",
    get: function get() {
      return 'P3';
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return P3LayerIcon;
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(opts) {
      var data = opts.data,
          objectHovered = opts.objectHovered,
          mapState = opts.mapState;
      var zoomFactor = this.getZoomFactor(mapState);
      var visConfig = this.config.visConfig;
      var radius = visConfig.worldUnitSize * 1000;
      var hoveredObject = this.hasHoveredObject(objectHovered);
      return [new _enhancedHexagonLayer["default"](_objectSpread(_objectSpread(_objectSpread({}, this.getDefaultAggregationLayerProp(opts)), data), {}, {
        wrapLongitude: false,
        radius: radius
      }))].concat((0, _toConsumableArray2["default"])(hoveredObject && !visConfig.enable3d ? [new _layers.GeoJsonLayer(_objectSpread(_objectSpread({}, this.getDefaultHoverLayerProps()), {}, {
        wrapLongitude: false,
        data: [(0, _p3Utils.hexagonToPolygonGeo)(hoveredObject, {}, radius * visConfig.coverage, mapState)].filter(function (d) {
          return d;
        }),
        getLineColor: this.config.highlightColor,
        lineWidthScale: (0, _dataUtils.clamp)([1, 100], radius * 0.1 * zoomFactor)
      }))] : []));
    }
  }]);
  return P3Layer;
}(_aggregationLayer["default"]);

exports["default"] = P3Layer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvcDMtbGF5ZXIvcDMtbGF5ZXIuanMiXSwibmFtZXMiOlsiaGV4YWdvblZpc0NvbmZpZ3MiLCJvcGFjaXR5Iiwid29ybGRVbml0U2l6ZSIsInJlc29sdXRpb24iLCJjb2xvclJhbmdlIiwiY292ZXJhZ2UiLCJzaXplUmFuZ2UiLCJwZXJjZW50aWxlIiwiZWxldmF0aW9uUGVyY2VudGlsZSIsImVsZXZhdGlvblNjYWxlIiwiZW5hYmxlRWxldmF0aW9uWm9vbUZhY3RvciIsImNvbG9yQWdncmVnYXRpb24iLCJzaXplQWdncmVnYXRpb24iLCJlbmFibGUzZCIsIlAzTGF5ZXIiLCJwcm9wcyIsInJlZ2lzdGVyVmlzQ29uZmlnIiwidmlzQ29uZmlnU2V0dGluZ3MiLCJsYWJlbCIsIlAzTGF5ZXJJY29uIiwib3B0cyIsImRhdGEiLCJvYmplY3RIb3ZlcmVkIiwibWFwU3RhdGUiLCJ6b29tRmFjdG9yIiwiZ2V0Wm9vbUZhY3RvciIsInZpc0NvbmZpZyIsImNvbmZpZyIsInJhZGl1cyIsImhvdmVyZWRPYmplY3QiLCJoYXNIb3ZlcmVkT2JqZWN0IiwiRW5oYW5jZWRIZXhhZ29uTGF5ZXIiLCJnZXREZWZhdWx0QWdncmVnYXRpb25MYXllclByb3AiLCJ3cmFwTG9uZ2l0dWRlIiwiR2VvSnNvbkxheWVyIiwiZ2V0RGVmYXVsdEhvdmVyTGF5ZXJQcm9wcyIsImZpbHRlciIsImQiLCJnZXRMaW5lQ29sb3IiLCJoaWdobGlnaHRDb2xvciIsImxpbmVXaWR0aFNjYWxlIiwiQWdncmVnYXRpb25MYXllciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFFTyxJQUFNQSxpQkFBaUIsR0FBRztBQUMvQkMsRUFBQUEsT0FBTyxFQUFFLFNBRHNCO0FBRS9CQyxFQUFBQSxhQUFhLEVBQUUsZUFGZ0I7QUFHL0JDLEVBQUFBLFVBQVUsRUFBRSxZQUhtQjtBQUkvQkMsRUFBQUEsVUFBVSxFQUFFLFlBSm1CO0FBSy9CQyxFQUFBQSxRQUFRLEVBQUUsVUFMcUI7QUFNL0JDLEVBQUFBLFNBQVMsRUFBRSxnQkFOb0I7QUFPL0JDLEVBQUFBLFVBQVUsRUFBRSxZQVBtQjtBQVEvQkMsRUFBQUEsbUJBQW1CLEVBQUUscUJBUlU7QUFTL0JDLEVBQUFBLGNBQWMsRUFBRSxnQkFUZTtBQVUvQkMsRUFBQUEseUJBQXlCLEVBQUUsMkJBVkk7QUFXL0JDLEVBQUFBLGdCQUFnQixFQUFFLGFBWGE7QUFZL0JDLEVBQUFBLGVBQWUsRUFBRSxpQkFaYztBQWEvQkMsRUFBQUEsUUFBUSxFQUFFO0FBYnFCLENBQTFCOzs7SUFnQmNDLE87Ozs7O0FBQ25CLG1CQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7QUFDakIsOEJBQU1BLEtBQU47O0FBRUEsVUFBS0MsaUJBQUwsQ0FBdUJoQixpQkFBdkI7O0FBQ0EsVUFBS2lCLGlCQUFMLENBQXVCZixhQUF2QixDQUFxQ2dCLEtBQXJDLEdBQTZDLCtCQUE3QztBQUppQjtBQUtsQjs7OztTQUVELGVBQVc7QUFDVCxhQUFPLElBQVA7QUFDRDs7O1NBRUQsZUFBVztBQUNULGFBQU8sSUFBUDtBQUNEOzs7U0FFRCxlQUFnQjtBQUNkLGFBQU9DLFdBQVA7QUFDRDs7O1dBRUQscUJBQVlDLElBQVosRUFBa0I7QUFBQSxVQUNUQyxJQURTLEdBQ3dCRCxJQUR4QixDQUNUQyxJQURTO0FBQUEsVUFDSEMsYUFERyxHQUN3QkYsSUFEeEIsQ0FDSEUsYUFERztBQUFBLFVBQ1lDLFFBRFosR0FDd0JILElBRHhCLENBQ1lHLFFBRFo7QUFFaEIsVUFBTUMsVUFBVSxHQUFHLEtBQUtDLGFBQUwsQ0FBbUJGLFFBQW5CLENBQW5CO0FBRmdCLFVBR1RHLFNBSFMsR0FHSSxLQUFLQyxNQUhULENBR1RELFNBSFM7QUFJaEIsVUFBTUUsTUFBTSxHQUFHRixTQUFTLENBQUN4QixhQUFWLEdBQTBCLElBQXpDO0FBQ0EsVUFBTTJCLGFBQWEsR0FBRyxLQUFLQyxnQkFBTCxDQUFzQlIsYUFBdEIsQ0FBdEI7QUFFQSxjQUNFLElBQUlTLGdDQUFKLCtDQUNLLEtBQUtDLDhCQUFMLENBQW9DWixJQUFwQyxDQURMLEdBRUtDLElBRkw7QUFHRVksUUFBQUEsYUFBYSxFQUFFLEtBSGpCO0FBSUVMLFFBQUFBLE1BQU0sRUFBTkE7QUFKRixTQURGLDZDQVNNQyxhQUFhLElBQUksQ0FBQ0gsU0FBUyxDQUFDYixRQUE1QixHQUNBLENBQ0UsSUFBSXFCLG9CQUFKLGlDQUNLLEtBQUtDLHlCQUFMLEVBREw7QUFFRUYsUUFBQUEsYUFBYSxFQUFFLEtBRmpCO0FBR0VaLFFBQUFBLElBQUksRUFBRSxDQUNKLGtDQUFvQlEsYUFBcEIsRUFBbUMsRUFBbkMsRUFBdUNELE1BQU0sR0FBR0YsU0FBUyxDQUFDckIsUUFBMUQsRUFBb0VrQixRQUFwRSxDQURJLEVBRUphLE1BRkksQ0FFRyxVQUFBQyxDQUFDO0FBQUEsaUJBQUlBLENBQUo7QUFBQSxTQUZKLENBSFI7QUFNRUMsUUFBQUEsWUFBWSxFQUFFLEtBQUtYLE1BQUwsQ0FBWVksY0FONUI7QUFPRUMsUUFBQUEsY0FBYyxFQUFFLHNCQUFNLENBQUMsQ0FBRCxFQUFJLEdBQUosQ0FBTixFQUFnQlosTUFBTSxHQUFHLEdBQVQsR0FBZUosVUFBL0I7QUFQbEIsU0FERixDQURBLEdBWUEsRUFyQk47QUF1QkQ7OztFQWxEa0NpQiw0QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7R2VvSnNvbkxheWVyfSBmcm9tICdAZGVjay5nbC9sYXllcnMnO1xuaW1wb3J0IEFnZ3JlZ2F0aW9uTGF5ZXIgZnJvbSAnLi4vYWdncmVnYXRpb24tbGF5ZXInO1xuaW1wb3J0IEVuaGFuY2VkSGV4YWdvbkxheWVyIGZyb20gJ2RlY2tnbC1sYXllcnMvaGV4YWdvbi1sYXllci9lbmhhbmNlZC1oZXhhZ29uLWxheWVyJztcbmltcG9ydCB7aGV4YWdvblRvUG9seWdvbkdlb30gZnJvbSAnLi9wMy11dGlscyc7XG5pbXBvcnQgSGV4YWdvbkxheWVySWNvbiBmcm9tICcuL3AzLWxheWVyLWljb24nO1xuaW1wb3J0IHtjbGFtcH0gZnJvbSAndXRpbHMvZGF0YS11dGlscyc7XG5cbmV4cG9ydCBjb25zdCBoZXhhZ29uVmlzQ29uZmlncyA9IHtcbiAgb3BhY2l0eTogJ29wYWNpdHknLFxuICB3b3JsZFVuaXRTaXplOiAnd29ybGRVbml0U2l6ZScsXG4gIHJlc29sdXRpb246ICdyZXNvbHV0aW9uJyxcbiAgY29sb3JSYW5nZTogJ2NvbG9yUmFuZ2UnLFxuICBjb3ZlcmFnZTogJ2NvdmVyYWdlJyxcbiAgc2l6ZVJhbmdlOiAnZWxldmF0aW9uUmFuZ2UnLFxuICBwZXJjZW50aWxlOiAncGVyY2VudGlsZScsXG4gIGVsZXZhdGlvblBlcmNlbnRpbGU6ICdlbGV2YXRpb25QZXJjZW50aWxlJyxcbiAgZWxldmF0aW9uU2NhbGU6ICdlbGV2YXRpb25TY2FsZScsXG4gIGVuYWJsZUVsZXZhdGlvblpvb21GYWN0b3I6ICdlbmFibGVFbGV2YXRpb25ab29tRmFjdG9yJyxcbiAgY29sb3JBZ2dyZWdhdGlvbjogJ2FnZ3JlZ2F0aW9uJyxcbiAgc2l6ZUFnZ3JlZ2F0aW9uOiAnc2l6ZUFnZ3JlZ2F0aW9uJyxcbiAgZW5hYmxlM2Q6ICdlbmFibGUzZCdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFAzTGF5ZXIgZXh0ZW5kcyBBZ2dyZWdhdGlvbkxheWVyIHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnJlZ2lzdGVyVmlzQ29uZmlnKGhleGFnb25WaXNDb25maWdzKTtcbiAgICB0aGlzLnZpc0NvbmZpZ1NldHRpbmdzLndvcmxkVW5pdFNpemUubGFiZWwgPSAnY29sdW1ucy5oZXhhZ29uLndvcmxkVW5pdFNpemUnO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdwMyc7XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gJ1AzJztcbiAgfVxuXG4gIGdldCBsYXllckljb24oKSB7XG4gICAgcmV0dXJuIFAzTGF5ZXJJY29uO1xuICB9XG5cbiAgcmVuZGVyTGF5ZXIob3B0cykge1xuICAgIGNvbnN0IHtkYXRhLCBvYmplY3RIb3ZlcmVkLCBtYXBTdGF0ZX0gPSBvcHRzO1xuICAgIGNvbnN0IHpvb21GYWN0b3IgPSB0aGlzLmdldFpvb21GYWN0b3IobWFwU3RhdGUpO1xuICAgIGNvbnN0IHt2aXNDb25maWd9ID0gdGhpcy5jb25maWc7XG4gICAgY29uc3QgcmFkaXVzID0gdmlzQ29uZmlnLndvcmxkVW5pdFNpemUgKiAxMDAwO1xuICAgIGNvbnN0IGhvdmVyZWRPYmplY3QgPSB0aGlzLmhhc0hvdmVyZWRPYmplY3Qob2JqZWN0SG92ZXJlZCk7XG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IEVuaGFuY2VkSGV4YWdvbkxheWVyKHtcbiAgICAgICAgLi4udGhpcy5nZXREZWZhdWx0QWdncmVnYXRpb25MYXllclByb3Aob3B0cyksXG4gICAgICAgIC4uLmRhdGEsXG4gICAgICAgIHdyYXBMb25naXR1ZGU6IGZhbHNlLFxuICAgICAgICByYWRpdXNcbiAgICAgIH0pLFxuXG4gICAgICAvLyByZW5kZXIgYW4gb3V0bGluZSBvZiBlYWNoIGhleGFnb24gaWYgbm90IGV4dHJ1ZGVkXG4gICAgICAuLi4oaG92ZXJlZE9iamVjdCAmJiAhdmlzQ29uZmlnLmVuYWJsZTNkXG4gICAgICAgID8gW1xuICAgICAgICAgICAgbmV3IEdlb0pzb25MYXllcih7XG4gICAgICAgICAgICAgIC4uLnRoaXMuZ2V0RGVmYXVsdEhvdmVyTGF5ZXJQcm9wcygpLFxuICAgICAgICAgICAgICB3cmFwTG9uZ2l0dWRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgIGhleGFnb25Ub1BvbHlnb25HZW8oaG92ZXJlZE9iamVjdCwge30sIHJhZGl1cyAqIHZpc0NvbmZpZy5jb3ZlcmFnZSwgbWFwU3RhdGUpXG4gICAgICAgICAgICAgIF0uZmlsdGVyKGQgPT4gZCksXG4gICAgICAgICAgICAgIGdldExpbmVDb2xvcjogdGhpcy5jb25maWcuaGlnaGxpZ2h0Q29sb3IsXG4gICAgICAgICAgICAgIGxpbmVXaWR0aFNjYWxlOiBjbGFtcChbMSwgMTAwXSwgcmFkaXVzICogMC4xICogem9vbUZhY3RvcilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXVxuICAgICAgICA6IFtdKVxuICAgIF07XG4gIH1cbn1cbiJdfQ==