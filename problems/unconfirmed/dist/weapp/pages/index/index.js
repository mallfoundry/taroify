(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/index/index"],{

/***/ "../../node_modules/@tarojs/mini-runner/node_modules/babel-loader/lib/index.js!./src/pages/index/index.tsx":
/*!*****************************************************************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/node_modules/@tarojs/mini-runner/node_modules/babel-loader/lib!./src/pages/index/index.tsx ***!
  \*****************************************************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _taroify_core_swiper_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @taroify/core/swiper/style */ "../../packages/core/src/swiper/style/index.ts");
/* harmony import */ var _taroify_core_swiper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @taroify/core/swiper */ "../../packages/core/src/swiper/index.ts");
/* harmony import */ var _taroify_core_button_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @taroify/core/button/style */ "../../packages/core/src/button/style/index.ts");
/* harmony import */ var _taroify_core_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @taroify/core/button */ "../../packages/core/src/button/index.ts");
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/cjs/react-jsx-runtime.production.min.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);










function SwiperWithValues() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([0, 1, 2, 3]),
      _useState2 = Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(_useState, 1),
      items = _useState2[0];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(0),
      _useState4 = Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxs"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["Fragment"], {
    children: [items.map(function (item) {
      return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])(_taroify_core_button__WEBPACK_IMPORTED_MODULE_3__["default"], {
        onClick: function onClick() {
          return setValue(item);
        },
        children: item
      }, item);
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxs"])(_taroify_core_swiper__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
      autoplay: 4000,
      value: value,
      onChange: setValue,
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])(_taroify_core_swiper__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].Indicator, {}), items.map(function (item) {
        return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])(_taroify_core_swiper__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].Item, {
          style: {
            height: "100px",
            background: "#39a9ed"
          },
          children: item
        }, item);
      })]
    })]
  });
}

function Index() {
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])(SwiperWithValues, {});
}

/* harmony default export */ __webpack_exports__["a"] = (Index);

/***/ }),

/***/ "../../node_modules/classnames/index.js":
/*!*******************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/node_modules/classnames/index.js ***!
  \*******************************************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(window) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/typeof.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/typeof.js").default;

/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

/* global define */
(function () {
  'use strict';

  var hasOwn = {}.hasOwnProperty;

  function classNames() {
    var classes = [];

    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!arg) continue;

      var argType = _typeof(arg);

      if (argType === 'string' || argType === 'number') {
        classes.push(arg);
      } else if (Array.isArray(arg) && arg.length) {
        var inner = classNames.apply(null, arg);

        if (inner) {
          classes.push(inner);
        }
      } else if (argType === 'object') {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }

    return classes.join(' ');
  }

  if ( true && module.exports) {
    classNames.default = classNames;
    module.exports = classNames;
  } else if ( true && _typeof(__webpack_require__(/*! !webpack amd options */ "../../node_modules/webpack/buildin/amd-options.js")) === 'object' && __webpack_require__(/*! !webpack amd options */ "../../node_modules/webpack/buildin/amd-options.js")) {
    // register as 'classnames', consistent with npm package name
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return classNames;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    window.classNames = classNames;
  }
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! @tarojs/runtime */ "../../node_modules/@tarojs/runtime/dist/runtime.esm.js")["window"]))

/***/ }),

/***/ "../../node_modules/performance-now/lib/performance-now.js":
/*!**************************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/node_modules/performance-now/lib/performance-now.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.12.2
(function () {
  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

  if (typeof performance !== "undefined" && performance !== null && performance.now) {
    module.exports = function () {
      return performance.now();
    };
  } else if (typeof process !== "undefined" && process !== null && process.hrtime) {
    module.exports = function () {
      return (getNanoSeconds() - nodeLoadTime) / 1e6;
    };

    hrtime = process.hrtime;

    getNanoSeconds = function getNanoSeconds() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };

    moduleLoadTime = getNanoSeconds();
    upTime = process.uptime() * 1e9;
    nodeLoadTime = moduleLoadTime - upTime;
  } else if (Date.now) {
    module.exports = function () {
      return Date.now() - loadTime;
    };

    loadTime = Date.now();
  } else {
    module.exports = function () {
      return new Date().getTime() - loadTime;
    };

    loadTime = new Date().getTime();
  }
}).call(this);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "../../node_modules/process/browser.js")))

/***/ }),

/***/ "../../node_modules/raf/index.js":
/*!************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/node_modules/raf/index.js ***!
  \************************************************************************/
/*! no static exports found */
/*! exports used: cancel, default */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(window, global) {var now = __webpack_require__(/*! performance-now */ "../../node_modules/performance-now/lib/performance-now.js"),
    root = typeof window === 'undefined' ? global : window,
    vendors = ['moz', 'webkit'],
    suffix = 'AnimationFrame',
    raf = root['request' + suffix],
    caf = root['cancel' + suffix] || root['cancelRequest' + suffix];

for (var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix];
  caf = root[vendors[i] + 'Cancel' + suffix] || root[vendors[i] + 'CancelRequest' + suffix];
} // Some versions of FF have rAF but not cAF


if (!raf || !caf) {
  var last = 0,
      id = 0,
      queue = [],
      frameDuration = 1000 / 60;

  raf = function raf(callback) {
    if (queue.length === 0) {
      var _now = now(),
          next = Math.max(0, frameDuration - (_now - last));

      last = next + _now;
      setTimeout(function () {
        var cp = queue.slice(0); // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue

        queue.length = 0;

        for (var i = 0; i < cp.length; i++) {
          if (!cp[i].cancelled) {
            try {
              cp[i].callback(last);
            } catch (e) {
              setTimeout(function () {
                throw e;
              }, 0);
            }
          }
        }
      }, Math.round(next));
    }

    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    });
    return id;
  };

  caf = function caf(handle) {
    for (var i = 0; i < queue.length; i++) {
      if (queue[i].handle === handle) {
        queue[i].cancelled = true;
      }
    }
  };
}

module.exports = function (fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn);
};

module.exports.cancel = function () {
  caf.apply(root, arguments);
};

module.exports.polyfill = function (object) {
  if (!object) {
    object = root;
  }

  object.requestAnimationFrame = raf;
  object.cancelAnimationFrame = caf;
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! @tarojs/runtime */ "../../node_modules/@tarojs/runtime/dist/runtime.esm.js")["window"], __webpack_require__(/*! ./../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/react/cjs/react-jsx-runtime.production.min.js":
/*!*********************************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/node_modules/react/cjs/react-jsx-runtime.production.min.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/*! exports used: Fragment, jsx, jsxs */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


__webpack_require__(/*! object-assign */ "../../node_modules/object-assign/index.js");

var f = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js"),
    g = 60103;

exports.Fragment = 60107;

if ("function" === typeof Symbol && Symbol.for) {
  var h = Symbol.for;
  g = h("react.element");
  exports.Fragment = h("react.fragment");
}

var m = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    n = Object.prototype.hasOwnProperty,
    p = {
  key: !0,
  ref: !0,
  __self: !0,
  __source: !0
};

function q(c, a, k) {
  var b,
      d = {},
      e = null,
      l = null;
  void 0 !== k && (e = "" + k);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (l = a.ref);

  for (b in a) {
    n.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  }

  if (c && c.defaultProps) for (b in a = c.defaultProps, a) {
    void 0 === d[b] && (d[b] = a[b]);
  }
  return {
    $$typeof: g,
    type: c,
    key: e,
    ref: l,
    props: d,
    _owner: m.current
  };
}

exports.jsx = q;
exports.jsxs = q;

/***/ }),

/***/ "../../node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "../../packages/core/src/button-base/button-base.tsx":
/*!********************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/button-base/button-base.tsx ***!
  \********************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tarojs/components */ "../../node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles */ "../../packages/core/src/styles/index.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/cjs/react-jsx-runtime.production.min.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);


var _excluded = ["className"];






function ButtonBase(props) {
  var className = props.className,
      restProps = Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(props, _excluded);

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__[/* Button */ "a"], Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(Object(_styles__WEBPACK_IMPORTED_MODULE_5__[/* prefixClassname */ "a"])("button-base"), className)
  }, restProps));
}

/* harmony default export */ __webpack_exports__["a"] = (ButtonBase);

/***/ }),

/***/ "../../packages/core/src/button-base/index.scss":
/*!***************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/button-base/index.scss ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../../packages/core/src/button-base/index.ts":
/*!*************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/button-base/index.ts ***!
  \*************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _button_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button-base */ "../../packages/core/src/button-base/button-base.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _button_base__WEBPACK_IMPORTED_MODULE_0__["a"]; });



/***/ }),

/***/ "../../packages/core/src/button-base/style/index.ts":
/*!*******************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/button-base/style/index.ts ***!
  \*******************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.scss */ "../../packages/core/src/button-base/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ "../../packages/core/src/button/button.context.ts":
/*!*****************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/button/button.context.ts ***!
  \*****************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var ButtonContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])({});
/* harmony default export */ __webpack_exports__["a"] = (ButtonContext);

/***/ }),

/***/ "../../packages/core/src/button/button.shared.ts":
/*!****************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/button/button.shared.ts ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../packages/core/src/button/button.tsx":
/*!**********************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/button/button.tsx ***!
  \**********************************************************************************/
/*! exports provided: default, createButton */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Button; });
/* unused harmony export createButton */
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/defineProperty.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/isPlainObject */ "../../node_modules/lodash/isPlainObject.js");
/* harmony import */ var lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_isBoolean__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/isBoolean */ "../../node_modules/lodash/isBoolean.js");
/* harmony import */ var lodash_isBoolean__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_isBoolean__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tarojs/components */ "../../node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _button_base__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../button-base */ "../../packages/core/src/button-base/index.ts");
/* harmony import */ var _loading__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../loading */ "../../packages/core/src/loading/index.ts");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../styles */ "../../packages/core/src/styles/index.ts");
/* harmony import */ var _button_context__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./button.context */ "../../packages/core/src/button/button.context.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/cjs/react-jsx-runtime.production.min.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__);





var _excluded = ["className"],
    _excluded2 = ["className", "style", "variant", "shape", "size", "color", "formType", "block", "hairline", "disabled", "loading", "icon", "children", "onClick"];











function useButtonLoading(loading) {
  return Object(react__WEBPACK_IMPORTED_MODULE_7__["useMemo"])(function () {
    if (lodash_isBoolean__WEBPACK_IMPORTED_MODULE_4___default()(loading) && loading) {
      return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(_loading__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
        className: Object(_styles__WEBPACK_IMPORTED_MODULE_10__[/* prefixClassname */ "a"])("button__loading")
      });
    } else if (lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_3___default()(loading)) {
      var _ref = loading,
          className = _ref.className,
          restProps = Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_ref, _excluded);

      return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(_loading__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
        className: classnames__WEBPACK_IMPORTED_MODULE_6___default()(Object(_styles__WEBPACK_IMPORTED_MODULE_10__[/* prefixClassname */ "a"])("button__loading"), className)
      }, restProps));
    }

    return loading;
  }, [loading]);
}

