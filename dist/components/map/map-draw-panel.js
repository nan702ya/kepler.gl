"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _defaultSettings = require("../../constants/default-settings");

var _icons = require("../common/icons");

var _styledComponents = require("../common/styled-components");

var _toolbarItem = _interopRequireDefault(require("../common/toolbar-item"));

var _mapControlTooltip = _interopRequireDefault(require("./map-control-tooltip"));

var _mapControlPanel = _interopRequireDefault(require("./map-control-panel"));

var _mapControlToolbar = _interopRequireDefault(require("./map-control-toolbar"));

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
MapDrawPanelFactory.deps = [_mapControlTooltip["default"], _mapControlPanel["default"], _mapControlToolbar["default"]];

function MapDrawPanelFactory(MapControlTooltip, MapControlPanel, MapControlToolbar) {
  var defaultActionIcons = {
    visible: _icons.EyeSeen,
    hidden: _icons.EyeUnseen,
    polygon: _icons.DrawPolygon,
    cursor: _icons.CursorClick,
    innerPolygon: _icons.Polygon,
    rectangle: _icons.Rectangle
  };
  /** @type {import('./map-draw-panel').MapDrawPanelComponent} */

  var MapDrawPanel = /*#__PURE__*/_react["default"].memo(function (_ref) {
    var _mapControls$mapDraw, _mapControls$mapDraw2;

    var editor = _ref.editor,
        mapControls = _ref.mapControls,
        onToggleMapControl = _ref.onToggleMapControl,
        onSetEditorMode = _ref.onSetEditorMode,
        onToggleEditorVisibility = _ref.onToggleEditorVisibility,
        _ref$actionIcons = _ref.actionIcons,
        actionIcons = _ref$actionIcons === void 0 ? defaultActionIcons : _ref$actionIcons;
    var isActive = mapControls === null || mapControls === void 0 ? void 0 : (_mapControls$mapDraw = mapControls.mapDraw) === null || _mapControls$mapDraw === void 0 ? void 0 : _mapControls$mapDraw.active;
    var onToggleMenuPanel = (0, _react.useCallback)(function () {
      return onToggleMapControl('mapDraw');
    }, [onToggleMapControl]);

    if (!(mapControls !== null && mapControls !== void 0 && (_mapControls$mapDraw2 = mapControls.mapDraw) !== null && _mapControls$mapDraw2 !== void 0 && _mapControls$mapDraw2.show)) {
      return null;
    }

    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "map-draw-controls",
      style: {
        position: 'relative'
      }
    }, isActive ? /*#__PURE__*/_react["default"].createElement(MapControlToolbar, {
      show: isActive
    }, /*#__PURE__*/_react["default"].createElement(_toolbarItem["default"], {
      className: "edit-feature",
      onClick: function onClick() {
        return onSetEditorMode(_defaultSettings.EDITOR_MODES.EDIT);
      },
      label: "toolbar.select",
      icon: actionIcons.cursor,
      active: editor.mode === _defaultSettings.EDITOR_MODES.EDIT
    }), /*#__PURE__*/_react["default"].createElement(_toolbarItem["default"], {
      className: "draw-feature",
      onClick: function onClick() {
        return onSetEditorMode(_defaultSettings.EDITOR_MODES.DRAW_POLYGON);
      },
      label: "toolbar.polygon",
      icon: actionIcons.innerPolygon,
      active: editor.mode === _defaultSettings.EDITOR_MODES.DRAW_POLYGON
    }), /*#__PURE__*/_react["default"].createElement(_toolbarItem["default"], {
      className: "draw-rectangle",
      onClick: function onClick() {
        return onSetEditorMode(_defaultSettings.EDITOR_MODES.DRAW_RECTANGLE);
      },
      label: "toolbar.rectangle",
      icon: actionIcons.rectangle,
      active: editor.mode === _defaultSettings.EDITOR_MODES.DRAW_RECTANGLE
    }), /*#__PURE__*/_react["default"].createElement(_toolbarItem["default"], {
      className: "toggle-features",
      onClick: onToggleEditorVisibility,
      label: editor.visible ? 'toolbar.hide' : 'toolbar.show',
      icon: editor.visible ? actionIcons.visible : actionIcons.hidden
    })) : null, /*#__PURE__*/_react["default"].createElement(_styledComponents.MapControlButton, {
      onClick: function onClick(e) {
        e.preventDefault();
        onToggleMenuPanel();
      },
      active: isActive,
      "data-tip": true,
      "data-for": "map-draw"
    }, /*#__PURE__*/_react["default"].createElement(actionIcons.polygon, {
      height: "22px"
    }), /*#__PURE__*/_react["default"].createElement(MapControlTooltip, {
      id: "map-draw",
      message: "tooltip.DrawOnMap"
    })));
  });

  MapDrawPanel.displayName = 'MapDrawPanel';
  return MapDrawPanel;
}

