"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _panelTab = _interopRequireDefault(require("./panel-tab"));

var _templateObject;

var propTypes = {
  panels: _propTypes["default"].arrayOf(_propTypes["default"].object),
  activePanel: _propTypes["default"].string,
  togglePanel: _propTypes["default"].func
};

var PanelHeaderBottom = _styledComponents["default"].div.attrs({
  className: 'side-side-panel__header__bottom'
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  background-color: ", ";\n  border-bottom: 1px solid ", ";\n  padding: 0 16px;\n  display: flex;\n  min-height: 30px;\n"])), function (props) {
  return props.theme.sidePanelHeaderBg;
}, function (props) {
  return props.theme.sidePanelHeaderBorder;
});

PanelToggleFactory.deps = [_panelTab["default"]];

function PanelToggleFactory(PanelTab) {
  var PanelToggle = function PanelToggle(_ref) {
    var activePanel = _ref.activePanel,
        panels = _ref.panels,
        togglePanel = _ref.togglePanel;

    var _onClick = (0, _react.useCallback)(function (panel) {
      var callback = panel.onClick || togglePanel;
      callback(panel.id);
    }, [togglePanel]);

    return /*#__PURE__*/_react["default"].createElement(PanelHeaderBottom, null, panels.map(function (panel) {
      return /*#__PURE__*/_react["default"].createElement(PanelTab, {
        key: panel.id,
        panel: panel,
        isActive: activePanel === panel.id,
        onClick: function onClick() {
          return _onClick(panel);
        }
      });
    }));
  };

  PanelToggle.propTypes = propTypes;
  return PanelToggle;
}

