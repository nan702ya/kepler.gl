"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeSuffixAndDelimiters = removeSuffixAndDelimiters;
exports.findPointFieldPairs = findPointFieldPairs;
exports.sortDatasetByColumn = sortDatasetByColumn;
exports.copyTable = copyTable;
exports.copyTableAndUpdate = copyTableAndUpdate;
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _console = require("global/console");

var _defaultSettings = require("../../constants/default-settings");

var _d3Array = require("d3-array");

var _utils = require("../utils");

var _gpuFilterUtils = require("../gpu-filter-utils");

var _filterUtils = require("../filter-utils");

var _dataUtils = require("../data-utils");

var _dataScaleUtils = require("../data-scale-utils");

var _dataContainerUtils = require("./data-container-utils");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Unique identifier of each field
var FID_KEY = 'name';
/** @typedef {import('./kepler-table').KeplerTable} KeplerTableClass} */

/**
 * @type {KeplerTableClass}
 */

var KeplerTable = /*#__PURE__*/function () {
  function KeplerTable(_ref) {
    var _ref$info = _ref.info,
        info = _ref$info === void 0 ? {} : _ref$info,
        data = _ref.data,
        color = _ref.color,
        metadata = _ref.metadata,
        supportedFilterTypes = _ref.supportedFilterTypes;
    (0, _classCallCheck2["default"])(this, KeplerTable);
    // TODO - what to do if validation fails? Can kepler handle exceptions?
    // const validatedData = validateInputData(data);
    // if (!validatedData) {
    //   return this;
    // }
    var dataContainer = (0, _dataContainerUtils.createDataContainer)(data.rows, {
      fields: data.fields
    });

    var datasetInfo = _objectSpread({
      id: (0, _utils.generateHashId)(4),
      label: 'new dataset'
    }, info || {});

    var dataId = datasetInfo.id;
    var fields = data.fields.map(function (f, i) {
      return _objectSpread(_objectSpread({}, f), {}, {
        fieldIdx: i,
        id: f.name,
        displayName: f.displayName || f.name,
        valueAccessor: _dataUtils.maybeToDate.bind(null, // is time
        f.type === _defaultSettings.ALL_FIELD_TYPES.timestamp, i, f.format, dataContainer)
      });
    });
    var allIndexes = dataContainer.getPlainIndex();
    this.id = datasetInfo.id;
    this.label = datasetInfo.label;
    this.color = color;
    this.metadata = _objectSpread(_objectSpread({}, metadata), {}, {
      id: datasetInfo.id,
      label: datasetInfo.label
    });
    this.dataContainer = dataContainer;
    this.allIndexes = allIndexes;
    this.filteredIndex = allIndexes;
    this.filteredIndexForDomain = allIndexes;
    this.fieldPairs = findPointFieldPairs(fields);
    this.fields = fields;
    this.gpuFilter = (0, _gpuFilterUtils.getGpuFilterProps)([], dataId, fields);

    if (supportedFilterTypes) {
      this.supportedFilterTypes = supportedFilterTypes;
    }
  }
  /**
   * Get field
   * @param columnName
   */


  (0, _createClass2["default"])(KeplerTable, [{
    key: "getColumnField",
    value: function getColumnField(columnName) {
      var field = this.fields.find(function (fd) {
        return fd[FID_KEY] === columnName;
      });

      this._assetField(columnName, field);

      return field;
    }
    /**
     * Get fieldIdx
     * @param columnName
     */

  }, {
    key: "getColumnFieldIdx",
    value: function getColumnFieldIdx(columnName) {
      var fieldIdx = this.fields.findIndex(function (fd) {
        return fd[FID_KEY] === columnName;
      });

      this._assetField(columnName, Boolean(fieldIdx > -1));

      return fieldIdx;
    }
    /**
     * Get the value of a cell
     */

  }, {
    key: "getValue",
    value: function getValue(columnName, rowIdx) {
      var field = this.getColumnField(columnName);
      return field ? field.valueAccessor({
        index: rowIdx
      }) : null;
    }
    /**
     * Updates existing field with a new object
     * @param fieldIdx
     * @param newField
     */

  }, {
    key: "updateColumnField",
    value: function updateColumnField(fieldIdx, newField) {
      this.fields = Object.assign((0, _toConsumableArray2["default"])(this.fields), (0, _defineProperty2["default"])({}, fieldIdx, newField));
    }
    /**
     * Save filterProps to field and retrieve it
     * @param {string} columnName
     */

  }, {
    key: "getColumnFilterProps",
    value: function getColumnFilterProps(columnName) {
      var fieldIdx = this.getColumnFieldIdx(columnName);

      if (fieldIdx < 0) {
        return null;
      }

      var field = this.fields[fieldIdx];

      if (field.hasOwnProperty('filterProps')) {
        return field.filterProps;
      }

      var fieldDomain = this.getColumnFilterDomain(field);

      if (!fieldDomain) {
        return null;
      }

      var filterProps = (0, _filterUtils.getFilterProps)(field, fieldDomain);

      var newField = _objectSpread(_objectSpread({}, field), {}, {
        filterProps: filterProps
      });

      this.updateColumnField(fieldIdx, newField);
      return filterProps;
    }
    /**
     * Apply filters to dataset, return the filtered dataset with updated `gpuFilter`, `filterRecord`, `filteredIndex`, `filteredIndexForDomain`
     * @param filters
     * @param layers
     * @param opt
     */

  }, {
    key: "filterTable",
    value: function filterTable(filters, layers, opt) {
      var _this = this;

      var dataContainer = this.dataContainer,
          dataId = this.id,
          oldFilterRecord = this.filterRecord,
          fields = this.fields; // if there is no filters

      var filterRecord = (0, _filterUtils.getFilterRecord)(dataId, filters, opt || {});
      this.filterRecord = filterRecord;
      this.gpuFilter = (0, _gpuFilterUtils.getGpuFilterProps)(filters, dataId, fields); // const newDataset = set(['filterRecord'], filterRecord, dataset);

      if (!filters.length) {
        this.filteredIndex = this.allIndexes;
        this.filteredIndexForDomain = this.allIndexes;
        return this;
      }

      this.changedFilters = (0, _filterUtils.diffFilters)(filterRecord, oldFilterRecord); // generate 2 sets of filter result
      // filteredIndex used to calculate layer data
      // filteredIndexForDomain used to calculate layer Domain

      var shouldCalDomain = Boolean(this.changedFilters.dynamicDomain);
      var shouldCalIndex = Boolean(this.changedFilters.cpu);
      var filterResult = {};

      if (shouldCalDomain || shouldCalIndex) {
        var dynamicDomainFilters = shouldCalDomain ? filterRecord.dynamicDomain : null;
        var cpuFilters = shouldCalIndex ? filterRecord.cpu : null;
        var filterFuncs = filters.reduce(function (acc, filter) {
          var fieldIndex = (0, _gpuFilterUtils.getDatasetFieldIndexForFilter)(_this.id, filter);
          var field = fieldIndex !== -1 ? fields[fieldIndex] : null;
          return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, filter.id, (0, _filterUtils.getFilterFunction)(field, _this.id, filter, layers, dataContainer)));
        }, {});
        filterResult = (0, _filterUtils.filterDataByFilterTypes)({
          dynamicDomainFilters: dynamicDomainFilters,
          cpuFilters: cpuFilters,
          filterFuncs: filterFuncs
        }, dataContainer);
      } // this.filteredIndex = filterResult.filteredIndex || this.filteredIndex;


      this.filteredIndex = filterResult.filteredIndex || filterResult.filteredIndexForDomain || this.filteredIndex;
      this.filteredIndexForDomain = filterResult.filteredIndexForDomain || this.filteredIndexForDomain;
      return this;
    }
    /**
     * Apply filters to a dataset all on CPU, assign to `filteredIdxCPU`, `filterRecordCPU`
     * @param filters
     * @param layers
     */

  }, {
    key: "filterTableCPU",
    value: function filterTableCPU(filters, layers) {
      var opt = {
        cpuOnly: true,
        ignoreDomain: true
      }; // no filter

      if (!filters.length) {
        this.filteredIdxCPU = this.allIndexes;
        this.filterRecordCPU = (0, _filterUtils.getFilterRecord)(this.id, filters, opt);
        return this;
      } // no gpu filter


      if (!filters.find(function (f) {
        return f.gpu;
      })) {
        this.filteredIdxCPU = this.filteredIndex;
        this.filterRecordCPU = (0, _filterUtils.getFilterRecord)(this.id, filters, opt);
        return this;
      } // make a copy for cpu filtering


      var copied = copyTable(this);
      copied.filterRecord = this.filterRecordCPU;
      copied.filteredIndex = this.filteredIdxCPU || [];
      var filtered = copied.filterTable(filters, layers, opt);
      this.filteredIdxCPU = filtered.filteredIndex;
      this.filterRecordCPU = filtered.filterRecord;
      return this;
    }
    /**
     * Calculate field domain based on field type and data
     * for Filter
     */

  }, {
    key: "getColumnFilterDomain",
    value: function getColumnFilterDomain(field) {
      var dataContainer = this.dataContainer;
      var valueAccessor = field.valueAccessor;
      var domain;

      switch (field.type) {
        case _defaultSettings.ALL_FIELD_TYPES.real:
        case _defaultSettings.ALL_FIELD_TYPES.integer:
          // calculate domain and step
          return (0, _filterUtils.getNumericFieldDomain)(dataContainer, valueAccessor);

        case _defaultSettings.ALL_FIELD_TYPES["boolean"]:
          return {
            domain: [true, false]
          };

        case _defaultSettings.ALL_FIELD_TYPES.string:
        case _defaultSettings.ALL_FIELD_TYPES.date:
          domain = (0, _dataScaleUtils.getOrdinalDomain)(dataContainer, valueAccessor);
          return {
            domain: domain
          };

        case _defaultSettings.ALL_FIELD_TYPES.timestamp:
          return (0, _filterUtils.getTimestampFieldDomain)(dataContainer, valueAccessor);

        default:
          return {
            domain: (0, _dataScaleUtils.getOrdinalDomain)(dataContainer, valueAccessor)
          };
      }
    }
    /**
     *  Get the domain of this column based on scale type
     */

  }, {
    key: "getColumnLayerDomain",
    value: function getColumnLayerDomain(field, scaleType) {
      var dataContainer = this.dataContainer,
          filteredIndexForDomain = this.filteredIndexForDomain;

      if (!_defaultSettings.SCALE_TYPES[scaleType]) {
        _console.console.error("scale type ".concat(scaleType, " not supported"));

        return null;
      }

      var valueAccessor = field.valueAccessor;

      var indexValueAccessor = function indexValueAccessor(i) {
        return valueAccessor({
          index: i
        });
      };

      var sortFunction = (0, _dataUtils.getSortingFunction)(field.type);

      switch (scaleType) {
        case _defaultSettings.SCALE_TYPES.ordinal:
        case _defaultSettings.SCALE_TYPES.point:
          // do not recalculate ordinal domain based on filtered data
          // don't need to update ordinal domain every time
          return (0, _dataScaleUtils.getOrdinalDomain)(dataContainer, valueAccessor);

        case _defaultSettings.SCALE_TYPES.quantile:
          return (0, _dataScaleUtils.getQuantileDomain)(filteredIndexForDomain, indexValueAccessor, sortFunction);

        case _defaultSettings.SCALE_TYPES.log:
          return (0, _dataScaleUtils.getLogDomain)(filteredIndexForDomain, indexValueAccessor);

        case _defaultSettings.SCALE_TYPES.quantize:
        case _defaultSettings.SCALE_TYPES.linear:
        case _defaultSettings.SCALE_TYPES.sqrt:
        default:
          return (0, _dataScaleUtils.getLinearDomain)(filteredIndexForDomain, indexValueAccessor);
      }
    }
    /**
     * Get a sample of rows to calculate layer boundaries
     */
    // getSampleData(rows)

    /**
     * Parse cell value based on column type and return a string representation
     * Value the field value, type the field type
     */
    // parseFieldValue(value, type)
    // sortDatasetByColumn()

    /**
     * Assert whether field exist
     * @param fieldName
     * @param condition
     */

  }, {
    key: "_assetField",
    value: function _assetField(fieldName, condition) {
      if (!condition) {
        _console.console.error("".concat(fieldName, " doesnt exist in dataset ").concat(this.id));
      }
    }
  }]);
  return KeplerTable;
}(); // HELPER FUNCTIONS (MAINLY EXPORTED FOR TEST...)


