"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TableSection = exports.Container = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactVirtualized = require("react-virtualized");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _reselect = require("reselect");

var _lodash = _interopRequireDefault(require("lodash.get"));

var _lodash2 = _interopRequireDefault(require("lodash.debounce"));

var _optionDropdown = _interopRequireDefault(require("./option-dropdown"));

var _grid = _interopRequireDefault(require("./grid"));

var _button = _interopRequireDefault(require("./button"));

var _icons = require("../icons");

var _dataUtils = require("../../../utils/data-utils");

var _cellSize = require("./cell-size");

var _defaultSettings = require("../../../constants/default-settings");

var _fieldToken = _interopRequireDefault(require("../field-token"));

var _fieldToAlignRight, _templateObject;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var defaultHeaderRowHeight = 55;
var defaultRowHeight = 32;
var overscanColumnCount = 10;
var overscanRowCount = 10;
var fieldToAlignRight = (_fieldToAlignRight = {}, (0, _defineProperty2["default"])(_fieldToAlignRight, _defaultSettings.ALL_FIELD_TYPES.integer, true), (0, _defineProperty2["default"])(_fieldToAlignRight, _defaultSettings.ALL_FIELD_TYPES.real, true), _fieldToAlignRight);

var Container = _styledComponents["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  font-size: 11px;\n  flex-grow: 1;\n  color: ", ";\n  width: 100%;\n\n  .ReactVirtualized__Grid:focus,\n  .ReactVirtualized__Grid:active {\n    outline: 0;\n  }\n\n  .cell {\n    &::-webkit-scrollbar {\n      display: none;\n    }\n  }\n\n  *:focus {\n    outline: 0;\n  }\n\n  .results-table-wrapper {\n    position: relative;\n    min-height: 100%;\n    max-height: 100%;\n    display: flex;\n    flex-direction: row;\n    flex-grow: 1;\n    overflow: hidden;\n    border-top: none;\n\n    .scroll-in-ui-thread::after {\n      content: '';\n      height: 100%;\n      left: 0;\n      position: absolute;\n      pointer-events: none;\n      top: 0;\n      width: 100%;\n    }\n\n    .grid-row {\n      position: relative;\n      display: flex;\n      flex-direction: row;\n    }\n    .grid-column {\n      display: flex;\n      flex-direction: column;\n      flex: 1 1 auto;\n    }\n    .pinned-grid-container {\n      flex: 0 0 75px;\n      z-index: 10;\n      position: absolute;\n      left: 0;\n      top: 0;\n      border-right: 2px solid ", ";\n    }\n\n    .header-grid {\n      overflow: hidden !important;\n    }\n\n    .even-row {\n      background-color: ", ";\n    }\n    .odd-row {\n      background-color: ", ";\n    }\n    .cell,\n    .header-cell {\n      width: 100%;\n      height: 100%;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: flex-start;\n      text-align: center;\n      overflow: hidden;\n\n      .n-sort-idx {\n        font-size: 9px;\n      }\n    }\n    .cell {\n      border-bottom: 1px solid ", ";\n      border-right: 1px solid ", ";\n      white-space: nowrap;\n      overflow: auto;\n      padding: 0 ", "px;\n      font-size: ", "px;\n\n      .result-link {\n        text-decoration: none;\n      }\n    }\n    .cell.end-cell,\n    .header-cell.end-cell {\n      border-right: none;\n      padding-right: ", "px;\n    }\n    .cell.first-cell,\n    .header-cell.first-cell {\n      padding-left: ", "px;\n    }\n    .cell.bottom-cell {\n      border-bottom: none;\n    }\n    .cell.align-right {\n      align-items: flex-end;\n    }\n    .header-cell {\n      border-bottom: 1px solid ", ";\n      border-top: 1px solid ", ";\n      padding-top: ", "px;\n      padding-right: 0;\n      padding-bottom: ", "px;\n      padding-left: ", "px;\n      align-items: center;\n      justify-content: space-between;\n      display: flex;\n      flex-direction: row;\n      background-color: ", ";\n\n      &:hover {\n        .more {\n          color: ", ";\n        }\n      }\n      .n-sort-idx {\n        font-size: 9px;\n      }\n      .details {\n        font-weight: 500;\n        display: flex;\n        flex-direction: column;\n        justify-content: flex-start;\n        height: 100%;\n        overflow: hidden;\n        flex-grow: 1;\n\n        .col-name {\n          display: flex;\n          align-items: center;\n          justify-content: space-between;\n          cursor: pointer;\n\n          .col-name__left {\n            display: flex;\n            align-items: center;\n            overflow: hidden;\n            svg {\n              margin-left: 6px;\n            }\n          }\n          .col-name__name {\n            overflow: hidden;\n            white-space: nowrap;\n          }\n        }\n      }\n\n      .more {\n        color: transparent;\n        margin-left: 5px;\n      }\n    }\n  }\n\n  :focus {\n    outline: none;\n  }\n"])), function (props) {
  return props.theme.dataTableTextColor;
}, function (props) {
  return props.theme.pinnedGridBorderColor;
}, function (props) {
  return props.theme.evenRowBackground;
}, function (props) {
  return props.theme.oddRowBackground;
}, function (props) {
  return props.theme.cellBorderColor;
}, function (props) {
  return props.theme.cellBorderColor;
}, function (props) {
  return props.theme.cellPaddingSide;
}, function (props) {
  return props.theme.cellFontSize;
}, function (props) {
  return props.theme.cellPaddingSide + props.theme.edgeCellPaddingSide;
}, function (props) {
  return props.theme.cellPaddingSide + props.theme.edgeCellPaddingSide;
}, function (props) {
  return props.theme.headerCellBorderColor;
}, function (props) {
  return props.theme.headerCellBorderColor;
}, function (props) {
  return props.theme.headerPaddingTop;
}, function (props) {
  return props.theme.headerPaddingBottom;
}, function (props) {
  return props.theme.cellPaddingSide;
}, function (props) {
  return props.theme.headerCellBackground;
}, function (props) {
  return props.theme.headerCellIconColor;
});

exports.Container = Container;
var defaultColumnWidth = 200;

var columnWidthFunction = function columnWidthFunction(columns, cellSizeCache, ghost) {
  return function (_ref) {
    var index = _ref.index;
    return (columns[index] || {}).ghost ? ghost : cellSizeCache[columns[index]] || defaultColumnWidth;
  };
};
/*
 * This is an accessor method used to generalize getting a cell from a data row
 */


var getRowCell = function getRowCell(_ref2) {
  var dataContainer = _ref2.dataContainer,
      columns = _ref2.columns,
      column = _ref2.column,
      colMeta = _ref2.colMeta,
      rowIndex = _ref2.rowIndex,
      sortOrder = _ref2.sortOrder;
  var rowIdx = sortOrder && sortOrder.length ? (0, _lodash["default"])(sortOrder, rowIndex) : rowIndex;
  var type = colMeta[column].type;
  var value = dataContainer.valueAt(rowIdx, columns.indexOf(column));
  if (value === undefined) value = 'Err';
  return (0, _dataUtils.parseFieldValue)(value, type);
};

var TableSection = function TableSection(_ref3) {
  var classList = _ref3.classList,
      isPinned = _ref3.isPinned,
      columns = _ref3.columns,
      headerGridProps = _ref3.headerGridProps,
      fixedWidth = _ref3.fixedWidth,
      _ref3$fixedHeight = _ref3.fixedHeight,
      fixedHeight = _ref3$fixedHeight === void 0 ? undefined : _ref3$fixedHeight,
      onScroll = _ref3.onScroll,
      scrollTop = _ref3.scrollTop,
      dataGridProps = _ref3.dataGridProps,
      columnWidth = _ref3.columnWidth,
      setGridRef = _ref3.setGridRef,
      headerCellRender = _ref3.headerCellRender,
      dataCellRender = _ref3.dataCellRender,
      _ref3$scrollLeft = _ref3.scrollLeft,
      scrollLeft = _ref3$scrollLeft === void 0 ? undefined : _ref3$scrollLeft;
  return /*#__PURE__*/_react["default"].createElement(_reactVirtualized.AutoSizer, null, function (_ref4) {
    var width = _ref4.width,
        height = _ref4.height;
    var gridDimension = {
      columnCount: columns.length,
      columnWidth: columnWidth,
      width: fixedWidth || width
    };
    var dataGridHeight = fixedHeight || height;
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames3["default"])('scroll-in-ui-thread', classList.header)
    }, /*#__PURE__*/_react["default"].createElement(_grid["default"], (0, _extends2["default"])({
      cellRenderer: headerCellRender
    }, headerGridProps, gridDimension, {
      scrollLeft: scrollLeft
    }))), /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames3["default"])('scroll-in-ui-thread', classList.rows),
      style: {
        top: headerGridProps.height
      }
    }, /*#__PURE__*/_react["default"].createElement(_grid["default"], (0, _extends2["default"])({
      cellRenderer: dataCellRender
    }, dataGridProps, gridDimension, {
      className: isPinned ? 'pinned-grid' : 'body-grid',
      height: dataGridHeight - headerGridProps.height,
      onScroll: onScroll,
      scrollTop: scrollTop,
      setGridRef: setGridRef
    }))));
  });
};