function Button(props) {
  var _classNames;

  var className = props.className,
      style = props.style,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? "contained" : _props$variant,
      shape = props.shape,
      _props$size = props.size,
      size = _props$size === void 0 ? "medium" : _props$size,
      _props$color = props.color,
      color = _props$color === void 0 ? "default" : _props$color,
      _props$formType = props.formType,
      formType = _props$formType === void 0 ? "button" : _props$formType,
      block = props.block,
      hairline = props.hairline,
      disabled = props.disabled,
      loadingProp = props.loading,
      icon = props.icon,
      children = props.children,
      _onClick = props.onClick,
      restProps = Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(props, _excluded2);

  var loading = useButtonLoading(loadingProp);

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_7__["useContext"])(_button_context__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"]),
      onCtxClick = _useContext.onClick;

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxs"])(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__[/* View */ "b"], {
    className: classnames__WEBPACK_IMPORTED_MODULE_6___default()(Object(_styles__WEBPACK_IMPORTED_MODULE_10__[/* prefixClassname */ "a"])("button"), (_classNames = {}, Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_classNames, Object(_styles__WEBPACK_IMPORTED_MODULE_10__[/* prefixClassname */ "a"])("button--text"), variant === "text"), Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_classNames, Object(_styles__WEBPACK_IMPORTED_MODULE_10__[/* prefixClassname */ "a"])("button--contained"), variant === "contained"), Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_classNames, Object(_styles__WEBPACK_IMPORTED_MODULE_10__[/* prefixClassname */ "a"])("button--outlined"), variant === "outlined"), Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_classNames, Object(_styles__WEBPACK_IMPORTED_MODULE_10__[/* prefixClassname */ "a"])("button--".concat(color)), color), Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_classNames, Object(_styles__WEBPACK_IMPORTED_MODULE_10__[/* prefixClassname */ "a"])("button--round"), shape === "round"), Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_classNames, Object(_styles__WEBPACK_IMPORTED_MODULE_10__[/* prefixClassname */ "a"])("button--square"), shape === "square"), Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_classNames, Object(_styles__WEBPACK_IMPORTED_MODULE_10__[/* prefixClassname */ "a"])("button--mini"), size === "mini"), Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_classNames, Object(_styles__WEBPACK_IMPORTED_MODULE_10__[/* prefixClassname */ "a"])("button--small"), size === "small"), Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_classNames, Object(_styles__WEBPACK_IMPORTED_MODULE_10__[/* prefixClassname */ "a"])("button--medium"), size === "medium"), Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_classNames, Object(_styles__WEBPACK_IMPORTED_MODULE_10__[/* prefixClassname */ "a"])("button--large"), size === "large"), Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_classNames, Object(_styles__WEBPACK_IMPORTED_MODULE_10__[/* prefixClassname */ "a"])("button--hairline"), hairline), Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_classNames, Object(_styles__WEBPACK_IMPORTED_MODULE_10__[/* prefixClassname */ "a"])("hairline--surround"), hairline), Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_classNames, Object(_styles__WEBPACK_IMPORTED_MODULE_10__[/* prefixClassname */ "a"])("button--disabled"), disabled), Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_classNames, Object(_styles__WEBPACK_IMPORTED_MODULE_10__[/* prefixClassname */ "a"])("button--loading"), loading), Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_classNames, Object(_styles__WEBPACK_IMPORTED_MODULE_10__[/* prefixClassname */ "a"])("button--block"), block), _classNames), className),
    style: style,
    onClick: function onClick(e) {
      if (!disabled && !loading) {
        _onClick === null || _onClick === void 0 ? void 0 : _onClick(e);
        onCtxClick === null || onCtxClick === void 0 ? void 0 : onCtxClick(e, props);
      }
    },
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxs"])(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__[/* View */ "b"], {
      className: Object(_styles__WEBPACK_IMPORTED_MODULE_10__[/* prefixClassname */ "a"])("button__content"),
      children: [loading !== null && loading !== void 0 ? loading : icon, children && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__[/* View */ "b"], {
        className: Object(_styles__WEBPACK_IMPORTED_MODULE_10__[/* prefixClassname */ "a"])("button__text"),
        children: children
      })]
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(_button_base__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      className: Object(_styles__WEBPACK_IMPORTED_MODULE_10__[/* prefixClassname */ "a"])("button__button"),
      formType: formType === "submit" ? "submit" : formType === "reset" ? "reset" : undefined,
      disabled: disabled || !!loading,
      loading: false
    }, restProps))]
  });
}
function createButton(children, props) {
  if (lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_3___default()(children)) {
    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(Button, Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({}, children), props));
  }

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(Button, Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
    children: children
  }, props));
}

/***/ }),

/***/ "../../packages/core/src/button/index.scss":
/*!**********************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/button/index.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../../packages/core/src/button/index.ts":
/*!********************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/button/index.ts ***!
  \********************************************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button */ "../../packages/core/src/button/button.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _button__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony import */ var _button_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./button.shared */ "../../packages/core/src/button/button.shared.ts");
/* harmony import */ var _button_shared__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_button_shared__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _button_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./button.context */ "../../packages/core/src/button/button.context.ts");




/***/ }),

/***/ "../../packages/core/src/button/style/index.ts":
/*!**************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/button/style/index.ts ***!
  \**************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _styles_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../styles/style */ "../../packages/core/src/styles/style/index.ts");
/* harmony import */ var _loading_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../loading/style */ "../../packages/core/src/loading/style/index.ts");
/* harmony import */ var _button_base_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../button-base/style */ "../../packages/core/src/button-base/style/index.ts");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../index.scss */ "../../packages/core/src/button/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_3__);





/***/ }),

/***/ "../../packages/core/src/hooks/index.tsx":
/*!********************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/hooks/index.tsx ***!
  \********************************************************************************/
/*! exports provided: useDidEffect, useHeight, useMounted, usePlaceholder, useRenderedEffect, useTimeout, useUniqueId, useUpdate, useWindowResize */
/*! exports used: useMounted, useUpdate, useWindowResize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _use_did_effect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-did-effect */ "../../packages/core/src/hooks/use-did-effect.ts");
/* harmony import */ var _use_height__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-height */ "../../packages/core/src/hooks/use-height.ts");
/* harmony import */ var _use_mounted__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-mounted */ "../../packages/core/src/hooks/use-mounted.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _use_mounted__WEBPACK_IMPORTED_MODULE_2__["a"]; });

/* harmony import */ var _use_placeholder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./use-placeholder */ "../../packages/core/src/hooks/use-placeholder.tsx");
/* harmony import */ var _use_rendered_effect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./use-rendered-effect */ "../../packages/core/src/hooks/use-rendered-effect.tsx");
/* harmony import */ var _use_timeout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./use-timeout */ "../../packages/core/src/hooks/use-timeout.ts");
/* harmony import */ var _use_unique_id__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./use-unique-id */ "../../packages/core/src/hooks/use-unique-id.ts");
/* harmony import */ var _use_update__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./use-update */ "../../packages/core/src/hooks/use-update.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _use_update__WEBPACK_IMPORTED_MODULE_7__["a"]; });

/* harmony import */ var _use_window_resize__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./use-window-resize */ "../../packages/core/src/hooks/use-window-resize.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _use_window_resize__WEBPACK_IMPORTED_MODULE_8__["a"]; });











/***/ }),

/***/ "../../packages/core/src/hooks/use-did-effect.ts":
/*!****************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/hooks/use-did-effect.ts ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function useDidEffect(effect, deps) {
  var mounted = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(false);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (mounted.current) {
      effect === null || effect === void 0 ? void 0 : effect();
    } else {
      mounted.current = true;
    }
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  deps);
}

/* unused harmony default export */ var _unused_webpack_default_export = (useDidEffect);

/***/ }),

/***/ "../../packages/core/src/hooks/use-height.ts":
/*!************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/hooks/use-height.ts ***!
  \************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return useHeight; });
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_dom_rect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/dom/rect */ "../../packages/core/src/utils/dom/rect.ts");
/* harmony import */ var _use_mounted__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./use-mounted */ "../../packages/core/src/hooks/use-mounted.ts");




function useHeight(elementOrRef) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(0),
      _useState2 = Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_useState, 2),
      height = _useState2[0],
      setHeight = _useState2[1];

  Object(_use_mounted__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(function () {
    return Object(_utils_dom_rect__WEBPACK_IMPORTED_MODULE_2__[/* getRect */ "a"])(elementOrRef).then(function (rect) {
      return rect === null || rect === void 0 ? void 0 : rect.height;
    }).then(setHeight);
  });
  return height;
}

/***/ }),

/***/ "../../packages/core/src/hooks/use-mounted.ts":
/*!*************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/hooks/use-mounted.ts ***!
  \*************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return useMounted; });
/* harmony import */ var _use_rendered_effect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-rendered-effect */ "../../packages/core/src/hooks/use-rendered-effect.tsx");

function useMounted(cb) {
  Object(_use_rendered_effect__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(cb, []);
}

/***/ }),

/***/ "../../packages/core/src/hooks/use-placeholder.tsx":
/*!******************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/hooks/use-placeholder.tsx ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/components */ "../../node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_format_unit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/format/unit */ "../../packages/core/src/utils/format/unit.ts");
/* harmony import */ var _use_height__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./use-height */ "../../packages/core/src/hooks/use-height.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/cjs/react-jsx-runtime.production.min.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





function usePlaceholder(contentRef, _ref) {
  var className = _ref.className;
  var height = Object(_use_height__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(contentRef);
  return function (_ref2) {
    var children = _ref2.children;
    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])(_tarojs_components__WEBPACK_IMPORTED_MODULE_0__[/* View */ "b"], {
      className: className,
      style: {
        height: height ? "".concat(Object(_utils_format_unit__WEBPACK_IMPORTED_MODULE_2__[/* addUnitPx */ "a"])(height)) : ""
      },
      children: children
    });
  };
}

/***/ }),

/***/ "../../packages/core/src/hooks/use-rendered-effect.tsx":
/*!**********************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/hooks/use-rendered-effect.tsx ***!
  \**********************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var lodash_isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isFunction */ "../../node_modules/lodash/isFunction.js");
/* harmony import */ var lodash_isFunction__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isFunction__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "../../node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);




function useRenderedEffect(effect, deps) {
  var destructorRef = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])();
  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    Object(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__["nextTick"])(function () {
      var destructor = effect === null || effect === void 0 ? void 0 : effect();

      if (lodash_isFunction__WEBPACK_IMPORTED_MODULE_0___default()(destructor)) {
        destructorRef.current = destructor;
      }
    });
    return destructorRef.current;
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  deps);
}

/* harmony default export */ __webpack_exports__["a"] = (useRenderedEffect);

/***/ }),

/***/ "../../packages/core/src/hooks/use-timeout.ts":
/*!*************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/hooks/use-timeout.ts ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function useTimeout() {
  var timerRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  var cbRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  var msRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  var argsRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  var stop = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);
  var start = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (callback, ms) {
    if (timerRef.current) {
      return;
    }

    cbRef.current = callback;
    msRef.current = ms;

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    argsRef.current = args;
    timerRef.current = setTimeout(callback, ms, args);
  }, []);
  var restart = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (callback, ms) {
    stop();

    if (callback) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      start(callback, ms, args);
    } else if (cbRef.current) {
      start(cbRef.current, msRef.current, argsRef.current);
    }
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  []);
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return {
      restart: restart,
      start: start,
      stop: stop
    };
  }, [restart, start, stop]);
}

/* unused harmony default export */ var _unused_webpack_default_export = (useTimeout);

/***/ }),

/***/ "../../packages/core/src/hooks/use-unique-id.ts":
/*!***************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/hooks/use-unique-id.ts ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var lodash_uniqueId__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/uniqueId */ "../../node_modules/lodash/uniqueId.js");
/* harmony import */ var lodash_uniqueId__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_uniqueId__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);



function useUniqueId() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "t_";
  var uniqueIdRef = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(lodash_uniqueId__WEBPACK_IMPORTED_MODULE_0___default()(prefix));
  return uniqueIdRef.current;
}

/* unused harmony default export */ var _unused_webpack_default_export = (useUniqueId);

/***/ }),

/***/ "../../packages/core/src/hooks/use-update.ts":
/*!************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/hooks/use-update.ts ***!
  \************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _taroify_hooks_use_force_update__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @taroify/hooks/use-force-update */ "../../packages/hooks/src/use-force-update/index.ts");

/* harmony default export */ __webpack_exports__["a"] = (_taroify_hooks_use_force_update__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/***/ }),

/***/ "../../packages/core/src/hooks/use-window-resize.tsx":
/*!********************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/hooks/use-window-resize.tsx ***!
  \********************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "../../node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);



function useWindowResize(callback) {
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__["onWindowResize"] === null || _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__["onWindowResize"] === void 0 ? void 0 : Object(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__["onWindowResize"])(callback);
    return function () {
      return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__["offWindowResize"] === null || _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__["offWindowResize"] === void 0 ? void 0 : Object(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__["offWindowResize"])( // @ts-ignore
      callback);
    };
  }, [callback]);
}

/* harmony default export */ __webpack_exports__["a"] = (useWindowResize);

/***/ }),

/***/ "../../packages/core/src/loading/index.scss":
/*!***********************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/loading/index.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../../packages/core/src/loading/index.ts":
/*!*********************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/loading/index.ts ***!
  \*********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _loading__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loading */ "../../packages/core/src/loading/loading.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _loading__WEBPACK_IMPORTED_MODULE_0__["a"]; });



/***/ }),

/***/ "../../packages/core/src/loading/loading.tsx":
/*!************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/loading/loading.tsx ***!
  \************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Loading; });
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/range */ "../../node_modules/lodash/range.js");
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_range__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tarojs/components */ "../../node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles */ "../../packages/core/src/styles/index.ts");
/* harmony import */ var _utils_format_unit__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/format/unit */ "../../packages/core/src/utils/format/unit.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/cjs/react-jsx-runtime.production.min.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);



var _excluded = ["className", "size", "type", "direction", "children"];









var SpinIcon = lodash_range__WEBPACK_IMPORTED_MODULE_2___default()(0, 12).map(function (key) {
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__["jsx"])(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__[/* View */ "b"], {
    className: Object(_styles__WEBPACK_IMPORTED_MODULE_6__[/* prefixClassname */ "a"])("loading__spinner__item")
  }, key);
});

function LoadingSpinner(props) {
  var size = props.size;
  var rootStyle = Object(react__WEBPACK_IMPORTED_MODULE_5__["useMemo"])(function () {
    var _addUnitPx, _addUnitPx2;

    return {
      width: (_addUnitPx = Object(_utils_format_unit__WEBPACK_IMPORTED_MODULE_7__[/* addUnitPx */ "a"])(size)) !== null && _addUnitPx !== void 0 ? _addUnitPx : "",
      height: (_addUnitPx2 = Object(_utils_format_unit__WEBPACK_IMPORTED_MODULE_7__[/* addUnitPx */ "a"])(size)) !== null && _addUnitPx2 !== void 0 ? _addUnitPx2 : ""
    };
  }, [size]);
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__["jsx"])(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__[/* View */ "b"], {
    className: Object(_styles__WEBPACK_IMPORTED_MODULE_6__[/* prefixClassname */ "a"])("loading__spinner"),
    style: rootStyle,
    children: SpinIcon
  });
}

