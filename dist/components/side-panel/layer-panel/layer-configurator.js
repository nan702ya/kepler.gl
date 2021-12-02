"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = LayerConfiguratorFactory;
exports.ChannelByValueSelectorFactory = ChannelByValueSelectorFactory;
exports.AggregationTypeSelector = exports.AggrScaleSelector = exports.LayerColorRangeSelector = exports.ArcLayerColorSelector = exports.LayerColorSelector = exports.HowToButton = exports.getLayerChannelConfigProps = exports.getVisConfiguratorProps = exports.getLayerConfiguratorProps = exports.getLayerDataset = exports.getLayerFields = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _localization = require("../../../localization");

var _styledComponents2 = require("../../common/styled-components");

var _itemSelector = _interopRequireDefault(require("../../common/item-selector/item-selector"));

var _visConfigByFieldSelector = _interopRequireDefault(require("./vis-config-by-field-selector"));

var _layerColumnConfig = _interopRequireDefault(require("./layer-column-config"));

var _layerTypeSelector = _interopRequireDefault(require("./layer-type-selector"));

var _dimensionScaleSelector = _interopRequireDefault(require("./dimension-scale-selector"));

var _colorSelector = _interopRequireDefault(require("./color-selector"));

var _sourceDataSelector = _interopRequireDefault(require("../common/source-data-selector"));

var _visConfigSwitch = _interopRequireDefault(require("./vis-config-switch"));

var _visConfigSlider = _interopRequireDefault(require("./vis-config-slider"));

var _layerConfigGroup = _interopRequireWildcard(require("./layer-config-group"));

var _textLabelPanel = _interopRequireDefault(require("./text-label-panel"));

var _utils = require("../../../utils/utils");

var _defaultSettings = require("../../../constants/default-settings");

var _types = require("../../../layers/types");

var _templateObject, _templateObject2, _templateObject3;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var StyledLayerConfigurator = _styledComponents["default"].div.attrs({
  className: 'layer-panel__config'
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  position: relative;\n  margin-top: ", ";\n  padding: ", ";\n  border-left: ", " dashed\n    ", ";\n"])), function (props) {
  return props.theme.layerConfiguratorMargin;
}, function (props) {
  return props.theme.layerConfiguratorPadding;
}, function (props) {
  return props.theme.layerConfiguratorBorder;
}, function (props) {
  return props.theme.layerConfiguratorBorderColor;
});

