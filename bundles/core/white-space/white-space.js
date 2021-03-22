"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = WhiteSpace;
exports.WhiteSpaceSize = void 0;

var _components = require("@tarojs/components");

var _classnames = _interopRequireDefault(require("classnames"));

var React = _interopRequireWildcard(require("react"));

var _styles = require("../styles");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var WhiteSpaceSize;
exports.WhiteSpaceSize = WhiteSpaceSize;

(function (WhiteSpaceSize) {
  WhiteSpaceSize["Mini"] = "mini";
  WhiteSpaceSize["Small"] = "small";
  WhiteSpaceSize["Medium"] = "medium";
  WhiteSpaceSize["Large"] = "large";
})(WhiteSpaceSize || (exports.WhiteSpaceSize = WhiteSpaceSize = {}));

function WhiteSpace(props) {
  var _props$size = props.size,
      size = _props$size === void 0 ? WhiteSpaceSize.Medium : _props$size;
  return /*#__PURE__*/React.createElement(_components.View, {
    className: (0, _classnames["default"])((0, _styles.prefixClassname)("white-space"), (0, _styles.prefixClassname)("white-space-size-".concat(size)))
  });
}