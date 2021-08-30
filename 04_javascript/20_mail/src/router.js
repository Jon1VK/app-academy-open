function Router(node) {
  this.node = node;
}

Router.prototype.start = function () {
  this.render();
  window.addEventListener('hashchange', this.render.bind(this));
};

Router.prototype.render = function () {
  this.node.innerHTML = '';

  const route = this.activeRoute();

  if (route) {
    const p = document.createElement('p');
    p.innerHTML = route;
    this.node.appendChild(p);
  }
};

Router.prototype.activeRoute = function () {
  return window.location.hash.substring(1);
};

export default Router;
