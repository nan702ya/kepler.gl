"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("../common/styled-components");

var _icons = require("../common/icons");

var _mapLayerSelector = _interopRequireDefault(require("../common/map-layer-selector"));

var _mapControlTooltip = _interopRequireDefault(require("./map-control-tooltip"));

var _mapControlPanel = _interopRequireDefault(require("./map-control-panel"));

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
LayerSelectorPanelFactory.deps = [_mapControlTooltip["default"], _mapControlPanel["default"]];

function LayerSelectorPanelFactory(MapControlTooltip, MapControlPanel) {
  /** @type {import('./layer-selector-panel').LayerSelectorPanelComponent} */
  var LayerSelectorPanel = function LayerSelectorPanel(_ref) {
    var onMapToggleLayer = _ref.onMapToggleLayer,
        onToggleMapControl = _ref.onToggleMapControl,
        layers = _ref.layers,
        layersToRender = _ref.layersToRender,
        isSplit = _ref.isSplit,
        mapControls = _ref.mapControls,
        readOnly = _ref.readOnly;
    var visibleLayers = (mapControls === null || mapControls === void 0 ? void 0 : mapControls.visibleLayers) || {};

    var _ref2 = visibleLayers || {},
        isActive = _ref2.active,
        show = _ref2.show,
        disableClose = _ref2.disableClose;

    var legendLayers = (0, _react.useMemo)(function () {
      return layers.filter(function (_ref3) {
        var config = _ref3.config;
        return config.isVisible;
      }).map(function (_ref4) {
        var id = _ref4.id,
            config = _ref4.config;
        return {
          id: id,
          name: config.label,
          // layer
          isVisible: layersToRender[id]
        };
      });
    }, [layers, layersToRender]);
    var isVisible = (0, _react.useMemo)(function () {
      return isSplit && show && readOnly !== true;
    }, [isSplit, show, readOnly]);
    var onToggleMenuPanel = (0, _react.useCallback)(function (event) {
      event.preventDefault();
      onToggleMapControl('visibleLayers');
    }, [onToggleMapControl]);
    return isVisible ? !isActive ? /*#__PURE__*/_react["default"].createElement(_styledComponents.MapControlButton, {
      key: 1,
      onClick: onToggleMenuPanel,
      className: "map-control-button toggle-layer",
      "data-tip": true,
      "data-for": "toggle-layer"
    }, /*#__PURE__*/_react["default"].createElement(_icons.Layers, {
      height: "22px"
    }), /*#__PURE__*/_react["default"].createElement(MapControlTooltip, {
      id: "toggle-layer",
      message: isActive ? 'tooltip.hideLayerPanel' : 'tooltip.showLayerPanel'
    })) : /*#__PURE__*/_react["default"].createElement(MapControlPanel, {
      header: "header.visibleLayers",
      onClick: onToggleMenuPanel,
      disableClose: disableClose
    }, /*#__PURE__*/_react["default"].createElement(_mapLayerSelector["default"], {
      layers: legendLayers,
      onMapToggleLayer: onMapToggleLayer
    })) : null;
  };

  LayerSelectorPanel.displayName = 'LayerSelectorPanel';
  return /*#__PURE__*/_react["default"].memo(LayerSelectorPanel);
}

