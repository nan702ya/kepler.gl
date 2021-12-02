"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFilterGpuMode = setFilterGpuMode;
exports.assignGpuChannels = assignGpuChannels;
exports.assignGpuChannel = assignGpuChannel;
exports.resetFilterGpuMode = resetFilterGpuMode;
exports.getGpuFilterProps = getGpuFilterProps;
exports.getDatasetFieldIndexForFilter = getDatasetFieldIndexForFilter;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _utils = require("./utils");

var _defaultSettings = require("../constants/default-settings");

var _dataUtils = require("./data-utils");

var _moment = _interopRequireDefault(require("moment"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Set gpu mode based on current number of gpu filters exists
 * @type {typeof import('./gpu-filter-utils').setFilterGpuMode}
 */
function setFilterGpuMode(filter, filters) {
  // filter can be applied to multiple datasets, hence gpu filter mode should also be
  // an array, however, to keep us sane, for now, we only check if there is available channel for every dataId,
  // if all of them has, we set gpu mode to true
  // TODO: refactor filter so we don't keep an array of everything
  filter.dataId.forEach(function (dataId, datasetIdx) {
    var gpuFilters = filters.filter(function (f) {
      return f.dataId.includes(dataId) && f.gpu;
    });

    if (filter.gpu && gpuFilters.length === _defaultSettings.MAX_GPU_FILTERS) {
      return (0, _utils.set)(['gpu'], false, filter);
    }
  });
  return filter;
}
/**
 * Scan though all filters and assign gpu chanel to gpu filter
 * @type {typeof import('./gpu-filter-utils').assignGpuChannels}
 */


function assignGpuChannels(allFilters) {
  return allFilters.reduce(function (accu, f, index) {
    var filters = accu; // if gpu is true assign and validate gpu Channel

    if (f.gpu) {
      f = assignGpuChannel(f, accu);
      filters = (0, _utils.set)([index], f, accu);
    }

    return filters;
  }, allFilters);
}
/**
 * Assign a new gpu filter a channel based on first availability
 * @type {typeof import('./gpu-filter-utils').assignGpuChannel}
 */


function assignGpuChannel(filter, filters) {
  // find first available channel
  if (!filter.gpu) {
    return filter;
  }

  var gpuChannel = filter.gpuChannel || [];
  filter.dataId.forEach(function (dataId, datasetIdx) {
    var findGpuChannel = function findGpuChannel(channel) {
      return function (f) {
        var dataIdx = (0, _utils.toArray)(f.dataId).indexOf(dataId);
        return f.id !== filter.id && dataIdx > -1 && f.gpu && (0, _utils.toArray)(f.gpuChannel)[dataIdx] === channel;
      };
    };

    if (Number.isFinite(gpuChannel[datasetIdx]) && !filters.find(findGpuChannel(gpuChannel[datasetIdx]))) {
      // if value is already assigned and valid
      return;
    }

    var i = 0;

    while (i < _defaultSettings.MAX_GPU_FILTERS) {
      if (!filters.find(findGpuChannel(i))) {
        gpuChannel[datasetIdx] = i;
        return;
      }

      i++;
    }
  }); // if cannot find channel for all dataid, set gpu back to false
  // TODO: refactor filter to handle same filter different gpu mode

  if (!gpuChannel.length || !gpuChannel.every(Number.isFinite)) {
    return _objectSpread(_objectSpread({}, filter), {}, {
      gpu: false
    });
  }

  return _objectSpread(_objectSpread({}, filter), {}, {
    gpuChannel: gpuChannel
  });
}
/**
 * Edit filter.gpu to ensure that only
 * X number of gpu filers can coexist.
 * @type {typeof import('./gpu-filter-utils').resetFilterGpuMode}
 */


function resetFilterGpuMode(filters) {
  var gpuPerDataset = {};
  return filters.map(function (f, i) {
    if (f.gpu) {
      var gpu = true;
      (0, _utils.toArray)(f.dataId).forEach(function (dataId) {
        var count = gpuPerDataset[dataId];

        if (count === _defaultSettings.MAX_GPU_FILTERS) {
          gpu = false;
        } else {
          gpuPerDataset[dataId] = count ? count + 1 : 1;
        }
      });

      if (!gpu) {
        return (0, _utils.set)(['gpu'], false, f);
      }
    }

    return f;
  });
}
/**
 * Initial filter uniform
 * @returns {Array<Array<Number>>}
 */


function getEmptyFilterRange() {
  return new Array(_defaultSettings.MAX_GPU_FILTERS).fill(0).map(function (d) {
    return [0, 0];
  });
}
/**
 * Returns index of the data element.
 * @param {any} d Data element with row index info.
 * @returns number
 */


var defaultGetIndex = function defaultGetIndex(d) {
  return d.index;
};
/**
 * Returns value at the specified row from the data container.
 * @param {import('./table-utils/data-container-interface').DataContainerInterface} dc Data container.
 * @param {any} d Data element with row index info.
 * @param {number} fieldIndex Column index in the data container.
 * @returns
 */


var defaultGetData = function defaultGetData(dc, d, fieldIndex) {
  return dc.valueAt(d.index, fieldIndex);
};
/**
 * @param {Array<Object>} channels
 * @param {string} dataId
 * @param {Array<Object>} fields
 * @return {Function} getFilterValue
 */


var getFilterValueAccessor = function getFilterValueAccessor(channels, dataId, fields) {
  return function (dc) {
    return function () {
      var getIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultGetIndex;
      var getData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultGetData;
      return function (d) {
        return (// for empty channel, value is 0 and min max would be [0, 0]
          channels.map(function (filter) {
            if (!filter) {
              return 0;
            }

            var fieldIndex = getDatasetFieldIndexForFilter(dataId, filter);
            var field = fields[fieldIndex]; // const value =
            //   filter.type === FILTER_TYPES.timeRange
            //     ? field.filterProps && Array.isArray(field.filterProps.mappedValue)
            //       ? field.filterProps.mappedValue[getIndex(d)]
            //       : moment.utc(getData(dc, d, fieldIndex)).valueOf()
            //     : getData(dc, d, fieldIndex);
            // return notNullorUndefined(value) ? value - filter.domain[0] : Number.MIN_SAFE_INTEGER;

            var value = filter.type === _defaultSettings.FILTER_TYPES.timeRange ? field.filterProps && Array.isArray(field.filterProps.mappedValue) ? Array.isArray(getIndex(d)) ? getIndex(d).map(function (index) {
              return field.filterProps.mappedValue[index];
            }) : field.filterProps.mappedValue[getIndex(d)] : Array.isArray(getData(dc, d, fieldIndex)) ? getData(dc, d, fieldIndex).map(function (data) {
              return _moment["default"].utc(data).valueOf();
            }) : _moment["default"].utc(getData(dc, d, fieldIndex)).valueOf() : getData(dc, d, fieldIndex);
            return (0, _dataUtils.notNullorUndefined)(value) ? Array.isArray(value) ? value.map(function (v) {
              return v - filter.domain[0];
            }) : value - filter.domain[0] : Number.MIN_SAFE_INTEGER;
          })
        );
      };
    };
  };
};
/**
 * Get filter properties for gpu filtering
 * @type {typeof import('./gpu-filter-utils').getGpuFilterProps}
 */


function getGpuFilterProps(filters, dataId, fields) {
  var filterRange = getEmptyFilterRange();
  var triggers = {}; // array of filter for each channel, undefined, if no filter is assigned to that channel

  var channels = [];

  var _loop = function _loop(i) {
    var filter = filters.find(function (f) {
      return f.gpu && f.dataId.includes(dataId) && f.gpuChannel && f.gpuChannel[f.dataId.indexOf(dataId)] === i;
    }); // @ts-ignore

    filterRange[i][0] = filter ? filter.value[0] - filter.domain[0] : 0; // @ts-ignore

    filterRange[i][1] = filter ? filter.value[1] - filter.domain[0] : 0;
    triggers["gpuFilter_".concat(i)] = filter ? filter.name[filter.dataId.indexOf(dataId)] : null;
    channels.push(filter);
  };

  for (var i = 0; i < _defaultSettings.MAX_GPU_FILTERS; i++) {
    _loop(i);
  }

  var filterValueAccessor = getFilterValueAccessor(channels, dataId, fields);
  return {
    filterRange: filterRange,
    filterValueUpdateTriggers: triggers,
    filterValueAccessor: filterValueAccessor
  };
}
/**
 * Return dataset field index from filter.fieldIdx
 * The index matches the same dataset index for filter.dataId
 * @type {typeof import('./gpu-filter-utils').getDatasetFieldIndexForFilter}
 */


function getDatasetFieldIndexForFilter(dataId, filter) {
  var datasetIndex = (0, _utils.toArray)(filter.dataId).indexOf(dataId);

  if (datasetIndex < 0) {
    return -1;
  }

  var fieldIndex = filter.fieldIdx[datasetIndex];
  return (0, _dataUtils.notNullorUndefined)(fieldIndex) ? fieldIndex : -1;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9ncHUtZmlsdGVyLXV0aWxzLmpzIl0sIm5hbWVzIjpbInNldEZpbHRlckdwdU1vZGUiLCJmaWx0ZXIiLCJmaWx0ZXJzIiwiZGF0YUlkIiwiZm9yRWFjaCIsImRhdGFzZXRJZHgiLCJncHVGaWx0ZXJzIiwiZiIsImluY2x1ZGVzIiwiZ3B1IiwibGVuZ3RoIiwiTUFYX0dQVV9GSUxURVJTIiwiYXNzaWduR3B1Q2hhbm5lbHMiLCJhbGxGaWx0ZXJzIiwicmVkdWNlIiwiYWNjdSIsImluZGV4IiwiYXNzaWduR3B1Q2hhbm5lbCIsImdwdUNoYW5uZWwiLCJmaW5kR3B1Q2hhbm5lbCIsImNoYW5uZWwiLCJkYXRhSWR4IiwiaW5kZXhPZiIsImlkIiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJmaW5kIiwiaSIsImV2ZXJ5IiwicmVzZXRGaWx0ZXJHcHVNb2RlIiwiZ3B1UGVyRGF0YXNldCIsIm1hcCIsImNvdW50IiwiZ2V0RW1wdHlGaWx0ZXJSYW5nZSIsIkFycmF5IiwiZmlsbCIsImQiLCJkZWZhdWx0R2V0SW5kZXgiLCJkZWZhdWx0R2V0RGF0YSIsImRjIiwiZmllbGRJbmRleCIsInZhbHVlQXQiLCJnZXRGaWx0ZXJWYWx1ZUFjY2Vzc29yIiwiY2hhbm5lbHMiLCJmaWVsZHMiLCJnZXRJbmRleCIsImdldERhdGEiLCJnZXREYXRhc2V0RmllbGRJbmRleEZvckZpbHRlciIsImZpZWxkIiwidmFsdWUiLCJ0eXBlIiwiRklMVEVSX1RZUEVTIiwidGltZVJhbmdlIiwiZmlsdGVyUHJvcHMiLCJpc0FycmF5IiwibWFwcGVkVmFsdWUiLCJkYXRhIiwibW9tZW50IiwidXRjIiwidmFsdWVPZiIsInYiLCJkb21haW4iLCJNSU5fU0FGRV9JTlRFR0VSIiwiZ2V0R3B1RmlsdGVyUHJvcHMiLCJmaWx0ZXJSYW5nZSIsInRyaWdnZXJzIiwibmFtZSIsInB1c2giLCJmaWx0ZXJWYWx1ZUFjY2Vzc29yIiwiZmlsdGVyVmFsdWVVcGRhdGVUcmlnZ2VycyIsImRh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O0FBQ3BCLFdBQU8sQ0FBQyxDQUFSO0FBQ0Q7O0FBRUQsTUFBTTlCLFVBQVUsR0FBR3ZDLE1BQU0sQ0FBQ3NFLFFBQVAsQ0FBZ0JELFlBQWhCLENBQW5CO0FBRUEsU0FBTyxtQ0FBbUI5QixVQUFuQixJQUFpQ0EsVUFBakMsR0FBOEMsQ0FBQyxDQUF0RDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIxIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtzZXQsIHRvQXJyYXl9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtNQVhfR1BVX0ZJTFRFUlMsIEZJTFRFUl9UWVBFU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IHtub3ROdWxsb3JVbmRlZmluZWR9IGZyb20gJy4vZGF0YS11dGlscyc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbi8qKlxuICogU2V0IGdwdSBtb2RlIGJhc2VkIG9uIGN1cnJlbnQgbnVtYmVyIG9mIGdwdSBmaWx0ZXJzIGV4aXN0c1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZ3B1LWZpbHRlci11dGlscycpLnNldEZpbHRlckdwdU1vZGV9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRGaWx0ZXJHcHVNb2RlKGZpbHRlciwgZmlsdGVycykge1xuICAvLyBmaWx0ZXIgY2FuIGJlIGFwcGxpZWQgdG8gbXVsdGlwbGUgZGF0YXNldHMsIGhlbmNlIGdwdSBmaWx0ZXIgbW9kZSBzaG91bGQgYWxzbyBiZVxuICAvLyBhbiBhcnJheSwgaG93ZXZlciwgdG8ga2VlcCB1cyBzYW5lLCBmb3Igbm93LCB3ZSBvbmx5IGNoZWNrIGlmIHRoZXJlIGlzIGF2YWlsYWJsZSBjaGFubmVsIGZvciBldmVyeSBkYXRhSWQsXG4gIC8vIGlmIGFsbCBvZiB0aGVtIGhhcywgd2Ugc2V0IGdwdSBtb2RlIHRvIHRydWVcbiAgLy8gVE9ETzogcmVmYWN0b3IgZmlsdGVyIHNvIHdlIGRvbid0IGtlZXAgYW4gYXJyYXkgb2YgZXZlcnl0aGluZ1xuXG4gIGZpbHRlci5kYXRhSWQuZm9yRWFjaCgoZGF0YUlkLCBkYXRhc2V0SWR4KSA9PiB7XG4gICAgY29uc3QgZ3B1RmlsdGVycyA9IGZpbHRlcnMuZmlsdGVyKGYgPT4gZi5kYXRhSWQuaW5jbHVkZXMoZGF0YUlkKSAmJiBmLmdwdSk7XG5cbiAgICBpZiAoZmlsdGVyLmdwdSAmJiBncHVGaWx0ZXJzLmxlbmd0aCA9PT0gTUFYX0dQVV9GSUxURVJTKSB7XG4gICAgICByZXR1cm4gc2V0KFsnZ3B1J10sIGZhbHNlLCBmaWx0ZXIpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGZpbHRlcjtcbn1cblxuLyoqXG4gKiBTY2FuIHRob3VnaCBhbGwgZmlsdGVycyBhbmQgYXNzaWduIGdwdSBjaGFuZWwgdG8gZ3B1IGZpbHRlclxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZ3B1LWZpbHRlci11dGlscycpLmFzc2lnbkdwdUNoYW5uZWxzfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzaWduR3B1Q2hhbm5lbHMoYWxsRmlsdGVycykge1xuICByZXR1cm4gYWxsRmlsdGVycy5yZWR1Y2UoKGFjY3UsIGYsIGluZGV4KSA9PiB7XG4gICAgbGV0IGZpbHRlcnMgPSBhY2N1O1xuXG4gICAgLy8gaWYgZ3B1IGlzIHRydWUgYXNzaWduIGFuZCB2YWxpZGF0ZSBncHUgQ2hhbm5lbFxuICAgIGlmIChmLmdwdSkge1xuICAgICAgZiA9IGFzc2lnbkdwdUNoYW5uZWwoZiwgYWNjdSk7XG4gICAgICBmaWx0ZXJzID0gc2V0KFtpbmRleF0sIGYsIGFjY3UpO1xuICAgIH1cblxuICAgIHJldHVybiBmaWx0ZXJzO1xuICB9LCBhbGxGaWx0ZXJzKTtcbn1cbi8qKlxuICogQXNzaWduIGEgbmV3IGdwdSBmaWx0ZXIgYSBjaGFubmVsIGJhc2VkIG9uIGZpcnN0IGF2YWlsYWJpbGl0eVxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZ3B1LWZpbHRlci11dGlscycpLmFzc2lnbkdwdUNoYW5uZWx9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ25HcHVDaGFubmVsKGZpbHRlciwgZmlsdGVycykge1xuICAvLyBmaW5kIGZpcnN0IGF2YWlsYWJsZSBjaGFubmVsXG4gIGlmICghZmlsdGVyLmdwdSkge1xuICAgIHJldHVybiBmaWx0ZXI7XG4gIH1cblxuICBjb25zdCBncHVDaGFubmVsID0gZmlsdGVyLmdwdUNoYW5uZWwgfHwgW107XG5cbiAgZmlsdGVyLmRhdGFJZC5mb3JFYWNoKChkYXRhSWQsIGRhdGFzZXRJZHgpID0+IHtcbiAgICBjb25zdCBmaW5kR3B1Q2hhbm5lbCA9IGNoYW5uZWwgPT4gZiA9PiB7XG4gICAgICBjb25zdCBkYXRhSWR4ID0gdG9BcnJheShmLmRhdGFJZCkuaW5kZXhPZihkYXRhSWQpO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgZi5pZCAhPT0gZmlsdGVyLmlkICYmIGRhdGFJZHggPiAtMSAmJiBmLmdwdSAmJiB0b0FycmF5KGYuZ3B1Q2hhbm5lbClbZGF0YUlkeF0gPT09IGNoYW5uZWxcbiAgICAgICk7XG4gICAgfTtcblxuICAgIGlmIChcbiAgICAgIE51bWJlci5pc0Zpbml0ZShncHVDaGFubmVsW2RhdGFzZXRJZHhdKSAmJlxuICAgICAgIWZpbHRlcnMuZmluZChmaW5kR3B1Q2hhbm5lbChncHVDaGFubmVsW2RhdGFzZXRJZHhdKSlcbiAgICApIHtcbiAgICAgIC8vIGlmIHZhbHVlIGlzIGFscmVhZHkgYXNzaWduZWQgYW5kIHZhbGlkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGkgPSAwO1xuXG4gICAgd2hpbGUgKGkgPCBNQVhfR1BVX0ZJTFRFUlMpIHtcbiAgICAgIGlmICghZmlsdGVycy5maW5kKGZpbmRHcHVDaGFubmVsKGkpKSkge1xuICAgICAgICBncHVDaGFubmVsW2RhdGFzZXRJZHhdID0gaTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaSsrO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gaWYgY2Fubm90IGZpbmQgY2hhbm5lbCBmb3IgYWxsIGRhdGFpZCwgc2V0IGdwdSBiYWNrIHRvIGZhbHNlXG4gIC8vIFRPRE86IHJlZmFjdG9yIGZpbHRlciB0byBoYW5kbGUgc2FtZSBmaWx0ZXIgZGlmZmVyZW50IGdwdSBtb2RlXG4gIGlmICghZ3B1Q2hhbm5lbC5sZW5ndGggfHwgIWdwdUNoYW5uZWwuZXZlcnkoTnVtYmVyLmlzRmluaXRlKSkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5maWx0ZXIsXG4gICAgICBncHU6IGZhbHNlXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLi4uZmlsdGVyLFxuICAgIGdwdUNoYW5uZWxcbiAgfTtcbn1cbi8qKlxuICogRWRpdCBmaWx0ZXIuZ3B1IHRvIGVuc3VyZSB0aGF0IG9ubHlcbiAqIFggbnVtYmVyIG9mIGdwdSBmaWxlcnMgY2FuIGNvZXhpc3QuXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9ncHUtZmlsdGVyLXV0aWxzJykucmVzZXRGaWx0ZXJHcHVNb2RlfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRGaWx0ZXJHcHVNb2RlKGZpbHRlcnMpIHtcbiAgY29uc3QgZ3B1UGVyRGF0YXNldCA9IHt9O1xuXG4gIHJldHVybiBmaWx0ZXJzLm1hcCgoZiwgaSkgPT4ge1xuICAgIGlmIChmLmdwdSkge1xuICAgICAgbGV0IGdwdSA9IHRydWU7XG4gICAgICB0b0FycmF5KGYuZGF0YUlkKS5mb3JFYWNoKGRhdGFJZCA9PiB7XG4gICAgICAgIGNvbnN0IGNvdW50ID0gZ3B1UGVyRGF0YXNldFtkYXRhSWRdO1xuXG4gICAgICAgIGlmIChjb3VudCA9PT0gTUFYX0dQVV9GSUxURVJTKSB7XG4gICAgICAgICAgZ3B1ID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ3B1UGVyRGF0YXNldFtkYXRhSWRdID0gY291bnQgPyBjb3VudCArIDEgOiAxO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKCFncHUpIHtcbiAgICAgICAgcmV0dXJuIHNldChbJ2dwdSddLCBmYWxzZSwgZik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGY7XG4gIH0pO1xufVxuXG4vKipcbiAqIEluaXRpYWwgZmlsdGVyIHVuaWZvcm1cbiAqIEByZXR1cm5zIHtBcnJheTxBcnJheTxOdW1iZXI+Pn1cbiAqL1xuZnVuY3Rpb24gZ2V0RW1wdHlGaWx0ZXJSYW5nZSgpIHtcbiAgcmV0dXJuIG5ldyBBcnJheShNQVhfR1BVX0ZJTFRFUlMpLmZpbGwoMCkubWFwKGQgPT4gWzAsIDBdKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGluZGV4IG9mIHRoZSBkYXRhIGVsZW1lbnQuXG4gKiBAcGFyYW0ge2FueX0gZCBEYXRhIGVsZW1lbnQgd2l0aCByb3cgaW5kZXggaW5mby5cbiAqIEByZXR1cm5zIG51bWJlclxuICovXG5jb25zdCBkZWZhdWx0R2V0SW5kZXggPSBkID0+IGQuaW5kZXg7XG5cbi8qKlxuICogUmV0dXJucyB2YWx1ZSBhdCB0aGUgc3BlY2lmaWVkIHJvdyBmcm9tIHRoZSBkYXRhIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7aW1wb3J0KCcuL3RhYmxlLXV0aWxzL2RhdGEtY29udGFpbmVyLWludGVyZmFjZScpLkRhdGFDb250YWluZXJJbnRlcmZhY2V9IGRjIERhdGEgY29udGFpbmVyLlxuICogQHBhcmFtIHthbnl9IGQgRGF0YSBlbGVtZW50IHdpdGggcm93IGluZGV4IGluZm8uXG4gKiBAcGFyYW0ge251bWJlcn0gZmllbGRJbmRleCBDb2x1bW4gaW5kZXggaW4gdGhlIGRhdGEgY29udGFpbmVyLlxuICogQHJldHVybnNcbiAqL1xuY29uc3QgZGVmYXVsdEdldERhdGEgPSAoZGMsIGQsIGZpZWxkSW5kZXgpID0+IHtcbiAgcmV0dXJuIGRjLnZhbHVlQXQoZC5pbmRleCwgZmllbGRJbmRleCk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gY2hhbm5lbHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhSWRcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gZmllbGRzXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gZ2V0RmlsdGVyVmFsdWVcbiAqL1xuY29uc3QgZ2V0RmlsdGVyVmFsdWVBY2Nlc3NvciA9IChjaGFubmVscywgZGF0YUlkLCBmaWVsZHMpID0+IGRjID0+IChcbiAgZ2V0SW5kZXggPSBkZWZhdWx0R2V0SW5kZXgsXG4gIGdldERhdGEgPSBkZWZhdWx0R2V0RGF0YVxuKSA9PiBkID0+XG4gIC8vIGZvciBlbXB0eSBjaGFubmVsLCB2YWx1ZSBpcyAwIGFuZCBtaW4gbWF4IHdvdWxkIGJlIFswLCAwXVxuICBjaGFubmVscy5tYXAoZmlsdGVyID0+IHtcbiAgICBpZiAoIWZpbHRlcikge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGNvbnN0IGZpZWxkSW5kZXggPSBnZXREYXRhc2V0RmllbGRJbmRleEZvckZpbHRlcihkYXRhSWQsIGZpbHRlcik7XG4gICAgY29uc3QgZmllbGQgPSBmaWVsZHNbZmllbGRJbmRleF07XG5cbiAgICAvLyBjb25zdCB2YWx1ZSA9XG4gICAgLy8gICBmaWx0ZXIudHlwZSA9PT0gRklMVEVSX1RZUEVTLnRpbWVSYW5nZVxuICAgIC8vICAgICA/IGZpZWxkLmZpbHRlclByb3BzICYmIEFycmF5LmlzQXJyYXkoZmllbGQuZmlsdGVyUHJvcHMubWFwcGVkVmFsdWUpXG4gICAgLy8gICAgICAgPyBmaWVsZC5maWx0ZXJQcm9wcy5tYXBwZWRWYWx1ZVtnZXRJbmRleChkKV1cbiAgICAvLyAgICAgICA6IG1vbWVudC51dGMoZ2V0RGF0YShkYywgZCwgZmllbGRJbmRleCkpLnZhbHVlT2YoKVxuICAgIC8vICAgICA6IGdldERhdGEoZGMsIGQsIGZpZWxkSW5kZXgpO1xuXG4gICAgLy8gcmV0dXJuIG5vdE51bGxvclVuZGVmaW5lZCh2YWx1ZSkgPyB2YWx1ZSAtIGZpbHRlci5kb21haW5bMF0gOiBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUjtcbiAgICBjb25zdCB2YWx1ZSA9XG4gICAgICBmaWx0ZXIudHlwZSA9PT0gRklMVEVSX1RZUEVTLnRpbWVSYW5nZVxuICAgICAgICA/IGZpZWxkLmZpbHRlclByb3BzICYmIEFycmF5LmlzQXJyYXkoZmllbGQuZmlsdGVyUHJvcHMubWFwcGVkVmFsdWUpXG4gICAgICAgICAgPyBBcnJheS5pc0FycmF5KGdldEluZGV4KGQpKVxuICAgICAgICAgICAgPyBnZXRJbmRleChkKS5tYXAoaW5kZXggPT4gZmllbGQuZmlsdGVyUHJvcHMubWFwcGVkVmFsdWVbaW5kZXhdKVxuICAgICAgICAgICAgOiBmaWVsZC5maWx0ZXJQcm9wcy5tYXBwZWRWYWx1ZVtnZXRJbmRleChkKV1cbiAgICAgICAgICA6IEFycmF5LmlzQXJyYXkoZ2V0RGF0YShkYywgZCwgZmllbGRJbmRleCkpXG4gICAgICAgICAgICA/IGdldERhdGEoZGMsIGQsIGZpZWxkSW5kZXgpLm1hcChkYXRhID0+IG1vbWVudC51dGMoZGF0YSkudmFsdWVPZigpKVxuICAgICAgICAgICAgOiBtb21lbnQudXRjKGdldERhdGEoZGMsIGQsIGZpZWxkSW5kZXgpKS52YWx1ZU9mKClcbiAgICAgICAgOiBnZXREYXRhKGRjLCBkLCBmaWVsZEluZGV4KTtcblxuICAgIHJldHVybiBub3ROdWxsb3JVbmRlZmluZWQodmFsdWUpXG4gICAgICA/IEFycmF5LmlzQXJyYXkodmFsdWUpXG4gICAgICAgID8gdmFsdWUubWFwKHYgPT4gdiAtIGZpbHRlci5kb21haW5bMF0pXG4gICAgICAgIDogdmFsdWUgLSBmaWx0ZXIuZG9tYWluWzBdXG4gICAgICA6IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSO1xuICB9KTtcblxuLyoqXG4gKiBHZXQgZmlsdGVyIHByb3BlcnRpZXMgZm9yIGdwdSBmaWx0ZXJpbmdcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2dwdS1maWx0ZXItdXRpbHMnKS5nZXRHcHVGaWx0ZXJQcm9wc31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEdwdUZpbHRlclByb3BzKGZpbHRlcnMsIGRhdGFJZCwgZmllbGRzKSB7XG4gIGNvbnN0IGZpbHRlclJhbmdlID0gZ2V0RW1wdHlGaWx0ZXJSYW5nZSgpO1xuICBjb25zdCB0cmlnZ2VycyA9IHt9O1xuXG4gIC8vIGFycmF5IG9mIGZpbHRlciBmb3IgZWFjaCBjaGFubmVsLCB1bmRlZmluZWQsIGlmIG5vIGZpbHRlciBpcyBhc3NpZ25lZCB0byB0aGF0IGNoYW5uZWxcbiAgY29uc3QgY2hhbm5lbHMgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IE1BWF9HUFVfRklMVEVSUzsgaSsrKSB7XG4gICAgY29uc3QgZmlsdGVyID0gZmlsdGVycy5maW5kKFxuICAgICAgZiA9PlxuICAgICAgICBmLmdwdSAmJlxuICAgICAgICBmLmRhdGFJZC5pbmNsdWRlcyhkYXRhSWQpICYmXG4gICAgICAgIGYuZ3B1Q2hhbm5lbCAmJlxuICAgICAgICBmLmdwdUNoYW5uZWxbZi5kYXRhSWQuaW5kZXhPZihkYXRhSWQpXSA9PT0gaVxuICAgICk7XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgZmlsdGVyUmFuZ2VbaV1bMF0gPSBmaWx0ZXIgPyBmaWx0ZXIudmFsdWVbMF0gLSBmaWx0ZXIuZG9tYWluWzBdIDogMDtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgZmlsdGVyUmFuZ2VbaV1bMV0gPSBmaWx0ZXIgPyBmaWx0ZXIudmFsdWVbMV0gLSBmaWx0ZXIuZG9tYWluWzBdIDogMDtcblxuICAgIHRyaWdnZXJzW2BncHVGaWx0ZXJfJHtpfWBdID0gZmlsdGVyID8gZmlsdGVyLm5hbWVbZmlsdGVyLmRhdGFJZC5pbmRleE9mKGRhdGFJZCldIDogbnVsbDtcbiAgICBjaGFubmVscy5wdXNoKGZpbHRlcik7XG4gIH1cblxuICBjb25zdCBmaWx0ZXJWYWx1ZUFjY2Vzc29yID0gZ2V0RmlsdGVyVmFsdWVBY2Nlc3NvcihjaGFubmVscywgZGF0YUlkLCBmaWVsZHMpO1xuXG4gIHJldHVybiB7XG4gICAgZmlsdGVyUmFuZ2UsXG4gICAgZmlsdGVyVmFsdWVVcGRhdGVUcmlnZ2VyczogdHJpZ2dlcnMsXG4gICAgZmlsdGVyVmFsdWVBY2Nlc3NvclxuICB9O1xufVxuXG4vKipcbiAqIFJldHVybiBkYXRhc2V0IGZpZWxkIGluZGV4IGZyb20gZmlsdGVyLmZpZWxkSWR4XG4gKiBUaGUgaW5kZXggbWF0Y2hlcyB0aGUgc2FtZSBkYXRhc2V0IGluZGV4IGZvciBmaWx0ZXIuZGF0YUlkXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9ncHUtZmlsdGVyLXV0aWxzJykuZ2V0RGF0YXNldEZpZWxkSW5kZXhGb3JGaWx0ZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXRhc2V0RmllbGRJbmRleEZvckZpbHRlcihkYXRhSWQsIGZpbHRlcikge1xuICBjb25zdCBkYXRhc2V0SW5kZXggPSB0b0FycmF5KGZpbHRlci5kYXRhSWQpLmluZGV4T2YoZGF0YUlkKTtcbiAgaWYgKGRhdGFzZXRJbmRleCA8IDApIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICBjb25zdCBmaWVsZEluZGV4ID0gZmlsdGVyLmZpZWxkSWR4W2RhdGFzZXRJbmRleF07XG5cbiAgcmV0dXJuIG5vdE51bGxvclVuZGVmaW5lZChmaWVsZEluZGV4KSA/IGZpZWxkSW5kZXggOiAtMTtcbn1cbiJdfQ==