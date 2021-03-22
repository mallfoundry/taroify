"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Cell;

var _components = require("@tarojs/components");

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = require("../styles");

var _ArrowForwardIosOutlined = _interopRequireDefault(require("@vant-taro/icons/ArrowForwardIosOutlined"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Cell(props) {
  var className = props.className,
      label = props.label,
      _props$clickable = props.clickable,
      clickable = _props$clickable === void 0 ? false : _props$clickable,
      _props$arrow = props.arrow,
      arrow = _props$arrow === void 0 ? false : _props$arrow,
      children = props.children;
  return /*#__PURE__*/React.createElement(_components.View, {
    className: (0, _classnames["default"])((0, _styles.prefixClassname)("cell"), _defineProperty({}, (0, _styles.prefixClassname)("cell-clickable"), clickable), className)
  }, /*#__PURE__*/React.createElement(_components.View, {
    className: (0, _styles.prefixClassname)("cell-label")
  }, label), /*#__PURE__*/React.createElement(_components.View, {
    className: (0, _styles.prefixClassname)("cell-value")
  }, children), arrow && /*#__PURE__*/React.createElement(_components.View, {
    className: (0, _styles.prefixClassname)("cell-arrow")
  }, /*#__PURE__*/React.createElement(_ArrowForwardIosOutlined["default"], {
    color: "inherit",
    size: "inherit"
  })));
}