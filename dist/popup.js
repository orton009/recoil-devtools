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
;// CONCATENATED MODULE: ./src/popup.js

console.log("loaded new version success!");
(async function start() {
  try {
    chrome.devtools.panels.create("Recoil Devtools", "../icons/popup.png", "../devtools.html", function (panel) {
      console.log("panel created", panel);
    });

    // attachListener((msg) => {
    //   console.log("[msg: recieved from contentScript]", msg);
    // }, constants.contentScript);
    // const tabId = await getTabId();
    // await initiateConnection(tabId);

    // const sent = await sendMessageViaTabId(
    //   tabId,
    //   new Message(undefined, "second message from extension")
    // );
    // console.log("[sent status]", sent);
  } catch (e) {
    console.log("[runtime error]", e);
  }
})();
/******/ })()
;