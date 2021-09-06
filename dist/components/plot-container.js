"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = PlotContainerFactory;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reselect = require("reselect");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactMapGl = require("react-map-gl");

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _notificationsUtils = require("../utils/notifications-utils");

var _mapContainer = _interopRequireDefault(require("./map-container"));

var _mapsLayout = _interopRequireDefault(require("./maps-layout"));

var _exportUtils = require("../utils/export-utils");

var _mapboxGlStyleEditor = require("../utils/map-style-utils/mapbox-gl-style-editor");

var _dataUtils = require("../utils/data-utils");

var _projectionUtils = require("../utils/projection-utils");

var _defaultSettings = require("../constants/default-settings");

var _templateObject, _templateObject2;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var CLASS_FILTER = ['mapboxgl-control-container', 'attrition-link', 'attrition-logo'];

var DOM_FILTER_FUNC = function DOM_FILTER_FUNC(node) {
  return !CLASS_FILTER.includes(node.className);
};

var OUT_OF_SCREEN_POSITION = -9999;
var propTypes = {
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired,
  exportImageSetting: _propTypes["default"].object.isRequired,
  addNotification: _propTypes["default"].func.isRequired,
  mapFields: _propTypes["default"].object.isRequired,
  setExportImageSetting: _propTypes["default"].object.isRequired,
  setExportImageDataUri: _propTypes["default"].func.isRequired,
  setExportImageError: _propTypes["default"].func.isRequired,
  splitMaps: _propTypes["default"].arrayOf(_propTypes["default"].object)
};
PlotContainerFactory.deps = [_mapContainer["default"], _mapsLayout["default"]]; // Remove mapbox logo in exported map, because it contains non-ascii characters

var StyledPlotContainer = _styledComponents["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  .mapboxgl-ctrl-bottom-left,\n  .mapboxgl-ctrl-bottom-right,\n  .mapbox-attribution-container {\n    display: none;\n  }\n\n  position: absolute;\n  top: ", "px;\n  left: ", "px;\n"])), OUT_OF_SCREEN_POSITION, OUT_OF_SCREEN_POSITION);

var StyledMapContainer = _styledComponents["default"].div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n  width: ", "px;\n  height: ", "px;\n  display: flex;\n"])), function (props) {
  return props.width;
}, function (props) {
  return props.height;
});

var deckGlProps = {
  glOptions: {
    preserveDrawingBuffer: true,
    useDevicePixels: false
  }
};

