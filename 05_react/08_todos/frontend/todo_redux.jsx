import ReactDOM from 'react-dom';
import React from 'react';

import store from './store/store';
import { Root } from './components/root';

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