function LoadingCircular(props) {
  var size = props.size;
  var rootStyle = Object(react__WEBPACK_IMPORTED_MODULE_5__["useMemo"])(function () {
    var _addUnitPx3, _addUnitPx4;

    return {
      width: (_addUnitPx3 = Object(_utils_format_unit__WEBPACK_IMPORTED_MODULE_7__[/* addUnitPx */ "a"])(size)) !== null && _addUnitPx3 !== void 0 ? _addUnitPx3 : "",
      height: (_addUnitPx4 = Object(_utils_format_unit__WEBPACK_IMPORTED_MODULE_7__[/* addUnitPx */ "a"])(size)) !== null && _addUnitPx4 !== void 0 ? _addUnitPx4 : ""
    };
  }, [size]);
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__["jsx"])(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__[/* View */ "b"], {
    className: Object(_styles__WEBPACK_IMPORTED_MODULE_6__[/* prefixClassname */ "a"])("loading__circular"),
    style: rootStyle
  });
}

function Loading(props) {
  var className = props.className,
      size = props.size,
      _props$type = props.type,
      type = _props$type === void 0 ? "circular" : _props$type,
      _props$direction = props.direction,
      direction = _props$direction === void 0 ? "horizontal" : _props$direction,
      children = props.children,
      restProps = Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(props, _excluded);

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__["jsxs"])(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__[/* View */ "b"], Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(Object(_styles__WEBPACK_IMPORTED_MODULE_6__[/* prefixClassname */ "a"])("loading"), Object(_styles__WEBPACK_IMPORTED_MODULE_6__[/* prefixClassname */ "a"])("loading--".concat(direction)), Object(_styles__WEBPACK_IMPORTED_MODULE_6__[/* prefixClassname */ "a"])("loading--".concat(type)), className)
  }, restProps), {}, {
    children: [type === "spinner" && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__["jsx"])(LoadingSpinner, {
      size: size
    }), type === "circular" && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__["jsx"])(LoadingCircular, {
      size: size
    }), children && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__["jsx"])(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__[/* View */ "b"], {
      className: Object(_styles__WEBPACK_IMPORTED_MODULE_6__[/* prefixClassname */ "a"])("loading__text"),
      children: children
    })]
  }));
}

/***/ }),

/***/ "../../packages/core/src/loading/style/index.ts":
/*!***************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/loading/style/index.ts ***!
  \***************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _styles_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../styles/style */ "../../packages/core/src/styles/style/index.ts");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index.scss */ "../../packages/core/src/loading/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);



/***/ }),

/***/ "../../packages/core/src/styles/base.scss":
/*!*********************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/styles/base.scss ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../../packages/core/src/styles/index.ts":
/*!********************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/styles/index.ts ***!
  \********************************************************************************/
/*! exports provided: prefixClassname */
/*! exports used: prefixClassname */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _prefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./prefix */ "../../packages/core/src/styles/prefix.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _prefix__WEBPACK_IMPORTED_MODULE_0__["a"]; });



/***/ }),

/***/ "../../packages/core/src/styles/prefix.ts":
/*!*********************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/styles/prefix.ts ***!
  \*********************************************************************************/
/*! exports provided: prefixClassname */
/*! exports used: prefixClassname */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return prefixClassname; });
var COMPONENT_PREFIX = "taroify-";
function prefixClassname(component) {
  return "".concat(COMPONENT_PREFIX).concat(component);
}

/***/ }),

/***/ "../../packages/core/src/styles/style/index.ts":
/*!**************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/styles/style/index.ts ***!
  \**************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _taroify_icons_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @taroify/icons/style */ "../../packages/icons/src/style/index.ts");
/* harmony import */ var _base_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base.scss */ "../../packages/core/src/styles/base.scss");
/* harmony import */ var _base_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_base_scss__WEBPACK_IMPORTED_MODULE_1__);



/***/ }),

/***/ "../../packages/core/src/swiper/index.scss":
/*!**********************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/swiper/index.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../../packages/core/src/swiper/index.ts":
/*!********************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/swiper/index.ts ***!
  \********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./swiper */ "../../packages/core/src/swiper/swiper.tsx");
/* harmony import */ var _swiper_indicator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./swiper-indicator */ "../../packages/core/src/swiper/swiper-indicator.tsx");
/* harmony import */ var _swiper_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./swiper-item */ "../../packages/core/src/swiper/swiper-item.tsx");



var Swiper = _swiper__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"];
Swiper.Item = _swiper_item__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"];
Swiper.Indicator = _swiper_indicator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]; // eslint-disable-next-line @typescript-eslint/no-redeclare

(function (_Swiper) {})(Swiper || (Swiper = {}));

/* harmony default export */ __webpack_exports__["a"] = (Swiper);

/***/ }),

/***/ "../../packages/core/src/swiper/style/index.ts":
/*!**************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/swiper/style/index.ts ***!
  \**************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _styles_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../styles/style */ "../../packages/core/src/styles/style/index.ts");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index.scss */ "../../packages/core/src/swiper/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);



/***/ }),

/***/ "../../packages/core/src/swiper/swiper-indicator.tsx":
/*!********************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/swiper/swiper-indicator.tsx ***!
  \********************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SwiperIndicator; });
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/defineProperty.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/range */ "../../node_modules/lodash/range.js");
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_range__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tarojs/components */ "../../node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../styles */ "../../packages/core/src/styles/index.ts");
/* harmony import */ var _swiper_context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./swiper.context */ "../../packages/core/src/swiper/swiper.context.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/cjs/react-jsx-runtime.production.min.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__);




var _excluded = ["className", "children"];







function SwiperIndicator(props) {
  var _classNames2;

  var className = props.className,
      children = props.children,
      restProps = Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(props, _excluded);

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_6__["useContext"])(_swiper_context__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]),
      _useContext$indicator = _useContext.indicator,
      indicator = _useContext$indicator === void 0 ? 0 : _useContext$indicator,
      direction = _useContext.direction,
      count = _useContext.count;

  var renderIndicator = Object(react__WEBPACK_IMPORTED_MODULE_6__["useCallback"])(function (index) {
    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__["jsx"])(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__[/* View */ "b"], {
      className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(Object(_styles__WEBPACK_IMPORTED_MODULE_7__[/* prefixClassname */ "a"])("swiper__indicator"), Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({}, Object(_styles__WEBPACK_IMPORTED_MODULE_7__[/* prefixClassname */ "a"])("swiper__indicator--active"), index === indicator))
    }, index);
  }, [indicator]);
  var indicators = Object(react__WEBPACK_IMPORTED_MODULE_6__["useMemo"])(function () {
    return !children && lodash_range__WEBPACK_IMPORTED_MODULE_3___default()(0, count).map(renderIndicator);
  }, [children, count, renderIndicator]);
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__["jsx"])(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__[/* View */ "b"], Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    className: classnames__WEBPACK_IMPORTED_MODULE_5___default()((_classNames2 = {}, Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_classNames2, Object(_styles__WEBPACK_IMPORTED_MODULE_7__[/* prefixClassname */ "a"])("swiper__indicators"), !children), Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_classNames2, Object(_styles__WEBPACK_IMPORTED_MODULE_7__[/* prefixClassname */ "a"])("swiper__indicators--vertical"), !children && direction === "vertical"), _classNames2), className),
    children: children !== null && children !== void 0 ? children : indicators
  }, restProps));
}

/***/ }),

/***/ "../../packages/core/src/swiper/swiper-item.tsx":
/*!***************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/swiper/swiper-item.tsx ***!
  \***************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SwiperItem; });
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tarojs/components */ "../../node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../hooks */ "../../packages/core/src/hooks/index.tsx");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../styles */ "../../packages/core/src/styles/index.ts");
/* harmony import */ var _utils_format_unit__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/format/unit */ "../../packages/core/src/utils/format/unit.ts");
/* harmony import */ var _utils_state__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/state */ "../../packages/core/src/utils/state.ts");
/* harmony import */ var _swiper_context__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./swiper.context */ "../../packages/core/src/swiper/swiper.context.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/cjs/react-jsx-runtime.production.min.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__);



var _excluded = ["__dataIndex__", "className", "style", "children"];










function SwiperItem(props) {
  var _props$__dataIndex__ = props.__dataIndex__,
      __dataIndex__ = _props$__dataIndex__ === void 0 ? 0 : _props$__dataIndex__,
      className = props.className,
      styleProp = props.style,
      childrenProp = props.children,
      restProps = Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(props, _excluded);

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(_swiper_context__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"]),
      lazyRender = _useContext.lazyRender,
      size = _useContext.size,
      direction = _useContext.direction,
      loop = _useContext.loop,
      _useContext$indicator = _useContext.indicator,
      indicator = _useContext$indicator === void 0 ? 0 : _useContext$indicator,
      _useContext$count = _useContext.count,
      count = _useContext$count === void 0 ? 0 : _useContext$count,
      itemInstances = _useContext.itemInstances;

  var vertical = direction === "vertical";
  var initializedRef = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(false);
  var mountedRef = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(false);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(0),
      _useState2 = Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_useState, 2),
      offset = _useState2[0],
      setOffset = _useState2[1];

  var shouldRender = Object(react__WEBPACK_IMPORTED_MODULE_5__["useMemo"])(function () {
    if (!lazyRender || initializedRef.current) {
      return true;
    } // wait for all item to mount, so we can get the exact count


    if (!mountedRef.current && indicator !== 0) {
      return false;
    }

    var active = indicator;
    var maxActive = count - 1;
    var prevActive = active === 0 && loop ? maxActive : active - 1;
    var nextActive = active === maxActive && loop ? 0 : active + 1;
    initializedRef.current = __dataIndex__ === active || __dataIndex__ === prevActive || __dataIndex__ === nextActive;
    return initializedRef.current;
  }, [__dataIndex__, count, indicator, lazyRender, loop]);
  Object(_hooks__WEBPACK_IMPORTED_MODULE_6__[/* useMounted */ "a"])(function () {
    mountedRef.current = true;
  });
  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    if (!itemInstances[__dataIndex__]) {
      itemInstances[__dataIndex__] = {
        setOffset: setOffset
      };
    }
  }, [itemInstances, __dataIndex__]);
  var rootStyle = Object(_utils_state__WEBPACK_IMPORTED_MODULE_9__[/* useRendered */ "a"])(function () {
    var style = {};

    if (size) {
      var mainAxis = vertical ? "height" : "width";
      style[mainAxis] = Object(_utils_format_unit__WEBPACK_IMPORTED_MODULE_8__[/* addUnitPx */ "a"])(size);
    }

    style.transform = offset ? "translate".concat(vertical ? "Y" : "X", "(").concat(Object(_utils_format_unit__WEBPACK_IMPORTED_MODULE_8__[/* addUnitPx */ "a"])(offset), ")") : "";
    return style;
  });
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__["jsx"])(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__[/* View */ "b"], Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(Object(_styles__WEBPACK_IMPORTED_MODULE_7__[/* prefixClassname */ "a"])("swiper-item"), className),
    style: Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, styleProp), rootStyle),
    children: shouldRender ? childrenProp : undefined
  }, restProps));
}

/***/ }),

/***/ "../../packages/core/src/swiper/swiper.context.ts":
/*!*****************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/swiper/swiper.context.ts ***!
  \*****************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var SwiperContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])({
  itemInstances: []
});
/* harmony default export */ __webpack_exports__["a"] = (SwiperContext);

/***/ }),

/***/ "../../packages/core/src/swiper/swiper.tsx":
/*!**********************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/swiper/swiper.tsx ***!
  \**********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/defineProperty.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var lodash_clamp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/clamp */ "../../node_modules/lodash/clamp.js");
/* harmony import */ var lodash_clamp__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_clamp__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/regenerator/index.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tarojs/components */ "../../node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tarojs/taro */ "../../node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../hooks */ "../../packages/core/src/hooks/index.tsx");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../styles */ "../../packages/core/src/styles/index.ts");
/* harmony import */ var _utils_dom_computed_style__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/dom/computed-style */ "../../packages/core/src/utils/dom/computed-style.ts");
/* harmony import */ var _utils_dom_event__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../utils/dom/event */ "../../packages/core/src/utils/dom/event.ts");
/* harmony import */ var _utils_dom_rect__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../utils/dom/rect */ "../../packages/core/src/utils/dom/rect.ts");
/* harmony import */ var _utils_format_unit__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../utils/format/unit */ "../../packages/core/src/utils/format/unit.ts");
/* harmony import */ var _utils_raf__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../utils/raf */ "../../packages/core/src/utils/raf.ts");
/* harmony import */ var _utils_state__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../utils/state */ "../../packages/core/src/utils/state.ts");
/* harmony import */ var _utils_touch__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../utils/touch */ "../../packages/core/src/utils/touch.ts");
/* harmony import */ var _swiper_indicator__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./swiper-indicator */ "../../packages/core/src/swiper/swiper-indicator.tsx");
/* harmony import */ var _swiper_item__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./swiper-item */ "../../packages/core/src/swiper/swiper-item.tsx");
/* harmony import */ var _swiper_context__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./swiper.context */ "../../packages/core/src/swiper/swiper.context.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/cjs/react-jsx-runtime.production.min.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__);






