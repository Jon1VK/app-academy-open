import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectAllItems } from '../items/items_slice';

import { selectMoveNames } from '../moves/moves_slice';
import { selectFetchingPokemon } from '../ui/ui_slice';
import { fetchPokemon, selectPokemonById } from './pokemon_slice';

const PokemonDetail = () => {
  const { id } = useParams();
  const pokemon = useSelector((state) => selectPokemonById(state, id));
  const moves = useSelector(selectMoveNames);
  const items = useSelector(selectAllItems);

  const renderedItems = items.map((item) => (
    <li key={item.id}>
      <img src={item.imageUrl} alt="" />
    </li>
  ));

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(fetchPokemon(id));
  }, [id]);

  const fetching = useSelector(selectFetchingPokemon);

  if (fetching) {
    return <div className="pokemon-detail">Loading!!!</div>;
  }

  return (
    <div className="pokemon-detail">
      <figure>
        <img src={pokemon.imageUrl} alt={pokemon.name} />
      </figure>
      <h2>{pokemon.name}</h2>
      <ul>
        <li>Type: {pokemon.pokeType}</li>
        <li>Attack: {pokemon.attack}</li>
        <li>Defense: {pokemon.defense}</li>
        <li>Moves: {moves.join(', ')}</li>
      </ul>
      <div className="toys">
        <h3>Items</h3>
        <ul className="toy-list">{renderedItems}</ul>
      </div>
    </div>
  );
};

export default PokemonDetail;
