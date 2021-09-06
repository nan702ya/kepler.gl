"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _icons = require("../common/icons");

var _localization = require("../../localization");

var _styledComponents = require("../common/styled-components");

var _mapControlTooltip = _interopRequireDefault(require("./map-control-tooltip"));

var _mapControlPanel = _interopRequireDefault(require("./map-control-panel"));

var _mapLegend = _interopRequireDefault(require("./map-legend"));

// Copyright (c) 2021 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
var MapLegendTooltip = function MapLegendTooltip(_ref) {
  var id = _ref.id,
      message = _ref.message;
  return /*#__PURE__*/_react["default"].createElement(_styledComponents.Tooltip, {
    id: id,
    place: "left",
    effect: "solid"
  }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
    id: message
  })));
};

MapLegendPanelFactory.deps = [_mapControlTooltip["default"], _mapControlPanel["default"], _mapLegend["default"]];

function MapLegendPanelFactory(MapControlTooltip, MapControlPanel, MapLegend) {
  var defaultActionIcons = {
    legend: _icons.Legend
  };
  /** @type {import('./map-legend-panel').MapLegendPanelComponent} */

  var MapLegendPanel = function MapLegendPanel(_ref2) {
    var layers = _ref2.layers,
        mapControls = _ref2.mapControls,
        scale = _ref2.scale,
        onToggleMapControl = _ref2.onToggleMapControl,
        isExport = _ref2.isExport,
        logoComponent = _ref2.logoComponent,
        _ref2$actionIcons = _ref2.actionIcons,
        actionIcons = _ref2$actionIcons === void 0 ? defaultActionIcons : _ref2$actionIcons;
    var mapLegend = (mapControls === null || mapControls === void 0 ? void 0 : mapControls.mapLegend) || {};

    var _ref3 = mapLegend || {},
        isActive = _ref3.active,
        disableClose = _ref3.disableClose;

    var onToggleMenuPanel = (0, _react.useCallback)(function () {
      return onToggleMapControl('mapLegend');
    }, [onToggleMapControl]);
    var onClick = (0, _react.useCallback)(function (e) {
      e.preventDefault();
      onToggleMenuPanel();
    }, [onToggleMenuPanel]);

    if (!mapLegend.show) {
      return null;
    }

    return !isActive ? /*#__PURE__*/_react["default"].createElement(_styledComponents.MapControlButton, {
      "data-tip": true,
      "data-for": "show-legend",
      className: "map-control-button show-legend",
      onClick: onClick
    }, /*#__PURE__*/_react["default"].createElement(actionIcons.legend, {
      height: "22px"
    }), /*#__PURE__*/_react["default"].createElement(MapLegendTooltip, {
      id: "show-legend",
      message: 'tooltip.showLegend'
    })) : /*#__PURE__*/_react["default"].createElement(MapControlPanel, {
      scale: scale,
      header: 'header.layerLegend',
      onClick: onToggleMenuPanel,
      isExport: isExport,
      disableClose: disableClose,
      logoComponent: logoComponent
    }, /*#__PURE__*/_react["default"].createElement(MapLegend, {
      layers: layers
    }));
  };

  MapLegendPanel.displayName = 'MapControlPanel';
  return MapLegendPanel;
}