var _excluded = ["className", "defaultValue", "value", "lazyRender", "loop", "touchable", "autoplay", "duration", "width", "height", "direction", "stopPropagation", "children", "onChange"];





















function useSwiperChildren(children) {
  var __children__ = {
    items: [],
    indicator: undefined,
    count: 0
  };
  var index = 0;
  react__WEBPACK_IMPORTED_MODULE_10__["Children"].forEach(children, function (child, i) {
    // Skip is not Item of Swiper
    if (! /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_10__["isValidElement"])(child)) {
      return;
    }

    var element = child;
    var elementType = element.type;

    if (elementType === _swiper_indicator__WEBPACK_IMPORTED_MODULE_20__[/* default */ "a"]) {
      __children__.indicator = element;
    } else if (elementType === _swiper_item__WEBPACK_IMPORTED_MODULE_21__[/* default */ "a"]) {
      var key = element.key;

      __children__.items.push( /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_10__["cloneElement"])(element, Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])({}, element.props), {}, {
        key: key !== null && key !== void 0 ? key : i,
        __dataIndex__: index++
      })));
    } else {
      __children__.items.push(element);
    }
  });
  __children__.count = __children__.items.length;
  return __children__;
}

function getIndicatorValue(value, count) {
  return (value + count) % count;
}

function Swiper(props) {
  var className = props.className,
      defaultValue = props.defaultValue,
      valueProp = props.value,
      lazyRender = props.lazyRender,
      _props$loop = props.loop,
      loop = _props$loop === void 0 ? true : _props$loop,
      _props$touchable = props.touchable,
      touchable = _props$touchable === void 0 ? true : _props$touchable,
      _props$autoplay = props.autoplay,
      autoplay = _props$autoplay === void 0 ? 0 : _props$autoplay,
      _props$duration = props.duration,
      duration = _props$duration === void 0 ? 500 : _props$duration,
      width = props.width,
      height = props.height,
      _props$direction = props.direction,
      direction = _props$direction === void 0 ? "horizontal" : _props$direction,
      _props$stopPropagatio = props.stopPropagation,
      stopPropagation = _props$stopPropagatio === void 0 ? true : _props$stopPropagatio,
      childrenProp = props.children,
      onChangeProp = props.onChange,
      restProps = Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(props, _excluded);

  var _useValue = Object(_utils_state__WEBPACK_IMPORTED_MODULE_18__[/* useValue */ "d"])({
    value: valueProp,
    defaultValue: defaultValue,
    onChange: onChangeProp
  }),
      _useValue$value = _useValue.value,
      value = _useValue$value === void 0 ? 0 : _useValue$value,
      setValue = _useValue.setValue;

  var valueRef = Object(_utils_state__WEBPACK_IMPORTED_MODULE_18__[/* useToRef */ "c"])(value);

  var _useSwiperChildren = useSwiperChildren(childrenProp),
      count = _useSwiperChildren.count,
      indicator = _useSwiperChildren.indicator,
      items = _useSwiperChildren.items;

  var itemInstances = Object(react__WEBPACK_IMPORTED_MODULE_10__["useMemo"])(function () {
    return [];
  }, []);
  var touch = Object(_utils_touch__WEBPACK_IMPORTED_MODULE_19__[/* useTouch */ "a"])();
  var update = Object(_hooks__WEBPACK_IMPORTED_MODULE_11__[/* useUpdate */ "b"])();
  var vertical = direction === "vertical";
  var rootRef = Object(react__WEBPACK_IMPORTED_MODULE_10__["useRef"])();
  var rectRef = Object(react__WEBPACK_IMPORTED_MODULE_10__["useRef"])();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_10__["useState"])(0),
      _useState2 = Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_useState, 2),
      offset = _useState2[0],
      setOffset = _useState2[1];

  var swipingRef = Object(react__WEBPACK_IMPORTED_MODULE_10__["useRef"])(false); // Whether to swiping manually

  var activeIndexRef = Object(react__WEBPACK_IMPORTED_MODULE_10__["useRef"])(0);
  var touchStartTimeRef = Object(react__WEBPACK_IMPORTED_MODULE_10__["useRef"])(0);
  var autoplayTimerRef = Object(react__WEBPACK_IMPORTED_MODULE_10__["useRef"])();
  var valueIndicatorRef = Object(_utils_state__WEBPACK_IMPORTED_MODULE_18__[/* useRenderedRef */ "b"])(function () {
    return getIndicatorValue(value, count);
  });
  var activeIndicatorRef = Object(_utils_state__WEBPACK_IMPORTED_MODULE_18__[/* useRenderedRef */ "b"])(function () {
    return getIndicatorValue(activeIndexRef.current, count);
  });
  var getDelta = Object(react__WEBPACK_IMPORTED_MODULE_10__["useCallback"])(function () {
    return vertical ? touch.deltaY : touch.deltaX;
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  []);
  var getCorrectDirection = Object(react__WEBPACK_IMPORTED_MODULE_10__["useCallback"])(function () {
    return touch.direction === direction;
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  []);
  var customRectRef = Object(_utils_state__WEBPACK_IMPORTED_MODULE_18__[/* useRenderedRef */ "b"])(function () {
    var _rectRef$current, _rectRef$current2;

    return {
      width: width !== null && width !== void 0 ? width : (_rectRef$current = rectRef.current) === null || _rectRef$current === void 0 ? void 0 : _rectRef$current.width,
      height: height !== null && height !== void 0 ? height : (_rectRef$current2 = rectRef.current) === null || _rectRef$current2 === void 0 ? void 0 : _rectRef$current2.height
    };
  });
  var propRectRef = Object(_utils_state__WEBPACK_IMPORTED_MODULE_18__[/* useRenderedRef */ "b"])(function () {
    return {
      width: width,
      height: height
    };
  });
  var sizeRef = Object(_utils_state__WEBPACK_IMPORTED_MODULE_18__[/* useRenderedRef */ "b"])(function () {
    var _ref, _customRectRef$curren, _customRectRef$curren2;

    return (_ref = vertical ? (_customRectRef$curren = customRectRef.current) === null || _customRectRef$curren === void 0 ? void 0 : _customRectRef$curren.height : (_customRectRef$curren2 = customRectRef.current) === null || _customRectRef$curren2 === void 0 ? void 0 : _customRectRef$curren2.width) !== null && _ref !== void 0 ? _ref : 0;
  });
  var trackSizeRef = Object(_utils_state__WEBPACK_IMPORTED_MODULE_18__[/* useRenderedRef */ "b"])(function () {
    return count * sizeRef.current;
  });
  var minOffsetRef = Object(_utils_state__WEBPACK_IMPORTED_MODULE_18__[/* useRenderedRef */ "b"])(function () {
    if (rectRef.current) {
      var _ref2, _rectRef$current3, _rectRef$current4;

      var base = (_ref2 = vertical ? (_rectRef$current3 = rectRef.current) === null || _rectRef$current3 === void 0 ? void 0 : _rectRef$current3.height : (_rectRef$current4 = rectRef.current) === null || _rectRef$current4 === void 0 ? void 0 : _rectRef$current4.width) !== null && _ref2 !== void 0 ? _ref2 : 0;
      return base - sizeRef.current * count;
    }

    return 0;
  });
  var maxCountRef = Object(_utils_state__WEBPACK_IMPORTED_MODULE_18__[/* useRenderedRef */ "b"])(function () {
    return Math.ceil(Math.abs(minOffsetRef.current) / sizeRef.current);
  });
  var getTargetActive = Object(react__WEBPACK_IMPORTED_MODULE_10__["useCallback"])(function (pace) {
    if (pace) {
      if (loop) {
        return lodash_clamp__WEBPACK_IMPORTED_MODULE_5___default()(activeIndexRef.current + pace, -1, count);
      }

      return lodash_clamp__WEBPACK_IMPORTED_MODULE_5___default()(activeIndexRef.current + pace, 0, maxCountRef.current);
    }

    return activeIndexRef.current;
  }, [loop, maxCountRef, count]);
  var getTargetOffset = Object(react__WEBPACK_IMPORTED_MODULE_10__["useCallback"])(function (targetActive) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var currentPosition = targetActive * sizeRef.current;

    if (!loop) {
      currentPosition = Math.min(currentPosition, -minOffsetRef.current);
    }

    var targetOffset = offset - currentPosition;

    if (!loop) {
      targetOffset = lodash_clamp__WEBPACK_IMPORTED_MODULE_5___default()(targetOffset, minOffsetRef.current, 0);
    }

    return targetOffset;
  }, [sizeRef, loop, minOffsetRef]);
  var moveTo = Object(react__WEBPACK_IMPORTED_MODULE_10__["useCallback"])(function (_ref3) {
    var _ref3$pace = _ref3.pace,
        pace = _ref3$pace === void 0 ? 0 : _ref3$pace,
        _ref3$offset = _ref3.offset,
        offset = _ref3$offset === void 0 ? 0 : _ref3$offset,
        _ref3$emitChange = _ref3.emitChange,
        emitChange = _ref3$emitChange === void 0 ? false : _ref3$emitChange;

    if (count <= 1) {
      return;
    }

    var targetActive = getTargetActive(pace);
    var targetOffset = getTargetOffset(targetActive, offset);

    if (loop) {
      if (itemInstances[0] && targetOffset !== minOffsetRef.current) {
        var outRightBound = targetOffset < minOffsetRef.current;
        itemInstances[0].setOffset(outRightBound ? trackSizeRef.current : 0);
      }

      if (itemInstances[count - 1] && targetOffset !== 0) {
        var outLeftBound = targetOffset > 0;
        itemInstances[count - 1].setOffset(outLeftBound ? -trackSizeRef.current : 0);
      }
    }

    var previousActiveIndex = activeIndexRef.current;
    activeIndexRef.current = targetActive;
    setOffset(targetOffset);

    if (emitChange && previousActiveIndex !== targetActive) {
      setValue(getIndicatorValue(targetActive, count));
    }
  }, [count, getTargetActive, getTargetOffset, loop, itemInstances, minOffsetRef, trackSizeRef, setValue]);
  var correctPosition = Object(react__WEBPACK_IMPORTED_MODULE_10__["useCallback"])(function () {
    swipingRef.current = true;

    if (activeIndexRef.current <= -1) {
      moveTo({
        pace: count
      });
    } else if (activeIndexRef.current >= count) {
      moveTo({
        pace: -count
      });
    }
  }, [count, moveTo]);
  var swipeTo = Object(react__WEBPACK_IMPORTED_MODULE_10__["useCallback"])(function (index) {
    correctPosition();
    touch.reset();
    Object(_utils_raf__WEBPACK_IMPORTED_MODULE_17__[/* doubleRaf */ "a"])(function () {
      var targetIndex;

      if (loop && index === count) {
        targetIndex = activeIndexRef.current === 0 ? 0 : index;
      } else {
        targetIndex = index % count;
      }

      swipingRef.current = false;
      moveTo({
        pace: targetIndex - activeIndexRef.current,
        emitChange: true
      });
    });
  }, [correctPosition, count, loop, moveTo, touch]); // const previous = useCallback(() => {
  //   correctPosition()
  //   doubleRaf(() => {
  //     swipingRef.current = false
  //     moveTo({
  //       pace: -1,
  //       emitChange: true,
  //     })
  //   })
  // }, [correctPosition, moveTo])

  var next = Object(react__WEBPACK_IMPORTED_MODULE_10__["useCallback"])(function () {
    correctPosition();
    Object(_utils_raf__WEBPACK_IMPORTED_MODULE_17__[/* doubleRaf */ "a"])(function () {
      swipingRef.current = false;
      moveTo({
        pace: 1,
        emitChange: true
      });
    });
  }, [correctPosition, moveTo]);
  var stopAutoplay = Object(react__WEBPACK_IMPORTED_MODULE_10__["useCallback"])(function () {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }
  }, []);
  var startAutoplay = Object(react__WEBPACK_IMPORTED_MODULE_10__["useCallback"])(function () {
    stopAutoplay();

    if (autoplay > 0 && count > 1) {
      autoplayTimerRef.current = setTimeout(function () {
        next();
        startAutoplay();
      }, +autoplay);
    }
  }, [autoplay, count, next, stopAutoplay]);
  var onTouchStart = Object(react__WEBPACK_IMPORTED_MODULE_10__["useCallback"])(function (event) {
    if (!touchable) {
      return;
    }

    touch.start(event);
    touchStartTimeRef.current = Date.now();
    stopAutoplay();
    correctPosition();
  }, [correctPosition, stopAutoplay, touch, touchable]);
  var onTouchMove = Object(react__WEBPACK_IMPORTED_MODULE_10__["useCallback"])(function (event) {
    if (!touchable || !swipingRef.current) {
      return;
    }

    touch.move(event);
    var correctDirection = getCorrectDirection(); // if user starting to touchmove, prevent the event bubbling to
    // avoid affecting the parent components

    var shouldPrevent = correctDirection || touch.offsetY > touch.offsetX === vertical;

    if (shouldPrevent) {
      Object(_utils_dom_event__WEBPACK_IMPORTED_MODULE_14__[/* preventDefault */ "a"])(event, stopPropagation);
    }

    if (correctDirection) {
      moveTo({
        offset: getDelta()
      });
    }
  }, [getCorrectDirection, getDelta, moveTo, stopPropagation, touch, touchable, vertical]);
  var onTouchEnd = Object(react__WEBPACK_IMPORTED_MODULE_10__["useCallback"])(function () {
    if (!touchable || !swipingRef.current) {
      return;
    }

    var duration = Date.now() - touchStartTimeRef.current;
    var delta = getDelta();
    var speed = delta / duration;
    var shouldSwipe = Math.abs(speed) > 0.25 || Math.abs(delta) > sizeRef.current / 2;
    swipingRef.current = false;
    var correctDirection = getCorrectDirection();

    if (shouldSwipe && correctDirection) {
      var _offset = vertical ? touch.offsetY : touch.offsetX;

      var pace;

      if (loop) {
        pace = _offset > 0 ? delta > 0 ? -1 : 1 : 0;
      } else {
        pace = -Math[delta > 0 ? "ceil" : "floor"](delta / sizeRef.current);
      }

      moveTo({
        pace: pace,
        emitChange: true
      });
    } else if (delta) {
      moveTo({
        pace: 0
      });
    }

    startAutoplay();
  }, [touchable, getDelta, sizeRef, getCorrectDirection, startAutoplay, vertical, touch.offsetY, touch.offsetX, loop, moveTo]);
  var getTrackRect = Object(react__WEBPACK_IMPORTED_MODULE_10__["useCallback"])(function () {
    return Promise.all([Object(_utils_dom_rect__WEBPACK_IMPORTED_MODULE_15__[/* getRect */ "a"])(rootRef), Object(_utils_dom_computed_style__WEBPACK_IMPORTED_MODULE_13__[/* getComputedStyle */ "a"])(rootRef, ["width", "height"])]).then(function (_ref4) {
      var _ref5 = Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_ref4, 2),
          rect = _ref5[0],
          style = _ref5[1];

      return Object(_utils_dom_rect__WEBPACK_IMPORTED_MODULE_15__[/* makeRect */ "b"])(style.width === "auto" ? rect.width : Object(_utils_format_unit__WEBPACK_IMPORTED_MODULE_16__[/* unitToPx */ "b"])(style.width), style.height === "auto" ? rect.height : Object(_utils_format_unit__WEBPACK_IMPORTED_MODULE_16__[/* unitToPx */ "b"])(style.height));
    });
  }, []);
  var initialize = Object(react__WEBPACK_IMPORTED_MODULE_10__["useCallback"])( /*#__PURE__*/Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_6___default.a.mark(function _callee() {
    var activeIndex,
        targetOffset,
        _args = arguments;
    return D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_6___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            activeIndex = _args.length > 0 && _args[0] !== undefined ? _args[0] : valueRef.current;

            if (rootRef.current) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return");

          case 3:
            _context.next = 5;
            return getTrackRect();

          case 5:
            rectRef.current = _context.sent;

            if (count) {
              activeIndex = Math.min(count - 1, activeIndex);
            }

            activeIndexRef.current = activeIndex;
            swipingRef.current = true;
            targetOffset = getTargetOffset(activeIndex);
            setOffset(targetOffset); // Force update render

            if (targetOffset === offset) {
              update();
            }

            itemInstances.forEach(function (item) {
              return item.setOffset(0);
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [valueRef, getTrackRect, count, getTargetOffset, offset, itemInstances, update]);
  var resize = Object(react__WEBPACK_IMPORTED_MODULE_10__["useCallback"])(function () {
    return Object(_tarojs_taro__WEBPACK_IMPORTED_MODULE_8__["nextTick"])(function () {
      return initialize(activeIndexRef.current);
    });
  }, [initialize]);
  Object(_hooks__WEBPACK_IMPORTED_MODULE_11__[/* useMounted */ "a"])(initialize);
  Object(_hooks__WEBPACK_IMPORTED_MODULE_11__[/* useWindowResize */ "c"])(resize);
  Object(_hooks__WEBPACK_IMPORTED_MODULE_11__[/* useMounted */ "a"])(function () {
    startAutoplay();
    return stopAutoplay;
  });
  Object(react__WEBPACK_IMPORTED_MODULE_10__["useEffect"])(function () {
    var valueIndicator = valueIndicatorRef.current;
    var activeIndicator = activeIndicatorRef.current;

    if (valueIndicator !== activeIndicator) {
      try {
        stopAutoplay();
        swipeTo(valueIndicator);
      } finally {
        startAutoplay();
      }
    }
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [valueIndicatorRef.current]);
  var trackStyle = Object(_utils_state__WEBPACK_IMPORTED_MODULE_18__[/* useRendered */ "a"])(function () {
    var style = {
      transitionDuration: "".concat(swipingRef.current ? 0 : duration, "ms"),
      transform: "translate".concat(vertical ? "Y" : "X", "(").concat(Object(_utils_format_unit__WEBPACK_IMPORTED_MODULE_16__[/* addUnitPx */ "a"])(offset), ")")
    };

    if (sizeRef.current) {
      var mainAxis = vertical ? "height" : "width";
      style[mainAxis] = "".concat(Object(_utils_format_unit__WEBPACK_IMPORTED_MODULE_16__[/* addUnitPx */ "a"])(trackSizeRef.current));
      var crossAxis = vertical ? "width" : "height";
      var crossAxisValue = propRectRef.current[crossAxis];
      style[crossAxis] = crossAxisValue ? Object(_utils_format_unit__WEBPACK_IMPORTED_MODULE_16__[/* addUnitPx */ "a"])(crossAxisValue) : "";
    }

    return style;
  });
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__["jsx"])(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__[/* View */ "b"], Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])({
    ref: rootRef,
    className: classnames__WEBPACK_IMPORTED_MODULE_9___default()(Object(_styles__WEBPACK_IMPORTED_MODULE_12__[/* prefixClassname */ "a"])("swiper"), className)
  }, restProps), {}, {
    children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__["jsxs"])(_swiper_context__WEBPACK_IMPORTED_MODULE_22__[/* default */ "a"].Provider, {
      value: {
        lazyRender: lazyRender,
        loop: loop,
        direction: direction,
        indicator: activeIndicatorRef.current,
        size: sizeRef.current,
        count: count,
        itemInstances: itemInstances
      },
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__["jsx"])(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__[/* View */ "b"], {
        className: classnames__WEBPACK_IMPORTED_MODULE_9___default()(Object(_styles__WEBPACK_IMPORTED_MODULE_12__[/* prefixClassname */ "a"])("swiper__track"), Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, Object(_styles__WEBPACK_IMPORTED_MODULE_12__[/* prefixClassname */ "a"])("swiper__track--vertical"), vertical)),
        catchMove: true,
        onTouchStart: onTouchStart,
        onTouchMove: onTouchMove,
        onTouchEnd: onTouchEnd,
        onTouchCancel: onTouchEnd,
        style: trackStyle,
        children: items
      }), indicator]
    })
  }));
}

