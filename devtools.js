/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 816:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c": () => (/* binding */ initiateUI)
/* harmony export */ });
/* harmony import */ var json_viewer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(134);
/* harmony import */ var json_viewer_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(json_viewer_js__WEBPACK_IMPORTED_MODULE_0__);

var selectedTab = null;
var selectedAtom = null;
const visualizeAnyData = (container, data) => {
  const showInContainer = () => {
    container.innerHTML = JSON.stringify(data);
  };
  switch (typeof data) {
    case "object":
      new (json_viewer_js__WEBPACK_IMPORTED_MODULE_0___default())({
        container,
        data: JSON.stringify(data),
        theme: "dark",
        expand: true
      });
      break;
    case "undefined":
      data = "";
    // case "string":
    // case "number":
    // case "boolean":
    // case "bigint":
    default:
      showInContainer();
      break;
  }
};
const visualizeTransitions = data => {
  const transitionContainerElRef = document.getElementById("transition-container");
  const transitionContainerEl = transitionContainerElRef.cloneNode(true);
  transitionContainerEl.style.display = "block";
  const dataContainerEl = document.getElementById("data-container");
  dataContainerEl.innerHTML = "";
  dataContainerEl.appendChild(transitionContainerEl);
  for (let i = data.length - 1; i--; i >= 0) {
    const dataEl = data[i];
    const {
      atomName,
      diffValue,
      snapshotId,
      value
    } = dataEl;
    console.log(diffValue);
    const listItemEl = document.createElement("li");
    listItemEl.classList.add("uk-flex-column");
    listItemEl.classList.add("uk-parent");
    listItemEl.innerHTML = `
          <pre><div class="uk-flex uk-flex-between">
            <div class="uk-text-bold">AtomName = ${atomName} \t\t\t\t SnapshotID = ${snapshotId}</div>
            <span uk-nav-parent-icon></span>
          </div></pre>
          <ul class="uk-nav-sub uk-background-secondary uk-padding-small" id=${"snapshotId-" + snapshotId}>
          </ul>
        `;
    transitionContainerEl.appendChild(listItemEl);
    const el = document.getElementById("snapshotId-" + snapshotId);
    visualizeAnyData(el, value);
  }
};
const initiateUI = dataString => {
  try {
    const json = JSON.parse(dataString);
    const removePreviousAtomStyle = () => {
      if (selectedAtom != null && selectedAtom.classList) {
        selectedAtom.classList.remove("uk-active");
      }
    };
    const currentStateEl = document.getElementById("currentStateNavSelector");
    const transitionEl = document.getElementById("transitionNavSelector");
    const dataContainerEl = document.getElementById("data-container");
    currentStateEl.addEventListener("click", ev => {
      selectedTab = currentStateEl;
      transitionEl.classList.remove("uk-active");
      currentStateEl.classList.add("uk-active");
      removePreviousAtomStyle();
    });
    transitionEl.addEventListener("click", ev => {
      selectedTab = transitionEl;
      transitionEl.classList.add("uk-active");
      currentStateEl.classList.remove("uk-active");
      removePreviousAtomStyle();
      dataContainerEl.innerHTML = "";
      console.log(json.transitions);
      visualizeTransitions(json.transitions);
    });
    const currentStateChilds = document.getElementById("currentStateNavChilds");
    currentStateChilds.innerHTML = "";
    const atoms = Object.keys(json.currentState);
    atoms.forEach(atomName => {
      const atomParentEl = document.createElement("li");
      const atomEl = document.createElement("a");
      const atomValue = json.currentState[atomName];
      atomEl.href = "#";
      atomEl.innerHTML = atomName;
      atomParentEl.appendChild(atomEl);
      atomParentEl.addEventListener("click", ev => {
        console.log("clicked " + atomName, ev.target, atomParentEl);
        removePreviousAtomStyle();
        selectedAtom = atomParentEl;
        atomParentEl.classList.add("uk-active");
        dataContainerEl.innerHTML = "";
        visualizeAnyData(dataContainerEl, atomValue);
      });
      currentStateChilds.appendChild(atomParentEl);
    });

    // on state change executions
    if (selectedTab === transitionEl) {
      visualizeTransitions(json.transitions);
    } else if (selectedTab === currentStateEl && selectedAtom != null) {
      console.log("selctedAtom", selectedAtom);
      selectedAtom.click();
    }
  } catch (e) {
    console.error("[error parsing data]", e);
  }
};

