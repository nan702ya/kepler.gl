"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultInteraction = getDefaultInteraction;
exports.findFieldsToShow = findFieldsToShow;
exports.getTooltipDisplayDeltaValue = getTooltipDisplayDeltaValue;
exports.getTooltipDisplayValue = getTooltipDisplayValue;
exports.BRUSH_CONFIG = exports.TOOLTIP_MINUS_SIGN = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _defaultSettings = require("../constants/default-settings");

var _dataUtils = require("./data-utils");

var _icons = require("../components/common/icons");

var _tooltip = require("../constants/tooltip");

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
// \u2212 is the minus sign that d3-format uses for decimal number formatting
var TOOLTIP_MINUS_SIGN = "\u2212";
/**
 * @type {typeof import('./interaction-utils').getDefaultInteraction}
 */

exports.TOOLTIP_MINUS_SIGN = TOOLTIP_MINUS_SIGN;

function getDefaultInteraction() {
  return {
    tooltip: {
      id: 'tooltip',
      label: 'interactions.tooltip',
      enabled: true,
      iconComponent: _icons.Messages,
      config: {
        fieldsToShow: {},
        compareMode: false,
        compareType: _tooltip.COMPARE_TYPES.ABSOLUTE
      }
    },
    geocoder: {
      id: 'geocoder',
      label: 'interactions.geocoder',
      enabled: false,
      iconComponent: _icons.Pin,
      position: null
    },
    brush: {
      id: 'brush',
      label: 'interactions.brush',
      enabled: false,
      iconComponent: _icons.Crosshairs,
      config: {
        // size is in km
        size: 0.5
      }
    },
    coordinate: {
      id: 'coordinate',
      label: 'interactions.coordinate',
      enabled: false,
      iconComponent: _icons.CursorClick,
      position: null
    }
  };
}

var BRUSH_CONFIG = {
  range: [0, 50]
};
/**
 * @type {typeof import('./interaction-utils').findFieldsToShow}
 */

exports.BRUSH_CONFIG = BRUSH_CONFIG;

function findFieldsToShow(_ref) {
  var fields = _ref.fields,
      id = _ref.id;

  // first find default tooltip fields for trips
  var fieldsToShow = _defaultSettings.DEFAULT_TOOLTIP_FIELDS.reduce(function (prev, curr) {
    if (fields.find(function (_ref2) {
      var name = _ref2.name;
      return curr.name === name;
    })) {
      prev.push(curr);
    }

    return prev;
  }, []);

  return (0, _defineProperty2["default"])({}, id, fieldsToShow.length ? fieldsToShow : autoFindTooltipFields(fields));
}

function autoFindTooltipFields(fields) {
  var ptFields = _mergeFieldPairs(_defaultSettings.TRIP_POINT_FIELDS); // filter out the default fields that contains lat and lng and any geometry


  var fieldsToShow = fields.filter(function (_ref4) {
    var name = _ref4.name,
        type = _ref4.type;
    return name.replace(/[_,.]+/g, ' ').trim().split(' ').every(function (seg) {
      return !ptFields.includes(seg);
    }) && type !== _defaultSettings.ALL_FIELD_TYPES.geojson && type !== 'object';
  });
  return fieldsToShow.slice(0, _defaultSettings.MAX_DEFAULT_TOOLTIPS).map(function (_ref5) {
    var name = _ref5.name;
    return {
      name: name,
      format: null
    };
  });
}

function _mergeFieldPairs(pairs) {
  return pairs.reduce(function (prev, pair) {
    return [].concat((0, _toConsumableArray2["default"])(prev), (0, _toConsumableArray2["default"])(pair));
  }, []);
}
/**
 * @type {typeof import('./interaction-utils').getTooltipDisplayDeltaValue}
 */