/* harmony default export */ __webpack_exports__["a"] = (Swiper);

/***/ }),

/***/ "../../packages/core/src/utils/base.ts":
/*!******************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/utils/base.ts ***!
  \******************************************************************************/
/*! exports provided: noop, inBrowser, inWechat, inSwan, inAlipay, inQQ, inToutiao */
/*! exports used: inBrowser, inWechat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(document) {/* unused harmony export noop */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return inBrowser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return inWechat; });
/* unused harmony export inSwan */
/* unused harmony export inAlipay */
/* unused harmony export inQQ */
/* unused harmony export inToutiao */
function noop() {}
var inBrowser = typeof document !== "undefined" && !!document.scripts;
var inWechat = "weapp" === "weapp";
var inSwan = "weapp" === "swan";
var inAlipay = "weapp" === "alipay";
var inQQ = "weapp" === "qq";
var inToutiao = "weapp" === "tt";
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! @tarojs/runtime */ "../../node_modules/@tarojs/runtime/dist/runtime.esm.js")["document"]))

/***/ }),

/***/ "../../packages/core/src/utils/dom/computed-style.ts":
/*!********************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/utils/dom/computed-style.ts ***!
  \********************************************************************************************/
/*! exports provided: getComputedStyle */
/*! exports used: getComputedStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(window) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getComputedStyle; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base */ "../../packages/core/src/utils/base.ts");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./element */ "../../packages/core/src/utils/dom/element.ts");


function getComputedStyle(elementOrRef, computedStyle) {
  var element = Object(_element__WEBPACK_IMPORTED_MODULE_1__[/* elementUnref */ "a"])(elementOrRef);

  if (element) {
    if (_base__WEBPACK_IMPORTED_MODULE_0__[/* inBrowser */ "a"]) {
      return Promise.resolve(window.getComputedStyle(element));
    } else {
      return new Promise(function (resolve) {
        Object(_element__WEBPACK_IMPORTED_MODULE_1__[/* queryNodesRef */ "e"])(element).fields({
          computedStyle: computedStyle
        }, function (result) {
          return resolve(result);
        }).exec();
      });
    }
  }

  return Promise.resolve({});
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! @tarojs/runtime */ "../../node_modules/@tarojs/runtime/dist/runtime.esm.js")["window"]))

/***/ }),

/***/ "../../packages/core/src/utils/dom/element.ts":
/*!*************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/utils/dom/element.ts ***!
  \*************************************************************************************/
/*! exports provided: ELEMENT_NODE_TYPE, isWindow, isBodyElement, elementUnref, isRootElement, matchSelector, getElementSelector, prependPageSelector, usePrependPageSelector, queryNodesRef, queryAllNodesRef */
/*! exports used: elementUnref, isRootElement, isWindow, queryAllNodesRef, queryNodesRef */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(window, document) {/* unused harmony export ELEMENT_NODE_TYPE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return isWindow; });
/* unused harmony export isBodyElement */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return elementUnref; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isRootElement; });
/* unused harmony export matchSelector */
/* unused harmony export getElementSelector */
/* unused harmony export prependPageSelector */
/* unused harmony export usePrependPageSelector */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return queryNodesRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return queryAllNodesRef; });
/* harmony import */ var lodash_split__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/split */ "../../node_modules/lodash/split.js");
/* harmony import */ var lodash_split__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_split__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isEmpty */ "../../node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tarojs/taro */ "../../node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base */ "../../packages/core/src/utils/base.ts");




var ELEMENT_NODE_TYPE = 1;
function isWindow(val) {
  return val === window;
}
function isBodyElement(val) {
  return val === document.body;
}
function elementUnref(elementOrRef) {
  if (elementOrRef === undefined || elementOrRef === null) {
    return elementOrRef;
  }

  if ("current" in elementOrRef) {
    return elementOrRef.current;
  }

  return elementOrRef;
}
function isRootElement(node) {
  return (node === null || node === void 0 ? void 0 : node.nodeType) === ELEMENT_NODE_TYPE && (node === null || node === void 0 ? void 0 : node.tagName) === "ROOT";
}
function matchSelector(aSelector, bSelector) {
  return aSelector === bSelector;
}
function getElementSelector(id, className) {
  var selectors = [];

  if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default()(id)) {
    selectors.push("#".concat(id));
  }

  if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default()(className)) {
    selectors.push(lodash_split__WEBPACK_IMPORTED_MODULE_0___default()(className, " ").join("."));
  }

  return selectors.join(".");
}
function prependPageSelector(selector) {
  var _getCurrentInstance$r;

  var path = (_getCurrentInstance$r = Object(_tarojs_taro__WEBPACK_IMPORTED_MODULE_2__["getCurrentInstance"])().router) === null || _getCurrentInstance$r === void 0 ? void 0 : _getCurrentInstance$r.path;
  return path ? "".concat(path, "__").concat(selector) : selector;
}
function usePrependPageSelector(selector) {
  var _useRouter = Object(_tarojs_taro__WEBPACK_IMPORTED_MODULE_2__["useRouter"])(),
      path = _useRouter.path;

  return path ? "".concat(path, "__").concat(selector) : selector;
} // Fix nested in CustomWrapper is undefined
// See: https://github.com/mallfoundry/taroify/pull/143

function ancestorCustomWrapper(element) {
  if (_base__WEBPACK_IMPORTED_MODULE_3__[/* inWechat */ "b"]) {
    var ancestor = element;

    while (ancestor.parentNode && !isRootElement(ancestor.parentNode)) {
      ancestor = ancestor.parentNode;
    }

    if (ancestor && ancestor !== element) {
      return ancestor;
    }
  }
}

function queryNodesRef(element) {
  if (isRootElement(element)) {
    return Object(_tarojs_taro__WEBPACK_IMPORTED_MODULE_2__["createSelectorQuery"])().selectViewport();
  }

  var ancestor = ancestorCustomWrapper(element);

  if (ancestor) {
    return Object(_tarojs_taro__WEBPACK_IMPORTED_MODULE_2__["createSelectorQuery"])().select("#".concat(ancestor.uid, ">>>#").concat(element.uid));
  }

  return Object(_tarojs_taro__WEBPACK_IMPORTED_MODULE_2__["createSelectorQuery"])().select("#" + element.uid);
}
function queryAllNodesRef(element, selector) {
  if (isRootElement(element)) {
    return Object(_tarojs_taro__WEBPACK_IMPORTED_MODULE_2__["createSelectorQuery"])().selectViewport();
  }

  var ancestor = ancestorCustomWrapper(element);

  if (ancestor) {
    return Object(_tarojs_taro__WEBPACK_IMPORTED_MODULE_2__["createSelectorQuery"])().selectAll("#".concat(ancestor.uid, ">>>#").concat(element.uid).concat(selector));
  }

  return Object(_tarojs_taro__WEBPACK_IMPORTED_MODULE_2__["createSelectorQuery"])().selectAll("#" + element.uid + selector);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! @tarojs/runtime */ "../../node_modules/@tarojs/runtime/dist/runtime.esm.js")["window"], __webpack_require__(/*! @tarojs/runtime */ "../../node_modules/@tarojs/runtime/dist/runtime.esm.js")["document"]))

