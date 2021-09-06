"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _icons = require("../common/icons");

var _styledComponents = require("../common/styled-components");

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
Toggle3dButtonFactory.deps = [_mapControlTooltip["default"], _mapControlPanel["default"]];

function Toggle3dButtonFactory(MapControlTooltip) {
  var defaultActionIcons = {
    cube: _icons.Cube3d
  };
  /** @type {import('./toggle-3d-button').Toggle3dButtonComponent} */

  var Toggle3dButton = function Toggle3dButton(_ref) {
    var dragRotate = _ref.dragRotate,
        onTogglePerspective = _ref.onTogglePerspective,
        _ref$actionIcons = _ref.actionIcons,
        actionIcons = _ref$actionIcons === void 0 ? defaultActionIcons : _ref$actionIcons,
        mapControls = _ref.mapControls;
    var onClick = (0, _react.useCallback)(function (event) {
      event.preventDefault();
      onTogglePerspective();
    }, [onTogglePerspective]);
    var isVisible = (0, _react.useMemo)(function () {
      return ((mapControls === null || mapControls === void 0 ? void 0 : mapControls.toggle3d) || {}).show;
    }, [mapControls]);
    return isVisible ? /*#__PURE__*/_react["default"].createElement(_styledComponents.MapControlButton, {
      onClick: onClick,
      active: dragRotate,
      "data-tip": true,
      "data-for": "action-3d"
    }, /*#__PURE__*/_react["default"].createElement(actionIcons.cube, {
      height: "22px"
    }), /*#__PURE__*/_react["default"].createElement(MapControlTooltip, {
      id: "action-3d",
      message: dragRotate ? 'tooltip.disable3DMap' : 'tooltip.3DMap'
    })) : null;
  };

  Toggle3dButton.displayName = 'Toggle3dButton';
  return /*#__PURE__*/_react["default"].memo(Toggle3dButton);
}