var StyledLayerVisualConfigurator = _styledComponents["default"].div.attrs({
  className: 'layer-panel__config__visualC-config'
})(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n  margin-top: 12px;\n"])));

var getLayerFields = function getLayerFields(datasets, layer) {
  return layer.config && datasets[layer.config.dataId] ? datasets[layer.config.dataId].fields : [];
};

exports.getLayerFields = getLayerFields;

var getLayerDataset = function getLayerDataset(datasets, layer) {
  return layer.config && datasets[layer.config.dataId] ? datasets[layer.config.dataId] : null;
};

exports.getLayerDataset = getLayerDataset;

var getLayerConfiguratorProps = function getLayerConfiguratorProps(props) {
  return {
    layer: props.layer,
    fields: getLayerFields(props.datasets, props.layer),
    onChange: props.updateLayerConfig,
    setColorUI: props.updateLayerColorUI
  };
};

exports.getLayerConfiguratorProps = getLayerConfiguratorProps;

var getVisConfiguratorProps = function getVisConfiguratorProps(props) {
  return {
    layer: props.layer,
    fields: getLayerFields(props.datasets, props.layer),
    onChange: props.updateLayerVisConfig,
    setColorUI: props.updateLayerColorUI
  };
};

exports.getVisConfiguratorProps = getVisConfiguratorProps;

var getLayerChannelConfigProps = function getLayerChannelConfigProps(props) {
  return {
    layer: props.layer,
    fields: getLayerFields(props.datasets, props.layer),
    onChange: props.updateLayerVisualChannelConfig
  };
};

exports.getLayerChannelConfigProps = getLayerChannelConfigProps;
LayerConfiguratorFactory.deps = [_sourceDataSelector["default"], _visConfigSlider["default"], _textLabelPanel["default"], _layerConfigGroup["default"], ChannelByValueSelectorFactory, _layerColumnConfig["default"], _layerTypeSelector["default"], _visConfigSwitch["default"]];

function LayerConfiguratorFactory(SourceDataSelector, VisConfigSlider, TextLabelPanel, LayerConfigGroup, ChannelByValueSelector, LayerColumnConfig, LayerTypeSelector, VisConfigSwitch) {
  var LayerConfigurator = /*#__PURE__*/function (_Component) {
    (0, _inherits2["default"])(LayerConfigurator, _Component);

    var _super = _createSuper(LayerConfigurator);

    function LayerConfigurator() {
      (0, _classCallCheck2["default"])(this, LayerConfigurator);
      return _super.apply(this, arguments);
    }

    (0, _createClass2["default"])(LayerConfigurator, [{
      key: "_renderPointLayerConfig",
      value: function _renderPointLayerConfig(props) {
        return this._renderScatterplotLayerConfig(props);
      }
    }, {
      key: "_renderIconLayerConfig",
      value: function _renderIconLayerConfig(props) {
        return this._renderScatterplotLayerConfig(props);
      }
    }, {
      key: "_renderScatterplotLayerConfig",
      value: function _renderScatterplotLayerConfig(_ref) {
        var layer = _ref.layer,
            visConfiguratorProps = _ref.visConfiguratorProps,
            layerChannelConfigProps = _ref.layerChannelConfigProps,
            layerConfiguratorProps = _ref.layerConfiguratorProps;
        return /*#__PURE__*/_react["default"].createElement(StyledLayerVisualConfigurator, null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, layer.visConfigSettings.filled || {
          label: 'layer.color'
        }, visConfiguratorProps, {
          collapsible: true
        }), layer.config.colorField ? /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, visConfiguratorProps) : /*#__PURE__*/_react["default"].createElement(LayerColorSelector, layerConfiguratorProps), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.color
        }, layerChannelConfigProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.opacity, visConfiguratorProps)))), layer.type === _types.LAYER_TYPES.point ? /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, layer.visConfigSettings.outline, visConfiguratorProps, {
          collapsible: true
        }), layer.config.strokeColorField ? /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, (0, _extends2["default"])({}, visConfiguratorProps, {
          property: "strokeColorRange"
        })) : /*#__PURE__*/_react["default"].createElement(LayerColorSelector, (0, _extends2["default"])({}, visConfiguratorProps, {
          selectedColor: layer.config.visConfig.strokeColor,
          property: "strokeColor"
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.strokeColor
        }, layerChannelConfigProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.thickness, visConfiguratorProps, {
          disabled: !layer.config.visConfig.outline
        })))) : null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.radius',
          collapsible: true
        }, !layer.config.sizeField ? /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.radius, visConfiguratorProps, {
          label: false,
          disabled: Boolean(layer.config.sizeField)
        })) : /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.radiusRange, visConfiguratorProps, {
          label: false,
          disabled: !layer.config.sizeField || layer.config.visConfig.fixedRadius
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.size
        }, layerChannelConfigProps)), layer.config.sizeField ? /*#__PURE__*/_react["default"].createElement(VisConfigSwitch, (0, _extends2["default"])({}, layer.visConfigSettings.fixedRadius, visConfiguratorProps)) : null)), /*#__PURE__*/_react["default"].createElement(TextLabelPanel, {
          fields: visConfiguratorProps.fields,
          updateLayerTextLabel: this.props.updateLayerTextLabel,
          textLabel: layer.config.textLabel,
          colorPalette: visConfiguratorProps.colorPalette,
          setColorPaletteUI: visConfiguratorProps.setColorPaletteUI
        }));
      }
    }, {
      key: "_renderClusterLayerConfig",
      value: function _renderClusterLayerConfig(_ref2) {
        var layer = _ref2.layer,
            visConfiguratorProps = _ref2.visConfiguratorProps,
            layerConfiguratorProps = _ref2.layerConfiguratorProps,
            layerChannelConfigProps = _ref2.layerChannelConfigProps;
        return /*#__PURE__*/_react["default"].createElement(StyledLayerVisualConfigurator, null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.color',
          collapsible: true
        }, /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, visConfiguratorProps), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(AggrScaleSelector, (0, _extends2["default"])({}, layerConfiguratorProps, {
          channel: layer.visualChannels.color
        })), /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.color
        }, layerChannelConfigProps)), layer.visConfigSettings.colorAggregation.condition(layer.config) ? /*#__PURE__*/_react["default"].createElement(AggregationTypeSelector, (0, _extends2["default"])({}, layer.visConfigSettings.colorAggregation, layerChannelConfigProps, {
          channel: layer.visualChannels.color
        })) : null, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.opacity, visConfiguratorProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.radius',
          collapsible: true
        }, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.clusterRadius, visConfiguratorProps)), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.radiusRange, visConfiguratorProps)))));
      }
    }, {
      key: "_renderHeatmapLayerConfig",
      value: function _renderHeatmapLayerConfig(_ref3) {
        var layer = _ref3.layer,
            visConfiguratorProps = _ref3.visConfiguratorProps,
            layerConfiguratorProps = _ref3.layerConfiguratorProps,
            layerChannelConfigProps = _ref3.layerChannelConfigProps;
        return /*#__PURE__*/_react["default"].createElement(StyledLayerVisualConfigurator, null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.color',
          collapsible: true
        }, /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, visConfiguratorProps), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.opacity, visConfiguratorProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.radius'
        }, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.radius, visConfiguratorProps, {
          label: false
        }))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.weight'
        }, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.weight
        }, layerChannelConfigProps))));
      }
    }, {
      key: "_renderGridLayerConfig",
      value: function _renderGridLayerConfig(props) {
        return this._renderAggregationLayerConfig(props);
      }
    }, {
      key: "_renderHexagonLayerConfig",
      value: function _renderHexagonLayerConfig(props) {
        return this._renderAggregationLayerConfig(props);
      }
    }, {
      key: "_renderAggregationLayerConfig",
      value: function _renderAggregationLayerConfig(_ref4) {
        var layer = _ref4.layer,
            visConfiguratorProps = _ref4.visConfiguratorProps,
            layerConfiguratorProps = _ref4.layerConfiguratorProps,
            layerChannelConfigProps = _ref4.layerChannelConfigProps;
        var config = layer.config;
        var enable3d = config.visConfig.enable3d;
        var elevationByDescription = 'layer.elevationByDescription';
        var colorByDescription = 'layer.colorByDescription';
        return /*#__PURE__*/_react["default"].createElement(StyledLayerVisualConfigurator, null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.color',
          collapsible: true
        }, /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, visConfiguratorProps), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(AggrScaleSelector, (0, _extends2["default"])({}, layerConfiguratorProps, {
          channel: layer.visualChannels.color
        })), /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.color
        }, layerChannelConfigProps)), layer.visConfigSettings.colorAggregation.condition(layer.config) ? /*#__PURE__*/_react["default"].createElement(AggregationTypeSelector, (0, _extends2["default"])({}, layer.visConfigSettings.colorAggregation, layerChannelConfigProps, {
          description: colorByDescription,
          channel: layer.visualChannels.color
        })) : null, layer.visConfigSettings.percentile && layer.visConfigSettings.percentile.condition(layer.config) ? /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.percentile, visConfiguratorProps)) : null, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.opacity, visConfiguratorProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.radius',
          collapsible: true
        }, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.worldUnitSize, visConfiguratorProps)), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.coverage, visConfiguratorProps)))), layer.visConfigSettings.enable3d ? /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, layer.visConfigSettings.enable3d, visConfiguratorProps, {
          collapsible: true
        }), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.elevationScale, visConfiguratorProps, {
          label: "layerVisConfigs.heightMultiplier"
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({}, layerChannelConfigProps, {
          channel: layer.visualChannels.size,
          description: elevationByDescription,
          disabled: !enable3d
        })), /*#__PURE__*/_react["default"].createElement(AggrScaleSelector, (0, _extends2["default"])({}, layerConfiguratorProps, {
          channel: layer.visualChannels.size
        })), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.sizeRange, visConfiguratorProps, {
          label: "layerVisConfigs.heightRange"
        })), /*#__PURE__*/_react["default"].createElement(VisConfigSwitch, (0, _extends2["default"])({}, layer.visConfigSettings.enableElevationZoomFactor, visConfiguratorProps, {
          label: "layerVisConfigs.enableHeightZoomFactor"
        })), layer.visConfigSettings.sizeAggregation.condition(layer.config) ? /*#__PURE__*/_react["default"].createElement(AggregationTypeSelector, (0, _extends2["default"])({}, layer.visConfigSettings.sizeAggregation, layerChannelConfigProps, {
          channel: layer.visualChannels.size
        })) : null, layer.visConfigSettings.elevationPercentile.condition(layer.config) ? /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.elevationPercentile, visConfiguratorProps)) : null)) : null);
      } // TODO: Shan move these into layer class

    }, {
      key: "_renderHexagonIdLayerConfig",
      value: function _renderHexagonIdLayerConfig(_ref5) {
        var layer = _ref5.layer,
            visConfiguratorProps = _ref5.visConfiguratorProps,
            layerConfiguratorProps = _ref5.layerConfiguratorProps,
            layerChannelConfigProps = _ref5.layerChannelConfigProps;
        return /*#__PURE__*/_react["default"].createElement(StyledLayerVisualConfigurator, null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.color',
          collapsible: true
        }, layer.config.colorField ? /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, visConfiguratorProps) : /*#__PURE__*/_react["default"].createElement(LayerColorSelector, layerConfiguratorProps), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.color
        }, layerChannelConfigProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.opacity, visConfiguratorProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.coverage',
          collapsible: true
        }, !layer.config.coverageField ? /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.coverage, visConfiguratorProps, {
          label: false
        })) : /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.coverageRange, visConfiguratorProps, {
          label: false
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.coverage
        }, layerChannelConfigProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, layer.visConfigSettings.enable3d, visConfiguratorProps, {
          collapsible: true
        }), /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.size
        }, layerChannelConfigProps)), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.elevationScale, visConfiguratorProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.sizeRange, visConfiguratorProps, {
          label: "layerVisConfigs.heightRange"
        })), /*#__PURE__*/_react["default"].createElement(VisConfigSwitch, (0, _extends2["default"])({}, layer.visConfigSettings.enableElevationZoomFactor, visConfiguratorProps)))));
      }
    }, {
      key: "_renderArcLayerConfig",
      value: function _renderArcLayerConfig(args) {
        return this._renderLineLayerConfig(args);
      }
    }, {
      key: "_renderLineLayerConfig",
      value: function _renderLineLayerConfig(_ref6) {
        var layer = _ref6.layer,
            visConfiguratorProps = _ref6.visConfiguratorProps,
            layerConfiguratorProps = _ref6.layerConfiguratorProps,
            layerChannelConfigProps = _ref6.layerChannelConfigProps;
        return /*#__PURE__*/_react["default"].createElement(StyledLayerVisualConfigurator, null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.color',
          collapsible: true
        }, layer.config.colorField ? /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, visConfiguratorProps) : /*#__PURE__*/_react["default"].createElement(ArcLayerColorSelector, {
          layer: layer,
          setColorUI: layerConfiguratorProps.setColorUI,
          onChangeConfig: layerConfiguratorProps.onChange,
          onChangeVisConfig: visConfiguratorProps.onChange
        }), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.sourceColor
        }, layerChannelConfigProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.opacity, visConfiguratorProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.stroke',
          collapsible: true
        }, layer.config.sizeField ? /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.sizeRange, visConfiguratorProps, {
          disabled: !layer.config.sizeField,
          label: false
        })) : /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.thickness, visConfiguratorProps, {
          label: false
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.size
        }, layerChannelConfigProps)))), layer.visConfigSettings.elevationScale ? /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: "layerVisConfigs.elevationScale",
          collapsible: true
        }, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.elevationScale, visConfiguratorProps))) : null);
      }
    }, {
      key: "_renderTripLayerConfig",
      value: function _renderTripLayerConfig(_ref7) {
        var layer = _ref7.layer,
            visConfiguratorProps = _ref7.visConfiguratorProps,
            layerConfiguratorProps = _ref7.layerConfiguratorProps,
            layerChannelConfigProps = _ref7.layerChannelConfigProps;
        var _layer$meta$featureTy = layer.meta.featureTypes,
            featureTypes = _layer$meta$featureTy === void 0 ? {} : _layer$meta$featureTy;
        return /*#__PURE__*/_react["default"].createElement(StyledLayerVisualConfigurator, null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.color',
          collapsible: true
        }, layer.config.colorField ? /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, visConfiguratorProps) : /*#__PURE__*/_react["default"].createElement(LayerColorSelector, layerConfiguratorProps), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.color
        }, layerChannelConfigProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.opacity, visConfiguratorProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, visConfiguratorProps, {
          label: "layer.strokeWidth",
          collapsible: true
        }), layer.config.sizeField ? /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.sizeRange, visConfiguratorProps, {
          label: false
        })) : /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.thickness, visConfiguratorProps, {
          label: false
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.size
        }, layerChannelConfigProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, visConfiguratorProps, featureTypes.polygon ? layer.visConfigSettings.stroked : {}, {
          label: "layer.trailLength",
          description: "layer.trailLengthDescription"
        }), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.trailLength, visConfiguratorProps, {
          label: false
        }))));
      }
    }, {
      key: "_renderSkLayerConfig",
      value: function _renderSkLayerConfig(_ref8) {
        var layer = _ref8.layer,
            visConfiguratorProps = _ref8.visConfiguratorProps,
            layerConfiguratorProps = _ref8.layerConfiguratorProps,
            layerChannelConfigProps = _ref8.layerChannelConfigProps;
        var colorByDescription = 'layer.colorByDescription';
        var visConfig = layer.config.visConfig;
        return /*#__PURE__*/_react["default"].createElement(StyledLayerVisualConfigurator, null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, layer.visConfigSettings.filled, visConfiguratorProps, {
          label: 'layer.fillColor',
          collapsible: true
        }), layer.config.colorField ? /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, visConfiguratorProps) : /*#__PURE__*/_react["default"].createElement(LayerColorSelector, layerConfiguratorProps), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.color
        }, layerChannelConfigProps)), layer.visConfigSettings.colorAggregation.condition(layer.config) ? /*#__PURE__*/_react["default"].createElement(AggregationTypeSelector, (0, _extends2["default"])({}, layer.visConfigSettings.colorAggregation, layerChannelConfigProps, {
          description: colorByDescription,
          channel: layer.visualChannels.color
        })) : null, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.opacity, visConfiguratorProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, layer.visConfigSettings.stroked, visConfiguratorProps, {
          label: "layer.strokeColor"
        }), /*#__PURE__*/_react["default"].createElement(LayerColorSelector, (0, _extends2["default"])({}, visConfiguratorProps, {
          selectedColor: layer.config.visConfig.strokeColor,
          property: "strokeColor"
        })), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.strokeOpacity, visConfiguratorProps))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, visConfiguratorProps, layer.visConfigSettings.stroked, {
          label: "layer.strokeWidth"
        }), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.thickness, visConfiguratorProps, {
          label: false
        }))), visConfig.enable3d ? /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, layer.visConfigSettings.enable3d, visConfiguratorProps, {
          collapsible: true
        }), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({}, layerChannelConfigProps, {
          channel: layer.visualChannels.size
        })), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.sizeRange, visConfiguratorProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSwitch, (0, _extends2["default"])({}, layer.visConfigSettings.enableElevationZoomFactor, visConfiguratorProps)), layer.visConfigSettings.sizeAggregation.condition(layer.config) ? /*#__PURE__*/_react["default"].createElement(AggregationTypeSelector, (0, _extends2["default"])({}, layer.visConfigSettings.sizeAggregation, layerChannelConfigProps, {
          channel: layer.visualChannels.size
        })) : null, /*#__PURE__*/_react["default"].createElement(VisConfigSwitch, (0, _extends2["default"])({}, visConfiguratorProps, layer.visConfigSettings.wireframe)))) : null);
      }
    }, {
      key: "_renderGeojsonLayerConfig",
      value: function _renderGeojsonLayerConfig(_ref9) {
        var layer = _ref9.layer,
            visConfiguratorProps = _ref9.visConfiguratorProps,
            layerConfiguratorProps = _ref9.layerConfiguratorProps,
            layerChannelConfigProps = _ref9.layerChannelConfigProps;
        var _layer$meta$featureTy2 = layer.meta.featureTypes,
            featureTypes = _layer$meta$featureTy2 === void 0 ? {} : _layer$meta$featureTy2,
            visConfig = layer.config.visConfig;
        return /*#__PURE__*/_react["default"].createElement(StyledLayerVisualConfigurator, null, featureTypes.polygon || featureTypes.point ? /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, layer.visConfigSettings.filled, visConfiguratorProps, {
          label: "layer.fillColor",
          collapsible: true
        }), layer.config.colorField ? /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, visConfiguratorProps) : /*#__PURE__*/_react["default"].createElement(LayerColorSelector, layerConfiguratorProps), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.color
        }, layerChannelConfigProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.opacity, visConfiguratorProps)))) : null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, layer.visConfigSettings.stroked, visConfiguratorProps, {
          label: "layer.strokeColor",
          collapsible: true
        }), layer.config.strokeColorField ? /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, (0, _extends2["default"])({}, visConfiguratorProps, {
          property: "strokeColorRange"
        })) : /*#__PURE__*/_react["default"].createElement(LayerColorSelector, (0, _extends2["default"])({}, visConfiguratorProps, {
          selectedColor: layer.config.visConfig.strokeColor,
          property: "strokeColor"
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.strokeColor
        }, layerChannelConfigProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.strokeOpacity, visConfiguratorProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, visConfiguratorProps, featureTypes.polygon ? layer.visConfigSettings.stroked : {}, {
          label: "layer.strokeWidth",
          collapsible: true
        }), layer.config.sizeField ? /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.sizeRange, visConfiguratorProps, {
          label: false
        })) : /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.thickness, visConfiguratorProps, {
          label: false
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.size
        }, layerChannelConfigProps)))), featureTypes.polygon ? /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, visConfiguratorProps, layer.visConfigSettings.enable3d, {
          disabled: !visConfig.filled,
          collapsible: true
        }), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.elevationScale, visConfiguratorProps, {
          label: false
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.height
        }, layerChannelConfigProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSwitch, (0, _extends2["default"])({}, layer.visConfigSettings.enableElevationZoomFactor, visConfiguratorProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSwitch, (0, _extends2["default"])({}, visConfiguratorProps, layer.visConfigSettings.wireframe)))) : null, featureTypes.point ? /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.radius',
          collapsible: true
        }, !layer.config.radiusField ? /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.radius, visConfiguratorProps, {
          label: false,
          disabled: Boolean(layer.config.radiusField)
        })) : /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.radiusRange, visConfiguratorProps, {
          label: false,
          disabled: !layer.config.radiusField
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.radius
        }, layerChannelConfigProps)))) : null);
      }
    }, {
      key: "_render3DLayerConfig",
      value: function _render3DLayerConfig(_ref10) {
        var layer = _ref10.layer,
            visConfiguratorProps = _ref10.visConfiguratorProps;
        return /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.3DModel',
          collapsible: true
        }, /*#__PURE__*/_react["default"].createElement(_styledComponents2.Input, {
          type: "file",
          accept: ".glb,.gltf",
          onChange: function onChange(e) {
            if (e.target.files && e.target.files[0]) {
              var url = URL.createObjectURL(e.target.files[0]);
              visConfiguratorProps.onChange({
                scenegraph: url
              });
            }
          }
        })), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.3DModelOptions',
          collapsible: true
        }, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.sizeScale, visConfiguratorProps, {
          disabled: false
        })), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.angleX, visConfiguratorProps, {
          disabled: false
        })), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.angleY, visConfiguratorProps, {
          disabled: false
        })), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.angleZ, visConfiguratorProps, {
          disabled: false
        }))));
      }
    }, {
      key: "_renderS2LayerConfig",
      value: function _renderS2LayerConfig(_ref11) {
        var layer = _ref11.layer,
            visConfiguratorProps = _ref11.visConfiguratorProps,
            layerConfiguratorProps = _ref11.layerConfiguratorProps,
            layerChannelConfigProps = _ref11.layerChannelConfigProps;
        var visConfig = layer.config.visConfig;
        return /*#__PURE__*/_react["default"].createElement(StyledLayerVisualConfigurator, null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, layer.visConfigSettings.filled, visConfiguratorProps, {
          label: "layer.fillColor",
          collapsible: true
        }), layer.config.colorField ? /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, visConfiguratorProps) : /*#__PURE__*/_react["default"].createElement(LayerColorSelector, layerConfiguratorProps), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.color
        }, layerChannelConfigProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.opacity, visConfiguratorProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, layer.visConfigSettings.stroked, visConfiguratorProps, {
          label: "layer.strokeColor",
          collapsible: true
        }), layer.config.strokeColorField ? /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, (0, _extends2["default"])({}, visConfiguratorProps, {
          property: "strokeColorRange"
        })) : /*#__PURE__*/_react["default"].createElement(LayerColorSelector, (0, _extends2["default"])({}, visConfiguratorProps, {
          selectedColor: layer.config.visConfig.strokeColor,
          property: "strokeColor"
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.strokeColor
        }, layerChannelConfigProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, visConfiguratorProps, {
          label: "layer.strokeWidth",
          collapsible: true
        }), layer.config.sizeField ? /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.sizeRange, visConfiguratorProps, {
          label: false
        })) : /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.thickness, visConfiguratorProps, {
          label: false
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.size
        }, layerChannelConfigProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, visConfiguratorProps, layer.visConfigSettings.enable3d, {
          disabled: !visConfig.filled,
          collapsible: true
        }), /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.height
        }, layerChannelConfigProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.elevationScale, visConfiguratorProps, {
          label: "layerVisConfigs.elevationScale"
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.heightRange, visConfiguratorProps, {
          label: "layerVisConfigs.heightRange"
        })), /*#__PURE__*/_react["default"].createElement(VisConfigSwitch, (0, _extends2["default"])({}, layer.visConfigSettings.enableElevationZoomFactor, visConfiguratorProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSwitch, (0, _extends2["default"])({}, visConfiguratorProps, layer.visConfigSettings.wireframe)))));
      }
    }, {
      key: "render",
      value: function render() {
        var _this = this;

        var _this$props = this.props,
            layer = _this$props.layer,
            datasets = _this$props.datasets,
            updateLayerConfig = _this$props.updateLayerConfig,
            layerTypeOptions = _this$props.layerTypeOptions,
            updateLayerType = _this$props.updateLayerType;

        var _ref12 = layer.config.dataId ? datasets[layer.config.dataId] : {},
            _ref12$fields = _ref12.fields,
            fields = _ref12$fields === void 0 ? [] : _ref12$fields,
            _ref12$fieldPairs = _ref12.fieldPairs,
            fieldPairs = _ref12$fieldPairs === void 0 ? undefined : _ref12$fieldPairs;

        var config = layer.config;
        var visConfiguratorProps = getVisConfiguratorProps(this.props);
        var layerConfiguratorProps = getLayerConfiguratorProps(this.props);
        var layerChannelConfigProps = getLayerChannelConfigProps(this.props);
        var dataset = getLayerDataset(datasets, layer);
        var renderTemplate = layer.type && "_render".concat((0, _utils.capitalizeFirstLetter)(layer.type), "LayerConfig");
        return /*#__PURE__*/_react["default"].createElement(StyledLayerConfigurator, null, layer.layerInfoModal ? /*#__PURE__*/_react["default"].createElement(HowToButton, {
          onClick: function onClick() {
            return _this.props.openModal(layer.layerInfoModal);
          }
        }) : null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.basic',
          collapsible: true,
          expanded: !layer.hasAllColumns()
        }, /*#__PURE__*/_react["default"].createElement(LayerTypeSelector, {
          datasets: datasets,
          layer: layer,
          layerTypeOptions: layerTypeOptions,
          onSelect: updateLayerType
        }), Object.keys(datasets).length > 1 && /*#__PURE__*/_react["default"].createElement(SourceDataSelector, {
          datasets: datasets,
          id: layer.id,
          dataId: config.dataId,
          onSelect: function onSelect(value) {
            return updateLayerConfig({
              dataId: value
            });
          }
        }), /*#__PURE__*/_react["default"].createElement(LayerColumnConfig, {
          columnPairs: layer.columnPairs,
          columns: layer.config.columns,
          assignColumnPairs: layer.assignColumnPairs.bind(layer),
          assignColumn: layer.assignColumn.bind(layer),
          columnLabels: layer.columnLabels,
          fields: fields,
          fieldPairs: fieldPairs,
          updateLayerConfig: updateLayerConfig,
          updateLayerType: this.props.updateLayerType
        })), this[renderTemplate] && this[renderTemplate]({
          layer: layer,
          dataset: dataset,
          visConfiguratorProps: visConfiguratorProps,
          layerChannelConfigProps: layerChannelConfigProps,
          layerConfiguratorProps: layerConfiguratorProps
        }));
      }
    }]);
    return LayerConfigurator;
  }(_react.Component);

  (0, _defineProperty2["default"])(LayerConfigurator, "propTypes", {
    layer: _propTypes["default"].object.isRequired,
    datasets: _propTypes["default"].object.isRequired,
    layerTypeOptions: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    openModal: _propTypes["default"].func.isRequired,
    updateLayerConfig: _propTypes["default"].func.isRequired,
    updateLayerType: _propTypes["default"].func.isRequired,
    updateLayerVisConfig: _propTypes["default"].func.isRequired,
    updateLayerVisualChannelConfig: _propTypes["default"].func.isRequired,
    updateLayerColorUI: _propTypes["default"].func.isRequired
  });
  return LayerConfigurator;
}
/*
 * Componentize config component into pure functional components
 */