var _default = MapLegendPanelFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21hcC9tYXAtbGVnZW5kLXBhbmVsLmpzIl0sIm5hbWVzIjpbIk1hcExlZ2VuZFRvb2x0aXAiLCJpZCIsIm1lc3NhZ2UiLCJNYXBMZWdlbmRQYW5lbEZhY3RvcnkiLCJkZXBzIiwiTWFwQ29udHJvbFRvb2x0aXBGYWN0b3J5IiwiTWFwQ29udHJvbFBhbmVsRmFjdG9yeSIsIk1hcExlZ2VuZEZhY3RvcnkiLCJNYXBDb250cm9sVG9vbHRpcCIsIk1hcENvbnRyb2xQYW5lbCIsIk1hcExlZ2VuZCIsImRlZmF1bHRBY3Rpb25JY29ucyIsImxlZ2VuZCIsIkxlZ2VuZCIsIk1hcExlZ2VuZFBhbmVsIiwibGF5ZXJzIiwibWFwQ29udHJvbHMiLCJzY2FsZSIsIm9uVG9nZ2xlTWFwQ29udHJvbCIsImlzRXhwb3J0IiwibG9nb0NvbXBvbmVudCIsImFjdGlvbkljb25zIiwibWFwTGVnZW5kIiwiaXNBY3RpdmUiLCJhY3RpdmUiLCJkaXNhYmxlQ2xvc2UiLCJvblRvZ2dsZU1lbnVQYW5lbCIsIm9uQ2xpY2siLCJlIiwicHJldmVudERlZmF1bHQiLCJzaG93IiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQTFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVVBLElBQU1BLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUI7QUFBQSxNQUFFQyxFQUFGLFFBQUVBLEVBQUY7QUFBQSxNQUFNQyxPQUFOLFFBQU1BLE9BQU47QUFBQSxzQkFDdkIsZ0NBQUMseUJBQUQ7QUFBUyxJQUFBLEVBQUUsRUFBRUQsRUFBYjtBQUFpQixJQUFBLEtBQUssRUFBQyxNQUF2QjtBQUE4QixJQUFBLE1BQU0sRUFBQztBQUFyQyxrQkFDRSwyREFDRSxnQ0FBQyw4QkFBRDtBQUFrQixJQUFBLEVBQUUsRUFBRUM7QUFBdEIsSUFERixDQURGLENBRHVCO0FBQUEsQ0FBekI7O0FBUUFDLHFCQUFxQixDQUFDQyxJQUF0QixHQUE2QixDQUFDQyw2QkFBRCxFQUEyQkMsMkJBQTNCLEVBQW1EQyxxQkFBbkQsQ0FBN0I7O0FBRUEsU0FBU0oscUJBQVQsQ0FBK0JLLGlCQUEvQixFQUFrREMsZUFBbEQsRUFBbUVDLFNBQW5FLEVBQThFO0FBQzVFLE1BQU1DLGtCQUFrQixHQUFHO0FBQ3pCQyxJQUFBQSxNQUFNLEVBQUVDO0FBRGlCLEdBQTNCO0FBSUE7O0FBQ0EsTUFBTUMsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixRQVFqQjtBQUFBLFFBUEpDLE1BT0ksU0FQSkEsTUFPSTtBQUFBLFFBTkpDLFdBTUksU0FOSkEsV0FNSTtBQUFBLFFBTEpDLEtBS0ksU0FMSkEsS0FLSTtBQUFBLFFBSkpDLGtCQUlJLFNBSkpBLGtCQUlJO0FBQUEsUUFISkMsUUFHSSxTQUhKQSxRQUdJO0FBQUEsUUFGSkMsYUFFSSxTQUZKQSxhQUVJO0FBQUEsa0NBREpDLFdBQ0k7QUFBQSxRQURKQSxXQUNJLGtDQURVVixrQkFDVjtBQUNKLFFBQU1XLFNBQVMsR0FBRyxDQUFBTixXQUFXLFNBQVgsSUFBQUEsV0FBVyxXQUFYLFlBQUFBLFdBQVcsQ0FBRU0sU0FBYixLQUEwQixFQUE1Qzs7QUFESSxnQkFFcUNBLFNBQVMsSUFBSSxFQUZsRDtBQUFBLFFBRVdDLFFBRlgsU0FFR0MsTUFGSDtBQUFBLFFBRXFCQyxZQUZyQixTQUVxQkEsWUFGckI7O0FBR0osUUFBTUMsaUJBQWlCLEdBQUcsd0JBQVk7QUFBQSxhQUFNUixrQkFBa0IsQ0FBQyxXQUFELENBQXhCO0FBQUEsS0FBWixFQUFtRCxDQUMzRUEsa0JBRDJFLENBQW5ELENBQTFCO0FBSUEsUUFBTVMsT0FBTyxHQUFHLHdCQUNkLFVBQUFDLENBQUMsRUFBSTtBQUNIQSxNQUFBQSxDQUFDLENBQUNDLGNBQUY7QUFDQUgsTUFBQUEsaUJBQWlCO0FBQ2xCLEtBSmEsRUFLZCxDQUFDQSxpQkFBRCxDQUxjLENBQWhCOztBQVFBLFFBQUksQ0FBQ0osU0FBUyxDQUFDUSxJQUFmLEVBQXFCO0FBQ25CLGFBQU8sSUFBUDtBQUNEOztBQUNELFdBQU8sQ0FBQ1AsUUFBRCxnQkFDSixnQ0FBQyxrQ0FBRDtBQUNDLHNCQUREO0FBRUMsa0JBQVMsYUFGVjtBQUdDLE1BQUEsU0FBUyxFQUFDLGdDQUhYO0FBSUMsTUFBQSxPQUFPLEVBQUVJO0FBSlYsb0JBTUMsZ0NBQUMsV0FBRCxDQUFhLE1BQWI7QUFBb0IsTUFBQSxNQUFNLEVBQUM7QUFBM0IsTUFORCxlQU9DLGdDQUFDLGdCQUFEO0FBQWtCLE1BQUEsRUFBRSxFQUFDLGFBQXJCO0FBQW1DLE1BQUEsT0FBTyxFQUFFO0FBQTVDLE1BUEQsQ0FESSxnQkFXSixnQ0FBQyxlQUFEO0FBQ0MsTUFBQSxLQUFLLEVBQUVWLEtBRFI7QUFFQyxNQUFBLE1BQU0sRUFBRSxvQkFGVDtBQUdDLE1BQUEsT0FBTyxFQUFFUyxpQkFIVjtBQUlDLE1BQUEsUUFBUSxFQUFFUCxRQUpYO0FBS0MsTUFBQSxZQUFZLEVBQUVNLFlBTGY7QUFNQyxNQUFBLGFBQWEsRUFBRUw7QUFOaEIsb0JBUUMsZ0NBQUMsU0FBRDtBQUFXLE1BQUEsTUFBTSxFQUFFTDtBQUFuQixNQVJELENBWEg7QUFzQkQsR0FoREQ7O0FBa0RBRCxFQUFBQSxjQUFjLENBQUNpQixXQUFmLEdBQTZCLGlCQUE3QjtBQUNBLFNBQU9qQixjQUFQO0FBQ0Q7O2VBRWNYLHFCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIxIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7dXNlQ2FsbGJhY2t9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7TGVnZW5kfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucyc7XG5pbXBvcnQge0Zvcm1hdHRlZE1lc3NhZ2V9IGZyb20gJ2xvY2FsaXphdGlvbic7XG5pbXBvcnQge01hcENvbnRyb2xCdXR0b24sIFRvb2x0aXB9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBNYXBDb250cm9sVG9vbHRpcEZhY3RvcnkgZnJvbSAnLi9tYXAtY29udHJvbC10b29sdGlwJztcbmltcG9ydCBNYXBDb250cm9sUGFuZWxGYWN0b3J5IGZyb20gJy4vbWFwLWNvbnRyb2wtcGFuZWwnO1xuaW1wb3J0IE1hcExlZ2VuZEZhY3RvcnkgZnJvbSAnLi9tYXAtbGVnZW5kJztcblxuY29uc3QgTWFwTGVnZW5kVG9vbHRpcCA9ICh7aWQsIG1lc3NhZ2V9KSA9PiAoXG4gIDxUb29sdGlwIGlkPXtpZH0gcGxhY2U9XCJsZWZ0XCIgZWZmZWN0PVwic29saWRcIj5cbiAgICA8c3Bhbj5cbiAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXttZXNzYWdlfSAvPlxuICAgIDwvc3Bhbj5cbiAgPC9Ub29sdGlwPlxuKTtcblxuTWFwTGVnZW5kUGFuZWxGYWN0b3J5LmRlcHMgPSBbTWFwQ29udHJvbFRvb2x0aXBGYWN0b3J5LCBNYXBDb250cm9sUGFuZWxGYWN0b3J5LCBNYXBMZWdlbmRGYWN0b3J5XTtcblxuZnVuY3Rpb24gTWFwTGVnZW5kUGFuZWxGYWN0b3J5KE1hcENvbnRyb2xUb29sdGlwLCBNYXBDb250cm9sUGFuZWwsIE1hcExlZ2VuZCkge1xuICBjb25zdCBkZWZhdWx0QWN0aW9uSWNvbnMgPSB7XG4gICAgbGVnZW5kOiBMZWdlbmRcbiAgfTtcblxuICAvKiogQHR5cGUge2ltcG9ydCgnLi9tYXAtbGVnZW5kLXBhbmVsJykuTWFwTGVnZW5kUGFuZWxDb21wb25lbnR9ICovXG4gIGNvbnN0IE1hcExlZ2VuZFBhbmVsID0gKHtcbiAgICBsYXllcnMsXG4gICAgbWFwQ29udHJvbHMsXG4gICAgc2NhbGUsXG4gICAgb25Ub2dnbGVNYXBDb250cm9sLFxuICAgIGlzRXhwb3J0LFxuICAgIGxvZ29Db21wb25lbnQsXG4gICAgYWN0aW9uSWNvbnMgPSBkZWZhdWx0QWN0aW9uSWNvbnNcbiAgfSkgPT4ge1xuICAgIGNvbnN0IG1hcExlZ2VuZCA9IG1hcENvbnRyb2xzPy5tYXBMZWdlbmQgfHwge307XG4gICAgY29uc3Qge2FjdGl2ZTogaXNBY3RpdmUsIGRpc2FibGVDbG9zZX0gPSBtYXBMZWdlbmQgfHwge307XG4gICAgY29uc3Qgb25Ub2dnbGVNZW51UGFuZWwgPSB1c2VDYWxsYmFjaygoKSA9PiBvblRvZ2dsZU1hcENvbnRyb2woJ21hcExlZ2VuZCcpLCBbXG4gICAgICBvblRvZ2dsZU1hcENvbnRyb2xcbiAgICBdKTtcblxuICAgIGNvbnN0IG9uQ2xpY2sgPSB1c2VDYWxsYmFjayhcbiAgICAgIGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIG9uVG9nZ2xlTWVudVBhbmVsKCk7XG4gICAgICB9LFxuICAgICAgW29uVG9nZ2xlTWVudVBhbmVsXVxuICAgICk7XG5cbiAgICBpZiAoIW1hcExlZ2VuZC5zaG93KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuICFpc0FjdGl2ZSA/IChcbiAgICAgICg8TWFwQ29udHJvbEJ1dHRvblxuICAgICAgICBkYXRhLXRpcFxuICAgICAgICBkYXRhLWZvcj1cInNob3ctbGVnZW5kXCJcbiAgICAgICAgY2xhc3NOYW1lPVwibWFwLWNvbnRyb2wtYnV0dG9uIHNob3ctbGVnZW5kXCJcbiAgICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgID5cbiAgICAgICAgPGFjdGlvbkljb25zLmxlZ2VuZCBoZWlnaHQ9XCIyMnB4XCIgLz5cbiAgICAgICAgPE1hcExlZ2VuZFRvb2x0aXAgaWQ9XCJzaG93LWxlZ2VuZFwiIG1lc3NhZ2U9eyd0b29sdGlwLnNob3dMZWdlbmQnfSAvPlxuICAgICAgPC9NYXBDb250cm9sQnV0dG9uPilcbiAgICApIDogKFxuICAgICAgKDxNYXBDb250cm9sUGFuZWxcbiAgICAgICAgc2NhbGU9e3NjYWxlfVxuICAgICAgICBoZWFkZXI9eydoZWFkZXIubGF5ZXJMZWdlbmQnfVxuICAgICAgICBvbkNsaWNrPXtvblRvZ2dsZU1lbnVQYW5lbH1cbiAgICAgICAgaXNFeHBvcnQ9e2lzRXhwb3J0fVxuICAgICAgICBkaXNhYmxlQ2xvc2U9e2Rpc2FibGVDbG9zZX1cbiAgICAgICAgbG9nb0NvbXBvbmVudD17bG9nb0NvbXBvbmVudH1cbiAgICAgID5cbiAgICAgICAgPE1hcExlZ2VuZCBsYXllcnM9e2xheWVyc30gLz5cbiAgICAgIDwvTWFwQ29udHJvbFBhbmVsPilcbiAgICApO1xuICB9O1xuXG4gIE1hcExlZ2VuZFBhbmVsLmRpc3BsYXlOYW1lID0gJ01hcENvbnRyb2xQYW5lbCc7XG4gIHJldHVybiBNYXBMZWdlbmRQYW5lbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFwTGVnZW5kUGFuZWxGYWN0b3J5O1xuIl19