// diffValue.forEach((e) => {
//   console.log(e);
//   const sign = e[0];
//   const key = e[1];
//   const value1 = JSON.stringify(e[2]);
//   const value2 = JSON.stringify(e[3]);

//   const diffItemEl = document.createElement("li");
//   diffItemEl.style.listStyle = "none";
//   diffItemEl.classList.add("uk-flex");
//   // diffItemEl.classList.add("uk-flex-around");
//   diffItemEl.classList.add("uk-padding-small");
//   diffItemEl.classList.add("uk-text-bold");
//   // const randomId = Math.random() * 10000;
//   // const randomId2 = Math.random() * 10000;
//   diffItemEl.innerHTML = `
//     <div class="${
//       sign === "+"
//         ? "uk-text-success"
//         : sign === "-"
//         ? "uk-text-danger"
//         : "uk-text-warning"
//     } uk-margin-small-right">${sign}</div>
//     <div class="uk-text-bold uk-margin-small-right">${key}</div>
//     <div class="uk-text-regular uk-margin-small-right">${value1}</div>
//     ${
//       value2 != undefined
//         ? `<div class="uk-text-regular">${value2}</div>`
//         : ""
//     }
//   `;
//   document
//     .getElementById("snapshotId-" + snapshotId)
//     .appendChild(diffItemEl);
// });

/***/ }),