var StyledHowToButton = _styledComponents["default"].div(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2["default"])(["\n  position: absolute;\n  right: 12px;\n  top: -4px;\n"])));

var HowToButton = function HowToButton(_ref13) {
  var onClick = _ref13.onClick;
  return /*#__PURE__*/_react["default"].createElement(StyledHowToButton, null, /*#__PURE__*/_react["default"].createElement(_styledComponents2.Button, {
    link: true,
    small: true,
    onClick: onClick
  }, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
    id: 'layerConfiguration.howTo'
  })));
};

exports.HowToButton = HowToButton;

var LayerColorSelector = function LayerColorSelector(_ref14) {
  var layer = _ref14.layer,
      onChange = _ref14.onChange,
      label = _ref14.label,
      selectedColor = _ref14.selectedColor,
      _ref14$property = _ref14.property,
      property = _ref14$property === void 0 ? 'color' : _ref14$property,
      _setColorUI = _ref14.setColorUI;
  return /*#__PURE__*/_react["default"].createElement(_styledComponents2.SidePanelSection, null, /*#__PURE__*/_react["default"].createElement(_colorSelector["default"], {
    colorSets: [{
      selectedColor: selectedColor || layer.config.color,
      setColor: function setColor(rgbValue) {
        return onChange((0, _defineProperty2["default"])({}, property, rgbValue));
      }
    }],
    colorUI: layer.config.colorUI[property],
    setColorUI: function setColorUI(newConfig) {
      return _setColorUI(property, newConfig);
    }
  }));
};

exports.LayerColorSelector = LayerColorSelector;

var ArcLayerColorSelector = function ArcLayerColorSelector(_ref15) {
  var layer = _ref15.layer,
      onChangeConfig = _ref15.onChangeConfig,
      onChangeVisConfig = _ref15.onChangeVisConfig,
      _ref15$property = _ref15.property,
      property = _ref15$property === void 0 ? 'color' : _ref15$property,
      _setColorUI2 = _ref15.setColorUI;
  return /*#__PURE__*/_react["default"].createElement(_styledComponents2.SidePanelSection, null, /*#__PURE__*/_react["default"].createElement(_colorSelector["default"], {
    colorSets: [{
      selectedColor: layer.config.color,
      setColor: function setColor(rgbValue) {
        return onChangeConfig({
          color: rgbValue
        });
      },
      label: 'Source'
    }, {
      selectedColor: layer.config.visConfig.targetColor || layer.config.color,
      setColor: function setColor(rgbValue) {
        return onChangeVisConfig({
          targetColor: rgbValue
        });
      },
      label: 'Target'
    }],
    colorUI: layer.config.colorUI[property],
    setColorUI: function setColorUI(newConfig) {
      return _setColorUI2(property, newConfig);
    }
  }));
};

exports.ArcLayerColorSelector = ArcLayerColorSelector;

var LayerColorRangeSelector = function LayerColorRangeSelector(_ref16) {
  var layer = _ref16.layer,
      onChange = _ref16.onChange,
      _ref16$property = _ref16.property,
      property = _ref16$property === void 0 ? 'colorRange' : _ref16$property,
      _setColorUI3 = _ref16.setColorUI;
  return /*#__PURE__*/_react["default"].createElement(_styledComponents2.SidePanelSection, null, /*#__PURE__*/_react["default"].createElement(_colorSelector["default"], {
    colorSets: [{
      selectedColor: layer.config.visConfig[property],
      isRange: true,
      setColor: function setColor(colorRange) {
        return onChange((0, _defineProperty2["default"])({}, property, colorRange));
      }
    }],
    colorUI: layer.config.colorUI[property],
    setColorUI: function setColorUI(newConfig) {
      return _setColorUI3(property, newConfig);
    }
  }));
};

exports.LayerColorRangeSelector = LayerColorRangeSelector;
ChannelByValueSelectorFactory.deps = [_visConfigByFieldSelector["default"]];

function ChannelByValueSelectorFactory(VisConfigByFieldSelector) {
  var ChannelByValueSelector = function ChannelByValueSelector(_ref17) {
    var layer = _ref17.layer,
        channel = _ref17.channel,
        onChange = _ref17.onChange,
        fields = _ref17.fields,
        description = _ref17.description;
    var channelScaleType = channel.channelScaleType,
        domain = channel.domain,
        field = channel.field,
        key = channel.key,
        property = channel.property,
        range = channel.range,
        scale = channel.scale,
        defaultMeasure = channel.defaultMeasure,
        supportedFieldTypes = channel.supportedFieldTypes;
    var channelSupportedFieldTypes = supportedFieldTypes || _defaultSettings.CHANNEL_SCALE_SUPPORTED_FIELDS[channelScaleType];
    var supportedFields = fields.filter(function (_ref18) {
      var type = _ref18.type;
      return channelSupportedFieldTypes.includes(type);
    });
    var scaleOptions = layer.getScaleOptions(channel.key);
    var showScale = !layer.isAggregated && layer.config[scale] && scaleOptions.length > 1;
    var defaultDescription = 'layerConfiguration.defaultDescription';
    return /*#__PURE__*/_react["default"].createElement(VisConfigByFieldSelector, {
      channel: channel.key,
      description: description || defaultDescription,
      domain: layer.config[domain],
      fields: supportedFields,
      id: layer.id,
      key: "".concat(key, "-channel-selector"),
      property: property,
      placeholder: defaultMeasure || 'placeholder.selectField',
      range: layer.config.visConfig[range],
      scaleOptions: scaleOptions,
      scaleType: scale ? layer.config[scale] : null,
      selectedField: layer.config[field],
      showScale: showScale,
      updateField: function updateField(val) {
        return onChange((0, _defineProperty2["default"])({}, field, val), key);
      },
      updateScale: function updateScale(val) {
        return onChange((0, _defineProperty2["default"])({}, scale, val), key);
      }
    });
  };

  return ChannelByValueSelector;
}

var AggrScaleSelector = function AggrScaleSelector(_ref19) {
  var channel = _ref19.channel,
      layer = _ref19.layer,
      onChange = _ref19.onChange;
  var scale = channel.scale,
      key = channel.key;
  var scaleOptions = layer.getScaleOptions(key);
  return Array.isArray(scaleOptions) && scaleOptions.length > 1 ? /*#__PURE__*/_react["default"].createElement(_dimensionScaleSelector["default"], {
    label: "".concat(key, " Scale"),
    options: scaleOptions,
    scaleType: layer.config[scale],
    onSelect: function onSelect(val) {
      return onChange((0, _defineProperty2["default"])({}, scale, val), key);
    }
  }) : null;
};

exports.AggrScaleSelector = AggrScaleSelector;

var AggregationTypeSelector = function AggregationTypeSelector(_ref20) {
  var layer = _ref20.layer,
      channel = _ref20.channel,
      _onChange6 = _ref20.onChange;
  var field = channel.field,
      aggregation = channel.aggregation,
      key = channel.key;
  var selectedField = layer.config[field];
  var visConfig = layer.config.visConfig; // aggregation should only be selectable when field is selected

  var aggregationOptions = layer.getAggregationOptions(key);
  return /*#__PURE__*/_react["default"].createElement(_styledComponents2.SidePanelSection, null, /*#__PURE__*/_react["default"].createElement(_styledComponents2.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
    id: 'layer.aggregateBy',
    values: {
      field: selectedField.name
    }
  })), /*#__PURE__*/_react["default"].createElement(_itemSelector["default"], {
    selectedItems: visConfig[aggregation],
    options: aggregationOptions,
    multiSelect: false,
    searchable: false,
    onChange: function onChange(value) {
      return _onChange6({
        visConfig: _objectSpread(_objectSpread({}, layer.config.visConfig), {}, (0, _defineProperty2["default"])({}, aggregation, value))
      }, channel.key);
    }
  }));
};
/* eslint-enable max-params */


