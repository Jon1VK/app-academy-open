import React from 'react';
import { useSelector } from 'react-redux';
import PokemonIndexItem from './pokemon_index_item';
import { selectAllPokemon } from './pokemon_slice';

const PokemonIndex = () => {
  const pokemon = useSelector(selectAllPokemon);

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
