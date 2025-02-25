"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _interactionPanel = _interopRequireDefault(require("./interaction-panel/interaction-panel"));

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
InteractionManagerFactory.deps = [_interactionPanel["default"]];

function InteractionManagerFactory(InteractionPanel) {
  var InteractionManager = function InteractionManager(_ref) {
    var interactionConfig = _ref.interactionConfig,
        datasets = _ref.datasets,
        visStateActions = _ref.visStateActions;
    var onConfigChange = visStateActions.interactionConfigChange;
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "interaction-manager"
    }, Object.keys(interactionConfig).map(function (key) {
      return /*#__PURE__*/_react["default"].createElement(InteractionPanel, {
        datasets: datasets,
        config: interactionConfig[key],
        key: key,
        onConfigChange: onConfigChange
      });
    }));
  };

  return InteractionManager;
}

var _default = InteractionManagerFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvaW50ZXJhY3Rpb24tbWFuYWdlci5qcyJdLCJuYW1lcyI6WyJJbnRlcmFjdGlvbk1hbmFnZXJGYWN0b3J5IiwiZGVwcyIsIkludGVyYWN0aW9uUGFuZWxGYWN0b3J5IiwiSW50ZXJhY3Rpb25QYW5lbCIsIkludGVyYWN0aW9uTWFuYWdlciIsImludGVyYWN0aW9uQ29uZmlnIiwiZGF0YXNldHMiLCJ2aXNTdGF0ZUFjdGlvbnMiLCJvbkNvbmZpZ0NoYW5nZSIsImludGVyYWN0aW9uQ29uZmlnQ2hhbmdlIiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsImtleSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQXJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBQSx5QkFBeUIsQ0FBQ0MsSUFBMUIsR0FBaUMsQ0FBQ0MsNEJBQUQsQ0FBakM7O0FBRUEsU0FBU0YseUJBQVQsQ0FBbUNHLGdCQUFuQyxFQUFxRDtBQUNuRCxNQUFNQyxrQkFBa0IsR0FBRyxTQUFyQkEsa0JBQXFCLE9BQW9EO0FBQUEsUUFBbERDLGlCQUFrRCxRQUFsREEsaUJBQWtEO0FBQUEsUUFBL0JDLFFBQStCLFFBQS9CQSxRQUErQjtBQUFBLFFBQXJCQyxlQUFxQixRQUFyQkEsZUFBcUI7QUFBQSxRQUM3Q0MsY0FENkMsR0FDM0JELGVBRDJCLENBQ3RFRSx1QkFEc0U7QUFFN0Usd0JBQ0U7QUFBSyxNQUFBLFNBQVMsRUFBQztBQUFmLE9BQ0dDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZTixpQkFBWixFQUErQk8sR0FBL0IsQ0FBbUMsVUFBQUMsR0FBRztBQUFBLDBCQUNyQyxnQ0FBQyxnQkFBRDtBQUNFLFFBQUEsUUFBUSxFQUFFUCxRQURaO0FBRUUsUUFBQSxNQUFNLEVBQUVELGlCQUFpQixDQUFDUSxHQUFELENBRjNCO0FBR0UsUUFBQSxHQUFHLEVBQUVBLEdBSFA7QUFJRSxRQUFBLGNBQWMsRUFBRUw7QUFKbEIsUUFEcUM7QUFBQSxLQUF0QyxDQURILENBREY7QUFZRCxHQWREOztBQWdCQSxTQUFPSixrQkFBUDtBQUNEOztlQUVjSix5QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSW50ZXJhY3Rpb25QYW5lbEZhY3RvcnkgZnJvbSAnLi9pbnRlcmFjdGlvbi1wYW5lbC9pbnRlcmFjdGlvbi1wYW5lbCc7XG5cbkludGVyYWN0aW9uTWFuYWdlckZhY3RvcnkuZGVwcyA9IFtJbnRlcmFjdGlvblBhbmVsRmFjdG9yeV07XG5cbmZ1bmN0aW9uIEludGVyYWN0aW9uTWFuYWdlckZhY3RvcnkoSW50ZXJhY3Rpb25QYW5lbCkge1xuICBjb25zdCBJbnRlcmFjdGlvbk1hbmFnZXIgPSAoe2ludGVyYWN0aW9uQ29uZmlnLCBkYXRhc2V0cywgdmlzU3RhdGVBY3Rpb25zfSkgPT4ge1xuICAgIGNvbnN0IHtpbnRlcmFjdGlvbkNvbmZpZ0NoYW5nZTogb25Db25maWdDaGFuZ2V9ID0gdmlzU3RhdGVBY3Rpb25zO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImludGVyYWN0aW9uLW1hbmFnZXJcIj5cbiAgICAgICAge09iamVjdC5rZXlzKGludGVyYWN0aW9uQ29uZmlnKS5tYXAoa2V5ID0+IChcbiAgICAgICAgICA8SW50ZXJhY3Rpb25QYW5lbFxuICAgICAgICAgICAgZGF0YXNldHM9e2RhdGFzZXRzfVxuICAgICAgICAgICAgY29uZmlnPXtpbnRlcmFjdGlvbkNvbmZpZ1trZXldfVxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBvbkNvbmZpZ0NoYW5nZT17b25Db25maWdDaGFuZ2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJldHVybiBJbnRlcmFjdGlvbk1hbmFnZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEludGVyYWN0aW9uTWFuYWdlckZhY3Rvcnk7XG4iXX0=