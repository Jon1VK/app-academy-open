import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <Provider store={store}>
    <h1>Hello from App component</h1>
  </Provider>
);

export default App;
