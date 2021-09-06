"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _toolbarItem = _interopRequireDefault(require("../common/toolbar-item"));

var _styledComponents = require("../common/styled-components");

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
LocalePanelFactory.deps = [_mapControlTooltip["default"], _mapControlPanel["default"], _mapControlToolbar["default"]];

function LocalePanelFactory(MapControlTooltip, MapControlPanel, MapControlToolbar) {
  /** @type {import('./locale-panel').LocalePanelComponent} */
  var LocalePanel = /*#__PURE__*/_react["default"].memo(function (_ref) {
    var availableLocales = _ref.availableLocales,
        onToggleMenuPanel = _ref.onToggleMenuPanel,
        onSetLocale = _ref.onSetLocale,
        currentLocal = _ref.locale,
        mapControls = _ref.mapControls;

    var _ref2 = mapControls.mapLocale || {},
        isActive = _ref2.active,
        disableClose = _ref2.disableClose,
        show = _ref2.show;

    var onClickItem = (0, _react.useCallback)(function (locale) {
      onSetLocale(locale);
    }, [onSetLocale]);
    var onClickButton = (0, _react.useCallback)(function (e) {
      e.preventDefault();
      onToggleMenuPanel();
    }, [onToggleMenuPanel]);
    var getLabel = (0, _react.useCallback)(function (locale) {
      return "toolbar.".concat(locale);
    }, []);

    if (!show) {
      return null;
    }

    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, isActive ? /*#__PURE__*/_react["default"].createElement(MapControlToolbar, {
      show: isActive
    }, availableLocales.map(function (locale) {
      return /*#__PURE__*/_react["default"].createElement(_toolbarItem["default"], {
        key: locale,
        onClick: function onClick() {
          return onClickItem(locale);
        },
        label: getLabel(locale),
        active: currentLocal === locale
      });
    })) : null, /*#__PURE__*/_react["default"].createElement(_styledComponents.MapControlButton, {
      onClick: onClickButton,
      active: isActive,
      "data-tip": true,
      "data-for": "locale",
      disableClose: disableClose
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "map-control-button__locale"
    }, currentLocal.toUpperCase()), /*#__PURE__*/_react["default"].createElement(MapControlTooltip, {
      id: "locale",
      message: "tooltip.selectLocale"
    })));
  });

  LocalePanel.displayName = 'LocalePanel';
  return LocalePanel;
}