var _default = Toggle3dButtonFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21hcC90b2dnbGUtM2QtYnV0dG9uLmpzIl0sIm5hbWVzIjpbIlRvZ2dsZTNkQnV0dG9uRmFjdG9yeSIsImRlcHMiLCJNYXBDb250cm9sVG9vbHRpcEZhY3RvcnkiLCJNYXBDb250cm9sUGFuZWxGYWN0b3J5IiwiTWFwQ29udHJvbFRvb2x0aXAiLCJkZWZhdWx0QWN0aW9uSWNvbnMiLCJjdWJlIiwiQ3ViZTNkIiwiVG9nZ2xlM2RCdXR0b24iLCJkcmFnUm90YXRlIiwib25Ub2dnbGVQZXJzcGVjdGl2ZSIsImFjdGlvbkljb25zIiwibWFwQ29udHJvbHMiLCJvbkNsaWNrIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImlzVmlzaWJsZSIsInRvZ2dsZTNkIiwic2hvdyIsImRpc3BsYXlOYW1lIiwiUmVhY3QiLCJtZW1vIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUF4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFRQUEscUJBQXFCLENBQUNDLElBQXRCLEdBQTZCLENBQUNDLDZCQUFELEVBQTJCQywyQkFBM0IsQ0FBN0I7O0FBRUEsU0FBU0gscUJBQVQsQ0FBK0JJLGlCQUEvQixFQUFrRDtBQUNoRCxNQUFNQyxrQkFBa0IsR0FBRztBQUN6QkMsSUFBQUEsSUFBSSxFQUFFQztBQURtQixHQUEzQjtBQUdBOztBQUNBLE1BQU1DLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsT0FLakI7QUFBQSxRQUpKQyxVQUlJLFFBSkpBLFVBSUk7QUFBQSxRQUhKQyxtQkFHSSxRQUhKQSxtQkFHSTtBQUFBLGdDQUZKQyxXQUVJO0FBQUEsUUFGSkEsV0FFSSxpQ0FGVU4sa0JBRVY7QUFBQSxRQURKTyxXQUNJLFFBREpBLFdBQ0k7QUFDSixRQUFNQyxPQUFPLEdBQUcsd0JBQ2QsVUFBQUMsS0FBSyxFQUFJO0FBQ1BBLE1BQUFBLEtBQUssQ0FBQ0MsY0FBTjtBQUNBTCxNQUFBQSxtQkFBbUI7QUFDcEIsS0FKYSxFQUtkLENBQUNBLG1CQUFELENBTGMsQ0FBaEI7QUFRQSxRQUFNTSxTQUFTLEdBQUcsb0JBQVEsWUFBTTtBQUM5QixhQUFPLENBQUMsQ0FBQUosV0FBVyxTQUFYLElBQUFBLFdBQVcsV0FBWCxZQUFBQSxXQUFXLENBQUVLLFFBQWIsS0FBeUIsRUFBMUIsRUFBOEJDLElBQXJDO0FBQ0QsS0FGaUIsRUFFZixDQUFDTixXQUFELENBRmUsQ0FBbEI7QUFJQSxXQUFPSSxTQUFTLGdCQUNiLGdDQUFDLGtDQUFEO0FBQWtCLE1BQUEsT0FBTyxFQUFFSCxPQUEzQjtBQUFvQyxNQUFBLE1BQU0sRUFBRUosVUFBNUM7QUFBd0Qsc0JBQXhEO0FBQWlFLGtCQUFTO0FBQTFFLG9CQUNDLGdDQUFDLFdBQUQsQ0FBYSxJQUFiO0FBQWtCLE1BQUEsTUFBTSxFQUFDO0FBQXpCLE1BREQsZUFFQyxnQ0FBQyxpQkFBRDtBQUNFLE1BQUEsRUFBRSxFQUFDLFdBREw7QUFFRSxNQUFBLE9BQU8sRUFBRUEsVUFBVSxHQUFHLHNCQUFILEdBQTRCO0FBRmpELE1BRkQsQ0FEYSxHQVFaLElBUko7QUFTRCxHQTNCRDs7QUE2QkFELEVBQUFBLGNBQWMsQ0FBQ1csV0FBZixHQUE2QixnQkFBN0I7QUFDQSxzQkFBT0Msa0JBQU1DLElBQU4sQ0FBV2IsY0FBWCxDQUFQO0FBQ0Q7O2VBRWNSLHFCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIxIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7dXNlQ2FsbGJhY2ssIHVzZU1lbW99IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Q3ViZTNkfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucyc7XG5pbXBvcnQge01hcENvbnRyb2xCdXR0b259IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBNYXBDb250cm9sVG9vbHRpcEZhY3RvcnkgZnJvbSAnLi9tYXAtY29udHJvbC10b29sdGlwJztcbmltcG9ydCBNYXBDb250cm9sUGFuZWxGYWN0b3J5IGZyb20gJy4vbWFwLWNvbnRyb2wtcGFuZWwnO1xuXG5Ub2dnbGUzZEJ1dHRvbkZhY3RvcnkuZGVwcyA9IFtNYXBDb250cm9sVG9vbHRpcEZhY3RvcnksIE1hcENvbnRyb2xQYW5lbEZhY3RvcnldO1xuXG5mdW5jdGlvbiBUb2dnbGUzZEJ1dHRvbkZhY3RvcnkoTWFwQ29udHJvbFRvb2x0aXApIHtcbiAgY29uc3QgZGVmYXVsdEFjdGlvbkljb25zID0ge1xuICAgIGN1YmU6IEN1YmUzZFxuICB9O1xuICAvKiogQHR5cGUge2ltcG9ydCgnLi90b2dnbGUtM2QtYnV0dG9uJykuVG9nZ2xlM2RCdXR0b25Db21wb25lbnR9ICovXG4gIGNvbnN0IFRvZ2dsZTNkQnV0dG9uID0gKHtcbiAgICBkcmFnUm90YXRlLFxuICAgIG9uVG9nZ2xlUGVyc3BlY3RpdmUsXG4gICAgYWN0aW9uSWNvbnMgPSBkZWZhdWx0QWN0aW9uSWNvbnMsXG4gICAgbWFwQ29udHJvbHNcbiAgfSkgPT4ge1xuICAgIGNvbnN0IG9uQ2xpY2sgPSB1c2VDYWxsYmFjayhcbiAgICAgIGV2ZW50ID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgb25Ub2dnbGVQZXJzcGVjdGl2ZSgpO1xuICAgICAgfSxcbiAgICAgIFtvblRvZ2dsZVBlcnNwZWN0aXZlXVxuICAgICk7XG5cbiAgICBjb25zdCBpc1Zpc2libGUgPSB1c2VNZW1vKCgpID0+IHtcbiAgICAgIHJldHVybiAobWFwQ29udHJvbHM/LnRvZ2dsZTNkIHx8IHt9KS5zaG93O1xuICAgIH0sIFttYXBDb250cm9sc10pO1xuXG4gICAgcmV0dXJuIGlzVmlzaWJsZSA/IChcbiAgICAgICg8TWFwQ29udHJvbEJ1dHRvbiBvbkNsaWNrPXtvbkNsaWNrfSBhY3RpdmU9e2RyYWdSb3RhdGV9IGRhdGEtdGlwIGRhdGEtZm9yPVwiYWN0aW9uLTNkXCI+XG4gICAgICAgIDxhY3Rpb25JY29ucy5jdWJlIGhlaWdodD1cIjIycHhcIiAvPlxuICAgICAgICA8TWFwQ29udHJvbFRvb2x0aXBcbiAgICAgICAgICBpZD1cImFjdGlvbi0zZFwiXG4gICAgICAgICAgbWVzc2FnZT17ZHJhZ1JvdGF0ZSA/ICd0b29sdGlwLmRpc2FibGUzRE1hcCcgOiAndG9vbHRpcC4zRE1hcCd9XG4gICAgICAgIC8+XG4gICAgICA8L01hcENvbnRyb2xCdXR0b24+KVxuICAgICkgOiBudWxsO1xuICB9O1xuXG4gIFRvZ2dsZTNkQnV0dG9uLmRpc3BsYXlOYW1lID0gJ1RvZ2dsZTNkQnV0dG9uJztcbiAgcmV0dXJuIFJlYWN0Lm1lbW8oVG9nZ2xlM2RCdXR0b24pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBUb2dnbGUzZEJ1dHRvbkZhY3Rvcnk7XG4iXX0=