exports.TableSection = TableSection;
DataTableFactory.deps = [_fieldToken["default"]];

function DataTableFactory(FieldToken) {
  var DataTable = /*#__PURE__*/function (_Component) {
    (0, _inherits2["default"])(DataTable, _Component);

    var _super = _createSuper(DataTable);

    function DataTable() {
      var _this;

      (0, _classCallCheck2["default"])(this, DataTable);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
        cellSizeCache: {},
        moreOptionsColumn: null
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "root", /*#__PURE__*/(0, _react.createRef)());
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "columns", function (props) {
        return props.columns;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "pinnedColumns", function (props) {
        return props.pinnedColumns;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "unpinnedColumns", (0, _reselect.createSelector)(_this.columns, _this.pinnedColumns, function (columns, pinnedColumns) {
        return !Array.isArray(pinnedColumns) ? columns : columns.filter(function (c) {
          return !pinnedColumns.includes(c);
        });
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "toggleMoreOptions", function (moreOptionsColumn) {
        return _this.setState({
          moreOptionsColumn: _this.state.moreOptionsColumn === moreOptionsColumn ? null : moreOptionsColumn
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getCellSizeCache", function () {
        var _this$props = _this.props,
            propsCache = _this$props.cellSizeCache,
            fixedWidth = _this$props.fixedWidth,
            pinnedColumns = _this$props.pinnedColumns;

        var unpinnedColumns = _this.unpinnedColumns(_this.props);

        var width = fixedWidth ? fixedWidth : _this.root.current ? _this.root.current.clientWidth : 0; // pin column border is 2 pixel vs 1 pixel

        var adjustWidth = pinnedColumns.length ? width - 1 : width;

        var _adjustCellsToContain = (0, _cellSize.adjustCellsToContainer)(adjustWidth, propsCache, pinnedColumns, unpinnedColumns),
            cellSizeCache = _adjustCellsToContain.cellSizeCache,
            ghost = _adjustCellsToContain.ghost;

        return {
          cellSizeCache: cellSizeCache,
          ghost: ghost
        };
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "doScaleCellsToWidth", function () {
        _this.setState(_this.getCellSizeCache());
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "scaleCellsToWidth", (0, _lodash2["default"])(_this.doScaleCellsToWidth, 300));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderHeaderCell", function (columns, isPinned, props, toggleMoreOptions, moreOptionsColumn, TokenComponent) {
        // eslint-disable-next-line react/display-name
        return function (cellInfo) {
          var _classnames;

          var columnIndex = cellInfo.columnIndex,
              key = cellInfo.key,
              style = cellInfo.style;
          var colMeta = props.colMeta,
              sortColumn = props.sortColumn,
              _sortTableColumn = props.sortTableColumn,
              _pinTableColumn = props.pinTableColumn,
              _copyTableColumn = props.copyTableColumn;
          var column = columns[columnIndex];
          var isGhost = column.ghost;
          var isSorted = sortColumn[column];
          var firstCell = columnIndex === 0;
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: (0, _classnames3["default"])('header-cell', (_classnames = {}, (0, _defineProperty2["default"])(_classnames, "column-".concat(columnIndex), true), (0, _defineProperty2["default"])(_classnames, 'pinned-header-cell', isPinned), (0, _defineProperty2["default"])(_classnames, 'first-cell', firstCell), _classnames)),
            key: key,
            style: style,
            onClick: function onClick(e) {
              e.shiftKey ? _sortTableColumn(column) : null;
            },
            onDoubleClick: function onDoubleClick() {
              return _sortTableColumn(column);
            },
            title: column
          }, isGhost ? /*#__PURE__*/_react["default"].createElement("div", null) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("section", {
            className: "details"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "col-name"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "col-name__left"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "col-name__name"
          }, colMeta[column].name), /*#__PURE__*/_react["default"].createElement(_button["default"], {
            className: "col-name__sort",
            onClick: function onClick() {
              return _sortTableColumn(column);
            }
          }, isSorted ? isSorted === _defaultSettings.SORT_ORDER.ASCENDING ? /*#__PURE__*/_react["default"].createElement(_icons.ArrowUp, {
            height: "14px"
          }) : /*#__PURE__*/_react["default"].createElement(_icons.ArrowDown, {
            height: "14px"
          }) : null)), /*#__PURE__*/_react["default"].createElement(_button["default"], {
            className: "more",
            onClick: function onClick() {
              return toggleMoreOptions(column);
            }
          }, /*#__PURE__*/_react["default"].createElement(_icons.VertThreeDots, {
            height: "14px"
          }))), /*#__PURE__*/_react["default"].createElement(FieldToken, {
            type: colMeta[column].type
          })), /*#__PURE__*/_react["default"].createElement("section", {
            className: "options"
          }, /*#__PURE__*/_react["default"].createElement(_optionDropdown["default"], {
            isOpened: moreOptionsColumn === column,
            type: colMeta[column].type,
            column: column,
            toggleMoreOptions: toggleMoreOptions,
            sortTableColumn: function sortTableColumn(mode) {
              return _sortTableColumn(column, mode);
            },
            sortMode: sortColumn && sortColumn[column],
            pinTableColumn: function pinTableColumn() {
              return _pinTableColumn(column);
            },
            copyTableColumn: function copyTableColumn() {
              return _copyTableColumn(column);
            },
            isSorted: isSorted,
            isPinned: isPinned
          }))));
        };
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderDataCell", function (columns, isPinned, props) {
        return function (cellInfo) {
          var _classnames2;

          var columnIndex = cellInfo.columnIndex,
              key = cellInfo.key,
              style = cellInfo.style,
              rowIndex = cellInfo.rowIndex;
          var dataContainer = props.dataContainer,
              colMeta = props.colMeta;
          var column = columns[columnIndex];
          var isGhost = column.ghost;
          var rowCell = isGhost ? '' : getRowCell(_objectSpread(_objectSpread({}, props), {}, {
            column: column,
            rowIndex: rowIndex
          }));
          var type = isGhost ? null : colMeta[column].type;
          var lastRowIndex = dataContainer ? dataContainer.numRows() - 1 : 0;
          var endCell = columnIndex === columns.length - 1;
          var firstCell = columnIndex === 0;
          var bottomCell = rowIndex === lastRowIndex;
          var alignRight = fieldToAlignRight[type];

          var cell = /*#__PURE__*/_react["default"].createElement("div", {
            className: (0, _classnames3["default"])('cell', (_classnames2 = {}, (0, _defineProperty2["default"])(_classnames2, rowIndex % 2 === 0 ? 'even-row' : 'odd-row', true), (0, _defineProperty2["default"])(_classnames2, "row-".concat(rowIndex), true), (0, _defineProperty2["default"])(_classnames2, 'pinned-cell', isPinned), (0, _defineProperty2["default"])(_classnames2, 'first-cell', firstCell), (0, _defineProperty2["default"])(_classnames2, 'end-cell', endCell), (0, _defineProperty2["default"])(_classnames2, 'bottom-cell', bottomCell), (0, _defineProperty2["default"])(_classnames2, 'align-right', alignRight), _classnames2)),
            key: key,
            style: style,
            title: isGhost ? undefined : rowCell
          }, "".concat(rowCell).concat(endCell ? '\n' : '\t'));

          return cell;
        };
      });
      return _this;
    }

    (0, _createClass2["default"])(DataTable, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        window.addEventListener('resize', this.scaleCellsToWidth);
        this.scaleCellsToWidth();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (this.props.cellSizeCache !== prevProps.cellSizeCache || this.props.pinnedColumns !== prevProps.pinnedColumns) {
          this.scaleCellsToWidth();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        window.removeEventListener('resize', this.scaleCellsToWidth); // fix Warning: Can't perform a React state update on an unmounted component

        this.setState = function () {
          return;
        };
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props2 = this.props,
            dataContainer = _this$props2.dataContainer,
            pinnedColumns = _this$props2.pinnedColumns,
            _this$props2$theme = _this$props2.theme,
            theme = _this$props2$theme === void 0 ? {} : _this$props2$theme,
            fixedWidth = _this$props2.fixedWidth,
            fixedHeight = _this$props2.fixedHeight;
        var unpinnedColumns = this.unpinnedColumns(this.props);
        var _this$state = this.state,
            cellSizeCache = _this$state.cellSizeCache,
            moreOptionsColumn = _this$state.moreOptionsColumn,
            ghost = _this$state.ghost;
        var unpinnedColumnsGhost = ghost ? [].concat((0, _toConsumableArray2["default"])(unpinnedColumns), [{
          ghost: true
        }]) : unpinnedColumns;
        var pinnedColumnsWidth = pinnedColumns.reduce(function (acc, val) {
          return acc + (0, _lodash["default"])(cellSizeCache, val, 0);
        }, 0);
        var hasPinnedColumns = Boolean(pinnedColumns.length);
        var _theme$headerRowHeigh = theme.headerRowHeight,
            headerRowHeight = _theme$headerRowHeigh === void 0 ? defaultHeaderRowHeight : _theme$headerRowHeigh,
            _theme$rowHeight = theme.rowHeight,
            rowHeight = _theme$rowHeight === void 0 ? defaultRowHeight : _theme$rowHeight;
        var headerGridProps = {
          cellSizeCache: cellSizeCache,
          className: 'header-grid',
          height: headerRowHeight,
          rowCount: 1,
          rowHeight: headerRowHeight
        };
        var dataGridProps = {
          cellSizeCache: cellSizeCache,
          overscanColumnCount: overscanColumnCount,
          overscanRowCount: overscanRowCount,
          rowCount: dataContainer ? dataContainer.numRows() : 0,
          rowHeight: rowHeight
        };
        return /*#__PURE__*/_react["default"].createElement(Container, {
          className: "data-table-container",
          ref: this.root
        }, Object.keys(cellSizeCache).length && /*#__PURE__*/_react["default"].createElement(_reactVirtualized.ScrollSync, null, function (_ref5) {
          var _onScroll = _ref5.onScroll,
              scrollLeft = _ref5.scrollLeft,
              scrollTop = _ref5.scrollTop;
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: "results-table-wrapper"
          }, hasPinnedColumns && /*#__PURE__*/_react["default"].createElement("div", {
            key: "pinned-columns",
            className: "pinned-columns grid-row"
          }, /*#__PURE__*/_react["default"].createElement(TableSection, {
            classList: {
              header: 'pinned-columns--header pinned-grid-container',
              rows: 'pinned-columns--rows pinned-grid-container'
            },
            isPinned: true,
            columns: pinnedColumns,
            headerGridProps: headerGridProps,
            fixedWidth: pinnedColumnsWidth,
            onScroll: function onScroll(args) {
              return _onScroll(_objectSpread(_objectSpread({}, args), {}, {
                scrollLeft: scrollLeft
              }));
            },
            scrollTop: scrollTop,
            dataGridProps: dataGridProps,
            setGridRef: function setGridRef(pinnedGrid) {
              return _this2.pinnedGrid = pinnedGrid;
            },
            columnWidth: columnWidthFunction(pinnedColumns, cellSizeCache),
            headerCellRender: _this2.renderHeaderCell(pinnedColumns, true, _this2.props, _this2.toggleMoreOptions, moreOptionsColumn),
            dataCellRender: _this2.renderDataCell(pinnedColumns, true, _this2.props)
          })), /*#__PURE__*/_react["default"].createElement("div", {
            key: "unpinned-columns",
            style: {
              marginLeft: "".concat(hasPinnedColumns ? "".concat(pinnedColumnsWidth, "px") : '0')
            },
            className: "unpinned-columns grid-column"
          }, /*#__PURE__*/_react["default"].createElement(TableSection, {
            classList: {
              header: 'unpinned-columns--header unpinned-grid-container',
              rows: 'unpinned-columns--rows unpinned-grid-container'
            },
            isPinned: false,
            columns: unpinnedColumnsGhost,
            headerGridProps: headerGridProps,
            fixedWidth: fixedWidth,
            fixedHeight: fixedHeight,
            onScroll: _onScroll,
            scrollTop: scrollTop,
            scrollLeft: scrollLeft,
            dataGridProps: dataGridProps,
            setGridRef: function setGridRef(unpinnedGrid) {
              return _this2.unpinnedGrid = unpinnedGrid;
            },
            columnWidth: columnWidthFunction(unpinnedColumnsGhost, cellSizeCache, ghost),
            headerCellRender: _this2.renderHeaderCell(unpinnedColumnsGhost, false, _this2.props, _this2.toggleMoreOptions, moreOptionsColumn),
            dataCellRender: _this2.renderDataCell(unpinnedColumnsGhost, false, _this2.props)
          })));
        }));
      }
    }]);
    return DataTable;
  }(_react.Component);

  (0, _defineProperty2["default"])(DataTable, "defaultProps", {
    dataContainer: null,
    pinnedColumns: [],
    colMeta: {},
    cellSizeCache: {},
    sortColumn: {},
    fixedWidth: null,
    fixedHeight: null,
    theme: {}
  });
  return (0, _styledComponents.withTheme)(DataTable);
}

