"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _base = _interopRequireDefault(require("../../components/common/icons/base"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var P3LayerIcon = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(P3LayerIcon, _Component);

  var _super = _createSuper(P3LayerIcon);

  function P3LayerIcon() {
    (0, _classCallCheck2["default"])(this, P3LayerIcon);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(P3LayerIcon, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(_base["default"], this.props, /*#__PURE__*/_react["default"].createElement("polygon", {
        className: "cr1",
        points: "23.9,10 30.9,14 30.9,22.1 23.9,26.2 16.8,22.1 16.8,14 ",
        style: {
          opacity: 0.6
        }
      }), /*#__PURE__*/_react["default"].createElement("polygon", {
        className: "cr2",
        points: "23.9,37.8 30.9,41.9 30.9,50 23.9,54 16.8,50 16.8,41.9 ",
        style: {
          opacity: 0.4
        }
      }), /*#__PURE__*/_react["default"].createElement("polygon", {
        className: "cr6",
        points: "40.1,10 47.2,14 47.2,22.1 40.1,26.2 33.1,22.1 33.1,14 "
      }), /*#__PURE__*/_react["default"].createElement("polygon", {
        className: "cr3",
        points: "40.1,37.8 47.2,41.9 47.2,50 40.1,54 33.1,50 33.1,41.9 ",
        style: {
          opacity: 0.8
        }
      }), /*#__PURE__*/_react["default"].createElement("polygon", {
        className: "cr1",
        points: "15.8,23.9 22.8,27.9 22.8,36.1 15.8,40.1 8.7,36.1 8.7,27.9 "
      }), /*#__PURE__*/_react["default"].createElement("polygon", {
        className: "cr4",
        points: "32,23.9 39,27.9 39,36.1 32,40.1 25,36.1 25,27.9 ",
        style: {
          opacity: 0.8
        }
      }), /*#__PURE__*/_react["default"].createElement("polygon", {
        className: "cr5",
        points: "48.2,23.9 55.3,27.9 55.3,36.1 48.2,40.1 41.2,36.1 41.2,27.9 ",
        style: {
          opacity: 0.4
        }
      }));
    }
  }]);
  return P3LayerIcon;
}(_react.Component);

