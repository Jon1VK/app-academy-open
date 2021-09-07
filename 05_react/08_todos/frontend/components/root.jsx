import React from 'react';
import { Provider } from 'react-redux';

import { App } from './app';

export const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);