/***/ }),

/***/ "../../packages/core/src/utils/dom/event.ts":
/*!***********************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/utils/dom/event.ts ***!
  \***********************************************************************************/
/*! exports provided: stopPropagation, preventDefault, getClientCoordinates */
/*! exports used: preventDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export stopPropagation */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return preventDefault; });
/* unused harmony export getClientCoordinates */
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base */ "../../packages/core/src/utils/base.ts");

function stopPropagation(event) {
  event.stopPropagation();
}
function preventDefault(event, isStopPropagation) {
  if (_base__WEBPACK_IMPORTED_MODULE_0__[/* inBrowser */ "a"]) {
    // @ts-ignore
    if (typeof event.cancelable !== "boolean" || event.cancelable) {
      event.preventDefault();
    }
  } else {
    event.preventDefault();
  }

  if (isStopPropagation) {
    stopPropagation(event);
  }
}
function getClientCoordinates(event) {
  // @ts-ignore
  var clientX = event.clientX,
      clientY = event.clientY,
      touches = event.touches;

  if (clientX && clientY) {
    return {
      clientX: clientX,
      clientY: clientY
    };
  }

  return touches[0];
}

/***/ }),

/***/ "../../packages/core/src/utils/dom/rect.ts":
/*!**********************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/utils/dom/rect.ts ***!
  \**********************************************************************************/
/*! exports provided: makeRect, getRect, getRects */
/*! exports used: getRect, makeRect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return makeRect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getRect; });
/* unused harmony export getRects */
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base */ "../../packages/core/src/utils/base.ts");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./element */ "../../packages/core/src/utils/dom/element.ts");



function makeRect(width, height) {
  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width: width,
    height: height
  };
}
function getRect(elementOrRef) {
  var element = Object(_element__WEBPACK_IMPORTED_MODULE_2__[/* elementUnref */ "a"])(elementOrRef);

  if (element) {
    if (_base__WEBPACK_IMPORTED_MODULE_1__[/* inBrowser */ "a"]) {
      if (Object(_element__WEBPACK_IMPORTED_MODULE_2__[/* isWindow */ "c"])(element)) {
        var width = element.innerWidth;
        var height = element.innerHeight;
        return Promise.resolve(makeRect(width, height));
      }

      return Promise.resolve(element.getBoundingClientRect());
    } else {
      return new Promise(function (resolve) {
        Object(_element__WEBPACK_IMPORTED_MODULE_2__[/* queryNodesRef */ "e"])(element).boundingClientRect().exec(function (_ref) {
          var _ref2 = Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_ref, 1),
              rect = _ref2[0];

          if (Object(_element__WEBPACK_IMPORTED_MODULE_2__[/* isRootElement */ "b"])(element)) {
            var _width = rect.width,
                _height = rect.height;
            resolve(makeRect(_width, _height));
          } else {
            resolve(rect);
          }
        });
      });
    }
  }

  return Promise.resolve(makeRect(0, 0));
}
function getRects(elementOrRef, selector) {
  var element = Object(_element__WEBPACK_IMPORTED_MODULE_2__[/* elementUnref */ "a"])(elementOrRef);

  if (element) {
    if (_base__WEBPACK_IMPORTED_MODULE_1__[/* inBrowser */ "a"]) {
      var rects = [];
      element.querySelectorAll(selector).forEach(function (oneElement) {
        return rects.push(oneElement.getBoundingClientRect());
      });
      return Promise.resolve(rects);
    } else {
      return new Promise(function (resolve) {
        Object(_element__WEBPACK_IMPORTED_MODULE_2__[/* queryAllNodesRef */ "d"])(element, selector).boundingClientRect().exec(function (_ref3) {
          var _ref4 = Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_ref3, 1),
              rects = _ref4[0];

          return resolve(rects);
        });
      });
    }
  }

  return Promise.resolve([]);
}

/***/ }),

/***/ "../../packages/core/src/utils/format/unit.ts":
/*!*************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/utils/format/unit.ts ***!
  \*************************************************************************************/
/*! exports provided: addUnitPx, getSizeStyle, getZIndexStyle, unitToPx */
/*! exports used: addUnitPx, unitToPx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(document, window) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addUnitPx; });
/* unused harmony export getSizeStyle */
/* unused harmony export getZIndexStyle */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return unitToPx; });
/* harmony import */ var lodash_isString__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isString */ "../../node_modules/lodash/isString.js");
/* harmony import */ var lodash_isString__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isString__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isNumber */ "../../node_modules/lodash/isNumber.js");
/* harmony import */ var lodash_isNumber__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isNumber__WEBPACK_IMPORTED_MODULE_1__);


function addUnitPx(value) {
  return value === undefined ? "" : "".concat(unitToPx(value), "px");
}
function getSizeStyle(originSize) {
  if (lodash_isNumber__WEBPACK_IMPORTED_MODULE_1___default()(originSize) || lodash_isString__WEBPACK_IMPORTED_MODULE_0___default()(originSize)) {
    var size = addUnitPx(originSize);
    return {
      width: size,
      height: size
    };
  }

  return {};
}
function getZIndexStyle(zIndex) {
  var style = {};

  if (zIndex !== undefined) {
    style.zIndex = +zIndex;
  }

  return style;
} // cache

var rootFontSize;

function getRootFontSize() {
  if (!rootFontSize) {
    var doc = document.documentElement;
    var fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;
    rootFontSize = parseFloat(fontSize);
  }

  return rootFontSize;
}

function convertPx(value) {
  value = value.replace(/px/g, "");
  return +value;
}

function convertRem(value) {
  value = value.replace(/rem/g, "");
  return +value * getRootFontSize();
}

function convertVw(value) {
  value = value.replace(/vw/g, "");
  return +value * window.innerWidth / 100;
}

function convertVh(value) {
  value = value.replace(/vh/g, "");
  return +value * window.innerHeight / 100;
}

function unitToPx(value) {
  if (typeof value === "number") {
    return value;
  }

  if (value.includes("px")) {
    return convertPx(value);
  }

  if (value.includes("rem")) {
    return convertRem(value);
  }

  if (value.includes("vw")) {
    return convertVw(value);
  }

  if (value.includes("vh")) {
    return convertVh(value);
  }

  return parseFloat(value);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! @tarojs/runtime */ "../../node_modules/@tarojs/runtime/dist/runtime.esm.js")["document"], __webpack_require__(/*! @tarojs/runtime */ "../../node_modules/@tarojs/runtime/dist/runtime.esm.js")["window"]))

/***/ }),

/***/ "../../packages/core/src/utils/raf.ts":
/*!*****************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/utils/raf.ts ***!
  \*****************************************************************************/
/*! exports provided: cancelRaf, raf, default, doubleRaf */
/*! exports used: doubleRaf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export cancelRaf */
/* unused harmony export raf */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return doubleRaf; });
/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/forEach */ "../../node_modules/lodash/forEach.js");
/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_forEach__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isArray */ "../../node_modules/lodash/isArray.js");
/* harmony import */ var lodash_isArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_isNumber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/isNumber */ "../../node_modules/lodash/isNumber.js");
/* harmony import */ var lodash_isNumber__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isNumber__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var raf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! raf */ "../../node_modules/raf/index.js");
/* harmony import */ var raf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(raf__WEBPACK_IMPORTED_MODULE_3__);




function cancelRaf(rafId) {
  if (lodash_isNumber__WEBPACK_IMPORTED_MODULE_2___default()(rafId)) {
    raf__WEBPACK_IMPORTED_MODULE_3__["cancel"](rafId);
  } else if (lodash_isArray__WEBPACK_IMPORTED_MODULE_1___default()(rafId)) {
    lodash_forEach__WEBPACK_IMPORTED_MODULE_0___default()(rafId, cancelRaf);
  }
}
function raf(cb) {
  // @ts-ignore
  return raf__WEBPACK_IMPORTED_MODULE_3___default.a(cb);
}
/* unused harmony default export */ var _unused_webpack_default_export = (raf);
function doubleRaf(cb) {
  var rafIds = [0, 0];
  rafIds[1] = raf(function () {
    rafIds[0] = raf(cb);
  });
  return rafIds;
}

/***/ }),

/***/ "../../packages/core/src/utils/state.ts":
/*!*******************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/utils/state.ts ***!
  \*******************************************************************************/
/*! exports provided: useToRef, useValue, usePreviousRef, usePrevious, useRendered, useRenderedRef, useRefs, useObject */
/*! exports used: useRendered, useRenderedRef, useToRef, useValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export usePreviousRef */
/* unused harmony export usePrevious */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return useRendered; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return useRenderedRef; });
/* unused harmony export useRefs */
/* unused harmony export useObject */
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isEqual */ "../../node_modules/lodash/isEqual.js");
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isEqual__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _taroify_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @taroify/hooks */ "../../packages/hooks/src/index.ts");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _taroify_hooks__WEBPACK_IMPORTED_MODULE_2__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "d", function() { return _taroify_hooks__WEBPACK_IMPORTED_MODULE_2__["c"]; });






function usePreviousRef(value) {
  var previousRef = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(value);
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    previousRef.current = value;
  });
  return previousRef;
}
function usePrevious(state) {
  return usePreviousRef(state).current;
}
function useRendered(cb) {
  return cb === null || cb === void 0 ? void 0 : cb();
}
function useRenderedRef(cb) {
  var stateRef = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])();

  if (cb) {
    stateRef.current = cb();
  }

  return stateRef;
}
function useRefs() {
  var refs = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])([]);
  var setIndexRefs = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (index) {
    return function (el) {
      if (!refs.current[index]) {
        refs.current[index] = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_3__["createRef"])();
      }

      refs.current[index].current = el;
    };
  }, []);
  return [refs.current, setIndexRefs];
}
function useObject(state) {
  var forceUpdate = Object(_taroify_hooks__WEBPACK_IMPORTED_MODULE_2__[/* useForceUpdate */ "a"])();
  var stateRef = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(state);
  var currentRef = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])();
  var previousRef = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])();

  if (!lodash_isEqual__WEBPACK_IMPORTED_MODULE_1___default()(currentRef.current, state)) {
    previousRef.current = currentRef.current;
    currentRef.current = state;
    stateRef.current = state;
  }

  var setObject = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (newState) {
    stateRef.current = Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, stateRef.current), newState);
    forceUpdate();
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  []);
  var getObject = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function () {
    return stateRef.current;
  }, []);
  return Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    return {
      object: stateRef.current,
      getObject: getObject,
      setObject: setObject
    };
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [stateRef.current, getObject, setObject]);
}

/***/ }),

/***/ "../../packages/core/src/utils/touch.ts":
/*!*******************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/core/src/utils/touch.ts ***!
  \*******************************************************************************/
/*! exports provided: TouchDirection, useTouch */
/*! exports used: useTouch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export TouchDirection */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return useTouch; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var MIN_DISTANCE = 10;
var TouchDirection;

(function (TouchDirection) {
  TouchDirection["Horizontal"] = "horizontal";
  TouchDirection["Vertical"] = "vertical";
})(TouchDirection || (TouchDirection = {}));

function getDirection(x, y) {
  if (x > y && x > MIN_DISTANCE) {
    return TouchDirection.Horizontal;
  }

  if (y > x && y > MIN_DISTANCE) {
    return TouchDirection.Vertical;
  }
}

function emptyFunction() {}

function useTouch() {
  var touchRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])({
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
    offsetX: 0,
    offsetY: 0,
    isVertical: function isVertical() {
      return false;
    },
    isHorizontal: function isHorizontal() {
      return false;
    },
    start: emptyFunction,
    move: emptyFunction,
    reset: emptyFunction
  });
  var isVertical = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
    return touchRef.current.direction === TouchDirection.Vertical;
  }, []);
  var isHorizontal = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
    return touchRef.current.direction === TouchDirection.Horizontal;
  }, []);
  var reset = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
    touchRef.current.deltaX = 0;
    touchRef.current.deltaY = 0;
    touchRef.current.offsetX = 0;
    touchRef.current.offsetY = 0;
    touchRef.current.direction = undefined;
  }, []);
  var start = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (event) {
    reset();
    touchRef.current.startX = event.touches[0].clientX;
    touchRef.current.startY = event.touches[0].clientY;
  }, [reset]);
  var move = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (event) {
    var touch = event.touches[0]; // Fix: Safari back will set clientX to negative number

    touchRef.current.deltaX = touch.clientX < 0 ? 0 : touch.clientX - touchRef.current.startX;
    touchRef.current.deltaY = touch.clientY - touchRef.current.startY;
    touchRef.current.offsetX = Math.abs(touchRef.current.deltaX);
    touchRef.current.offsetY = Math.abs(touchRef.current.deltaY);

    if (!touchRef.current.direction) {
      touchRef.current.direction = getDirection(touchRef.current.offsetX, touchRef.current.offsetY);
    }
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (touchRef.current.isHorizontal !== isHorizontal) {
      touchRef.current.isHorizontal = isHorizontal;
    }
  }, [touchRef, isHorizontal]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (touchRef.current.isVertical !== isVertical) {
      touchRef.current.isVertical = isVertical;
    }
  }, [touchRef, isVertical]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (touchRef.current.reset !== reset) {
      touchRef.current.reset = reset;
    }
  }, [touchRef, reset]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (touchRef.current.start !== start) {
      touchRef.current.start = start;
    }
  }, [touchRef, start]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (touchRef.current.move !== move) {
      touchRef.current.move = move;
    }
  }, [touchRef, move]);
  return touchRef.current;
}

