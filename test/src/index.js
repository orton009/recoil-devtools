import React, { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  RecoilRoot,
  useRecoilCallback,
  useRecoilSnapshot,
  useRecoilTransactionObserver_UNSTABLE,
} from "recoil";

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
  window.postMessage(
    {
      payload: JSON.stringify(payload),
      type: "FROM_RECOIL",
    },
    "*"
  );
};

function DebugObserver() {
  window.recoilDevtoolsHelper = {
    stateMap: {},
    atomsState: {},
  };

  useRecoilTransactionObserver_UNSTABLE(async ({ snapshot }) => {
    const id = snapshot.getID();
    console.log("-----------");
    console.log("Snapshot ID", id);
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      const value = await snapshot.getPromise(node);
      const atomState = { key: node.key, value: value };
      appendToGlobalRecoilState(id, atomState);
      console.log(node.key, value);
    }
  });
  return null;
}

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <DebugObserver />
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
