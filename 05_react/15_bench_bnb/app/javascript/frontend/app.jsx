import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import store from './store';
import Greeting from './features/session/Greeting';
import LoginForm from './features/session/LoginForm';
import SignupForm from './features/session/SignupForm';

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <Greeting />
      <Route path="/login" component={LoginForm} />
      <Route path="/signup" component={SignupForm} />
    </HashRouter>
  </Provider>
);

export default App;
