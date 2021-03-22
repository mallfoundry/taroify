"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Icon;
exports.IconColor = exports.IconSize = exports.IconTheme = void 0;

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _material = require("./material");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var IconTheme;
exports.IconTheme = IconTheme;

(function (IconTheme) {
  IconTheme["Filled"] = "filled";
  IconTheme["Outlined"] = "outlined";
  IconTheme["Rounded"] = "rounded";
  IconTheme["Sharp"] = "sharp";
})(IconTheme || (exports.IconTheme = IconTheme = {}));

var IconSize;
exports.IconSize = IconSize;

(function (IconSize) {
  IconSize["Inherit"] = "inherit";
  IconSize["Mini"] = "mini";
  IconSize["Small"] = "small";
  IconSize["Medium"] = "medium";
  IconSize["Large"] = "large";
})(IconSize || (exports.IconSize = IconSize = {}));

var IconColor;
exports.IconColor = IconColor;

(function (IconColor) {
  IconColor["Inherit"] = "inherit";
  IconColor["Default"] = "default";
  IconColor["Primary"] = "primary";
  IconColor["Info"] = "info";
  IconColor["Success"] = "success";
  IconColor["Warning"] = "warning";
  IconColor["Danger"] = "danger";
})(IconColor || (exports.IconColor = IconColor = {}));

function Icon(props) {
  var className = props.className,
      style = props.style,
      _props$theme = props.theme,
      theme = _props$theme === void 0 ? IconTheme.Filled : _props$theme,
      _props$size = props.size,
      size = _props$size === void 0 ? IconSize.Medium : _props$size,
      _props$color = props.color,
      color = _props$color === void 0 ? IconColor.Default : _props$color,
      children = props.children;
  return /*#__PURE__*/React.createElement(_material.MaterialIcon, {
    className: (0, _classnames["default"])("vant-icon", "vant-icon-color-".concat(color), "vant-icon-size-".concat(size), className),
    style: style,
    theme: theme,
    children: children
  });
}