function removeSuffixAndDelimiters(layerName, suffix) {
  return layerName.replace(new RegExp(suffix, 'ig'), '').replace(/[_,.]+/g, ' ').trim();
}
/**
 * Find point fields pairs from fields
 *
 * @param fields
 * @returns found point fields
 * @type {typeof import('./kepler-table').findPointFieldPairs}
 */


function findPointFieldPairs(fields) {
  var allNames = fields.map(function (f) {
    return f.name.toLowerCase();
  }); // get list of all fields with matching suffixes

  var acc = [];
  return allNames.reduce(function (carry, fieldName, idx) {
    // This search for pairs will early exit if found.
    var _iterator = _createForOfIteratorHelper(_defaultSettings.TRIP_POINT_FIELDS),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var suffixPair = _step.value;

        // match first suffix```
        if (fieldName.endsWith(suffixPair[0])) {
          var _ret = function () {
            // match second suffix
            var otherPattern = new RegExp("".concat(suffixPair[0], "$"));
            var partner = fieldName.replace(otherPattern, suffixPair[1]);
            var partnerIdx = allNames.findIndex(function (d) {
              return d === partner;
            });

            if (partnerIdx > -1) {
              var defaultName = removeSuffixAndDelimiters(fieldName, suffixPair[0]);
              carry.push({
                defaultName: defaultName,
                pair: {
                  lat: {
                    fieldIdx: idx,
                    value: fields[idx].name
                  },
                  lng: {
                    fieldIdx: partnerIdx,
                    value: fields[partnerIdx].name
                  }
                },
                suffix: suffixPair
              });
              return {
                v: carry
              };
            }
          }();

          if ((0, _typeof2["default"])(_ret) === "object") return _ret.v;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return carry;
  }, acc);
}
/**
 *
 * @param dataset
 * @param column
 * @param mode
 * @type {typeof import('./kepler-table').sortDatasetByColumn}
 */


function sortDatasetByColumn(dataset, column, mode) {
  var allIndexes = dataset.allIndexes,
      fields = dataset.fields,
      dataContainer = dataset.dataContainer;
  var fieldIndex = fields.findIndex(function (f) {
    return f.name === column;
  });

  if (fieldIndex < 0) {
    return dataset;
  }

  var sortBy = _defaultSettings.SORT_ORDER[mode] || _defaultSettings.SORT_ORDER.ASCENDING;

  if (sortBy === _defaultSettings.SORT_ORDER.UNSORT) {
    return _objectSpread(_objectSpread({}, dataset), {}, {
      sortColumn: {},
      sortOrder: null
    });
  }

  var sortFunction = sortBy === _defaultSettings.SORT_ORDER.ASCENDING ? _d3Array.ascending : _d3Array.descending;
  var sortOrder = allIndexes.slice().sort(function (a, b) {
    return sortFunction(dataContainer.valueAt(a, fieldIndex), dataContainer.valueAt(b, fieldIndex));
  });
  return _objectSpread(_objectSpread({}, dataset), {}, {
    sortColumn: (0, _defineProperty2["default"])({}, column, sortBy),
    sortOrder: sortOrder
  });
}

function copyTable(original) {
  return Object.assign(Object.create(Object.getPrototypeOf(original)), original);
}

function copyTableAndUpdate(original) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.entries(options).reduce(function (acc, entry) {
    acc[entry[0]] = entry[1];
    return acc;
  }, copyTable(original));
}

