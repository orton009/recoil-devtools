import JsonViewer from "json-viewer-js";

var selectedTab = null;
var selectedAtom = null;

const visualizeAnyData = (container, data) => {
  const showInContainer = () => {
    container.innerHTML = JSON.stringify(data);
  };
  switch (typeof data) {
    case "object":
      new JsonViewer({
        container,
        data: JSON.stringify(data),
        theme: "dark",
        expand: true,
      });
      break;
    case "undefined":
      data = "";
    // case "string":
    // case "number":
    // case "boolean":
    // case "bigint":
    default:
      showInContainer();
      break;
  }
};

const visualizeTransitions = (data) => {
  const transitionContainerElRef = document.getElementById(
    "transition-container"
  );
  const transitionContainerEl = transitionContainerElRef.cloneNode(true);
  transitionContainerEl.style.display = "block";
  const dataContainerEl = document.getElementById("data-container");
  dataContainerEl.innerHTML = "";
  dataContainerEl.appendChild(transitionContainerEl);

  for (let i = data.length - 1; i--; i >= 0) {
    const dataEl = data[i];
    const { atomName, diffValue, snapshotId, value } = dataEl;
    console.log(diffValue);

    const listItemEl = document.createElement("li");
    listItemEl.classList.add("uk-flex-column");
    listItemEl.classList.add("uk-parent");
    listItemEl.innerHTML = `
          <pre><div class="uk-flex uk-flex-between">
            <div class="uk-text-bold">AtomName = ${atomName} \t\t\t\t SnapshotID = ${snapshotId}</div>
            <span uk-nav-parent-icon></span>
          </div></pre>
          <ul class="uk-nav-sub uk-background-secondary uk-padding-small" id=${
            "snapshotId-" + snapshotId
          }>
          </ul>
        `;
    transitionContainerEl.appendChild(listItemEl);
    const el = document.getElementById("snapshotId-" + snapshotId);
    visualizeAnyData(el, value);
  }
};

export const initiateUI = (dataString) => {
  try {
    const json = JSON.parse(dataString);
    const removePreviousAtomStyle = () => {
      if (selectedAtom != null && selectedAtom.classList) {
        selectedAtom.classList.remove("uk-active");
      }
    };
    const currentStateEl = document.getElementById("currentStateNavSelector");
    const transitionEl = document.getElementById("transitionNavSelector");
    const dataContainerEl = document.getElementById("data-container");
    currentStateEl.addEventListener("click", (ev) => {
      selectedTab = currentStateEl;
      transitionEl.classList.remove("uk-active");
      currentStateEl.classList.add("uk-active");
      removePreviousAtomStyle();
    });
    transitionEl.addEventListener("click", (ev) => {
      selectedTab = transitionEl;
      transitionEl.classList.add("uk-active");
      currentStateEl.classList.remove("uk-active");
      removePreviousAtomStyle();
      dataContainerEl.innerHTML = "";
      console.log(json.transitions);
      visualizeTransitions(json.transitions);
    });
    const currentStateChilds = document.getElementById("currentStateNavChilds");
    currentStateChilds.innerHTML = "";
    const atoms = Object.keys(json.currentState);
    atoms.forEach((atomName) => {
      const atomParentEl = document.createElement("li");
      const atomEl = document.createElement("a");
      const atomValue = json.currentState[atomName];
      atomEl.href = "#";
      atomEl.innerHTML = atomName;
      atomParentEl.appendChild(atomEl);
      atomParentEl.addEventListener("click", (ev) => {
        console.log("clicked " + atomName, ev.target, atomParentEl);
        removePreviousAtomStyle();
        selectedAtom = atomParentEl;
        atomParentEl.classList.add("uk-active");
        dataContainerEl.innerHTML = "";
        visualizeAnyData(dataContainerEl, atomValue);
      });
      currentStateChilds.appendChild(atomParentEl);
    });

    // on state change executions
    if (selectedTab === transitionEl) {
      visualizeTransitions(json.transitions);
    } else if (selectedTab === currentStateEl && selectedAtom != null) {
      console.log("selctedAtom", selectedAtom);
      selectedAtom.click();
    }
  } catch (e) {
    console.error("[error parsing data]", e);
  }
};

// diffValue.forEach((e) => {
//   console.log(e);
//   const sign = e[0];
//   const key = e[1];
//   const value1 = JSON.stringify(e[2]);
//   const value2 = JSON.stringify(e[3]);

//   const diffItemEl = document.createElement("li");
//   diffItemEl.style.listStyle = "none";
//   diffItemEl.classList.add("uk-flex");
//   // diffItemEl.classList.add("uk-flex-around");
//   diffItemEl.classList.add("uk-padding-small");
//   diffItemEl.classList.add("uk-text-bold");
//   // const randomId = Math.random() * 10000;
//   // const randomId2 = Math.random() * 10000;
//   diffItemEl.innerHTML = `
//     <div class="${
//       sign === "+"
//         ? "uk-text-success"
//         : sign === "-"
//         ? "uk-text-danger"
//         : "uk-text-warning"
//     } uk-margin-small-right">${sign}</div>
//     <div class="uk-text-bold uk-margin-small-right">${key}</div>
//     <div class="uk-text-regular uk-margin-small-right">${value1}</div>
//     ${
//       value2 != undefined
//         ? `<div class="uk-text-regular">${value2}</div>`
//         : ""
//     }
//   `;
//   document
//     .getElementById("snapshotId-" + snapshotId)
//     .appendChild(diffItemEl);
// });
