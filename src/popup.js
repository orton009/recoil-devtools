import {
  attachListener,
  constants,
  getTabId,
  initiateConnection,
  Message,
  messageType,
  sendMessageViaTabId,
} from "./lib";
console.log("loaded new version success!");

(async function start() {
  try {
    attachListener((msg) => {
      console.log("[msg: recieved from contentScript]", msg);
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