var _default = LocalePanelFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21hcC9sb2NhbGUtcGFuZWwuanMiXSwibmFtZXMiOlsiTG9jYWxlUGFuZWxGYWN0b3J5IiwiZGVwcyIsIk1hcENvbnRyb2xUb29sdGlwRmFjdG9yeSIsIk1hcENvbnRyb2xQYW5lbEZhY3RvcnkiLCJNYXBDb250cm9sVG9vbGJhckZhY3RvcnkiLCJNYXBDb250cm9sVG9vbHRpcCIsIk1hcENvbnRyb2xQYW5lbCIsIk1hcENvbnRyb2xUb29sYmFyIiwiTG9jYWxlUGFuZWwiLCJSZWFjdCIsIm1lbW8iLCJhdmFpbGFibGVMb2NhbGVzIiwib25Ub2dnbGVNZW51UGFuZWwiLCJvblNldExvY2FsZSIsImN1cnJlbnRMb2NhbCIsImxvY2FsZSIsIm1hcENvbnRyb2xzIiwibWFwTG9jYWxlIiwiaXNBY3RpdmUiLCJhY3RpdmUiLCJkaXNhYmxlQ2xvc2UiLCJzaG93Iiwib25DbGlja0l0ZW0iLCJvbkNsaWNrQnV0dG9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwiZ2V0TGFiZWwiLCJtYXAiLCJ0b1VwcGVyQ2FzZSIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUF6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFTQUEsa0JBQWtCLENBQUNDLElBQW5CLEdBQTBCLENBQ3hCQyw2QkFEd0IsRUFFeEJDLDJCQUZ3QixFQUd4QkMsNkJBSHdCLENBQTFCOztBQU1BLFNBQVNKLGtCQUFULENBQTRCSyxpQkFBNUIsRUFBK0NDLGVBQS9DLEVBQWdFQyxpQkFBaEUsRUFBbUY7QUFDakY7QUFDQSxNQUFNQyxXQUFXLGdCQUFHQyxrQkFBTUMsSUFBTixDQUNsQixnQkFBMkY7QUFBQSxRQUF6RkMsZ0JBQXlGLFFBQXpGQSxnQkFBeUY7QUFBQSxRQUF2RUMsaUJBQXVFLFFBQXZFQSxpQkFBdUU7QUFBQSxRQUFwREMsV0FBb0QsUUFBcERBLFdBQW9EO0FBQUEsUUFBL0JDLFlBQStCLFFBQXZDQyxNQUF1QztBQUFBLFFBQWpCQyxXQUFpQixRQUFqQkEsV0FBaUI7O0FBQUEsZ0JBQzFDQSxXQUFXLENBQUNDLFNBQVosSUFBeUIsRUFEaUI7QUFBQSxRQUMxRUMsUUFEMEUsU0FDbEZDLE1BRGtGO0FBQUEsUUFDaEVDLFlBRGdFLFNBQ2hFQSxZQURnRTtBQUFBLFFBQ2xEQyxJQURrRCxTQUNsREEsSUFEa0Q7O0FBR3pGLFFBQU1DLFdBQVcsR0FBRyx3QkFDbEIsVUFBQVAsTUFBTSxFQUFJO0FBQ1JGLE1BQUFBLFdBQVcsQ0FBQ0UsTUFBRCxDQUFYO0FBQ0QsS0FIaUIsRUFJbEIsQ0FBQ0YsV0FBRCxDQUprQixDQUFwQjtBQU9BLFFBQU1VLGFBQWEsR0FBRyx3QkFDcEIsVUFBQUMsQ0FBQyxFQUFJO0FBQ0hBLE1BQUFBLENBQUMsQ0FBQ0MsY0FBRjtBQUNBYixNQUFBQSxpQkFBaUI7QUFDbEIsS0FKbUIsRUFLcEIsQ0FBQ0EsaUJBQUQsQ0FMb0IsQ0FBdEI7QUFPQSxRQUFNYyxRQUFRLEdBQUcsd0JBQVksVUFBQVgsTUFBTTtBQUFBLCtCQUFlQSxNQUFmO0FBQUEsS0FBbEIsRUFBMkMsRUFBM0MsQ0FBakI7O0FBRUEsUUFBSSxDQUFDTSxJQUFMLEVBQVc7QUFDVCxhQUFPLElBQVA7QUFDRDs7QUFDRCx3QkFDRSxrRUFDR0gsUUFBUSxnQkFDUCxnQ0FBQyxpQkFBRDtBQUFtQixNQUFBLElBQUksRUFBRUE7QUFBekIsT0FDR1AsZ0JBQWdCLENBQUNnQixHQUFqQixDQUFxQixVQUFBWixNQUFNO0FBQUEsMEJBQzFCLGdDQUFDLHVCQUFEO0FBQ0UsUUFBQSxHQUFHLEVBQUVBLE1BRFA7QUFFRSxRQUFBLE9BQU8sRUFBRTtBQUFBLGlCQUFNTyxXQUFXLENBQUNQLE1BQUQsQ0FBakI7QUFBQSxTQUZYO0FBR0UsUUFBQSxLQUFLLEVBQUVXLFFBQVEsQ0FBQ1gsTUFBRCxDQUhqQjtBQUlFLFFBQUEsTUFBTSxFQUFFRCxZQUFZLEtBQUtDO0FBSjNCLFFBRDBCO0FBQUEsS0FBM0IsQ0FESCxDQURPLEdBV0wsSUFaTixlQWFFLGdDQUFDLGtDQUFEO0FBQ0UsTUFBQSxPQUFPLEVBQUVRLGFBRFg7QUFFRSxNQUFBLE1BQU0sRUFBRUwsUUFGVjtBQUdFLHNCQUhGO0FBSUUsa0JBQVMsUUFKWDtBQUtFLE1BQUEsWUFBWSxFQUFFRTtBQUxoQixvQkFPRTtBQUFNLE1BQUEsU0FBUyxFQUFDO0FBQWhCLE9BQThDTixZQUFZLENBQUNjLFdBQWIsRUFBOUMsQ0FQRixlQVFFLGdDQUFDLGlCQUFEO0FBQW1CLE1BQUEsRUFBRSxFQUFDLFFBQXRCO0FBQStCLE1BQUEsT0FBTyxFQUFDO0FBQXZDLE1BUkYsQ0FiRixDQURGO0FBMEJELEdBakRpQixDQUFwQjs7QUFvREFwQixFQUFBQSxXQUFXLENBQUNxQixXQUFaLEdBQTBCLGFBQTFCO0FBRUEsU0FBT3JCLFdBQVA7QUFDRDs7ZUFFY1Isa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjEgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHt1c2VDYWxsYmFja30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFRvb2xiYXJJdGVtIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3Rvb2xiYXItaXRlbSc7XG5pbXBvcnQge01hcENvbnRyb2xCdXR0b259IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBNYXBDb250cm9sVG9vbHRpcEZhY3RvcnkgZnJvbSAnLi9tYXAtY29udHJvbC10b29sdGlwJztcbmltcG9ydCBNYXBDb250cm9sUGFuZWxGYWN0b3J5IGZyb20gJy4vbWFwLWNvbnRyb2wtcGFuZWwnO1xuaW1wb3J0IE1hcENvbnRyb2xUb29sYmFyRmFjdG9yeSBmcm9tICcuL21hcC1jb250cm9sLXRvb2xiYXInO1xuXG5Mb2NhbGVQYW5lbEZhY3RvcnkuZGVwcyA9IFtcbiAgTWFwQ29udHJvbFRvb2x0aXBGYWN0b3J5LFxuICBNYXBDb250cm9sUGFuZWxGYWN0b3J5LFxuICBNYXBDb250cm9sVG9vbGJhckZhY3Rvcnlcbl07XG5cbmZ1bmN0aW9uIExvY2FsZVBhbmVsRmFjdG9yeShNYXBDb250cm9sVG9vbHRpcCwgTWFwQ29udHJvbFBhbmVsLCBNYXBDb250cm9sVG9vbGJhcikge1xuICAvKiogQHR5cGUge2ltcG9ydCgnLi9sb2NhbGUtcGFuZWwnKS5Mb2NhbGVQYW5lbENvbXBvbmVudH0gKi9cbiAgY29uc3QgTG9jYWxlUGFuZWwgPSBSZWFjdC5tZW1vKFxuICAgICh7YXZhaWxhYmxlTG9jYWxlcywgb25Ub2dnbGVNZW51UGFuZWwsIG9uU2V0TG9jYWxlLCBsb2NhbGU6IGN1cnJlbnRMb2NhbCwgbWFwQ29udHJvbHN9KSA9PiB7XG4gICAgICBjb25zdCB7YWN0aXZlOiBpc0FjdGl2ZSwgZGlzYWJsZUNsb3NlLCBzaG93fSA9IG1hcENvbnRyb2xzLm1hcExvY2FsZSB8fCB7fTtcblxuICAgICAgY29uc3Qgb25DbGlja0l0ZW0gPSB1c2VDYWxsYmFjayhcbiAgICAgICAgbG9jYWxlID0+IHtcbiAgICAgICAgICBvblNldExvY2FsZShsb2NhbGUpO1xuICAgICAgICB9LFxuICAgICAgICBbb25TZXRMb2NhbGVdXG4gICAgICApO1xuXG4gICAgICBjb25zdCBvbkNsaWNrQnV0dG9uID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIGUgPT4ge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBvblRvZ2dsZU1lbnVQYW5lbCgpO1xuICAgICAgICB9LFxuICAgICAgICBbb25Ub2dnbGVNZW51UGFuZWxdXG4gICAgICApO1xuICAgICAgY29uc3QgZ2V0TGFiZWwgPSB1c2VDYWxsYmFjayhsb2NhbGUgPT4gYHRvb2xiYXIuJHtsb2NhbGV9YCwgW10pO1xuXG4gICAgICBpZiAoIXNob3cpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8PlxuICAgICAgICAgIHtpc0FjdGl2ZSA/IChcbiAgICAgICAgICAgIDxNYXBDb250cm9sVG9vbGJhciBzaG93PXtpc0FjdGl2ZX0+XG4gICAgICAgICAgICAgIHthdmFpbGFibGVMb2NhbGVzLm1hcChsb2NhbGUgPT4gKFxuICAgICAgICAgICAgICAgIDxUb29sYmFySXRlbVxuICAgICAgICAgICAgICAgICAga2V5PXtsb2NhbGV9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkNsaWNrSXRlbShsb2NhbGUpfVxuICAgICAgICAgICAgICAgICAgbGFiZWw9e2dldExhYmVsKGxvY2FsZSl9XG4gICAgICAgICAgICAgICAgICBhY3RpdmU9e2N1cnJlbnRMb2NhbCA9PT0gbG9jYWxlfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9NYXBDb250cm9sVG9vbGJhcj5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8TWFwQ29udHJvbEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17b25DbGlja0J1dHRvbn1cbiAgICAgICAgICAgIGFjdGl2ZT17aXNBY3RpdmV9XG4gICAgICAgICAgICBkYXRhLXRpcFxuICAgICAgICAgICAgZGF0YS1mb3I9XCJsb2NhbGVcIlxuICAgICAgICAgICAgZGlzYWJsZUNsb3NlPXtkaXNhYmxlQ2xvc2V9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWFwLWNvbnRyb2wtYnV0dG9uX19sb2NhbGVcIj57Y3VycmVudExvY2FsLnRvVXBwZXJDYXNlKCl9PC9zcGFuPlxuICAgICAgICAgICAgPE1hcENvbnRyb2xUb29sdGlwIGlkPVwibG9jYWxlXCIgbWVzc2FnZT1cInRvb2x0aXAuc2VsZWN0TG9jYWxlXCIgLz5cbiAgICAgICAgICA8L01hcENvbnRyb2xCdXR0b24+XG4gICAgICAgIDwvPlxuICAgICAgKTtcbiAgICB9XG4gICk7XG5cbiAgTG9jYWxlUGFuZWwuZGlzcGxheU5hbWUgPSAnTG9jYWxlUGFuZWwnO1xuXG4gIHJldHVybiBMb2NhbGVQYW5lbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9jYWxlUGFuZWxGYWN0b3J5O1xuIl19