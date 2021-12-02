"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexedDataContainer = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _dataRow = require("./data-row");

var _marked = /*#__PURE__*/_regenerator["default"].mark(rowsIterator),
    _marked2 = /*#__PURE__*/_regenerator["default"].mark(columnIterator);

/**
 * @param {import('./data-container-interface').DataContainerInterface} dataContainer
 * @param {number[]} indices
 * @param {import('./data-row').SharedRowOptions} sharedRow
 * @returns {Generator<DataRow, void, unknown>}
 */
function rowsIterator(dataContainer, indices, sharedRow) {
  var numRows, rowIndex, mappedRowIndex;
  return _regenerator["default"].wrap(function rowsIterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          numRows = indices.length;
          rowIndex = 0;

        case 2:
          if (!(rowIndex < numRows)) {
            _context.next = 9;
            break;
          }

          mappedRowIndex = indices[rowIndex];
          _context.next = 6;
          return dataContainer.row(mappedRowIndex, sharedRow);

        case 6:
          ++rowIndex;
          _context.next = 2;
          break;

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
/**
 * @param {import('./data-container-interface').DataContainerInterface} dataContainer
 * @param {number[]} indices
 * @param {number} columnIndex
 * @returns {Generator<any, void, unknown>}
 */


function columnIterator(dataContainer, indices, columnIndex) {
  var numRows, rowIndex, mappedRowIndex;
  return _regenerator["default"].wrap(function columnIterator$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          numRows = indices.length;
          rowIndex = 0;

        case 2:
          if (!(rowIndex < numRows)) {
            _context2.next = 9;
            break;
          }

          mappedRowIndex = indices[rowIndex];
          _context2.next = 6;
          return dataContainer.valueAt(mappedRowIndex, columnIndex);

        case 6:
          ++rowIndex;
          _context2.next = 2;
          break;

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}

var IndexedDataContainer = /*#__PURE__*/function () {
  function IndexedDataContainer(parentDataContainer, indices) {
    (0, _classCallCheck2["default"])(this, IndexedDataContainer);
    this._parentDataContainer = parentDataContainer;
    this._indices = indices;
  }

  (0, _createClass2["default"])(IndexedDataContainer, [{
    key: "numRows",
    value: function numRows() {
      return this._indices.length;
    }
  }, {
    key: "numColumns",
    value: function numColumns() {
      return this._parentDataContainer.numColumns();
    }
    /**
     * Remaps a local index to an index in the parent dataset
     * @param {number} rowIndex
     * @returns number
     */

  }, {
    key: "_mappedRowIndex",
    value: function _mappedRowIndex(rowIndex) {
      return this._indices[rowIndex];
    }
  }, {
    key: "valueAt",
    value: function valueAt(rowIndex, columnIndex) {
      if (!columnIndex) {
        return this.map(function (i) {
          return i.valueAt(rowIndex);
        });
      }

      return this._parentDataContainer.valueAt(this._mappedRowIndex(rowIndex), columnIndex);
    }
  }, {
    key: "row",
    value: function row(rowIndex, sharedRow) {
      return this._parentDataContainer.row(this._mappedRowIndex(rowIndex), sharedRow);
    }
  }, {
    key: "rowAsArray",
    value: function rowAsArray(rowIndex) {
      return this._parentDataContainer.rowAsArray(this._mappedRowIndex(rowIndex));
    }
  }, {
    key: "rows",
    value: function rows(sharedRow) {
      return rowsIterator(this._parentDataContainer, this._indices, sharedRow);
    }
  }, {
    key: "column",
    value: function column(columnIndex) {
      return columnIterator(this._parentDataContainer, this._indices, columnIndex);
    }
  }, {
    key: "getPlainIndex",
    value: function getPlainIndex() {
      return this._indices.map(function (_, i) {
        return i;
      });
    }
  }, {
    key: "flattenData",
    value: function flattenData() {
      var _this = this;

      var tSharedRow = _dataRow.DataRow.createSharedRow(true);

      return this._indices.map(function (_, i) {
        return _this.row(i, tSharedRow).values();
      }, this);
    }
  }, {
    key: "map",
    value: function map(func, sharedRow) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var _options$start = options.start,
          start = _options$start === void 0 ? 0 : _options$start,
          _options$end = options.end,
          end = _options$end === void 0 ? this.numRows() : _options$end;
      var endRow = Math.min(this.numRows(), end);

      var tSharedRow = _dataRow.DataRow.createSharedRow(sharedRow);

      var out = [];

      for (var rowIndex = start; rowIndex < endRow; ++rowIndex) {
        var row = this.row(rowIndex, tSharedRow);
        out.push(func(row, rowIndex));
      }

      return out;
    }
  }, {
    key: "mapIndex",
    value: function mapIndex(func) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _options$start2 = options.start,
          start = _options$start2 === void 0 ? 0 : _options$start2,
          _options$end2 = options.end,
          end = _options$end2 === void 0 ? this.numRows() : _options$end2;
      var endRow = Math.min(this.numRows(), end);
      var out = [];

      for (var rowIndex = start; rowIndex < endRow; ++rowIndex) {
        out.push(func({
          index: this._mappedRowIndex(rowIndex)
        }, this._parentDataContainer));
      }

      return out;
    }
  }, {
    key: "find",
    value: function find(func, sharedRow) {
      var tSharedRow = _dataRow.DataRow.createSharedRow(sharedRow);

      for (var rowIndex = 0; rowIndex < this.numRows(); ++rowIndex) {
        var row = this.row(rowIndex, tSharedRow);

        if (func(row, rowIndex)) {
          return row;
        }
      }

      return undefined;
    }
  }, {
    key: "reduce",
    value: function reduce(func, initialValue, sharedRow) {
      var tSharedRow = _dataRow.DataRow.createSharedRow(sharedRow);

      for (var rowIndex = 0; rowIndex < this._indices.length; ++rowIndex) {
        var row = this.row(rowIndex, tSharedRow);
        initialValue = func(initialValue, row, rowIndex);
      }

      return initialValue;
    }
  }]);
  return IndexedDataContainer;
}();

exports.IndexedDataContainer = IndexedDataContainer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy90YWJsZS11dGlscy9pbmRleGVkLWRhdGEtY29udGFpbmVyLmpzIl0sIm5hbWVzIjpbInJvd3NJdGVyYXRvciIsImNvbHVtbkl0ZXJhdG9yIiwiZGF0YUNvbnRhaW5lciIsImluZGljZXMiLCJzaGFyZWRSb3ciLCJudW1Sb3dzIiwibGVuZ3RoIiwicm93SW5kZXgiLCJtYXBwZWRSb3dJbmRleCIsInJvdyIsImNvbHVtbkluZGV4IiwidmFsdWVBdCIsIkluZGV4ZWREYXRhQ29udGFpbmVyIiwicGFyZW50RGF0YUNvbnRhaW5lciIsIl9wYXJlbnREYXRhQ29udGFpbmVyIiwiX2luZGljZXMiLCJudW1Db2x1bW5zIiwibWFwIiwiaSIsIl9tYXBwZWRSb3dJbmRleCIsInJvd0FzQXJyYXkiLCJfIiwidFNoYXJlZFJvdyIsIkRhdGFSb3ciLCJjcmVhdGVTaGFyZWRSb3ciLCJ2YWx1ZXMiLCJmdW5jIiwib3B0aW9ucyIsInN0YXJ0IiwiZW5kIiwiZW5kUm93IiwiTWF0aCIsIm1pbiIsIm91dCIsInB1c2giLCJpbmRleCIsInVuZGVmaW5lZCIsImluaXRpYWxWYWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOzt3REFRVUEsWTt5REFjQUMsYzs7QUFwQlY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBVUQsWUFBVixDQUF1QkUsYUFBdkIsRUFBc0NDLE9BQXRDLEVBQStDQyxTQUEvQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDUUMsVUFBQUEsT0FEUixHQUNrQkYsT0FBTyxDQUFDRyxNQUQxQjtBQUVXQyxVQUFBQSxRQUZYLEdBRXNCLENBRnRCOztBQUFBO0FBQUEsZ0JBRXlCQSxRQUFRLEdBQUdGLE9BRnBDO0FBQUE7QUFBQTtBQUFBOztBQUdVRyxVQUFBQSxjQUhWLEdBRzJCTCxPQUFPLENBQUNJLFFBQUQsQ0FIbEM7QUFBQTtBQUlJLGlCQUFNTCxhQUFhLENBQUNPLEdBQWQsQ0FBa0JE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QUFtQmUsVUFBbkIsQ0FBWjtBQUNBZSxRQUFBQSxZQUFZLEdBQUdYLElBQUksQ0FBQ1csWUFBRCxFQUFlNUIsR0FBZixFQUFvQkYsUUFBcEIsQ0FBbkI7QUFDRDs7QUFDRCxhQUFPOEIsWUFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIxIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtEYXRhUm93fSBmcm9tICcuL2RhdGEtcm93JztcblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9kYXRhLWNvbnRhaW5lci1pbnRlcmZhY2UnKS5EYXRhQ29udGFpbmVySW50ZXJmYWNlfSBkYXRhQ29udGFpbmVyXG4gKiBAcGFyYW0ge251bWJlcltdfSBpbmRpY2VzXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9kYXRhLXJvdycpLlNoYXJlZFJvd09wdGlvbnN9IHNoYXJlZFJvd1xuICogQHJldHVybnMge0dlbmVyYXRvcjxEYXRhUm93LCB2b2lkLCB1bmtub3duPn1cbiAqL1xuZnVuY3Rpb24qIHJvd3NJdGVyYXRvcihkYXRhQ29udGFpbmVyLCBpbmRpY2VzLCBzaGFyZWRSb3cpIHtcbiAgY29uc3QgbnVtUm93cyA9IGluZGljZXMubGVuZ3RoO1xuICBmb3IgKGxldCByb3dJbmRleCA9IDA7IHJvd0luZGV4IDwgbnVtUm93czsgKytyb3dJbmRleCkge1xuICAgIGNvbnN0IG1hcHBlZFJvd0luZGV4ID0gaW5kaWNlc1tyb3dJbmRleF07XG4gICAgeWllbGQgZGF0YUNvbnRhaW5lci5yb3cobWFwcGVkUm93SW5kZXgsIHNoYXJlZFJvdyk7XG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9kYXRhLWNvbnRhaW5lci1pbnRlcmZhY2UnKS5EYXRhQ29udGFpbmVySW50ZXJmYWNlfSBkYXRhQ29udGFpbmVyXG4gKiBAcGFyYW0ge251bWJlcltdfSBpbmRpY2VzXG4gKiBAcGFyYW0ge251bWJlcn0gY29sdW1uSW5kZXhcbiAqIEByZXR1cm5zIHtHZW5lcmF0b3I8YW55LCB2b2lkLCB1bmtub3duPn1cbiAqL1xuZnVuY3Rpb24qIGNvbHVtbkl0ZXJhdG9yKGRhdGFDb250YWluZXIsIGluZGljZXMsIGNvbHVtbkluZGV4KSB7XG4gIGNvbnN0IG51bVJvd3MgPSBpbmRpY2VzLmxlbmd0aDtcbiAgZm9yIChsZXQgcm93SW5kZXggPSAwOyByb3dJbmRleCA8IG51bVJvd3M7ICsrcm93SW5kZXgpIHtcbiAgICBjb25zdCBtYXBwZWRSb3dJbmRleCA9IGluZGljZXNbcm93SW5kZXhdO1xuICAgIHlpZWxkIGRhdGFDb250YWluZXIudmFsdWVBdChtYXBwZWRSb3dJbmRleCwgY29sdW1uSW5kZXgpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbmRleGVkRGF0YUNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHBhcmVudERhdGFDb250YWluZXIsIGluZGljZXMpIHtcbiAgICB0aGlzLl9wYXJlbnREYXRhQ29udGFpbmVyID0gcGFyZW50RGF0YUNvbnRhaW5lcjtcbiAgICB0aGlzLl9pbmRpY2VzID0gaW5kaWNlcztcbiAgfVxuXG4gIG51bVJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luZGljZXMubGVuZ3RoO1xuICB9XG5cbiAgbnVtQ29sdW1ucygpIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyZW50RGF0YUNvbnRhaW5lci5udW1Db2x1bW5zKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtYXBzIGEgbG9jYWwgaW5kZXggdG8gYW4gaW5kZXggaW4gdGhlIHBhcmVudCBkYXRhc2V0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSByb3dJbmRleFxuICAgKiBAcmV0dXJucyBudW1iZXJcbiAgICovXG4gIF9tYXBwZWRSb3dJbmRleChyb3dJbmRleCkge1xuICAgIHJldHVybiB0aGlzLl9pbmRpY2VzW3Jvd0luZGV4XTtcbiAgfVxuXG4gIHZhbHVlQXQocm93SW5kZXgsIGNvbHVtbkluZGV4KSB7XG4gICAgaWYgKCFjb2x1bW5JbmRleCkge1xuICAgICAgcmV0dXJuIHRoaXMubWFwKGkgPT4gaS52YWx1ZUF0KHJvd0luZGV4KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3BhcmVudERhdGFDb250YWluZXIudmFsdWVBdCh0aGlzLl9tYXBwZWRSb3dJbmRleChyb3dJbmRleCksIGNvbHVtbkluZGV4KTtcbiAgfVxuXG4gIHJvdyhyb3dJbmRleCwgc2hhcmVkUm93KSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhcmVudERhdGFDb250YWluZXIucm93KHRoaXMuX21hcHBlZFJvd0luZGV4KHJvd0luZGV4KSwgc2hhcmVkUm93KTtcbiAgfVxuXG4gIHJvd0FzQXJyYXkocm93SW5kZXgpIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyZW50RGF0YUNvbnRhaW5lci5yb3dBc0FycmF5KHRoaXMuX21hcHBlZFJvd0luZGV4KHJvd0luZGV4KSk7XG4gIH1cblxuICByb3dzKHNoYXJlZFJvdykge1xuICAgIHJldHVybiByb3dzSXRlcmF0b3IodGhpcy5fcGFyZW50RGF0YUNvbnRhaW5lciwgdGhpcy5faW5kaWNlcywgc2hhcmVkUm93KTtcbiAgfVxuXG4gIGNvbHVtbihjb2x1bW5JbmRleCkge1xuICAgIHJldHVybiBjb2x1bW5JdGVyYXRvcih0aGlzLl9wYXJlbnREYXRhQ29udGFpbmVyLCB0aGlzLl9pbmRpY2VzLCBjb2x1bW5JbmRleCk7XG4gIH1cblxuICBnZXRQbGFpbkluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLl9pbmRpY2VzLm1hcCgoXywgaSkgPT4gaSk7XG4gIH1cblxuICBmbGF0dGVuRGF0YSgpIHtcbiAgICBjb25zdCB0U2hhcmVkUm93ID0gRGF0YVJvdy5jcmVhdGVTaGFyZWRSb3codHJ1ZSk7XG5cbiAgICByZXR1cm4gdGhpcy5faW5kaWNlcy5tYXAoKF8sIGkpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnJvdyhpLCB0U2hhcmVkUm93KS52YWx1ZXMoKTtcbiAgICB9LCB0aGlzKTtcbiAgfVxuXG4gIG1hcChmdW5jLCBzaGFyZWRSb3csIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHtzdGFydCA9IDAsIGVuZCA9IHRoaXMubnVtUm93cygpfSA9IG9wdGlvbnM7XG4gICAgY29uc3QgZW5kUm93ID0gTWF0aC5taW4odGhpcy5udW1Sb3dzKCksIGVuZCk7XG5cbiAgICBjb25zdCB0U2hhcmVkUm93ID0gRGF0YVJvdy5jcmVhdGVTaGFyZWRSb3coc2hhcmVkUm93KTtcblxuICAgIGNvbnN0IG91dCA9IFtdO1xuICAgIGZvciAobGV0IHJvd0luZGV4ID0gc3RhcnQ7IHJvd0luZGV4IDwgZW5kUm93OyArK3Jvd0luZGV4KSB7XG4gICAgICBjb25zdCByb3cgPSB0aGlzLnJvdyhyb3dJbmRleCwgdFNoYXJlZFJvdyk7XG4gICAgICBvdXQucHVzaChmdW5jKHJvdywgcm93SW5kZXgpKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuXG4gIG1hcEluZGV4KGZ1bmMsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHtzdGFydCA9IDAsIGVuZCA9IHRoaXMubnVtUm93cygpfSA9IG9wdGlvbnM7XG4gICAgY29uc3QgZW5kUm93ID0gTWF0aC5taW4odGhpcy5udW1Sb3dzKCksIGVuZCk7XG5cbiAgICBjb25zdCBvdXQgPSBbXTtcbiAgICBmb3IgKGxldCByb3dJbmRleCA9IHN0YXJ0OyByb3dJbmRleCA8IGVuZFJvdzsgKytyb3dJbmRleCkge1xuICAgICAgb3V0LnB1c2goZnVuYyh7aW5kZXg6IHRoaXMuX21hcHBlZFJvd0luZGV4KHJvd0luZGV4KX0sIHRoaXMuX3BhcmVudERhdGFDb250YWluZXIpKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuXG4gIGZpbmQoZnVuYywgc2hhcmVkUm93KSB7XG4gICAgY29uc3QgdFNoYXJlZFJvdyA9IERhdGFSb3cuY3JlYXRlU2hhcmVkUm93KHNoYXJlZFJvdyk7XG5cbiAgICBmb3IgKGxldCByb3dJbmRleCA9IDA7IHJvd0luZGV4IDwgdGhpcy5udW1Sb3dzKCk7ICsrcm93SW5kZXgpIHtcbiAgICAgIGNvbnN0IHJvdyA9IHRoaXMucm93KHJvd0luZGV4LCB0U2hhcmVkUm93KTtcbiAgICAgIGlmIChmdW5jKHJvdywgcm93SW5kZXgpKSB7XG4gICAgICAgIHJldHVybiByb3c7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICByZWR1Y2UoZnVuYywgaW5pdGlhbFZhbHVlLCBzaGFyZWRSb3cpIHtcbiAgICBjb25zdCB0U2hhcmVkUm93ID0gRGF0YVJvdy5jcmVhdGVTaGFyZWRSb3coc2hhcmVkUm93KTtcblxuICAgIGZvciAobGV0IHJvd0luZGV4ID0gMDsgcm93SW5kZXggPCB0aGlzLl9pbmRpY2VzLmxlbmd0aDsgKytyb3dJbmRleCkge1xuICAgICAgY29uc3Qgcm93ID0gdGhpcy5yb3cocm93SW5kZXgsIHRTaGFyZWRSb3cpO1xuICAgICAgaW5pdGlhbFZhbHVlID0gZnVuYyhpbml0aWFsVmFsdWUsIHJvdywgcm93SW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gaW5pdGlhbFZhbHVlO1xuICB9XG59XG4iXX0=