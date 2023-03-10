import {
  useRecoilCallback,
  useRecoilSnapshot,
  useRecoilTransactionObserver_UNSTABLE,
} from "recoil";
import React from "react";

const postContentScriptLoaded = [];
let isContentScriptLoaded = false;
window.addEventListener("message", (ev) => {
  if (ev.data.type && ev.data.type === "FROM_CONTENT_SCRIPT") {
    if (
      typeof ev.data.payload === "object" &&
      typeof ev.data.payload.isLoaded === "boolean"
    ) {
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
  const { key, value } = atomState;
  window.recoilDevtoolsHelper.stateMap[id] = atomState;
  window.recoilDevtoolsHelper.atomsState[key] = value;

  const payload = {
    atoms: {
      stateTransition: {
        snapshotId: id,
        atomName: key,
        atomValue: value,
      },
    },
  };
  const fn = () =>
    window.postMessage(
      {
        payload: JSON.stringify(payload),
        type: "FROM_RECOIL",
      },
      "*"
    );
  if (isContentScriptLoaded) {
    fn();
  } else {
    postContentScriptLoaded.push(fn);
  }
};

export function DebugObserver() {
  console.log("inside lib", React.version);
  window.recoilDevtoolsHelper = {
    stateMap: {},
    atomsState: {},
  };
  window.captureUnmodifiedState =
    window.captureUnmodifiedState != undefined
      ? true
      : window.captureUnmodifiedState;
  useRecoilTransactionObserver_UNSTABLE(async ({ snapshot }) => {
    const id = snapshot.getID();
    console.log("-----------");
    console.log("Snapshot ID", id);
    for (const node of snapshot.getNodes_UNSTABLE({
      isModified: !window.captureUnmodifiedState,
    })) {
      const value = await snapshot.getPromise(node);
      const atomState = { key: node.key, value: value };
      appendToGlobalRecoilState(id, atomState);
      console.log(node.key, value);
    }
    window.captureUnmodifiedState = false;
  });
  return null;
}
