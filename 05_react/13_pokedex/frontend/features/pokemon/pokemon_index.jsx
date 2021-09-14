import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchAllPokemon, selectAllPokemon } from './pokemon_slice';

const PokemonIndex = () => {
  const pokemon = useSelector(selectAllPokemon);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPokemon());
  }, [dispatch]);

  const renderedPokemon = pokemon.map((pokemon) => (
    <li key={pokemon.id} className="pokemon-index-item">
      <img src={pokemon.imageUrl} alt={pokemon.name} />
      {pokemon.name}
    </li>
  ));

  return (
    <div className="pokemon-index">
      <ul>{renderedPokemon}</ul>;
    </div>
  );
};

export default PokemonIndex;
