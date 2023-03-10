import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import { DebugObserver } from "recoil-devtools";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <DebugObserver />
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