var _default = PanelToggleFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvcGFuZWwtdG9nZ2xlLmpzIl0sIm5hbWVzIjpbInByb3BUeXBlcyIsInBhbmVscyIsIlByb3BUeXBlcyIsImFycmF5T2YiLCJvYmplY3QiLCJhY3RpdmVQYW5lbCIsInN0cmluZyIsInRvZ2dsZVBhbmVsIiwiZnVuYyIsIlBhbmVsSGVhZGVyQm90dG9tIiwic3R5bGVkIiwiZGl2IiwiYXR0cnMiLCJjbGFzc05hbWUiLCJwcm9wcyIsInRoZW1lIiwic2lkZVBhbmVsSGVhZGVyQmciLCJzaWRlUGFuZWxIZWFkZXJCb3JkZXIiLCJQYW5lbFRvZ2dsZUZhY3RvcnkiLCJkZXBzIiwiUGFuZWxUYWJGYWN0b3J5IiwiUGFuZWxUYWIiLCJQYW5lbFRvZ2dsZSIsIm9uQ2xpY2siLCJwYW5lbCIsImNhbGxiYWNrIiwiaWQiLCJtYXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxTQUFTLEdBQUc7QUFDaEJDLEVBQUFBLE1BQU0sRUFBRUMsc0JBQVVDLE9BQVYsQ0FBa0JELHNCQUFVRSxNQUE1QixDQURRO0FBRWhCQyxFQUFBQSxXQUFXLEVBQUVILHNCQUFVSSxNQUZQO0FBR2hCQyxFQUFBQSxXQUFXLEVBQUVMLHNCQUFVTTtBQUhQLENBQWxCOztBQU1BLElBQU1DLGlCQUFpQixHQUFHQyw2QkFBT0MsR0FBUCxDQUFXQyxLQUFYLENBQWlCO0FBQ3pDQyxFQUFBQSxTQUFTLEVBQUU7QUFEOEIsQ0FBakIsQ0FBSCxpTkFHRCxVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlDLGlCQUFoQjtBQUFBLENBSEosRUFJTSxVQUFBRixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlFLHFCQUFoQjtBQUFBLENBSlgsQ0FBdkI7O0FBVUFDLGtCQUFrQixDQUFDQyxJQUFuQixHQUEwQixDQUFDQyxvQkFBRCxDQUExQjs7QUFDQSxTQUFTRixrQkFBVCxDQUE0QkcsUUFBNUIsRUFBc0M7QUFDcEMsTUFBTUMsV0FBVyxHQUFHLFNBQWRBLFdBQWMsT0FBd0M7QUFBQSxRQUF0Q2pCLFdBQXNDLFFBQXRDQSxXQUFzQztBQUFBLFFBQXpCSixNQUF5QixRQUF6QkEsTUFBeUI7QUFBQSxRQUFqQk0sV0FBaUIsUUFBakJBLFdBQWlCOztBQUMxRCxRQUFNZ0IsUUFBTyxHQUFHLHdCQUNkLFVBQUFDLEtBQUssRUFBSTtBQUNQLFVBQU1DLFFBQVEsR0FBR0QsS0FBSyxDQUFDRCxPQUFOLElBQWlCaEIsV0FBbEM7QUFDQWtCLE1BQUFBLFFBQVEsQ0FBQ0QsS0FBSyxDQUFDRSxFQUFQLENBQVI7QUFDRCxLQUphLEVBS2QsQ0FBQ25CLFdBQUQsQ0FMYyxDQUFoQjs7QUFPQSx3QkFDRSxnQ0FBQyxpQkFBRCxRQUNHTixNQUFNLENBQUMwQixHQUFQLENBQVcsVUFBQUgsS0FBSztBQUFBLDBCQUNmLGdDQUFDLFFBQUQ7QUFDRSxRQUFBLEdBQUcsRUFBRUEsS0FBSyxDQUFDRSxFQURiO0FBRUUsUUFBQSxLQUFLLEVBQUVGLEtBRlQ7QUFHRSxRQUFBLFFBQVEsRUFBRW5CLFdBQVcsS0FBS21CLEtBQUssQ0FBQ0UsRUFIbEM7QUFJRSxRQUFBLE9BQU8sRUFBRTtBQUFBLGlCQUFNSCxRQUFPLENBQUNDLEtBQUQsQ0FBYjtBQUFBO0FBSlgsUUFEZTtBQUFBLEtBQWhCLENBREgsQ0FERjtBQVlELEdBcEJEOztBQXNCQUYsRUFBQUEsV0FBVyxDQUFDdEIsU0FBWixHQUF3QkEsU0FBeEI7QUFDQSxTQUFPc0IsV0FBUDtBQUNEOztlQUVjSixrQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge3VzZUNhbGxiYWNrfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgUGFuZWxUYWJGYWN0b3J5IGZyb20gJy4vcGFuZWwtdGFiJztcblxuY29uc3QgcHJvcFR5cGVzID0ge1xuICBwYW5lbHM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLFxuICBhY3RpdmVQYW5lbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgdG9nZ2xlUGFuZWw6IFByb3BUeXBlcy5mdW5jXG59O1xuXG5jb25zdCBQYW5lbEhlYWRlckJvdHRvbSA9IHN0eWxlZC5kaXYuYXR0cnMoe1xuICBjbGFzc05hbWU6ICdzaWRlLXNpZGUtcGFuZWxfX2hlYWRlcl9fYm90dG9tJ1xufSlgXG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2lkZVBhbmVsSGVhZGVyQmd9O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zaWRlUGFuZWxIZWFkZXJCb3JkZXJ9O1xuICBwYWRkaW5nOiAwIDE2cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1pbi1oZWlnaHQ6IDMwcHg7XG5gO1xuXG5QYW5lbFRvZ2dsZUZhY3RvcnkuZGVwcyA9IFtQYW5lbFRhYkZhY3RvcnldO1xuZnVuY3Rpb24gUGFuZWxUb2dnbGVGYWN0b3J5KFBhbmVsVGFiKSB7XG4gIGNvbnN0IFBhbmVsVG9nZ2xlID0gKHthY3RpdmVQYW5lbCwgcGFuZWxzLCB0b2dnbGVQYW5lbH0pID0+IHtcbiAgICBjb25zdCBvbkNsaWNrID0gdXNlQ2FsbGJhY2soXG4gICAgICBwYW5lbCA9PiB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrID0gcGFuZWwub25DbGljayB8fCB0b2dnbGVQYW5lbDtcbiAgICAgICAgY2FsbGJhY2socGFuZWwuaWQpO1xuICAgICAgfSxcbiAgICAgIFt0b2dnbGVQYW5lbF1cbiAgICApO1xuICAgIHJldHVybiAoXG4gICAgICA8UGFuZWxIZWFkZXJCb3R0b20+XG4gICAgICAgIHtwYW5lbHMubWFwKHBhbmVsID0+IChcbiAgICAgICAgICA8UGFuZWxUYWJcbiAgICAgICAgICAgIGtleT17cGFuZWwuaWR9XG4gICAgICAgICAgICBwYW5lbD17cGFuZWx9XG4gICAgICAgICAgICBpc0FjdGl2ZT17YWN0aXZlUGFuZWwgPT09IHBhbmVsLmlkfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25DbGljayhwYW5lbCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSl9XG4gICAgICA8L1BhbmVsSGVhZGVyQm90dG9tPlxuICAgICk7XG4gIH07XG5cbiAgUGFuZWxUb2dnbGUucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuICByZXR1cm4gUGFuZWxUb2dnbGU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhbmVsVG9nZ2xlRmFjdG9yeTtcbiJdfQ==