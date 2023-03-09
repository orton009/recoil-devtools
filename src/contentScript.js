import {
  attachHealthCheck,
  attachListener,
  constants,
  Message,
  messageType,
  sendMessageViaRuntime,
} from "./lib";

import { getDiff } from "json-difference";

console.log("injected content script success!");

const pendingOutgoingMessages = [];

const RegisterConnection = function (connected) {
  this.isConnected = connected;
  this.setConnectionStatus = (isConnected) => (this.isConnected = isConnected);
  return this;
};

const verifyAtomsPayload = (payload) => {
  if (
    typeof payload.atoms === "object" &&
    typeof payload.atoms.stateTransition === "object" &&
    typeof payload.atoms.stateTransition.atomName === "string" &&
    typeof payload.atoms.stateTransition.snapshotId === "number" &&
    typeof payload.atoms.stateTransition.value !== undefined &&
    typeof payload.atoms.stateTransition.value !== null
  ) {
    return payload.atoms;
  }
};

const processPayload = (payload) => {
  const p = verifyAtomsPayload(payload);
  if (p) {
    storePayload(p.stateTransition);
  } else {
    console.error(
      "[internal error] couldn't verify payload recieved from host"
    );
  }
};

const getJSONDiff = (x, y) => {
  const o = getDiff(x, y);
  return [
    ...o.added.reduce((acc, e) => {
      acc.push(["+", e[0], e[1]]);
      return acc;
    }, []),
    ...o.removed.reduce((acc, e) => {
      acc.push(["-", e[0], e[1]]);
      return acc;
    }, []),
    ...o.edited.reduce((acc, e) => {
      acc.push(["~", e[0], e[1], e[2]]);
      return acc;
    }, []),
  ];
};

const storePayload = (p) => {
  window.atomsStorage = window.atomsStorage || {
    currentState: {},
    transitions: [],
  };
  const oldValue = window.atomsStorage.currentState[p.atomName];
  const transitionDiff = {
    snapshotId: p.snapshotId,
    atomName: p.atomName,
    diffValue: getJSONDiff(
      typeof oldValue === "undefined" || oldValue === null ? "" : oldValue,
      p.atomValue
    ),
  };
  window.atomsStorage.currentState[p.atomName] = p.atomValue;
  window.atomsStorage.transitions.push(transitionDiff);
};

const sendPayload_unsafe = async () => {
  const sent = await sendMessageViaRuntime(
    new Message(undefined, JSON.stringify(window.atomsStorage))
  );
  window.connectorInstance.setConnectionStatus(sent);
};

(async function start() {
  window.connectorInstance = new RegisterConnection(false);
  window.postMessage(
    {
      payload: { isLoaded: true },
      type: "FROM_CONTENT_SCRIPT",
    },
    "*"
  );

  window.addEventListener(
    "message",
    async (ev) => {
      if (
        typeof ev.data === "object" &&
        ev.data.type &&
        ev.data.type === "FROM_RECOIL"
      ) {
        try {
          const data = JSON.parse(ev.data.payload);
          console.log("[msg event]", data);
          processPayload(data);

          await sendPayload_unsafe();
        } catch (e) {
          console.log("[error in message from host]", e);
        }
      } else {
      }
    },
    false
  );

  attachListener(async (msg) => {
    console.log("[recieved :msg]", msg);
    if (
      msg.type === messageType.connect &&
      msg.payload === constants.connectInit
    ) {
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