function PlotContainerFactory(MapContainer, MapsLayout) {
  var PlotContainer = /*#__PURE__*/function (_Component) {
    (0, _inherits2["default"])(PlotContainer, _Component);

    var _super = _createSuper(PlotContainer);

    function PlotContainer(_props) {
      var _this;

      (0, _classCallCheck2["default"])(this, PlotContainer);
      _this = _super.call(this, _props);
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "plottingAreaRef", /*#__PURE__*/(0, _react.createRef)());
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "mapStyleSelector", function (props) {
        return props.mapFields.mapStyle;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "mapScaleSelector", function (props) {
        var imageSize = props.exportImageSetting.imageSize;
        var mapState = props.mapFields.mapState;

        if (imageSize.scale) {
          return imageSize.scale;
        }

        var scale = (0, _exportUtils.getScaleFromImageSize)(imageSize.imageW, imageSize.imageH, mapState.width * (mapState.isSplit ? 2 : 1), mapState.height);
        return scale > 0 ? scale : 1;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "scaledMapStyleSelector", (0, _reselect.createSelector)(_this.mapStyleSelector, _this.mapScaleSelector, function (mapStyle, scale) {
        return _objectSpread(_objectSpread({}, mapStyle), {}, {
          bottomMapStyle: (0, _mapboxGlStyleEditor.scaleMapStyleByResolution)(mapStyle.bottomMapStyle, scale),
          topMapStyle: (0, _mapboxGlStyleEditor.scaleMapStyleByResolution)(mapStyle.topMapStyle, scale)
        });
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMapRender", function (map) {
        if (map.isStyleLoaded()) {
          _this._retrieveNewScreenshot();
        }
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_retrieveNewScreenshot", function () {
        if (_this.plottingAreaRef.current) {
          (0, _exportUtils.convertToPng)(_this.plottingAreaRef.current, {
            filter: DOM_FILTER_FUNC
          }).then(_this.props.setExportImageDataUri)["catch"](function (err) {
            _this.props.setExportImageError(err);

            if (_this.props.enableErrorNotification) {
              _this.props.addNotification((0, _notificationsUtils.exportImageError)({
                err: err
              }));
            }
          });
        }
      });
      _this._onMapRender = (0, _lodash["default"])(_this._onMapRender, 500);
      _this._retrieveNewScreenshot = (0, _lodash["default"])(_this._retrieveNewScreenshot, 500);
      return _this;
    }

    (0, _createClass2["default"])(PlotContainer, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.props.setExportImageSetting({
          processing: true
        });
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var _this2 = this;

        // re-fetch the new screenshot only when ratio legend or resolution changes
        var checks = ['ratio', 'resolution', 'legend'];
        var shouldRetrieveScreenshot = checks.some(function (item) {
          return _this2.props.exportImageSetting[item] !== prevProps.exportImageSetting[item];
        });

        if (shouldRetrieveScreenshot) {
          this.props.setExportImageSetting({
            processing: true
          });

          this._retrieveNewScreenshot();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            exportImageSetting = _this$props.exportImageSetting,
            mapFields = _this$props.mapFields,
            splitMaps = _this$props.splitMaps;
        var _exportImageSetting$i = exportImageSetting.imageSize,
            imageSize = _exportImageSetting$i === void 0 ? {} : _exportImageSetting$i,
            legend = exportImageSetting.legend;
        var mapState = mapFields.mapState;
        var isSplit = splitMaps && splitMaps.length > 1;
        var size = {
          width: imageSize.imageW || 1,
          height: imageSize.imageH || 1
        };
        var width = size.width / (isSplit ? 2 : 1);
        var height = size.height;
        var scale = this.mapScaleSelector(this.props);

        var newMapState = _objectSpread(_objectSpread({}, mapState), {}, {
          width: width,
          height: height,
          zoom: mapState.zoom + (Math.log2(scale) || 0)
        }); // center and all layer bounds


        if (exportImageSetting.center) {
          var renderedLayers = mapFields.layers.filter(function (layer, idx) {
            return layer.id !== _defaultSettings.GEOCODER_LAYER_ID && layer.shouldRenderLayer(mapFields.layerData[idx]);
          });
          var bounds = (0, _dataUtils.findMapBounds)(renderedLayers);
          var centerAndZoom = (0, _projectionUtils.getCenterAndZoomFromBounds)(bounds, {
            width: width,
            height: height
          });

          if (centerAndZoom) {
            var zoom = Number.isFinite(centerAndZoom.zoom) ? centerAndZoom.zoom : mapState.zoom;
            newMapState.longitude = centerAndZoom.center[0];
            newMapState.latitude = centerAndZoom.center[1];
            newMapState.zoom = zoom + Number(Math.log2(scale) || 0);
          }
        }

        var mapProps = _objectSpread(_objectSpread({}, mapFields), {}, {
          mapStyle: this.scaledMapStyleSelector(this.props),
          // override viewport based on export settings
          mapState: newMapState,
          mapControls: {
            // override map legend visibility
            mapLegend: {
              show: legend,
              active: true
            }
          },
          MapComponent: _reactMapGl.StaticMap,
          onMapRender: this._onMapRender,
          isExport: true,
          deckGlProps: deckGlProps
        });

        var mapContainers = !isSplit ? /*#__PURE__*/_react["default"].createElement(MapContainer, (0, _extends2["default"])({
          index: 0,
          primary: true
        }, mapProps)) : /*#__PURE__*/_react["default"].createElement(MapsLayout, null, splitMaps.map(function (settings, index) {
          return /*#__PURE__*/_react["default"].createElement(MapContainer, (0, _extends2["default"])({
            key: index,
            index: index,
            primary: index === 1
          }, mapProps, {
            mapLayers: splitMaps[index].layers
          }));
        }));
        return /*#__PURE__*/_react["default"].createElement(StyledPlotContainer, {
          className: "export-map-instance"
        }, /*#__PURE__*/_react["default"].createElement(StyledMapContainer, {
          ref: this.plottingAreaRef,
          width: size.width,
          height: size.height
        }, mapContainers));
      }
    }]);
    return PlotContainer;
  }(_react.Component);

  PlotContainer.propsTypes = propTypes;
  return PlotContainer;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Bsb3QtY29udGFpbmVyLmpzIl0sIm5hbWVzIjpbIkNMQVNTX0ZJTFRFUiIsIkRPTV9GSUxURVJfRlVOQyIsIm5vZGUiLCJpbmNsdWRlcyIsImNsYXNzTmFtZSIsIk9VVF9PRl9TQ1JFRU5fUE9TSVRJT04iLCJwcm9wVHlwZXMiLCJ3aWR0aCIsIlByb3BUeXBlcyIsIm51bWJlciIsImlzUmVxdWlyZWQiLCJoZWlnaHQiLCJleHBvcnRJbWFnZVNldHRpbmciLCJvYmplY3QiLCJhZGROb3RpZmljYXRpb24iLCJmdW5jIiwibWFwRmllbGRzIiwic2V0RXhwb3J0SW1hZ2VTZXR0aW5nIiwic2V0RXhwb3J0SW1hZ2VEYXRhVXJpIiwic2V0RXhwb3J0SW1hZ2VFcnJvciIsInNwbGl0TWFwcyIsImFycmF5T2YiLCJQbG90Q29udGFpbmVyRmFjdG9yeSIsImRlcHMiLCJNYXBDb250YWluZXJGYWN0b3J5IiwiTWFwc0xheW91dEZhY3RvcnkiLCJTdHlsZWRQbG90Q29udGFpbmVyIiwic3R5bGVkIiwiZGl2IiwiU3R5bGVkTWFwQ29udGFpbmVyIiwicHJvcHMiLCJkZWNrR2xQcm9wcyIsImdsT3B0aW9ucyIsInByZXNlcnZlRHJhd2luZ0J1ZmZlciIsInVzZURldmljZVBpeGVscyIsIk1hcENvbnRhaW5lciIsIk1hcHNMYXlvdXQiLCJQbG90Q29udGFpbmVyIiwibWFwU3R5bGUiLCJpbWFnZVNpemUiLCJtYXBTdGF0ZSIsInNjYWxlIiwiaW1hZ2VXIiwiaW1hZ2VIIiwiaXNTcGxpdCIsIm1hcFN0eWxlU2VsZWN0b3IiLCJtYXBTY2FsZVNlbGVjdG9yIiwiYm90dG9tTWFwU3R5bGUiLCJ0b3BNYXBTdHlsZSIsIm1hcCIsImlzU3R5bGVMb2FkZWQiLCJfcmV0cmlldmVOZXdTY3JlZW5zaG90IiwicGxvdHRpbmdBcmVhUmVmIiwiY3VycmVudCIsImZpbHRlciIsInRoZW4iLCJlcnIiLCJlbmFibGVFcnJvck5vdGlmaWNhdGlvbiIsIl9vbk1hcFJlbmRlciIsInByb2Nlc3NpbmciLCJwcmV2UHJvcHMiLCJjaGVja3MiLCJzaG91bGRSZXRyaWV2ZVNjcmVlbnNob3QiLCJzb21lIiwiaXRlbSIsImxlZ2VuZCIsImxlbmd0aCIsInNpemUiLCJuZXdNYXBTdGF0ZSIsInpvb20iLCJNYXRoIiwibG9nMiIsImNlbnRlciIsInJlbmRlcmVkTGF5ZXJzIiwibGF5ZXJzIiwibGF5ZXIiLCJpZHgiLCJpZCIsIkdFT0NPREVSX0xBWUVSX0lEIiwic2hvdWxkUmVuZGVyTGF5ZXIiLCJsYXllckRhdGEiLCJib3VuZHMiLCJjZW50ZXJBbmRab29tIiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJsb25naXR1ZGUiLCJsYXRpdHVkZSIsIm1hcFByb3BzIiwic2NhbGVkTWFwU3R5bGVTZWxlY3RvciIsIm1hcENvbnRyb2xzIiwibWFwTGVnZW5kIiwic2hvdyIsImFjdGl2ZSIsIk1hcENvbXBvbmVudCIsIlN0YXRpY01hcCIsIm9uTWFwUmVuZGVyIiwiaXNFeHBvcnQiLCJtYXBDb250YWluZXJzIiwic2V0dGluZ3MiLCJpbmRleCIsIkNvbXBvbmVudCIsInByb3BzVHlwZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxZQUFZLEdBQUcsQ0FBQyw0QkFBRCxFQUErQixnQkFBL0IsRUFBaUQsZ0JBQWpELENBQXJCOztBQUNBLElBQU1DLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBQUMsSUFBSTtBQUFBLFNBQUksQ0FBQ0YsWUFBWSxDQUFDRyxRQUFiLENBQXNCRCxJQUFJLENBQUNFLFNBQTNCLENBQUw7QUFBQSxDQUE1Qjs7QUFDQSxJQUFNQyxzQkFBc0IsR0FBRyxDQUFDLElBQWhDO0FBRUEsSUFBTUMsU0FBUyxHQUFHO0FBQ2hCQyxFQUFBQSxL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d0JBQ0UsZ0NBQUMsa0JBQUQ7QUFBb0IsVUFBQSxHQUFHLEVBQUUsS0FBS3RCLGVBQTlCO0FBQStDLFVBQUEsS0FBSyxFQUFFZSxJQUFJLENBQUM1RCxLQUEzRDtBQUFrRSxVQUFBLE1BQU0sRUFBRTRELElBQUksQ0FBQ3hEO0FBQS9FLFdBQ0dzRixhQURILENBREYsQ0FERjtBQU9EO0FBdkprRTtBQUFBO0FBQUEsSUFDekNHLGdCQUR5Qzs7QUEwSnJFL0QsRUFBQUEsYUFBYSxDQUFDZ0UsVUFBZCxHQUEyQi9GLFNBQTNCO0FBQ0EsU0FBTytCLGFBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbi8vIGxpYnJhcmllc1xuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBjcmVhdGVSZWZ9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge2NyZWF0ZVNlbGVjdG9yfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7U3RhdGljTWFwfSBmcm9tICdyZWFjdC1tYXAtZ2wnO1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJ2xvZGFzaC5kZWJvdW5jZSc7XG5pbXBvcnQge2V4cG9ydEltYWdlRXJyb3J9IGZyb20gJ3V0aWxzL25vdGlmaWNhdGlvbnMtdXRpbHMnO1xuaW1wb3J0IE1hcENvbnRhaW5lckZhY3RvcnkgZnJvbSAnLi9tYXAtY29udGFpbmVyJztcbmltcG9ydCBNYXBzTGF5b3V0RmFjdG9yeSBmcm9tICcuL21hcHMtbGF5b3V0JztcbmltcG9ydCB7Y29udmVydFRvUG5nfSBmcm9tICd1dGlscy9leHBvcnQtdXRpbHMnO1xuaW1wb3J0IHtzY2FsZU1hcFN0eWxlQnlSZXNvbHV0aW9ufSBmcm9tICd1dGlscy9tYXAtc3R5bGUtdXRpbHMvbWFwYm94LWdsLXN0eWxlLWVkaXRvcic7XG5pbXBvcnQge2dldFNjYWxlRnJvbUltYWdlU2l6ZX0gZnJvbSAndXRpbHMvZXhwb3J0LXV0aWxzJztcbmltcG9ydCB7ZmluZE1hcEJvdW5kc30gZnJvbSAndXRpbHMvZGF0YS11dGlscyc7XG5pbXBvcnQge2dldENlbnRlckFuZFpvb21Gcm9tQm91bmRzfSBmcm9tICd1dGlscy9wcm9qZWN0aW9uLXV0aWxzJztcbmltcG9ydCB7R0VPQ09ERVJfTEFZRVJfSUR9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuY29uc3QgQ0xBU1NfRklMVEVSID0gWydtYXBib3hnbC1jb250cm9sLWNvbnRhaW5lcicsICdhdHRyaXRpb24tbGluaycsICdhdHRyaXRpb24tbG9nbyddO1xuY29uc3QgRE9NX0ZJTFRFUl9GVU5DID0gbm9kZSA9PiAhQ0xBU1NfRklMVEVSLmluY2x1ZGVzKG5vZGUuY2xhc3NOYW1lKTtcbmNvbnN0IE9VVF9PRl9TQ1JFRU5fUE9TSVRJT04gPSAtOTk5OTtcblxuY29uc3QgcHJvcFR5cGVzID0ge1xuICB3aWR0aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICBoZWlnaHQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgZXhwb3J0SW1hZ2VTZXR0aW5nOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIGFkZE5vdGlmaWNhdGlvbjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgbWFwRmllbGRzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIHNldEV4cG9ydEltYWdlU2V0dGluZzogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBzZXRFeHBvcnRJbWFnZURhdGFVcmk6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHNldEV4cG9ydEltYWdlRXJyb3I6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHNwbGl0TWFwczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdClcbn07XG5cblBsb3RDb250YWluZXJGYWN0b3J5LmRlcHMgPSBbTWFwQ29udGFpbmVyRmFjdG9yeSwgTWFwc0xheW91dEZhY3RvcnldO1xuXG4vLyBSZW1vdmUgbWFwYm94IGxvZ28gaW4gZXhwb3J0ZWQgbWFwLCBiZWNhdXNlIGl0IGNvbnRhaW5zIG5vbi1hc2NpaSBjaGFyYWN0ZXJzXG5jb25zdCBTdHlsZWRQbG90Q29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgLm1hcGJveGdsLWN0cmwtYm90dG9tLWxlZnQsXG4gIC5tYXBib3hnbC1jdHJsLWJvdHRvbS1yaWdodCxcbiAgLm1hcGJveC1hdHRyaWJ1dGlvbi1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cblxuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogJHtPVVRfT0ZfU0NSRUVOX1BPU0lUSU9OfXB4O1xuICBsZWZ0OiAke09VVF9PRl9TQ1JFRU5fUE9TSVRJT059cHg7XG5gO1xuXG5jb25zdCBTdHlsZWRNYXBDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICB3aWR0aDogJHtwcm9wcyA9PiBwcm9wcy53aWR0aH1weDtcbiAgaGVpZ2h0OiAke3Byb3BzID0+IHByb3BzLmhlaWdodH1weDtcbiAgZGlzcGxheTogZmxleDtcbmA7XG5cbmNvbnN0IGRlY2tHbFByb3BzID0ge1xuICBnbE9wdGlvbnM6IHtcbiAgICBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6IHRydWUsXG4gICAgdXNlRGV2aWNlUGl4ZWxzOiBmYWxzZVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQbG90Q29udGFpbmVyRmFjdG9yeShNYXBDb250YWluZXIsIE1hcHNMYXlvdXQpIHtcbiAgY2xhc3MgUGxvdENvbnRhaW5lciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgIHRoaXMuX29uTWFwUmVuZGVyID0gZGVib3VuY2UodGhpcy5fb25NYXBSZW5kZXIsIDUwMCk7XG4gICAgICB0aGlzLl9yZXRyaWV2ZU5ld1NjcmVlbnNob3QgPSBkZWJvdW5jZSh0aGlzLl9yZXRyaWV2ZU5ld1NjcmVlbnNob3QsIDUwMCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICB0aGlzLnByb3BzLnNldEV4cG9ydEltYWdlU2V0dGluZyh7cHJvY2Vzc2luZzogdHJ1ZX0pO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgIC8vIHJlLWZldGNoIHRoZSBuZXcgc2NyZWVuc2hvdCBvbmx5IHdoZW4gcmF0aW8gbGVnZW5kIG9yIHJlc29sdXRpb24gY2hhbmdlc1xuICAgICAgY29uc3QgY2hlY2tzID0gWydyYXRpbycsICdyZXNvbHV0aW9uJywgJ2xlZ2VuZCddO1xuICAgICAgY29uc3Qgc2hvdWxkUmV0cmlldmVTY3JlZW5zaG90ID0gY2hlY2tzLnNvbWUoXG4gICAgICAgIGl0ZW0gPT4gdGhpcy5wcm9wcy5leHBvcnRJbWFnZVNldHRpbmdbaXRlbV0gIT09IHByZXZQcm9wcy5leHBvcnRJbWFnZVNldHRpbmdbaXRlbV1cbiAgICAgICk7XG4gICAgICBpZiAoc2hvdWxkUmV0cmlldmVTY3JlZW5zaG90KSB7XG4gICAgICAgIHRoaXMucHJvcHMuc2V0RXhwb3J0SW1hZ2VTZXR0aW5nKHtwcm9jZXNzaW5nOiB0cnVlfSk7XG4gICAgICAgIHRoaXMuX3JldHJpZXZlTmV3U2NyZWVuc2hvdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHBsb3R0aW5nQXJlYVJlZiA9IGNyZWF0ZVJlZigpO1xuXG4gICAgbWFwU3R5bGVTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLm1hcEZpZWxkcy5tYXBTdHlsZTtcbiAgICBtYXBTY2FsZVNlbGVjdG9yID0gcHJvcHMgPT4ge1xuICAgICAgY29uc3Qge2ltYWdlU2l6ZX0gPSBwcm9wcy5leHBvcnRJbWFnZVNldHRpbmc7XG4gICAgICBjb25zdCB7bWFwU3RhdGV9ID0gcHJvcHMubWFwRmllbGRzO1xuICAgICAgaWYgKGltYWdlU2l6ZS5zY2FsZSkge1xuICAgICAgICByZXR1cm4gaW1hZ2VTaXplLnNjYWxlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzY2FsZSA9IGdldFNjYWxlRnJvbUltYWdlU2l6ZShcbiAgICAgICAgaW1hZ2VTaXplLmltYWdlVyxcbiAgICAgICAgaW1hZ2VTaXplLmltYWdlSCxcbiAgICAgICAgbWFwU3RhdGUud2lkdGggKiAobWFwU3RhdGUuaXNTcGxpdCA/IDIgOiAxKSxcbiAgICAgICAgbWFwU3RhdGUuaGVpZ2h0XG4gICAgICApO1xuXG4gICAgICByZXR1cm4gc2NhbGUgPiAwID8gc2NhbGUgOiAxO1xuICAgIH07XG5cbiAgICBzY2FsZWRNYXBTdHlsZVNlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgICB0aGlzLm1hcFN0eWxlU2VsZWN0b3IsXG4gICAgICB0aGlzLm1hcFNjYWxlU2VsZWN0b3IsXG4gICAgICAobWFwU3R5bGUsIHNjYWxlKSA9PiAoe1xuICAgICAgICAuLi5tYXBTdHlsZSxcbiAgICAgICAgYm90dG9tTWFwU3R5bGU6IHNjYWxlTWFwU3R5bGVCeVJlc29sdXRpb24obWFwU3R5bGUuYm90dG9tTWFwU3R5bGUsIHNjYWxlKSxcbiAgICAgICAgdG9wTWFwU3R5bGU6IHNjYWxlTWFwU3R5bGVCeVJlc29sdXRpb24obWFwU3R5bGUudG9wTWFwU3R5bGUsIHNjYWxlKVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgX29uTWFwUmVuZGVyID0gbWFwID0+IHtcbiAgICAgIGlmIChtYXAuaXNTdHlsZUxvYWRlZCgpKSB7XG4gICAgICAgIHRoaXMuX3JldHJpZXZlTmV3U2NyZWVuc2hvdCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfcmV0cmlldmVOZXdTY3JlZW5zaG90ID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucGxvdHRpbmdBcmVhUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgY29udmVydFRvUG5nKHRoaXMucGxvdHRpbmdBcmVhUmVmLmN1cnJlbnQsIHtmaWx0ZXI6IERPTV9GSUxURVJfRlVOQ30pXG4gICAgICAgICAgLnRoZW4odGhpcy5wcm9wcy5zZXRFeHBvcnRJbWFnZURhdGFVcmkpXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnNldEV4cG9ydEltYWdlRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUVycm9yTm90aWZpY2F0aW9uKSB7XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuYWRkTm90aWZpY2F0aW9uKGV4cG9ydEltYWdlRXJyb3Ioe2Vycn0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3Qge2V4cG9ydEltYWdlU2V0dGluZywgbWFwRmllbGRzLCBzcGxpdE1hcHN9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHtpbWFnZVNpemUgPSB7fSwgbGVnZW5kfSA9IGV4cG9ydEltYWdlU2V0dGluZztcbiAgICAgIGNvbnN0IHttYXBTdGF0ZX0gPSBtYXBGaWVsZHM7XG4gICAgICBjb25zdCBpc1NwbGl0ID0gc3BsaXRNYXBzICYmIHNwbGl0TWFwcy5sZW5ndGggPiAxO1xuXG4gICAgICBjb25zdCBzaXplID0ge1xuICAgICAgICB3aWR0aDogaW1hZ2VTaXplLmltYWdlVyB8fCAxLFxuICAgICAgICBoZWlnaHQ6IGltYWdlU2l6ZS5pbWFnZUggfHwgMVxuICAgICAgfTtcbiAgICAgIGNvbnN0IHdpZHRoID0gc2l6ZS53aWR0aCAvIChpc1NwbGl0ID8gMiA6IDEpO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gc2l6ZS5oZWlnaHQ7XG4gICAgICBjb25zdCBzY2FsZSA9IHRoaXMubWFwU2NhbGVTZWxlY3Rvcih0aGlzLnByb3BzKTtcbiAgICAgIGNvbnN0IG5ld01hcFN0YXRlID0ge1xuICAgICAgICAuLi5tYXBTdGF0ZSxcbiAgICAgICAgd2lkdGgsXG4gICAgICAgIGhlaWdodCxcbiAgICAgICAgem9vbTogbWFwU3RhdGUuem9vbSArIChNYXRoLmxvZzIoc2NhbGUpIHx8IDApXG4gICAgICB9O1xuXG4gICAgICAvLyBjZW50ZXIgYW5kIGFsbCBsYXllciBib3VuZHNcbiAgICAgIGlmIChleHBvcnRJbWFnZVNldHRpbmcuY2VudGVyKSB7XG4gICAgICAgIGNvbnN0IHJlbmRlcmVkTGF5ZXJzID0gbWFwRmllbGRzLmxheWVycy5maWx0ZXIoXG4gICAgICAgICAgKGxheWVyLCBpZHgpID0+XG4gICAgICAgICAgICBsYXllci5pZCAhPT0gR0VPQ09ERVJfTEFZRVJfSUQgJiYgbGF5ZXIuc2hvdWxkUmVuZGVyTGF5ZXIobWFwRmllbGRzLmxheWVyRGF0YVtpZHhdKVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBib3VuZHMgPSBmaW5kTWFwQm91bmRzKHJlbmRlcmVkTGF5ZXJzKTtcbiAgICAgICAgY29uc3QgY2VudGVyQW5kWm9vbSA9IGdldENlbnRlckFuZFpvb21Gcm9tQm91bmRzKGJvdW5kcywge3dpZHRoLCBoZWlnaHR9KTtcbiAgICAgICAgaWYgKGNlbnRlckFuZFpvb20pIHtcbiAgICAgICAgICBjb25zdCB6b29tID0gTnVtYmVyLmlzRmluaXRlKGNlbnRlckFuZFpvb20uem9vbSkgPyBjZW50ZXJBbmRab29tLnpvb20gOiBtYXBTdGF0ZS56b29tO1xuXG4gICAgICAgICAgbmV3TWFwU3RhdGUubG9uZ2l0dWRlID0gY2VudGVyQW5kWm9vbS5jZW50ZXJbMF07XG4gICAgICAgICAgbmV3TWFwU3RhdGUubGF0aXR1ZGUgPSBjZW50ZXJBbmRab29tLmNlbnRlclsxXTtcbiAgICAgICAgICBuZXdNYXBTdGF0ZS56b29tID0gem9vbSArIE51bWJlcihNYXRoLmxvZzIoc2NhbGUpIHx8IDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1hcFByb3BzID0ge1xuICAgICAgICAuLi5tYXBGaWVsZHMsXG4gICAgICAgIG1hcFN0eWxlOiB0aGlzLnNjYWxlZE1hcFN0eWxlU2VsZWN0b3IodGhpcy5wcm9wcyksXG5cbiAgICAgICAgLy8gb3ZlcnJpZGUgdmlld3BvcnQgYmFzZWQgb24gZXhwb3J0IHNldHRpbmdzXG4gICAgICAgIG1hcFN0YXRlOiBuZXdNYXBTdGF0ZSxcbiAgICAgICAgbWFwQ29udHJvbHM6IHtcbiAgICAgICAgICAvLyBvdmVycmlkZSBtYXAgbGVnZW5kIHZpc2liaWxpdHlcbiAgICAgICAgICBtYXBMZWdlbmQ6IHtcbiAgICAgICAgICAgIHNob3c6IGxlZ2VuZCxcbiAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgTWFwQ29tcG9uZW50OiBTdGF0aWNNYXAsXG4gICAgICAgIG9uTWFwUmVuZGVyOiB0aGlzLl9vbk1hcFJlbmRlcixcbiAgICAgICAgaXNFeHBvcnQ6IHRydWUsXG4gICAgICAgIGRlY2tHbFByb3BzXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBtYXBDb250YWluZXJzID0gIWlzU3BsaXQgPyAoXG4gICAgICAgIDxNYXBDb250YWluZXIgaW5kZXg9ezB9IHByaW1hcnk9e3RydWV9IHsuLi5tYXBQcm9wc30gLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxNYXBzTGF5b3V0PlxuICAgICAgICAgIHtzcGxpdE1hcHMubWFwKChzZXR0aW5ncywgaW5kZXgpID0+IChcbiAgICAgICAgICAgIDxNYXBDb250YWluZXJcbiAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgaW5kZXg9e2luZGV4fVxuICAgICAgICAgICAgICBwcmltYXJ5PXtpbmRleCA9PT0gMX1cbiAgICAgICAgICAgICAgey4uLm1hcFByb3BzfVxuICAgICAgICAgICAgICBtYXBMYXllcnM9e3NwbGl0TWFwc1tpbmRleF0ubGF5ZXJzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9NYXBzTGF5b3V0PlxuICAgICAgKTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTdHlsZWRQbG90Q29udGFpbmVyIGNsYXNzTmFtZT1cImV4cG9ydC1tYXAtaW5zdGFuY2VcIj5cbiAgICAgICAgICA8U3R5bGVkTWFwQ29udGFpbmVyIHJlZj17dGhpcy5wbG90dGluZ0FyZWFSZWZ9IHdpZHRoPXtzaXplLndpZHRofSBoZWlnaHQ9e3NpemUuaGVpZ2h0fT5cbiAgICAgICAgICAgIHttYXBDb250YWluZXJzfVxuICAgICAgICAgIDwvU3R5bGVkTWFwQ29udGFpbmVyPlxuICAgICAgICA8L1N0eWxlZFBsb3RDb250YWluZXI+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIFBsb3RDb250YWluZXIucHJvcHNUeXBlcyA9IHByb3BUeXBlcztcbiAgcmV0dXJuIFBsb3RDb250YWluZXI7XG59XG4iXX0=