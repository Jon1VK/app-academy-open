import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { AuthRoute } from './util/route_util';
import store from './store';
import Header from './components/Header';
import LoginForm from './features/session/LoginForm';
import SignupForm from './features/session/SignupForm';

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <Header />
      <AuthRoute path="/login" component={LoginForm} />
      <AuthRoute path="/signup" component={SignupForm} />
    </HashRouter>
  </Provider>
);

export default App;
