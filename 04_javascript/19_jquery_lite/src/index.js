import DOMNodeCollection from './dom_node_collection';

function jQueryLite(arg) {
  if (typeof arg === 'function') {
    if (document.readyState !== 'loading') {
      arg();
    } else {
      document.addEventListener('DOMContentLoaded', arg);
    }
    return;
  }

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

jQueryLite.extend = (target, ...sources) => {
  sources.forEach((source) => Object.assign(target, source));
  return target;
};

jQueryLite.ajax = (options) => {
  const defaults = {
    url: 'index.html',
    type: 'get',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {},
  };

  options = jQueryLite.extend(defaults, options);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(options.type, options.url);

    xhr.onload = () => {
      if (xhr.status !== 0) {
        const response = JSON.parse(xhr.response);
        if (options.success) {
          options.success(response);
        }

        resolve(response);
      } else {
        if (options.error) {
          options.error();
        }

        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        });
      }
    };

    xhr.onerror = () => {
      if (options.error) {
        options.error();
      }

      reject({
        status: xhr.status,
        statusText: xhr.statusText,
      });
    };

    xhr.send(options.data);
  });
};

window.jQueryLite = jQueryLite;
window.$l = jQueryLite;
