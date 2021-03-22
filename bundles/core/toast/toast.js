"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Toast;
var ToastType;

(function (ToastType) {
  ToastType[ToastType["loading"] = 0] = "loading";
  ToastType[ToastType["success"] = 1] = "success";
  ToastType[ToastType["fail"] = 2] = "fail";
  ToastType[ToastType["html"] = 3] = "html";
})(ToastType || (ToastType = {}));

function Toast(props) {}