var _default = KeplerTable;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy90YWJsZS11dGlscy9rZXBsZXItdGFibGUuanMiXSwibmFtZXMiOlsiRklEX0tFWSIsIktlcGxlclRhYmxlIiwiaW5mbyIsImRhdGEiLCJjb2xvciIsIm1ldGFkYXRhIiwic3VwcG9ydGVkRmlsdGVyVHlwZXMiLCJkYXRhQ29udGFpbmVyIiwicm93cyIsImZpZWxkcyIsImRhdGFzZXRJbmZvIiwiaWQiLCJsYWJlbCIsImRhdGFJZCIsIm1hcCIsImYiLCJpIiwiZmllbGRJZHgiLCJuYW1lIiwiZGlzcGxheU5hbWUiLCJ2YWx1ZUFjY2Vzc29yIiwibWF5YmVUb0RhdGUiLCJiaW5kIiwidHlwZSIsIkFMTF9GSUVMRF9UWVBFUyIsInRpbWVzdGFtcCIsImZvcm1hdCIsImFsbEluZGV4ZXMiLCJnZXRQbGFpbkluZGV4IiwiZmlsdGVyZWRJbmRleCIsImZpbHRlcmVkSW5kZXhGb3JEb21haW4iLCJmaWVsZFBhaXJzIiwiZmluZFBvaW50RmllbGRQYWlycyIsImdwdUZpbHRlciIsImNvbHVtbk5hbWUiLCJmaWVsZCIsImZpbmQiLCJmZCIsIl9hc3NldEZpZWxkIiwiZmluZEluZGV4IiwiQm9vbGVhbiIsInJvd0lkeCIsImdldENvbHVtbkZpZWxkIiwiaW5kZXgiLCJuZXdGaWVsZCIsIk9iamVjdCIsImFzc2lnbiIsImdldENvbHVtbkZpZWxkSWR4IiwiaGFzT3duUHJvcGVydHkiLCJmaWx0ZXJQcm9wcyIsImZpZWxkRG9tYWluIiwiZ2V0Q29sdW1uRmlsdGVyRG9tYWluIiwidXBkYXRlQ29sdW1uRmllbGQiLCJmaWx0ZXJzIiwibGF5ZXJzIiwib3B0Iiwib2xkRmlsdGVyUmVjb3JkIiwiZmlsdGVyUmVjb3JkIiwibGVuZ3RoIiwiY2hhbmdlZEZpbHRlcnMiLCJzaG91bGRDYWxEb21haW4iLCJkeW5hbWljRG9tYWluIiwic2hvdWxkQ2FsSW5kZXgiLCJjcHUiLCJmaWx0ZXJSZXN1bHQiLCJkeW5hbWljRG9tYWluRmlsdGVycyIsImNwdUZpbHRlcnMiLCJmaWx0ZXJGdW5jcyIsInJlZHVjZSIsImFjYyIsImZpbHRlciIsImZpZWxkSW5kZXgiLCJjcHVPbmx5IiwiaWdub3JlRG9tYWluIiwiZmlsdGVyZWRJZHhDUFUiLCJmaWx0ZXJSZWNvcmRDUFUiLCJncHUiLCJjb3BpZWQiLCJjb3B5VGFibGUiLCJmaWx0ZXJlZCIsImZpbHRlclRhYmxlIiwiZG9tYWluIiwicmVhbCIsImludGVnZXIiLCJzdHJpbmciLCJkYXRlIiwic2NhbGVUeXBlIiwiU0NBTEVfVFlQRVMiLCJDb25zb2xlIiwiZXJyb3IiLCJpbmRleFZhbHVlQWNjZXNzb3IiLCJzb3J0RnVuY3Rpb24iLCJvcmRpbmFsIiwicG9pbnQiLCJxdWFudGlsZSIsImxvZyIsInF1YW50aXplIiwibGluZWFyIiwic3FydCIsImZpZWxkTmFtZSIsImNvbmRpdGlvbiIsInJlbW92ZVN1ZmZpeEFuZERlbGltaXRlcnMiLCJsYXllck5hbWUiLCJzdWZmaXgiLCJyZXBsYWNlIiwiUmVnRXhwIiwidHJpbSIsImFsbE5hbWVzIiwidG9Mb3dlckNhc2UiLCJjYXJyeSIsImlkeCIsIlRSSVBfUE9JTlRfRklFTERTIiwic3VmZml4UGFpciIsImVuZHNXaXRoIiwib3RoZXJQYXR0ZXJuIiwicGFydG5lciIsInBhcnRuZXJJZHgiLCJkIiwiZGVmYXVsdE5hbWUiLCJwdXNoIiwicGFpciIsImxhdCIsInZhbHVlIiwibG5nIiwic29ydERhdGFzZXRCeUNvbHVtbiIsImRhdGFzZXQiLCJjb2x1bW4iLCJtb2RlIiwic29ydEJ5IiwiU09SVF9PUkRFUiIsIkFTQ0VORElORyIsIlVOU09SVCIsInNvcnRDb2x1bW4iLCJzb3J0T3JkZXIiLCJhc2NlbmRpbmciLCJkZXNjZW5kaW5nIiwic2xpY2UiLCJzb3J0IiwiYSIsImIiLCJ2YWx1ZUF0Iiwib3JpZ2luYWwiLCJjcmVhdGUiLCJnZXRQcm90b3R5cGVPZiIsImNvcHlUYWJsZUFuZFVwZGF0ZSIsIm9wdGlvbnMiLCJlbnRyaWVzIiwiZW50cnkiXSwibWFwcGluZ3Mi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TDtBQUVFTyxJQUFBQSxVQUFVLHVDQUNQTixNQURPLEVBQ0VFLE1BREYsQ0FGWjtBQUtFSyxJQUFBQSxTQUFTLEVBQVRBO0FBTEY7QUFPRDs7QUFFTSxTQUFTdkQsU0FBVCxDQUFtQitELFFBQW5CLEVBQTZCO0FBQ2xDLFNBQU9oRyxNQUFNLENBQUNDLE1BQVAsQ0FBY0QsTUFBTSxDQUFDaUcsTUFBUCxDQUFjakcsTUFBTSxDQUFDa0csY0FBUCxDQUFzQkYsUUFBdEIsQ0FBZCxDQUFkLEVBQThEQSxRQUE5RCxDQUFQO0FBQ0Q7O0FBRU0sU0FBU0csa0JBQVQsQ0FBNEJILFFBQTVCLEVBQW9EO0FBQUEsTUFBZEksT0FBYyx1RUFBSixFQUFJO0FBQ3pELFNBQU9wRyxNQUFNLENBQUNxRyxPQUFQLENBQWVELE9BQWYsRUFBd0I3RSxNQUF4QixDQUErQixVQUFDQyxHQUFELEVBQU04RSxLQUFOLEVBQWdCO0FBQ3BEOUUsSUFBQUEsR0FBRyxDQUFDOEUsS0FBSyxDQUFDLENBQUQsQ0FBTixDQUFILEdBQWdCQSxLQUFLLENBQUMsQ0FBRCxDQUFyQjtBQUNBLFdBQU85RSxHQUFQO0FBQ0QsR0FITSxFQUdKUyxTQUFTLENBQUMrRCxRQUFELENBSEwsQ0FBUDtBQUlEOztlQUVjNUksVyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7Y29uc29sZSBhcyBDb25zb2xlfSBmcm9tICdnbG9iYWwvY29uc29sZSc7XG5pbXBvcnQge1RSSVBfUE9JTlRfRklFTERTLCBTT1JUX09SREVSfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge2FzY2VuZGluZywgZGVzY2VuZGluZ30gZnJvbSAnZDMtYXJyYXknO1xuXG4vLyBpbXBvcnQge3ZhbGlkYXRlSW5wdXREYXRhfSBmcm9tICdwcm9jZXNzb3JzL2RhdGEtcHJvY2Vzc29yJztcbmltcG9ydCB7Z2VuZXJhdGVIYXNoSWR9IGZyb20gJ3V0aWxzL3V0aWxzJztcbmltcG9ydCB7Z2V0R3B1RmlsdGVyUHJvcHMsIGdldERhdGFzZXRGaWVsZEluZGV4Rm9yRmlsdGVyfSBmcm9tICd1dGlscy9ncHUtZmlsdGVyLXV0aWxzJztcbmltcG9ydCB7XG4gIGdldEZpbHRlclByb3BzLFxuICBnZXRGaWx0ZXJSZWNvcmQsXG4gIGRpZmZGaWx0ZXJzLFxuICBnZXRGaWx0ZXJGdW5jdGlvbixcbiAgZmlsdGVyRGF0YUJ5RmlsdGVyVHlwZXMsXG4gIGdldE51bWVyaWNGaWVsZERvbWFpbixcbiAgZ2V0VGltZXN0YW1wRmllbGREb21haW5cbn0gZnJvbSAndXRpbHMvZmlsdGVyLXV0aWxzJztcbmltcG9ydCB7bWF5YmVUb0RhdGUsIGdldFNvcnRpbmdGdW5jdGlvbn0gZnJvbSAndXRpbHMvZGF0YS11dGlscyc7XG5pbXBvcnQge1xuICBnZXRRdWFudGlsZURvbWFpbixcbiAgZ2V0T3JkaW5hbERvbWFpbixcbiAgZ2V0TG9nRG9tYWluLFxuICBnZXRMaW5lYXJEb21haW5cbn0gZnJvbSAndXRpbHMvZGF0YS1zY2FsZS11dGlscyc7XG5cbmltcG9ydCB7QUxMX0ZJRUxEX1RZUEVTLCBTQ0FMRV9UWVBFU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG5pbXBvcnQge2NyZWF0ZURhdGFDb250YWluZXJ9IGZyb20gJy4vZGF0YS1jb250YWluZXItdXRpbHMnO1xuXG4vLyBVbmlxdWUgaWRlbnRpZmllciBvZiBlYWNoIGZpZWxkXG5jb25zdCBGSURfS0VZID0gJ25hbWUnO1xuXG4vKiogQHR5cGVkZWYge2ltcG9ydCgnLi9rZXBsZXItdGFibGUnKS5LZXBsZXJUYWJsZX0gS2VwbGVyVGFibGVDbGFzc30gKi9cblxuLyoqXG4gKiBAdHlwZSB7S2VwbGVyVGFibGVDbGFzc31cbiAqL1xuY2xhc3MgS2VwbGVyVGFibGUge1xuICBjb25zdHJ1Y3Rvcih7aW5mbyA9IHt9LCBkYXRhLCBjb2xvciwgbWV0YWRhdGEsIHN1cHBvcnRlZEZpbHRlclR5cGVzfSkge1xuICAgIC8vIFRPRE8gLSB3aGF0IHRvIGRvIGlmIHZhbGlkYXRpb24gZmFpbHM/IENhbiBrZXBsZXIgaGFuZGxlIGV4Y2VwdGlvbnM/XG4gICAgLy8gY29uc3QgdmFsaWRhdGVkRGF0YSA9IHZhbGlkYXRlSW5wdXREYXRhKGRhdGEpO1xuICAgIC8vIGlmICghdmFsaWRhdGVkRGF0YSkge1xuICAgIC8vICAgcmV0dXJuIHRoaXM7XG4gICAgLy8gfVxuXG4gICAgY29uc3QgZGF0YUNvbnRhaW5lciA9IGNyZWF0ZURhdGFDb250YWluZXIoZGF0YS5yb3dzLCB7ZmllbGRzOiBkYXRhLmZpZWxkc30pO1xuXG4gICAgY29uc3QgZGF0YXNldEluZm8gPSB7XG4gICAgICBpZDogZ2VuZXJhdGVIYXNoSWQoNCksXG4gICAgICBsYWJlbDogJ25ldyBkYXRhc2V0JyxcbiAgICAgIC4uLihpbmZvIHx8IHt9KVxuICAgIH07XG4gICAgY29uc3QgZGF0YUlkID0gZGF0YXNldEluZm8uaWQ7XG5cbiAgICBjb25zdCBmaWVsZHMgPSBkYXRhLmZpZWxkcy5tYXAoKGYsIGkpID0+ICh7XG4gICAgICAuLi5mLFxuICAgICAgZmllbGRJZHg6IGksXG4gICAgICBpZDogZi5uYW1lLFxuICAgICAgZGlzcGxheU5hbWU6IGYuZGlzcGxheU5hbWUgfHwgZi5uYW1lLFxuICAgICAgdmFsdWVBY2Nlc3NvcjogbWF5YmVUb0RhdGUuYmluZChcbiAgICAgICAgbnVsbCxcbiAgICAgICAgLy8gaXMgdGltZVxuICAgICAgICBmLnR5cGUgPT09IEFMTF9GSUVMRF9UWVBFUy50aW1lc3RhbXAsXG4gICAgICAgIGksXG4gICAgICAgIGYuZm9ybWF0LFxuICAgICAgICBkYXRhQ29udGFpbmVyXG4gICAgICApXG4gICAgfSkpO1xuXG4gICAgY29uc3QgYWxsSW5kZXhlcyA9IGRhdGFDb250YWluZXIuZ2V0UGxhaW5JbmRleCgpO1xuXG4gICAgdGhpcy5pZCA9IGRhdGFzZXRJbmZvLmlkO1xuICAgIHRoaXMubGFiZWwgPSBkYXRhc2V0SW5mby5sYWJlbDtcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgdGhpcy5tZXRhZGF0YSA9IHtcbiAgICAgIC4uLm1ldGFkYXRhLFxuICAgICAgaWQ6IGRhdGFzZXRJbmZvLmlkLFxuICAgICAgbGFiZWw6IGRhdGFzZXRJbmZvLmxhYmVsXG4gICAgfTtcblxuICAgIHRoaXMuZGF0YUNvbnRhaW5lciA9IGRhdGFDb250YWluZXI7XG4gICAgdGhpcy5hbGxJbmRleGVzID0gYWxsSW5kZXhlcztcbiAgICB0aGlzLmZpbHRlcmVkSW5kZXggPSBhbGxJbmRleGVzO1xuICAgIHRoaXMuZmlsdGVyZWRJbmRleEZvckRvbWFpbiA9IGFsbEluZGV4ZXM7XG4gICAgdGhpcy5maWVsZFBhaXJzID0gZmluZFBvaW50RmllbGRQYWlycyhmaWVsZHMpO1xuICAgIHRoaXMuZmllbGRzID0gZmllbGRzO1xuICAgIHRoaXMuZ3B1RmlsdGVyID0gZ2V0R3B1RmlsdGVyUHJvcHMoW10sIGRhdGFJZCwgZmllbGRzKTtcbiAgICBpZiAoc3VwcG9ydGVkRmlsdGVyVHlwZXMpIHtcbiAgICAgIHRoaXMuc3VwcG9ydGVkRmlsdGVyVHlwZXMgPSBzdXBwb3J0ZWRGaWx0ZXJUeXBlcztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGZpZWxkXG4gICAqIEBwYXJhbSBjb2x1bW5OYW1lXG4gICAqL1xuICBnZXRDb2x1bW5GaWVsZChjb2x1bW5OYW1lKSB7XG4gICAgY29uc3QgZmllbGQgPSB0aGlzLmZpZWxkcy5maW5kKGZkID0+IGZkW0ZJRF9LRVldID09PSBjb2x1bW5OYW1lKTtcbiAgICB0aGlzLl9hc3NldEZpZWxkKGNvbHVtbk5hbWUsIGZpZWxkKTtcbiAgICByZXR1cm4gZmllbGQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGZpZWxkSWR4XG4gICAqIEBwYXJhbSBjb2x1bW5OYW1lXG4gICAqL1xuICBnZXRDb2x1bW5GaWVsZElkeChjb2x1bW5OYW1lKSB7XG4gICAgY29uc3QgZmllbGRJZHggPSB0aGlzLmZpZWxkcy5maW5kSW5kZXgoZmQgPT4gZmRbRklEX0tFWV0gPT09IGNvbHVtbk5hbWUpO1xuICAgIHRoaXMuX2Fzc2V0RmllbGQoY29sdW1uTmFtZSwgQm9vbGVhbihmaWVsZElkeCA+IC0xKSk7XG4gICAgcmV0dXJuIGZpZWxkSWR4O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdmFsdWUgb2YgYSBjZWxsXG4gICAqL1xuICBnZXRWYWx1ZShjb2x1bW5OYW1lLCByb3dJZHgpIHtcbiAgICBjb25zdCBmaWVsZCA9IHRoaXMuZ2V0Q29sdW1uRmllbGQoY29sdW1uTmFtZSk7XG4gICAgcmV0dXJuIGZpZWxkID8gZmllbGQudmFsdWVBY2Nlc3Nvcih7aW5kZXg6IHJvd0lkeH0pIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGV4aXN0aW5nIGZpZWxkIHdpdGggYSBuZXcgb2JqZWN0XG4gICAqIEBwYXJhbSBmaWVsZElkeFxuICAgKiBAcGFyYW0gbmV3RmllbGRcbiAgICovXG4gIHVwZGF0ZUNvbHVtbkZpZWxkKGZpZWxkSWR4LCBuZXdGaWVsZCkge1xuICAgIHRoaXMuZmllbGRzID0gT2JqZWN0LmFzc2lnbihbLi4udGhpcy5maWVsZHNdLCB7W2ZpZWxkSWR4XTogbmV3RmllbGR9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlIGZpbHRlclByb3BzIHRvIGZpZWxkIGFuZCByZXRyaWV2ZSBpdFxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29sdW1uTmFtZVxuICAgKi9cbiAgZ2V0Q29sdW1uRmlsdGVyUHJvcHMoY29sdW1uTmFtZSkge1xuICAgIGNvbnN0IGZpZWxkSWR4ID0gdGhpcy5nZXRDb2x1bW5GaWVsZElkeChjb2x1bW5OYW1lKTtcbiAgICBpZiAoZmllbGRJZHggPCAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgZmllbGQgPSB0aGlzLmZpZWxkc1tmaWVsZElkeF07XG4gICAgaWYgKGZpZWxkLmhhc093blByb3BlcnR5KCdmaWx0ZXJQcm9wcycpKSB7XG4gICAgICByZXR1cm4gZmllbGQuZmlsdGVyUHJvcHM7XG4gICAgfVxuXG4gICAgY29uc3QgZmllbGREb21haW4gPSB0aGlzLmdldENvbHVtbkZpbHRlckRvbWFpbihmaWVsZCk7XG4gICAgaWYgKCFmaWVsZERvbWFpbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZmlsdGVyUHJvcHMgPSBnZXRGaWx0ZXJQcm9wcyhmaWVsZCwgZmllbGREb21haW4pO1xuICAgIGNvbnN0IG5ld0ZpZWxkID0ge1xuICAgICAgLi4uZmllbGQsXG4gICAgICBmaWx0ZXJQcm9wc1xuICAgIH07XG5cbiAgICB0aGlzLnVwZGF0ZUNvbHVtbkZpZWxkKGZpZWxkSWR4LCBuZXdGaWVsZCk7XG5cbiAgICByZXR1cm4gZmlsdGVyUHJvcHM7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgZmlsdGVycyB0byBkYXRhc2V0LCByZXR1cm4gdGhlIGZpbHRlcmVkIGRhdGFzZXQgd2l0aCB1cGRhdGVkIGBncHVGaWx0ZXJgLCBgZmlsdGVyUmVjb3JkYCwgYGZpbHRlcmVkSW5kZXhgLCBgZmlsdGVyZWRJbmRleEZvckRvbWFpbmBcbiAgICogQHBhcmFtIGZpbHRlcnNcbiAgICogQHBhcmFtIGxheWVyc1xuICAgKiBAcGFyYW0gb3B0XG4gICAqL1xuICBmaWx0ZXJUYWJsZShmaWx0ZXJzLCBsYXllcnMsIG9wdCkge1xuICAgIGNvbnN0IHtkYXRhQ29udGFpbmVyLCBpZDogZGF0YUlkLCBmaWx0ZXJSZWNvcmQ6IG9sZEZpbHRlclJlY29yZCwgZmllbGRzfSA9IHRoaXM7XG5cbiAgICAvLyBpZiB0aGVyZSBpcyBubyBmaWx0ZXJzXG4gICAgY29uc3QgZmlsdGVyUmVjb3JkID0gZ2V0RmlsdGVyUmVjb3JkKGRhdGFJZCwgZmlsdGVycywgb3B0IHx8IHt9KTtcblxuICAgIHRoaXMuZmlsdGVyUmVjb3JkID0gZmlsdGVyUmVjb3JkO1xuICAgIHRoaXMuZ3B1RmlsdGVyID0gZ2V0R3B1RmlsdGVyUHJvcHMoZmlsdGVycywgZGF0YUlkLCBmaWVsZHMpO1xuXG4gICAgLy8gY29uc3QgbmV3RGF0YXNldCA9IHNldChbJ2ZpbHRlclJlY29yZCddLCBmaWx0ZXJSZWNvcmQsIGRhdGFzZXQpO1xuXG4gICAgaWYgKCFmaWx0ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5maWx0ZXJlZEluZGV4ID0gdGhpcy5hbGxJbmRleGVzO1xuICAgICAgdGhpcy5maWx0ZXJlZEluZGV4Rm9yRG9tYWluID0gdGhpcy5hbGxJbmRleGVzO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdGhpcy5jaGFuZ2VkRmlsdGVycyA9IGRpZmZGaWx0ZXJzKGZpbHRlclJlY29yZCwgb2xkRmlsdGVyUmVjb3JkKTtcblxuICAgIC8vIGdlbmVyYXRlIDIgc2V0cyBvZiBmaWx0ZXIgcmVzdWx0XG4gICAgLy8gZmlsdGVyZWRJbmRleCB1c2VkIHRvIGNhbGN1bGF0ZSBsYXllciBkYXRhXG4gICAgLy8gZmlsdGVyZWRJbmRleEZvckRvbWFpbiB1c2VkIHRvIGNhbGN1bGF0ZSBsYXllciBEb21haW5cbiAgICBjb25zdCBzaG91bGRDYWxEb21haW4gPSBCb29sZWFuKHRoaXMuY2hhbmdlZEZpbHRlcnMuZHluYW1pY0RvbWFpbik7XG4gICAgY29uc3Qgc2hvdWxkQ2FsSW5kZXggPSBCb29sZWFuKHRoaXMuY2hhbmdlZEZpbHRlcnMuY3B1KTtcblxuICAgIGxldCBmaWx0ZXJSZXN1bHQgPSB7fTtcbiAgICBpZiAoc2hvdWxkQ2FsRG9tYWluIHx8IHNob3VsZENhbEluZGV4KSB7XG4gICAgICBjb25zdCBkeW5hbWljRG9tYWluRmlsdGVycyA9IHNob3VsZENhbERvbWFpbiA/IGZpbHRlclJlY29yZC5keW5hbWljRG9tYWluIDogbnVsbDtcbiAgICAgIGNvbnN0IGNwdUZpbHRlcnMgPSBzaG91bGRDYWxJbmRleCA/IGZpbHRlclJlY29yZC5jcHUgOiBudWxsO1xuXG4gICAgICBjb25zdCBmaWx0ZXJGdW5jcyA9IGZpbHRlcnMucmVkdWNlKChhY2MsIGZpbHRlcikgPT4ge1xuICAgICAgICBjb25zdCBmaWVsZEluZGV4ID0gZ2V0RGF0YXNldEZpZWxkSW5kZXhGb3JGaWx0ZXIodGhpcy5pZCwgZmlsdGVyKTtcbiAgICAgICAgY29uc3QgZmllbGQgPSBmaWVsZEluZGV4ICE9PSAtMSA/IGZpZWxkc1tmaWVsZEluZGV4XSA6IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5hY2MsXG4gICAgICAgICAgW2ZpbHRlci5pZF06IGdldEZpbHRlckZ1bmN0aW9uKGZpZWxkLCB0aGlzLmlkLCBmaWx0ZXIsIGxheWVycywgZGF0YUNvbnRhaW5lcilcbiAgICAgICAgfTtcbiAgICAgIH0sIHt9KTtcblxuICAgICAgZmlsdGVyUmVzdWx0ID0gZmlsdGVyRGF0YUJ5RmlsdGVyVHlwZXMoXG4gICAgICAgIHtkeW5hbWljRG9tYWluRmlsdGVycywgY3B1RmlsdGVycywgZmlsdGVyRnVuY3N9LFxuICAgICAgICBkYXRhQ29udGFpbmVyXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIHRoaXMuZmlsdGVyZWRJbmRleCA9IGZpbHRlclJlc3VsdC5maWx0ZXJlZEluZGV4IHx8IHRoaXMuZmlsdGVyZWRJbmRleDtcbiAgICB0aGlzLmZpbHRlcmVkSW5kZXggPSBmaWx0ZXJSZXN1bHQuZmlsdGVyZWRJbmRleCB8fCBmaWx0ZXJSZXN1bHQuZmlsdGVyZWRJbmRleEZvckRvbWFpbiB8fCB0aGlzLmZpbHRlcmVkSW5kZXg7XG4gICAgdGhpcy5maWx0ZXJlZEluZGV4Rm9yRG9tYWluID1cbiAgICAgIGZpbHRlclJlc3VsdC5maWx0ZXJlZEluZGV4Rm9yRG9tYWluIHx8IHRoaXMuZmlsdGVyZWRJbmRleEZvckRvbWFpbjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IGZpbHRlcnMgdG8gYSBkYXRhc2V0IGFsbCBvbiBDUFUsIGFzc2lnbiB0byBgZmlsdGVyZWRJZHhDUFVgLCBgZmlsdGVyUmVjb3JkQ1BVYFxuICAgKiBAcGFyYW0gZmlsdGVyc1xuICAgKiBAcGFyYW0gbGF5ZXJzXG4gICAqL1xuICBmaWx0ZXJUYWJsZUNQVShmaWx0ZXJzLCBsYXllcnMpIHtcbiAgICBjb25zdCBvcHQgPSB7XG4gICAgICBjcHVPbmx5OiB0cnVlLFxuICAgICAgaWdub3JlRG9tYWluOiB0cnVlXG4gICAgfTtcblxuICAgIC8vIG5vIGZpbHRlclxuICAgIGlmICghZmlsdGVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZmlsdGVyZWRJZHhDUFUgPSB0aGlzLmFsbEluZGV4ZXM7XG4gICAgICB0aGlzLmZpbHRlclJlY29yZENQVSA9IGdldEZpbHRlclJlY29yZCh0aGlzLmlkLCBmaWx0ZXJzLCBvcHQpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gbm8gZ3B1IGZpbHRlclxuICAgIGlmICghZmlsdGVycy5maW5kKGYgPT4gZi5ncHUpKSB7XG4gICAgICB0aGlzLmZpbHRlcmVkSWR4Q1BVID0gdGhpcy5maWx0ZXJlZEluZGV4O1xuICAgICAgdGhpcy5maWx0ZXJSZWNvcmRDUFUgPSBnZXRGaWx0ZXJSZWNvcmQodGhpcy5pZCwgZmlsdGVycywgb3B0KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIG1ha2UgYSBjb3B5IGZvciBjcHUgZmlsdGVyaW5nXG4gICAgY29uc3QgY29waWVkID0gY29weVRhYmxlKHRoaXMpO1xuXG4gICAgY29waWVkLmZpbHRlclJlY29yZCA9IHRoaXMuZmlsdGVyUmVjb3JkQ1BVO1xuICAgIGNvcGllZC5maWx0ZXJlZEluZGV4ID0gdGhpcy5maWx0ZXJlZElkeENQVSB8fCBbXTtcblxuICAgIGNvbnN0IGZpbHRlcmVkID0gY29waWVkLmZpbHRlclRhYmxlKGZpbHRlcnMsIGxheWVycywgb3B0KTtcblxuICAgIHRoaXMuZmlsdGVyZWRJZHhDUFUgPSBmaWx0ZXJlZC5maWx0ZXJlZEluZGV4O1xuICAgIHRoaXMuZmlsdGVyUmVjb3JkQ1BVID0gZmlsdGVyZWQuZmlsdGVyUmVjb3JkO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIGZpZWxkIGRvbWFpbiBiYXNlZCBvbiBmaWVsZCB0eXBlIGFuZCBkYXRhXG4gICAqIGZvciBGaWx0ZXJcbiAgICovXG4gIGdldENvbHVtbkZpbHRlckRvbWFpbihmaWVsZCkge1xuICAgIGNvbnN0IHtkYXRhQ29udGFpbmVyfSA9IHRoaXM7XG4gICAgY29uc3Qge3ZhbHVlQWNjZXNzb3J9ID0gZmllbGQ7XG5cbiAgICBsZXQgZG9tYWluO1xuXG4gICAgc3dpdGNoIChmaWVsZC50eXBlKSB7XG4gICAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5yZWFsOlxuICAgICAgY2FzZSBBTExfRklFTERfVFlQRVMuaW50ZWdlcjpcbiAgICAgICAgLy8gY2FsY3VsYXRlIGRvbWFpbiBhbmQgc3RlcFxuICAgICAgICByZXR1cm4gZ2V0TnVtZXJpY0ZpZWxkRG9tYWluKGRhdGFDb250YWluZXIsIHZhbHVlQWNjZXNzb3IpO1xuXG4gICAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5ib29sZWFuOlxuICAgICAgICByZXR1cm4ge2RvbWFpbjogW3RydWUsIGZhbHNlXX07XG5cbiAgICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLnN0cmluZzpcbiAgICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLmRhdGU6XG4gICAgICAgIGRvbWFpbiA9IGdldE9yZGluYWxEb21haW4oZGF0YUNvbnRhaW5lciwgdmFsdWVBY2Nlc3Nvcik7XG4gICAgICAgIHJldHVybiB7ZG9tYWlufTtcblxuICAgICAgY2FzZSBBTExfRklFTERfVFlQRVMudGltZXN0YW1wOlxuICAgICAgICByZXR1cm4gZ2V0VGltZXN0YW1wRmllbGREb21haW4oZGF0YUNvbnRhaW5lciwgdmFsdWVBY2Nlc3Nvcik7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB7ZG9tYWluOiBnZXRPcmRpbmFsRG9tYWluKGRhdGFDb250YWluZXIsIHZhbHVlQWNjZXNzb3IpfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogIEdldCB0aGUgZG9tYWluIG9mIHRoaXMgY29sdW1uIGJhc2VkIG9uIHNjYWxlIHR5cGVcbiAgICovXG4gIGdldENvbHVtbkxheWVyRG9tYWluKGZpZWxkLCBzY2FsZVR5cGUpIHtcbiAgICBjb25zdCB7ZGF0YUNvbnRhaW5lciwgZmlsdGVyZWRJbmRleEZvckRvbWFpbn0gPSB0aGlzO1xuXG4gICAgaWYgKCFTQ0FMRV9UWVBFU1tzY2FsZVR5cGVdKSB7XG4gICAgICBDb25zb2xlLmVycm9yKGBzY2FsZSB0eXBlICR7c2NhbGVUeXBlfSBub3Qgc3VwcG9ydGVkYCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB7dmFsdWVBY2Nlc3Nvcn0gPSBmaWVsZDtcbiAgICBjb25zdCBpbmRleFZhbHVlQWNjZXNzb3IgPSBpID0+IHZhbHVlQWNjZXNzb3Ioe2luZGV4OiBpfSk7XG4gICAgY29uc3Qgc29ydEZ1bmN0aW9uID0gZ2V0U29ydGluZ0Z1bmN0aW9uKGZpZWxkLnR5cGUpO1xuXG4gICAgc3dpdGNoIChzY2FsZVR5cGUpIHtcbiAgICAgIGNhc2UgU0NBTEVfVFlQRVMub3JkaW5hbDpcbiAgICAgIGNhc2UgU0NBTEVfVFlQRVMucG9pbnQ6XG4gICAgICAgIC8vIGRvIG5vdCByZWNhbGN1bGF0ZSBvcmRpbmFsIGRvbWFpbiBiYXNlZCBvbiBmaWx0ZXJlZCBkYXRhXG4gICAgICAgIC8vIGRvbid0IG5lZWQgdG8gdXBkYXRlIG9yZGluYWwgZG9tYWluIGV2ZXJ5IHRpbWVcbiAgICAgICAgcmV0dXJuIGdldE9yZGluYWxEb21haW4oZGF0YUNvbnRhaW5lciwgdmFsdWVBY2Nlc3Nvcik7XG5cbiAgICAgIGNhc2UgU0NBTEVfVFlQRVMucXVhbnRpbGU6XG4gICAgICAgIHJldHVybiBnZXRRdWFudGlsZURvbWFpbihmaWx0ZXJlZEluZGV4Rm9yRG9tYWluLCBpbmRleFZhbHVlQWNjZXNzb3IsIHNvcnRGdW5jdGlvbik7XG5cbiAgICAgIGNhc2UgU0NBTEVfVFlQRVMubG9nOlxuICAgICAgICByZXR1cm4gZ2V0TG9nRG9tYWluKGZpbHRlcmVkSW5kZXhGb3JEb21haW4sIGluZGV4VmFsdWVBY2Nlc3Nvcik7XG5cbiAgICAgIGNhc2UgU0NBTEVfVFlQRVMucXVhbnRpemU6XG4gICAgICBjYXNlIFNDQUxFX1RZUEVTLmxpbmVhcjpcbiAgICAgIGNhc2UgU0NBTEVfVFlQRVMuc3FydDpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBnZXRMaW5lYXJEb21haW4oZmlsdGVyZWRJbmRleEZvckRvbWFpbiwgaW5kZXhWYWx1ZUFjY2Vzc29yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgc2FtcGxlIG9mIHJvd3MgdG8gY2FsY3VsYXRlIGxheWVyIGJvdW5kYXJpZXNcbiAgICovXG4gIC8vIGdldFNhbXBsZURhdGEocm93cylcblxuICAvKipcbiAgICogUGFyc2UgY2VsbCB2YWx1ZSBiYXNlZCBvbiBjb2x1bW4gdHlwZSBhbmQgcmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uXG4gICAqIFZhbHVlIHRoZSBmaWVsZCB2YWx1ZSwgdHlwZSB0aGUgZmllbGQgdHlwZVxuICAgKi9cbiAgLy8gcGFyc2VGaWVsZFZhbHVlKHZhbHVlLCB0eXBlKVxuXG4gIC8vIHNvcnREYXRhc2V0QnlDb2x1bW4oKVxuXG4gIC8qKlxuICAgKiBBc3NlcnQgd2hldGhlciBmaWVsZCBleGlzdFxuICAgKiBAcGFyYW0gZmllbGROYW1lXG4gICAqIEBwYXJhbSBjb25kaXRpb25cbiAgICovXG4gIF9hc3NldEZpZWxkKGZpZWxkTmFtZSwgY29uZGl0aW9uKSB7XG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIENvbnNvbGUuZXJyb3IoYCR7ZmllbGROYW1lfSBkb2VzbnQgZXhpc3QgaW4gZGF0YXNldCAke3RoaXMuaWR9YCk7XG4gICAgfVxuICB9XG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlMgKE1BSU5MWSBFWFBPUlRFRCBGT1IgVEVTVC4uLilcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVN1ZmZpeEFuZERlbGltaXRlcnMobGF5ZXJOYW1lLCBzdWZmaXgpIHtcbiAgcmV0dXJuIGxheWVyTmFtZVxuICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoc3VmZml4LCAnaWcnKSwgJycpXG4gICAgLnJlcGxhY2UoL1tfLC5dKy9nLCAnICcpXG4gICAgLnRyaW0oKTtcbn1cblxuLyoqXG4gKiBGaW5kIHBvaW50IGZpZWxkcyBwYWlycyBmcm9tIGZpZWxkc1xuICpcbiAqIEBwYXJhbSBmaWVsZHNcbiAqIEByZXR1cm5zIGZvdW5kIHBvaW50IGZpZWxkc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4va2VwbGVyLXRhYmxlJykuZmluZFBvaW50RmllbGRQYWlyc31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRQb2ludEZpZWxkUGFpcnMoZmllbGRzKSB7XG4gIGNvbnN0IGFsbE5hbWVzID0gZmllbGRzLm1hcChmID0+IGYubmFtZS50b0xvd2VyQ2FzZSgpKTtcblxuICAvLyBnZXQgbGlzdCBvZiBhbGwgZmllbGRzIHdpdGggbWF0Y2hpbmcgc3VmZml4ZXNcbiAgY29uc3QgYWNjID0gW107XG4gIHJldHVybiBhbGxOYW1lcy5yZWR1Y2UoKGNhcnJ5LCBmaWVsZE5hbWUsIGlkeCkgPT4ge1xuICAgIC8vIFRoaXMgc2VhcmNoIGZvciBwYWlycyB3aWxsIGVhcmx5IGV4aXQgaWYgZm91bmQuXG4gICAgZm9yIChjb25zdCBzdWZmaXhQYWlyIG9mIFRSSVBfUE9JTlRfRklFTERTKSB7XG4gICAgICAvLyBtYXRjaCBmaXJzdCBzdWZmaXhgYGBcbiAgICAgIGlmIChmaWVsZE5hbWUuZW5kc1dpdGgoc3VmZml4UGFpclswXSkpIHtcbiAgICAgICAgLy8gbWF0Y2ggc2Vjb25kIHN1ZmZpeFxuICAgICAgICBjb25zdCBvdGhlclBhdHRlcm4gPSBuZXcgUmVnRXhwKGAke3N1ZmZpeFBhaXJbMF19XFwkYCk7XG4gICAgICAgIGNvbnN0IHBhcnRuZXIgPSBmaWVsZE5hbWUucmVwbGFjZShvdGhlclBhdHRlcm4sIHN1ZmZpeFBhaXJbMV0pO1xuXG4gICAgICAgIGNvbnN0IHBhcnRuZXJJZHggPSBhbGxOYW1lcy5maW5kSW5kZXgoZCA9PiBkID09PSBwYXJ0bmVyKTtcbiAgICAgICAgaWYgKHBhcnRuZXJJZHggPiAtMSkge1xuICAgICAgICAgIGNvbnN0IGRlZmF1bHROYW1lID0gcmVtb3ZlU3VmZml4QW5kRGVsaW1pdGVycyhmaWVsZE5hbWUsIHN1ZmZpeFBhaXJbMF0pO1xuXG4gICAgICAgICAgY2FycnkucHVzaCh7XG4gICAgICAgICAgICBkZWZhdWx0TmFtZSxcbiAgICAgICAgICAgIHBhaXI6IHtcbiAgICAgICAgICAgICAgbGF0OiB7XG4gICAgICAgICAgICAgICAgZmllbGRJZHg6IGlkeCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogZmllbGRzW2lkeF0ubmFtZVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBsbmc6IHtcbiAgICAgICAgICAgICAgICBmaWVsZElkeDogcGFydG5lcklkeCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogZmllbGRzW3BhcnRuZXJJZHhdLm5hbWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1ZmZpeDogc3VmZml4UGFpclxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBjYXJyeTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2Fycnk7XG4gIH0sIGFjYyk7XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBkYXRhc2V0XG4gKiBAcGFyYW0gY29sdW1uXG4gKiBAcGFyYW0gbW9kZVxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4va2VwbGVyLXRhYmxlJykuc29ydERhdGFzZXRCeUNvbHVtbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNvcnREYXRhc2V0QnlDb2x1bW4oZGF0YXNldCwgY29sdW1uLCBtb2RlKSB7XG4gIGNvbnN0IHthbGxJbmRleGVzLCBmaWVsZHMsIGRhdGFDb250YWluZXJ9ID0gZGF0YXNldDtcbiAgY29uc3QgZmllbGRJbmRleCA9IGZpZWxkcy5maW5kSW5kZXgoZiA9PiBmLm5hbWUgPT09IGNvbHVtbik7XG4gIGlmIChmaWVsZEluZGV4IDwgMCkge1xuICAgIHJldHVybiBkYXRhc2V0O1xuICB9XG5cbiAgY29uc3Qgc29ydEJ5ID0gU09SVF9PUkRFUlttb2RlXSB8fCBTT1JUX09SREVSLkFTQ0VORElORztcblxuICBpZiAoc29ydEJ5ID09PSBTT1JUX09SREVSLlVOU09SVCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5kYXRhc2V0LFxuICAgICAgc29ydENvbHVtbjoge30sXG4gICAgICBzb3J0T3JkZXI6IG51bGxcbiAgICB9O1xuICB9XG5cbiAgY29uc3Qgc29ydEZ1bmN0aW9uID0gc29ydEJ5ID09PSBTT1JUX09SREVSLkFTQ0VORElORyA/IGFzY2VuZGluZyA6IGRlc2NlbmRpbmc7XG4gIGNvbnN0IHNvcnRPcmRlciA9IGFsbEluZGV4ZXNcbiAgICAuc2xpY2UoKVxuICAgIC5zb3J0KChhLCBiKSA9PlxuICAgICAgc29ydEZ1bmN0aW9uKGRhdGFDb250YWluZXIudmFsdWVBdChhLCBmaWVsZEluZGV4KSwgZGF0YUNvbnRhaW5lci52YWx1ZUF0KGIsIGZpZWxkSW5kZXgpKVxuICAgICk7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5kYXRhc2V0LFxuICAgIHNvcnRDb2x1bW46IHtcbiAgICAgIFtjb2x1bW5dOiBzb3J0QnlcbiAgICB9LFxuICAgIHNvcnRPcmRlclxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weVRhYmxlKG9yaWdpbmFsKSB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9yaWdpbmFsKSksIG9yaWdpbmFsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlUYWJsZUFuZFVwZGF0ZShvcmlnaW5hbCwgb3B0aW9ucyA9IHt9KSB7XG4gIHJldHVybiBPYmplY3QuZW50cmllcyhvcHRpb25zKS5yZWR1Y2UoKGFjYywgZW50cnkpID0+IHtcbiAgICBhY2NbZW50cnlbMF1dID0gZW50cnlbMV07XG4gICAgcmV0dXJuIGFjYztcbiAgfSwgY29weVRhYmxlKG9yaWdpbmFsKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEtlcGxlclRhYmxlO1xuIl19