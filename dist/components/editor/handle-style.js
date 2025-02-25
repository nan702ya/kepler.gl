"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStyle = getStyle;
exports.getEditHandleShape = getEditHandleShape;
exports.DEFAULT_RADIUS = exports.DEFAULT_STATE_STYLE_OPACITY = exports.RENDER_TYPE_STYLES = exports.STATE_STYLES_FILL = exports.DEFAULT_STATE_STYLE_FILL = exports.STATE_STYLES_STROKE = exports.DEFAULT_STATE_STYLE_STROKE = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _reactMapGlDraw = require("react-map-gl-draw");

var _constants = require("./constants");

var _lodash = _interopRequireDefault(require("lodash.get"));

var _STATE_STYLES_STROKE, _STATE_STYLES_FILL, _RENDER_TYPE_STYLES;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var DEFAULT_EDIT_HANDLE_SHAPE = 'circle';
var rectStyle = {
  x: -6,
  y: -6,
  height: 12,
  width: 12
};
var DEFAULT_STATE_STYLE_STROKE = _constants.COLORS.PRIMARY;
exports.DEFAULT_STATE_STYLE_STROKE = DEFAULT_STATE_STYLE_STROKE;
var STATE_STYLES_STROKE = (_STATE_STYLES_STROKE = {}, (0, _defineProperty2["default"])(_STATE_STYLES_STROKE, _reactMapGlDraw.RenderStates.SELECTED, _constants.COLORS.PRIMARY), (0, _defineProperty2["default"])(_STATE_STYLES_STROKE, _reactMapGlDraw.RenderStates.HOVERED, _constants.COLORS.SECONDARY), _STATE_STYLES_STROKE);
exports.STATE_STYLES_STROKE = STATE_STYLES_STROKE;
var DEFAULT_STATE_STYLE_FILL = '#ffffff';
exports.DEFAULT_STATE_STYLE_FILL = DEFAULT_STATE_STYLE_FILL;
var STATE_STYLES_FILL = (_STATE_STYLES_FILL = {}, (0, _defineProperty2["default"])(_STATE_STYLES_FILL, _reactMapGlDraw.RenderStates.SELECTED, _constants.COLORS.SECONDARY), (0, _defineProperty2["default"])(_STATE_STYLES_FILL, _reactMapGlDraw.RenderStates.HOVERED, _constants.COLORS.SECONDARY), (0, _defineProperty2["default"])(_STATE_STYLES_FILL, _reactMapGlDraw.RenderStates.INACTIVE, _constants.COLORS.PRIMARY), (0, _defineProperty2["default"])(_STATE_STYLES_FILL, _reactMapGlDraw.RenderStates.UNCOMMITTED, _constants.COLORS.PRIMARY), _STATE_STYLES_FILL);
exports.STATE_STYLES_FILL = STATE_STYLES_FILL;
var STATE_STYLES_STROKE_WIDTH = 1;
var RENDER_TYPE_STYLES = (_RENDER_TYPE_STYLES = {}, (0, _defineProperty2["default"])(_RENDER_TYPE_STYLES, _reactMapGlDraw.RenderTypes.POINT, function (state) {
  return {
    fill: STATE_STYLES_FILL[state],
    stroke: state === _reactMapGlDraw.RenderStates.SELECTED ? _constants.COLORS.PRIMARY : DEFAULT_STATE_STYLE_STROKE
  };
}), (0, _defineProperty2["default"])(_RENDER_TYPE_STYLES, _reactMapGlDraw.RenderTypes.LINE_STRING, function () {
  return rectStyle;
}), (0, _defineProperty2["default"])(_RENDER_TYPE_STYLES, _reactMapGlDraw.RenderTypes.RECTANGLE, function () {
  return rectStyle;
}), (0, _defineProperty2["default"])(_RENDER_TYPE_STYLES, _reactMapGlDraw.RenderTypes.POLYGON, function () {
  return rectStyle;
}), _RENDER_TYPE_STYLES);
exports.RENDER_TYPE_STYLES = RENDER_TYPE_STYLES;
var DEFAULT_STATE_STYLE_OPACITY = 0;
exports.DEFAULT_STATE_STYLE_OPACITY = DEFAULT_STATE_STYLE_OPACITY;
var DEFAULT_RADIUS = 5;
exports.DEFAULT_RADIUS = DEFAULT_RADIUS;

function noOp() {}