var _default = DataTableFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9kYXRhLXRhYmxlL2luZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHRIZWFkZXJSb3dIZWlnaHQiLCJkZWZhdWx0Um93SGVpZ2h0Iiwib3ZlcnNjYW5Db2x1bW5Db3VudCIsIm92ZXJzY2FuUm93Q291bnQiLCJmaWVsZFRvQWxpZ25SaWdodCIsIkFMTF9GSUVMRF9UWVBFUyIsImludGVnZXIiLCJyZWFsIiwiQ29udGFpbmVyIiwic3R5bGVkIiwiZGl2IiwicHJvcHMiLCJ0aGVtZSIsImRhdGFUYWJsZVRleHRDb2xvciIsInBpbm5lZEdyaWRCb3JkZXJDb2xvciIsImV2ZW5Sb3dCYWNrZ3JvdW5kIiwib2RkUm93QmFja2dyb3VuZCIsImNlbGxCb3JkZXJDb2xvciIsImNlbGxQYWRkaW5nU2lkZSIsImNlbGxGb250U2l6ZSIsImVkZ2VDZWxsUGFkZGluZ1NpZGUiLCJoZWFkZXJDZWxsQm9yZGVyQ29sb3IiLCJoZWFkZXJQYWRkaW5nVG9wIiwiaGVhZGVyUGFkZGluZ0JvdHRvbSIsImhlYWRlckNlbGxCYWNrZ3JvdW5kIiwiaGVhZGVyQ2VsbEljb25Db2xvciIsImRlZmF1bHRDb2x1bW5XaWR0aCIsImNvbHVtbldpZHRoRnVuY3Rpb24iLCJjb2x1bW5zIiwiY2VsbFNpemVDYWNoZSIsImdob3N0IiwiaW5kZXgiLCJnZXRSb3dDZWxsIiwiZGF0YUNvbnRhaW5lciIsImNvbHVtbiIsImNvbE1ldGEiLCJyb3dJbmRleCIsInNvcnRPcmRlciIsInJvd0lkeCIsImxlbmd0aCIsInR5cGUiLCJ2YWx1ZSIsInZhbHVlQXQiLCJpbmRleE9mIiwidW5kZWZpbmVkIiwiVGFibGVTZWN0aW9uIiwiY2xhc3NMaXN0IiwiaXNQaW5uZWQiLCJoZWFkZXJHcmlkUHJvcHMiLCJmaXhlZFdpZHRoIiwiZml4ZWRIZWlnaHQiLCJvblNjcm9sbCIsInNjcm9sbFRvcCIsImRhdGFHcmlkUHJvcHMiLCJjb2x1bW5XaWR0aCIsInNldEdyaWRSZWYiLCJoZWFkZXJDZWxsUmVuZGVyIiwiZGF0YUNlbGxSZW5kZXIiLCJzY3JvbGxMZWZ0Iiwid2lkdGgiLCJoZWlnaHQiLCJncmlkRGltZW5zaW9uIiwiY29sdW1uQ291bnQiLCJkYXRhR3JpZEhlaWdodCIsImhlYWRlciIsInJvd3MiLCJ0b3AiLCJEYXRhVGFibGVGYWN0b3J5IiwiZGVwcyIsIkZpZWxkVG9rZW5GYWN0b3J5IiwiRmllbGRUb2tlbiIsIkRhdGFUYWJsZSIsIm1vcmVPcHRpb25zQ29sdW1uIiwicGlubmVkQ29sdW1ucyIsIkFycmF5IiwiaXNBcnJheSIsImZpbHRlciIsImMiLCJpbmNsdWRlcyIsInNldFN0YXRlIiwic3RhdGUiLCJwcm9wc0NhY2hlIiwidW5waW5uZWRDb2x1bW5zIiwicm9vdCIsImN1cnJlbnQiLCJjbGllbnRXaWR0aCIsImFkanVzdFdpZHRoIiwiZ2V0Q2VsbFNpemVDYWNoZSIsImRvU2NhbGVDZWxsc1RvV2lkdGgiLCJ0b2dnbGVNb3JlT3B0aW9ucyIsIlRva2VuQ29tcG9uZW50IiwiY2VsbEluZm8iLCJjb2x1bW5JbmRleCIsImtleSIsInN0eWxlIiwic29ydENvbHVtbiIsInNvcnRUYWJsZUNvbHVtbiIsInBpblRhYmxlQ29sdW1uIiwiY29weVRhYmxlQ29sdW1uIiwiaXNHaG9zdCIsImlzU29ydGVkIiwiZmlyc3RDZWxsIiwiZSIsInNoaWZ0S2V5IiwibmFtZSIsIlNPUlRfT1JERVIiLCJBU0NFTkRJTkciLCJtb2RlIiwicm93Q2VsbCIsImxhc3RSb3dJbmRleCIsIm51bVJvd3MiLCJlbmRDZWxsIiwiYm90dG9tQ2VsbCIsImFsaWduUmlnaHQiLCJjZWxsIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNjYWxlQ2VsbHNUb1dpZHRoIiwicHJldlByb3BzIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInVucGlubmVkQ29sdW1uc0dob3N0IiwicGlubmVkQ29sdW1uc1dpZHRoIiwicmVkdWNlIiwiYWNjIiwidmFsIiwiaGFzUGlubmVkQ29sdW1ucyIsIkJvb2xlYW4iLCJoZWFkZXJSb3dIZWlnaHQiLCJyb3dIZWlnaHQiLCJjbGFzc05hbWUiLCJyb3dDb3VudCIsIk9iamVjdCIsImtleXMiLCJhcmdzIiwicGlubmVkR3JpZCIsInJlbmRlckhlYWRlckNlbGwiLCJyZW5kZXJEYXRhQ2VsbCIsIm1hcmdpbkxlZnQiLCJ1bnBpbm5lZEdyaWQiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLHNCQUFzQixHQUFHLEVBQS9CO0FBQ0EsSUFBTUMsZ0JBQWdCLEdBQUcsRUFBekI7QUFDQSxJQUFNQyxtQkFBbUIsR0FBRyxFQUE1QjtBQUNBLElBQU1DLGdCQUFnQixHQUFHLEVBQXpCO0FBQ0EsSUFBTUMsaUJBQWlCLGtGQUNwQkMsaUNBQWdCQyxPQURJLEVBQ00sSUFETix3REFFcEJELGlDQUFnQkUsSUFGSSxFQUVHLElBRkgsc0JBQXZCOztBQUtPLElBQU1DLFNBQVMsR0FBR0MsNkJBQU9DLEdBQVYsbytHQUlYLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUMsa0JBQWhCO0FBQUEsQ0FKTSxFQTBEVSxVQUFBRixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlFLHFCQUFoQjtBQUFBLENBMURmLEVBa0VJLFVBQUFILEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUcsaUJBQWhCO0FBQUEsQ0FsRVQsRUFxRUksVUFBQUosS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZSSxnQkFBaEI7QUFBQSxDQXJFVCxFQXVGVyxVQUFBTCxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlLLGVBQWhCO0FBQUEsQ0F2RmhC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bi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgY3JlYXRlUmVmfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1Njcm9sbFN5bmMsIEF1dG9TaXplcn0gZnJvbSAncmVhY3QtdmlydHVhbGl6ZWQnO1xuaW1wb3J0IHN0eWxlZCwge3dpdGhUaGVtZX0gZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQge2NyZWF0ZVNlbGVjdG9yfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgZ2V0IGZyb20gJ2xvZGFzaC5nZXQnO1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJ2xvZGFzaC5kZWJvdW5jZSc7XG5cbmltcG9ydCBPcHRpb25Ecm9wZG93biBmcm9tICcuL29wdGlvbi1kcm9wZG93bic7XG5cbmltcG9ydCBHcmlkIGZyb20gJy4vZ3JpZCc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJy4vYnV0dG9uJztcbmltcG9ydCB7QXJyb3dVcCwgQXJyb3dEb3dufSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucyc7XG5pbXBvcnQge1ZlcnRUaHJlZURvdHN9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcbmltcG9ydCB7cGFyc2VGaWVsZFZhbHVlfSBmcm9tICd1dGlscy9kYXRhLXV0aWxzJztcbmltcG9ydCB7YWRqdXN0Q2VsbHNUb0NvbnRhaW5lcn0gZnJvbSAnLi9jZWxsLXNpemUnO1xuXG5pbXBvcnQge0FMTF9GSUVMRF9UWVBFUywgU09SVF9PUkRFUn0gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IEZpZWxkVG9rZW5GYWN0b3J5IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ZpZWxkLXRva2VuJztcblxuY29uc3QgZGVmYXVsdEhlYWRlclJvd0hlaWdodCA9IDU1O1xuY29uc3QgZGVmYXVsdFJvd0hlaWdodCA9IDMyO1xuY29uc3Qgb3ZlcnNjYW5Db2x1bW5Db3VudCA9IDEwO1xuY29uc3Qgb3ZlcnNjYW5Sb3dDb3VudCA9IDEwO1xuY29uc3QgZmllbGRUb0FsaWduUmlnaHQgPSB7XG4gIFtBTExfRklFTERfVFlQRVMuaW50ZWdlcl06IHRydWUsXG4gIFtBTExfRklFTERfVFlQRVMucmVhbF06IHRydWVcbn07XG5cbmV4cG9ydCBjb25zdCBDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBmb250LXNpemU6IDExcHg7XG4gIGZsZXgtZ3JvdzogMTtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZGF0YVRhYmxlVGV4dENvbG9yfTtcbiAgd2lkdGg6IDEwMCU7XG5cbiAgLlJlYWN0VmlydHVhbGl6ZWRfX0dyaWQ6Zm9jdXMsXG4gIC5SZWFjdFZpcnR1YWxpemVkX19HcmlkOmFjdGl2ZSB7XG4gICAgb3V0bGluZTogMDtcbiAgfVxuXG4gIC5jZWxsIHtcbiAgICAmOjotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgfVxuXG4gICo6Zm9jdXMge1xuICAgIG91dGxpbmU6IDA7XG4gIH1cblxuICAucmVzdWx0cy10YWJsZS13cmFwcGVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgbWluLWhlaWdodDogMTAwJTtcbiAgICBtYXgtaGVpZ2h0OiAxMDAlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBmbGV4LWdyb3c6IDE7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBib3JkZXItdG9wOiBub25lO1xuXG4gICAgLnNjcm9sbC1pbi11aS10aHJlYWQ6OmFmdGVyIHtcbiAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgdG9wOiAwO1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuXG4gICAgLmdyaWQtcm93IHtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIH1cbiAgICAuZ3JpZC1jb2x1bW4ge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBmbGV4OiAxIDEgYXV0bztcbiAgICB9XG4gICAgLnBpbm5lZC1ncmlkLWNvbnRhaW5lciB7XG4gICAgICBmbGV4OiAwIDAgNzVweDtcbiAgICAgIHotaW5kZXg6IDEwO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHRvcDogMDtcbiAgICAgIGJvcmRlci1yaWdodDogMnB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGlubmVkR3JpZEJvcmRlckNvbG9yfTtcbiAgICB9XG5cbiAgICAuaGVhZGVyLWdyaWQge1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbiAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgIC5ldmVuLXJvdyB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmV2ZW5Sb3dCYWNrZ3JvdW5kfTtcbiAgICB9XG4gICAgLm9kZC1yb3cge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5vZGRSb3dCYWNrZ3JvdW5kfTtcbiAgICB9XG4gICAgLmNlbGwsXG4gICAgLmhlYWRlci1jZWxsIHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICAgICAgLm4tc29ydC1pZHgge1xuICAgICAgICBmb250LXNpemU6IDlweDtcbiAgICAgIH1cbiAgICB9XG4gICAgLmNlbGwge1xuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY2VsbEJvcmRlckNvbG9yfTtcbiAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY2VsbEJvcmRlckNvbG9yfTtcbiAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICBvdmVyZmxvdzogYXV0bztcbiAgICAgIHBhZGRpbmc6IDAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jZWxsUGFkZGluZ1NpZGV9cHg7XG4gICAgICBmb250LXNpemU6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY2VsbEZvbnRTaXplfXB4O1xuXG4gICAgICAucmVzdWx0LWxpbmsge1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICB9XG4gICAgfVxuICAgIC5jZWxsLmVuZC1jZWxsLFxuICAgIC5oZWFkZXItY2VsbC5lbmQtY2VsbCB7XG4gICAgICBib3JkZXItcmlnaHQ6IG5vbmU7XG4gICAgICBwYWRkaW5nLXJpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNlbGxQYWRkaW5nU2lkZSArIHByb3BzLnRoZW1lLmVkZ2VDZWxsUGFkZGluZ1NpZGV9cHg7XG4gICAgfVxuICAgIC5jZWxsLmZpcnN0LWNlbGwsXG4gICAgLmhlYWRlci1jZWxsLmZpcnN0LWNlbGwge1xuICAgICAgcGFkZGluZy1sZWZ0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNlbGxQYWRkaW5nU2lkZSArIHByb3BzLnRoZW1lLmVkZ2VDZWxsUGFkZGluZ1NpZGV9cHg7XG4gICAgfVxuICAgIC5jZWxsLmJvdHRvbS1jZWxsIHtcbiAgICAgIGJvcmRlci1ib3R0b206IG5vbmU7XG4gICAgfVxuICAgIC5jZWxsLmFsaWduLXJpZ2h0IHtcbiAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgICB9XG4gICAgLmhlYWRlci1jZWxsIHtcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmhlYWRlckNlbGxCb3JkZXJDb2xvcn07XG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oZWFkZXJDZWxsQm9yZGVyQ29sb3J9O1xuICAgICAgcGFkZGluZy10b3A6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaGVhZGVyUGFkZGluZ1RvcH1weDtcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDA7XG4gICAgICBwYWRkaW5nLWJvdHRvbTogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oZWFkZXJQYWRkaW5nQm90dG9tfXB4O1xuICAgICAgcGFkZGluZy1sZWZ0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNlbGxQYWRkaW5nU2lkZX1weDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaGVhZGVyQ2VsbEJhY2tncm91bmR9O1xuXG4gICAgICAmOmhvdmVyIHtcbiAgICAgICAgLm1vcmUge1xuICAgICAgICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmhlYWRlckNlbGxJY29uQ29sb3J9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAubi1zb3J0LWlkeCB7XG4gICAgICAgIGZvbnQtc2l6ZTogOXB4O1xuICAgICAgfVxuICAgICAgLmRldGFpbHMge1xuICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgZmxleC1ncm93OiAxO1xuXG4gICAgICAgIC5jb2wtbmFtZSB7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgICAgICAgICAuY29sLW5hbWVfX2xlZnQge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAgICAgc3ZnIHtcbiAgICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDZweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLmNvbC1uYW1lX19uYW1lIHtcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAubW9yZSB7XG4gICAgICAgIGNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICA6Zm9jdXMge1xuICAgIG91dGxpbmU6IG5vbmU7XG4gIH1cbmA7XG5cbmNvbnN0IGRlZmF1bHRDb2x1bW5XaWR0aCA9IDIwMDtcblxuY29uc3QgY29sdW1uV2lkdGhGdW5jdGlvbiA9IChjb2x1bW5zLCBjZWxsU2l6ZUNhY2hlLCBnaG9zdCkgPT4gKHtpbmRleH0pID0+IHtcbiAgcmV0dXJuIChjb2x1bW5zW2luZGV4XSB8fCB7fSkuZ2hvc3QgPyBnaG9zdCA6IGNlbGxTaXplQ2FjaGVbY29sdW1uc1tpbmRleF1dIHx8IGRlZmF1bHRDb2x1bW5XaWR0aDtcbn07XG5cbi8qXG4gKiBUaGlzIGlzIGFuIGFjY2Vzc29yIG1ldGhvZCB1c2VkIHRvIGdlbmVyYWxpemUgZ2V0dGluZyBhIGNlbGwgZnJvbSBhIGRhdGEgcm93XG4gKi9cbmNvbnN0IGdldFJvd0NlbGwgPSAoe2RhdGFDb250YWluZXIsIGNvbHVtbnMsIGNvbHVtbiwgY29sTWV0YSwgcm93SW5kZXgsIHNvcnRPcmRlcn0pID0+IHtcbiAgY29uc3Qgcm93SWR4ID0gc29ydE9yZGVyICYmIHNvcnRPcmRlci5sZW5ndGggPyBnZXQoc29ydE9yZGVyLCByb3dJbmRleCkgOiByb3dJbmRleDtcbiAgY29uc3Qge3R5cGV9ID0gY29sTWV0YVtjb2x1bW5dO1xuXG4gIGxldCB2YWx1ZSA9IGRhdGFDb250YWluZXIudmFsdWVBdChyb3dJZHgsIGNvbHVtbnMuaW5kZXhPZihjb2x1bW4pKTtcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHZhbHVlID0gJ0Vycic7XG4gIHJldHVybiBwYXJzZUZpZWxkVmFsdWUodmFsdWUsIHR5cGUpO1xufTtcblxuZXhwb3J0IGNvbnN0IFRhYmxlU2VjdGlvbiA9ICh7XG4gIGNsYXNzTGlzdCxcbiAgaXNQaW5uZWQsXG4gIGNvbHVtbnMsXG4gIGhlYWRlckdyaWRQcm9wcyxcbiAgZml4ZWRXaWR0aCxcbiAgZml4ZWRIZWlnaHQgPSB1bmRlZmluZWQsXG4gIG9uU2Nyb2xsLFxuICBzY3JvbGxUb3AsXG4gIGRhdGFHcmlkUHJvcHMsXG4gIGNvbHVtbldpZHRoLFxuICBzZXRHcmlkUmVmLFxuICBoZWFkZXJDZWxsUmVuZGVyLFxuICBkYXRhQ2VsbFJlbmRlcixcbiAgc2Nyb2xsTGVmdCA9IHVuZGVmaW5lZFxufSkgPT4gKFxuICA8QXV0b1NpemVyPlxuICAgIHsoe3dpZHRoLCBoZWlnaHR9KSA9PiB7XG4gICAgICBjb25zdCBncmlkRGltZW5zaW9uID0ge1xuICAgICAgICBjb2x1bW5Db3VudDogY29sdW1ucy5sZW5ndGgsXG4gICAgICAgIGNvbHVtbldpZHRoLFxuICAgICAgICB3aWR0aDogZml4ZWRXaWR0aCB8fCB3aWR0aFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGRhdGFHcmlkSGVpZ2h0ID0gZml4ZWRIZWlnaHQgfHwgaGVpZ2h0O1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NuYW1lcygnc2Nyb2xsLWluLXVpLXRocmVhZCcsIGNsYXNzTGlzdC5oZWFkZXIpfT5cbiAgICAgICAgICAgIDxHcmlkXG4gICAgICAgICAgICAgIGNlbGxSZW5kZXJlcj17aGVhZGVyQ2VsbFJlbmRlcn1cbiAgICAgICAgICAgICAgey4uLmhlYWRlckdyaWRQcm9wc31cbiAgICAgICAgICAgICAgey4uLmdyaWREaW1lbnNpb259XG4gICAgICAgICAgICAgIHNjcm9sbExlZnQ9e3Njcm9sbExlZnR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygnc2Nyb2xsLWluLXVpLXRocmVhZCcsIGNsYXNzTGlzdC5yb3dzKX1cbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIHRvcDogaGVhZGVyR3JpZFByb3BzLmhlaWdodFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8R3JpZFxuICAgICAgICAgICAgICBjZWxsUmVuZGVyZXI9e2RhdGFDZWxsUmVuZGVyfVxuICAgICAgICAgICAgICB7Li4uZGF0YUdyaWRQcm9wc31cbiAgICAgICAgICAgICAgey4uLmdyaWREaW1lbnNpb259XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17aXNQaW5uZWQgPyAncGlubmVkLWdyaWQnIDogJ2JvZHktZ3JpZCd9XG4gICAgICAgICAgICAgIGhlaWdodD17ZGF0YUdyaWRIZWlnaHQgLSBoZWFkZXJHcmlkUHJvcHMuaGVpZ2h0fVxuICAgICAgICAgICAgICBvblNjcm9sbD17b25TY3JvbGx9XG4gICAgICAgICAgICAgIHNjcm9sbFRvcD17c2Nyb2xsVG9wfVxuICAgICAgICAgICAgICBzZXRHcmlkUmVmPXtzZXRHcmlkUmVmfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC8+XG4gICAgICApO1xuICAgIH19XG4gIDwvQXV0b1NpemVyPlxuKTtcblxuRGF0YVRhYmxlRmFjdG9yeS5kZXBzID0gW0ZpZWxkVG9rZW5GYWN0b3J5XTtcbmZ1bmN0aW9uIERhdGFUYWJsZUZhY3RvcnkoRmllbGRUb2tlbikge1xuICBjbGFzcyBEYXRhVGFibGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICBkYXRhQ29udGFpbmVyOiBudWxsLFxuICAgICAgcGlubmVkQ29sdW1uczogW10sXG4gICAgICBjb2xNZXRhOiB7fSxcbiAgICAgIGNlbGxTaXplQ2FjaGU6IHt9LFxuICAgICAgc29ydENvbHVtbjoge30sXG4gICAgICBmaXhlZFdpZHRoOiBudWxsLFxuICAgICAgZml4ZWRIZWlnaHQ6IG51bGwsXG4gICAgICB0aGVtZToge31cbiAgICB9O1xuXG4gICAgc3RhdGUgPSB7XG4gICAgICBjZWxsU2l6ZUNhY2hlOiB7fSxcbiAgICAgIG1vcmVPcHRpb25zQ29sdW1uOiBudWxsXG4gICAgfTtcblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuc2NhbGVDZWxsc1RvV2lkdGgpO1xuICAgICAgdGhpcy5zY2FsZUNlbGxzVG9XaWR0aCgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5wcm9wcy5jZWxsU2l6ZUNhY2hlICE9PSBwcmV2UHJvcHMuY2VsbFNpemVDYWNoZSB8fFxuICAgICAgICB0aGlzLnByb3BzLnBpbm5lZENvbHVtbnMgIT09IHByZXZQcm9wcy5waW5uZWRDb2x1bW5zXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5zY2FsZUNlbGxzVG9XaWR0aCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuc2NhbGVDZWxsc1RvV2lkdGgpO1xuICAgICAgLy8gZml4IFdhcm5pbmc6IENhbid0IHBlcmZvcm0gYSBSZWFjdCBzdGF0ZSB1cGRhdGUgb24gYW4gdW5tb3VudGVkIGNvbXBvbmVudFxuICAgICAgdGhpcy5zZXRTdGF0ZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByb290ID0gY3JlYXRlUmVmKCk7XG4gICAgY29sdW1ucyA9IHByb3BzID0+IHByb3BzLmNvbHVtbnM7XG4gICAgcGlubmVkQ29sdW1ucyA9IHByb3BzID0+IHByb3BzLnBpbm5lZENvbHVtbnM7XG4gICAgdW5waW5uZWRDb2x1bW5zID0gY3JlYXRlU2VsZWN0b3IodGhpcy5jb2x1bW5zLCB0aGlzLnBpbm5lZENvbHVtbnMsIChjb2x1bW5zLCBwaW5uZWRDb2x1bW5zKSA9PlxuICAgICAgIUFycmF5LmlzQXJyYXkocGlubmVkQ29sdW1ucykgPyBjb2x1bW5zIDogY29sdW1ucy5maWx0ZXIoYyA9PiAhcGlubmVkQ29sdW1ucy5pbmNsdWRlcyhjKSlcbiAgICApO1xuXG4gICAgdG9nZ2xlTW9yZU9wdGlvbnMgPSBtb3JlT3B0aW9uc0NvbHVtbiA9PlxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG1vcmVPcHRpb25zQ29sdW1uOlxuICAgICAgICAgIHRoaXMuc3RhdGUubW9yZU9wdGlvbnNDb2x1bW4gPT09IG1vcmVPcHRpb25zQ29sdW1uID8gbnVsbCA6IG1vcmVPcHRpb25zQ29sdW1uXG4gICAgICB9KTtcblxuICAgIGdldENlbGxTaXplQ2FjaGUgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7Y2VsbFNpemVDYWNoZTogcHJvcHNDYWNoZSwgZml4ZWRXaWR0aCwgcGlubmVkQ29sdW1uc30gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgdW5waW5uZWRDb2x1bW5zID0gdGhpcy51bnBpbm5lZENvbHVtbnModGhpcy5wcm9wcyk7XG5cbiAgICAgIGNvbnN0IHdpZHRoID0gZml4ZWRXaWR0aCA/IGZpeGVkV2lkdGggOiB0aGlzLnJvb3QuY3VycmVudCA/IHRoaXMucm9vdC5jdXJyZW50LmNsaWVudFdpZHRoIDogMDtcblxuICAgICAgLy8gcGluIGNvbHVtbiBib3JkZXIgaXMgMiBwaXhlbCB2cyAxIHBpeGVsXG4gICAgICBjb25zdCBhZGp1c3RXaWR0aCA9IHBpbm5lZENvbHVtbnMubGVuZ3RoID8gd2lkdGggLSAxIDogd2lkdGg7XG4gICAgICBjb25zdCB7Y2VsbFNpemVDYWNoZSwgZ2hvc3R9ID0gYWRqdXN0Q2VsbHNUb0NvbnRhaW5lcihcbiAgICAgICAgYWRqdXN0V2lkdGgsXG4gICAgICAgIHByb3BzQ2FjaGUsXG4gICAgICAgIHBpbm5lZENvbHVtbnMsXG4gICAgICAgIHVucGlubmVkQ29sdW1uc1xuICAgICAgKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2VsbFNpemVDYWNoZSxcbiAgICAgICAgZ2hvc3RcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGRvU2NhbGVDZWxsc1RvV2lkdGggPSAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHRoaXMuZ2V0Q2VsbFNpemVDYWNoZSgpKTtcbiAgICB9O1xuXG4gICAgc2NhbGVDZWxsc1RvV2lkdGggPSBkZWJvdW5jZSh0aGlzLmRvU2NhbGVDZWxsc1RvV2lkdGgsIDMwMCk7XG5cbiAgICByZW5kZXJIZWFkZXJDZWxsID0gKFxuICAgICAgY29sdW1ucyxcbiAgICAgIGlzUGlubmVkLFxuICAgICAgcHJvcHMsXG4gICAgICB0b2dnbGVNb3JlT3B0aW9ucyxcbiAgICAgIG1vcmVPcHRpb25zQ29sdW1uLFxuICAgICAgVG9rZW5Db21wb25lbnRcbiAgICApID0+IHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9kaXNwbGF5LW5hbWVcbiAgICAgIHJldHVybiBjZWxsSW5mbyA9PiB7XG4gICAgICAgIGNvbnN0IHtjb2x1bW5JbmRleCwga2V5LCBzdHlsZX0gPSBjZWxsSW5mbztcbiAgICAgICAgY29uc3Qge2NvbE1ldGEsIHNvcnRDb2x1bW4sIHNvcnRUYWJsZUNvbHVtbiwgcGluVGFibGVDb2x1bW4sIGNvcHlUYWJsZUNvbHVtbn0gPSBwcm9wcztcblxuICAgICAgICBjb25zdCBjb2x1bW4gPSBjb2x1bW5zW2NvbHVtbkluZGV4XTtcbiAgICAgICAgY29uc3QgaXNHaG9zdCA9IGNvbHVtbi5naG9zdDtcbiAgICAgICAgY29uc3QgaXNTb3J0ZWQgPSBzb3J0Q29sdW1uW2NvbHVtbl07XG4gICAgICAgIGNvbnN0IGZpcnN0Q2VsbCA9IGNvbHVtbkluZGV4ID09PSAwO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdoZWFkZXItY2VsbCcsIHtcbiAgICAgICAgICAgICAgW2Bjb2x1bW4tJHtjb2x1bW5JbmRleH1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgJ3Bpbm5lZC1oZWFkZXItY2VsbCc6IGlzUGlubmVkLFxuICAgICAgICAgICAgICAnZmlyc3QtY2VsbCc6IGZpcnN0Q2VsbFxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e2UgPT4ge1xuICAgICAgICAgICAgICBlLnNoaWZ0S2V5ID8gc29ydFRhYmxlQ29sdW1uKGNvbHVtbikgOiBudWxsO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uRG91YmxlQ2xpY2s9eygpID0+IHNvcnRUYWJsZUNvbHVtbihjb2x1bW4pfVxuICAgICAgICAgICAgdGl0bGU9e2NvbHVtbn1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7aXNHaG9zdCA/IChcbiAgICAgICAgICAgICAgPGRpdiAvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJkZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW5hbWVfX2xlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1uYW1lX19uYW1lXCI+e2NvbE1ldGFbY29sdW1uXS5uYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gY2xhc3NOYW1lPVwiY29sLW5hbWVfX3NvcnRcIiBvbkNsaWNrPXsoKSA9PiBzb3J0VGFibGVDb2x1bW4oY29sdW1uKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7aXNTb3J0ZWQgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlzU29ydGVkID09PSBTT1JUX09SREVSLkFTQ0VORElORyA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QXJyb3dVcCBoZWlnaHQ9XCIxNHB4XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QXJyb3dEb3duIGhlaWdodD1cIjE0cHhcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gY2xhc3NOYW1lPVwibW9yZVwiIG9uQ2xpY2s9eygpID0+IHRvZ2dsZU1vcmVPcHRpb25zKGNvbHVtbil9PlxuICAgICAgICAgICAgICAgICAgICAgIDxWZXJ0VGhyZWVEb3RzIGhlaWdodD1cIjE0cHhcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8RmllbGRUb2tlbiB0eXBlPXtjb2xNZXRhW2NvbHVtbl0udHlwZX0gLz5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG5cbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJvcHRpb25zXCI+XG4gICAgICAgICAgICAgICAgICA8T3B0aW9uRHJvcGRvd25cbiAgICAgICAgICAgICAgICAgICAgaXNPcGVuZWQ9e21vcmVPcHRpb25zQ29sdW1uID09PSBjb2x1bW59XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9e2NvbE1ldGFbY29sdW1uXS50eXBlfVxuICAgICAgICAgICAgICAgICAgICBjb2x1bW49e2NvbHVtbn1cbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlTW9yZU9wdGlvbnM9e3RvZ2dsZU1vcmVPcHRpb25zfVxuICAgICAgICAgICAgICAgICAgICBzb3J0VGFibGVDb2x1bW49e21vZGUgPT4gc29ydFRhYmxlQ29sdW1uKGNvbHVtbiwgbW9kZSl9XG4gICAgICAgICAgICAgICAgICAgIHNvcnRNb2RlPXtzb3J0Q29sdW1uICYmIHNvcnRDb2x1bW5bY29sdW1uXX1cbiAgICAgICAgICAgICAgICAgICAgcGluVGFibGVDb2x1bW49eygpID0+IHBpblRhYmxlQ29sdW1uKGNvbHVtbil9XG4gICAgICAgICAgICAgICAgICAgIGNvcHlUYWJsZUNvbHVtbj17KCkgPT4gY29weVRhYmxlQ29sdW1uKGNvbHVtbil9XG4gICAgICAgICAgICAgICAgICAgIGlzU29ydGVkPXtpc1NvcnRlZH1cbiAgICAgICAgICAgICAgICAgICAgaXNQaW5uZWQ9e2lzUGlubmVkfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHJlbmRlckRhdGFDZWxsID0gKGNvbHVtbnMsIGlzUGlubmVkLCBwcm9wcykgPT4ge1xuICAgICAgcmV0dXJuIGNlbGxJbmZvID0+IHtcbiAgICAgICAgY29uc3Qge2NvbHVtbkluZGV4LCBrZXksIHN0eWxlLCByb3dJbmRleH0gPSBjZWxsSW5mbztcbiAgICAgICAgY29uc3Qge2RhdGFDb250YWluZXIsIGNvbE1ldGF9ID0gcHJvcHM7XG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IGNvbHVtbnNbY29sdW1uSW5kZXhdO1xuICAgICAgICBjb25zdCBpc0dob3N0ID0gY29sdW1uLmdob3N0O1xuXG4gICAgICAgIGNvbnN0IHJvd0NlbGwgPSBpc0dob3N0ID8gJycgOiBnZXRSb3dDZWxsKHsuLi5wcm9wcywgY29sdW1uLCByb3dJbmRleH0pO1xuICAgICAgICBjb25zdCB0eXBlID0gaXNHaG9zdCA/IG51bGwgOiBjb2xNZXRhW2NvbHVtbl0udHlwZTtcblxuICAgICAgICBjb25zdCBsYXN0Um93SW5kZXggPSBkYXRhQ29udGFpbmVyID8gZGF0YUNvbnRhaW5lci5udW1Sb3dzKCkgLSAxIDogMDtcblxuICAgICAgICBjb25zdCBlbmRDZWxsID0gY29sdW1uSW5kZXggPT09IGNvbHVtbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgY29uc3QgZmlyc3RDZWxsID0gY29sdW1uSW5kZXggPT09IDA7XG4gICAgICAgIGNvbnN0IGJvdHRvbUNlbGwgPSByb3dJbmRleCA9PT0gbGFzdFJvd0luZGV4O1xuICAgICAgICBjb25zdCBhbGlnblJpZ2h0ID0gZmllbGRUb0FsaWduUmlnaHRbdHlwZV07XG5cbiAgICAgICAgY29uc3QgY2VsbCA9IChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ2NlbGwnLCB7XG4gICAgICAgICAgICAgIFtyb3dJbmRleCAlIDIgPT09IDAgPyAnZXZlbi1yb3cnIDogJ29kZC1yb3cnXTogdHJ1ZSxcbiAgICAgICAgICAgICAgW2Byb3ctJHtyb3dJbmRleH1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgJ3Bpbm5lZC1jZWxsJzogaXNQaW5uZWQsXG4gICAgICAgICAgICAgICdmaXJzdC1jZWxsJzogZmlyc3RDZWxsLFxuICAgICAgICAgICAgICAnZW5kLWNlbGwnOiBlbmRDZWxsLFxuICAgICAgICAgICAgICAnYm90dG9tLWNlbGwnOiBib3R0b21DZWxsLFxuICAgICAgICAgICAgICAnYWxpZ24tcmlnaHQnOiBhbGlnblJpZ2h0XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICAgICAgdGl0bGU9e2lzR2hvc3QgPyB1bmRlZmluZWQgOiByb3dDZWxsfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtgJHtyb3dDZWxsfSR7ZW5kQ2VsbCA/ICdcXG4nIDogJ1xcdCd9YH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gY2VsbDtcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHtkYXRhQ29udGFpbmVyLCBwaW5uZWRDb2x1bW5zLCB0aGVtZSA9IHt9LCBmaXhlZFdpZHRoLCBmaXhlZEhlaWdodH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgdW5waW5uZWRDb2x1bW5zID0gdGhpcy51bnBpbm5lZENvbHVtbnModGhpcy5wcm9wcyk7XG5cbiAgICAgIGNvbnN0IHtjZWxsU2l6ZUNhY2hlLCBtb3JlT3B0aW9uc0NvbHVtbiwgZ2hvc3R9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIGNvbnN0IHVucGlubmVkQ29sdW1uc0dob3N0ID0gZ2hvc3QgPyBbLi4udW5waW5uZWRDb2x1bW5zLCB7Z2hvc3Q6IHRydWV9XSA6IHVucGlubmVkQ29sdW1ucztcbiAgICAgIGNvbnN0IHBpbm5lZENvbHVtbnNXaWR0aCA9IHBpbm5lZENvbHVtbnMucmVkdWNlKFxuICAgICAgICAoYWNjLCB2YWwpID0+IGFjYyArIGdldChjZWxsU2l6ZUNhY2hlLCB2YWwsIDApLFxuICAgICAgICAwXG4gICAgICApO1xuXG4gICAgICBjb25zdCBoYXNQaW5uZWRDb2x1bW5zID0gQm9vbGVhbihwaW5uZWRDb2x1bW5zLmxlbmd0aCk7XG4gICAgICBjb25zdCB7aGVhZGVyUm93SGVpZ2h0ID0gZGVmYXVsdEhlYWRlclJvd0hlaWdodCwgcm93SGVpZ2h0ID0gZGVmYXVsdFJvd0hlaWdodH0gPSB0aGVtZTtcblxuICAgICAgY29uc3QgaGVhZGVyR3JpZFByb3BzID0ge1xuICAgICAgICBjZWxsU2l6ZUNhY2hlLFxuICAgICAgICBjbGFzc05hbWU6ICdoZWFkZXItZ3JpZCcsXG4gICAgICAgIGhlaWdodDogaGVhZGVyUm93SGVpZ2h0LFxuICAgICAgICByb3dDb3VudDogMSxcbiAgICAgICAgcm93SGVpZ2h0OiBoZWFkZXJSb3dIZWlnaHRcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGRhdGFHcmlkUHJvcHMgPSB7XG4gICAgICAgIGNlbGxTaXplQ2FjaGUsXG4gICAgICAgIG92ZXJzY2FuQ29sdW1uQ291bnQsXG4gICAgICAgIG92ZXJzY2FuUm93Q291bnQsXG4gICAgICAgIHJvd0NvdW50OiBkYXRhQ29udGFpbmVyID8gZGF0YUNvbnRhaW5lci5udW1Sb3dzKCkgOiAwLFxuICAgICAgICByb3dIZWlnaHRcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb250YWluZXIgY2xhc3NOYW1lPVwiZGF0YS10YWJsZS1jb250YWluZXJcIiByZWY9e3RoaXMucm9vdH0+XG4gICAgICAgICAge09iamVjdC5rZXlzKGNlbGxTaXplQ2FjaGUpLmxlbmd0aCAmJiAoXG4gICAgICAgICAgICA8U2Nyb2xsU3luYz5cbiAgICAgICAgICAgICAgeyh7b25TY3JvbGwsIHNjcm9sbExlZnQsIHNjcm9sbFRvcH0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZXN1bHRzLXRhYmxlLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAge2hhc1Bpbm5lZENvbHVtbnMgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PVwicGlubmVkLWNvbHVtbnNcIiBjbGFzc05hbWU9XCJwaW5uZWQtY29sdW1ucyBncmlkLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRhYmxlU2VjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc0xpc3Q9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6ICdwaW5uZWQtY29sdW1ucy0taGVhZGVyIHBpbm5lZC1ncmlkLWNvbnRhaW5lcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93czogJ3Bpbm5lZC1jb2x1bW5zLS1yb3dzIHBpbm5lZC1ncmlkLWNvbnRhaW5lcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXNQaW5uZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1ucz17cGlubmVkQ29sdW1uc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyR3JpZFByb3BzPXtoZWFkZXJHcmlkUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkV2lkdGg9e3Bpbm5lZENvbHVtbnNXaWR0aH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25TY3JvbGw9e2FyZ3MgPT4gb25TY3JvbGwoey4uLmFyZ3MsIHNjcm9sbExlZnR9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wPXtzY3JvbGxUb3B9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFHcmlkUHJvcHM9e2RhdGFHcmlkUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldEdyaWRSZWY9e3Bpbm5lZEdyaWQgPT4gKHRoaXMucGlubmVkR3JpZCA9IHBpbm5lZEdyaWQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5XaWR0aD17Y29sdW1uV2lkdGhGdW5jdGlvbihwaW5uZWRDb2x1bW5zLCBjZWxsU2l6ZUNhY2hlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2VsbFJlbmRlcj17dGhpcy5yZW5kZXJIZWFkZXJDZWxsKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpbm5lZENvbHVtbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlTW9yZU9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9yZU9wdGlvbnNDb2x1bW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUNlbGxSZW5kZXI9e3RoaXMucmVuZGVyRGF0YUNlbGwocGlubmVkQ29sdW1ucywgdHJ1ZSwgdGhpcy5wcm9wcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAga2V5PVwidW5waW5uZWQtY29sdW1uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6IGAke2hhc1Bpbm5lZENvbHVtbnMgPyBgJHtwaW5uZWRDb2x1bW5zV2lkdGh9cHhgIDogJzAnfWBcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInVucGlubmVkLWNvbHVtbnMgZ3JpZC1jb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPFRhYmxlU2VjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NMaXN0PXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogJ3VucGlubmVkLWNvbHVtbnMtLWhlYWRlciB1bnBpbm5lZC1ncmlkLWNvbnRhaW5lcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6ICd1bnBpbm5lZC1jb2x1bW5zLS1yb3dzIHVucGlubmVkLWdyaWQtY29udGFpbmVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUGlubmVkPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM9e3VucGlubmVkQ29sdW1uc0dob3N0fVxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyR3JpZFByb3BzPXtoZWFkZXJHcmlkUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXhlZFdpZHRoPXtmaXhlZFdpZHRofVxuICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRIZWlnaHQ9e2ZpeGVkSGVpZ2h0fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25TY3JvbGw9e29uU2Nyb2xsfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wPXtzY3JvbGxUb3B9XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxMZWZ0PXtzY3JvbGxMZWZ0fVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUdyaWRQcm9wcz17ZGF0YUdyaWRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEdyaWRSZWY9e3VucGlubmVkR3JpZCA9PiAodGhpcy51bnBpbm5lZEdyaWQgPSB1bnBpbm5lZEdyaWQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uV2lkdGg9e2NvbHVtbldpZHRoRnVuY3Rpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHVucGlubmVkQ29sdW1uc0dob3N0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsU2l6ZUNhY2hlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBnaG9zdFxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlckNlbGxSZW5kZXI9e3RoaXMucmVuZGVySGVhZGVyQ2VsbChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdW5waW5uZWRDb2x1bW5zR2hvc3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZU1vcmVPcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtb3JlT3B0aW9uc0NvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFDZWxsUmVuZGVyPXt0aGlzLnJlbmRlckRhdGFDZWxsKFxuICAgICAgICAgICAgICAgICAgICAgICAgICB1bnBpbm5lZENvbHVtbnNHaG9zdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHNcbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPC9TY3JvbGxTeW5jPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gd2l0aFRoZW1lKERhdGFUYWJsZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhdGFUYWJsZUZhY3Rvcnk7XG4iXX0=