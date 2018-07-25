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

$l.extend = (start, ...others) => {
  others.forEach((obj) => {
    for (const prop in obj) {
      start[prop] = obj[prop];
    }
  });
  return start;
};

$l.ajax = (opts) => {
  const request = new XMLHttpRequest();
  const original = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
  };
  opts = $l.extend(original, opts);
  opts.method = opts.method.toUpperCase();
  if (opts.method === "GET") {
    opts.url += `?${toQueryString(opts.data)}`;
  }
  request.open(opts.method, opts.url, true);
  request.onload = (e) => {
    if (request.status === 200) {
      opts.success(request.response);
    } else {
      opts.error(request.response);
    }
  };

  request.send(JSON.stringify(opts.data));
};

toQueryString = (obj) => {
  let result = "";
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      result += `${prop}=${obj[prop]}&`;
    }
  }
  return result.substring(0, result.length - 1);
};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCallbacks.forEach(func => func());
});
