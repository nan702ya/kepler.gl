"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSkLevelPolygonData = getSkLevelPolygonData;
exports.getGeojsonDataMaps = getGeojsonDataMaps;
exports.parseGeometryFromString = parseGeometryFromString;
exports.getGeojsonBounds = getGeojsonBounds;
exports.getValueAggrFunc = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _wellknown = _interopRequireDefault(require("wellknown"));

var _aggregateUtils = require("../../utils/aggregate-utils");

var _geojsonNormalize = _interopRequireDefault(require("@mapbox/geojson-normalize"));

var _bbox = _interopRequireDefault(require("@turf/bbox"));

var _processors = _interopRequireDefault(require("../../processors"));

var _p = _interopRequireDefault(require("./p1-100.csv"));

var _p2 = _interopRequireDefault(require("./p2-100.csv"));

var _p3 = _interopRequireDefault(require("./p3-100.csv"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var getValueAggrFunc = function getValueAggrFunc(field, aggregation, defaultValue) {
  return function (d) {
    return field ? d.properties.filteredIndex.length > 0 ? Math.max((0, _aggregateUtils.aggregate)(d.properties.filteredIndex.map(function (i) {
      return field.valueAccessor(i);
    }), aggregation), defaultValue) : defaultValue : defaultValue;
  };
};

exports.getValueAggrFunc = getValueAggrFunc;

function getSkLevelPolygonData(code) {
  var polygonData = null;

  if (Number.isInteger(code)) {
    if (code < 100) {
      polygonData = _processors["default"].processCsvData(_p["default"]);
    } else if (code < 100000) {
      polygonData = _processors["default"].processCsvData(_p2["default"]);
    } else {
      polygonData = _processors["default"].processCsvData(_p3["default"]);
    }
  }

  return polygonData;
}
/**
 * Parse raw data to GeoJson feature
 * @param dataContainer
 * @param getFeature
 * @returns {{}}
 */


function getGeojsonDataMaps(dataContainer, getCode) {
  var acceptableTypes = ['Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon', 'GeometryCollection'];
  var dataToFeature = [];
  var codeToData = {};
  var index = 0;
  var skPolygon = getSkLevelPolygonData(getCode({
    index: index
  }));

  if (!skPolygon) {
    return null;
  }

  var codeIndexes = {};
  var code;

  for (index = 0; index < dataContainer.numRows(); index++) {
    code = getCode({
      index: index
    });

    if (!codeIndexes[code]) {
      codeIndexes[code] = [];
    }

    codeIndexes[code].push({
      index: index
    });
  }

  var _iterator = _createForOfIteratorHelper(skPolygon.rows),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var rawFeature = _step.value;
      var feature = parseGeometryFromString(rawFeature[0]);

      if (feature && feature.geometry && acceptableTypes.includes(feature.geometry.type)) {
        var _codeIndexes$rawFeatu;

        var cleaned = _objectSpread(_objectSpread({}, feature), {}, {
          properties: {
            code: rawFeature[1],
            enName: rawFeature[2],
            krName: rawFeature[3],
            filteredIndex: (_codeIndexes$rawFeatu = codeIndexes[rawFeature[1]]) !== null && _codeIndexes$rawFeatu !== void 0 ? _codeIndexes$rawFeatu : null
          }
        });

        dataToFeature.push(cleaned);
        codeToData[rawFeature[1]] = dataToFeature.length - 1;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return [dataToFeature, codeToData];
}
/**
 * Parse geojson from string
 * @param {String} geoString
 * @returns {null | Object} geojson object or null if failed
 */


function parseGeometryFromString(geoString) {
  var parsedGeo;

  try {
    parsedGeo = (0, _wellknown["default"])(geoString);
  } catch (e) {
    return null;
  }

  if (!parsedGeo) {
    return null;
  }

  var normalized = (0, _geojsonNormalize["default"])(parsedGeo);

  if (!normalized || !Array.isArray(normalized.features)) {
    // fail to normalize geojson
    return null;
  }

  return normalized.features[0];
}

function getGeojsonBounds() {
  var features = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 70 ms for 10,000 polygons
  // here we only pick couple
  var maxCount = 10000;
  var samples = features.length > maxCount ? getSampleData(features, maxCount) : features;
  var nonEmpty = samples.filter(function (d) {
    return d && d.geometry && d.geometry.coordinates && d.geometry.coordinates.length;
  });

  try {
    return (0, _bbox["default"])({
      type: 'FeatureCollection',
      features: nonEmpty
    });
  } catch (e) {
    return null;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvc2stbGF5ZXIvc2stdXRpbHMuanMiXSwibmFtZXMiOlsiZ2V0VmFsdWVBZ2dyRnVuYyIsImZpZWxkIiwiYWdncmVnYXRpb24iLCJkZWZhdWx0VmFsdWUiLCJkIiwicHJvcGVydGllcyIsImZpbHRlcmVkSW5kZXgiLCJsZW5ndGgiLCJNYXRoIiwibWF4IiwibWFwIiwiaSIsInZhbHVlQWNjZXNzb3IiLCJnZXRTa0xldmVsUG9seWdvbkRhdGEiLCJjb2RlIiwicG9seWdvbkRhdGEiLCJOdW1iZXIiLCJpc0ludGVnZXIiLCJQcm9jZXNzb3JzIiwicHJvY2Vzc0NzdkRhdGEiLCJzaWRvIiwic2lndW5ndSIsImRvbmciLCJnZXRHZW9qc29uRGF0YU1hcHMiLCJkYXRhQ29udGFpbmVyIiwiZ2V0Q29kZSIsImFjY2VwdGFibGVUeXBlcyIsImRhdGFUb0ZlYXR1cmUiLCJjb2RlVG9EYXRhIiwiaW5kZXgiLCJza1BvbHlnb24iLCJjb2RlSW5kZXhlcyIsIm51bVJvd3MiLCJwdXNoIiwicm93cyIsInJhd0ZlYXR1cmUiLCJmZWF0dXJlIiwicGFyc2VHZW9tZXRyeUZyb21TdHJpbmciLCJnZW9tZXRyeSIsImluY2x1ZGVzIiwidHlwZSIsImNsZWFuZWQiLCJlbk5hbWUiLCJrck5hbWUiLCJnZW9TdHJpbmciLCJwYXJzZWRHZW8iLCJlIiwibm9ybWFsaXplZCIsIkFycmF5IiwiaXNBcnJheSIsImZlYXR1cmVzIiwiZ2V0R2VvanNvbkJvdW5kcyIsIm1heENvdW50Iiwic2FtcGxlcyIsImdldFNhbXBsZURhdGEiLCJub25FbXB0eSIsImZpbHRlciIsImNvb3JkaW5hdGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVPLElBQU1BLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQ0MsS0FBRCxFQUFRQyxXQUFSLEVB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Q0csUUFBWCxDQUFvQixDQUFwQixDQUFQO0FBQ0Q7O0FBRU0sU0FBU0MsZ0JBQVQsR0FBeUM7QUFBQSxNQUFmRCxRQUFlLHVFQUFKLEVBQUk7QUFDOUM7QUFDQTtBQUNBLE1BQU1FLFFBQVEsR0FBRyxLQUFqQjtBQUNBLE1BQU1DLE9BQU8sR0FBR0gsUUFBUSxDQUFDM0MsTUFBVCxHQUFrQjZDLFFBQWxCLEdBQTZCRSxhQUFhLENBQUNKLFFBQUQsRUFBV0UsUUFBWCxDQUExQyxHQUFpRUYsUUFBakY7QUFFQSxNQUFNSyxRQUFRLEdBQUdGLE9BQU8sQ0FBQ0csTUFBUixDQUNmLFVBQUFwRCxDQUFDO0FBQUEsV0FBSUEsQ0FBQyxJQUFJQSxDQUFDLENBQUNrQyxRQUFQLElBQW1CbEMsQ0FBQyxDQUFDa0MsUUFBRixDQUFXbUIsV0FBOUIsSUFBNkNyRCxDQUFDLENBQUNrQyxRQUFGLENBQVdtQixXQUFYLENBQXVCbEQsTUFBeEU7QUFBQSxHQURjLENBQWpCOztBQUlBLE1BQUk7QUFDRixXQUFPLHNCQUFLO0FBQ1ZpQyxNQUFBQSxJQUFJLEVBQUUsbUJBREk7QUFFVlUsTUFBQUEsUUFBUSxFQUFFSztBQUZBLEtBQUwsQ0FBUDtBQUlELEdBTEQsQ0FLRSxPQUFPVCxDQUFQLEVBQVU7QUFDVixXQUFPLElBQVA7QUFDRDtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIxIFNLIFRlbGVjb20sIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgd2t0UGFyc2VyIGZyb20gJ3dlbGxrbm93bic7XG5pbXBvcnQge2FnZ3JlZ2F0ZX0gZnJvbSAndXRpbHMvYWdncmVnYXRlLXV0aWxzJ1xuaW1wb3J0IG5vcm1hbGl6ZSBmcm9tICdAbWFwYm94L2dlb2pzb24tbm9ybWFsaXplJztcbmltcG9ydCBiYm94IGZyb20gJ0B0dXJmL2Jib3gnO1xuaW1wb3J0IFByb2Nlc3NvcnMgZnJvbSAnLi4vLi4vcHJvY2Vzc29ycyc7XG5pbXBvcnQgc2lkbyBmcm9tICcuL3AxLTEwMC5jc3YnXG5pbXBvcnQgc2lndW5ndSBmcm9tICcuL3AyLTEwMC5jc3YnXG5pbXBvcnQgZG9uZyBmcm9tICcuL3AzLTEwMC5jc3YnXG5cbmV4cG9ydCBjb25zdCBnZXRWYWx1ZUFnZ3JGdW5jID0gKGZpZWxkLCBhZ2dyZWdhdGlvbiwgZGVmYXVsdFZhbHVlKSA9PiB7XG4gIHJldHVybiBkID0+IHtcbiAgICByZXR1cm4gZmllbGRcbiAgICAgID8gZC5wcm9wZXJ0aWVzLmZpbHRlcmVkSW5kZXgubGVuZ3RoID4gMFxuICAgICAgICA/IE1hdGgubWF4KGFnZ3JlZ2F0ZShcbiAgICAgICAgICBkLnByb3BlcnRpZXMuZmlsdGVyZWRJbmRleC5tYXAoaSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZmllbGQudmFsdWVBY2Nlc3NvcihpKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBhZ2dyZWdhdGlvbiksIGRlZmF1bHRWYWx1ZSlcbiAgICAgICAgOiBkZWZhdWx0VmFsdWVcbiAgICAgIDogZGVmYXVsdFZhbHVlO1xuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNrTGV2ZWxQb2x5Z29uRGF0YShjb2RlKSB7XG4gIGxldCBwb2x5Z29uRGF0YSA9IG51bGw7XG4gIGlmIChOdW1iZXIuaXNJbnRlZ2VyKGNvZGUpKSB7XG4gICAgaWYgKGNvZGUgPCAxMDApIHtcbiAgICAgIHBvbHlnb25EYXRhID0gUHJvY2Vzc29ycy5wcm9jZXNzQ3N2RGF0YShzaWRvKTtcbiAgICB9IGVsc2UgaWYgKGNvZGUgPCAxMDAwMDApIHtcbiAgICAgIHBvbHlnb25EYXRhID0gUHJvY2Vzc29ycy5wcm9jZXNzQ3N2RGF0YShzaWd1bmd1KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9seWdvbkRhdGEgPSBQcm9jZXNzb3JzLnByb2Nlc3NDc3ZEYXRhKGRvbmcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwb2x5Z29uRGF0YTtcbn1cblxuLyoqXG4gKiBQYXJzZSByYXcgZGF0YSB0byBHZW9Kc29uIGZlYXR1cmVcbiAqIEBwYXJhbSBkYXRhQ29udGFpbmVyXG4gKiBAcGFyYW0gZ2V0RmVhdHVyZVxuICogQHJldHVybnMge3t9fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0R2VvanNvbkRhdGFNYXBzKGRhdGFDb250YWluZXIsIGdldENvZGUpIHtcbiAgY29uc3QgYWNjZXB0YWJsZVR5cGVzID0gW1xuICAgICdQb2ludCcsXG4gICAgJ011bHRpUG9pbnQnLFxuICAgICdMaW5lU3RyaW5nJyxcbiAgICAnTXVsdGlMaW5lU3RyaW5nJyxcbiAgICAnUG9seWdvbicsXG4gICAgJ011bHRpUG9seWdvbicsXG4gICAgJ0dlb21ldHJ5Q29sbGVjdGlvbidcbiAgXTtcblxuICBjb25zdCBkYXRhVG9GZWF0dXJlID0gW107XG4gIGNvbnN0IGNvZGVUb0RhdGEgPSB7fTtcblxuICBsZXQgaW5kZXggPSAwO1xuICBjb25zdCBza1BvbHlnb24gPSBnZXRTa0xldmVsUG9seWdvbkRhdGEoZ2V0Q29kZSh7aW5kZXh9KSk7XG5cbiAgaWYgKCFza1BvbHlnb24pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBcbiAgY29uc3QgY29kZUluZGV4ZXMgPSB7fVxuICBsZXQgY29kZTtcbiAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgZGF0YUNvbnRhaW5lci5udW1Sb3dzKCk7IGluZGV4KyspIHtcbiAgICBjb2RlID0gZ2V0Q29kZSh7aW5kZXh9KTtcbiAgICBpZiAoIWNvZGVJbmRleGVzW2NvZGVdKSB7XG4gICAgICBjb2RlSW5kZXhlc1tjb2RlXSA9IFtdO1xuICAgIH0gIFxuICAgIGNvZGVJbmRleGVzW2NvZGVdLnB1c2goe2luZGV4fSk7XG4gIH1cblxuICBmb3IgKGxldCByYXdGZWF0dXJlIG9mIHNrUG9seWdvbi5yb3dzKSB7XG4gICAgY29uc3QgZmVhdHVyZSA9IHBhcnNlR2VvbWV0cnlGcm9tU3RyaW5nKHJhd0ZlYXR1cmVbMF0pO1xuXG4gICAgaWYgKGZlYXR1cmUgJiYgZmVhdHVyZS5nZW9tZXRyeSAmJiBhY2NlcHRhYmxlVHlwZXMuaW5jbHVkZXMoZmVhdHVyZS5nZW9tZXRyeS50eXBlKSkge1xuICAgICAgY29uc3QgY2xlYW5lZCA9IHtcbiAgICAgICAgLi4uZmVhdHVyZSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIGNvZGU6IHJhd0ZlYXR1cmVbMV0sXG4gICAgICAgICAgZW5OYW1lOiByYXdGZWF0dXJlWzJdLFxuICAgICAgICAgIGtyTmFtZTogcmF3RmVhdHVyZVszXSxcbiAgICAgICAgICBmaWx0ZXJlZEluZGV4OiBjb2RlSW5kZXhlc1tyYXdGZWF0dXJlWzFdXSA/PyBudWxsXG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGRhdGFUb0ZlYXR1cmUucHVzaChjbGVhbmVkKTtcbiAgICAgIGNvZGVUb0RhdGFbcmF3RmVhdHVyZVsxXV0gPSBkYXRhVG9GZWF0dXJlLmxlbmd0aC0xO1xuICAgIH1cbiAgfVxuXG4gIFxuXG4gIHJldHVybiBbZGF0YVRvRmVhdHVyZSwgY29kZVRvRGF0YV07XG59XG5cbi8qKlxuICogUGFyc2UgZ2VvanNvbiBmcm9tIHN0cmluZ1xuICogQHBhcmFtIHtTdHJpbmd9IGdlb1N0cmluZ1xuICogQHJldHVybnMge251bGwgfCBPYmplY3R9IGdlb2pzb24gb2JqZWN0IG9yIG51bGwgaWYgZmFpbGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUdlb21ldHJ5RnJvbVN0cmluZyhnZW9TdHJpbmcpIHtcbiAgbGV0IHBhcnNlZEdlbztcblxuICB0cnkge1xuICAgIHBhcnNlZEdlbyA9IHdrdFBhcnNlcihnZW9TdHJpbmcpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKCFwYXJzZWRHZW8pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemUocGFyc2VkR2VvKTtcblxuICBpZiAoIW5vcm1hbGl6ZWQgfHwgIUFycmF5LmlzQXJyYXkobm9ybWFsaXplZC5mZWF0dXJlcykpIHtcbiAgICAvLyBmYWlsIHRvIG5vcm1hbGl6ZSBnZW9qc29uXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gbm9ybWFsaXplZC5mZWF0dXJlc1swXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEdlb2pzb25Cb3VuZHMoZmVhdHVyZXMgPSBbXSkge1xuICAvLyA3MCBtcyBmb3IgMTAsMDAwIHBvbHlnb25zXG4gIC8vIGhlcmUgd2Ugb25seSBwaWNrIGNvdXBsZVxuICBjb25zdCBtYXhDb3VudCA9IDEwMDAwO1xuICBjb25zdCBzYW1wbGVzID0gZmVhdHVyZXMubGVuZ3RoID4gbWF4Q291bnQgPyBnZXRTYW1wbGVEYXRhKGZlYXR1cmVzLCBtYXhDb3VudCkgOiBmZWF0dXJlcztcblxuICBjb25zdCBub25FbXB0eSA9IHNhbXBsZXMuZmlsdGVyKFxuICAgIGQgPT4gZCAmJiBkLmdlb21ldHJ5ICYmIGQuZ2VvbWV0cnkuY29vcmRpbmF0ZXMgJiYgZC5nZW9tZXRyeS5jb29yZGluYXRlcy5sZW5ndGhcbiAgKTtcblxuICB0cnkge1xuICAgIHJldHVybiBiYm94KHtcbiAgICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICBmZWF0dXJlczogbm9uRW1wdHlcbiAgICB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59Il19