import {
  attachListener,
  constants,
  getTabId,
  initiateConnection,
  Message,
  messageType,
  sendMessageViaTabId,
} from "../lib";
import { initiateUI } from "./controller";

console.log("loaded panel success!");

(async function start() {
  try {
    attachListener((msg) => {
      console.log("[msg: recieved from contentScript]", msg);
      try {
        initiateUI(msg.payload);
      } catch (e) {
        console.log("[error in html connection]", e);
      }
    }, constants.contentScript);
    const tabId = await getTabId();
    await initiateConnection(tabId);

    const sent = await sendMessageViaTabId(
      tabId,
      new Message(undefined, "second message from extension")
    );
    console.log("[sent status]", sent);
  } catch (e) {
    console.log("[runtime error]", e);
  }
})();
