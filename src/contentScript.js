import {
  attachHealthCheck,
  attachListener,
  constants,
  Message,
  messageType,
  sendMessageViaRuntime,
} from "./lib";

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
    console.log;
    storePayload(p.stateTransition);
  }
};

const storePayload = (p) => {
  window.atomsStorage = window.atomsStorage || {
    currentState: {},
    transitions: [],
  };
  window.atomsStorage.currentState[p.atomName] = p.atomValue;
  window.atomsStorage.transitions.push(p);
};

const sendPayload_unsafe = async () => {
  const sent = await sendMessageViaRuntime(
    new Message(undefined, JSON.stringify(window.atomsStorage))
  );
  window.connectorInstance.setConnectionStatus(sent);
};

(async function start() {
  window.connectorInstance = new RegisterConnection(false);

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
      window.connectorInstance.setConnectionStatus(true);
      // const sent = await sendMessageViaRuntime(
      //   new Message(undefined, "first message")
      // );
      // console.log("[msg sent status]", sent);
    }
  }, constants.backgroundScript);
})();