var _default = MapDrawPanelFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21hcC9tYXAtZHJhdy1wYW5lbC5qcyJdLCJuYW1lcyI6WyJNYXBEcmF3UGFuZWxGYWN0b3J5IiwiZGVwcyIsIk1hcENvbnRyb2xUb29sdGlwRmFjdG9yeSIsIk1hcENvbnRyb2xQYW5lbEZhY3RvcnkiLCJNYXBDb250cm9sVG9vbGJhckZhY3RvcnkiLCJNYXBDb250cm9sVG9vbHRpcCIsIk1hcENvbnRyb2xQYW5lbCIsIk1hcENvbnRyb2xUb29sYmFyIiwiZGVmYXVsdEFjdGlvbkljb25zIiwidmlzaWJsZSIsIkV5ZVNlZW4iLCJoaWRkZW4iLCJFeWVVbnNlZW4iLCJwb2x5Z29uIiwiRHJhd1BvbHlnb24iLCJjdXJzb3IiLCJDdXJzb3JDbGljayIsImlubmVyUG9seWdvbiIsIlBvbHlnb24iLCJyZWN0YW5nbGUiLCJSZWN0YW5nbGUiLCJNYXBEcmF3UGFuZWwiLCJSZWFjdCIsIm1lbW8iLCJlZGl0b3IiLCJtYXBDb250cm9scyIsIm9uVG9nZ2xlTWFwQ29udHJvbCIsIm9uU2V0RWRpdG9yTW9kZSIsIm9uVG9nZ2xlRWRpdG9yVmlzaWJpbGl0eSIsImFjdGlvbkljb25zIiwiaXNBY3RpdmUiLCJtYXBEcmF3IiwiYWN0aXZlIiwib25Ub2dnbGVNZW51UGFuZWwiLCJzaG93IiwicG9zaXRpb24iLCJFRElUT1JfTU9ERVMiLCJFRElUIiwibW9kZSIsIkRSQVdfUE9MWUdPTiIsIkRSQVdfUkVDVEFOR0xFIiwiZSIsInByZXZlbnREZWZhdWx0IiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQVFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQWxDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWtCQUEsbUJBQW1CLENBQUNDLElBQXBCLEdB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QkFGWDtBQUdFLE1BQUEsS0FBSyxFQUFFSixNQUFNLENBQUNmLE9BQVAsR0FBaUIsY0FBakIsR0FBa0MsY0FIM0M7QUFJRSxNQUFBLElBQUksRUFBRWUsTUFBTSxDQUFDZixPQUFQLEdBQWlCb0IsV0FBVyxDQUFDcEIsT0FBN0IsR0FBdUNvQixXQUFXLENBQUNsQjtBQUozRCxNQXRCRixDQURPLEdBOEJMLElBL0JOLGVBZ0NFLGdDQUFDLGtDQUFEO0FBQ0UsTUFBQSxPQUFPLEVBQUUsaUJBQUE4QixDQUFDLEVBQUk7QUFDWkEsUUFBQUEsQ0FBQyxDQUFDQyxjQUFGO0FBQ0FULFFBQUFBLGlCQUFpQjtBQUNsQixPQUpIO0FBS0UsTUFBQSxNQUFNLEVBQUVILFFBTFY7QUFNRSxzQkFORjtBQU9FLGtCQUFTO0FBUFgsb0JBU0UsZ0NBQUMsV0FBRCxDQUFhLE9BQWI7QUFBcUIsTUFBQSxNQUFNLEVBQUM7QUFBNUIsTUFURixlQVVFLGdDQUFDLGlCQUFEO0FBQW1CLE1BQUEsRUFBRSxFQUFDLFVBQXRCO0FBQWlDLE1BQUEsT0FBTyxFQUFDO0FBQXpDLE1BVkYsQ0FoQ0YsQ0FERjtBQStDRCxHQS9Ea0IsQ0FBckI7O0FBa0VBVCxFQUFBQSxZQUFZLENBQUNzQixXQUFiLEdBQTJCLGNBQTNCO0FBQ0EsU0FBT3RCLFlBQVA7QUFDRDs7ZUFFY3JCLG1CIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIxIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7dXNlQ2FsbGJhY2t9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7RURJVE9SX01PREVTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge1xuICBDdXJzb3JDbGljayxcbiAgRHJhd1BvbHlnb24sXG4gIEV5ZVNlZW4sXG4gIEV5ZVVuc2VlbixcbiAgUG9seWdvbixcbiAgUmVjdGFuZ2xlXG59IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcbmltcG9ydCB7TWFwQ29udHJvbEJ1dHRvbn0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IFRvb2xiYXJJdGVtIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3Rvb2xiYXItaXRlbSc7XG5pbXBvcnQgTWFwQ29udHJvbFRvb2x0aXBGYWN0b3J5IGZyb20gJy4vbWFwLWNvbnRyb2wtdG9vbHRpcCc7XG5pbXBvcnQgTWFwQ29udHJvbFBhbmVsRmFjdG9yeSBmcm9tICcuL21hcC1jb250cm9sLXBhbmVsJztcbmltcG9ydCBNYXBDb250cm9sVG9vbGJhckZhY3RvcnkgZnJvbSAnLi9tYXAtY29udHJvbC10b29sYmFyJztcblxuTWFwRHJhd1BhbmVsRmFjdG9yeS5kZXBzID0gW1xuICBNYXBDb250cm9sVG9vbHRpcEZhY3RvcnksXG4gIE1hcENvbnRyb2xQYW5lbEZhY3RvcnksXG4gIE1hcENvbnRyb2xUb29sYmFyRmFjdG9yeVxuXTtcbmZ1bmN0aW9uIE1hcERyYXdQYW5lbEZhY3RvcnkoTWFwQ29udHJvbFRvb2x0aXAsIE1hcENvbnRyb2xQYW5lbCwgTWFwQ29udHJvbFRvb2xiYXIpIHtcbiAgY29uc3QgZGVmYXVsdEFjdGlvbkljb25zID0ge1xuICAgIHZpc2libGU6IEV5ZVNlZW4sXG4gICAgaGlkZGVuOiBFeWVVbnNlZW4sXG4gICAgcG9seWdvbjogRHJhd1BvbHlnb24sXG4gICAgY3Vyc29yOiBDdXJzb3JDbGljayxcbiAgICBpbm5lclBvbHlnb246IFBvbHlnb24sXG4gICAgcmVjdGFuZ2xlOiBSZWN0YW5nbGVcbiAgfTtcbiAgLyoqIEB0eXBlIHtpbXBvcnQoJy4vbWFwLWRyYXctcGFuZWwnKS5NYXBEcmF3UGFuZWxDb21wb25lbnR9ICovXG4gIGNvbnN0IE1hcERyYXdQYW5lbCA9IFJlYWN0Lm1lbW8oXG4gICAgKHtcbiAgICAgIGVkaXRvcixcbiAgICAgIG1hcENvbnRyb2xzLFxuICAgICAgb25Ub2dnbGVNYXBDb250cm9sLFxuICAgICAgb25TZXRFZGl0b3JNb2RlLFxuICAgICAgb25Ub2dnbGVFZGl0b3JWaXNpYmlsaXR5LFxuICAgICAgYWN0aW9uSWNvbnMgPSBkZWZhdWx0QWN0aW9uSWNvbnNcbiAgICB9KSA9PiB7XG4gICAgICBjb25zdCBpc0FjdGl2ZSA9IG1hcENvbnRyb2xzPy5tYXBEcmF3Py5hY3RpdmU7XG4gICAgICBjb25zdCBvblRvZ2dsZU1lbnVQYW5lbCA9IHVzZUNhbGxiYWNrKCgpID0+IG9uVG9nZ2xlTWFwQ29udHJvbCgnbWFwRHJhdycpLCBbXG4gICAgICAgIG9uVG9nZ2xlTWFwQ29udHJvbFxuICAgICAgXSk7XG4gICAgICBpZiAoIW1hcENvbnRyb2xzPy5tYXBEcmF3Py5zaG93KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXAtZHJhdy1jb250cm9sc1wiIHN0eWxlPXt7cG9zaXRpb246ICdyZWxhdGl2ZSd9fT5cbiAgICAgICAgICB7aXNBY3RpdmUgPyAoXG4gICAgICAgICAgICA8TWFwQ29udHJvbFRvb2xiYXIgc2hvdz17aXNBY3RpdmV9PlxuICAgICAgICAgICAgICA8VG9vbGJhckl0ZW1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJlZGl0LWZlYXR1cmVcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uU2V0RWRpdG9yTW9kZShFRElUT1JfTU9ERVMuRURJVCl9XG4gICAgICAgICAgICAgICAgbGFiZWw9XCJ0b29sYmFyLnNlbGVjdFwiXG4gICAgICAgICAgICAgICAgaWNvbj17YWN0aW9uSWNvbnMuY3Vyc29yfVxuICAgICAgICAgICAgICAgIGFjdGl2ZT17ZWRpdG9yLm1vZGUgPT09IEVESVRPUl9NT0RFUy5FRElUfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8VG9vbGJhckl0ZW1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJkcmF3LWZlYXR1cmVcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uU2V0RWRpdG9yTW9kZShFRElUT1JfTU9ERVMuRFJBV19QT0xZR09OKX1cbiAgICAgICAgICAgICAgICBsYWJlbD1cInRvb2xiYXIucG9seWdvblwiXG4gICAgICAgICAgICAgICAgaWNvbj17YWN0aW9uSWNvbnMuaW5uZXJQb2x5Z29ufVxuICAgICAgICAgICAgICAgIGFjdGl2ZT17ZWRpdG9yLm1vZGUgPT09IEVESVRPUl9NT0RFUy5EUkFXX1BPTFlHT059XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxUb29sYmFySXRlbVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImRyYXctcmVjdGFuZ2xlXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblNldEVkaXRvck1vZGUoRURJVE9SX01PREVTLkRSQVdfUkVDVEFOR0xFKX1cbiAgICAgICAgICAgICAgICBsYWJlbD1cInRvb2xiYXIucmVjdGFuZ2xlXCJcbiAgICAgICAgICAgICAgICBpY29uPXthY3Rpb25JY29ucy5yZWN0YW5nbGV9XG4gICAgICAgICAgICAgICAgYWN0aXZlPXtlZGl0b3IubW9kZSA9PT0gRURJVE9SX01PREVTLkRSQVdfUkVDVEFOR0xFfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8VG9vbGJhckl0ZW1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0b2dnbGUtZmVhdHVyZXNcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uVG9nZ2xlRWRpdG9yVmlzaWJpbGl0eX1cbiAgICAgICAgICAgICAgICBsYWJlbD17ZWRpdG9yLnZpc2libGUgPyAndG9vbGJhci5oaWRlJyA6ICd0b29sYmFyLnNob3cnfVxuICAgICAgICAgICAgICAgIGljb249e2VkaXRvci52aXNpYmxlID8gYWN0aW9uSWNvbnMudmlzaWJsZSA6IGFjdGlvbkljb25zLmhpZGRlbn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvTWFwQ29udHJvbFRvb2xiYXI+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPE1hcENvbnRyb2xCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e2UgPT4ge1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIG9uVG9nZ2xlTWVudVBhbmVsKCk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgYWN0aXZlPXtpc0FjdGl2ZX1cbiAgICAgICAgICAgIGRhdGEtdGlwXG4gICAgICAgICAgICBkYXRhLWZvcj1cIm1hcC1kcmF3XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8YWN0aW9uSWNvbnMucG9seWdvbiBoZWlnaHQ9XCIyMnB4XCIgLz5cbiAgICAgICAgICAgIDxNYXBDb250cm9sVG9vbHRpcCBpZD1cIm1hcC1kcmF3XCIgbWVzc2FnZT1cInRvb2x0aXAuRHJhd09uTWFwXCIgLz5cbiAgICAgICAgICA8L01hcENvbnRyb2xCdXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICk7XG5cbiAgTWFwRHJhd1BhbmVsLmRpc3BsYXlOYW1lID0gJ01hcERyYXdQYW5lbCc7XG4gIHJldHVybiBNYXBEcmF3UGFuZWw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1hcERyYXdQYW5lbEZhY3Rvcnk7XG4iXX0=