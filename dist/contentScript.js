/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 559:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDiff = void 0;
// Packages
var get_edited_paths_1 = __webpack_require__(601);
var get_paths_diff_1 = __webpack_require__(230);
var get_struct_paths_1 = __webpack_require__(328);
var getDiff = function (oldStruct, newStruct, isLodashLike) {
    if (isLodashLike === void 0) { isLodashLike = false; }
    var delta = {
        added: [],
        removed: [],
        edited: []
    };
    var oldStructPaths = (0, get_struct_paths_1.getStructPaths)(oldStruct, isLodashLike);
    var newStructPaths = (0, get_struct_paths_1.getStructPaths)(newStruct, isLodashLike);
    // A-B
    delta.removed = (0, get_paths_diff_1.getPathsDiff)(oldStructPaths, newStructPaths);
    // B-A
    delta.added = (0, get_paths_diff_1.getPathsDiff)(newStructPaths, oldStructPaths);
    // a->b
    delta.edited = (0, get_edited_paths_1.getEditedPaths)(oldStructPaths, newStructPaths);
    return delta;
};
exports.getDiff = getDiff;


/***/ }),

/***/ 601:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getEditedPaths = void 0;
var getEditedPaths = function (oldStructPaths, newStructPaths) {
    var diffs = [];
    for (var key in oldStructPaths) {
        if (newStructPaths.hasOwnProperty(key)) {
            if (typeof oldStructPaths[key] === 'object' &&
                typeof newStructPaths[key] === 'object' &&
                JSON.stringify(oldStructPaths[key]) === JSON.stringify(newStructPaths[key])) {
                continue;
            }
            if (oldStructPaths[key] !== newStructPaths[key]) {
                diffs.push([key, oldStructPaths[key], newStructPaths[key]]);
            }
        }
    }
    return diffs;
};
exports.getEditedPaths = getEditedPaths;


/***/ }),

/***/ 230:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPathsDiff = void 0;
var getPathsDiff = function (oldStructPaths, newStructPaths) {
    var diff = [];
    var index = 0;
    for (var key in oldStructPaths) {
        if (!(key in newStructPaths)) {
            diff[index] = [key, oldStructPaths[key]];
            index++;
        }
    }
    return diff;
};
exports.getPathsDiff = getPathsDiff;


/***/ }),

/***/ 328:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getStructPaths = void 0;
var generatePath = function (isArray, currentPath, newPath, lodashLike) {
    var prefix = lodashLike ? (isArray ? '[' : '.') : '/';
    var suffix = lodashLike ? (isArray ? ']' : '') : isArray ? '[]' : '';
    var path = currentPath !== '' ? "" + currentPath + prefix + newPath + suffix : "" + (lodashLike && isArray ? '[' : '') + newPath + suffix;
    return path;
};
var getStructPaths = function (struct, isLodashLike, paths, currentPath) {
    if (isLodashLike === void 0) { isLodashLike = false; }
    if (paths === void 0) { paths = {}; }
    if (currentPath === void 0) { currentPath = ''; }
    for (var _i = 0, _a = Object.keys(struct); _i < _a.length; _i++) {
        var key = _a[_i];
        var path = generatePath(Array.isArray(struct), currentPath, key, isLodashLike);
        if (typeof struct[key] === 'object' && struct[key] !== null) {
            if (Object.keys(struct[key]).length === 0) {
                paths[path] = struct[key];
            }
            (0, exports.getStructPaths)(struct[key], isLodashLike, paths, path);
        }
        else {
            paths[path] = struct[key];
        }
    }
    return paths;
};
exports.getStructPaths = getStructPaths;


/***/ }),

/***/ 259:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(559), exports);
__exportStar(__webpack_require__(230), exports);
__exportStar(__webpack_require__(328), exports);
__exportStar(__webpack_require__(601), exports);


/***/ }),

/***/ 957:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(259), exports);
__exportStar(__webpack_require__(788), exports);


/***/ }),

/***/ 788:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(394), exports);


/***/ }),

/***/ 394:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

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
// EXTERNAL MODULE: ./node_modules/json-difference/dist/index.js
var dist = __webpack_require__(957);
;// CONCATENATED MODULE: ./src/contentScript.js


console.log("injected content script success!");
const pendingOutgoingMessages = (/* unused pure expression or super */ null && ([]));
const RegisterConnection = function (connected) {
  this.isConnected = connected;
  this.setConnectionStatus = isConnected => this.isConnected = isConnected;
  return this;
};
const verifyAtomsPayload = payload => {
  if (typeof payload.atoms === "object" && typeof payload.atoms.stateTransition === "object" && typeof payload.atoms.stateTransition.atomName === "string" && typeof payload.atoms.stateTransition.snapshotId === "number" && typeof payload.atoms.stateTransition.value !== undefined && typeof payload.atoms.stateTransition.value !== null) {
    return payload.atoms;
  }
};
const processPayload = payload => {
  const p = verifyAtomsPayload(payload);
  if (p) {
    storePayload(p.stateTransition);
  } else {
    console.error("[internal error] couldn't verify payload recieved from host");
  }
};
const getJSONDiff = (x, y) => {
  const o = (0,dist.getDiff)(x, y);
  return [...o.added.reduce((acc, e) => {
    acc.push(["+", e[0], e[1]]);
    return acc;
  }, []), ...o.removed.reduce((acc, e) => {
    acc.push(["-", e[0], e[1]]);
    return acc;
  }, []), ...o.edited.reduce((acc, e) => {
    acc.push(["~", e[0], e[1], e[2]]);
    return acc;
  }, [])];
};
const storePayload = p => {
  window.atomsStorage = window.atomsStorage || {
    currentState: {},
    transitions: []
  };
  const oldValue = window.atomsStorage.currentState[p.atomName];
  const transitionDiff = {
    snapshotId: p.snapshotId,
    atomName: p.atomName,
    diffValue: getJSONDiff(typeof oldValue === "undefined" || oldValue === null ? "" : oldValue, p.atomValue)
  };
  window.atomsStorage.currentState[p.atomName] = p.atomValue;
  window.atomsStorage.transitions.push(transitionDiff);
};
const sendPayload_unsafe = async () => {
  const sent = await sendMessageViaRuntime(new Message(undefined, JSON.stringify(window.atomsStorage)));
  window.connectorInstance.setConnectionStatus(sent);
};
(async function start() {
  window.connectorInstance = new RegisterConnection(false);
  window.postMessage({
    payload: {
      isLoaded: true
    },
    type: "FROM_CONTENT_SCRIPT"
  }, "*");
  window.addEventListener("message", async ev => {
    if (typeof ev.data === "object" && ev.data.type && ev.data.type === "FROM_RECOIL") {
      try {
        const data = JSON.parse(ev.data.payload);
        console.log("[msg event]", data);
        processPayload(data);
        await sendPayload_unsafe();
      } catch (e) {
        console.log("[error in message from host]", e);
      }
    } else {}
  }, false);
  attachListener(async msg => {
    console.log("[recieved :msg]", msg);
    if (msg.type === messageType.connect && msg.payload === constants.connectInit) {
      console.log("[connection successful]");
      await sendPayload_unsafe();
      window.connectorInstance.setConnectionStatus(true);
      // const sent = await sendMessageViaRuntime(
      //   new Message(undefined, "first message")
      // );
      // console.log("[msg sent status]", sent);
    }
  }, constants.backgroundScript);
})();
})();

/******/ })()
;