exports["default"] = P3LayerIcon;
(0, _defineProperty2["default"])(P3LayerIcon, "propTypes", {
  /** Set the height of the icon, ex. '16px' */
  height: _propTypes["default"].string,
  colors: _propTypes["default"].arrayOf(_propTypes["default"].string)
});
(0, _defineProperty2["default"])(P3LayerIcon, "defaultProps", {
  height: '16px',
  predefinedClassName: 'hexagon-layer-icon',
  totalColor: 6
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvcDMtbGF5ZXIvcDMtbGF5ZXItaWNvbi5qcyJdLCJuYW1lcyI6WyJQM0xheWVySWNvbiIsInByb3BzIiwib3BhY2l0eSIsIkNvbXBvbmVudCIsImhlaWdodCIsIlByb3BUeXBlcyIsInN0cmluZyIsImNvbG9ycyIsImFycmF5T2YiLCJwcmVkZWZpbmVkQ2xhc3NOYW1lIiwidG90YWxDb2xvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7Ozs7OztJQUVxQkEsVzs7Ozs7Ozs7Ozs7O1dBYW5CLGtCQUFTO0FBQ1AsMEJBQ0UsZ0NBQUMsZ0JBQUQsRUFBVSxLQUFLQyxLQUFmLGVBQ0U7QUFDRSxRQUFBLFNBQVMsRUFBQyxLQURaO0FBRUUsUUFBQSxNQUFNLEVBQUMsd0RBRlQ7QUFHRSxRQUFBLEtBQUssRUFBRTtBQUFDQyxVQUFBQSxPQUFPLEVBQUU7QUFBVjtBQUhULFFBREYsZUFNRTtBQUNFLFFBQUEsU0FBUyxFQUFDLEtBRFo7QUFFRSxRQUFBLE1BQU0sRUFBQyx3REFGVDtBQUdFLFFBQUEsS0FBSyxFQUFFO0FBQUNBLFVBQUFBLE9BQU8sRUFBRTtBQUFWO0FBSFQsUUFORixlQVdFO0FBQVMsUUFBQSxTQUFTLEVBQUMsS0FBbkI7QUFBeUIsUUFBQSxNQUFNLEVBQUM7QUFBaEMsUUFYRixlQVlFO0FBQ0UsUUFBQSxTQUFTLEVBQUMsS0FEWjtBQUVFLFFBQUEsTUFBTSxFQUFDLHdEQUZUO0FBR0UsUUFBQSxLQUFLLEVBQUU7QUFBQ0EsVUFBQUEsT0FBTyxFQUFFO0FBQVY7QUFIVCxRQVpGLGVBaUJFO0FBQ0UsUUFBQSxTQUFTLEVBQUMsS0FEWjtBQUVFLFFBQUEsTUFBTSxFQUFDO0FBRlQsUUFqQkYsZUFxQkU7QUFDRSxRQUFBLFNBQVMsRUFBQyxLQURaO0FBRUUsUUFBQSxNQUFNLEVBQUMsa0RBRlQ7QUFHRSxRQUFBLEtBQUssRUFBRTtBQUFDQSxVQUFBQSxPQUFPLEVBQUU7QUFBVjtBQUhULFFBckJGLGVBMEJFO0FBQ0UsUUFBQSxTQUFTLEVBQUMsS0FEWjtBQUVFLFFBQUEsTUFBTSxFQUFDLDhEQUZUO0FBR0UsUUFBQSxLQUFLLEVBQUU7QUFBQ0EsVUFBQUEsT0FBTyxFQUFFO0FBQVY7QUFIVCxRQTFCRixDQURGO0FBa0NEOzs7RUFoRHNDQyxnQjs7O2lDQUFwQkgsVyxlQUNBO0FBQ2pCO0FBQ0FJLEVBQUFBLE1BQU0sRUFBRUMsc0JBQVVDLE1BRkQ7QUFHakJDLEVBQUFBLE1BQU0sRUFBRUYsc0JBQVVHLE9BQVYsQ0FBa0JILHNCQUFVQyxNQUE1QjtBQUhTLEM7aUNBREFOLFcsa0JBT0c7QUFDcEJJLEVBQUFBLE1BQU0sRUFBRSxNQURZO0FBRXBCSyxFQUFBQSxtQkFBbUIsRUFBRSxvQkFGRDtBQUdwQkMsRUFBQUEsVUFBVSxFQUFFO0FBSFEsQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBCYXNlIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zL2Jhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQM0xheWVySWNvbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgLyoqIFNldCB0aGUgaGVpZ2h0IG9mIHRoZSBpY29uLCBleC4gJzE2cHgnICovXG4gICAgaGVpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbG9yczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZylcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGhlaWdodDogJzE2cHgnLFxuICAgIHByZWRlZmluZWRDbGFzc05hbWU6ICdoZXhhZ29uLWxheWVyLWljb24nLFxuICAgIHRvdGFsQ29sb3I6IDZcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxCYXNlIHsuLi50aGlzLnByb3BzfT5cbiAgICAgICAgPHBvbHlnb25cbiAgICAgICAgICBjbGFzc05hbWU9XCJjcjFcIlxuICAgICAgICAgIHBvaW50cz1cIjIzLjksMTAgMzAuOSwxNCAzMC45LDIyLjEgMjMuOSwyNi4yIDE2LjgsMjIuMSAxNi44LDE0IFwiXG4gICAgICAgICAgc3R5bGU9e3tvcGFjaXR5OiAwLjZ9fVxuICAgICAgICAvPlxuICAgICAgICA8cG9seWdvblxuICAgICAgICAgIGNsYXNzTmFtZT1cImNyMlwiXG4gICAgICAgICAgcG9pbnRzPVwiMjMuOSwzNy44IDMwLjksNDEuOSAzMC45LDUwIDIzLjksNTQgMTYuOCw1MCAxNi44LDQxLjkgXCJcbiAgICAgICAgICBzdHlsZT17e29wYWNpdHk6IDAuNH19XG4gICAgICAgIC8+XG4gICAgICAgIDxwb2x5Z29uIGNsYXNzTmFtZT1cImNyNlwiIHBvaW50cz1cIjQwLjEsMTAgNDcuMiwxNCA0Ny4yLDIyLjEgNDAuMSwyNi4yIDMzLjEsMjIuMSAzMy4xLDE0IFwiIC8+XG4gICAgICAgIDxwb2x5Z29uXG4gICAgICAgICAgY2xhc3NOYW1lPVwiY3IzXCJcbiAgICAgICAgICBwb2ludHM9XCI0MC4xLDM3LjggNDcuMiw0MS45IDQ3LjIsNTAgNDAuMSw1NCAzMy4xLDUwIDMzLjEsNDEuOSBcIlxuICAgICAgICAgIHN0eWxlPXt7b3BhY2l0eTogMC44fX1cbiAgICAgICAgLz5cbiAgICAgICAgPHBvbHlnb25cbiAgICAgICAgICBjbGFzc05hbWU9XCJjcjFcIlxuICAgICAgICAgIHBvaW50cz1cIjE1LjgsMjMuOSAyMi44LDI3LjkgMjIuOCwzNi4xIDE1LjgsNDAuMSA4LjcsMzYuMSA4LjcsMjcuOSBcIlxuICAgICAgICAvPlxuICAgICAgICA8cG9seWdvblxuICAgICAgICAgIGNsYXNzTmFtZT1cImNyNFwiXG4gICAgICAgICAgcG9pbnRzPVwiMzIsMjMuOSAzOSwyNy45IDM5LDM2LjEgMzIsNDAuMSAyNSwzNi4xIDI1LDI3LjkgXCJcbiAgICAgICAgICBzdHlsZT17e29wYWNpdHk6IDAuOH19XG4gICAgICAgIC8+XG4gICAgICAgIDxwb2x5Z29uXG4gICAgICAgICAgY2xhc3NOYW1lPVwiY3I1XCJcbiAgICAgICAgICBwb2ludHM9XCI0OC4yLDIzLjkgNTUuMywyNy45IDU1LjMsMzYuMSA0OC4yLDQwLjEgNDEuMiwzNi4xIDQxLjIsMjcuOSBcIlxuICAgICAgICAgIHN0eWxlPXt7b3BhY2l0eTogMC40fX1cbiAgICAgICAgLz5cbiAgICAgIDwvQmFzZT5cbiAgICApO1xuICB9XG59XG4iXX0=