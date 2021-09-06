"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MapContainerFactory;
exports.Attribution = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactMapGl = _interopRequireDefault(require("react-map-gl"));

var _react2 = _interopRequireDefault(require("@deck.gl/react"));

var _reselect = require("reselect");

var _viewportMercatorProject = _interopRequireDefault(require("viewport-mercator-project"));

var _notificationsUtils = require("../utils/notifications-utils");

var _mapPopover = _interopRequireDefault(require("./map/map-popover"));

var _mapControl = _interopRequireDefault(require("./map/map-control"));

var _styledComponents = require("./common/styled-components");

var _editor = _interopRequireDefault(require("./editor/editor"));

var _mapboxUtils = require("../layers/mapbox-utils");

var _glUtils = require("../utils/gl-utils");

var _mapboxUtils2 = require("../utils/map-style-utils/mapbox-utils");

var _layerUtils = require("../utils/layer-utils");

var _dBuildingLayer = _interopRequireDefault(require("../deckgl-layers/3d-building-layer/3d-building-layer"));

var _defaultSettings = require("../constants/default-settings");

var _errorBoundary = _interopRequireDefault(require("./common/error-boundary"));

var _observeDimensions = require("../utils/observe-dimensions");

var _mapLegendPanel = _interopRequireDefault(require("./map/map-legend-panel"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/** @type {{[key: string]: React.CSSProperties}} */
var MAP_STYLE = {
  container: {
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  top: {
    position: 'absolute',
    top: '0px',
    pointerEvents: 'none',
    width: '100%',
    height: '100%'
  }
};
var MAPBOXGL_STYLE_UPDATE = 'style.load';
var MAPBOXGL_RENDER = 'render';
var TRANSITION_DURATION = 0;

var Attribution = function Attribution() {
  return /*#__PURE__*/_react["default"].createElement(_styledComponents.StyledAttrbution, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "attrition-logo"
  }, "Basemap by:", /*#__PURE__*/_react["default"].createElement("a", {
    className: "mapboxgl-ctrl-logo",
    target: "_blank",
    rel: "noopener noreferrer",
    href: "https://www.mapbox.com/",
    "aria-label": "Mapbox logo"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "attrition-link"
  }, /*#__PURE__*/_react["default"].createElement("a", {
    href: "https://kepler.gl/policy/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "\xA9 kepler.gl |", ' '), /*#__PURE__*/_react["default"].createElement("a", {
    href: "https://www.mapbox.com/about/maps/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "\xA9 Mapbox |", ' '), /*#__PURE__*/_react["default"].createElement("a", {
    href: "http://www.openstreetmap.org/copyright",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "\xA9 OpenStreetMap |", ' '), /*#__PURE__*/_react["default"].createElement("a", {
    href: "https://www.mapbox.com/map-feedback/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Improve this map"))));
};

exports.Attribution = Attribution;
MapContainerFactory.deps = [_mapPopover["default"], _mapControl["default"], _editor["default"], _mapLegendPanel["default"]];

function MapContainerFactory(MapPopover, MapControl, Editor, MapLegendPanel) {
  var MapContainer = /*#__PURE__*/function (_Component) {
    (0, _inherits2["default"])(MapContainer, _Component);

    var _super = _createSuper(MapContainer);

    function MapContainer(_props) {
      var _this;

      (0, _classCallCheck2["default"])(this, MapContainer);
      _this = _super.call(this, _props);
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleResize", function (dimensions) {
        var primary = _this.props.primary;

        if (primary) {
          var mapStateActions = _this.props.mapStateActions;

          if (dimensions && dimensions.width > 0 && dimensions.height > 0) {
            mapStateActions.updateMap(dimensions);
          }
        }
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "layersSelector", function (props) {
        return props.layers;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "layerDataSelector", function (props) {
        return props.layerData;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "mapLayersSelector", function (props) {
        return props.mapLayers;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "layerOrderSelector", function (props) {
        return props.layerOrder;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "layersToRenderSelector", (0, _reselect.createSelector)(_this.layersSelector, _this.layerDataSelector, _this.mapLayersSelector, _layerUtils.prepareLayersToRender));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "layersForDeckSelector", (0, _reselect.createSelector)(_this.layersSelector, _this.layerDataSelector, _layerUtils.prepareLayersForDeck));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "filtersSelector", function (props) {
        return props.filters;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "polygonFilters", (0, _reselect.createSelector)(_this.filtersSelector, function (filters) {
        return filters.filter(function (f) {
          return f.type === _defaultSettings.FILTER_TYPES.polygon;
        });
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "mapboxLayersSelector", (0, _reselect.createSelector)(_this.layersSelector, _this.layerDataSelector, _this.layerOrderSelector, _this.layersToRenderSelector, _mapboxUtils.generateMapboxLayers));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onCloseMapPopover", function () {
        _this.props.visStateActions.onLayerClick(null);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onLayerSetDomain", function (idx, colorDomain) {
        _this.props.visStateActions.layerConfigChange(_this.props.layers[idx], {
          colorDomain: colorDomain
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleMapToggleLayer", function (layerId) {
        var _this$props = _this.props,
            _this$props$index = _this$props.index,
            mapIndex = _this$props$index === void 0 ? 0 : _this$props$index,
            visStateActions = _this$props.visStateActions;
        visStateActions.toggleLayerForMap(mapIndex, layerId);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMapboxStyleUpdate", function () {
        // force refresh mapboxgl layers
        _this.previousLayers = {};

        _this._updateMapboxLayers();

        if (typeof _this.props.onMapStyleLoaded === 'function') {
          _this.props.onMapStyleLoaded(_this._map);
        }
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_setMapboxMap", function (mapbox) {
        if (!_this._map && mapbox) {
          _this._map = mapbox.getMap(); // i noticed in certain context we don't access the actual map element

          if (!_this._map) {
            return;
          } // bind mapboxgl event listener


          _this._map.on(MAPBOXGL_STYLE_UPDATE, _this._onMapboxStyleUpdate);

          _this._map.on(MAPBOXGL_RENDER, function () {
            if (typeof _this.props.onMapRender === 'function') {
              _this.props.onMapRender(_this._map);
            }
          });
        }

        if (_this.props.getMapboxRef) {
          // The parent component can gain access to our MapboxGlMap by
          // providing this callback. Note that 'mapbox' will be null when the
          // ref is unset (e.g. when a split map is closed).
          _this.props.getMapboxRef(mapbox, _this.props.index);
        }
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onBeforeRender", function (_ref) {
        var gl = _ref.gl;
        (0, _glUtils.setLayerBlending)(gl, _this.props.layerBlending);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDeckError", function (error, layer) {
        var errorMessage = "An error in deck.gl: ".concat(error.message, " in ").concat(layer.id);
        var notificationId = "".concat(layer.id, "-").concat(error.message); // Throttle error notifications, as React doesn't like too many state changes from here.

        _this._deckGLErrorsElapsed = _this._deckGLErrorsElapsed || {};
        var lastShown = _this._deckGLErrorsElapsed[notificationId];

        if (!lastShown || lastShown < Date.now() - _defaultSettings.THROTTLE_NOTIFICATION_TIME) {
          _this._deckGLErrorsElapsed[notificationId] = Date.now(); // Create new error notification or update existing one with same id.
          // Update is required to preserve the order of notifications as they probably are going to "jump" based on order of errors.

          var uiStateActions = _this.props.uiStateActions;
          uiStateActions.addNotification((0, _notificationsUtils.errorNotification)({
            message: errorMessage,
            id: notificationId
          }));
        }
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onViewportChange", function (viewState) {
        var width = viewState.width,
            height = viewState.height,
            restViewState = (0, _objectWithoutProperties2["default"])(viewState, ["width", "height"]);
        var primary = _this.props.primary; // react-map-gl sends 0,0 dimensions during initialization
        // after we have received proper dimensions from observeDimensions

        var next = _objectSpread(_objectSpread({}, width > 0 && height > 0 ? viewState : restViewState), {}, {
          // enabling transition in two maps may lead to endless update loops
          transitionDuration: primary ? TRANSITION_DURATION : 0
        });

        if (typeof _this.props.onViewStateChange === 'function') {
          _this.props.onViewStateChange(next);
        }

        _this.props.mapStateActions.updateMap(next);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_toggleMapControl", function (panelId) {
        var _this$props2 = _this.props,
            index = _this$props2.index,
            uiStateActions = _this$props2.uiStateActions;
        uiStateActions.toggleMapControl(panelId, index);
      });
      _this.previousLayers = {// [layers.id]: mapboxLayerConfig
      };
      _this._deck = null;
      _this._ref = /*#__PURE__*/(0, _react.createRef)();
      return _this;
    }

    (0, _createClass2["default"])(MapContainer, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        (0, _observeDimensions.observeDimensions)(this._ref.current, this._handleResize);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        // unbind mapboxgl event listener
        if (this._map) {
          this._map.off(MAPBOXGL_STYLE_UPDATE);

          this._map.off(MAPBOXGL_RENDER);
        }

        (0, _observeDimensions.unobserveDimensions)(this._ref.current);
      }
    }, {
      key: "_onDeckInitialized",
      value: function _onDeckInitialized(gl) {
        if (this.props.onDeckInitialized) {
          this.props.onDeckInitialized(this._deck, gl);
        }
      }
    }, {
      key: "_renderMapPopover",
      value:
      /* component render functions */

      /* eslint-disable complexity */
      function _renderMapPopover(layersToRender) {
        // TODO: move this into reducer so it can be tested
        var _this$props3 = this.props,
            mapState = _this$props3.mapState,
            hoverInfo = _this$props3.hoverInfo,
            clicked = _this$props3.clicked,
            datasets = _this$props3.datasets,
            interactionConfig = _this$props3.interactionConfig,
            layers = _this$props3.layers,
            _this$props3$mousePos = _this$props3.mousePos,
            mousePosition = _this$props3$mousePos.mousePosition,
            coordinate = _this$props3$mousePos.coordinate,
            pinned = _this$props3$mousePos.pinned;

        if (!mousePosition || !interactionConfig.tooltip) {
          return null;
        }

        var layerHoverProp = (0, _layerUtils.getLayerHoverProp)({
          interactionConfig: interactionConfig,
          hoverInfo: hoverInfo,
          layers: layers,
          layersToRender: layersToRender,
          datasets: datasets
        });
        var compareMode = interactionConfig.tooltip.config ? interactionConfig.tooltip.config.compareMode : false;
        var pinnedPosition = {};
        var layerPinnedProp = null;

        if (pinned || clicked) {
          // project lnglat to screen so that tooltip follows the object on zoom
          var viewport = new _viewportMercatorProject["default"](mapState);
          var lngLat = clicked ? clicked.lngLat : pinned.coordinate;
          pinnedPosition = this._getHoverXY(viewport, lngLat);
          layerPinnedProp = (0, _layerUtils.getLayerHoverProp)({
            interactionConfig: interactionConfig,
            hoverInfo: clicked,
            layers: layers,
            layersToRender: layersToRender,
            datasets: datasets
          });

          if (layerHoverProp && layerPinnedProp) {
            layerHoverProp.primaryData = layerPinnedProp.data;
            layerHoverProp.compareType = interactionConfig.tooltip.config.compareType;
          }
        }

        var commonProp = {
          onClose: this._onCloseMapPopover,
          zoom: mapState.zoom,
          container: this._deck ? this._deck.canvas : undefined
        };
        return /*#__PURE__*/_react["default"].createElement(_errorBoundary["default"], null, layerPinnedProp && /*#__PURE__*/_react["default"].createElement(MapPopover, (0, _extends2["default"])({}, pinnedPosition, commonProp, {
          layerHoverProp: layerPinnedProp,
          coordinate: interactionConfig.coordinate.enabled && (pinned || {}).coordinate,
          frozen: true,
          isBase: compareMode
        })), layerHoverProp && (!layerPinnedProp || compareMode) && /*#__PURE__*/_react["default"].createElement(MapPopover, (0, _extends2["default"])({
          x: mousePosition[0],
          y: mousePosition[1]
        }, commonProp, {
          layerHoverProp: layerHoverProp,
          frozen: false,
          coordinate: interactionConfig.coordinate.enabled && coordinate
        })));
      }
      /* eslint-enable complexity */

    }, {
      key: "_getHoverXY",
      value: function _getHoverXY(viewport, lngLat) {
        var screenCoord = !viewport || !lngLat ? null : viewport.project(lngLat);
        return screenCoord && {
          x: screenCoord[0],
          y: screenCoord[1]
        };
      }
    }, {
      key: "_renderDeckOverlay",
      value: function _renderDeckOverlay(layersForDeck) {
        var _this$props$deckGlPro,
            _this2 = this;

        var _this$props4 = this.props,
            mapState = _this$props4.mapState,
            mapStyle = _this$props4.mapStyle,
            layerData = _this$props4.layerData,
            layerOrder = _this$props4.layerOrder,
            layers = _this$props4.layers,
            visStateActions = _this$props4.visStateActions,
            mapboxApiAccessToken = _this$props4.mapboxApiAccessToken,
            mapboxApiUrl = _this$props4.mapboxApiUrl; // initialise layers from props if exists

        var deckGlLayers = ((_this$props$deckGlPro = this.props.deckGlProps) === null || _this$props$deckGlPro === void 0 ? void 0 : _this$props$deckGlPro.layers) || []; // wait until data is ready before render data layers

        if (layerData && layerData.length) {
          // last layer render first
          var dataLayers = layerOrder.slice().reverse().filter(function (idx) {
            return layersForDeck[layers[idx].id];
          }).reduce(function (overlays, idx) {
            var layerCallbacks = {
              onSetLayerDomain: function onSetLayerDomain(val) {
                return _this2._onLayerSetDomain(idx, val);
              }
            };
            var layerOverlay = (0, _layerUtils.renderDeckGlLayer)(_this2.props, layerCallbacks, idx);
            return overlays.concat(layerOverlay || []);
          }, []);
          deckGlLayers = deckGlLayers.concat(dataLayers);
        }

        if (mapStyle.visibleLayerGroups['3d building']) {
          deckGlLayers.push(new _dBuildingLayer["default"]({
            id: '_keplergl_3d-building',
            mapboxApiAccessToken: mapboxApiAccessToken,
            mapboxApiUrl: mapboxApiUrl,
            threeDBuildingColor: mapStyle.threeDBuildingColor,
            updateTriggers: {
              getFillColor: mapStyle.threeDBuildingColor
            }
          }));
        }

        return /*#__PURE__*/_react["default"].createElement(_react2["default"], (0, _extends2["default"])({}, this.props.deckGlProps, {
          viewState: mapState,
          id: "default-deckgl-overlay",
          layers: deckGlLayers,
          onBeforeRender: this._onBeforeRender,
          onHover: visStateActions.onLayerHover,
          onClick: visStateActions.onLayerClick,
          onError: this._onDeckError,
          ref: function ref(comp) {
            if (comp && comp.deck && !_this2._deck) {
              _this2._deck = comp.deck;
            }
          },
          onWebGLInitialized: function onWebGLInitialized(gl) {
            return _this2._onDeckInitialized(gl);
          }
        }));
      }
    }, {
      key: "_updateMapboxLayers",
      value: function _updateMapboxLayers() {
        var mapboxLayers = this.mapboxLayersSelector(this.props);

        if (!Object.keys(mapboxLayers).length && !Object.keys(this.previousLayers).length) {
          return;
        }

        (0, _mapboxUtils.updateMapboxLayers)(this._map, mapboxLayers, this.previousLayers);
        this.previousLayers = mapboxLayers;
      }
    }, {
      key: "_renderMapboxOverlays",
      value: function _renderMapboxOverlays() {
        if (this._map && this._map.isStyleLoaded()) {
          this._updateMapboxLayers();
        }
      }
    }, {
      key: "_renderMap",
      value:
      /* eslint-disable complexity */
      function _renderMap() {
        var _this$props5 = this.props,
            mapState = _this$props5.mapState,
            mapStyle = _this$props5.mapStyle,
            mapStateActions = _this$props5.mapStateActions,
            layers = _this$props5.layers,
            MapComponent = _this$props5.MapComponent,
            datasets = _this$props5.datasets,
            mapboxApiAccessToken = _this$props5.mapboxApiAccessToken,
            mapboxApiUrl = _this$props5.mapboxApiUrl,
            mapControls = _this$props5.mapControls,
            isExport = _this$props5.isExport,
            locale = _this$props5.locale,
            uiStateActions = _this$props5.uiStateActions,
            visStateActions = _this$props5.visStateActions,
            interactionConfig = _this$props5.interactionConfig,
            editor = _this$props5.editor,
            index = _this$props5.index,
            primary = _this$props5.primary;
        var layersToRender = this.layersToRenderSelector(this.props);
        var layersForDeck = this.layersForDeckSelector(this.props);

        var mapProps = _objectSpread(_objectSpread({}, mapState), {}, {
          width: '100%',
          height: '100%',
          preserveDrawingBuffer: true,
          mapboxApiAccessToken: mapboxApiAccessToken,
          mapboxApiUrl: mapboxApiUrl,
          onViewportChange: this._onViewportChange,
          transformRequest: _mapboxUtils2.transformRequest
        });

        var isEdit = (mapControls.mapDraw || {}).active;
        var hasGeocoderLayer = layers.find(function (l) {
          return l.id === _defaultSettings.GEOCODER_LAYER_ID;
        });
        var isSplit = Boolean(mapState.isSplit);
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(MapControl, {
          datasets: datasets,
          dragRotate: mapState.dragRotate,
          isSplit: isSplit,
          primary: primary,
          isExport: isExport,
          layers: layers,
          layersToRender: layersToRender,
          mapIndex: index,
          mapControls: mapControls,
          readOnly: this.props.readOnly,
          scale: mapState.scale || 1,
          top: interactionConfig.geocoder && interactionConfig.geocoder.enabled ? 52 : 0,
          editor: editor,
          locale: locale,
          onTogglePerspective: mapStateActions.togglePerspective,
          onToggleSplitMap: mapStateActions.toggleSplitMap,
          onMapToggleLayer: this._handleMapToggleLayer,
          onToggleMapControl: this._toggleMapControl,
          onSetEditorMode: visStateActions.setEditorMode,
          onSetLocale: uiStateActions.setLocale,
          onToggleEditorVisibility: visStateActions.toggleEditorVisibility
        }), /*#__PURE__*/_react["default"].createElement(MapComponent, (0, _extends2["default"])({}, mapProps, {
          key: "bottom",
          ref: this._setMapboxMap,
          mapStyle: mapStyle.bottomMapStyle,
          getCursor: this.props.hoverInfo ? function () {
            return 'pointer';
          } : undefined,
          onMouseMove: this.props.visStateActions.onMouseMove
        }), this._renderDeckOverlay(layersForDeck), this._renderMapboxOverlays(), /*#__PURE__*/_react["default"].createElement(Editor, {
          index: index,
          datasets: datasets,
          editor: editor,
          filters: this.polygonFilters(this.props),
          isEnabled: isEdit,
          layers: layers,
          layersToRender: layersToRender,
          onDeleteFeature: visStateActions.deleteFeature,
          onSelect: visStateActions.setSelectedFeature,
          onUpdate: visStateActions.setFeatures,
          onTogglePolygonFilter: visStateActions.setPolygonFilterLayer,
          style: {
            pointerEvents: isEdit ? 'all' : 'none',
            position: 'absolute',
            display: editor.visible ? 'block' : 'none'
          }
        })), mapStyle.topMapStyle || hasGeocoderLayer ? /*#__PURE__*/_react["default"].createElement("div", {
          style: MAP_STYLE.top
        }, /*#__PURE__*/_react["default"].createElement(MapComponent, (0, _extends2["default"])({}, mapProps, {
          key: "top",
          mapStyle: mapStyle.topMapStyle
        }), this._renderDeckOverlay((0, _defineProperty2["default"])({}, _defaultSettings.GEOCODER_LAYER_ID, true)))) : null, this._renderMapPopover(layersToRender), !isSplit || index === 1 ? /*#__PURE__*/_react["default"].createElement(Attribution, null) : null);
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props6 = this.props,
            mapState = _this$props6.mapState,
            mapStyle = _this$props6.mapStyle;
        return /*#__PURE__*/_react["default"].createElement(_styledComponents.StyledMapContainer, {
          ref: this._ref,
          style: MAP_STYLE.container,
          globe: mapState.globe
        }, mapStyle.bottomMapStyle && this._renderMap());
      }
    }]);
    return MapContainer;
  }(_react.Component);

  (0, _defineProperty2["default"])(MapContainer, "propTypes", {
    // required
    datasets: _propTypes["default"].object,
    interactionConfig: _propTypes["default"].object.isRequired,
    layerBlending: _propTypes["default"].string.isRequired,
    layerOrder: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    layerData: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    layers: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    filters: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    mapState: _propTypes["default"].object.isRequired,
    mapControls: _propTypes["default"].object.isRequired,
    mapStyle: _propTypes["default"].object.isRequired,
    mousePos: _propTypes["default"].object.isRequired,
    mapboxApiAccessToken: _propTypes["default"].string.isRequired,
    mapboxApiUrl: _propTypes["default"].string,
    visStateActions: _propTypes["default"].object.isRequired,
    mapStateActions: _propTypes["default"].object.isRequired,
    uiStateActions: _propTypes["default"].object.isRequired,
    // optional
    primary: _propTypes["default"].bool,
    // primary one will be reporting its size to appState
    readOnly: _propTypes["default"].bool,
    isExport: _propTypes["default"].bool,
    clicked: _propTypes["default"].object,
    hoverInfo: _propTypes["default"].object,
    mapLayers: _propTypes["default"].object,
    onMapToggleLayer: _propTypes["default"].func,
    onMapStyleLoaded: _propTypes["default"].func,
    onMapRender: _propTypes["default"].func,
    getMapboxRef: _propTypes["default"].func,
    index: _propTypes["default"].number
  });
  (0, _defineProperty2["default"])(MapContainer, "defaultProps", {
    MapComponent: _reactMapGl["default"],
    deckGlProps: {},
    index: 0,
    primary: true
  });
  MapContainer.displayName = 'MapContainer';
  return MapContainer;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21hcC1jb250YWluZXIuanMiXSwibmFtZXMiOlsiTUFQX1NUWUxFIiwiY29udGFpbmVyIiwiZGlzcGxheSIsInBvc2l0aW9uIiwid2lkdGgiLCJoZWlnaHQiLCJ0b3AiLCJwb2ludGVyRXZlbnRzIiwiTUFQQk9YR0xfU1RZTEVfVVBEQVRFIiwiTUFQQk9YR0xfUkVOREVSIiwiVFJBTlNJVElPTl9EVVJBVElPTiIsIkF0dHJpYnV0aW9uIiwiTWFwQ29udGFpbmVyRmFjdG9yeSIsImRlcHMiLCJNYXBQb3BvdmVyRmFjdG9yeSIsIk1hcENvbnRyb2xGYWN0b3J5IiwiRWRpdG9yRmFjdG9yeSIsIk1hcExlZ2VuZFBhbmVsRmFjdG9yeSIsIk1hcFBvcG92ZXIiLCJNYXBDb250cm9sIiwiRWRpdG9yIiwiTWFwTGVnZW5kUGFuZWwiLCJNYXBDb250YWluZXIiLCJwcm9wcyIsImRpbWVuc2lvbnMiLCJwcmltYXJ5IiwibWFwU3RhdGVBY3Rpb25zIiwidXBkYXRlTWFwIiwibGF5ZXJzIiwibGF5ZXJEYXRhIiwibWFwTGF5ZXJzIiwibGF5ZXJPcmRlciIsImxheWVyc1NlbGVjdG9yIiwibGF5ZXJEYXRhU2VsZWN0b3IiLCJtYXBMYXllcnNTZWxlY3RvciIsInByZXBhcmVMYXllcnNUb1JlbmRlciIsInByZXBhcmVMYXllcnNGb3JEZWNrIiwiZmlsdGVycyIsImZpbHRlcnNTZWxlY3RvciIsImZpbHRlciIsImYiLCJ0eXBlIiwiRklMVEVSX1RZUEVTIiwicG9seWdvbiIsImxheWVyT3JkZXJTZWxlY3RvciIsImxheWVyc1RvUmVuZGVyU2VsZWN0b3IiLCJnZW5lcmF0ZU1hcGJveExheWVycyIsInZpc1N0YXRlQWN0aW9ucyIsIm9uTGF5ZXJDbGljayIsImlkeCIsImNvbG9yRG9tYWluIiwibGF5ZXJDb25maWdDaGFuZ2UiLCJsYXllcklkIiwiaW5kZXgiLCJtYXBJbmRleCIsInRvZ2dsZUxheWVyRm9yTWFwIiwicHJldmlvdXNMYXllcnMiLCJfdXBkYXRlTWFwYm94TGF5ZXJzIiwib25NYXBTdHlsZUxvYWRlZCIsIl9tYXAiLCJtYXBib3giLCJnZXRNYXAiLCJvbiIsIl9vbk1hcGJveFN0eWxlVXBkYXRlIiwib25NYXBSZW5kZXIiLCJnZXRNYXBib3hSZWYiLCJnbCIsImxheWVyQmxlbmRpbmciLCJlcnJvciIsImxheWVyIiwiZXJyb3JNZXNzYWdlIiwibWVzc2FnZSIsImlkIiwibm90aWZpY2F0aW9uSWQiLCJfZGVja0dMRXJyb3JzRWxhcHNlZCIsImxhc3RTaG93biIsIkRhdGUiLCJub3ciLCJUSFJPVFRMRV9OT1RJRklDQVRJT05fVElNRSIsInVpU3RhdGVBY3Rpb25zIiwiYWRkTm90aWZpY2F0aW9uIiwidmlld1N0YXRlIiwicmVzdFZpZXdTdGF0ZSIsIm5leHQiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJvblZpZXdTdGF0ZUNoYW5nZSIsInBhbmVsSWQiLCJ0b2dnbGVNYXBDb250cm9sIiwiX2RlY2siLCJfcmVmIiwiY3VycmVudCIsIl9oYW5kbGVSZXNpemUiLCJvZmYiLCJvbkRlY2tJbml0aWFsaXplZCIsImxheWVyc1RvUmVuZGVyIiwibWFwU3RhdGUiLCJob3ZlckluZm8iLCJjbGlja2VkIiwiZGF0YXNldHMiLCJpbnRlcmFjdGlvbkNvbmZpZyIsIm1vdXNlUG9zIiwibW91c2VQb3NpdGlvbiIsImNvb3JkaW5hdGUiLCJwaW5uZWQiLCJ0b29sdGlwIiwibGF5ZXJIb3ZlclByb3AiLCJjb21wYXJlTW9kZSIsImNvbmZpZyIsInBpbm5lZFBvc2l0aW9uIiwibGF5ZXJQaW5uZWRQcm9wIiwidmlld3BvcnQiLCJXZWJNZXJjYXRvclZpZXdwb3J0IiwibG5nTGF0IiwiX2dldEhvdmVyWFkiLCJwcmltYXJ5RGF0YSIsImRhdGEiLCJjb21wYXJlVHlwZSIsImNvbW1vblByb3AiLCJvbkNsb3NlIiwiX29uQ2xvc2VNYXBQb3BvdmVyIiwiem9vbSIsImNhbnZhcyIsInVuZGVmaW5lZCIsImVuYWJsZWQiLCJzY3JlZW5Db29yZCIsInByb2plY3QiLCJ4IiwieSIsImxheWVyc0ZvckRlY2siLCJtYXBTdHlsZSIsIm1hcGJveEFwaUFjY2Vzc1Rva2VuIiwibWFwYm94QXBpVXJsIiwiZGVja0dsTGF5ZXJzIiwiZGVja0dsUHJvcHMiLCJsZW5ndGgiLCJkYXRhTGF5ZXJzIiwic2xpY2UiLCJyZXZlcnNlIiwicmVkdWNlIiwib3ZlcmxheXMiLCJsYXllckNhbGxiYWNrcyIsIm9uU2V0TGF5ZXJEb21haW4iLCJ2YWwiLCJfb25MYXllclNldERvbWFpbiIsImxheWVyT3ZlcmxheSIsImNvbmNhdCIsInZpc2libGVMYXllckdyb3VwcyIsInB1c2giLCJUaHJlZURCdWlsZGluZ0xheWVyIiwidGhyZWVEQnVpbGRpbmdDb2xvciIsInVwZGF0ZVRyaWdnZXJzIiwiZ2V0RmlsbENvbG9yIiwiX29uQmVmb3JlUmVuZGVyIiwib25MYXllckhvdmVyIiwiX29uRGVja0Vycm9yIiwiY29tcCIsImRlY2siLCJfb25EZWNrSW5pdGlhbGl6ZWQiLCJtYXBib3hMYXllcnMiLCJtYXBib3hMYXllcnNTZWxlY3RvciIsIk9iamVjdCIsImtleXMiLCJpc1N0eWxlTG9hZGVkIiwiTWFwQ29tcG9uZW50IiwibWFwQ29udHJvbHMiLCJpc0V4cG9ydCIsImxvY2FsZSIsImVkaXRvciIsImxheWVyc0ZvckRlY2tTZWxlY3RvciIsIm1hcFByb3BzIiwicHJlc2VydmVEcmF3aW5nQnVmZmVyIiwib25WaWV3cG9ydENoYW5nZSIsIl9vblZpZXdwb3J0Q2hhbmdlIiwidHJhbnNmb3JtUmVxdWVzdCIsImlzRWRpdCIsIm1hcERyYXciLCJhY3RpdmUiLCJoYXNHZW9jb2RlckxheWVyIiwiZmluZCIsImwiLCJHRU9DT0RFUl9MQVlFUl9JRCIsImlzU3BsaXQiLCJCb29sZWFuIiwiZHJhZ1JvdGF0ZSIsInJlYWRPbmx5Iiwic2NhbGUiLCJnZW9jb2RlciIsInRvZ2dsZVBlcnNwZWN0aXZlIiwidG9nZ2xlU3BsaXRNYXAiLCJfaGFuZGxlTWFwVG9nZ2xlTGF5ZXIiLCJfdG9nZ2xlTWFwQ29udHJvbCIsInNldEVkaXRvck1vZGUiLCJzZXRMb2NhbGUiLCJ0b2dnbGVFZGl0b3JWaXNpYmlsaXR5IiwiX3NldE1hcGJveE1hcCIsImJvdHRvbU1hcFN0eWxlIiwib25Nb3VzZU1vdmUiLCJfcmVuZGVyRGVja092ZXJsYXkiLCJfcmVuZGVyTWFwYm94T3ZlcmxheXMiLCJwb2x5Z29uRmlsdGVycyIsImRlbGV0ZUZlYXR1cmUiLCJzZXRTZWxlY3RlZEZlYXR1cmUiLCJzZXRGZWF0dXJlcyIsInNldFBvbHlnb25GaWx0ZXJMYXllciIsInZpc2libGUiLCJ0b3BNYXBTdHlsZSIsIl9yZW5kZXJNYXBQb3BvdmVyIiwiZ2xvYmUiLCJfcmVuZGVyTWFwIiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsInN0cmluZyIsImFycmF5T2YiLCJhbnkiLCJib29sIiwib25NYXBUb2dnbGVMYXllciIsImZ1bmMiLCJudW1iZXIiLCJNYXBib3hHTE1hcCIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBR0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBUUE7O0FBQ0E7O0FBTUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQTtBQUNBLElBQU1BLFNBQVMsR0FBRztBQUNoQkMsRUFBQUEsU0FBUyxFQUFFO0FBQ1RDLElBQUFBLE9BQU8sRUFBRSxjQURBO0FBRVRDLElBQUFBLFFBQVEsRUFBRSxVQUZEO0FBR1RDLElBQUFBLEtBQUssRUFBRSxNQUhFO0FBSVRDLElBQUFBLE1BQU0sRUFBRTtBQUpDLEdBREs7QUFPaEJDLEVBQUFBLEdBQUcsRUFBRTtBQUNISCxJQUFBQSxRQUFRLEVBQUUsVUFEUDtBQUVIRyxJQUFBQSxHQUFHLEVBQUUsS0FGRjtBQUdIQyxJQUFBQSxhQUFhLEVBQUUsTUFIWjtBQUlISCxJQUFB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RCxzQkFETTtBQUVwQnZGLElBQUFBLFdBQVcsRUFBRSxFQUZPO0FBR3BCaEYsSUFBQUEsS0FBSyxFQUFFLENBSGE7QUFJcEI1QixJQUFBQSxPQUFPLEVBQUU7QUFKVyxHQW5Da0U7QUFvZjFGSCxFQUFBQSxZQUFZLENBQUN1TSxXQUFiLEdBQTJCLGNBQTNCO0FBRUEsU0FBT3ZNLFlBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbi8vIGxpYnJhcmllc1xuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBjcmVhdGVSZWZ9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgTWFwYm94R0xNYXAgZnJvbSAncmVhY3QtbWFwLWdsJztcbmltcG9ydCBEZWNrR0wgZnJvbSAnQGRlY2suZ2wvcmVhY3QnO1xuaW1wb3J0IHtjcmVhdGVTZWxlY3Rvcn0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IFdlYk1lcmNhdG9yVmlld3BvcnQgZnJvbSAndmlld3BvcnQtbWVyY2F0b3ItcHJvamVjdCc7XG5pbXBvcnQge2Vycm9yTm90aWZpY2F0aW9ufSBmcm9tICd1dGlscy9ub3RpZmljYXRpb25zLXV0aWxzJztcblxuLy8gY29tcG9uZW50c1xuaW1wb3J0IE1hcFBvcG92ZXJGYWN0b3J5IGZyb20gJ2NvbXBvbmVudHMvbWFwL21hcC1wb3BvdmVyJztcbmltcG9ydCBNYXBDb250cm9sRmFjdG9yeSBmcm9tICdjb21wb25lbnRzL21hcC9tYXAtY29udHJvbCc7XG5pbXBvcnQge1N0eWxlZE1hcENvbnRhaW5lciwgU3R5bGVkQXR0cmJ1dGlvbn0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQgRWRpdG9yRmFjdG9yeSBmcm9tICcuL2VkaXRvci9lZGl0b3InO1xuXG4vLyB1dGlsc1xuaW1wb3J0IHtnZW5lcmF0ZU1hcGJveExheWVycywgdXBkYXRlTWFwYm94TGF5ZXJzfSBmcm9tICdsYXllcnMvbWFwYm94LXV0aWxzJztcbmltcG9ydCB7c2V0TGF5ZXJCbGVuZGluZ30gZnJvbSAndXRpbHMvZ2wtdXRpbHMnO1xuaW1wb3J0IHt0cmFuc2Zvcm1SZXF1ZXN0fSBmcm9tICd1dGlscy9tYXAtc3R5bGUtdXRpbHMvbWFwYm94LXV0aWxzJztcbmltcG9ydCB7XG4gIGdldExheWVySG92ZXJQcm9wLFxuICByZW5kZXJEZWNrR2xMYXllcixcbiAgcHJlcGFyZUxheWVyc1RvUmVuZGVyLFxuICBwcmVwYXJlTGF5ZXJzRm9yRGVja1xufSBmcm9tICd1dGlscy9sYXllci11dGlscyc7XG5cbi8vIGRlZmF1bHQtc2V0dGluZ3NcbmltcG9ydCBUaHJlZURCdWlsZGluZ0xheWVyIGZyb20gJ2RlY2tnbC1sYXllcnMvM2QtYnVpbGRpbmctbGF5ZXIvM2QtYnVpbGRpbmctbGF5ZXInO1xuaW1wb3J0IHtcbiAgRklMVEVSX1RZUEVTLFxuICBHRU9DT0RFUl9MQVlFUl9JRCxcbiAgVEhST1RUTEVfTk9USUZJQ0FUSU9OX1RJTUVcbn0gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG5pbXBvcnQgRXJyb3JCb3VuZGFyeSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9lcnJvci1ib3VuZGFyeSc7XG5pbXBvcnQge29ic2VydmVEaW1lbnNpb25zLCB1bm9ic2VydmVEaW1lbnNpb25zfSBmcm9tICcuLi91dGlscy9vYnNlcnZlLWRpbWVuc2lvbnMnO1xuaW1wb3J0IE1hcExlZ2VuZFBhbmVsRmFjdG9yeSBmcm9tICcuL21hcC9tYXAtbGVnZW5kLXBhbmVsJztcblxuLyoqIEB0eXBlIHt7W2tleTogc3RyaW5nXTogUmVhY3QuQ1NTUHJvcGVydGllc319ICovXG5jb25zdCBNQVBfU1RZTEUgPSB7XG4gIGNvbnRhaW5lcjoge1xuICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgaGVpZ2h0OiAnMTAwJSdcbiAgfSxcbiAgdG9wOiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgdG9wOiAnMHB4JyxcbiAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICAgd2lkdGg6ICcxMDAlJyxcbiAgICBoZWlnaHQ6ICcxMDAlJ1xuICB9XG59O1xuXG5jb25zdCBNQVBCT1hHTF9TVFlMRV9VUERBVEUgPSAnc3R5bGUubG9hZCc7XG5jb25zdCBNQVBCT1hHTF9SRU5ERVIgPSAncmVuZGVyJztcbmNvbnN0IFRSQU5TSVRJT05fRFVSQVRJT04gPSAwO1xuXG5leHBvcnQgY29uc3QgQXR0cmlidXRpb24gPSAoKSA9PiAoXG4gIDxTdHlsZWRBdHRyYnV0aW9uPlxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYXR0cml0aW9uLWxvZ29cIj5cbiAgICAgIEJhc2VtYXAgYnk6XG4gICAgICA8YVxuICAgICAgICBjbGFzc05hbWU9XCJtYXBib3hnbC1jdHJsLWxvZ29cIlxuICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCJcbiAgICAgICAgaHJlZj1cImh0dHBzOi8vd3d3Lm1hcGJveC5jb20vXCJcbiAgICAgICAgYXJpYS1sYWJlbD1cIk1hcGJveCBsb2dvXCJcbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJhdHRyaXRpb24tbGlua1wiPlxuICAgICAgPGEgaHJlZj1cImh0dHBzOi8va2VwbGVyLmdsL3BvbGljeS9cIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+XG4gICAgICAgIMKpIGtlcGxlci5nbCB8eycgJ31cbiAgICAgIDwvYT5cbiAgICAgIDxhIGhyZWY9XCJodHRwczovL3d3dy5tYXBib3guY29tL2Fib3V0L21hcHMvXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPlxuICAgICAgICDCqSBNYXBib3ggfHsnICd9XG4gICAgICA8L2E+XG4gICAgICA8YSBocmVmPVwiaHR0cDovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+XG4gICAgICAgIMKpIE9wZW5TdHJlZXRNYXAgfHsnICd9XG4gICAgICA8L2E+XG4gICAgICA8YSBocmVmPVwiaHR0cHM6Ly93d3cubWFwYm94LmNvbS9tYXAtZmVlZGJhY2svXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPlxuICAgICAgICA8c3Ryb25nPkltcHJvdmUgdGhpcyBtYXA8L3N0cm9uZz5cbiAgICAgIDwvYT5cbiAgICA8L2Rpdj5cbiAgPC9TdHlsZWRBdHRyYnV0aW9uPlxuKTtcblxuTWFwQ29udGFpbmVyRmFjdG9yeS5kZXBzID0gW1xuICBNYXBQb3BvdmVyRmFjdG9yeSxcbiAgTWFwQ29udHJvbEZhY3RvcnksXG4gIEVkaXRvckZhY3RvcnksXG4gIE1hcExlZ2VuZFBhbmVsRmFjdG9yeVxuXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWFwQ29udGFpbmVyRmFjdG9yeShNYXBQb3BvdmVyLCBNYXBDb250cm9sLCBFZGl0b3IsIE1hcExlZ2VuZFBhbmVsKSB7XG4gIGNsYXNzIE1hcENvbnRhaW5lciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgIC8vIHJlcXVpcmVkXG4gICAgICBkYXRhc2V0czogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgIGludGVyYWN0aW9uQ29uZmlnOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBsYXllckJsZW5kaW5nOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICBsYXllck9yZGVyOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuICAgICAgbGF5ZXJEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuICAgICAgbGF5ZXJzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuICAgICAgZmlsdGVyczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgICAgIG1hcFN0YXRlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBtYXBDb250cm9sczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgbWFwU3R5bGU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIG1vdXNlUG9zOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbWFwYm94QXBpVXJsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgdmlzU3RhdGVBY3Rpb25zOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBtYXBTdGF0ZUFjdGlvbnM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIHVpU3RhdGVBY3Rpb25zOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG5cbiAgICAgIC8vIG9wdGlvbmFsXG4gICAgICBwcmltYXJ5OiBQcm9wVHlwZXMuYm9vbCwgLy8gcHJpbWFyeSBvbmUgd2lsbCBiZSByZXBvcnRpbmcgaXRzIHNpemUgdG8gYXBwU3RhdGVcbiAgICAgIHJlYWRPbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgIGlzRXhwb3J0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgIGNsaWNrZWQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICBob3ZlckluZm86IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICBtYXBMYXllcnM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICBvbk1hcFRvZ2dsZUxheWVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIG9uTWFwU3R5bGVMb2FkZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgb25NYXBSZW5kZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgZ2V0TWFwYm94UmVmOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIGluZGV4OiBQcm9wVHlwZXMubnVtYmVyXG4gICAgfTtcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICBNYXBDb21wb25lbnQ6IE1hcGJveEdMTWFwLFxuICAgICAgZGVja0dsUHJvcHM6IHt9LFxuICAgICAgaW5kZXg6IDAsXG4gICAgICBwcmltYXJ5OiB0cnVlXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgIHRoaXMucHJldmlvdXNMYXllcnMgPSB7XG4gICAgICAgIC8vIFtsYXllcnMuaWRdOiBtYXBib3hMYXllckNvbmZpZ1xuICAgICAgfTtcblxuICAgICAgdGhpcy5fZGVjayA9IG51bGw7XG4gICAgICB0aGlzLl9yZWYgPSBjcmVhdGVSZWYoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIG9ic2VydmVEaW1lbnNpb25zKHRoaXMuX3JlZi5jdXJyZW50LCB0aGlzLl9oYW5kbGVSZXNpemUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgLy8gdW5iaW5kIG1hcGJveGdsIGV2ZW50IGxpc3RlbmVyXG4gICAgICBpZiAodGhpcy5fbWFwKSB7XG4gICAgICAgIHRoaXMuX21hcC5vZmYoTUFQQk9YR0xfU1RZTEVfVVBEQVRFKTtcbiAgICAgICAgdGhpcy5fbWFwLm9mZihNQVBCT1hHTF9SRU5ERVIpO1xuICAgICAgfVxuICAgICAgdW5vYnNlcnZlRGltZW5zaW9ucyh0aGlzLl9yZWYuY3VycmVudCk7XG4gICAgfVxuXG4gICAgX2hhbmRsZVJlc2l6ZSA9IGRpbWVuc2lvbnMgPT4ge1xuICAgICAgY29uc3Qge3ByaW1hcnl9ID0gdGhpcy5wcm9wcztcbiAgICAgIGlmIChwcmltYXJ5KSB7XG4gICAgICAgIGNvbnN0IHttYXBTdGF0ZUFjdGlvbnN9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgaWYgKGRpbWVuc2lvbnMgJiYgZGltZW5zaW9ucy53aWR0aCA+IDAgJiYgZGltZW5zaW9ucy5oZWlnaHQgPiAwKSB7XG4gICAgICAgICAgbWFwU3RhdGVBY3Rpb25zLnVwZGF0ZU1hcChkaW1lbnNpb25zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBsYXllcnNTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLmxheWVycztcbiAgICBsYXllckRhdGFTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLmxheWVyRGF0YTtcbiAgICBtYXBMYXllcnNTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLm1hcExheWVycztcbiAgICBsYXllck9yZGVyU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5sYXllck9yZGVyO1xuICAgIGxheWVyc1RvUmVuZGVyU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvcihcbiAgICAgIHRoaXMubGF5ZXJzU2VsZWN0b3IsXG4gICAgICB0aGlzLmxheWVyRGF0YVNlbGVjdG9yLFxuICAgICAgdGhpcy5tYXBMYXllcnNTZWxlY3RvcixcbiAgICAgIHByZXBhcmVMYXllcnNUb1JlbmRlclxuICAgICk7XG4gICAgbGF5ZXJzRm9yRGVja1NlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgICB0aGlzLmxheWVyc1NlbGVjdG9yLFxuICAgICAgdGhpcy5sYXllckRhdGFTZWxlY3RvcixcbiAgICAgIHByZXBhcmVMYXllcnNGb3JEZWNrXG4gICAgKTtcbiAgICBmaWx0ZXJzU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5maWx0ZXJzO1xuICAgIHBvbHlnb25GaWx0ZXJzID0gY3JlYXRlU2VsZWN0b3IodGhpcy5maWx0ZXJzU2VsZWN0b3IsIGZpbHRlcnMgPT5cbiAgICAgIGZpbHRlcnMuZmlsdGVyKGYgPT4gZi50eXBlID09PSBGSUxURVJfVFlQRVMucG9seWdvbilcbiAgICApO1xuXG4gICAgbWFwYm94TGF5ZXJzU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvcihcbiAgICAgIHRoaXMubGF5ZXJzU2VsZWN0b3IsXG4gICAgICB0aGlzLmxheWVyRGF0YVNlbGVjdG9yLFxuICAgICAgdGhpcy5sYXllck9yZGVyU2VsZWN0b3IsXG4gICAgICB0aGlzLmxheWVyc1RvUmVuZGVyU2VsZWN0b3IsXG4gICAgICBnZW5lcmF0ZU1hcGJveExheWVyc1xuICAgICk7XG5cbiAgICAvKiBjb21wb25lbnQgcHJpdmF0ZSBmdW5jdGlvbnMgKi9cbiAgICBfb25DbG9zZU1hcFBvcG92ZXIgPSAoKSA9PiB7XG4gICAgICB0aGlzLnByb3BzLnZpc1N0YXRlQWN0aW9ucy5vbkxheWVyQ2xpY2sobnVsbCk7XG4gICAgfTtcblxuICAgIF9vbkxheWVyU2V0RG9tYWluID0gKGlkeCwgY29sb3JEb21haW4pID0+IHtcbiAgICAgIHRoaXMucHJvcHMudmlzU3RhdGVBY3Rpb25zLmxheWVyQ29uZmlnQ2hhbmdlKHRoaXMucHJvcHMubGF5ZXJzW2lkeF0sIHtcbiAgICAgICAgY29sb3JEb21haW5cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfaGFuZGxlTWFwVG9nZ2xlTGF5ZXIgPSBsYXllcklkID0+IHtcbiAgICAgIGNvbnN0IHtpbmRleDogbWFwSW5kZXggPSAwLCB2aXNTdGF0ZUFjdGlvbnN9ID0gdGhpcy5wcm9wcztcbiAgICAgIHZpc1N0YXRlQWN0aW9ucy50b2dnbGVMYXllckZvck1hcChtYXBJbmRleCwgbGF5ZXJJZCk7XG4gICAgfTtcblxuICAgIF9vbk1hcGJveFN0eWxlVXBkYXRlID0gKCkgPT4ge1xuICAgICAgLy8gZm9yY2UgcmVmcmVzaCBtYXBib3hnbCBsYXllcnNcbiAgICAgIHRoaXMucHJldmlvdXNMYXllcnMgPSB7fTtcbiAgICAgIHRoaXMuX3VwZGF0ZU1hcGJveExheWVycygpO1xuXG4gICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25NYXBTdHlsZUxvYWRlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnByb3BzLm9uTWFwU3R5bGVMb2FkZWQodGhpcy5fbWFwKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3NldE1hcGJveE1hcCA9IG1hcGJveCA9PiB7XG4gICAgICBpZiAoIXRoaXMuX21hcCAmJiBtYXBib3gpIHtcbiAgICAgICAgdGhpcy5fbWFwID0gbWFwYm94LmdldE1hcCgpO1xuICAgICAgICAvLyBpIG5vdGljZWQgaW4gY2VydGFpbiBjb250ZXh0IHdlIGRvbid0IGFjY2VzcyB0aGUgYWN0dWFsIG1hcCBlbGVtZW50XG4gICAgICAgIGlmICghdGhpcy5fbWFwKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGJpbmQgbWFwYm94Z2wgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgdGhpcy5fbWFwLm9uKE1BUEJPWEdMX1NUWUxFX1VQREFURSwgdGhpcy5fb25NYXBib3hTdHlsZVVwZGF0ZSk7XG5cbiAgICAgICAgdGhpcy5fbWFwLm9uKE1BUEJPWEdMX1JFTkRFUiwgKCkgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbk1hcFJlbmRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbk1hcFJlbmRlcih0aGlzLl9tYXApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnByb3BzLmdldE1hcGJveFJlZikge1xuICAgICAgICAvLyBUaGUgcGFyZW50IGNvbXBvbmVudCBjYW4gZ2FpbiBhY2Nlc3MgdG8gb3VyIE1hcGJveEdsTWFwIGJ5XG4gICAgICAgIC8vIHByb3ZpZGluZyB0aGlzIGNhbGxiYWNrLiBOb3RlIHRoYXQgJ21hcGJveCcgd2lsbCBiZSBudWxsIHdoZW4gdGhlXG4gICAgICAgIC8vIHJlZiBpcyB1bnNldCAoZS5nLiB3aGVuIGEgc3BsaXQgbWFwIGlzIGNsb3NlZCkuXG4gICAgICAgIHRoaXMucHJvcHMuZ2V0TWFwYm94UmVmKG1hcGJveCwgdGhpcy5wcm9wcy5pbmRleCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9vbkRlY2tJbml0aWFsaXplZChnbCkge1xuICAgICAgaWYgKHRoaXMucHJvcHMub25EZWNrSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkRlY2tJbml0aWFsaXplZCh0aGlzLl9kZWNrLCBnbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgX29uQmVmb3JlUmVuZGVyID0gKHtnbH0pID0+IHtcbiAgICAgIHNldExheWVyQmxlbmRpbmcoZ2wsIHRoaXMucHJvcHMubGF5ZXJCbGVuZGluZyk7XG4gICAgfTtcblxuICAgIF9vbkRlY2tFcnJvciA9IChlcnJvciwgbGF5ZXIpID0+IHtcbiAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGBBbiBlcnJvciBpbiBkZWNrLmdsOiAke2Vycm9yLm1lc3NhZ2V9IGluICR7bGF5ZXIuaWR9YDtcbiAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbklkID0gYCR7bGF5ZXIuaWR9LSR7ZXJyb3IubWVzc2FnZX1gO1xuXG4gICAgICAvLyBUaHJvdHRsZSBlcnJvciBub3RpZmljYXRpb25zLCBhcyBSZWFjdCBkb2Vzbid0IGxpa2UgdG9vIG1hbnkgc3RhdGUgY2hhbmdlcyBmcm9tIGhlcmUuXG4gICAgICB0aGlzLl9kZWNrR0xFcnJvcnNFbGFwc2VkID0gdGhpcy5fZGVja0dMRXJyb3JzRWxhcHNlZCB8fCB7fTtcbiAgICAgIGNvbnN0IGxhc3RTaG93biA9IHRoaXMuX2RlY2tHTEVycm9yc0VsYXBzZWRbbm90aWZpY2F0aW9uSWRdO1xuICAgICAgaWYgKCFsYXN0U2hvd24gfHwgbGFzdFNob3duIDwgRGF0ZS5ub3coKSAtIFRIUk9UVExFX05PVElGSUNBVElPTl9USU1FKSB7XG4gICAgICAgIHRoaXMuX2RlY2tHTEVycm9yc0VsYXBzZWRbbm90aWZpY2F0aW9uSWRdID0gRGF0ZS5ub3coKTtcblxuICAgICAgICAvLyBDcmVhdGUgbmV3IGVycm9yIG5vdGlmaWNhdGlvbiBvciB1cGRhdGUgZXhpc3Rpbmcgb25lIHdpdGggc2FtZSBpZC5cbiAgICAgICAgLy8gVXBkYXRlIGlzIHJlcXVpcmVkIHRvIHByZXNlcnZlIHRoZSBvcmRlciBvZiBub3RpZmljYXRpb25zIGFzIHRoZXkgcHJvYmFibHkgYXJlIGdvaW5nIHRvIFwianVtcFwiIGJhc2VkIG9uIG9yZGVyIG9mIGVycm9ycy5cbiAgICAgICAgY29uc3Qge3VpU3RhdGVBY3Rpb25zfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHVpU3RhdGVBY3Rpb25zLmFkZE5vdGlmaWNhdGlvbihcbiAgICAgICAgICBlcnJvck5vdGlmaWNhdGlvbih7XG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgICBpZDogbm90aWZpY2F0aW9uSWRcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKiBjb21wb25lbnQgcmVuZGVyIGZ1bmN0aW9ucyAqL1xuXG4gICAgLyogZXNsaW50LWRpc2FibGUgY29tcGxleGl0eSAqL1xuICAgIF9yZW5kZXJNYXBQb3BvdmVyKGxheWVyc1RvUmVuZGVyKSB7XG4gICAgICAvLyBUT0RPOiBtb3ZlIHRoaXMgaW50byByZWR1Y2VyIHNvIGl0IGNhbiBiZSB0ZXN0ZWRcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbWFwU3RhdGUsXG4gICAgICAgIGhvdmVySW5mbyxcbiAgICAgICAgY2xpY2tlZCxcbiAgICAgICAgZGF0YXNldHMsXG4gICAgICAgIGludGVyYWN0aW9uQ29uZmlnLFxuICAgICAgICBsYXllcnMsXG4gICAgICAgIG1vdXNlUG9zOiB7bW91c2VQb3NpdGlvbiwgY29vcmRpbmF0ZSwgcGlubmVkfVxuICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIGlmICghbW91c2VQb3NpdGlvbiB8fCAhaW50ZXJhY3Rpb25Db25maWcudG9vbHRpcCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbGF5ZXJIb3ZlclByb3AgPSBnZXRMYXllckhvdmVyUHJvcCh7XG4gICAgICAgIGludGVyYWN0aW9uQ29uZmlnLFxuICAgICAgICBob3ZlckluZm8sXG4gICAgICAgIGxheWVycyxcbiAgICAgICAgbGF5ZXJzVG9SZW5kZXIsXG4gICAgICAgIGRhdGFzZXRzXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgY29tcGFyZU1vZGUgPSBpbnRlcmFjdGlvbkNvbmZpZy50b29sdGlwLmNvbmZpZ1xuICAgICAgICA/IGludGVyYWN0aW9uQ29uZmlnLnRvb2x0aXAuY29uZmlnLmNvbXBhcmVNb2RlXG4gICAgICAgIDogZmFsc2U7XG5cbiAgICAgIGxldCBwaW5uZWRQb3NpdGlvbiA9IHt9O1xuICAgICAgbGV0IGxheWVyUGlubmVkUHJvcCA9IG51bGw7XG4gICAgICBpZiAocGlubmVkIHx8IGNsaWNrZWQpIHtcbiAgICAgICAgLy8gcHJvamVjdCBsbmdsYXQgdG8gc2NyZWVuIHNvIHRoYXQgdG9vbHRpcCBmb2xsb3dzIHRoZSBvYmplY3Qgb24gem9vbVxuICAgICAgICBjb25zdCB2aWV3cG9ydCA9IG5ldyBXZWJNZXJjYXRvclZpZXdwb3J0KG1hcFN0YXRlKTtcbiAgICAgICAgY29uc3QgbG5nTGF0ID0gY2xpY2tlZCA/IGNsaWNrZWQubG5nTGF0IDogcGlubmVkLmNvb3JkaW5hdGU7XG4gICAgICAgIHBpbm5lZFBvc2l0aW9uID0gdGhpcy5fZ2V0SG92ZXJYWSh2aWV3cG9ydCwgbG5nTGF0KTtcbiAgICAgICAgbGF5ZXJQaW5uZWRQcm9wID0gZ2V0TGF5ZXJIb3ZlclByb3Aoe1xuICAgICAgICAgIGludGVyYWN0aW9uQ29uZmlnLFxuICAgICAgICAgIGhvdmVySW5mbzogY2xpY2tlZCxcbiAgICAgICAgICBsYXllcnMsXG4gICAgICAgICAgbGF5ZXJzVG9SZW5kZXIsXG4gICAgICAgICAgZGF0YXNldHNcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChsYXllckhvdmVyUHJvcCAmJiBsYXllclBpbm5lZFByb3ApIHtcbiAgICAgICAgICBsYXllckhvdmVyUHJvcC5wcmltYXJ5RGF0YSA9IGxheWVyUGlubmVkUHJvcC5kYXRhO1xuICAgICAgICAgIGxheWVySG92ZXJQcm9wLmNvbXBhcmVUeXBlID0gaW50ZXJhY3Rpb25Db25maWcudG9vbHRpcC5jb25maWcuY29tcGFyZVR5cGU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgY29tbW9uUHJvcCA9IHtcbiAgICAgICAgb25DbG9zZTogdGhpcy5fb25DbG9zZU1hcFBvcG92ZXIsXG4gICAgICAgIHpvb206IG1hcFN0YXRlLnpvb20sXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5fZGVjayA/IHRoaXMuX2RlY2suY2FudmFzIDogdW5kZWZpbmVkXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8RXJyb3JCb3VuZGFyeT5cbiAgICAgICAgICB7bGF5ZXJQaW5uZWRQcm9wICYmIChcbiAgICAgICAgICAgIDxNYXBQb3BvdmVyXG4gICAgICAgICAgICAgIHsuLi5waW5uZWRQb3NpdGlvbn1cbiAgICAgICAgICAgICAgey4uLmNvbW1vblByb3B9XG4gICAgICAgICAgICAgIGxheWVySG92ZXJQcm9wPXtsYXllclBpbm5lZFByb3B9XG4gICAgICAgICAgICAgIGNvb3JkaW5hdGU9e2ludGVyYWN0aW9uQ29uZmlnLmNvb3JkaW5hdGUuZW5hYmxlZCAmJiAocGlubmVkIHx8IHt9KS5jb29yZGluYXRlfVxuICAgICAgICAgICAgICBmcm96ZW49e3RydWV9XG4gICAgICAgICAgICAgIGlzQmFzZT17Y29tcGFyZU1vZGV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2xheWVySG92ZXJQcm9wICYmICghbGF5ZXJQaW5uZWRQcm9wIHx8IGNvbXBhcmVNb2RlKSAmJiAoXG4gICAgICAgICAgICA8TWFwUG9wb3ZlclxuICAgICAgICAgICAgICB4PXttb3VzZVBvc2l0aW9uWzBdfVxuICAgICAgICAgICAgICB5PXttb3VzZVBvc2l0aW9uWzFdfVxuICAgICAgICAgICAgICB7Li4uY29tbW9uUHJvcH1cbiAgICAgICAgICAgICAgbGF5ZXJIb3ZlclByb3A9e2xheWVySG92ZXJQcm9wfVxuICAgICAgICAgICAgICBmcm96ZW49e2ZhbHNlfVxuICAgICAgICAgICAgICBjb29yZGluYXRlPXtpbnRlcmFjdGlvbkNvbmZpZy5jb29yZGluYXRlLmVuYWJsZWQgJiYgY29vcmRpbmF0ZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvKiBlc2xpbnQtZW5hYmxlIGNvbXBsZXhpdHkgKi9cblxuICAgIF9nZXRIb3ZlclhZKHZpZXdwb3J0LCBsbmdMYXQpIHtcbiAgICAgIGNvbnN0IHNjcmVlbkNvb3JkID0gIXZpZXdwb3J0IHx8ICFsbmdMYXQgPyBudWxsIDogdmlld3BvcnQucHJvamVjdChsbmdMYXQpO1xuICAgICAgcmV0dXJuIHNjcmVlbkNvb3JkICYmIHt4OiBzY3JlZW5Db29yZFswXSwgeTogc2NyZWVuQ29vcmRbMV19O1xuICAgIH1cblxuICAgIF9yZW5kZXJEZWNrT3ZlcmxheShsYXllcnNGb3JEZWNrKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIG1hcFN0YXRlLFxuICAgICAgICBtYXBTdHlsZSxcbiAgICAgICAgbGF5ZXJEYXRhLFxuICAgICAgICBsYXllck9yZGVyLFxuICAgICAgICBsYXllcnMsXG4gICAgICAgIHZpc1N0YXRlQWN0aW9ucyxcbiAgICAgICAgbWFwYm94QXBpQWNjZXNzVG9rZW4sXG4gICAgICAgIG1hcGJveEFwaVVybFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIC8vIGluaXRpYWxpc2UgbGF5ZXJzIGZyb20gcHJvcHMgaWYgZXhpc3RzXG4gICAgICBsZXQgZGVja0dsTGF5ZXJzID0gdGhpcy5wcm9wcy5kZWNrR2xQcm9wcz8ubGF5ZXJzIHx8IFtdO1xuXG4gICAgICAvLyB3YWl0IHVudGlsIGRhdGEgaXMgcmVhZHkgYmVmb3JlIHJlbmRlciBkYXRhIGxheWVyc1xuICAgICAgaWYgKGxheWVyRGF0YSAmJiBsYXllckRhdGEubGVuZ3RoKSB7XG4gICAgICAgIC8vIGxhc3QgbGF5ZXIgcmVuZGVyIGZpcnN0XG4gICAgICAgIGNvbnN0IGRhdGFMYXllcnMgPSBsYXllck9yZGVyXG4gICAgICAgICAgLnNsaWNlKClcbiAgICAgICAgICAucmV2ZXJzZSgpXG4gICAgICAgICAgLmZpbHRlcihpZHggPT4gbGF5ZXJzRm9yRGVja1tsYXllcnNbaWR4XS5pZF0pXG4gICAgICAgICAgLnJlZHVjZSgob3ZlcmxheXMsIGlkeCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGF5ZXJDYWxsYmFja3MgPSB7XG4gICAgICAgICAgICAgIG9uU2V0TGF5ZXJEb21haW46IHZhbCA9PiB0aGlzLl9vbkxheWVyU2V0RG9tYWluKGlkeCwgdmFsKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGxheWVyT3ZlcmxheSA9IHJlbmRlckRlY2tHbExheWVyKHRoaXMucHJvcHMsIGxheWVyQ2FsbGJhY2tzLCBpZHgpO1xuICAgICAgICAgICAgcmV0dXJuIG92ZXJsYXlzLmNvbmNhdChsYXllck92ZXJsYXkgfHwgW10pO1xuICAgICAgICAgIH0sIFtdKTtcbiAgICAgICAgZGVja0dsTGF5ZXJzID0gZGVja0dsTGF5ZXJzLmNvbmNhdChkYXRhTGF5ZXJzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hcFN0eWxlLnZpc2libGVMYXllckdyb3Vwc1snM2QgYnVpbGRpbmcnXSkge1xuICAgICAgICBkZWNrR2xMYXllcnMucHVzaChcbiAgICAgICAgICBuZXcgVGhyZWVEQnVpbGRpbmdMYXllcih7XG4gICAgICAgICAgICBpZDogJ19rZXBsZXJnbF8zZC1idWlsZGluZycsXG4gICAgICAgICAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbixcbiAgICAgICAgICAgIG1hcGJveEFwaVVybCxcbiAgICAgICAgICAgIHRocmVlREJ1aWxkaW5nQ29sb3I6IG1hcFN0eWxlLnRocmVlREJ1aWxkaW5nQ29sb3IsXG4gICAgICAgICAgICB1cGRhdGVUcmlnZ2Vyczoge1xuICAgICAgICAgICAgICBnZXRGaWxsQ29sb3I6IG1hcFN0eWxlLnRocmVlREJ1aWxkaW5nQ29sb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8RGVja0dMXG4gICAgICAgICAgey4uLnRoaXMucHJvcHMuZGVja0dsUHJvcHN9XG4gICAgICAgICAgdmlld1N0YXRlPXttYXBTdGF0ZX1cbiAgICAgICAgICBpZD1cImRlZmF1bHQtZGVja2dsLW92ZXJsYXlcIlxuICAgICAgICAgIGxheWVycz17ZGVja0dsTGF5ZXJzfVxuICAgICAgICAgIG9uQmVmb3JlUmVuZGVyPXt0aGlzLl9vbkJlZm9yZVJlbmRlcn1cbiAgICAgICAgICBvbkhvdmVyPXt2aXNTdGF0ZUFjdGlvbnMub25MYXllckhvdmVyfVxuICAgICAgICAgIG9uQ2xpY2s9e3Zpc1N0YXRlQWN0aW9ucy5vbkxheWVyQ2xpY2t9XG4gICAgICAgICAgb25FcnJvcj17dGhpcy5fb25EZWNrRXJyb3J9XG4gICAgICAgICAgcmVmPXtjb21wID0+IHtcbiAgICAgICAgICAgIGlmIChjb21wICYmIGNvbXAuZGVjayAmJiAhdGhpcy5fZGVjaykge1xuICAgICAgICAgICAgICB0aGlzLl9kZWNrID0gY29tcC5kZWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH19XG4gICAgICAgICAgb25XZWJHTEluaXRpYWxpemVkPXtnbCA9PiB0aGlzLl9vbkRlY2tJbml0aWFsaXplZChnbCl9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cblxuICAgIF91cGRhdGVNYXBib3hMYXllcnMoKSB7XG4gICAgICBjb25zdCBtYXBib3hMYXllcnMgPSB0aGlzLm1hcGJveExheWVyc1NlbGVjdG9yKHRoaXMucHJvcHMpO1xuICAgICAgaWYgKCFPYmplY3Qua2V5cyhtYXBib3hMYXllcnMpLmxlbmd0aCAmJiAhT2JqZWN0LmtleXModGhpcy5wcmV2aW91c0xheWVycykubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdXBkYXRlTWFwYm94TGF5ZXJzKHRoaXMuX21hcCwgbWFwYm94TGF5ZXJzLCB0aGlzLnByZXZpb3VzTGF5ZXJzKTtcblxuICAgICAgdGhpcy5wcmV2aW91c0xheWVycyA9IG1hcGJveExheWVycztcbiAgICB9XG5cbiAgICBfcmVuZGVyTWFwYm94T3ZlcmxheXMoKSB7XG4gICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5pc1N0eWxlTG9hZGVkKCkpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlTWFwYm94TGF5ZXJzKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgX29uVmlld3BvcnRDaGFuZ2UgPSB2aWV3U3RhdGUgPT4ge1xuICAgICAgY29uc3Qge3dpZHRoLCBoZWlnaHQsIC4uLnJlc3RWaWV3U3RhdGV9ID0gdmlld1N0YXRlO1xuICAgICAgY29uc3Qge3ByaW1hcnl9ID0gdGhpcy5wcm9wcztcbiAgICAgIC8vIHJlYWN0LW1hcC1nbCBzZW5kcyAwLDAgZGltZW5zaW9ucyBkdXJpbmcgaW5pdGlhbGl6YXRpb25cbiAgICAgIC8vIGFmdGVyIHdlIGhhdmUgcmVjZWl2ZWQgcHJvcGVyIGRpbWVuc2lvbnMgZnJvbSBvYnNlcnZlRGltZW5zaW9uc1xuICAgICAgY29uc3QgbmV4dCA9IHtcbiAgICAgICAgLi4uKHdpZHRoID4gMCAmJiBoZWlnaHQgPiAwID8gdmlld1N0YXRlIDogcmVzdFZpZXdTdGF0ZSksXG4gICAgICAgIC8vIGVuYWJsaW5nIHRyYW5zaXRpb24gaW4gdHdvIG1hcHMgbWF5IGxlYWQgdG8gZW5kbGVzcyB1cGRhdGUgbG9vcHNcbiAgICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiBwcmltYXJ5ID8gVFJBTlNJVElPTl9EVVJBVElPTiA6IDBcbiAgICAgIH07XG4gICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25WaWV3U3RhdGVDaGFuZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblZpZXdTdGF0ZUNoYW5nZShuZXh0KTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJvcHMubWFwU3RhdGVBY3Rpb25zLnVwZGF0ZU1hcChuZXh0KTtcbiAgICB9O1xuXG4gICAgX3RvZ2dsZU1hcENvbnRyb2wgPSBwYW5lbElkID0+IHtcbiAgICAgIGNvbnN0IHtpbmRleCwgdWlTdGF0ZUFjdGlvbnN9ID0gdGhpcy5wcm9wcztcblxuICAgICAgdWlTdGF0ZUFjdGlvbnMudG9nZ2xlTWFwQ29udHJvbChwYW5lbElkLCBpbmRleCk7XG4gICAgfTtcblxuICAgIC8qIGVzbGludC1kaXNhYmxlIGNvbXBsZXhpdHkgKi9cbiAgICBfcmVuZGVyTWFwKCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBtYXBTdGF0ZSxcbiAgICAgICAgbWFwU3R5bGUsXG4gICAgICAgIG1hcFN0YXRlQWN0aW9ucyxcbiAgICAgICAgbGF5ZXJzLFxuICAgICAgICBNYXBDb21wb25lbnQsXG4gICAgICAgIGRhdGFzZXRzLFxuICAgICAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbixcbiAgICAgICAgbWFwYm94QXBpVXJsLFxuICAgICAgICBtYXBDb250cm9scyxcbiAgICAgICAgaXNFeHBvcnQsXG4gICAgICAgIGxvY2FsZSxcbiAgICAgICAgdWlTdGF0ZUFjdGlvbnMsXG4gICAgICAgIHZpc1N0YXRlQWN0aW9ucyxcbiAgICAgICAgaW50ZXJhY3Rpb25Db25maWcsXG4gICAgICAgIGVkaXRvcixcbiAgICAgICAgaW5kZXgsXG4gICAgICAgIHByaW1hcnlcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICBjb25zdCBsYXllcnNUb1JlbmRlciA9IHRoaXMubGF5ZXJzVG9SZW5kZXJTZWxlY3Rvcih0aGlzLnByb3BzKTtcbiAgICAgIGNvbnN0IGxheWVyc0ZvckRlY2sgPSB0aGlzLmxheWVyc0ZvckRlY2tTZWxlY3Rvcih0aGlzLnByb3BzKTtcblxuICAgICAgY29uc3QgbWFwUHJvcHMgPSB7XG4gICAgICAgIC4uLm1hcFN0YXRlLFxuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiB0cnVlLFxuICAgICAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbixcbiAgICAgICAgbWFwYm94QXBpVXJsLFxuICAgICAgICBvblZpZXdwb3J0Q2hhbmdlOiB0aGlzLl9vblZpZXdwb3J0Q2hhbmdlLFxuICAgICAgICB0cmFuc2Zvcm1SZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBpc0VkaXQgPSAobWFwQ29udHJvbHMubWFwRHJhdyB8fCB7fSkuYWN0aXZlO1xuXG4gICAgICBjb25zdCBoYXNHZW9jb2RlckxheWVyID0gbGF5ZXJzLmZpbmQobCA9PiBsLmlkID09PSBHRU9DT0RFUl9MQVlFUl9JRCk7XG4gICAgICBjb25zdCBpc1NwbGl0ID0gQm9vbGVhbihtYXBTdGF0ZS5pc1NwbGl0KTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICA8TWFwQ29udHJvbFxuICAgICAgICAgICAgZGF0YXNldHM9e2RhdGFzZXRzfVxuICAgICAgICAgICAgZHJhZ1JvdGF0ZT17bWFwU3RhdGUuZHJhZ1JvdGF0ZX1cbiAgICAgICAgICAgIGlzU3BsaXQ9e2lzU3BsaXR9XG4gICAgICAgICAgICBwcmltYXJ5PXtwcmltYXJ5fVxuICAgICAgICAgICAgaXNFeHBvcnQ9e2lzRXhwb3J0fVxuICAgICAgICAgICAgbGF5ZXJzPXtsYXllcnN9XG4gICAgICAgICAgICBsYXllcnNUb1JlbmRlcj17bGF5ZXJzVG9SZW5kZXJ9XG4gICAgICAgICAgICBtYXBJbmRleD17aW5kZXh9XG4gICAgICAgICAgICBtYXBDb250cm9scz17bWFwQ29udHJvbHN9XG4gICAgICAgICAgICByZWFkT25seT17dGhpcy5wcm9wcy5yZWFkT25seX1cbiAgICAgICAgICAgIHNjYWxlPXttYXBTdGF0ZS5zY2FsZSB8fCAxfVxuICAgICAgICAgICAgdG9wPXtpbnRlcmFjdGlvbkNvbmZpZy5nZW9jb2RlciAmJiBpbnRlcmFjdGlvbkNvbmZpZy5nZW9jb2Rlci5lbmFibGVkID8gNTIgOiAwfVxuICAgICAgICAgICAgZWRpdG9yPXtlZGl0b3J9XG4gICAgICAgICAgICBsb2NhbGU9e2xvY2FsZX1cbiAgICAgICAgICAgIG9uVG9nZ2xlUGVyc3BlY3RpdmU9e21hcFN0YXRlQWN0aW9ucy50b2dnbGVQZXJzcGVjdGl2ZX1cbiAgICAgICAgICAgIG9uVG9nZ2xlU3BsaXRNYXA9e21hcFN0YXRlQWN0aW9ucy50b2dnbGVTcGxpdE1hcH1cbiAgICAgICAgICAgIG9uTWFwVG9nZ2xlTGF5ZXI9e3RoaXMuX2hhbmRsZU1hcFRvZ2dsZUxheWVyfVxuICAgICAgICAgICAgb25Ub2dnbGVNYXBDb250cm9sPXt0aGlzLl90b2dnbGVNYXBDb250cm9sfVxuICAgICAgICAgICAgb25TZXRFZGl0b3JNb2RlPXt2aXNTdGF0ZUFjdGlvbnMuc2V0RWRpdG9yTW9kZX1cbiAgICAgICAgICAgIG9uU2V0TG9jYWxlPXt1aVN0YXRlQWN0aW9ucy5zZXRMb2NhbGV9XG4gICAgICAgICAgICBvblRvZ2dsZUVkaXRvclZpc2liaWxpdHk9e3Zpc1N0YXRlQWN0aW9ucy50b2dnbGVFZGl0b3JWaXNpYmlsaXR5fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPE1hcENvbXBvbmVudFxuICAgICAgICAgICAgey4uLm1hcFByb3BzfVxuICAgICAgICAgICAga2V5PVwiYm90dG9tXCJcbiAgICAgICAgICAgIHJlZj17dGhpcy5fc2V0TWFwYm94TWFwfVxuICAgICAgICAgICAgbWFwU3R5bGU9e21hcFN0eWxlLmJvdHRvbU1hcFN0eWxlfVxuICAgICAgICAgICAgZ2V0Q3Vyc29yPXt0aGlzLnByb3BzLmhvdmVySW5mbyA/ICgpID0+ICdwb2ludGVyJyA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIG9uTW91c2VNb3ZlPXt0aGlzLnByb3BzLnZpc1N0YXRlQWN0aW9ucy5vbk1vdXNlTW92ZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGhpcy5fcmVuZGVyRGVja092ZXJsYXkobGF5ZXJzRm9yRGVjayl9XG4gICAgICAgICAgICB7dGhpcy5fcmVuZGVyTWFwYm94T3ZlcmxheXMoKX1cbiAgICAgICAgICAgIDxFZGl0b3JcbiAgICAgICAgICAgICAgaW5kZXg9e2luZGV4fVxuICAgICAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgICAgIGVkaXRvcj17ZWRpdG9yfVxuICAgICAgICAgICAgICBmaWx0ZXJzPXt0aGlzLnBvbHlnb25GaWx0ZXJzKHRoaXMucHJvcHMpfVxuICAgICAgICAgICAgICBpc0VuYWJsZWQ9e2lzRWRpdH1cbiAgICAgICAgICAgICAgbGF5ZXJzPXtsYXllcnN9XG4gICAgICAgICAgICAgIGxheWVyc1RvUmVuZGVyPXtsYXllcnNUb1JlbmRlcn1cbiAgICAgICAgICAgICAgb25EZWxldGVGZWF0dXJlPXt2aXNTdGF0ZUFjdGlvbnMuZGVsZXRlRmVhdHVyZX1cbiAgICAgICAgICAgICAgb25TZWxlY3Q9e3Zpc1N0YXRlQWN0aW9ucy5zZXRTZWxlY3RlZEZlYXR1cmV9XG4gICAgICAgICAgICAgIG9uVXBkYXRlPXt2aXNTdGF0ZUFjdGlvbnMuc2V0RmVhdHVyZXN9XG4gICAgICAgICAgICAgIG9uVG9nZ2xlUG9seWdvbkZpbHRlcj17dmlzU3RhdGVBY3Rpb25zLnNldFBvbHlnb25GaWx0ZXJMYXllcn1cbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBwb2ludGVyRXZlbnRzOiBpc0VkaXQgPyAnYWxsJyA6ICdub25lJyxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBlZGl0b3IudmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZSdcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9NYXBDb21wb25lbnQ+XG4gICAgICAgICAge21hcFN0eWxlLnRvcE1hcFN0eWxlIHx8IGhhc0dlb2NvZGVyTGF5ZXIgPyAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXtNQVBfU1RZTEUudG9wfT5cbiAgICAgICAgICAgICAgPE1hcENvbXBvbmVudCB7Li4ubWFwUHJvcHN9IGtleT1cInRvcFwiIG1hcFN0eWxlPXttYXBTdHlsZS50b3BNYXBTdHlsZX0+XG4gICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlckRlY2tPdmVybGF5KHtbR0VPQ09ERVJfTEFZRVJfSURdOiB0cnVlfSl9XG4gICAgICAgICAgICAgIDwvTWFwQ29tcG9uZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAge3RoaXMuX3JlbmRlck1hcFBvcG92ZXIobGF5ZXJzVG9SZW5kZXIpfVxuICAgICAgICAgIHshaXNTcGxpdCB8fCBpbmRleCA9PT0gMSA/IDxBdHRyaWJ1dGlvbiAvPiA6IG51bGx9XG4gICAgICAgIDwvPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7bWFwU3RhdGUsIG1hcFN0eWxlfSA9IHRoaXMucHJvcHM7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U3R5bGVkTWFwQ29udGFpbmVyIHJlZj17dGhpcy5fcmVmfSBzdHlsZT17TUFQX1NUWUxFLmNvbnRhaW5lcn0gZ2xvYmU9e21hcFN0YXRlLmdsb2JlfT5cbiAgICAgICAgICB7bWFwU3R5bGUuYm90dG9tTWFwU3R5bGUgJiYgdGhpcy5fcmVuZGVyTWFwKCl9XG4gICAgICAgIDwvU3R5bGVkTWFwQ29udGFpbmVyPlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBNYXBDb250YWluZXIuZGlzcGxheU5hbWUgPSAnTWFwQ29udGFpbmVyJztcblxuICByZXR1cm4gTWFwQ29udGFpbmVyO1xufVxuIl19