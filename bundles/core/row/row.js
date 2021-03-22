"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Row;
exports.RowAlign = exports.RowJustify = exports.RowContext = void 0;

var _components = require("@tarojs/components");

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = require("../styles");

var _ = _interopRequireWildcard(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RowContext = /*#__PURE__*/(0, React.createContext)({
  gutter: [undefined, undefined]
});
exports.RowContext = RowContext;
var RowJustify;
exports.RowJustify = RowJustify;

(function (RowJustify) {
  RowJustify["End"] = "end";
  RowJustify["Center"] = "center";
  RowJustify["SpaceAround"] = "space-around";
  RowJustify["SpaceBetween"] = "space-between";
})(RowJustify || (exports.RowJustify = RowJustify = {}));

var RowAlign;
exports.RowAlign = RowAlign;

(function (RowAlign) {
  RowAlign["Center"] = "center";
  RowAlign["Bottom"] = "bottom";
})(RowAlign || (exports.RowAlign = RowAlign = {}));

function useGutter(gutter) {
  if (gutter === undefined) {
    return [undefined, undefined];
  }

  if (_.isNumber(gutter)) {
    return [gutter, gutter];
  }

  if (_.isString(gutter)) {
    var gutterNumber = _.toNumber(gutter);

    return [gutterNumber, gutterNumber];
  }

  if (_.isArray(gutter)) {
    var _gutter = _slicedToArray(gutter, 2),
        horizontalGutter = _gutter[0],
        verticalGutter = _gutter[1];

    return [_.toNumber(horizontalGutter), _.toNumber(verticalGutter)];
  }

  return [0, 0];
}

function Row(props) {
  var _classNames;

  var className = props.className,
      gutter = props.gutter,
      justify = props.justify,
      align = props.align,
      children = props.children;
  var gutters = useGutter(gutter);

  var _gutters = _slicedToArray(gutters, 2),
      horizontalGutter = _gutters[0],
      verticalGutter = _gutters[1];

  console.log(horizontalGutter, verticalGutter); //

  var gutterStyle = {};

  if (horizontalGutter) {
    var averagePadding = _.toNumber(horizontalGutter) / 2;
    gutterStyle.marginLeft = "-".concat(averagePadding, "px");
    gutterStyle.marginRight = "-".concat(averagePadding, "px");
  }

  return /*#__PURE__*/React.createElement(_components.View, {
    className: (0, _classnames["default"])((0, _styles.prefixClassname)("row"), (_classNames = {}, _defineProperty(_classNames, (0, _styles.prefixClassname)("row-justify-end"), justify === RowJustify.End), _defineProperty(_classNames, (0, _styles.prefixClassname)("row-justify-center"), justify === RowJustify.Center), _defineProperty(_classNames, (0, _styles.prefixClassname)("row-justify-space-around"), justify === RowJustify.SpaceAround), _defineProperty(_classNames, (0, _styles.prefixClassname)("row-justify-space-between"), justify === RowJustify.SpaceBetween), _defineProperty(_classNames, (0, _styles.prefixClassname)("row-align-center"), align === RowAlign.Center), _defineProperty(_classNames, (0, _styles.prefixClassname)("row-align-bottom"), align === RowAlign.Bottom), _classNames), className),
    style: _objectSpread({}, gutterStyle)
  }, /*#__PURE__*/React.createElement(RowContext.Provider, {
    value: {
      gutter: gutters
    }
  }, children));
}