import DOMNodeCollection from './dom_node_collection';

function jQueryLite(arg) {
  if (typeof arg === 'string') {
    const nodes = document.querySelectorAll(arg);
    return new DOMNodeCollection([...nodes]);
  }

  if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  }

  if (arg instanceof HTMLCollection) {
    return new DOMNodeCollection([...arg]);
  }

  throw new Error(`Invalid argument ${arg}`);
}

window.jQueryLite = jQueryLite;
window.$l = jQueryLite;