/***/ }),

/***/ "../../packages/hooks/src/index.ts":
/*!**************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/hooks/src/index.ts ***!
  \**************************************************************************/
/*! exports provided: useArea, useCascader, useForceUpdate, useToRef, useUncontrolled */
/*! exports used: useForceUpdate, useToRef, useUncontrolled */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _use_area__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-area */ "../../packages/hooks/src/use-area/index.ts");
/* harmony import */ var _use_cascader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-cascader */ "../../packages/hooks/src/use-cascader/index.ts");
/* harmony import */ var _use_force_update__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-force-update */ "../../packages/hooks/src/use-force-update/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _use_force_update__WEBPACK_IMPORTED_MODULE_2__["a"]; });

/* harmony import */ var _use_to_ref__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./use-to-ref */ "../../packages/hooks/src/use-to-ref/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _use_to_ref__WEBPACK_IMPORTED_MODULE_3__["a"]; });

/* harmony import */ var _use_uncontrolled__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./use-uncontrolled */ "../../packages/hooks/src/use-uncontrolled/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _use_uncontrolled__WEBPACK_IMPORTED_MODULE_4__["a"]; });







/***/ }),

/***/ "../../packages/hooks/src/use-area/area.shared.ts":
/*!*****************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/hooks/src/use-area/area.shared.ts ***!
  \*****************************************************************************************/
/*! exports provided: getAreaData */
/*! exports used: getAreaData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getAreaData; });
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "../../node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);

function getAreaData(data, maxDepth) {
  var province_list = data.province_list,
      city_list = data.city_list,
      county_list = data.county_list;
  var dataArray = [];

  if (maxDepth >= 1 && !lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(province_list)) {
    dataArray.push(province_list);

    if (maxDepth >= 2 && !lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(city_list)) {
      dataArray.push(city_list);

      if (maxDepth >= 3 && !lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(county_list)) {
        dataArray.push(county_list);
      }
    }
  }

  return dataArray;
}

/***/ }),

/***/ "../../packages/hooks/src/use-area/index.ts":
/*!***********************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/hooks/src/use-area/index.ts ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _use_area__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-area */ "../../packages/hooks/src/use-area/use-area.ts");


/***/ }),

/***/ "../../packages/hooks/src/use-area/use-area.ts":
/*!**************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/hooks/src/use-area/use-area.ts ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEqual */ "../../node_modules/lodash/isEqual.js");
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEqual__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isArray */ "../../node_modules/lodash/isArray.js");
/* harmony import */ var lodash_isArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/find */ "../../node_modules/lodash/find.js");
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/get */ "../../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_first__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/first */ "../../node_modules/lodash/first.js");
/* harmony import */ var lodash_first__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_first__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_startsWith__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/startsWith */ "../../node_modules/lodash/startsWith.js");
/* harmony import */ var lodash_startsWith__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_startsWith__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash/forEach */ "../../node_modules/lodash/forEach.js");
/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_forEach__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash_padEnd__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash/padEnd */ "../../node_modules/lodash/padEnd.js");
/* harmony import */ var lodash_padEnd__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_padEnd__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash/map */ "../../node_modules/lodash/map.js");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _use_force_update__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../use-force-update */ "../../packages/hooks/src/use-force-update/index.ts");
/* harmony import */ var _use_to_ref__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../use-to-ref */ "../../packages/hooks/src/use-to-ref/index.ts");
/* harmony import */ var _area_shared__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./area.shared */ "../../packages/hooks/src/use-area/area.shared.ts");













var DEFAULT_AREA_DATA = {
  province_list: {},
  city_list: {},
  county_list: {}
};

function defaultFormatter(list) {
  var index = 0;
  return lodash_map__WEBPACK_IMPORTED_MODULE_8___default()(list, function (label, value) {
    return {
      index: index++,
      value: value,
      label: label,
      children: label
    };
  });
}

function padAreaPrefixToValue(prefix) {
  return lodash_padEnd__WEBPACK_IMPORTED_MODULE_7___default()(prefix, 6, "0");
}

function filterAreaList(list, prefix) {
  var newRecord = {};

  lodash_forEach__WEBPACK_IMPORTED_MODULE_6___default()(list, function (name, code) {
    if (lodash_startsWith__WEBPACK_IMPORTED_MODULE_5___default()(code, prefix)) {
      newRecord[code] = name;
    }
  });

  return newRecord;
}

function getAreaPrefix(value, depth) {
  return value === null || value === void 0 ? void 0 : value.substring(0, depth * 2);
}

function getFirstDivisionPrefix(divisions, depth) {
  var _first2;

  return getAreaPrefix((_first2 = lodash_first__WEBPACK_IMPORTED_MODULE_4___default()(divisions)) === null || _first2 === void 0 ? void 0 : _first2.value, depth);
}

function getAreaPrefixDivision(prefixes, divisions, values, index) {
  var value = lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(values, index);

  var depth = index + 1;
  var valuePrefix = getAreaPrefix(value, depth);

  if (index === 0) {
    prefixes[index] = valuePrefix !== null && valuePrefix !== void 0 ? valuePrefix : getFirstDivisionPrefix(divisions, depth);
  } else {
    var valueSuperiorPrefix = value === null || value === void 0 ? void 0 : value.substring(0, index * 2);
    var superiorPrefix = prefixes[index - 1]; // Easy to debug code

    if (superiorPrefix !== valueSuperiorPrefix) {
      prefixes[index] = getFirstDivisionPrefix(divisions, depth);
    } else {
      prefixes[index] = valuePrefix;
    }
  }

  var valuePad = padAreaPrefixToValue(prefixes[index]);
  return lodash_find__WEBPACK_IMPORTED_MODULE_2___default()(divisions, function (division) {
    return division.value === valuePad;
  });
}

function doAreaSelect(options) {
  var unverifiedValues = options.unverifiedValues,
      dataPrimitive = options.data,
      depth = options.depth,
      formatter = options.formatter;
  var data = Object(_area_shared__WEBPACK_IMPORTED_MODULE_12__[/* getAreaData */ "a"])(dataPrimitive, depth); //

  var prefixes = [];
  var columns = [];
  var nextValueOptions = [];
  var nextValues = [];

  lodash_forEach__WEBPACK_IMPORTED_MODULE_6___default()(data, function (record, index) {
    // const divisions = formatter?.(index === 0 ? record : filterAreaList(record, prefixes[index - 1]))
    // Easy to debug code
    var divisions;

    if (index === 0) {
      divisions = formatter === null || formatter === void 0 ? void 0 : formatter(record);
    } else {
      divisions = formatter === null || formatter === void 0 ? void 0 : formatter(filterAreaList(record, prefixes[index - 1]));
    }

    var division = getAreaPrefixDivision(prefixes, divisions, unverifiedValues, index);
    nextValueOptions[index] = division;
    nextValues[index] = division.value;
    columns[index] = {
      index: index,
      children: divisions
    };
  });

  return {
    columns: columns,
    values: nextValues,
    valueOptions: nextValueOptions
  };
}

function useAreaSelect(options) {
  var unverifiedValues = options.unverifiedValues,
      data = options.data,
      depth = options.depth,
      formatter = options.formatter;
  return Object(react__WEBPACK_IMPORTED_MODULE_9__["useMemo"])(function () {
    return doAreaSelect({
      unverifiedValues: unverifiedValues,
      data: data,
      depth: depth,
      formatter: formatter
    });
  }, [data, depth, formatter, unverifiedValues]);
}

function useAreaValues(value) {
  return Object(react__WEBPACK_IMPORTED_MODULE_9__["useMemo"])(function () {
    return lodash_isArray__WEBPACK_IMPORTED_MODULE_1___default()(value) ? value : [value];
  }, [value]);
}

function useArea() {
  var unverifiedValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$data = options.data,
      data = _options$data === void 0 ? DEFAULT_AREA_DATA : _options$data,
      _options$depth = options.depth,
      depth = _options$depth === void 0 ? 3 : _options$depth,
      _options$formatter = options.formatter,
      formatter = _options$formatter === void 0 ? defaultFormatter : _options$formatter;
  var unverifiedValueRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])(unverifiedValue);
  var forceUpdate = Object(_use_force_update__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])();
  var unverifiedValues = useAreaValues(unverifiedValueRef.current); //

  var _useAreaSelect = useAreaSelect({
    unverifiedValues: unverifiedValues,
    data: data,
    depth: depth,
    formatter: formatter
  }),
      columns = _useAreaSelect.columns,
      values = _useAreaSelect.values,
      valueOptions = _useAreaSelect.valueOptions; //


  var valuesRef = Object(_use_to_ref__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"])(values);
  var valueOptionsRef = Object(_use_to_ref__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"])(valueOptions);
  var getValues = Object(react__WEBPACK_IMPORTED_MODULE_9__["useCallback"])(function () {
    return valuesRef.current;
  }, [valuesRef]);
  var getValueOptions = Object(react__WEBPACK_IMPORTED_MODULE_9__["useCallback"])(function () {
    return valueOptionsRef.current;
  }, [valueOptionsRef]);
  var setValues = Object(react__WEBPACK_IMPORTED_MODULE_9__["useCallback"])(function (newValues) {
    unverifiedValueRef.current = newValues;
    forceUpdate();
  }, [forceUpdate]); //

  Object(react__WEBPACK_IMPORTED_MODULE_9__["useEffect"])(function () {
    if (!lodash_isEqual__WEBPACK_IMPORTED_MODULE_0___default()(valuesRef.current, unverifiedValue)) {
      setValues(unverifiedValue);
    }
  }, [setValues, unverifiedValue, valuesRef]); //

  return Object(react__WEBPACK_IMPORTED_MODULE_9__["useMemo"])(function () {
    return {
      columns: columns,
      values: values,
      valueOptions: valueOptions,
      getValues: getValues,
      getValueOptions: getValueOptions,
      setValues: setValues
    };
  }, [columns, getValueOptions, getValues, setValues, valueOptions, values]);
}

/***/ }),

/***/ "../../packages/hooks/src/use-cascader/index.ts":
/*!***************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/hooks/src/use-cascader/index.ts ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _use_cascader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-cascader */ "../../packages/hooks/src/use-cascader/use-cascader.ts");


/***/ }),

/***/ "../../packages/hooks/src/use-cascader/use-cascader.new.ts":
/*!**************************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/hooks/src/use-cascader/use-cascader.new.ts ***!
  \**************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return useCascaderNew; });
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isEqual */ "../../node_modules/lodash/isEqual.js");
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isEqual__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/range */ "../../node_modules/lodash/range.js");
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_range__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_size__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/size */ "../../node_modules/lodash/size.js");
/* harmony import */ var lodash_size__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_size__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_clamp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/clamp */ "../../node_modules/lodash/clamp.js");
/* harmony import */ var lodash_clamp__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_clamp__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/isEmpty */ "../../node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash_isUndefined__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash/isUndefined */ "../../node_modules/lodash/isUndefined.js");
/* harmony import */ var lodash_isUndefined__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_isUndefined__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash/get */ "../../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _use_to_ref__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../use-to-ref */ "../../packages/hooks/src/use-to-ref/index.ts");
/* harmony import */ var _use_cascader_shared__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./use-cascader.shared */ "../../packages/hooks/src/use-cascader/use-cascader.shared.ts");












function doCascadeSelect(_ref) {
  var values = _ref.value,
      options = _ref.data;
  var newValues = [];
  var newColumns = [];
  newColumns.push({
    children: options
  });
  var cursorOptions = options;
  var depth = 0;

  for (;;) {
    var _value = lodash_get__WEBPACK_IMPORTED_MODULE_7___default()(values, depth);

    var nextOption = Object(_use_cascader_shared__WEBPACK_IMPORTED_MODULE_10__[/* findCascadeOption */ "a"])(cursorOptions, _value, true);

    if (lodash_isUndefined__WEBPACK_IMPORTED_MODULE_6___default()(nextOption)) {
      break;
    }

    var newValue = nextOption.value,
        nextOptions = nextOption.children;
    newValues.push(newValue);

    if (!nextOptions || lodash_isEmpty__WEBPACK_IMPORTED_MODULE_5___default()(nextOptions)) {
      break;
    }

    newColumns.push(nextOption);
    cursorOptions = nextOptions;
    depth++;
  }

  return [newColumns, newValues];
}