function getTooltipDisplayDeltaValue(_ref6) {
  var primaryData = _ref6.primaryData,
      field = _ref6.field,
      compareType = _ref6.compareType,
      data = _ref6.data,
      fieldIdx = _ref6.fieldIdx,
      item = _ref6.item;
  var displayDeltaValue = null;

  if (primaryData && ( // comparison mode only works for numeric field
  field.type === _defaultSettings.ALL_FIELD_TYPES.integer || field.type === _defaultSettings.ALL_FIELD_TYPES.real)) {
    var baseDp = primaryData.valueAt(fieldIdx);
    var dp = data.valueAt(fieldIdx);

    if ((0, _dataUtils.isNumber)(baseDp) && (0, _dataUtils.isNumber)(dp)) {
      var deltaValue = compareType === _tooltip.COMPARE_TYPES.RELATIVE ? dp / baseDp - 1 : dp - baseDp;
      var deltaFormat = compareType === _tooltip.COMPARE_TYPES.RELATIVE ? _tooltip.TOOLTIP_FORMATS.DECIMAL_PERCENT_FULL_2[_tooltip.TOOLTIP_KEY] : item.format || _tooltip.TOOLTIP_FORMATS.DECIMAL_DECIMAL_FIXED_3[_tooltip.TOOLTIP_KEY];
      displayDeltaValue = (0, _dataUtils.getFormatter)(deltaFormat)(deltaValue); // safely cast string

      displayDeltaValue = (0, _dataUtils.defaultFormatter)(displayDeltaValue);
      var deltaFirstChar = displayDeltaValue.charAt(0);

      if (deltaFirstChar !== '+' && deltaFirstChar !== TOOLTIP_MINUS_SIGN) {
        displayDeltaValue = "+".concat(displayDeltaValue);
      }
    } else {
      displayDeltaValue = TOOLTIP_MINUS_SIGN;
    }
  }

  return displayDeltaValue;
}
/**
 * @type {typeof import('./interaction-utils').getTooltipDisplayValue}
 */


