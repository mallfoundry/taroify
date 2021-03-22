"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prefixClassname = prefixClassname;
var COMPONENT_PREFIX = "vant-";

function prefixClassname(component) {
  return "".concat(COMPONENT_PREFIX).concat(component);
}