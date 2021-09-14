import React from 'react';
import { Provider } from 'react-redux';

import PokemonIndex from '../features/pokemon/pokemon_index';
import store from './store';

export default () => (
  <Provider store={store}>
    <div className="pokedex">
      <PokemonIndex />
    </div>
  </Provider>
);