var _default = LayerSelectorPanelFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21hcC9sYXllci1zZWxlY3Rvci1wYW5lbC5qcyJdLCJuYW1lcyI6WyJMYXllclNlbGVjdG9yUGFuZWxGYWN0b3J5IiwiZGVwcyIsIk1hcENvbnRyb2xUb29sdGlwRmFjdG9yeSIsIk1hcENvbnRyb2xQYW5lbEZhY3RvcnkiLCJNYXBDb250cm9sVG9vbHRpcCIsIk1hcENvbnRyb2xQYW5lbCIsIkxheWVyU2VsZWN0b3JQYW5lbCIsIm9uTWFwVG9nZ2xlTGF5ZXIiLCJvblRvZ2dsZU1hcENvbnRyb2wiLCJsYXllcnMiLCJsYXllcnNUb1JlbmRlciIsImlzU3BsaXQiLCJtYXBDb250cm9scyIsInJlYWRPbmx5IiwidmlzaWJsZUxheWVycyIsImlzQWN0aXZlIiwiYWN0aXZlIiwic2hvdyIsImRpc2FibGVDbG9zZSIsImxlZ2VuZExheWVycyIsImZpbHRlciIsImNvbmZpZyIsImlzVmlzaWJsZSIsIm1hcCIsImlkIiwibmFtZSIsImxhYmVsIiwib25Ub2dnbGVNZW51UGFuZWwiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiZGlzcGxheU5hbWUiLCJSZWFjdCIsIm1lbW8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQXpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVNBQSx5QkFBeUIsQ0FBQ0MsSUFBMUIsR0FBaUMsQ0FBQ0MsNkJBQUQsRUFBMkJDLDJCQUEzQixDQUFqQzs7QUFFQSxTQUFTSCx5QkFBVCxDQUFtQ0ksaUJBQW5DLEVBQXNEQyxlQUF0RCxFQUF1RTtBQUNyRTtBQUNBLE1BQU1DLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsT0FRckI7QUFBQSxRQVBKQyxnQkFPSSxRQVBKQSxnQkFPSTtBQUFBLFFBTkpDLGtCQU1JLFFBTkpBLGtCQU1JO0FBQUEsUUFMSkMsTUFLSSxRQUxKQSxNQUtJO0FBQUEsUUFKSkMsY0FJSSxRQUpKQSxjQUlJO0FBQUEsUUFISkMsT0FHSSxRQUhKQSxPQUdJO0FBQUEsUUFGSkMsV0FFSSxRQUZKQSxXQUVJO0FBQUEsUUFESkMsUUFDSSxRQURKQSxRQUNJO0FBQ0osUUFBTUMsYUFBYSxHQUFHLENBQUFGLFdBQVcsU0FBWCxJQUFBQSxXQUFXLFdBQVgsWUFBQUEsV0FBVyxDQUFFRSxhQUFiLEtBQThCLEVBQXBEOztBQURJLGdCQUUyQ0EsYUFBYSxJQUFJLEVBRjVEO0FBQUEsUUFFV0MsUUFGWCxTQUVHQyxNQUZIO0FBQUEsUUFFcUJDLElBRnJCLFNBRXFCQSxJQUZyQjtBQUFBLFFBRTJCQyxZQUYzQixTQUUyQkEsWUFGM0I7O0FBSUosUUFBTUMsWUFBWSxHQUFHLG9CQUNuQjtBQUFBLGFBQ0VWLE1BQU0sQ0FDSFcsTUFESCxDQUNVO0FBQUEsWUFBRUMsTUFBRixTQUFFQSxNQUFGO0FBQUEsZUFBY0EsTUFBTSxDQUFDQyxTQUFyQjtBQUFBLE9BRFYsRUFFR0MsR0FGSCxDQUVPO0FBQUEsWUFBRUMsRUFBRixTQUFFQSxFQUFGO0FBQUEsWUFBTUgsTUFBTixTQUFNQSxNQUFOO0FBQUEsZUFBbUI7QUFDdEJHLFVBQUFBLEVBQUUsRUFBRkEsRUFEc0I7QUFFdEJDLFVBQUFBLElBQUksRUFBRUosTUFBTSxDQUFDSyxLQUZTO0FBR3RCO0FBQ0FKLFVBQUFBLFNBQVMsRUFBRVosY0FBYyxDQUFDYyxFQUFEO0FBSkgsU0FBbkI7QUFBQSxPQUZQLENBREY7QUFBQSxLQURtQixFQVVuQixDQUFDZixNQUFELEVBQVNDLGNBQVQsQ0FWbUIsQ0FBckI7QUFhQSxRQUFNWSxTQUFTLEdBQUcsb0JBQVE7QUFBQSxhQUFNWCxPQUFPLElBQUlNLElBQVgsSUFBbUJKLFFBQVEsS0FBSyxJQUF0QztBQUFBLEtBQVIsRUFBb0QsQ0FDcEVGLE9BRG9FLEVBRXBFTSxJQUZvRSxFQUdwRUosUUFIb0UsQ0FBcEQsQ0FBbEI7QUFNQSxRQUFNYyxpQkFBaUIsR0FBRyx3QkFDeEIsVUFBQUMsS0FBSyxFQUFJO0FBQ1BBLE1BQUFBLEtBQUssQ0FBQ0MsY0FBTjtBQUNBckIsTUFBQUEsa0JBQWtCLENBQUMsZUFBRCxDQUFsQjtBQUNELEtBSnVCLEVBS3hCLENBQUNBLGtCQUFELENBTHdCLENBQTFCO0FBUUEsV0FBT2MsU0FBUyxHQUNiLENBQUNQLFFBQUQsZ0JBQ0MsZ0NBQUMsa0NBQUQ7QUFDRSxNQUFBLEdBQUcsRUFBRSxDQURQO0FBRUUsTUFBQSxPQUFPLEVBQUVZLGlCQUZYO0FBR0UsTUFBQSxTQUFTLEVBQUMsaUNBSFo7QUFJRSxzQkFKRjtBQUtFLGtCQUFTO0FBTFgsb0JBT0UsZ0NBQUMsYUFBRDtBQUFRLE1BQUEsTUFBTSxFQUFDO0FBQWYsTUFQRixlQVFFLGdDQUFDLGlCQUFEO0FBQ0UsTUFBQSxFQUFFLEVBQUMsY0FETDtBQUVFLE1BQUEsT0FBTyxFQUFFWixRQUFRLEdBQUcsd0JBQUgsR0FBOEI7QUFGakQsTUFSRixDQURELGdCQWVDLGdDQUFDLGVBQUQ7QUFDRSxNQUFBLE1BQU0sRUFBQyxzQkFEVDtBQUVFLE1BQUEsT0FBTyxFQUFFWSxpQkFGWDtBQUdFLE1BQUEsWUFBWSxFQUFFVDtBQUhoQixvQkFLRSxnQ0FBQyw0QkFBRDtBQUFrQixNQUFBLE1BQU0sRUFBRUMsWUFBMUI7QUFBd0MsTUFBQSxnQkFBZ0IsRUFBRVo7QUFBMUQsTUFMRixDQWhCWSxHQXdCWixJQXhCSjtBQXlCRCxHQWhFRDs7QUFrRUFELEVBQUFBLGtCQUFrQixDQUFDd0IsV0FBbkIsR0FBaUMsb0JBQWpDO0FBRUEsc0JBQU9DLGtCQUFNQyxJQUFOLENBQVcxQixrQkFBWCxDQUFQO0FBQ0Q7O2VBRWNOLHlCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIxIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7dXNlQ2FsbGJhY2ssIHVzZU1lbW99IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7TWFwQ29udHJvbEJ1dHRvbn0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtMYXllcnN9IGZyb20gJy4uL2NvbW1vbi9pY29ucyc7XG5pbXBvcnQgTWFwTGF5ZXJTZWxlY3RvciBmcm9tICcuLi9jb21tb24vbWFwLWxheWVyLXNlbGVjdG9yJztcbmltcG9ydCBNYXBDb250cm9sVG9vbHRpcEZhY3RvcnkgZnJvbSAnLi9tYXAtY29udHJvbC10b29sdGlwJztcbmltcG9ydCBNYXBDb250cm9sUGFuZWxGYWN0b3J5IGZyb20gJy4vbWFwLWNvbnRyb2wtcGFuZWwnO1xuXG5MYXllclNlbGVjdG9yUGFuZWxGYWN0b3J5LmRlcHMgPSBbTWFwQ29udHJvbFRvb2x0aXBGYWN0b3J5LCBNYXBDb250cm9sUGFuZWxGYWN0b3J5XTtcblxuZnVuY3Rpb24gTGF5ZXJTZWxlY3RvclBhbmVsRmFjdG9yeShNYXBDb250cm9sVG9vbHRpcCwgTWFwQ29udHJvbFBhbmVsKSB7XG4gIC8qKiBAdHlwZSB7aW1wb3J0KCcuL2xheWVyLXNlbGVjdG9yLXBhbmVsJykuTGF5ZXJTZWxlY3RvclBhbmVsQ29tcG9uZW50fSAqL1xuICBjb25zdCBMYXllclNlbGVjdG9yUGFuZWwgPSAoe1xuICAgIG9uTWFwVG9nZ2xlTGF5ZXIsXG4gICAgb25Ub2dnbGVNYXBDb250cm9sLFxuICAgIGxheWVycyxcbiAgICBsYXllcnNUb1JlbmRlcixcbiAgICBpc1NwbGl0LFxuICAgIG1hcENvbnRyb2xzLFxuICAgIHJlYWRPbmx5XG4gIH0pID0+IHtcbiAgICBjb25zdCB2aXNpYmxlTGF5ZXJzID0gbWFwQ29udHJvbHM/LnZpc2libGVMYXllcnMgfHwge307XG4gICAgY29uc3Qge2FjdGl2ZTogaXNBY3RpdmUsIHNob3csIGRpc2FibGVDbG9zZX0gPSB2aXNpYmxlTGF5ZXJzIHx8IHt9O1xuXG4gICAgY29uc3QgbGVnZW5kTGF5ZXJzID0gdXNlTWVtbyhcbiAgICAgICgpID0+XG4gICAgICAgIGxheWVyc1xuICAgICAgICAgIC5maWx0ZXIoKHtjb25maWd9KSA9PiBjb25maWcuaXNWaXNpYmxlKVxuICAgICAgICAgIC5tYXAoKHtpZCwgY29uZmlnfSkgPT4gKHtcbiAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgbmFtZTogY29uZmlnLmxhYmVsLFxuICAgICAgICAgICAgLy8gbGF5ZXJcbiAgICAgICAgICAgIGlzVmlzaWJsZTogbGF5ZXJzVG9SZW5kZXJbaWRdXG4gICAgICAgICAgfSkpLFxuICAgICAgW2xheWVycywgbGF5ZXJzVG9SZW5kZXJdXG4gICAgKTtcblxuICAgIGNvbnN0IGlzVmlzaWJsZSA9IHVzZU1lbW8oKCkgPT4gaXNTcGxpdCAmJiBzaG93ICYmIHJlYWRPbmx5ICE9PSB0cnVlLCBbXG4gICAgICBpc1NwbGl0LFxuICAgICAgc2hvdyxcbiAgICAgIHJlYWRPbmx5XG4gICAgXSk7XG5cbiAgICBjb25zdCBvblRvZ2dsZU1lbnVQYW5lbCA9IHVzZUNhbGxiYWNrKFxuICAgICAgZXZlbnQgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBvblRvZ2dsZU1hcENvbnRyb2woJ3Zpc2libGVMYXllcnMnKTtcbiAgICAgIH0sXG4gICAgICBbb25Ub2dnbGVNYXBDb250cm9sXVxuICAgICk7XG5cbiAgICByZXR1cm4gaXNWaXNpYmxlID8gKFxuICAgICAgKCFpc0FjdGl2ZSA/IChcbiAgICAgICAgPE1hcENvbnRyb2xCdXR0b25cbiAgICAgICAgICBrZXk9ezF9XG4gICAgICAgICAgb25DbGljaz17b25Ub2dnbGVNZW51UGFuZWx9XG4gICAgICAgICAgY2xhc3NOYW1lPVwibWFwLWNvbnRyb2wtYnV0dG9uIHRvZ2dsZS1sYXllclwiXG4gICAgICAgICAgZGF0YS10aXBcbiAgICAgICAgICBkYXRhLWZvcj1cInRvZ2dsZS1sYXllclwiXG4gICAgICAgID5cbiAgICAgICAgICA8TGF5ZXJzIGhlaWdodD1cIjIycHhcIiAvPlxuICAgICAgICAgIDxNYXBDb250cm9sVG9vbHRpcFxuICAgICAgICAgICAgaWQ9XCJ0b2dnbGUtbGF5ZXJcIlxuICAgICAgICAgICAgbWVzc2FnZT17aXNBY3RpdmUgPyAndG9vbHRpcC5oaWRlTGF5ZXJQYW5lbCcgOiAndG9vbHRpcC5zaG93TGF5ZXJQYW5lbCd9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9NYXBDb250cm9sQnV0dG9uPlxuICAgICAgKSA6IChcbiAgICAgICAgPE1hcENvbnRyb2xQYW5lbFxuICAgICAgICAgIGhlYWRlcj1cImhlYWRlci52aXNpYmxlTGF5ZXJzXCJcbiAgICAgICAgICBvbkNsaWNrPXtvblRvZ2dsZU1lbnVQYW5lbH1cbiAgICAgICAgICBkaXNhYmxlQ2xvc2U9e2Rpc2FibGVDbG9zZX1cbiAgICAgICAgPlxuICAgICAgICAgIDxNYXBMYXllclNlbGVjdG9yIGxheWVycz17bGVnZW5kTGF5ZXJzfSBvbk1hcFRvZ2dsZUxheWVyPXtvbk1hcFRvZ2dsZUxheWVyfSAvPlxuICAgICAgICA8L01hcENvbnRyb2xQYW5lbD5cbiAgICAgICkpXG4gICAgKSA6IG51bGw7XG4gIH07XG5cbiAgTGF5ZXJTZWxlY3RvclBhbmVsLmRpc3BsYXlOYW1lID0gJ0xheWVyU2VsZWN0b3JQYW5lbCc7XG5cbiAgcmV0dXJuIFJlYWN0Lm1lbW8oTGF5ZXJTZWxlY3RvclBhbmVsKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF5ZXJTZWxlY3RvclBhbmVsRmFjdG9yeTtcbiJdfQ==