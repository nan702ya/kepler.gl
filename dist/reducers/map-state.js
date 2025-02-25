"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.mapStateReducerFactory = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _reduxActions = require("redux-actions");

var _actionTypes = _interopRequireDefault(require("../constants/action-types"));

var mapStateUpdaters = _interopRequireWildcard(require("./map-state-updaters"));

var _actionHandler;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Important: Do not rename `actionHandler` or the assignment pattern of property value.
 * It is used to generate documentation
 */
var actionHandler = (_actionHandler = {}, (0, _defineProperty2["default"])(_actionHandler, _actionTypes["default"].UPDATE_MAP, mapStateUpdaters.updateMapUpdater), (0, _defineProperty2["default"])(_actionHandler, _actionTypes["default"].FIT_BOUNDS, mapStateUpdaters.fitBoundsUpdater), (0, _defineProperty2["default"])(_actionHandler, _actionTypes["default"].TOGGLE_PERSPECTIVE, mapStateUpdaters.togglePerspectiveUpdater), (0, _defineProperty2["default"])(_actionHandler, _actionTypes["default"].RECEIVE_MAP_CONFIG, mapStateUpdaters.receiveMapConfigUpdater), (0, _defineProperty2["default"])(_actionHandler, _actionTypes["default"].RESET_MAP_CONFIG, mapStateUpdaters.resetMapConfigUpdater), (0, _defineProperty2["default"])(_actionHandler, _actionTypes["default"].TOGGLE_SPLIT_MAP, mapStateUpdaters.toggleSplitMapUpdater), _actionHandler);
/* Reducer */

var mapStateReducerFactory = function mapStateReducerFactory() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (// @ts-ignore
    (0, _reduxActions.handleActions)(actionHandler, _objectSpread(_objectSpread(_objectSpread({}, mapStateUpdaters.INITIAL_MAP_STATE), initialState), {}, {
      initialState: initialState
    }))
  );
};

exports.mapStateReducerFactory = mapStateReducerFactory;

