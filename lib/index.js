(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("recoil"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["recoil", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("recoil"), require("react")) : factory(root["Recoil"], root["React"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, (__WEBPACK_EXTERNAL_MODULE__727__, __WEBPACK_EXTERNAL_MODULE__185__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 185:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__185__;

/***/ }),

/***/ 727:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__727__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DebugObserver": () => (/* binding */ DebugObserver)
/* harmony export */ });
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(727);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(recoil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(185);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const postContentScriptLoaded = [];
let isContentScriptLoaded = false;
window.addEventListener("message", ev => {
  if (ev.data.type && ev.data.type === "FROM_CONTENT_SCRIPT") {
    if (typeof ev.data.payload === "object" && typeof ev.data.payload.isLoaded === "boolean") {
      isContentScriptLoaded = ev.data.payload.isLoaded;
      if (isContentScriptLoaded) {
        console.log("content script loaded");
        postContentScriptLoaded.reduce((acc, fn) => {
          fn();
          return acc;
        }, []);
      }
    }
  }
});
const appendToGlobalRecoilState = (id, atomState) => {
  const {
    key,
    value
  } = atomState;
  window.recoilDevtoolsHelper.stateMap[id] = atomState;
  window.recoilDevtoolsHelper.atomsState[key] = value;
  const payload = {
    atoms: {
      stateTransition: {
        snapshotId: id,
        atomName: key,
        atomValue: value
      }
    }
  };
  const fn = () => window.postMessage({
    payload: JSON.stringify(payload),
    type: "FROM_RECOIL"
  }, "*");
  if (isContentScriptLoaded) {
    fn();
  } else {
    postContentScriptLoaded.push(fn);
  }
};
function DebugObserver() {
  console.log("inside lib", (react__WEBPACK_IMPORTED_MODULE_1___default().version));
  window.recoilDevtoolsHelper = {
    stateMap: {},
    atomsState: {}
  };
  window.captureUnmodifiedState = window.captureUnmodifiedState != undefined ? true : window.captureUnmodifiedState;
  (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilTransactionObserver_UNSTABLE)(async ({
    snapshot
  }) => {
    const id = snapshot.getID();
    console.log("-----------");
    console.log("Snapshot ID", id);
    for (const node of snapshot.getNodes_UNSTABLE({
      isModified: !window.captureUnmodifiedState
    })) {
      const value = await snapshot.getPromise(node);
      const atomState = {
        key: node.key,
        value: value
      };
      appendToGlobalRecoilState(id, atomState);
      console.log(node.key, value);
    }
    window.captureUnmodifiedState = false;
  });
  return null;
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});