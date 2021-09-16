import React from 'react';
import { Route } from 'react-router-dom';

import PokemonIndex from '../features/pokemon/pokemon_index';

export default () => (
  <div className="pokedex">
    <Route path="/" component={PokemonIndex} />
  </div>
);