function getStyle(_ref) {
  var feature = _ref.feature,
      state = _ref.state;
  var isVisible = (0, _lodash["default"])(feature, ['properties', 'isVisible'], true);
  var style = {
    stroke: STATE_STYLES_STROKE[state] || DEFAULT_STATE_STYLE_STROKE,
    strokeWidth: isVisible ? STATE_STYLES_STROKE_WIDTH : 0,
    fill: DEFAULT_STATE_STYLE_FILL,
    fillOpacity: DEFAULT_STATE_STYLE_OPACITY,
    r: DEFAULT_RADIUS
  };
  var renderType = feature.properties ? feature.properties.renderType : feature.renderType;
  return _objectSpread(_objectSpread({}, style), (RENDER_TYPE_STYLES[renderType] || noOp)(state));
}

function getEditHandleShape() {
  return DEFAULT_EDIT_HANDLE_SHAPE;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2VkaXRvci9oYW5kbGUtc3R5bGUuanMiXSwibmFtZXMiOlsiREVGQVVMVF9FRElUX0hBTkRMRV9TSEFQRSIsInJlY3RTdHlsZSIsIngiLCJ5IiwiaGVpZ2h0Iiwid2lkdGgiLCJERUZBVUxUX1NUQVRFX1NUWUxFX1NUUk9LRSIsIkNPTE9SUyIsIlBSSU1BUlkiLCJTVEFURV9TVFlMRVNfU1RST0tFIiwiUmVuZGVyU3RhdGVzIiwiU0VMRUNURUQiLCJIT1ZFUkVEIiwiU0VDT05EQVJZIiwiREVGQVVMVF9TVEFURV9TVFlMRV9GSUxMIiwiU1RBVEVfU1RZTEVTX0ZJTEwiLCJJTkFDVElWRSIsIlVOQ09NTUlUVEVEIiwiU1RBVEVfU1RZTEVTX1NUUk9LRV9XSURUSCIsIlJFTkRFUl9UWVBFX1NUWUxFUyIsIlJlbmRlclR5cGVzIiwiUE9JTlQiLCJzdGF0ZSIsImZpbGwiLCJzdHJva2UiLCJMSU5FX1NUUklORyIsIlJFQ1RBTkdMRSIsIlBPTFlHT04iLCJERUZBVUxUX1NUQVRFX1NUWUxFX09QQUNJVFkiLCJERUZBVUxUX1JBRElVUyIsIm5vT3AiLCJnZXRTdHlsZSIsImZlYXR1cmUiLCJpc1Zpc2libGUiLCJzdHlsZSIsInN0cm9rZVdpZHRoIiwiZmlsbE9wYWNpdHkiLCJyIiwicmVuZGVyVHlwZSIsInByb3BlcnRpZXMiLCJnZXRFZGl0SGFuZGxlU2hhcGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEseUJBQXlCLEdBQUcsUUFBbEM7QUFFQSxJQUFNQyxTQUFTLEdBQUc7QUFDaEJDLEVBQUFBLENBQUMsRUFBRSxDQUFDLENBRFk7QUFFaEJDLEVBQUFBLENBQUMsRUFBRSxDQUFDLENBRlk7QUFHaEJDLEVBQUFBLE1BQU0sRUFBRSxFQUhRO0FBSWhCQyxFQUFBQSxLQUFLLEVBQUU7QUFKUyxDQUFsQjtBQU9PLElBQU1DLDBCQUEwQixHQUFHQyxrQkFBT0MsT0FBMUM7O0FBRUEsSUFBTUMsbUJBQW1CLHNGQUM3QkMsNkJBQWFDLFFBRGdCLEVBQ0xKLGtCQUFPQyxPQURGLDBEQUU3QkUsNkJBQWFFLE9BRmdCLEVBRU5MLGtCQUFPTSxTQUZELHdCQUF6Qjs7QUFLQSxJQUFNQyx3QkFBd0IsR0FBRyxTQUFqQzs7QUFFQSxJQUFNQyxpQkFBaUIsa0ZBQzNCTCw2QkFBYUMsUUFEYyxFQUNISixrQkFBT00sU0FESix3REFFM0JILDZCQUFhRSxPQUZjLEVBRUpMLGtCQUFPTSxTQUZILHdEQUczQkgsNkJBQWFNLFFBSGMsRUFHSFQsa0JBQU9DLE9BSEosd0RBSTNCRSw2QkFBYU8sV0FKYyxFQUlBVixrQkFBT0MsT0FKUCxzQkFBdkI7O0FBT1AsSUFBTVUseUJBQXlCLEdBQUcsQ0FBbEM7QUFFTyxJQUFNQyxrQkFBa0Isb0ZBQzVCQyw0QkFBWUMsS0FEZ0IsRUFDUixVQUFBQyxLQUFLO0FBQUEsU0FBSztBQUM3QkMsSUFBQUEsSUFBSSxFQUFFUixpQkFBaUIsQ0FBQ08sS0FBRCxDQURNO0FBRTdCRSxJQUFBQSxNQUFNLEVBQUVGLEtBQUssS0FBS1osNkJBQWFDLFFBQXZCLEdBQWtDSixrQkFBT0MsT0FBekMsR0FBbURGO0FBRjlCLEdBQUw7QUFBQSxDQURHLHlEQUs1QmMsNEJBQVlLLFdBTGdCLEVBS0Y7QUFBQSxTQUFNeEIsU0FBTjtBQUFBLENBTEUseURBTTVCbUIsNEJBQVlNLFNBTmdCLEVBTUo7QUFBQSxTQUFNekIsU0FBTjtBQUFBLENBTkkseURBTzVCbUIsNEJBQVlPLE9BUGdCLEVBT047QUFBQSxTQUFNMUIsU0FBTjtBQUFBLENBUE0sdUJBQXhCOztBQVVBLElBQU0yQiwyQkFBMkIsR0FBRyxDQUFwQzs7QUFFQSxJQUFNQyxjQUFjLEdBQUcsQ0FBdkI7OztBQUVQLFNBQVNDLElBQVQsR0FBZ0IsQ0FBRTs7QUFFWCxTQUFTQyxRQUFULE9BQW9DO0FBQUEsTUFBakJDLE9BQWlCLFFBQWpCQSxPQUFpQjtBQUFBLE1BQVJWLEtBQVEsUUFBUkEsS0FBUTtBQUN6QyxNQUFNVyxTQUFTLEdBQUcsd0JBQUlELE9BQUosRUFBYSxDQUFDLFlBQUQsRUFBZSxXQUFmLENBQWIsRUFBMEMsSUFBMUMsQ0FBbEI7QUFFQSxNQUFNRSxLQUFLLEdBQUc7QUFDWlYsSUFBQUEsTUFBTSxFQUFFZixtQkFBbUIsQ0FBQ2EsS0FBRCxDQUFuQixJQUE4QmhCLDBCQUQxQjtBQUVaNkIsSUFBQUEsV0FBVyxFQUFFRixTQUFTLEdBQUdmLHlCQUFILEdBQStCLENBRnpDO0FBR1pLLElBQUFBLElBQUksRUFBRVQsd0JBSE07QUFJWnNCLElBQUFBLFdBQVcsRUFBRVIsMkJBSkQ7QUFLWlMsSUFBQUEsQ0FBQyxFQUFFUjtBQUxTLEdBQWQ7QUFRQSxNQUFNUyxVQUFVLEdBQUdOLE9BQU8sQ0FBQ08sVUFBUixHQUFxQlAsT0FBTyxDQUFDTyxVQUFSLENBQW1CRCxVQUF4QyxHQUFxRE4sT0FBTyxDQUFDTSxVQUFoRjtBQUVBLHlDQUNLSixLQURMLEdBRUssQ0FBQ2Ysa0JBQWtCLENBQUNtQixVQUFELENBQWxCLElBQWtDUixJQUFuQyxFQUF5Q1IsS0FBekMsQ0FGTDtBQUlEOztBQUVNLFNBQVNrQixrQkFBVCxHQUE4QjtBQUNuQyxTQUFPeEMseUJBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7UmVuZGVyU3RhdGVzLCBSZW5kZXJUeXBlc30gZnJvbSAncmVhY3QtbWFwLWdsLWRyYXcnO1xuaW1wb3J0IHtDT0xPUlN9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCBnZXQgZnJvbSAnbG9kYXNoLmdldCc7XG5cbmNvbnN0IERFRkFVTFRfRURJVF9IQU5ETEVfU0hBUEUgPSAnY2lyY2xlJztcblxuY29uc3QgcmVjdFN0eWxlID0ge1xuICB4OiAtNixcbiAgeTogLTYsXG4gIGhlaWdodDogMTIsXG4gIHdpZHRoOiAxMlxufTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfU1RBVEVfU1RZTEVfU1RST0tFID0gQ09MT1JTLlBSSU1BUlk7XG5cbmV4cG9ydCBjb25zdCBTVEFURV9TVFlMRVNfU1RST0tFID0ge1xuICBbUmVuZGVyU3RhdGVzLlNFTEVDVEVEXTogQ09MT1JTLlBSSU1BUlksXG4gIFtSZW5kZXJTdGF0ZXMuSE9WRVJFRF06IENPTE9SUy5TRUNPTkRBUllcbn07XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1NUQVRFX1NUWUxFX0ZJTEwgPSAnI2ZmZmZmZic7XG5cbmV4cG9ydCBjb25zdCBTVEFURV9TVFlMRVNfRklMTCA9IHtcbiAgW1JlbmRlclN0YXRlcy5TRUxFQ1RFRF06IENPTE9SUy5TRUNPTkRBUlksXG4gIFtSZW5kZXJTdGF0ZXMuSE9WRVJFRF06IENPTE9SUy5TRUNPTkRBUlksXG4gIFtSZW5kZXJTdGF0ZXMuSU5BQ1RJVkVdOiBDT0xPUlMuUFJJTUFSWSxcbiAgW1JlbmRlclN0YXRlcy5VTkNPTU1JVFRFRF06IENPTE9SUy5QUklNQVJZXG59O1xuXG5jb25zdCBTVEFURV9TVFlMRVNfU1RST0tFX1dJRFRIID0gMTtcblxuZXhwb3J0IGNvbnN0IFJFTkRFUl9UWVBFX1NUWUxFUyA9IHtcbiAgW1JlbmRlclR5cGVzLlBPSU5UXTogc3RhdGUgPT4gKHtcbiAgICBmaWxsOiBTVEFURV9TVFlMRVNfRklMTFtzdGF0ZV0sXG4gICAgc3Ryb2tlOiBzdGF0ZSA9PT0gUmVuZGVyU3RhdGVzLlNFTEVDVEVEID8gQ09MT1JTLlBSSU1BUlkgOiBERUZBVUxUX1NUQVRFX1NUWUxFX1NUUk9LRVxuICB9KSxcbiAgW1JlbmRlclR5cGVzLkxJTkVfU1RSSU5HXTogKCkgPT4gcmVjdFN0eWxlLFxuICBbUmVuZGVyVHlwZXMuUkVDVEFOR0xFXTogKCkgPT4gcmVjdFN0eWxlLFxuICBbUmVuZGVyVHlwZXMuUE9MWUdPTl06ICgpID0+IHJlY3RTdHlsZVxufTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfU1RBVEVfU1RZTEVfT1BBQ0lUWSA9IDA7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1JBRElVUyA9IDU7XG5cbmZ1bmN0aW9uIG5vT3AoKSB7fVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3R5bGUoe2ZlYXR1cmUsIHN0YXRlfSkge1xuICBjb25zdCBpc1Zpc2libGUgPSBnZXQoZmVhdHVyZSwgWydwcm9wZXJ0aWVzJywgJ2lzVmlzaWJsZSddLCB0cnVlKTtcblxuICBjb25zdCBzdHlsZSA9IHtcbiAgICBzdHJva2U6IFNUQVRFX1NUWUxFU19TVFJPS0Vbc3RhdGVdIHx8IERFRkFVTFRfU1RBVEVfU1RZTEVfU1RST0tFLFxuICAgIHN0cm9rZVdpZHRoOiBpc1Zpc2libGUgPyBTVEFURV9TVFlMRVNfU1RST0tFX1dJRFRIIDogMCxcbiAgICBmaWxsOiBERUZBVUxUX1NUQVRFX1NUWUxFX0ZJTEwsXG4gICAgZmlsbE9wYWNpdHk6IERFRkFVTFRfU1RBVEVfU1RZTEVfT1BBQ0lUWSxcbiAgICByOiBERUZBVUxUX1JBRElVU1xuICB9O1xuXG4gIGNvbnN0IHJlbmRlclR5cGUgPSBmZWF0dXJlLnByb3BlcnRpZXMgPyBmZWF0dXJlLnByb3BlcnRpZXMucmVuZGVyVHlwZSA6IGZlYXR1cmUucmVuZGVyVHlwZTtcblxuICByZXR1cm4ge1xuICAgIC4uLnN0eWxlLFxuICAgIC4uLihSRU5ERVJfVFlQRV9TVFlMRVNbcmVuZGVyVHlwZV0gfHwgbm9PcCkoc3RhdGUpXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFZGl0SGFuZGxlU2hhcGUoKSB7XG4gIHJldHVybiBERUZBVUxUX0VESVRfSEFORExFX1NIQVBFO1xufVxuIl19