import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import { AuthRoute } from './util/route_util';
import store from './store';
import Header from './components/Header';
import LoginForm from './features/session/LoginForm';
import SignupForm from './features/session/SignupForm';
import { fetchBenches } from './features/benches/benchesSlice';
import Search from './features/benches/Search';

window.store = store;
window.fetchBenches = fetchBenches;

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <Header />
      <Route exact path="/" component={Search} />
      <AuthRoute path="/login" component={LoginForm} />
      <AuthRoute path="/signup" component={SignupForm} />
    </HashRouter>
  </Provider>
);

export default App;
