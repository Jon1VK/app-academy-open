import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import PokemonIndexItem from './pokemon_index_item';
import { fetchAllPokemon, selectAllPokemon } from './pokemon_slice';

const PokemonIndex = () => {
  const pokemon = useSelector(selectAllPokemon);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPokemon());
  }, [dispatch]);

  const renderedPokemon = pokemon.map((pokemon) => (
    <PokemonIndexItem key={pokemon.id} pokemon={pokemon} />
  ));

  return (
    <div className="pokemon-index">
      <ul>{renderedPokemon}</ul>;
    </div>
  );
};

export default PokemonIndex;
