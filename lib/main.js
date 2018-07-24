const DOMNodeCollection = require("./dom_node_collection");
const _docReadyCallbacks = [];
let _docReady = false;

window.$l = (arg) => {
  switch (typeof arg) {
    case "function":
      return registerDocReadyCallback(arg);
    case "string":
      return getDOMnodes(arg);
    case "object":
      if (arg instanceof HTMLElement) {
        return new DOMNodeCollection([arg]);
      }
  }
};

getDOMnodes = (selector) => {
  const nodes = document.querySelectorAll(selector);
  const nodesArray = Array.from(nodes);
  return new DOMNodeCollection(nodesArray);
};

registerDocReadyCallback = (func) => {
  if (!_docReady) {
    _docReadyCallbacks.push(func);
  } else {
    func();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCallbacks.forEach(func => func());
});
