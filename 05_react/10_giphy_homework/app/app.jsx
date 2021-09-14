import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import GiphysSearch from '../features/giphys/giphys_search';

ReactDOM.render(
  <Provider store={store}>
    <GiphysSearch />
  </Provider>,
  document.getElementById('root')
);
