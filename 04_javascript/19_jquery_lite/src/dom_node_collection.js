export default class DOMNodeCollection {
  constructor(elements) {
    this.elements = elements;
  }

  html(string) {
    if (string != null) {
      this.elements.forEach((element) => (element.innerHTML = string));
    } else {
      return this.elements[0].innerHTML;
    }

    return this;
  }

  empty() {
    this.elements.forEach((element) => (element.innerHTML = ''));
    return this;
  }

  append(...args) {
    args.forEach((content) => {
      if (typeof content === 'string') {
        this.elements.forEach((element) => (element.innerHTML += content));
      } else if (content instanceof HTMLElement) {
        this.elements.forEach((element) => element.appendChild(content));
      } else if (content instanceof HTMLCollection) {
        this.elements.forEach((element) => element.append(...content));
      } else if (content instanceof DOMNodeCollection) {
        this.elements.forEach((element) => element.append(...content.elements));
      }
    });

    return this;
  }

  attr(name, value) {
    if (typeof name === 'object') {
      Object.entries(name).forEach(([name, value]) =>
        this.elements.forEach((element) => element.setAttribute(name, value))
      );
    } else if (value == null) {
      return this.elements[0].getAttribute(name);
    } else if (typeof value === 'function') {
      this.elements.forEach((element, idx) => {
        const currentValue = element.getAttribute(name);
        element.setAttribute(name, value(idx, currentValue));
      });
    } else {
      this.elements.forEach((element) => element.setAttribute(name, value));
    }

    return this;
  }

  addClass(className) {
    if (className instanceof Array) {
      this.elements.forEach((element) => {
        element.classList.add(...className);
      });
    } else if (typeof className === 'function') {
      this.elements.forEach((element, idx) => {
        let result = className(idx, element.className);
        result = result instanceof Array ? result : result.split(' ');
        element.classList.add(...result);
      });
    } else {
      this.elements.forEach((element) => element.classList.add(className));
    }

    return this;
  }

  removeClass(className) {
    if (className instanceof Array) {
      this.elements.forEach((element) => {
        element.classList.remove(...className);
      });
    } else if (typeof className === 'function') {
      this.elements.forEach((element, idx) => {
        let result = className(idx, element.className);
        result = result instanceof Array ? result : result.split(' ');
        element.classList.remove(...result);
      });
    } else {
      this.elements.forEach((element) => element.classList.remove(className));
    }

    return this;
  }

  children(selector) {
    let childNodes = [];
    this.elements.forEach((element) => {
      childNodes.push(...element.children);
    });

    if (selector) {
      childNodes = childNodes.filter((child) => child.matches(selector));
    }

    return new DOMNodeCollection(childNodes);
  }

  parent(selector) {
    let parentNodes = [];
    this.elements.forEach((element) => {
      parentNodes.push(element.parentNode);
    });

    if (selector) {
      parentNodes = parentNodes.filter((parent) => parent.matches(selector));
    }

    return new DOMNodeCollection(parentNodes);
  }

  find(query) {
    const descendants = new Set();
    this.elements.forEach((element) => {
      [...element.querySelectorAll(query)].forEach((descendant) => {
        descendants.add(descendant);
      });
    });

    return new DOMNodeCollection([...descendants]);
  }

  remove(selector) {
    const removed = [];
    this.elements.forEach((element) => {
      if (!selector || element.matches(selector)) {
        removed.push(element);
        element.remove();
      }
    });

    return this;
  }
}
