function Router(node, routes) {
  this.node = node;
  this.routes = routes;
}

Router.prototype.start = function () {
  this.render();
  window.addEventListener('hashchange', this.render.bind(this));
};

Router.prototype.render = function () {
  this.node.innerHTML = '';
  const component = this.activeRoute();
  component && this.node.appendChild(component.render());
};

Router.prototype.activeRoute = function () {
  const hash = window.location.hash.substring(1);
  return this.routes[hash];
};

export default Router;
