"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Popup;
exports.PopupAnchor = void 0;

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _components = require("@tarojs/components");

var _styles = require("../styles");

var _backdrop = _interopRequireDefault(require("../backdrop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// interface PopupHeaderProps {
//   closeable?: boolean;
//   children?: ReactNode
//   onClose?: () => void
// }
//
// function PopupHeader({ closeable, children, onClose }: PopupHeaderProps) {
//   return (
//     <View className={prefixClassname("popup-header")}>
//       {children}
//       {/*{closeable && <AtIcon className={prefixClassName("popup-close")} value="close" onClick={onClose} />}*/}
//     </View>
//   )
// }
// interface PopupContainerProps {
//   closeable?: boolean;
//   children?: ReactNode;
//   onClose?: () => void
// }
//
// function PopupContainer({ closeable, children, onClose }: PopupContainerProps) {
//   return (
//     <View className={prefixClassname("popup-container")}>
//       {/*<PopupHeader closeable={closeable} onClose={onClose} />*/}
//       {children}
//     </View>
//   )
// }
var PopupAnchor;
exports.PopupAnchor = PopupAnchor;

(function (PopupAnchor) {
  PopupAnchor["Top"] = "top";
  PopupAnchor["Right"] = "right";
  PopupAnchor["Bottom"] = "bottom";
  PopupAnchor["Left"] = "left";
})(PopupAnchor || (exports.PopupAnchor = PopupAnchor = {}));

function Popup(props) {
  var _classNames;

  var open = props.open,
      _props$anchor = props.anchor,
      anchor = _props$anchor === void 0 ? PopupAnchor.Bottom : _props$anchor,
      closeable = props.closeable,
      children = props.children,
      onClose = props.onClose;
  console.log(closeable);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_backdrop["default"], {
    open: open,
    closable: true,
    onClose: onClose
  }), /*#__PURE__*/React.createElement(_components.View, {
    className: (0, _classnames["default"])((0, _styles.prefixClassname)("popup"), (_classNames = {}, _defineProperty(_classNames, (0, _styles.prefixClassname)("popup-open"), open), _defineProperty(_classNames, (0, _styles.prefixClassname)("popup-anchor-top"), anchor === PopupAnchor.Top), _defineProperty(_classNames, (0, _styles.prefixClassname)("popup-anchor-right"), anchor === PopupAnchor.Right), _defineProperty(_classNames, (0, _styles.prefixClassname)("popup-anchor-bottom"), anchor === PopupAnchor.Bottom), _defineProperty(_classNames, (0, _styles.prefixClassname)("popup-anchor-left"), anchor === PopupAnchor.Left), _classNames))
  }, children));
}