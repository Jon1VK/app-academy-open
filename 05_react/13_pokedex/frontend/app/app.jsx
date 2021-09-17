import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';

import { selectFetchingAllPokemon } from '../features/ui/ui_slice';
import { fetchAllPokemon } from '../features/pokemon/pokemon_slice';
import PokemonDetail from '../features/pokemon/pokemon_detail';
import PokemonIndex from '../features/pokemon/pokemon_index';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPokemon());
  }, []);

  const loading = useSelector(selectFetchingAllPokemon);

  if (loading == null || loading) {
    return (
      <div id="loading-pokeball-container">
        <div id="loading-pokeball"></div>
      </div>
    );
  }

  return (
    <div className="pokedex">
      <Route path="/pokemon/:id" component={PokemonDetail} />
      <Route path="/" component={PokemonIndex} />
    </div>
  );
};

export default App;