exports.AggregationTypeSelector = AggregationTypeSelector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvbGF5ZXItY29uZmlndXJhdG9yLmpzIl0sIm5hbWVzIjpbIlN0eWxlZExheWVyQ29uZmlndXJhdG9yIiwic3R5bGVkIiwiZGl2IiwiYXR0cnMiLCJjbGFzc05hbWUiLCJwcm9wcyIsInRoZW1lIiwibGF5ZXJDb25maWd1cmF0b3JNYXJnaW4iLCJsYXllckNvbmZpZ3VyYXRvclBhZGRpbmciLCJsYXllckNvbmZpZ3VyYXRvckJvcmRlciIsImxheWVyQ29uZmlndXJhdG9yQm9yZGVyQ29sb3IiLCJTdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvciIsImdldExheWVyRmllbGRzIiwiZGF0YXNldHMiLCJsYXllciIsImNvbmZpZyIsImRhdGFJZCIsImZpZWxkcyIsImdldExheWVyRGF0YXNldCIsImdldExheWVyQ29uZmlndXJhdG9yUHJvcHMiLCJvbkNoYW5nZSIsInVwZGF0ZUxheWVyQ29uZmlnIiwic2V0Q29sb3JVSSIsInVwZGF0ZUxheWVyQ29sb3JVSSIsImdldFZpc0NvbmZpZ3VyYXRvclByb3BzIiwidXBkYXRlTGF5ZXJWaXNDb25maWciLCJnZXRMYXllckNoYW5uZWxDb25maWdQcm9wcyIsInVwZGF0ZUxheWVyVmlzdWFsQ2hhbm5lbENvbmZpZyIsIkxheWVyQ29uZmlndXJhdG9yRmFjdG9yeSIsImRlcHMiLCJTb3VyY2VEYXRhU2VsZWN0b3JGYWN0b3J5IiwiVmlzQ29uZmlnU2xpZGVyRmFjdG9yeSIsIlRleHRMYWJlbFBhbmVsRmFjdG9yeSIsIkxheWVyQ29uZmlnR3JvdXBGYWN0b3J5IiwiQ2hhbm5lbEJ5VmFsdWVTZWxlY3RvckZhY3RvcnkiLCJMYXllckNvbHVtbkNvbmZpZ0ZhY3RvcnkiLCJMYXllclR5cGVTZWxlY3RvckZhY3RvcnkiLCJWaXNDb25maWdTd2l0Y2hGYWN0b3J5IiwiU291cmNlRGF0YVNlbGVjdG9yIiwiVmlzQ29uZmlnU2xpZGVyIiwiVGV4dExhYmVsUGFuZWwiLCJMYXllckNvbmZpZ0dyb3VwIiwiQ2hhbm5lbEJ5VmFsdWVTZWxlY3RvciIsIkxheWVyQ29sdW1uQ29uZmlnIiwiTGF5ZXJUeXBlU2VsZWN0b3IiLCJWaXNDb25maWdTd2l0Y2giLCJMYXllckNvbmZpZ3VyYXRvciIsIl9yZW5kZXJTY2F0dGVycGxvdExheWVyQ29uZmlnIiwidmlzQ29uZmlndXJhdG9yUHJvcHMiLCJsYXllckNoYW5uZWxDb25maWdQcm9wcyIsImxheWVyQ29uZmlndXJhdG9yUHJvcHMiLCJ2aXNDb25maWdTZXR0aW5ncyIsImZpbGxlZCIsImxhYmVsIiwiY29sb3JGaWVsZCIsInZpc3VhbENoYW5uZWxzIiwiY29sb3IiLCJvcGFjaXR5IiwidHlwZSIsIkxBWUVSX1RZUEVTIiwicG9pbnQiLCJvdXRsaW5lIiwic3Ryb2tlQ29sb3JGaWVsZCIsInZpc0NvbmZpZyIsInN0cm9rZUNvbG9yIiwidGhpY2tuZXNzIiwic2l6ZUZpZWxkIiwicmFkaXVzIiwiQm9vbGVhbiIsInJhZGl1c1JhbmdlIiwiZml4ZWRSYWRpdXMiLCJzaXplIiwidXBkYXRlTGF5ZXJUZXh0TGFiZWwiLCJ0ZXh0TGFiZWwiLCJjb2xvclBhbGV0dGUiLCJzZXRDb2xvclBhbGV0dGVVSSIsImNvbG9yQWdncmVnYXRpb24iLCJjb25kaXRpb24iLCJjbHVzdGVyUmFkaXVzIiwid2VpZ2h0IiwiX3JlbmRlckFnZ3JlZ2F0aW9uTGF5ZXJDb25maWciLCJlbmFibGUzZCIsImVsZXZhdGlvbkJ5RGVzY3JpcHRpb24iLCJjb2xvckJ5RGVzY3JpcHRpb24iLCJwZXJjZW50aWxlIiwid29ybGRVbml0U2l6ZSIsImNvdmVyYWdlIiwiZWxldmF0aW9uU2NhbGUiLCJzaXplUmFuZ2UiLCJlbmFibGVFbGV2YXRpb25ab29tRmFjdG9yIiwic2l6ZUFnZ3JlZ2F0aW9uIiwiZWxldmF0aW9uUGVyY2VudGlsZSIsImNvdmVyYWdlRmllbGQiLCJjb3ZlcmFnZVJhbmdlIiwiYXJncyIsIl9yZW5kZXJMaW5lTGF5ZXJDb25maWciLCJzb3VyY2VDb2xvciIsIm1ldGEiLCJmZWF0dXJlVHlwZXMiLCJwb2x5Z29uIiwic3Ryb2tlZCIsInRyYWlsTGVuZ3RoIiwic3Ryb2tlT3BhY2l0eSIsIndpcmVmcmFtZSIsImhlaWdodCIsInJhZGl1c0ZpZWxkIiwiZSIsInRhcmdldCIsImZpbGVzIiwidXJsIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwic2NlbmVncmFwaCIsInNpemVTY2FsZSIsImFuZ2xlWCIsImFuZ2xlWSIsImFuZ2xlWiIsImhlaWdodFJhbmdlIiwibGF5ZXJUeXBlT3B0aW9ucyIsInVwZGF0ZUxheWVyVHlwZSIsImZpZWxkUGFpcnMiLCJ1bmRlZmluZWQiLCJkYXRhc2V0IiwicmVuZGVyVGVtcGxhdGUiLCJsYXllckluZm9Nb2RhbCIsIm9wZW5Nb2RhbCIsImhhc0FsbENvbHVtbnMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiaWQiLCJ2YWx1ZSIsImNvbHVtblBhaXJzIiwiY29sdW1ucyIsImFzc2lnbkNvbHVtblBhaXJzIiwiYmluZCIsImFzc2lnbkNvbHVtbiIsImNvbHVtbkxhYmVscyIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJhcnJheU9mIiwiYW55IiwiZnVuYyIsIlN0eWxlZEhvd1RvQnV0dG9uIiwiSG93VG9CdXR0b24iLCJvbkNsaWNrIiwiTGF5ZXJDb2xvclNlbGVjdG9yIiwic2VsZWN0ZWRDb2xvciIsInByb3BlcnR5Iiwic2V0Q29sb3IiLCJyZ2JWYWx1ZSIsImNvbG9yVUkiLCJuZXdDb25maWciLCJBcmNMYXllckNvbG9yU2VsZWN0b3IiLCJvbkNoYW5nZUNvbmZpZyIsIm9uQ2hhbmdlVmlzQ29uZmlnIiwidGFyZ2V0Q29sb3IiLCJMYXllckNvbG9yUmFuZ2VTZWxlY3RvciIsImlzUmFuZ2UiLCJjb2xvclJhbmdlIiwiVmlzQ29uZmlnQnlGaWVsZFNlbGVjdG9yRmFjdG9yeSIsIlZpc0NvbmZpZ0J5RmllbGRTZWxlY3RvciIsImNoYW5uZWwiLCJkZXNjcmlwdGlvbiIsImNoYW5uZWxTY2FsZVR5cGUiLCJkb21haW4iLCJmaWVsZCIsImtleSIsInJhbmdlIiwic2NhbGUiLCJkZWZhdWx0TWVhc3VyZSIsInN1cHBvcnRlZEZpZWxkVHlwZXMiLCJjaGFubmVsU3VwcG9ydGVkRmllbGRUeXBlcyIsIkNIQU5ORUxfU0NBTEVfU1VQUE9SVEVEX0ZJRUxEUyIsInN1cHBvcnRlZEZpZWxkcyIsImZpbHRlciIsImluY2x1ZGVzIiwic2NhbGVPcHRpb25zIiwiZ2V0U2NhbGVPcHRpb25zIiwic2hvd1NjYWxlIiwiaXNBZ2dyZWdhdGVkIiwiZGVmYXVsdERlc2NyaXB0aW9uIiwidmFsIiwiQWdnclNjYWxlU2VsZWN0b3IiLCJBcnJheSIsImlzQXJyYXkiLCJBZ2dyZWdhdGlvblR5cGVTZWxlY3RvciIsImFnZ3JlZ2F0aW9uIiwic2VsZWN0ZWRGaWVsZCIsImFnZ3JlZ2F0aW9uT3B0aW9ucyIsImdldEFnZ3JlZ2F0aW9uT3B0aW9ucyIsIm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSx1QkFBdUIsR0FBR0MsNkJBQU9DLEdBQVAsQ0FBV0MsS0FBWCxDQUFpQjtBQUMvQ0MsRUFBQUEsU0FBUyxFQUFFO0FBRG9DLENBQWpCLENBQUgsOExBSWIsVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZQyx1QkFBaEI7QUFBQSxDQUpRLEVBS2hCLFVBQUFGLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUUsd0JBQWhCO0FBQUEsQ0FMVyxFQU1aLFVBQUFILEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUcsdUJBQWhCO0FBQUEsQ0FO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RCxDQWhDTTtBQWlDUCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbi8qIGVzbGludC1kaXNhYmxlIGNvbXBsZXhpdHkgKi9cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgRnJhZ21lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7Rm9ybWF0dGVkTWVzc2FnZX0gZnJvbSAnbG9jYWxpemF0aW9uJztcblxuaW1wb3J0IHtCdXR0b24sIElucHV0LCBQYW5lbExhYmVsLCBTaWRlUGFuZWxTZWN0aW9ufSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgSXRlbVNlbGVjdG9yIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2l0ZW0tc2VsZWN0b3IvaXRlbS1zZWxlY3Rvcic7XG5cbmltcG9ydCBWaXNDb25maWdCeUZpZWxkU2VsZWN0b3JGYWN0b3J5IGZyb20gJy4vdmlzLWNvbmZpZy1ieS1maWVsZC1zZWxlY3Rvcic7XG5pbXBvcnQgTGF5ZXJDb2x1bW5Db25maWdGYWN0b3J5IGZyb20gJy4vbGF5ZXItY29sdW1uLWNvbmZpZyc7XG5pbXBvcnQgTGF5ZXJUeXBlU2VsZWN0b3JGYWN0b3J5IGZyb20gJy4vbGF5ZXItdHlwZS1zZWxlY3Rvcic7XG5pbXBvcnQgRGltZW5zaW9uU2NhbGVTZWxlY3RvciBmcm9tICcuL2RpbWVuc2lvbi1zY2FsZS1zZWxlY3Rvcic7XG5pbXBvcnQgQ29sb3JTZWxlY3RvciBmcm9tICcuL2NvbG9yLXNlbGVjdG9yJztcbmltcG9ydCBTb3VyY2VEYXRhU2VsZWN0b3JGYWN0b3J5IGZyb20gJ2NvbXBvbmVudHMvc2lkZS1wYW5lbC9jb21tb24vc291cmNlLWRhdGEtc2VsZWN0b3InO1xuaW1wb3J0IFZpc0NvbmZpZ1N3aXRjaEZhY3RvcnkgZnJvbSAnLi92aXMtY29uZmlnLXN3aXRjaCc7XG5pbXBvcnQgVmlzQ29uZmlnU2xpZGVyRmFjdG9yeSBmcm9tICcuL3Zpcy1jb25maWctc2xpZGVyJztcbmltcG9ydCBMYXllckNvbmZpZ0dyb3VwRmFjdG9yeSwge0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50fSBmcm9tICcuL2xheWVyLWNvbmZpZy1ncm91cCc7XG5pbXBvcnQgVGV4dExhYmVsUGFuZWxGYWN0b3J5IGZyb20gJy4vdGV4dC1sYWJlbC1wYW5lbCc7XG5cbmltcG9ydCB7Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyfSBmcm9tICd1dGlscy91dGlscyc7XG5cbmltcG9ydCB7Q0hBTk5FTF9TQ0FMRV9TVVBQT1JURURfRklFTERTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge0xBWUVSX1RZUEVTfSBmcm9tICdsYXllcnMvdHlwZXMnO1xuXG5jb25zdCBTdHlsZWRMYXllckNvbmZpZ3VyYXRvciA9IHN0eWxlZC5kaXYuYXR0cnMoe1xuICBjbGFzc05hbWU6ICdsYXllci1wYW5lbF9fY29uZmlnJ1xufSlgXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luLXRvcDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5sYXllckNvbmZpZ3VyYXRvck1hcmdpbn07XG4gIHBhZGRpbmc6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGF5ZXJDb25maWd1cmF0b3JQYWRkaW5nfTtcbiAgYm9yZGVyLWxlZnQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGF5ZXJDb25maWd1cmF0b3JCb3JkZXJ9IGRhc2hlZFxuICAgICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGF5ZXJDb25maWd1cmF0b3JCb3JkZXJDb2xvcn07XG5gO1xuXG5jb25zdCBTdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvciA9IHN0eWxlZC5kaXYuYXR0cnMoe1xuICBjbGFzc05hbWU6ICdsYXllci1wYW5lbF9fY29uZmlnX192aXN1YWxDLWNvbmZpZydcbn0pYFxuICBtYXJnaW4tdG9wOiAxMnB4O1xuYDtcblxuZXhwb3J0IGNvbnN0IGdldExheWVyRmllbGRzID0gKGRhdGFzZXRzLCBsYXllcikgPT5cbiAgbGF5ZXIuY29uZmlnICYmIGRhdGFzZXRzW2xheWVyLmNvbmZpZy5kYXRhSWRdID8gZGF0YXNldHNbbGF5ZXIuY29uZmlnLmRhdGFJZF0uZmllbGRzIDogW107XG5cbmV4cG9ydCBjb25zdCBnZXRMYXllckRhdGFzZXQgPSAoZGF0YXNldHMsIGxheWVyKSA9PlxuICBsYXllci5jb25maWcgJiYgZGF0YXNldHNbbGF5ZXIuY29uZmlnLmRhdGFJZF0gPyBkYXRhc2V0c1tsYXllci5jb25maWcuZGF0YUlkXSA6IG51bGw7XG5cbmV4cG9ydCBjb25zdCBnZXRMYXllckNvbmZpZ3VyYXRvclByb3BzID0gcHJvcHMgPT4gKHtcbiAgbGF5ZXI6IHByb3BzLmxheWVyLFxuICBmaWVsZHM6IGdldExheWVyRmllbGRzKHByb3BzLmRhdGFzZXRzLCBwcm9wcy5sYXllciksXG4gIG9uQ2hhbmdlOiBwcm9wcy51cGRhdGVMYXllckNvbmZpZyxcbiAgc2V0Q29sb3JVSTogcHJvcHMudXBkYXRlTGF5ZXJDb2xvclVJXG59KTtcblxuZXhwb3J0IGNvbnN0IGdldFZpc0NvbmZpZ3VyYXRvclByb3BzID0gcHJvcHMgPT4gKHtcbiAgbGF5ZXI6IHByb3BzLmxheWVyLFxuICBmaWVsZHM6IGdldExheWVyRmllbGRzKHByb3BzLmRhdGFzZXRzLCBwcm9wcy5sYXllciksXG4gIG9uQ2hhbmdlOiBwcm9wcy51cGRhdGVMYXllclZpc0NvbmZpZyxcbiAgc2V0Q29sb3JVSTogcHJvcHMudXBkYXRlTGF5ZXJDb2xvclVJXG59KTtcblxuZXhwb3J0IGNvbnN0IGdldExheWVyQ2hhbm5lbENvbmZpZ1Byb3BzID0gcHJvcHMgPT4gKHtcbiAgbGF5ZXI6IHByb3BzLmxheWVyLFxuICBmaWVsZHM6IGdldExheWVyRmllbGRzKHByb3BzLmRhdGFzZXRzLCBwcm9wcy5sYXllciksXG4gIG9uQ2hhbmdlOiBwcm9wcy51cGRhdGVMYXllclZpc3VhbENoYW5uZWxDb25maWdcbn0pO1xuXG5MYXllckNvbmZpZ3VyYXRvckZhY3RvcnkuZGVwcyA9IFtcbiAgU291cmNlRGF0YVNlbGVjdG9yRmFjdG9yeSxcbiAgVmlzQ29uZmlnU2xpZGVyRmFjdG9yeSxcbiAgVGV4dExhYmVsUGFuZWxGYWN0b3J5LFxuICBMYXllckNvbmZpZ0dyb3VwRmFjdG9yeSxcbiAgQ2hhbm5lbEJ5VmFsdWVTZWxlY3RvckZhY3RvcnksXG4gIExheWVyQ29sdW1uQ29uZmlnRmFjdG9yeSxcbiAgTGF5ZXJUeXBlU2VsZWN0b3JGYWN0b3J5LFxuICBWaXNDb25maWdTd2l0Y2hGYWN0b3J5XG5dO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMYXllckNvbmZpZ3VyYXRvckZhY3RvcnkoXG4gIFNvdXJjZURhdGFTZWxlY3RvcixcbiAgVmlzQ29uZmlnU2xpZGVyLFxuICBUZXh0TGFiZWxQYW5lbCxcbiAgTGF5ZXJDb25maWdHcm91cCxcbiAgQ2hhbm5lbEJ5VmFsdWVTZWxlY3RvcixcbiAgTGF5ZXJDb2x1bW5Db25maWcsXG4gIExheWVyVHlwZVNlbGVjdG9yLFxuICBWaXNDb25maWdTd2l0Y2hcbikge1xuICBjbGFzcyBMYXllckNvbmZpZ3VyYXRvciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgIGxheWVyOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBkYXRhc2V0czogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgbGF5ZXJUeXBlT3B0aW9uczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgICAgIG9wZW5Nb2RhbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHVwZGF0ZUxheWVyQ29uZmlnOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgdXBkYXRlTGF5ZXJUeXBlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgdXBkYXRlTGF5ZXJWaXNDb25maWc6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICB1cGRhdGVMYXllclZpc3VhbENoYW5uZWxDb25maWc6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICB1cGRhdGVMYXllckNvbG9yVUk6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgICB9O1xuXG4gICAgX3JlbmRlclBvaW50TGF5ZXJDb25maWcocHJvcHMpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJTY2F0dGVycGxvdExheWVyQ29uZmlnKHByb3BzKTtcbiAgICB9XG5cbiAgICBfcmVuZGVySWNvbkxheWVyQ29uZmlnKHByb3BzKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVuZGVyU2NhdHRlcnBsb3RMYXllckNvbmZpZyhwcm9wcyk7XG4gICAgfVxuXG4gICAgX3JlbmRlclNjYXR0ZXJwbG90TGF5ZXJDb25maWcoe1xuICAgICAgbGF5ZXIsXG4gICAgICB2aXNDb25maWd1cmF0b3JQcm9wcyxcbiAgICAgIGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzLFxuICAgICAgbGF5ZXJDb25maWd1cmF0b3JQcm9wc1xuICAgIH0pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvcj5cbiAgICAgICAgICB7LyogRmlsbCBDb2xvciAqL31cbiAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgICAgey4uLihsYXllci52aXNDb25maWdTZXR0aW5ncy5maWxsZWQgfHwge2xhYmVsOiAnbGF5ZXIuY29sb3InfSl9XG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICBjb2xsYXBzaWJsZVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsYXllci5jb25maWcuY29sb3JGaWVsZCA/IChcbiAgICAgICAgICAgICAgPExheWVyQ29sb3JSYW5nZVNlbGVjdG9yIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxMYXllckNvbG9yU2VsZWN0b3Igey4uLmxheWVyQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLmNvbG9yfVxuICAgICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlciB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Mub3BhY2l0eX0gey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG5cbiAgICAgICAgICB7Lyogb3V0bGluZSBjb2xvciAqL31cbiAgICAgICAgICB7bGF5ZXIudHlwZSA9PT0gTEFZRVJfVFlQRVMucG9pbnQgPyAoXG4gICAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Mub3V0bGluZX1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICBjb2xsYXBzaWJsZVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bGF5ZXIuY29uZmlnLnN0cm9rZUNvbG9yRmllbGQgPyAoXG4gICAgICAgICAgICAgICAgPExheWVyQ29sb3JSYW5nZVNlbGVjdG9yIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gcHJvcGVydHk9XCJzdHJva2VDb2xvclJhbmdlXCIgLz5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8TGF5ZXJDb2xvclNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgICBzZWxlY3RlZENvbG9yPXtsYXllci5jb25maWcudmlzQ29uZmlnLnN0cm9rZUNvbG9yfVxuICAgICAgICAgICAgICAgICAgcHJvcGVydHk9XCJzdHJva2VDb2xvclwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5zdHJva2VDb2xvcn1cbiAgICAgICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy50aGlja25lc3N9XG4gICAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWxheWVyLmNvbmZpZy52aXNDb25maWcub3V0bGluZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgICAgey8qIFJhZGl1cyAqL31cbiAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J2xheWVyLnJhZGl1cyd9IGNvbGxhcHNpYmxlPlxuICAgICAgICAgICAgeyFsYXllci5jb25maWcuc2l6ZUZpZWxkID8gKFxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnJhZGl1c31cbiAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgbGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtCb29sZWFuKGxheWVyLmNvbmZpZy5zaXplRmllbGQpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5yYWRpdXNSYW5nZX1cbiAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgbGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXshbGF5ZXIuY29uZmlnLnNpemVGaWVsZCB8fCBsYXllci5jb25maWcudmlzQ29uZmlnLmZpeGVkUmFkaXVzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5zaXplfVxuICAgICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAge2xheWVyLmNvbmZpZy5zaXplRmllbGQgPyAoXG4gICAgICAgICAgICAgICAgPFZpc0NvbmZpZ1N3aXRjaFxuICAgICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmZpeGVkUmFkaXVzfVxuICAgICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG5cbiAgICAgICAgICB7LyogdGV4dCBsYWJlbCAqL31cbiAgICAgICAgICA8VGV4dExhYmVsUGFuZWxcbiAgICAgICAgICAgIGZpZWxkcz17dmlzQ29uZmlndXJhdG9yUHJvcHMuZmllbGRzfVxuICAgICAgICAgICAgdXBkYXRlTGF5ZXJUZXh0TGFiZWw9e3RoaXMucHJvcHMudXBkYXRlTGF5ZXJUZXh0TGFiZWx9XG4gICAgICAgICAgICB0ZXh0TGFiZWw9e2xheWVyLmNvbmZpZy50ZXh0TGFiZWx9XG4gICAgICAgICAgICBjb2xvclBhbGV0dGU9e3Zpc0NvbmZpZ3VyYXRvclByb3BzLmNvbG9yUGFsZXR0ZX1cbiAgICAgICAgICAgIHNldENvbG9yUGFsZXR0ZVVJPXt2aXNDb25maWd1cmF0b3JQcm9wcy5zZXRDb2xvclBhbGV0dGVVSX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L1N0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBfcmVuZGVyQ2x1c3RlckxheWVyQ29uZmlnKHtcbiAgICAgIGxheWVyLFxuICAgICAgdmlzQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzLFxuICAgICAgbGF5ZXJDaGFubmVsQ29uZmlnUHJvcHNcbiAgICB9KSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgICAgICAgey8qIENvbG9yICovfVxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnbGF5ZXIuY29sb3InfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICAgIDxMYXllckNvbG9yUmFuZ2VTZWxlY3RvciB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICAgIDxBZ2dyU2NhbGVTZWxlY3RvciB7Li4ubGF5ZXJDb25maWd1cmF0b3JQcm9wc30gY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuY29sb3J9IC8+XG4gICAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuY29sb3J9XG4gICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICB7bGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuY29sb3JBZ2dyZWdhdGlvbi5jb25kaXRpb24obGF5ZXIuY29uZmlnKSA/IChcbiAgICAgICAgICAgICAgICA8QWdncmVnYXRpb25UeXBlU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5jb2xvckFnZ3JlZ2F0aW9ufVxuICAgICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuY29sb3J9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXIgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLm9wYWNpdHl9IHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuXG4gICAgICAgICAgey8qIENsdXN0ZXIgUmFkaXVzICovfVxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnbGF5ZXIucmFkaXVzJ30gY29sbGFwc2libGU+XG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5jbHVzdGVyUmFkaXVzfSB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXIgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnJhZGl1c1JhbmdlfSB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgICAgPC9TdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvcj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgX3JlbmRlckhlYXRtYXBMYXllckNvbmZpZyh7XG4gICAgICBsYXllcixcbiAgICAgIHZpc0NvbmZpZ3VyYXRvclByb3BzLFxuICAgICAgbGF5ZXJDb25maWd1cmF0b3JQcm9wcyxcbiAgICAgIGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzXG4gICAgfSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFN0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgICAgIHsvKiBDb2xvciAqL31cbiAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J2xheWVyLmNvbG9yJ30gY29sbGFwc2libGU+XG4gICAgICAgICAgICA8TGF5ZXJDb2xvclJhbmdlU2VsZWN0b3Igey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5vcGFjaXR5fSB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgICAgICB7LyogUmFkaXVzICovfVxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnbGF5ZXIucmFkaXVzJ30+XG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5yYWRpdXN9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgbGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICAgICAgey8qIFdlaWdodCAqL31cbiAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J2xheWVyLndlaWdodCd9PlxuICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMud2VpZ2h0fVxuICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgICAgPC9TdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvcj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgX3JlbmRlckdyaWRMYXllckNvbmZpZyhwcm9wcykge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlckFnZ3JlZ2F0aW9uTGF5ZXJDb25maWcocHJvcHMpO1xuICAgIH1cblxuICAgIF9yZW5kZXJIZXhhZ29uTGF5ZXJDb25maWcocHJvcHMpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJBZ2dyZWdhdGlvbkxheWVyQ29uZmlnKHByb3BzKTtcbiAgICB9XG5cbiAgICBfcmVuZGVyQWdncmVnYXRpb25MYXllckNvbmZpZyh7XG4gICAgICBsYXllcixcbiAgICAgIHZpc0NvbmZpZ3VyYXRvclByb3BzLFxuICAgICAgbGF5ZXJDb25maWd1cmF0b3JQcm9wcyxcbiAgICAgIGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzXG4gICAgfSkge1xuICAgICAgY29uc3Qge2NvbmZpZ30gPSBsYXllcjtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgdmlzQ29uZmlnOiB7ZW5hYmxlM2R9XG4gICAgICB9ID0gY29uZmlnO1xuICAgICAgY29uc3QgZWxldmF0aW9uQnlEZXNjcmlwdGlvbiA9ICdsYXllci5lbGV2YXRpb25CeURlc2NyaXB0aW9uJztcbiAgICAgIGNvbnN0IGNvbG9yQnlEZXNjcmlwdGlvbiA9ICdsYXllci5jb2xvckJ5RGVzY3JpcHRpb24nO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgICAgICAgey8qIENvbG9yICovfVxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnbGF5ZXIuY29sb3InfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICAgIDxMYXllckNvbG9yUmFuZ2VTZWxlY3RvciB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICAgIDxBZ2dyU2NhbGVTZWxlY3RvciB7Li4ubGF5ZXJDb25maWd1cmF0b3JQcm9wc30gY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuY29sb3J9IC8+XG4gICAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuY29sb3J9XG4gICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICB7bGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuY29sb3JBZ2dyZWdhdGlvbi5jb25kaXRpb24obGF5ZXIuY29uZmlnKSA/IChcbiAgICAgICAgICAgICAgICA8QWdncmVnYXRpb25UeXBlU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5jb2xvckFnZ3JlZ2F0aW9ufVxuICAgICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb249e2NvbG9yQnlEZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLmNvbG9yfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICB7bGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MucGVyY2VudGlsZSAmJlxuICAgICAgICAgICAgICBsYXllci52aXNDb25maWdTZXR0aW5ncy5wZXJjZW50aWxlLmNvbmRpdGlvbihsYXllci5jb25maWcpID8gKFxuICAgICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5wZXJjZW50aWxlfVxuICAgICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5vcGFjaXR5fSB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICAgIHsvKiBDZWxsIHNpemUgKi99XG4gICAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydsYXllci5yYWRpdXMnfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXIgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLndvcmxkVW5pdFNpemV9IHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlciB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuY292ZXJhZ2V9IHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuXG4gICAgICAgICAgey8qIEVsZXZhdGlvbiAqL31cbiAgICAgICAgICB7bGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuZW5hYmxlM2QgPyAoXG4gICAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuZW5hYmxlM2R9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgY29sbGFwc2libGVcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5lbGV2YXRpb25TY2FsZX1cbiAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgbGFiZWw9XCJsYXllclZpc0NvbmZpZ3MuaGVpZ2h0TXVsdGlwbGllclwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuc2l6ZX1cbiAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uPXtlbGV2YXRpb25CeURlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFlbmFibGUzZH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxBZ2dyU2NhbGVTZWxlY3RvclxuICAgICAgICAgICAgICAgICAgey4uLmxheWVyQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5zaXplfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnNpemVSYW5nZX1cbiAgICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICAgIGxhYmVsPVwibGF5ZXJWaXNDb25maWdzLmhlaWdodFJhbmdlXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxWaXNDb25maWdTd2l0Y2hcbiAgICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5lbmFibGVFbGV2YXRpb25ab29tRmFjdG9yfVxuICAgICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgICAgbGFiZWw9XCJsYXllclZpc0NvbmZpZ3MuZW5hYmxlSGVpZ2h0Wm9vbUZhY3RvclwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICB7bGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Muc2l6ZUFnZ3JlZ2F0aW9uLmNvbmRpdGlvbihsYXllci5jb25maWcpID8gKFxuICAgICAgICAgICAgICAgICAgPEFnZ3JlZ2F0aW9uVHlwZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5zaXplQWdncmVnYXRpb259XG4gICAgICAgICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuc2l6ZX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAge2xheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmVsZXZhdGlvblBlcmNlbnRpbGUuY29uZGl0aW9uKGxheWVyLmNvbmZpZykgPyAoXG4gICAgICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5lbGV2YXRpb25QZXJjZW50aWxlfVxuICAgICAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICA8L1N0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBTaGFuIG1vdmUgdGhlc2UgaW50byBsYXllciBjbGFzc1xuICAgIF9yZW5kZXJIZXhhZ29uSWRMYXllckNvbmZpZyh7XG4gICAgICBsYXllcixcbiAgICAgIHZpc0NvbmZpZ3VyYXRvclByb3BzLFxuICAgICAgbGF5ZXJDb25maWd1cmF0b3JQcm9wcyxcbiAgICAgIGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzXG4gICAgfSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFN0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgICAgIHsvKiBDb2xvciAqL31cbiAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J2xheWVyLmNvbG9yJ30gY29sbGFwc2libGU+XG4gICAgICAgICAgICB7bGF5ZXIuY29uZmlnLmNvbG9yRmllbGQgPyAoXG4gICAgICAgICAgICAgIDxMYXllckNvbG9yUmFuZ2VTZWxlY3RvciB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TGF5ZXJDb2xvclNlbGVjdG9yIHsuLi5sYXllckNvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5jb2xvcn1cbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXIgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLm9wYWNpdHl9IHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuXG4gICAgICAgICAgey8qIENvdmVyYWdlICovfVxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnbGF5ZXIuY292ZXJhZ2UnfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICAgIHshbGF5ZXIuY29uZmlnLmNvdmVyYWdlRmllbGQgPyAoXG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuY292ZXJhZ2V9XG4gICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgIGxhYmVsPXtmYWxzZX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuY292ZXJhZ2VSYW5nZX1cbiAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgbGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5jb3ZlcmFnZX1cbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICAgIHsvKiBoZWlnaHQgKi99XG4gICAgICAgICAgPExheWVyQ29uZmlnR3JvdXBcbiAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5lbmFibGUzZH1cbiAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgIGNvbGxhcHNpYmxlXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuc2l6ZX1cbiAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5lbGV2YXRpb25TY2FsZX1cbiAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Muc2l6ZVJhbmdlfVxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICBsYWJlbD1cImxheWVyVmlzQ29uZmlncy5oZWlnaHRSYW5nZVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxWaXNDb25maWdTd2l0Y2hcbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuZW5hYmxlRWxldmF0aW9uWm9vbUZhY3Rvcn1cbiAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgICAgPC9TdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvcj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgX3JlbmRlckFyY0xheWVyQ29uZmlnKGFyZ3MpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJMaW5lTGF5ZXJDb25maWcoYXJncyk7XG4gICAgfVxuXG4gICAgX3JlbmRlckxpbmVMYXllckNvbmZpZyh7XG4gICAgICBsYXllcixcbiAgICAgIHZpc0NvbmZpZ3VyYXRvclByb3BzLFxuICAgICAgbGF5ZXJDb25maWd1cmF0b3JQcm9wcyxcbiAgICAgIGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzXG4gICAgfSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFN0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgICAgIHsvKiBDb2xvciAqL31cbiAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J2xheWVyLmNvbG9yJ30gY29sbGFwc2libGU+XG4gICAgICAgICAgICB7bGF5ZXIuY29uZmlnLmNvbG9yRmllbGQgPyAoXG4gICAgICAgICAgICAgIDxMYXllckNvbG9yUmFuZ2VTZWxlY3RvciB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8QXJjTGF5ZXJDb2xvclNlbGVjdG9yXG4gICAgICAgICAgICAgICAgbGF5ZXI9e2xheWVyfVxuICAgICAgICAgICAgICAgIHNldENvbG9yVUk9e2xheWVyQ29uZmlndXJhdG9yUHJvcHMuc2V0Q29sb3JVSX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZUNvbmZpZz17bGF5ZXJDb25maWd1cmF0b3JQcm9wcy5vbkNoYW5nZX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZVZpc0NvbmZpZz17dmlzQ29uZmlndXJhdG9yUHJvcHMub25DaGFuZ2V9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnNvdXJjZUNvbG9yfVxuICAgICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlciB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Mub3BhY2l0eX0gey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG5cbiAgICAgICAgICB7LyogdGhpY2tuZXNzICovfVxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnbGF5ZXIuc3Ryb2tlJ30gY29sbGFwc2libGU+XG4gICAgICAgICAgICB7bGF5ZXIuY29uZmlnLnNpemVGaWVsZCA/IChcbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5zaXplUmFuZ2V9XG4gICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXshbGF5ZXIuY29uZmlnLnNpemVGaWVsZH1cbiAgICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnRoaWNrbmVzc31cbiAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgbGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5zaXplfVxuICAgICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuXG4gICAgICAgICAgey8qIGVsZXZhdGlvbiBzY2FsZSAqL31cbiAgICAgICAgICB7bGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuZWxldmF0aW9uU2NhbGUgPyAoXG4gICAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD1cImxheWVyVmlzQ29uZmlncy5lbGV2YXRpb25TY2FsZVwiIGNvbGxhcHNpYmxlPlxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmVsZXZhdGlvblNjYWxlfVxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPC9TdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvcj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgX3JlbmRlclRyaXBMYXllckNvbmZpZyh7XG4gICAgICBsYXllcixcbiAgICAgIHZpc0NvbmZpZ3VyYXRvclByb3BzLFxuICAgICAgbGF5ZXJDb25maWd1cmF0b3JQcm9wcyxcbiAgICAgIGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzXG4gICAgfSkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBtZXRhOiB7ZmVhdHVyZVR5cGVzID0ge319XG4gICAgICB9ID0gbGF5ZXI7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvcj5cbiAgICAgICAgICB7LyogQ29sb3IgKi99XG4gICAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydsYXllci5jb2xvcid9IGNvbGxhcHNpYmxlPlxuICAgICAgICAgICAge2xheWVyLmNvbmZpZy5jb2xvckZpZWxkID8gKFxuICAgICAgICAgICAgICA8TGF5ZXJDb2xvclJhbmdlU2VsZWN0b3Igey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExheWVyQ29sb3JTZWxlY3RvciB7Li4ubGF5ZXJDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuY29sb3J9XG4gICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5vcGFjaXR5fSB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICAgIHsvKiBTdHJva2UgV2lkdGggKi99XG4gICAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSBsYWJlbD1cImxheWVyLnN0cm9rZVdpZHRoXCIgY29sbGFwc2libGU+XG4gICAgICAgICAgICB7bGF5ZXIuY29uZmlnLnNpemVGaWVsZCA/IChcbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5zaXplUmFuZ2V9XG4gICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgIGxhYmVsPXtmYWxzZX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MudGhpY2tuZXNzfVxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuc2l6ZX1cbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICAgIHsvKiBUcmFpbCBMZW5ndGgqL31cbiAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgey4uLihmZWF0dXJlVHlwZXMucG9seWdvbiA/IGxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnN0cm9rZWQgOiB7fSl9XG4gICAgICAgICAgICBsYWJlbD1cImxheWVyLnRyYWlsTGVuZ3RoXCJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwibGF5ZXIudHJhaWxMZW5ndGhEZXNjcmlwdGlvblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MudHJhaWxMZW5ndGh9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgbGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICAgIDwvU3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgICApO1xuICAgIH1cblxuICAgIF9yZW5kZXJTa0xheWVyQ29uZmlnKHtcbiAgICAgIGxheWVyLFxuICAgICAgdmlzQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzLFxuICAgICAgbGF5ZXJDaGFubmVsQ29uZmlnUHJvcHNcbiAgICB9KSB7XG4gICAgICBjb25zdCBjb2xvckJ5RGVzY3JpcHRpb24gPSAnbGF5ZXIuY29sb3JCeURlc2NyaXB0aW9uJztcbiAgICAgIGNvbnN0IHsgY29uZmlnOiB7dmlzQ29uZmlnfSB9ID0gbGF5ZXI7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvcj5cbiAgICAgICAgICB7LyogRmlsbCBDb2xvciAqL31cbiAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmZpbGxlZH1cbiAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgIGxhYmVsPXsnbGF5ZXIuZmlsbENvbG9yJ31cbiAgICAgICAgICAgIGNvbGxhcHNpYmxlXG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xheWVyLmNvbmZpZy5jb2xvckZpZWxkID8gKFxuICAgICAgICAgICAgICA8TGF5ZXJDb2xvclJhbmdlU2VsZWN0b3Igey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExheWVyQ29sb3JTZWxlY3RvciB7Li4ubGF5ZXJDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICAgIHsvKiA8QWdnclNjYWxlU2VsZWN0b3Igey4uLmxheWVyQ29uZmlndXJhdG9yUHJvcHN9IGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLmNvbG9yfSAvPiAqL31cbiAgICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5jb2xvcn1cbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIHtsYXllci52aXNDb25maWdTZXR0aW5ncy5jb2xvckFnZ3JlZ2F0aW9uLmNvbmRpdGlvbihsYXllci5jb25maWcpID8gKFxuICAgICAgICAgICAgICAgIDxBZ2dyZWdhdGlvblR5cGVTZWxlY3RvclxuICAgICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmNvbG9yQWdncmVnYXRpb259XG4gICAgICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbj17Y29sb3JCeURlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuY29sb3J9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXIgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLm9wYWNpdHl9IHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuXG4gICAgICAgICAgey8qIHN0cm9rZSBjb2xvciAqL31cbiAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnN0cm9rZWR9XG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICBsYWJlbD1cImxheWVyLnN0cm9rZUNvbG9yXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TGF5ZXJDb2xvclNlbGVjdG9yXG4gICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ29sb3I9e2xheWVyLmNvbmZpZy52aXNDb25maWcuc3Ryb2tlQ29sb3J9XG4gICAgICAgICAgICAgICAgcHJvcGVydHk9XCJzdHJva2VDb2xvclwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5zdHJva2VPcGFjaXR5fVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICAgIHsvKiBTdHJva2UgV2lkdGggKi99XG4gICAgICAgICAgPExheWVyQ29uZmlnR3JvdXBcbiAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5zdHJva2VkfVxuICAgICAgICAgICAgbGFiZWw9XCJsYXllci5zdHJva2VXaWR0aFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy50aGlja25lc3N9XG4gICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgIGxhYmVsPXtmYWxzZX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG5cbiAgICAgICAgICB7LyogRWxldmF0aW9uICovfVxuICAgICAgICAgIHt2aXNDb25maWcuZW5hYmxlM2QgPyAoXG4gICAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuZW5hYmxlM2R9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgY29sbGFwc2libGVcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgICAgIHsvKiA8QWdnclNjYWxlU2VsZWN0b3Igey4uLmxheWVyQ29uZmlndXJhdG9yUHJvcHN9IGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnNpemV9IC8+ICovfVxuICAgICAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5zaXplfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnNpemVSYW5nZX1cbiAgICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxWaXNDb25maWdTd2l0Y2hcbiAgICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5lbmFibGVFbGV2YXRpb25ab29tRmFjdG9yfVxuICAgICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAge2xheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnNpemVBZ2dyZWdhdGlvbi5jb25kaXRpb24obGF5ZXIuY29uZmlnKSA/IChcbiAgICAgICAgICAgICAgICAgIDxBZ2dyZWdhdGlvblR5cGVTZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Muc2l6ZUFnZ3JlZ2F0aW9ufVxuICAgICAgICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnNpemV9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgIDxWaXNDb25maWdTd2l0Y2ggey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Mud2lyZWZyYW1lfSAvPlxuICAgICAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICA8L1N0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBfcmVuZGVyR2VvanNvbkxheWVyQ29uZmlnKHtcbiAgICAgIGxheWVyLFxuICAgICAgdmlzQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzLFxuICAgICAgbGF5ZXJDaGFubmVsQ29uZmlnUHJvcHNcbiAgICB9KSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIG1ldGE6IHtmZWF0dXJlVHlwZXMgPSB7fX0sXG4gICAgICAgIGNvbmZpZzoge3Zpc0NvbmZpZ31cbiAgICAgIH0gPSBsYXllcjtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFN0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgICAgIHsvKiBGaWxsIENvbG9yICovfVxuICAgICAgICAgIHtmZWF0dXJlVHlwZXMucG9seWdvbiB8fCBmZWF0dXJlVHlwZXMucG9pbnQgPyAoXG4gICAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuZmlsbGVkfVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgIGxhYmVsPVwibGF5ZXIuZmlsbENvbG9yXCJcbiAgICAgICAgICAgICAgY29sbGFwc2libGVcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2xheWVyLmNvbmZpZy5jb2xvckZpZWxkID8gKFxuICAgICAgICAgICAgICAgIDxMYXllckNvbG9yUmFuZ2VTZWxlY3RvciB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPExheWVyQ29sb3JTZWxlY3RvciB7Li4ubGF5ZXJDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5jb2xvcn1cbiAgICAgICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXIgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLm9wYWNpdHl9IHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgIHsvKiBzdHJva2UgY29sb3IgKi99XG4gICAgICAgICAgPExheWVyQ29uZmlnR3JvdXBcbiAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5zdHJva2VkfVxuICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgbGFiZWw9XCJsYXllci5zdHJva2VDb2xvclwiXG4gICAgICAgICAgICBjb2xsYXBzaWJsZVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsYXllci5jb25maWcuc3Ryb2tlQ29sb3JGaWVsZCA/IChcbiAgICAgICAgICAgICAgPExheWVyQ29sb3JSYW5nZVNlbGVjdG9yIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gcHJvcGVydHk9XCJzdHJva2VDb2xvclJhbmdlXCIgLz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxMYXllckNvbG9yU2VsZWN0b3JcbiAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDb2xvcj17bGF5ZXIuY29uZmlnLnZpc0NvbmZpZy5zdHJva2VDb2xvcn1cbiAgICAgICAgICAgICAgICBwcm9wZXJ0eT1cInN0cm9rZUNvbG9yXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuc3Ryb2tlQ29sb3J9XG4gICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnN0cm9rZU9wYWNpdHl9XG4gICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG5cbiAgICAgICAgICB7LyogU3Ryb2tlIFdpZHRoICovfVxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICB7Li4uKGZlYXR1cmVUeXBlcy5wb2x5Z29uID8gbGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Muc3Ryb2tlZCA6IHt9KX1cbiAgICAgICAgICAgIGxhYmVsPVwibGF5ZXIuc3Ryb2tlV2lkdGhcIlxuICAgICAgICAgICAgY29sbGFwc2libGVcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bGF5ZXIuY29uZmlnLnNpemVGaWVsZCA/IChcbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5zaXplUmFuZ2V9XG4gICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgIGxhYmVsPXtmYWxzZX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MudGhpY2tuZXNzfVxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnNpemV9XG4gICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG5cbiAgICAgICAgICB7LyogRWxldmF0aW9uICovfVxuICAgICAgICAgIHtmZWF0dXJlVHlwZXMucG9seWdvbiA/IChcbiAgICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmVuYWJsZTNkfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17IXZpc0NvbmZpZy5maWxsZWR9XG4gICAgICAgICAgICAgIGNvbGxhcHNpYmxlXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuZWxldmF0aW9uU2NhbGV9XG4gICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgIGxhYmVsPXtmYWxzZX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5oZWlnaHR9XG4gICAgICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8VmlzQ29uZmlnU3dpdGNoXG4gICAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuZW5hYmxlRWxldmF0aW9uWm9vbUZhY3Rvcn1cbiAgICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxWaXNDb25maWdTd2l0Y2ggey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Mud2lyZWZyYW1lfSAvPlxuICAgICAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgICAgey8qIFJhZGl1cyAqL31cbiAgICAgICAgICB7ZmVhdHVyZVR5cGVzLnBvaW50ID8gKFxuICAgICAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydsYXllci5yYWRpdXMnfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICAgICAgeyFsYXllci5jb25maWcucmFkaXVzRmllbGQgPyAoXG4gICAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnJhZGl1c31cbiAgICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICAgIGxhYmVsPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtCb29sZWFuKGxheWVyLmNvbmZpZy5yYWRpdXNGaWVsZCl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MucmFkaXVzUmFuZ2V9XG4gICAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWxheWVyLmNvbmZpZy5yYWRpdXNGaWVsZH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnJhZGl1c31cbiAgICAgICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICA8L1N0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBfcmVuZGVyM0RMYXllckNvbmZpZyh7bGF5ZXIsIHZpc0NvbmZpZ3VyYXRvclByb3BzfSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEZyYWdtZW50PlxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnbGF5ZXIuM0RNb2RlbCd9IGNvbGxhcHNpYmxlPlxuICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICAgICAgYWNjZXB0PVwiLmdsYiwuZ2x0ZlwiXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQuZmlsZXMgJiYgZS50YXJnZXQuZmlsZXNbMF0pIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZS50YXJnZXQuZmlsZXNbMF0pO1xuICAgICAgICAgICAgICAgICAgdmlzQ29uZmlndXJhdG9yUHJvcHMub25DaGFuZ2Uoe3NjZW5lZ3JhcGg6IHVybH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnbGF5ZXIuM0RNb2RlbE9wdGlvbnMnfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnNpemVTY2FsZX1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZmFsc2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuYW5nbGVYfVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtmYWxzZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5hbmdsZVl9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2ZhbHNlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmFuZ2xlWn1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZmFsc2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgICAgPC9GcmFnbWVudD5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgX3JlbmRlclMyTGF5ZXJDb25maWcoe1xuICAgICAgbGF5ZXIsXG4gICAgICB2aXNDb25maWd1cmF0b3JQcm9wcyxcbiAgICAgIGxheWVyQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgICBsYXllckNoYW5uZWxDb25maWdQcm9wc1xuICAgIH0pIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY29uZmlnOiB7dmlzQ29uZmlnfVxuICAgICAgfSA9IGxheWVyO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgICAgICAgey8qIENvbG9yICovfVxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuZmlsbGVkfVxuICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgbGFiZWw9XCJsYXllci5maWxsQ29sb3JcIlxuICAgICAgICAgICAgY29sbGFwc2libGVcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bGF5ZXIuY29uZmlnLmNvbG9yRmllbGQgPyAoXG4gICAgICAgICAgICAgIDxMYXllckNvbG9yUmFuZ2VTZWxlY3RvciB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TGF5ZXJDb2xvclNlbGVjdG9yIHsuLi5sYXllckNvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5jb2xvcn1cbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXIgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLm9wYWNpdHl9IHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuXG4gICAgICAgICAgey8qIFN0cm9rZSAqL31cbiAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnN0cm9rZWR9XG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICBsYWJlbD1cImxheWVyLnN0cm9rZUNvbG9yXCJcbiAgICAgICAgICAgIGNvbGxhcHNpYmxlXG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xheWVyLmNvbmZpZy5zdHJva2VDb2xvckZpZWxkID8gKFxuICAgICAgICAgICAgICA8TGF5ZXJDb2xvclJhbmdlU2VsZWN0b3Igey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSBwcm9wZXJ0eT1cInN0cm9rZUNvbG9yUmFuZ2VcIiAvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExheWVyQ29sb3JTZWxlY3RvclxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICBzZWxlY3RlZENvbG9yPXtsYXllci5jb25maWcudmlzQ29uZmlnLnN0cm9rZUNvbG9yfVxuICAgICAgICAgICAgICAgIHByb3BlcnR5PVwic3Ryb2tlQ29sb3JcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5zdHJva2VDb2xvcn1cbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICAgIHsvKiBTdHJva2UgV2lkdGggKi99XG4gICAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSBsYWJlbD1cImxheWVyLnN0cm9rZVdpZHRoXCIgY29sbGFwc2libGU+XG4gICAgICAgICAgICB7bGF5ZXIuY29uZmlnLnNpemVGaWVsZCA/IChcbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5zaXplUmFuZ2V9XG4gICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgIGxhYmVsPXtmYWxzZX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MudGhpY2tuZXNzfVxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnNpemV9XG4gICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG5cbiAgICAgICAgICB7LyogRWxldmF0aW9uICovfVxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuZW5hYmxlM2R9XG4gICAgICAgICAgICBkaXNhYmxlZD17IXZpc0NvbmZpZy5maWxsZWR9XG4gICAgICAgICAgICBjb2xsYXBzaWJsZVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLmhlaWdodH1cbiAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmVsZXZhdGlvblNjYWxlfVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgIGxhYmVsPVwibGF5ZXJWaXNDb25maWdzLmVsZXZhdGlvblNjYWxlXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuaGVpZ2h0UmFuZ2V9XG4gICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgIGxhYmVsPVwibGF5ZXJWaXNDb25maWdzLmhlaWdodFJhbmdlXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1N3aXRjaFxuICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5lbmFibGVFbGV2YXRpb25ab29tRmFjdG9yfVxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1N3aXRjaCB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy53aXJlZnJhbWV9IC8+XG4gICAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgICAgPC9TdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvcj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3Qge2xheWVyLCBkYXRhc2V0cywgdXBkYXRlTGF5ZXJDb25maWcsIGxheWVyVHlwZU9wdGlvbnMsIHVwZGF0ZUxheWVyVHlwZX0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qge2ZpZWxkcyA9IFtdLCBmaWVsZFBhaXJzID0gdW5kZWZpbmVkfSA9IGxheWVyLmNvbmZpZy5kYXRhSWRcbiAgICAgICAgPyBkYXRhc2V0c1tsYXllci5jb25maWcuZGF0YUlkXVxuICAgICAgICA6IHt9O1xuICAgICAgY29uc3Qge2NvbmZpZ30gPSBsYXllcjtcblxuICAgICAgY29uc3QgdmlzQ29uZmlndXJhdG9yUHJvcHMgPSBnZXRWaXNDb25maWd1cmF0b3JQcm9wcyh0aGlzLnByb3BzKTtcbiAgICAgIGNvbnN0IGxheWVyQ29uZmlndXJhdG9yUHJvcHMgPSBnZXRMYXllckNvbmZpZ3VyYXRvclByb3BzKHRoaXMucHJvcHMpO1xuICAgICAgY29uc3QgbGF5ZXJDaGFubmVsQ29uZmlnUHJvcHMgPSBnZXRMYXllckNoYW5uZWxDb25maWdQcm9wcyh0aGlzLnByb3BzKTtcbiAgICAgIGNvbnN0IGRhdGFzZXQgPSBnZXRMYXllckRhdGFzZXQoZGF0YXNldHMsIGxheWVyKTtcbiAgICAgIGNvbnN0IHJlbmRlclRlbXBsYXRlID0gbGF5ZXIudHlwZSAmJiBgX3JlbmRlciR7Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyKGxheWVyLnR5cGUpfUxheWVyQ29uZmlnYDtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFN0eWxlZExheWVyQ29uZmlndXJhdG9yPlxuICAgICAgICAgIHtsYXllci5sYXllckluZm9Nb2RhbCA/IChcbiAgICAgICAgICAgIDxIb3dUb0J1dHRvbiBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb3BzLm9wZW5Nb2RhbChsYXllci5sYXllckluZm9Nb2RhbCl9IC8+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydsYXllci5iYXNpYyd9IGNvbGxhcHNpYmxlIGV4cGFuZGVkPXshbGF5ZXIuaGFzQWxsQ29sdW1ucygpfT5cbiAgICAgICAgICAgIDxMYXllclR5cGVTZWxlY3RvclxuICAgICAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgICAgIGxheWVyPXtsYXllcn1cbiAgICAgICAgICAgICAgbGF5ZXJUeXBlT3B0aW9ucz17bGF5ZXJUeXBlT3B0aW9uc31cbiAgICAgICAgICAgICAgb25TZWxlY3Q9e3VwZGF0ZUxheWVyVHlwZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7T2JqZWN0LmtleXMoZGF0YXNldHMpLmxlbmd0aCA+IDEgJiYgKFxuICAgICAgICAgICAgICA8U291cmNlRGF0YVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgZGF0YXNldHM9e2RhdGFzZXRzfVxuICAgICAgICAgICAgICAgIGlkPXtsYXllci5pZH1cbiAgICAgICAgICAgICAgICBkYXRhSWQ9e2NvbmZpZy5kYXRhSWR9XG4gICAgICAgICAgICAgICAgb25TZWxlY3Q9e3ZhbHVlID0+IHVwZGF0ZUxheWVyQ29uZmlnKHtkYXRhSWQ6IHZhbHVlfSl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPExheWVyQ29sdW1uQ29uZmlnXG4gICAgICAgICAgICAgIGNvbHVtblBhaXJzPXtsYXllci5jb2x1bW5QYWlyc31cbiAgICAgICAgICAgICAgY29sdW1ucz17bGF5ZXIuY29uZmlnLmNvbHVtbnN9XG4gICAgICAgICAgICAgIGFzc2lnbkNvbHVtblBhaXJzPXtsYXllci5hc3NpZ25Db2x1bW5QYWlycy5iaW5kKGxheWVyKX1cbiAgICAgICAgICAgICAgYXNzaWduQ29sdW1uPXtsYXllci5hc3NpZ25Db2x1bW4uYmluZChsYXllcil9XG4gICAgICAgICAgICAgIGNvbHVtbkxhYmVscz17bGF5ZXIuY29sdW1uTGFiZWxzfVxuICAgICAgICAgICAgICBmaWVsZHM9e2ZpZWxkc31cbiAgICAgICAgICAgICAgZmllbGRQYWlycz17ZmllbGRQYWlyc31cbiAgICAgICAgICAgICAgdXBkYXRlTGF5ZXJDb25maWc9e3VwZGF0ZUxheWVyQ29uZmlnfVxuICAgICAgICAgICAgICB1cGRhdGVMYXllclR5cGU9e3RoaXMucHJvcHMudXBkYXRlTGF5ZXJUeXBlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICAgICAge3RoaXNbcmVuZGVyVGVtcGxhdGVdICYmXG4gICAgICAgICAgICB0aGlzW3JlbmRlclRlbXBsYXRlXSh7XG4gICAgICAgICAgICAgIGxheWVyLFxuICAgICAgICAgICAgICBkYXRhc2V0LFxuICAgICAgICAgICAgICB2aXNDb25maWd1cmF0b3JQcm9wcyxcbiAgICAgICAgICAgICAgbGF5ZXJDaGFubmVsQ29uZmlnUHJvcHMsXG4gICAgICAgICAgICAgIGxheWVyQ29uZmlndXJhdG9yUHJvcHNcbiAgICAgICAgICAgIH0pfVxuICAgICAgICA8L1N0eWxlZExheWVyQ29uZmlndXJhdG9yPlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gTGF5ZXJDb25maWd1cmF0b3I7XG59XG4vKlxuICogQ29tcG9uZW50aXplIGNvbmZpZyBjb21wb25lbnQgaW50byBwdXJlIGZ1bmN0aW9uYWwgY29tcG9uZW50c1xuICovXG5cbmNvbnN0IFN0eWxlZEhvd1RvQnV0dG9uID0gc3R5bGVkLmRpdmBcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMTJweDtcbiAgdG9wOiAtNHB4O1xuYDtcblxuZXhwb3J0IGNvbnN0IEhvd1RvQnV0dG9uID0gKHtvbkNsaWNrfSkgPT4gKFxuICA8U3R5bGVkSG93VG9CdXR0b24+XG4gICAgPEJ1dHRvbiBsaW5rIHNtYWxsIG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9eydsYXllckNvbmZpZ3VyYXRpb24uaG93VG8nfSAvPlxuICAgIDwvQnV0dG9uPlxuICA8L1N0eWxlZEhvd1RvQnV0dG9uPlxuKTtcblxuZXhwb3J0IGNvbnN0IExheWVyQ29sb3JTZWxlY3RvciA9ICh7XG4gIGxheWVyLFxuICBvbkNoYW5nZSxcbiAgbGFiZWwsXG4gIHNlbGVjdGVkQ29sb3IsXG4gIHByb3BlcnR5ID0gJ2NvbG9yJyxcbiAgc2V0Q29sb3JVSVxufSkgPT4gKFxuICA8U2lkZVBhbmVsU2VjdGlvbj5cbiAgICA8Q29sb3JTZWxlY3RvclxuICAgICAgY29sb3JTZXRzPXtbXG4gICAgICAgIHtcbiAgICAgICAgICBzZWxlY3RlZENvbG9yOiBzZWxlY3RlZENvbG9yIHx8IGxheWVyLmNvbmZpZy5jb2xvcixcbiAgICAgICAgICBzZXRDb2xvcjogcmdiVmFsdWUgPT4gb25DaGFuZ2Uoe1twcm9wZXJ0eV06IHJnYlZhbHVlfSlcbiAgICAgICAgfVxuICAgICAgXX1cbiAgICAgIGNvbG9yVUk9e2xheWVyLmNvbmZpZy5jb2xvclVJW3Byb3BlcnR5XX1cbiAgICAgIHNldENvbG9yVUk9e25ld0NvbmZpZyA9PiBzZXRDb2xvclVJKHByb3BlcnR5LCBuZXdDb25maWcpfVxuICAgIC8+XG4gIDwvU2lkZVBhbmVsU2VjdGlvbj5cbik7XG5cbmV4cG9ydCBjb25zdCBBcmNMYXllckNvbG9yU2VsZWN0b3IgPSAoe1xuICBsYXllcixcbiAgb25DaGFuZ2VDb25maWcsXG4gIG9uQ2hhbmdlVmlzQ29uZmlnLFxuICBwcm9wZXJ0eSA9ICdjb2xvcicsXG4gIHNldENvbG9yVUlcbn0pID0+IChcbiAgPFNpZGVQYW5lbFNlY3Rpb24+XG4gICAgPENvbG9yU2VsZWN0b3JcbiAgICAgIGNvbG9yU2V0cz17W1xuICAgICAgICB7XG4gICAgICAgICAgc2VsZWN0ZWRDb2xvcjogbGF5ZXIuY29uZmlnLmNvbG9yLFxuICAgICAgICAgIHNldENvbG9yOiByZ2JWYWx1ZSA9PiBvbkNoYW5nZUNvbmZpZyh7Y29sb3I6IHJnYlZhbHVlfSksXG4gICAgICAgICAgbGFiZWw6ICdTb3VyY2UnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzZWxlY3RlZENvbG9yOiBsYXllci5jb25maWcudmlzQ29uZmlnLnRhcmdldENvbG9yIHx8IGxheWVyLmNvbmZpZy5jb2xvcixcbiAgICAgICAgICBzZXRDb2xvcjogcmdiVmFsdWUgPT4gb25DaGFuZ2VWaXNDb25maWcoe3RhcmdldENvbG9yOiByZ2JWYWx1ZX0pLFxuICAgICAgICAgIGxhYmVsOiAnVGFyZ2V0J1xuICAgICAgICB9XG4gICAgICBdfVxuICAgICAgY29sb3JVST17bGF5ZXIuY29uZmlnLmNvbG9yVUlbcHJvcGVydHldfVxuICAgICAgc2V0Q29sb3JVST17bmV3Q29uZmlnID0+IHNldENvbG9yVUkocHJvcGVydHksIG5ld0NvbmZpZyl9XG4gICAgLz5cbiAgPC9TaWRlUGFuZWxTZWN0aW9uPlxuKTtcblxuZXhwb3J0IGNvbnN0IExheWVyQ29sb3JSYW5nZVNlbGVjdG9yID0gKHtsYXllciwgb25DaGFuZ2UsIHByb3BlcnR5ID0gJ2NvbG9yUmFuZ2UnLCBzZXRDb2xvclVJfSkgPT4gKFxuICA8U2lkZVBhbmVsU2VjdGlvbj5cbiAgICA8Q29sb3JTZWxlY3RvclxuICAgICAgY29sb3JTZXRzPXtbXG4gICAgICAgIHtcbiAgICAgICAgICBzZWxlY3RlZENvbG9yOiBsYXllci5jb25maWcudmlzQ29uZmlnW3Byb3BlcnR5XSxcbiAgICAgICAgICBpc1JhbmdlOiB0cnVlLFxuICAgICAgICAgIHNldENvbG9yOiBjb2xvclJhbmdlID0+IG9uQ2hhbmdlKHtbcHJvcGVydHldOiBjb2xvclJhbmdlfSlcbiAgICAgICAgfVxuICAgICAgXX1cbiAgICAgIGNvbG9yVUk9e2xheWVyLmNvbmZpZy5jb2xvclVJW3Byb3BlcnR5XX1cbiAgICAgIHNldENvbG9yVUk9e25ld0NvbmZpZyA9PiBzZXRDb2xvclVJKHByb3BlcnR5LCBuZXdDb25maWcpfVxuICAgIC8+XG4gIDwvU2lkZVBhbmVsU2VjdGlvbj5cbik7XG5cbkNoYW5uZWxCeVZhbHVlU2VsZWN0b3JGYWN0b3J5LmRlcHMgPSBbVmlzQ29uZmlnQnlGaWVsZFNlbGVjdG9yRmFjdG9yeV07XG5leHBvcnQgZnVuY3Rpb24gQ2hhbm5lbEJ5VmFsdWVTZWxlY3RvckZhY3RvcnkoVmlzQ29uZmlnQnlGaWVsZFNlbGVjdG9yKSB7XG4gIGNvbnN0IENoYW5uZWxCeVZhbHVlU2VsZWN0b3IgPSAoe2xheWVyLCBjaGFubmVsLCBvbkNoYW5nZSwgZmllbGRzLCBkZXNjcmlwdGlvbn0pID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjaGFubmVsU2NhbGVUeXBlLFxuICAgICAgZG9tYWluLFxuICAgICAgZmllbGQsXG4gICAgICBrZXksXG4gICAgICBwcm9wZXJ0eSxcbiAgICAgIHJhbmdlLFxuICAgICAgc2NhbGUsXG4gICAgICBkZWZhdWx0TWVhc3VyZSxcbiAgICAgIHN1cHBvcnRlZEZpZWxkVHlwZXNcbiAgICB9ID0gY2hhbm5lbDtcbiAgICBjb25zdCBjaGFubmVsU3VwcG9ydGVkRmllbGRUeXBlcyA9XG4gICAgICBzdXBwb3J0ZWRGaWVsZFR5cGVzIHx8IENIQU5ORUxfU0NBTEVfU1VQUE9SVEVEX0ZJRUxEU1tjaGFubmVsU2NhbGVUeXBlXTtcbiAgICBjb25zdCBzdXBwb3J0ZWRGaWVsZHMgPSBmaWVsZHMuZmlsdGVyKCh7dHlwZX0pID0+IGNoYW5uZWxTdXBwb3J0ZWRGaWVsZFR5cGVzLmluY2x1ZGVzKHR5cGUpKTtcbiAgICBjb25zdCBzY2FsZU9wdGlvbnMgPSBsYXllci5nZXRTY2FsZU9wdGlvbnMoY2hhbm5lbC5rZXkpO1xuICAgIGNvbnN0IHNob3dTY2FsZSA9ICFsYXllci5pc0FnZ3JlZ2F0ZWQgJiYgbGF5ZXIuY29uZmlnW3NjYWxlXSAmJiBzY2FsZU9wdGlvbnMubGVuZ3RoID4gMTtcbiAgICBjb25zdCBkZWZhdWx0RGVzY3JpcHRpb24gPSAnbGF5ZXJDb25maWd1cmF0aW9uLmRlZmF1bHREZXNjcmlwdGlvbic7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFZpc0NvbmZpZ0J5RmllbGRTZWxlY3RvclxuICAgICAgICBjaGFubmVsPXtjaGFubmVsLmtleX1cbiAgICAgICAgZGVzY3JpcHRpb249e2Rlc2NyaXB0aW9uIHx8IGRlZmF1bHREZXNjcmlwdGlvbn1cbiAgICAgICAgZG9tYWluPXtsYXllci5jb25maWdbZG9tYWluXX1cbiAgICAgICAgZmllbGRzPXtzdXBwb3J0ZWRGaWVsZHN9XG4gICAgICAgIGlkPXtsYXllci5pZH1cbiAgICAgICAga2V5PXtgJHtrZXl9LWNoYW5uZWwtc2VsZWN0b3JgfVxuICAgICAgICBwcm9wZXJ0eT17cHJvcGVydHl9XG4gICAgICAgIHBsYWNlaG9sZGVyPXtkZWZhdWx0TWVhc3VyZSB8fCAncGxhY2Vob2xkZXIuc2VsZWN0RmllbGQnfVxuICAgICAgICByYW5nZT17bGF5ZXIuY29uZmlnLnZpc0NvbmZpZ1tyYW5nZV19XG4gICAgICAgIHNjYWxlT3B0aW9ucz17c2NhbGVPcHRpb25zfVxuICAgICAgICBzY2FsZVR5cGU9e3NjYWxlID8gbGF5ZXIuY29uZmlnW3NjYWxlXSA6IG51bGx9XG4gICAgICAgIHNlbGVjdGVkRmllbGQ9e2xheWVyLmNvbmZpZ1tmaWVsZF19XG4gICAgICAgIHNob3dTY2FsZT17c2hvd1NjYWxlfVxuICAgICAgICB1cGRhdGVGaWVsZD17dmFsID0+IG9uQ2hhbmdlKHtbZmllbGRdOiB2YWx9LCBrZXkpfVxuICAgICAgICB1cGRhdGVTY2FsZT17dmFsID0+IG9uQ2hhbmdlKHtbc2NhbGVdOiB2YWx9LCBrZXkpfVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG4gIHJldHVybiBDaGFubmVsQnlWYWx1ZVNlbGVjdG9yO1xufVxuXG5leHBvcnQgY29uc3QgQWdnclNjYWxlU2VsZWN0b3IgPSAoe2NoYW5uZWwsIGxheWVyLCBvbkNoYW5nZX0pID0+IHtcbiAgY29uc3Qge3NjYWxlLCBrZXl9ID0gY2hhbm5lbDtcbiAgY29uc3Qgc2NhbGVPcHRpb25zID0gbGF5ZXIuZ2V0U2NhbGVPcHRpb25zKGtleSk7XG5cbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoc2NhbGVPcHRpb25zKSAmJiBzY2FsZU9wdGlvbnMubGVuZ3RoID4gMSA/IChcbiAgICA8RGltZW5zaW9uU2NhbGVTZWxlY3RvclxuICAgICAgbGFiZWw9e2Ake2tleX0gU2NhbGVgfVxuICAgICAgb3B0aW9ucz17c2NhbGVPcHRpb25zfVxuICAgICAgc2NhbGVUeXBlPXtsYXllci5jb25maWdbc2NhbGVdfVxuICAgICAgb25TZWxlY3Q9e3ZhbCA9PiBvbkNoYW5nZSh7W3NjYWxlXTogdmFsfSwga2V5KX1cbiAgICAvPlxuICApIDogbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCBBZ2dyZWdhdGlvblR5cGVTZWxlY3RvciA9ICh7bGF5ZXIsIGNoYW5uZWwsIG9uQ2hhbmdlfSkgPT4ge1xuICBjb25zdCB7ZmllbGQsIGFnZ3JlZ2F0aW9uLCBrZXl9ID0gY2hhbm5lbDtcbiAgY29uc3Qgc2VsZWN0ZWRGaWVsZCA9IGxheWVyLmNvbmZpZ1tmaWVsZF07XG4gIGNvbnN0IHt2aXNDb25maWd9ID0gbGF5ZXIuY29uZmlnO1xuICBcbiAgLy8gYWdncmVnYXRpb24gc2hvdWxkIG9ubHkgYmUgc2VsZWN0YWJsZSB3aGVuIGZpZWxkIGlzIHNlbGVjdGVkXG4gIGNvbnN0IGFnZ3JlZ2F0aW9uT3B0aW9ucyA9IGxheWVyLmdldEFnZ3JlZ2F0aW9uT3B0aW9ucyhrZXkpO1xuXG4gIHJldHVybiAoXG4gICAgPFNpZGVQYW5lbFNlY3Rpb24+XG4gICAgICA8UGFuZWxMYWJlbD5cbiAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9eydsYXllci5hZ2dyZWdhdGVCeSd9IHZhbHVlcz17e2ZpZWxkOiBzZWxlY3RlZEZpZWxkLm5hbWV9fSAvPlxuICAgICAgPC9QYW5lbExhYmVsPlxuICAgICAgPEl0ZW1TZWxlY3RvclxuICAgICAgICBzZWxlY3RlZEl0ZW1zPXt2aXNDb25maWdbYWdncmVnYXRpb25dfVxuICAgICAgICBvcHRpb25zPXthZ2dyZWdhdGlvbk9wdGlvbnN9XG4gICAgICAgIG11bHRpU2VsZWN0PXtmYWxzZX1cbiAgICAgICAgc2VhcmNoYWJsZT17ZmFsc2V9XG4gICAgICAgIG9uQ2hhbmdlPXt2YWx1ZSA9PlxuICAgICAgICAgIG9uQ2hhbmdlKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB2aXNDb25maWc6IHtcbiAgICAgICAgICAgICAgICAuLi5sYXllci5jb25maWcudmlzQ29uZmlnLFxuICAgICAgICAgICAgICAgIFthZ2dyZWdhdGlvbl06IHZhbHVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFubmVsLmtleVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgLz5cbiAgICA8L1NpZGVQYW5lbFNlY3Rpb24+XG4gICk7XG59O1xuLyogZXNsaW50LWVuYWJsZSBtYXgtcGFyYW1zICovXG4iXX0=