function getTooltipDisplayValue(_ref7) {
  var item = _ref7.item,
      field = _ref7.field,
      data = _ref7.data,
      fieldIdx = _ref7.fieldIdx;
  var dataValue = data.valueAt(fieldIdx);

  if (!(0, _dataUtils.notNullorUndefined)(dataValue)) {
    return '';
  }

  if (item.format) {
    return Array.isArray(dataValue) ? dataValue.map(function (i) {
      return (0, _dataUtils.getFormatter)(item.format, field)(i);
    }).join('\t') : (0, _dataUtils.getFormatter)(item.format, field)(dataValue);
  } else {
    return Array.isArray(dataValue) ? dataValue.map(function (i) {
      return (0, _dataUtils.parseFieldValue)(i, field.type);
    }).join('\t') : (0, _dataUtils.parseFieldValue)(dataValue, field.type);
  } // return item.format
  //   ? getFormatter(item.format, field)(dataValue)
  //   : parseFieldValue(dataValue, field.type);

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9pbnRlcmFjdGlvbi11dGlscy5qcyJdLCJuYW1lcyI6WyJUT09MVElQX01JTlVTX1NJR04iLCJnZXREZWZhdWx0SW50ZXJhY3Rpb24iLCJ0b29sdGlwIiwiaWQiLCJsYWJlbCIsImVuYWJsZWQiLCJpY29uQ29tcG9uZW50IiwiTWVzc2FnZXMiLCJjb25maWciLCJmaWVsZHNUb1Nob3ciLCJjb21wYXJlTW9kZSIsImNvbXBhcmVUeXBlIiwiQ09NUEFSRV9UWVBFUyIsIkFCU09MVVRFIiwiZ2VvY29kZXIiLCJQaW4iLCJwb3NpdGlvbiIsImJydXNoIiwiQ3Jvc3NoYWlycyIsInNpemUiLCJjb29yZGluYXRlIiwiQ3Vyc29yQ2xpY2siLCJCUlVTSF9DT05GSUciLCJyYW5nZSIsImZpbmRGaWVsZHNUb1Nob3ciLCJmaWVsZHMiLCJERUZBVUxUX1RPT0xUSVBfRklFTERTIiwicmVkdWNlIiwicHJldiIsImN1cnIiLCJmaW5kIiwibmFtZSIsInB1c2giLCJsZW5ndGgiLCJhdXRvRmluZFRvb2x0aXBGaWVsZHMiLCJwdEZpZWxkcyIsIl9tZXJnZUZpZWxkUGFpcnMiLCJUUklQX1BPSU5UX0ZJRUxEUyIsImZpbHRlciIsInR5cGUiLCJyZXBsYWNlIiwidHJpbSIsInNwbGl0IiwiZXZlcnkiLCJzZWciLCJpbmNsdWRlcyIsIkFMTF9GSUVMRF9UWVBFUyIsImdlb2pzb24iLCJzbGljZSIsIk1BWF9ERUZBVUxUX1RPT0xUSVBTIiwibWFwIiwiZm9ybWF0IiwicGFpcnMiLCJwYWlyIiwiZ2V0VG9vbHRpcERpc3BsYXlEZWx0YVZhbHVlIiwicHJpbWFyeURhdGEiLCJmaWVsZCIsImRhdGEiLCJmaWVsZElkeCIsIml0ZW0iLCJkaXNwbGF5RGVsdGFWYWx1ZSIsImludGVnZXIiLCJyZWFsIiwiYmFzZURwIiwidmFsdWVBdCIsImRwIiwiZGVsdGFWYWx1ZSIsIlJFTEFUSVZFIiwiZGVsdGFGb3JtYXQiLCJUT09MVElQX0ZPUk1BVFMiLCJERUNJTUFMX1BFUkNFTlRfRlVMTF8yIiwiVE9PTFRJUF9LRVkiLCJERUNJTUFMX0RFQ0lNQUxfRklYRURfMyIsImRlbHRhRmlyc3RDaGFyIiwiY2hhckF0IiwiZ2V0VG9vbHRpcERpc3BsYXlWYWx1ZSIsImRhdGFWYWx1ZSIsIkFycmF5IiwiaXNBcnJheSIsImkiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFNQTs7QUFPQTs7QUFDQTs7QUFsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFrQkE7QUFDTyxJQUFNQSxrQkFBa0IsR0FBRyxRQUEzQjtBQUVQO0FBQ0E7QUFDQTs7OztBQUNPLFNBQVNDLHFCQUFULEdBQWlDO0FBQ3RDLFNBQU87QUFDTEMsSUFBQUEsT0FBTyxFQUFFO0FBQ1BDLE1BQUFBLEVBQUUsRUFBRSxTQURHO0FBRVBDLE1BQUFBLEtBQUssRUFBRSxzQkFGQTtBQUdQQyxNQUFBQSxPQUFPLEVBQUUsSUFIRjtBQUlQQyxNQUFBQSxhQUFhLEVBQUVDLGVBSlI7QUFLUEMsTUFBQUEsTUFBTSxFQUFFO0FBQ05DLFFBQUFBLFlBQVksRUFBRSxFQURSO0FBRU5DLFFBQUFBLFdBQVcsRUFBRSxLQUZQO0FBR05DLFFBQUFBLFdBQVcsRUFBRUMsdUJBQWNDO0FBSHJCO0FBTEQsS0FESjtBQVlMQyxJQUFBQSxRQUFRLEVBQUU7QUFDUlgsTUFBQUEsRUFBRSxFQUFFLFVBREk7QUFFUkMsTUFBQUEsS0FBSyxFQUFFLHVCQUZDO0FBR1JDLE1BQUFBLE9BQU8sRUFBRSxLQUhEO0FBSVJDLE1BQUFBLGFBQWEsRUFBRVMsVUFKUDtBQUtSQyxNQUFBQSxRQUFRLEVBQUU7QUFMRixLQVpMO0FBbUJMQyxJQUFBQSxLQUFLLEVBQUU7QUFDTGQsTUFBQUEsRUFBRSxFQUFFLE9BREM7QUFFTEMsTUFBQUEsS0FBSyxFQUFFLG9CQUZGO0FBR0xDLE1BQUFBLE9BQU8sRUFBRSxLQUhKO0FBSUxDLE1BQUFBLGFBQWEsRUFBRVksaUJBSlY7QUFLTFYsTUFBQUEsTUFBTSxFQUFFO0FBQ047QUFDQVcsUUFBQUEsSUFBSSxFQUFFO0FBRkE7QUFMSCxLQW5CRjtBQTZCTEMsSUFBQUEsVUFBVSxFQUFFO0FBQ1ZqQixNQUFBQSxFQUFFLEVBQUUsWUFETTtBQUVWQyxNQUFBQSxLQUFLLEVBQUUseUJBRkc7QUFHVkMsTUFBQUEsT0FBTyxFQUFFLEtBSEM7QUFJVkMsTUFBQUEsYUFBYSxFQUFFZSxrQkFKTDtBQUtWTCxNQUFBQSxRQUFRLEVBQUU7QUFMQTtBQTdCUCxHQUFQO0FBcUNEOztBQUVNLElBQU1NLFlBQVksR0FBRztBQUMxQkMsRUFBQUEsS0FBSyxFQUFFLENBQUMsQ0FBRCxFQUFJLEVBQUo7QUFEbUIsQ0FBckI7QUFJUDtBQUNBO0FBQ0E7Ozs7QUFDTyxTQUFTQyxnQkFBVCxPQUF3QztBQUFBLE1BQWJDLE1BQWEsUUFBYkEsTUFBYTtBQUFBLE1BQUx0QixFQUFLLFFBQUxBLEVBQUs7O0FBQzdDO0FBQ0EsTUFBTU0sWUFBWSxHQUFHaUIsd0NBQXVCQyxNQUF2QixDQUE4QixVQUFDQyxJQUFELEVBQU9DLElBQVAsRUFBZ0I7QUFDakUsUUFBSUosTUFBTSxDQUFDSyxJQUFQLENBQVk7QUFBQSxVQUFFQyxJQUFGLFNBQUVBLElBQUY7QUFBQSxhQUFZRixJQUFJLENBQUNFLElBQUwsS0FBY0EsSUFBMUI7QUFBQSxLQUFaLENBQUosRUFBaUQ7QUFDL0NILE1BQUFBLElBQUksQ0FBQ0ksSUFBTCxDQUFVSCxJQUFWO0FBQ0Q7O0FBQ0QsV0FBT0QsSUFBUDtBQUNELEdBTG9CLEVBS2xCLEVBTGtCLENBQXJCOztBQU9BLDhDQUNHekIsRUFESCxFQUNRTSxZQUFZLENBQUN3QixNQUFiLEdBQXNCeEIsWUFBdEIsR0FBcUN5QixxQkFBcUIsQ0FBQ1QsTUFBRCxDQURsRTtBQUdEOztBQUVELFNBQVNTLHFCQUFULENBQStCVCxNQUEvQixFQUF1QztBQUNyQyxNQUFNVSxRQUFRLEdBQUdDLGdCQUFnQixDQUFDQyxrQ0FBRCxDQUFqQyxDQURxQyxDQUVyQzs7O0FBQ0EsTUFBTTVCLFlBQVksR0FBR2dCLE1BQU0sQ0FBQ2EsTUFBUCxDQUNuQjtBQUFBLFFBQUVQLElBQUYsU0FBRUEsSUFBRjtBQUFBLFFBQVFRLElBQVIsU0FBUUEsSUFBUjtBQUFBLFdBQ0VSLElBQUksQ0FDRFMsT0FESCxDQUNXLFNBRFgsRUFDc0IsR0FEdEIsRUFFR0MsSUFGSCxHQUdHQyxLQUhILENBR1MsR0FIVCxFQUlHQyxLQUpILENBSVMsVUFBQUMsR0FBRztBQUFBLGFBQUksQ0FBQ1QsUUFBUSxDQUFDVSxRQUFULENBQWtCRCxHQUFsQixDQUFMO0FBQUEsS0FKWixLQUtBTCxJQUFJLEtBQUtPLGlDQUFnQkMsT0FMekIsSUFNQVIsSUFBSSxLQUFLLFFBUFg7QUFBQSxHQURtQixDQUFyQjtBQVdBLFNBQU85QixZQUFZLENBQUN1QyxLQUFiLENBQW1CLENBQW5CLEVBQXNCQyxxQ0FBdEIsRUFBNENDLEdBQTVDLENBQWdELGlCQUFZO0FBQUEsUUFBVm5CLElBQVUsU0FBVkEsSUFBVTtBQUNqRSxXQUFPO0FBQ0xBLE1BQUFBLElBQUksRUFBSkEsSUFESztBQUVMb0IsTUFBQUEsTUFBTSxFQUFFO0FBRkgsS0FBUDtBQUlELEdBTE0sQ0FBUDtBQU1EOztBQUVELFNBQVNmLGdCQUFULENBQTBCZ0IsS0FBMUIsRUFBaUM7QUFDL0IsU0FBT0EsS0FBSyxDQUFDekIsTUFBTixDQUFhLFVBQUNDLElBQUQsRUFBT3lCLElBQVA7QUFBQSx5REFBb0J6QixJQUFwQix1Q0FBNkJ5QixJQUE3QjtBQUFBLEdBQWIsRUFBaUQsRUFBakQsQ0FBUDtBQUNEO0FBRUQ7QUFDQTtBQUNBOzs7QUFDTyxTQUFTQywyQkFBVCxRQU9KO0FBQUEsTUFOREMsV0FNQyxTQU5EQSxXQU1DO0FBQUEsTUFMREMsS0FLQyxTQUxEQSxLQUtDO0FBQUEsTUFKRDdDLFdBSUMsU0FKREEsV0FJQztBQUFBLE1BSEQ4QyxJQUdDLFNBSERBLElBR0M7QUFBQSxNQUZEQyxRQUVDLFNBRkRBLFFBRUM7QUFBQSxNQUREQyxJQUNDLFNBRERBLElBQ0M7QUFDRCxNQUFJQyxpQkFBaUIsR0FBRyxJQUF4Qjs7QUFFQSxNQUNFTCxXQUFXLE1BQ1g7QUFDQ0MsRUFBQUEsS0FBSyxDQUFDakIsSUFBTixLQUFlTyxpQ0FBZ0JlLE9BQS9CLElBQTBDTCxLQUFLLENBQUNqQixJQUFOLEtBQWVPLGlDQUFnQmdCLElBRi9ELENBRGIsRUFJRTtBQUNBLFFBQU1DLE1BQU0sR0FBR1IsV0FBVyxDQUFDUyxPQUFaLENBQW9CTixRQUFwQixDQUFmO0FBQ0EsUUFBTU8sRUFBRSxHQUFHUixJQUFJLENBQUNPLE9BQUwsQ0FBYU4sUUFBYixDQUFYOztBQUNBLFFBQUkseUJBQVNLLE1BQVQsS0FBb0IseUJBQVNFLEVBQVQsQ0FBeEIsRUFBc0M7QUFDcEMsVUFBTUMsVUFBVSxHQUFHdkQsV0FBVyxLQUFLQyx1QkFBY3VELFFBQTlCLEdBQXlDRixFQUFFLEdBQUdGLE1BQUwsR0FBYyxDQUF2RCxHQUEyREUsRUFBRSxHQUFHRixNQUFuRjtBQUNBLFVBQU1LLFdBQVcsR0FDZnpELFdBQVcsS0FBS0MsdUJBQWN1RCxRQUE5QixHQUNJRSx5QkFBZ0JDLHNCQUFoQixDQUF1Q0Msb0JBQXZDLENBREosR0FFSVosSUFBSSxDQUFDUixNQUFMLElBQWVrQix5QkFBZ0JHLHVCQUFoQixDQUF3Q0Qsb0JBQXhDLENBSHJCO0FBS0FYLE1BQUFBLGlCQUFpQixHQUFHLDZCQUFhUSxXQUFiLEVBQTBCRixVQUExQixDQUFwQixDQVBvQyxDQVNwQzs7QUFDQU4sTUFBQUEsaUJBQWlCLEdBQUcsaUNBQWlCQSxpQkFBakIsQ0FBcEI7QUFDQSxVQUFNYSxjQUFjLEdBQUdiLGlCQUFpQixDQUFDYyxNQUFsQixDQUF5QixDQUF6QixDQUF2Qjs7QUFDQSxVQUFJRCxjQUFjLEtBQUssR0FBbkIsSUFBMEJBLGNBQWMsS0FBS3pFLGtCQUFqRCxFQUFxRTtBQUNuRTRELFFBQUFBLGlCQUFpQixjQUFPQSxpQkFBUCxDQUFqQjtBQUNEO0FBQ0YsS0FmRCxNQWVPO0FBQ0xBLE1BQUFBLGlCQUFpQixHQUFHNUQsa0JBQXBCO0FBQ0Q7QUFDRjs7QUFFRCxTQUFPNEQsaUJBQVA7QUFDRDtBQUVEO0FBQ0E7QUFDQTs7O0FBQ08sU0FBU2Usc0JBQVQsUUFBK0Q7QUFBQSxNQUE5QmhCLElBQThCLFNBQTlCQSxJQUE4QjtBQUFBLE1BQXhCSCxLQUF3QixTQUF4QkEsS0FBd0I7QUFBQSxNQUFqQkMsSUFBaUIsU0FBakJBLElBQWlCO0FBQUEsTUFBWEMsUUFBVyxTQUFYQSxRQUFXO0FBQ3BFLE1BQU1rQixTQUFTLEdBQUduQixJQUFJLENBQUNPLE9BQUwsQ0FBYU4sUUFBYixDQUFsQjs7QUFDQSxNQUFJLENBQUMsbUNBQW1Ca0IsU0FBbkIsQ0FBTCxFQUFvQztBQUNsQyxXQUFPLEVBQVA7QUFDRDs7QUFFRCxNQUFJakIsSUFBSSxDQUFDUixNQUFULEVBQWlCO0FBQ2YsV0FBTzBCLEtBQUssQ0FBQ0MsT0FBTixDQUFjRixTQUFkLElBQTJCQSxTQUFTLENBQUMxQixHQUFWLENBQWMsVUFBQTZCLENBQUM7QUFBQSxhQUFJLDZCQUFhcEIsSUFBSSxDQUFDUixNQUFsQixFQUEwQkssS0FBMUIsRUFBaUN1QixDQUFqQyxDQUFKO0FBQUEsS0FBZixFQUF3REMsSUFBeEQsQ0FBNkQsSUFBN0QsQ0FBM0IsR0FBZ0csNkJBQWFyQixJQUFJLENBQUNSLE1BQWxCLEVBQTBCSyxLQUExQixFQUFpQ29CLFNBQWpDLENBQXZHO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsV0FBT0MsS0FBSyxDQUFDQyxPQUFOLENBQWNGLFNBQWQsSUFBMkJBLFNBQVMsQ0FBQzFCLEdBQVYsQ0FBYyxVQUFBNkIsQ0FBQztBQUFBLGFBQUksZ0NBQWdCQSxDQUFoQixFQUFtQnZCLEtBQUssQ0FBQ2pCLElBQXpCLENBQUo7QUFBQSxLQUFmLEVBQW1EeUMsSUFBbkQsQ0FBd0QsSUFBeEQsQ0FBM0IsR0FBMkYsZ0NBQWdCSixTQUFoQixFQUEyQnBCLEtBQUssQ0FBQ2pCLElBQWpDLENBQWxHO0FBQ0QsR0FWbUUsQ0FXcEU7QUFDQTtBQUNBOztBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIxIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtcbiAgREVGQVVMVF9UT09MVElQX0ZJRUxEUyxcbiAgTUFYX0RFRkFVTFRfVE9PTFRJUFMsXG4gIEFMTF9GSUVMRF9UWVBFUyxcbiAgVFJJUF9QT0lOVF9GSUVMRFNcbn0gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IHtcbiAgcGFyc2VGaWVsZFZhbHVlLFxuICBnZXRGb3JtYXR0ZXIsXG4gIGlzTnVtYmVyLFxuICBkZWZhdWx0Rm9ybWF0dGVyLFxuICBub3ROdWxsb3JVbmRlZmluZWRcbn0gZnJvbSAndXRpbHMvZGF0YS11dGlscyc7XG5pbXBvcnQge01lc3NhZ2VzLCBDcm9zc2hhaXJzLCBDdXJzb3JDbGljaywgUGlufSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucy9pbmRleCc7XG5pbXBvcnQge1RPT0xUSVBfRk9STUFUUywgVE9PTFRJUF9LRVksIENPTVBBUkVfVFlQRVN9IGZyb20gJ2NvbnN0YW50cy90b29sdGlwJztcblxuLy8gXFx1MjIxMiBpcyB0aGUgbWludXMgc2lnbiB0aGF0IGQzLWZvcm1hdCB1c2VzIGZvciBkZWNpbWFsIG51bWJlciBmb3JtYXR0aW5nXG5leHBvcnQgY29uc3QgVE9PTFRJUF9NSU5VU19TSUdOID0gJ1xcdTIyMTInO1xuXG4vKipcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2ludGVyYWN0aW9uLXV0aWxzJykuZ2V0RGVmYXVsdEludGVyYWN0aW9ufVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdEludGVyYWN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHRvb2x0aXA6IHtcbiAgICAgIGlkOiAndG9vbHRpcCcsXG4gICAgICBsYWJlbDogJ2ludGVyYWN0aW9ucy50b29sdGlwJyxcbiAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICBpY29uQ29tcG9uZW50OiBNZXNzYWdlcyxcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICBmaWVsZHNUb1Nob3c6IHt9LFxuICAgICAgICBjb21wYXJlTW9kZTogZmFsc2UsXG4gICAgICAgIGNvbXBhcmVUeXBlOiBDT01QQVJFX1RZUEVTLkFCU09MVVRFXG4gICAgICB9XG4gICAgfSxcbiAgICBnZW9jb2Rlcjoge1xuICAgICAgaWQ6ICdnZW9jb2RlcicsXG4gICAgICBsYWJlbDogJ2ludGVyYWN0aW9ucy5nZW9jb2RlcicsXG4gICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgIGljb25Db21wb25lbnQ6IFBpbixcbiAgICAgIHBvc2l0aW9uOiBudWxsXG4gICAgfSxcbiAgICBicnVzaDoge1xuICAgICAgaWQ6ICdicnVzaCcsXG4gICAgICBsYWJlbDogJ2ludGVyYWN0aW9ucy5icnVzaCcsXG4gICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgIGljb25Db21wb25lbnQ6IENyb3NzaGFpcnMsXG4gICAgICBjb25maWc6IHtcbiAgICAgICAgLy8gc2l6ZSBpcyBpbiBrbVxuICAgICAgICBzaXplOiAwLjVcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvb3JkaW5hdGU6IHtcbiAgICAgIGlkOiAnY29vcmRpbmF0ZScsXG4gICAgICBsYWJlbDogJ2ludGVyYWN0aW9ucy5jb29yZGluYXRlJyxcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgaWNvbkNvbXBvbmVudDogQ3Vyc29yQ2xpY2ssXG4gICAgICBwb3NpdGlvbjogbnVsbFxuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IEJSVVNIX0NPTkZJRyA9IHtcbiAgcmFuZ2U6IFswLCA1MF1cbn07XG5cbi8qKlxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vaW50ZXJhY3Rpb24tdXRpbHMnKS5maW5kRmllbGRzVG9TaG93fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZEZpZWxkc1RvU2hvdyh7ZmllbGRzLCBpZH0pIHtcbiAgLy8gZmlyc3QgZmluZCBkZWZhdWx0IHRvb2x0aXAgZmllbGRzIGZvciB0cmlwc1xuICBjb25zdCBmaWVsZHNUb1Nob3cgPSBERUZBVUxUX1RPT0xUSVBfRklFTERTLnJlZHVjZSgocHJldiwgY3VycikgPT4ge1xuICAgIGlmIChmaWVsZHMuZmluZCgoe25hbWV9KSA9PiBjdXJyLm5hbWUgPT09IG5hbWUpKSB7XG4gICAgICBwcmV2LnB1c2goY3Vycik7XG4gICAgfVxuICAgIHJldHVybiBwcmV2O1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBbaWRdOiBmaWVsZHNUb1Nob3cubGVuZ3RoID8gZmllbGRzVG9TaG93IDogYXV0b0ZpbmRUb29sdGlwRmllbGRzKGZpZWxkcylcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXV0b0ZpbmRUb29sdGlwRmllbGRzKGZpZWxkcykge1xuICBjb25zdCBwdEZpZWxkcyA9IF9tZXJnZUZpZWxkUGFpcnMoVFJJUF9QT0lOVF9GSUVMRFMpO1xuICAvLyBmaWx0ZXIgb3V0IHRoZSBkZWZhdWx0IGZpZWxkcyB0aGF0IGNvbnRhaW5zIGxhdCBhbmQgbG5nIGFuZCBhbnkgZ2VvbWV0cnlcbiAgY29uc3QgZmllbGRzVG9TaG93ID0gZmllbGRzLmZpbHRlcihcbiAgICAoe25hbWUsIHR5cGV9KSA9PlxuICAgICAgbmFtZVxuICAgICAgICAucmVwbGFjZSgvW18sLl0rL2csICcgJylcbiAgICAgICAgLnRyaW0oKVxuICAgICAgICAuc3BsaXQoJyAnKVxuICAgICAgICAuZXZlcnkoc2VnID0+ICFwdEZpZWxkcy5pbmNsdWRlcyhzZWcpKSAmJlxuICAgICAgdHlwZSAhPT0gQUxMX0ZJRUxEX1RZUEVTLmdlb2pzb24gJiZcbiAgICAgIHR5cGUgIT09ICdvYmplY3QnXG4gICk7XG5cbiAgcmV0dXJuIGZpZWxkc1RvU2hvdy5zbGljZSgwLCBNQVhfREVGQVVMVF9UT09MVElQUykubWFwKCh7bmFtZX0pID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZSxcbiAgICAgIGZvcm1hdDogbnVsbFxuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfbWVyZ2VGaWVsZFBhaXJzKHBhaXJzKSB7XG4gIHJldHVybiBwYWlycy5yZWR1Y2UoKHByZXYsIHBhaXIpID0+IFsuLi5wcmV2LCAuLi5wYWlyXSwgW10pO1xufVxuXG4vKipcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2ludGVyYWN0aW9uLXV0aWxzJykuZ2V0VG9vbHRpcERpc3BsYXlEZWx0YVZhbHVlfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG9vbHRpcERpc3BsYXlEZWx0YVZhbHVlKHtcbiAgcHJpbWFyeURhdGEsXG4gIGZpZWxkLFxuICBjb21wYXJlVHlwZSxcbiAgZGF0YSxcbiAgZmllbGRJZHgsXG4gIGl0ZW1cbn0pIHtcbiAgbGV0IGRpc3BsYXlEZWx0YVZhbHVlID0gbnVsbDtcblxuICBpZiAoXG4gICAgcHJpbWFyeURhdGEgJiZcbiAgICAvLyBjb21wYXJpc29uIG1vZGUgb25seSB3b3JrcyBmb3IgbnVtZXJpYyBmaWVsZFxuICAgIChmaWVsZC50eXBlID09PSBBTExfRklFTERfVFlQRVMuaW50ZWdlciB8fCBmaWVsZC50eXBlID09PSBBTExfRklFTERfVFlQRVMucmVhbClcbiAgKSB7XG4gICAgY29uc3QgYmFzZURwID0gcHJpbWFyeURhdGEudmFsdWVBdChmaWVsZElkeCk7XG4gICAgY29uc3QgZHAgPSBkYXRhLnZhbHVlQXQoZmllbGRJZHgpO1xuICAgIGlmIChpc051bWJlcihiYXNlRHApICYmIGlzTnVtYmVyKGRwKSkge1xuICAgICAgY29uc3QgZGVsdGFWYWx1ZSA9IGNvbXBhcmVUeXBlID09PSBDT01QQVJFX1RZUEVTLlJFTEFUSVZFID8gZHAgLyBiYXNlRHAgLSAxIDogZHAgLSBiYXNlRHA7XG4gICAgICBjb25zdCBkZWx0YUZvcm1hdCA9XG4gICAgICAgIGNvbXBhcmVUeXBlID09PSBDT01QQVJFX1RZUEVTLlJFTEFUSVZFXG4gICAgICAgICAgPyBUT09MVElQX0ZPUk1BVFMuREVDSU1BTF9QRVJDRU5UX0ZVTExfMltUT09MVElQX0tFWV1cbiAgICAgICAgICA6IGl0ZW0uZm9ybWF0IHx8IFRPT0xUSVBfRk9STUFUUy5ERUNJTUFMX0RFQ0lNQUxfRklYRURfM1tUT09MVElQX0tFWV07XG5cbiAgICAgIGRpc3BsYXlEZWx0YVZhbHVlID0gZ2V0Rm9ybWF0dGVyKGRlbHRhRm9ybWF0KShkZWx0YVZhbHVlKTtcblxuICAgICAgLy8gc2FmZWx5IGNhc3Qgc3RyaW5nXG4gICAgICBkaXNwbGF5RGVsdGFWYWx1ZSA9IGRlZmF1bHRGb3JtYXR0ZXIoZGlzcGxheURlbHRhVmFsdWUpO1xuICAgICAgY29uc3QgZGVsdGFGaXJzdENoYXIgPSBkaXNwbGF5RGVsdGFWYWx1ZS5jaGFyQXQoMCk7XG4gICAgICBpZiAoZGVsdGFGaXJzdENoYXIgIT09ICcrJyAmJiBkZWx0YUZpcnN0Q2hhciAhPT0gVE9PTFRJUF9NSU5VU19TSUdOKSB7XG4gICAgICAgIGRpc3BsYXlEZWx0YVZhbHVlID0gYCske2Rpc3BsYXlEZWx0YVZhbHVlfWA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BsYXlEZWx0YVZhbHVlID0gVE9PTFRJUF9NSU5VU19TSUdOO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkaXNwbGF5RGVsdGFWYWx1ZTtcbn1cblxuLyoqXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9pbnRlcmFjdGlvbi11dGlscycpLmdldFRvb2x0aXBEaXNwbGF5VmFsdWV9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUb29sdGlwRGlzcGxheVZhbHVlKHtpdGVtLCBmaWVsZCwgZGF0YSwgZmllbGRJZHh9KSB7XG4gIGNvbnN0IGRhdGFWYWx1ZSA9IGRhdGEudmFsdWVBdChmaWVsZElkeCk7XG4gIGlmICghbm90TnVsbG9yVW5kZWZpbmVkKGRhdGFWYWx1ZSkpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBpZiAoaXRlbS5mb3JtYXQpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShkYXRhVmFsdWUpID8gZGF0YVZhbHVlLm1hcChpID0+IGdldEZvcm1hdHRlcihpdGVtLmZvcm1hdCwgZmllbGQpKGkpKS5qb2luKCdcXHQnKSA6IGdldEZvcm1hdHRlcihpdGVtLmZvcm1hdCwgZmllbGQpKGRhdGFWYWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoZGF0YVZhbHVlKSA/IGRhdGFWYWx1ZS5tYXAoaSA9PiBwYXJzZUZpZWxkVmFsdWUoaSwgZmllbGQudHlwZSkpLmpvaW4oJ1xcdCcpIDogcGFyc2VGaWVsZFZhbHVlKGRhdGFWYWx1ZSwgZmllbGQudHlwZSk7XG4gIH1cbiAgLy8gcmV0dXJuIGl0ZW0uZm9ybWF0XG4gIC8vICAgPyBnZXRGb3JtYXR0ZXIoaXRlbS5mb3JtYXQsIGZpZWxkKShkYXRhVmFsdWUpXG4gIC8vICAgOiBwYXJzZUZpZWxkVmFsdWUoZGF0YVZhbHVlLCBmaWVsZC50eXBlKTtcbn1cbiJdfQ==