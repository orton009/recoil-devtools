import {
  attachHealthCheck,
  attachListener,
  constants,
  Message,
  messageType,
  sendMessageViaRuntime,
} from "./lib";

console.log("injected content script success!");

const queue = [];

(async function start() {
  attachListener(async (msg) => {
    console.log("[recieved :msg]", msg);
    if (
      msg.type === messageType.connect &&
      msg.payload === constants.connectInit
    ) {
      console.log("[connection successful]");
      const sent = await sendMessageViaRuntime(
        new Message(undefined, "first message")
      );
      console.log("[msg sent status]", sent);
    }
  }, constants.backgroundScript);
})();