function useCascadeSelect(options) {
  var value = options.value,
      data = options.data,
      depth = options.depth;
  return Object(react__WEBPACK_IMPORTED_MODULE_8__["useMemo"])(function () {
    return doCascadeSelect({
      value: value,
      data: data,
      depth: depth
    });
  }, [data, depth, value]);
}

function useCascaderNew(_ref2) {
  var _ref2$value = _ref2.value,
      values = _ref2$value === void 0 ? [] : _ref2$value,
      _ref2$depth = _ref2.depth,
      maxDepth = _ref2$depth === void 0 ? 0 : _ref2$depth,
      _ref2$data = _ref2.data,
      data = _ref2$data === void 0 ? [] : _ref2$data,
      onChange = _ref2.onChange;
  maxDepth = lodash_clamp__WEBPACK_IMPORTED_MODULE_4___default()(maxDepth, 0, maxDepth);
  var onChangeRef = Object(_use_to_ref__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])(onChange);

  var _useCascadeSelect = useCascadeSelect({
    value: values,
    depth: maxDepth,
    data: data
  }),
      _useCascadeSelect2 = Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_useCascadeSelect, 2),
      columns = _useCascadeSelect2[0],
      newValues = _useCascadeSelect2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_8__["useEffect"])(function () {
    if (maxDepth !== 0 && maxDepth > lodash_size__WEBPACK_IMPORTED_MODULE_3___default()(columns)) {
      lodash_range__WEBPACK_IMPORTED_MODULE_2___default()(maxDepth - lodash_size__WEBPACK_IMPORTED_MODULE_3___default()(columns)).map(function () {
        return [];
      }).forEach(function (e) {
        return columns.push(e);
      });
    }

    if (!lodash_isEqual__WEBPACK_IMPORTED_MODULE_1___default()(values, newValues)) {
      var _onChangeRef$current;

      (_onChangeRef$current = onChangeRef.current) === null || _onChangeRef$current === void 0 ? void 0 : _onChangeRef$current.call(onChangeRef, newValues);
    }
  }, [columns, maxDepth, newValues, onChangeRef, values]);
  return {
    columns: columns
  };
}

/***/ }),

/***/ "../../packages/hooks/src/use-cascader/use-cascader.old.ts":
/*!**************************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/hooks/src/use-cascader/use-cascader.old.ts ***!
  \**************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return useCascaderOld; });
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js");
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/range */ "../../node_modules/lodash/range.js");
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_range__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_size__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/size */ "../../node_modules/lodash/size.js");
/* harmony import */ var lodash_size__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_size__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_isUndefined__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/isUndefined */ "../../node_modules/lodash/isUndefined.js");
/* harmony import */ var lodash_isUndefined__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_isUndefined__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/isEmpty */ "../../node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash_clamp__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash/clamp */ "../../node_modules/lodash/clamp.js");
/* harmony import */ var lodash_clamp__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_clamp__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _use_cascader_shared__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./use-cascader.shared */ "../../packages/hooks/src/use-cascader/use-cascader.shared.ts");









function useCascaderOld(_ref) {
  var _ref$value = _ref.value,
      values = _ref$value === void 0 ? [] : _ref$value,
      _ref$depth = _ref.depth,
      depth = _ref$depth === void 0 ? 0 : _ref$depth,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? [] : _ref$options;
  depth = lodash_clamp__WEBPACK_IMPORTED_MODULE_6___default()(depth, 0, depth);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_7__["useState"])([]),
      _useState2 = Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_useState, 2),
      columns = _useState2[0],
      setColumns = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_7__["useEffect"])(function () {
    var newColumns = [];
    newColumns.push(options);

    if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_5___default()(values)) {
      var cursorOptions = options;

      var _iterator = Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(values),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var value = _step.value;
          var nextOption = Object(_use_cascader_shared__WEBPACK_IMPORTED_MODULE_8__[/* findCascadeOption */ "a"])(cursorOptions, value);

          if (lodash_isUndefined__WEBPACK_IMPORTED_MODULE_4___default()(nextOption)) {
            break;
          }

          var nextOptions = nextOption.children;

          if (!nextOptions || lodash_isEmpty__WEBPACK_IMPORTED_MODULE_5___default()(nextOptions)) {
            break;
          }

          cursorOptions = nextOptions;
          newColumns.push(nextOptions);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    if (depth !== 0 && depth > lodash_size__WEBPACK_IMPORTED_MODULE_3___default()(newColumns)) {
      lodash_range__WEBPACK_IMPORTED_MODULE_2___default()(depth - lodash_size__WEBPACK_IMPORTED_MODULE_3___default()(newColumns)).map(function () {
        return [];
      }).forEach(function (e) {
        return newColumns.push(e);
      });
    }

    setColumns(newColumns);
  }, [depth, options, values]);
  return {
    columns: columns
  };
}

/***/ }),

/***/ "../../packages/hooks/src/use-cascader/use-cascader.shared.ts":
/*!*****************************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/hooks/src/use-cascader/use-cascader.shared.ts ***!
  \*****************************************************************************************************/
/*! exports provided: findCascadeOption */
/*! exports used: findCascadeOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return findCascadeOption; });
/* harmony import */ var lodash_first__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/first */ "../../node_modules/lodash/first.js");
/* harmony import */ var lodash_first__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_first__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isUndefined__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isUndefined */ "../../node_modules/lodash/isUndefined.js");
/* harmony import */ var lodash_isUndefined__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isUndefined__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/find */ "../../node_modules/lodash/find.js");
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_2__);



function findCascadeOption(options, value) {
  var defaultFirst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var option = lodash_find__WEBPACK_IMPORTED_MODULE_2___default()(options, function (option) {
    return option.value === value;
  });

  return lodash_isUndefined__WEBPACK_IMPORTED_MODULE_1___default()(option) && defaultFirst ? lodash_first__WEBPACK_IMPORTED_MODULE_0___default()(options) : option;
}

/***/ }),

/***/ "../../packages/hooks/src/use-cascader/use-cascader.ts":
/*!**********************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/hooks/src/use-cascader/use-cascader.ts ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _use_cascader_new__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-cascader.new */ "../../packages/hooks/src/use-cascader/use-cascader.new.ts");
/* harmony import */ var _use_cascader_old__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./use-cascader.old */ "../../packages/hooks/src/use-cascader/use-cascader.old.ts");


var _excluded = ["data"];



function useCascader(_ref) {
  var data = _ref.data,
      restOptions = Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_ref, _excluded);

  var useCompatibleCascader = data ? _use_cascader_new__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"] : _use_cascader_old__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"];
  return useCompatibleCascader(Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    data: data
  }, restOptions));
}

/* unused harmony default export */ var _unused_webpack_default_export = (useCascader);

/***/ }),

/***/ "../../packages/hooks/src/use-force-update/index.ts":
/*!*******************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/hooks/src/use-force-update/index.ts ***!
  \*******************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _use_force_update__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-force-update */ "../../packages/hooks/src/use-force-update/use-force-update.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _use_force_update__WEBPACK_IMPORTED_MODULE_0__["a"]; });



/***/ }),

/***/ "../../packages/hooks/src/use-force-update/use-force-update.ts":
/*!******************************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/hooks/src/use-force-update/use-force-update.ts ***!
  \******************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);



var updateReducer = function updateReducer(num) {
  return (num + 1) % 1000000;
};

function useForceUpdate() {
  var _useReducer = Object(react__WEBPACK_IMPORTED_MODULE_1__["useReducer"])(updateReducer, 0),
      _useReducer2 = Object(D_Projects_WebstormProjects_vant_taro_problems_unconfirmed_node_modules_babel_preset_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_useReducer, 2),
      update = _useReducer2[1];

  return update;
}

/* harmony default export */ __webpack_exports__["a"] = (useForceUpdate);

/***/ }),

/***/ "../../packages/hooks/src/use-to-ref/index.ts":
/*!*************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/hooks/src/use-to-ref/index.ts ***!
  \*************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _use_to_ref__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-to-ref */ "../../packages/hooks/src/use-to-ref/use-to-ref.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _use_to_ref__WEBPACK_IMPORTED_MODULE_0__["a"]; });



/***/ }),

/***/ "../../packages/hooks/src/use-to-ref/use-to-ref.ts":
/*!******************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/hooks/src/use-to-ref/use-to-ref.ts ***!
  \******************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return useToRef; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function useToRef(value) {
  var stateRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  stateRef.current = value;
  return stateRef;
}

/***/ }),

/***/ "../../packages/hooks/src/use-uncontrolled/index.ts":
/*!*******************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/hooks/src/use-uncontrolled/index.ts ***!
  \*******************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _use_uncontrolled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-uncontrolled */ "../../packages/hooks/src/use-uncontrolled/use-uncontrolled.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _use_uncontrolled__WEBPACK_IMPORTED_MODULE_0__["a"]; });



/***/ }),

/***/ "../../packages/hooks/src/use-uncontrolled/use-uncontrolled.ts":
/*!******************************************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/hooks/src/use-uncontrolled/use-uncontrolled.ts ***!
  \******************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return useUncontrolled; });
/* harmony import */ var lodash_isUndefined__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isUndefined */ "../../node_modules/lodash/isUndefined.js");
/* harmony import */ var lodash_isUndefined__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isUndefined__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _use_force_update__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../use-force-update */ "../../packages/hooks/src/use-force-update/index.ts");
/* harmony import */ var _use_to_ref__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../use-to-ref */ "../../packages/hooks/src/use-to-ref/index.ts");




function useUncontrolled() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultValue = options.defaultValue,
      valueProp = options.value,
      onChange = options.onChange;
  var forceUpdate = Object(_use_force_update__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(); //

  var valueRef = Object(_use_to_ref__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(valueProp);
  var stateRef = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(defaultValue !== null && defaultValue !== void 0 ? defaultValue : valueRef.current);

  if (valueRef.current !== undefined) {
    stateRef.current = valueRef.current;
  }

  var setValue = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (newValue, emitChange) {
    var _ref;

    if (lodash_isUndefined__WEBPACK_IMPORTED_MODULE_0___default()(valueRef.current)) {
      stateRef.current = newValue;
      forceUpdate();
    }

    ;
    (_ref = emitChange !== null && emitChange !== void 0 ? emitChange : onChange) === null || _ref === void 0 ? void 0 : _ref(newValue);
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [onChange]);
  var getValue = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function () {
    return stateRef.current;
  }, []);
  return Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
    return {
      value: stateRef.current,
      getValue: getValue,
      setValue: setValue
    };
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [stateRef.current, getValue, setValue]);
}

/***/ }),

/***/ "../../packages/icons/src/style/index.ts":
/*!********************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/icons/src/style/index.ts ***!
  \********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _van_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../van/index.scss */ "../../packages/icons/src/van/index.scss");
/* harmony import */ var _van_index_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_van_index_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_icon_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/icon.scss */ "../../packages/icons/src/styles/icon.scss");
/* harmony import */ var _styles_icon_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_icon_scss__WEBPACK_IMPORTED_MODULE_1__);



/***/ }),

/***/ "../../packages/icons/src/styles/icon.scss":
/*!**********************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/icons/src/styles/icon.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../../packages/icons/src/van/index.scss":
/*!********************************************************************************!*\
  !*** D:/Projects/WebstormProjects/vant-taro/packages/icons/src/van/index.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \****************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _asyncToGenerator; });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

/***/ }),

/***/ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _createForOfIteratorHelper; });
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = Object(_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

/***/ }),

/***/ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectSpread2.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectSpread2.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _objectSpread2; });
/* harmony import */ var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defineProperty.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/defineProperty.js");


function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      Object(_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

/***/ }),

/***/ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _objectWithoutProperties; });
/* harmony import */ var _objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objectWithoutPropertiesLoose.js */ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = Object(_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

/***/ }),

/***/ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _objectWithoutPropertiesLoose; });
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

/***/ }),

/***/ "./node_modules/babel-preset-taro/node_modules/@babel/runtime/regenerator/index.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/babel-preset-taro/node_modules/@babel/runtime/regenerator/index.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "../../node_modules/@tarojs/mini-runner/node_modules/regenerator-runtime/runtime-module.js");

/***/ }),

/***/ "./src/pages/index/index.tsx":
/*!***********************************!*\
  !*** ./src/pages/index/index.tsx ***!
  \***********************************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "../../node_modules/@tarojs/runtime/dist/runtime.esm.js");
/* harmony import */ var _node_modules_tarojs_mini_runner_node_modules_babel_loader_lib_index_js_index_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/@tarojs/mini-runner/node_modules/babel-loader/lib!./index.tsx */ "../../node_modules/@tarojs/mini-runner/node_modules/babel-loader/lib/index.js!./src/pages/index/index.tsx");


var config = {"navigationBarTitleText":"首页"};


var inst = Page(Object(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__["createPageConfig"])(_node_modules_tarojs_mini_runner_node_modules_babel_loader_lib_index_js_index_tsx__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], 'pages/index/index', {root:{cn:[]}}, config || {}))




/***/ })

},[["./src/pages/index/index.tsx","runtime","taro","lodash","vendors"]]]);
//# sourceMappingURL=index.js.map