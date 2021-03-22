"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Button;
exports.ButtonShape = exports.ButtonColor = exports.ButtonSize = exports.ButtonVariant = exports.ButtonFormType = void 0;

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = require("../styles");

var _components = require("@tarojs/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ButtonFormType;
exports.ButtonFormType = ButtonFormType;

(function (ButtonFormType) {
  ButtonFormType["Button"] = "button";
  ButtonFormType["Submit"] = "submit";
  ButtonFormType["Reset"] = "reset";
})(ButtonFormType || (exports.ButtonFormType = ButtonFormType = {}));

var ButtonVariant;
exports.ButtonVariant = ButtonVariant;

(function (ButtonVariant) {
  ButtonVariant["Contained"] = "contained";
  ButtonVariant["Text"] = "text";
  ButtonVariant["Outlined"] = "outlined";
})(ButtonVariant || (exports.ButtonVariant = ButtonVariant = {}));

var ButtonSize;
exports.ButtonSize = ButtonSize;

(function (ButtonSize) {
  ButtonSize["Mini"] = "mini";
  ButtonSize["Small"] = "small";
  ButtonSize["Medium"] = "medium";
  ButtonSize["Large"] = "large";
})(ButtonSize || (exports.ButtonSize = ButtonSize = {}));

var ButtonColor;
exports.ButtonColor = ButtonColor;

(function (ButtonColor) {
  ButtonColor["Default"] = "default";
  ButtonColor["Primary"] = "primary";
  ButtonColor["Info"] = "info";
  ButtonColor["Success"] = "success";
  ButtonColor["Warning"] = "warning";
  ButtonColor["Danger"] = "danger";
})(ButtonColor || (exports.ButtonColor = ButtonColor = {}));

var ButtonShape;
exports.ButtonShape = ButtonShape;

(function (ButtonShape) {
  ButtonShape["Circle"] = "circle";
  ButtonShape["Round"] = "round";
})(ButtonShape || (exports.ButtonShape = ButtonShape = {}));

function Button(props) {
  var _classNames;

  var _props$variant = props.variant,
      variant = _props$variant === void 0 ? ButtonVariant.Text : _props$variant,
      shape = props.shape,
      _props$size = props.size,
      size = _props$size === void 0 ? ButtonSize.Medium : _props$size,
      _props$color = props.color,
      color = _props$color === void 0 ? ButtonColor.Default : _props$color,
      _props$formType = props.formType,
      formType = _props$formType === void 0 ? ButtonFormType.Button : _props$formType,
      children = props.children,
      onClick = props.onClick;
  return /*#__PURE__*/React.createElement(_components.View, {
    className: (0, _classnames["default"])((0, _styles.prefixClassname)("button"), (_classNames = {}, _defineProperty(_classNames, (0, _styles.prefixClassname)("button-variant-text"), variant === ButtonVariant.Text), _defineProperty(_classNames, (0, _styles.prefixClassname)("button-variant-contained"), variant === ButtonVariant.Contained), _defineProperty(_classNames, (0, _styles.prefixClassname)("button-variant-outlined"), variant === ButtonVariant.Outlined), _defineProperty(_classNames, (0, _styles.prefixClassname)("button-shape-round"), shape === ButtonShape.Round), _defineProperty(_classNames, (0, _styles.prefixClassname)("button-size-mini"), size === ButtonSize.Mini), _defineProperty(_classNames, (0, _styles.prefixClassname)("button-size-small"), size === ButtonSize.Small), _defineProperty(_classNames, (0, _styles.prefixClassname)("button-size-medium"), size === ButtonSize.Medium), _defineProperty(_classNames, (0, _styles.prefixClassname)("button-size-large"), size === ButtonSize.Large), _defineProperty(_classNames, (0, _styles.prefixClassname)("button-color-default"), color === ButtonColor.Default), _defineProperty(_classNames, (0, _styles.prefixClassname)("button-color-primary"), color === ButtonColor.Primary), _defineProperty(_classNames, (0, _styles.prefixClassname)("button-color-info"), color === ButtonColor.Info), _defineProperty(_classNames, (0, _styles.prefixClassname)("button-color-success"), color === ButtonColor.Success), _defineProperty(_classNames, (0, _styles.prefixClassname)("button-color-warning"), color === ButtonColor.Warning), _defineProperty(_classNames, (0, _styles.prefixClassname)("button-color-danger"), color === ButtonColor.Danger), _classNames)),
    onClick: onClick
  }, /*#__PURE__*/React.createElement(_components.Button, {
    formType: formType === ButtonFormType.Submit ? "submit" : formType === ButtonFormType.Reset ? "reset" : undefined
  }), /*#__PURE__*/React.createElement(_components.View, {
    className: (0, _styles.prefixClassname)("button-content")
  }, children));
}