/***/ 134:
/***/ ((module) => {

!function(n,r){if(true)module.exports=r();else { var e, t; }}(window,(function(){return function(n){function r(e){if(t[e])return t[e].exports;var o=t[e]={i:e,l:!1,exports:{}};return n[e].call(o.exports,o,o.exports,r),o.l=!0,o.exports}var t={};return r.m=n,r.c=t,r.d=function(n,t,e){r.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:e})},r.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},r.t=function(n,t){if(1&t&&(n=r(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var o in n)r.d(e,o,function(r){return n[r]}.bind(null,o));return e},r.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(t,"a",t),t},r.o=function(n,r){return Object.prototype.hasOwnProperty.call(n,r)},r.p="",r(r.s=0)}([function(n,r,t){function e(n){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function o(n){return"[object Array]"===c.call(n)}function i(n){return"[object Object]"===c.call(n)}function a(n){return"[object Null]"===c.call(n)}function l(n){if(this.options=Object.assign({theme:"light",container:null,data:"{}",expand:!1},n),a(n.container))throw new Error("Container: dom element is required");this.render()}t(1);var c=Object.prototype.toString;l.prototype.renderRight=function(n,r,t){!function(n){return"number"==typeof n}(t)?function(n){return"boolean"==typeof n}(t)?r.setAttribute("class",n+"rightBoolean"):"null"===t?r.setAttribute("class",n+"rightNull"):r.setAttribute("class",n+"rightString"):r.setAttribute("class",n+"rightNumber"),r.innerText=t},l.prototype.renderChildren=function(n,r,t,e,o,a){var l=this,c=this.createElement("span"),s=this.options.expand?"rotate90":"",u=this.options.expand?"add-height":"";c.setAttribute("class",n+"folder "+s),c.onclick=function(n){var r=n.target.parentNode.nextSibling;l.toggleItem(r,n.target)};var f=0,d=!1;i(t)?(f=Object.keys(t).length,d=!0):f=t.length,a.innerHTML=d?r+"&nbsp;&nbsp{"+f+"}":r+"&nbsp;&nbsp["+f+"]",a.prepend(c),e.setAttribute("class",n+"rightObj "+u),l.parse(t,e,o+0,n)},l.prototype.parse=function(n,r,t,o){var i=this;this.forEach(n,(function(n,a){var l=i.createItem(t,o,r,a,"object"!==e(n)),c=l.left,s=l.right;"object"===e(n)?i.renderChildren(o,a,n,s,t,c):i.renderRight(o,s,n)}))},l.prototype.createItem=function(n,r,t,e,o){var i=this,a=this.createElement("div"),l=this.createElement("div"),c=this.createElement("div"),s=this.createElement("div");return a.style.marginLeft=2*n+"px",l.innerHTML="".concat(e,'<span class="jv-').concat(r,'-symbol">&nbsp;:&nbsp;</span>'),o?(a.appendChild(s),s.appendChild(l),s.appendChild(c),t.appendChild(a),a.setAttribute("class",r+"current"),s.setAttribute("class","jv-wrap"),l.setAttribute("class",r+"left")):(a.appendChild(l),a.appendChild(c),t.appendChild(a),a.setAttribute("class",r+"current"),l.setAttribute("class",r+"left jv-folder"),l.onclick=function(n){var r=n.target.nextSibling;i.toggleItem(r,n.target.querySelector("span"))}),{left:l,right:c,current:a}},l.prototype.render=function(){var n,r=this.options.data,t="jv-"+this.options.theme+"-",e=this.options.container,i="object";e.setAttribute("class",t+"con");try{n=JSON.parse(r)}catch(n){throw new Error("It is not a json format")}o(n)&&(i="array");var a=this.createItem(0,t,e,i),l=a.left,c=a.right;this.renderChildren(t,i,n,c,0,l)},l.prototype.toggleItem=function(n,r){n.classList.toggle("add-height"),r.classList.toggle("rotate90")},l.prototype.createElement=function(n){return document.createElement(n)},l.prototype.forEach=function(n,r){if(!function(n){return void 0===n}(n)&&!a(n))if("object"===e(n)&&o(n))for(var t=0,i=n.length;t<i;t++)r.call(null,n[t],t,n);else for(key in n)n.hasOwnProperty(key)&&r.call(null,n[key]||"null",key,n)},n.exports=l},function(n,r,t){var e=t(2),o=t(3);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[n.i,o,""]]);e(o,{insert:"head",singleton:!1});var i=o.locals?o.locals:{};n.exports=i},function(n,r,t){"use strict";function e(n){for(var r=-1,t=0;t<f.length;t++)if(f[t].identifier===n){r=t;break}return r}function o(n,r){for(var t={},o=[],i=0;i<n.length;i++){var a=n[i],l=r.base?a[0]+r.base:a[0],s=t[l]||0,u="".concat(l," ").concat(s);t[l]=s+1;var d=e(u),p={css:a[1],media:a[2],sourceMap:a[3]};-1===d?f.push({identifier:u,updater:c(p,r),references:1}):(f[d].references++,f[d].updater(p)),o.push(u)}return o}function i(n){var r=document.createElement("style"),e=n.attributes||{};if(void 0===e.nonce){var o=t.nc;o&&(e.nonce=o)}if(Object.keys(e).forEach((function(n){r.setAttribute(n,e[n])})),"function"==typeof n.insert)n.insert(r);else{var i=u(n.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(r)}return r}function a(n,r,t,e){var o=t?"":e.media?"@media ".concat(e.media," {").concat(e.css,"}"):e.css;if(n.styleSheet)n.styleSheet.cssText=d(r,o);else{var i=document.createTextNode(o),a=n.childNodes;a[r]&&n.removeChild(a[r]),a.length?n.insertBefore(i,a[r]):n.appendChild(i)}}function l(n,r,t){var e=t.css,o=t.media,i=t.sourceMap;if(o?n.setAttribute("media",o):n.removeAttribute("media"),i&&btoa&&(e+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}function c(n,r){var t,e,o;if(r.singleton){var c=h++;t=p||(p=i(r)),e=a.bind(null,t,c,!1),o=a.bind(null,t,c,!0)}else t=i(r),e=l.bind(null,t,r),o=function(){!function(n){null!==n.parentNode&&n.parentNode.removeChild(n)}(t)};return e(n),function(r){if(r){if(r.css===n.css&&r.media===n.media&&r.sourceMap===n.sourceMap)return;e(n=r)}else o()}}var s=function(){var n;return function(){return void 0===n&&(n=!(!(window&&document&&document.all)||window.atob)),n}}(),u=function(){var n={};return function(r){if(void 0===n[r]){var t=document.querySelector(r);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}n[r]=t}return n[r]}}(),f=[],d=function(){var n=[];return function(r,t){return n[r]=t,n.filter(Boolean).join("\n")}}(),p=null,h=0;n.exports=function(n,r){(r=r||{}).singleton||"boolean"==typeof r.singleton||(r.singleton=s());var t=o(n=n||[],r);return function(n){if(n=n||[],"[object Array]"===Object.prototype.toString.call(n)){for(var i=0;i<t.length;i++){var a=e(t[i]);f[a].references--}for(var l=o(n,r),c=0;c<t.length;c++){var s=e(t[c]);0===f[s].references&&(f[s].updater(),f.splice(s,1))}t=l}}}},function(n,r,t){(r=t(4)(!1)).push([n.i,"/* html, body{\r\n    width: 100%;\r\n    height: 100%;\r\n} */\r\n\r\n\r\n.add-height{\r\n    height: auto !important;\r\n}\r\n\r\n.rotate90{\r\n    transform: rotate(0deg) !important;\r\n}\r\n\r\n.jv-wrap{\r\n    display: flex;\r\n}\r\n\r\n.jv-folder{\r\n    cursor: pointer;\r\n}\r\n\r\n/* for light them */\r\n\r\n.jv-light-symbol{\r\n    color: #000;\r\n    font-weight: bold;\r\n}\r\n\r\n.jv-light-con{\r\n    background: #fff;\r\n    color: #000;\r\n    font-family: monospace;\r\n    overflow: auto;\r\n    height: 100%;\r\n    width: 100%;\r\n}\r\n\r\n.jv-light-current {\r\n    line-height: 30px;\r\n    padding-left: 20px;\r\n    position: relative;\r\n}\r\n\r\n.jv-light-left {\r\n    display: inline-block;\r\n}\r\n\r\n.jv-light-rightString {\r\n    display: inline-block;\r\n    color: #7a3e9d;\r\n}\r\n\r\n.jv-light-rightBoolean {\r\n    display: inline-block;\r\n    color: #448c27;\r\n}\r\n\r\n.jv-light-rightNumber {\r\n    display: inline-block;\r\n    color: #f53232;\r\n}\r\n\r\n.jv-light-rightNull {\r\n    display: inline-block;\r\n    color: #9c5d27;\r\n}\r\n\r\n.jv-light-rightObj {\r\n    display: block !important;\r\n    overflow: hidden;\r\n    height: 0;\r\n}\r\n\r\n.jv-light-folder {\r\n    width: 0px;\r\n    display: inline-block;\r\n    margin-left: -15px;\r\n    text-align: center;\r\n    cursor: pointer;\r\n    height: 0px;\r\n    border: 4px solid transparent;\r\n    border-top: 8px solid #484d50;\r\n    position: absolute;\r\n    top: 11px;\r\n    transform-origin: 50% 25%;\r\n    transform: rotate(-90deg);\r\n}\r\n\r\n\r\n\r\n\r\n/* for dark theme */\r\n\r\n.jv-dark-con{\r\n    background: #272822;\r\n    color: #fff;\r\n    font-family: monospace;\r\n    overflow: auto;\r\n    height: 100%;\r\n    width: 100%;\r\n}\r\n\r\n.jv-dark-symbol{\r\n    color: #fff;\r\n    font-weight: bold;\r\n}\r\n\r\n.jv-dark-current {\r\n    line-height: 30px;\r\n    padding-left: 20px;\r\n    position: relative;\r\n}\r\n\r\n.jv-dark-left {\r\n    display: inline-block;\r\n}\r\n\r\n.jv-dark-rightString {\r\n    display: inline-block;\r\n    color: #66d9ef;\r\n}\r\n\r\n.jv-dark-rightBoolean {\r\n    display: inline-block;\r\n    color: #a6e22e;\r\n}\r\n\r\n.jv-dark-rightNumber {\r\n    display: inline-block;\r\n    color: #f92672;\r\n}\r\n\r\n.jv-dark-rightNull {\r\n    display: inline-block;\r\n    color: #e6db74;\r\n}\r\n\r\n.jv-dark-rightObj {\r\n    display: block !important;\r\n    overflow: hidden;\r\n    height: 0;\r\n}\r\n\r\n.jv-dark-folder {\r\n    width: 0px;\r\n    display: inline-block;\r\n    margin-left: -15px;\r\n    text-align: center;\r\n    cursor: pointer;\r\n    height: 0px;\r\n    border: 4px solid transparent;\r\n    border-top: 8px solid #fff;\r\n    position: absolute;\r\n    top: 11px;\r\n    transform: rotate(-90deg);\r\n    transform-origin: 50% 25%;\r\n}\r\n\r\n",""]),n.exports=r},function(n){"use strict";function r(n,r){var t=n[1]||"",e=n[3];if(!e)return t;if(r&&"function"==typeof btoa){var o=function(n){var r=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),t="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r);return"/*# ".concat(t," */")}(e),i=e.sources.map((function(n){return"/*# sourceURL=".concat(e.sourceRoot||"").concat(n," */")}));return[t].concat(i).concat([o]).join("\n")}return[t].join("\n")}n.exports=function(n){var t=[];return t.toString=function(){return this.map((function(t){var e=r(t,n);return t[2]?"@media ".concat(t[2]," {").concat(e,"}"):e})).join("")},t.i=function(n,r,e){"string"==typeof n&&(n=[[null,n,""]]);var o={};if(e)for(var i,a=0;a<this.length;a++)null!=(i=this[a][0])&&(o[i]=!0);for(var l,c=0;c<n.length;c++)l=[].concat(n[c]),(!e||!o[l[0]])&&(r&&(l[2]?l[2]="".concat(r," and ").concat(l[2]):l[2]=r),t.push(l))},t}}])}));

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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./src/lib.js
const Message = function (type, data) {
  type = type || messageType.payload;
  if (type !== "string" && type !== messageType.connect && type !== messageType.payload) {
    throw `type is expected to be string, should be one of (${messageType.connect} | ${messageType.payload})`;
  }
  this.type = type;
  this.payload = data;
  return this;
};
const attachHealthCheck = time => {
  setInterval(() => console.log("alive!"), time);
};
const messageType = {
  payload: "PAYLOAD",
  connect: "CONNECTION"
};
const constants = {
  ack: "ACK",
  connectInit: "CONNECT_INITIATE",
  contentScript: "CONTENT_SCRIPT",
  backgroundScript: "BACKGROUND_SCRIPT"
};
const getTabId = async () => {
  try {
    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });
    const tabId = tabs[0].id;
    if (typeof tabId != "number") {
      throw "expected tabId to be number";
    }
    return tabId;
  } catch (e) {
    console.log("[connection err]", e);
    throw e;
  }
};
const connectMessage = new Message(messageType.connect, constants.connectInit);
const ackMessage = new Message(messageType.connect, constants.ack);
const initiateConnection = async tabId => {
  const r = await sendMessageViaTabId(tabId, connectMessage);
  if (!r) {
    throw "[connect error] failed to handshake";
  }
};
const sendMessageUtil = async (sender, message, tag) => {
  try {
    if (!(message instanceof Message)) {
      throw "expected message to be of Message type";
    }
    const response = await sender({
      message: JSON.stringify(message),
      tag
    });
    if (response) {
      // console.log("[response]", response);
      const parsed = JSON.parse(response);
      if (parsed.type === "CONNECTION" && parsed.payload === "ACK") {
        return true;
      } else throw "got unexpected response";
    } else throw "expected some response from other end";
  } catch (e) {
    console.log("[handshake failure]", e);
  }
  return false;
};
const sendMessageViaTabId = async (tabId, message) => {
  return sendMessageUtil(async msg => chrome.tabs.sendMessage(tabId, msg), message, constants.backgroundScript);
};
const sendMessageViaRuntime = async message => {
  return sendMessageUtil(chrome.runtime.sendMessage, message, constants.contentScript);
};
const attachListener = (listener, senderTag) => {
  if (!window.runtimeMessageListener) {
    window.runtimeMessageListener = chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      // console.log("[raw response from listener]", sender, msg);
      const data = JSON.parse(msg.message);
      if (msg.tag !== senderTag) {
        return;
      }
      if (data.type === messageType.connect && data.payload === constants.ack) {
        return;
      }
      // console.log("[parsed message from listener recieved]", data);
      sendResponse(JSON.stringify(ackMessage));
      listener(data);
    });
  }
};
// EXTERNAL MODULE: ./src/devtools/controller.js
var controller = __webpack_require__(816);
;// CONCATENATED MODULE: ./src/devtools/devtools.js


console.log("loaded panel success!");
(async function start() {
  try {
    attachListener(msg => {
      console.log("[msg: recieved from contentScript]", msg);
      try {
        (0,controller/* initiateUI */.c)(msg.payload);
      } catch (e) {
        console.log("[error in html connection]", e);
      }
    }, constants.contentScript);
    const tabId = await getTabId();
    await initiateConnection(tabId);
    const sent = await sendMessageViaTabId(tabId, new Message(undefined, "second message from extension"));
    console.log("[sent status]", sent);
  } catch (e) {
    console.log("[runtime error]", e);
  }
})();
})();

/******/ })()
;