var _default = mapStateReducerFactory();

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9tYXAtc3RhdGUuanMiXSwibmFtZXMiOlsiYWN0aW9uSGFuZGxlciIsIkFjdGlvblR5cGVzIiwiVVBEQVRFX01BUCIsIm1hcFN0YXRlVXBkYXRlcnMiLCJ1cGRhdGVNYXBVcGRhdGVyIiwiRklUX0JPVU5EUyIsImZpdEJvdW5kc1VwZGF0ZXIiLCJUT0dHTEVfUEVSU1BFQ1RJVkUiLCJ0b2dnbGVQZXJzcGVjdGl2ZVVwZGF0ZXIiLCJSRUNFSVZFX01BUF9DT05GSUciLCJyZWNlaXZlTWFwQ29uZmlnVXBkYXRlciIsIlJFU0VUX01BUF9DT05GSUciLCJyZXNldE1hcENvbmZpZ1VwZGF0ZXIiLCJUT0dHTEVfU1BMSVRfTUFQIiwidG9nZ2xlU3BsaXRNYXBVcGRhdGVyIiwibWFwU3RhdGVSZWR1Y2VyRmFjdG9yeSIsImluaXRpYWxTdGF0ZSIsIklOSVRJQUxfTUFQX1NUQVRFIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBTUEsYUFBYSwwRUFDaEJDLHdCQUFZQyxVQURJLEVBQ1NDLGdCQUFnQixDQUFDQyxnQkFEMUIsb0RBRWhCSCx3QkFBWUksVUFGSSxFQUVTRixnQkFBZ0IsQ0FBQ0csZ0JBRjFCLG9EQUdoQkwsd0JBQVlNLGtCQUhJLEVBR2lCSixnQkFBZ0IsQ0FBQ0ssd0JBSGxDLG9EQUloQlAsd0JBQVlRLGtCQUpJLEVBSWlCTixnQkFBZ0IsQ0FBQ08sdUJBSmxDLG9EQUtoQlQsd0JBQVlVLGdCQUxJLEVBS2VSLGdCQUFnQixDQUFDUyxxQkFMaEMsb0RBTWhCWCx3QkFBWVksZ0JBTkksRUFNZVYsZ0JBQWdCLENBQUNXLHFCQU5oQyxrQkFBbkI7QUFTQTs7QUFDTyxJQUFNQyxzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXlCO0FBQUEsTUFBQ0MsWUFBRCx1RUFBZ0IsRUFBaEI7QUFBQSxTQUNwQztBQUNBLHFDQUFjaEIsYUFBZCxnREFDS0csZ0JBQWdCLENBQUNjLGlCQUR0QixHQUVLRCxZQUZMO0FBR0VBLE1BQUFBLFlBQVksRUFBWkE7QUFIRjtBQUZvQztBQUFBLENBQS9COzs7O2VBUVFELHNCQUFzQixFIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIxIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtoYW5kbGVBY3Rpb25zfSBmcm9tICdyZWR1eC1hY3Rpb25zJztcbmltcG9ydCBBY3Rpb25UeXBlcyBmcm9tICdjb25zdGFudHMvYWN0aW9uLXR5cGVzJztcbmltcG9ydCAqIGFzIG1hcFN0YXRlVXBkYXRlcnMgZnJvbSAnLi9tYXAtc3RhdGUtdXBkYXRlcnMnO1xuXG4vKipcbiAqIEltcG9ydGFudDogRG8gbm90IHJlbmFtZSBgYWN0aW9uSGFuZGxlcmAgb3IgdGhlIGFzc2lnbm1lbnQgcGF0dGVybiBvZiBwcm9wZXJ0eSB2YWx1ZS5cbiAqIEl0IGlzIHVzZWQgdG8gZ2VuZXJhdGUgZG9jdW1lbnRhdGlvblxuICovXG5jb25zdCBhY3Rpb25IYW5kbGVyID0ge1xuICBbQWN0aW9uVHlwZXMuVVBEQVRFX01BUF06IG1hcFN0YXRlVXBkYXRlcnMudXBkYXRlTWFwVXBkYXRlcixcbiAgW0FjdGlvblR5cGVzLkZJVF9CT1VORFNdOiBtYXBTdGF0ZVVwZGF0ZXJzLmZpdEJvdW5kc1VwZGF0ZXIsXG4gIFtBY3Rpb25UeXBlcy5UT0dHTEVfUEVSU1BFQ1RJVkVdOiBtYXBTdGF0ZVVwZGF0ZXJzLnRvZ2dsZVBlcnNwZWN0aXZlVXBkYXRlcixcbiAgW0FjdGlvblR5cGVzLlJFQ0VJVkVfTUFQX0NPTkZJR106IG1hcFN0YXRlVXBkYXRlcnMucmVjZWl2ZU1hcENvbmZpZ1VwZGF0ZXIsXG4gIFtBY3Rpb25UeXBlcy5SRVNFVF9NQVBfQ09ORklHXTogbWFwU3RhdGVVcGRhdGVycy5yZXNldE1hcENvbmZpZ1VwZGF0ZXIsXG4gIFtBY3Rpb25UeXBlcy5UT0dHTEVfU1BMSVRfTUFQXTogbWFwU3RhdGVVcGRhdGVycy50b2dnbGVTcGxpdE1hcFVwZGF0ZXJcbn07XG5cbi8qIFJlZHVjZXIgKi9cbmV4cG9ydCBjb25zdCBtYXBTdGF0ZVJlZHVjZXJGYWN0b3J5ID0gKGluaXRpYWxTdGF0ZSA9IHt9KSA9PlxuICAvLyBAdHMtaWdub3JlXG4gIGhhbmRsZUFjdGlvbnMoYWN0aW9uSGFuZGxlciwge1xuICAgIC4uLm1hcFN0YXRlVXBkYXRlcnMuSU5JVElBTF9NQVBfU1RBVEUsXG4gICAgLi4uaW5pdGlhbFN0YXRlLFxuICAgIGluaXRpYWxTdGF0ZVxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgbWFwU3RhdGVSZWR1Y2VyRmFjdG9yeSgpO1xuIl19