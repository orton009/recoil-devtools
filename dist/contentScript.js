/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

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
    console.log;
    storePayload(p.stateTransition);
  }
};
const storePayload = p => {
  window.atomsStorage = window.atomsStorage || {
    currentState: {},
    transitions: []
  };
  window.atomsStorage.currentState[p.atomName] = p.atomValue;
  window.atomsStorage.transitions.push(p);
};
const sendPayload_unsafe = async () => {
  const sent = await sendMessageViaRuntime(new Message(undefined, JSON.stringify(window.atomsStorage)));
  window.connectorInstance.setConnectionStatus(sent);
};
(async function start() {
  window.connectorInstance = new RegisterConnection(false);
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
    }
  }, false);
  attachListener(async msg => {
    console.log("[recieved :msg]", msg);
    if (msg.type === messageType.connect && msg.payload === constants.connectInit) {
      console.log("[connection successful]");
      window.connectorInstance.setConnectionStatus(true);
      // const sent = await sendMessageViaRuntime(
      //   new Message(undefined, "first message")
      // );
      // console.log("[msg sent status]", sent);
    }
  }, constants.backgroundScript);
})();
/******/ })()
;