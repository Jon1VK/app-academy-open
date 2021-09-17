import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, useRouteMatch, Link } from 'react-router-dom';

import { selectAllItems } from '../items/items_slice';
import { selectMoveNames } from '../moves/moves_slice';
import { selectFetchingPokemon } from '../ui/ui_slice';
import { fetchPokemon, selectPokemonById } from './pokemon_slice';

import ItemDetail from '../items/item_detail';
import ItemLink from '../items/item_link';

const PokemonDetail = () => {
  const dispatch = useDispatch();
  const { url, params } = useRouteMatch();
  const { id } = params;
  const pokemon = useSelector((state) => selectPokemonById(state, id));
  const moves = useSelector(selectMoveNames);
  const items = useSelector(selectAllItems);
  const fetching = useSelector(selectFetchingPokemon);

  const renderedItems = items.map((item) => (
    <ItemLink key={item.id} item={item} />
  ));

  useLayoutEffect(() => {
    dispatch(fetchPokemon(id));
  }, [id]);

  if (fetching) {
    return (
      <div className="pokemon-detail">
        <div id="loading-pokeball-container">
          <div id="loading-pokeball"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pokemon-detail">
      <figure>
        <img src={pokemon.imageUrl} alt={pokemon.name} />
      </figure>
      <ul>
        <li>
          <h2>{pokemon.name}</h2>
          <Link to={`${url}/edit`}>Edit</Link>
        </li>
        <li>Type: {pokemon.pokeType}</li>
        <li>Attack: {pokemon.attack}</li>
        <li>Defense: {pokemon.defense}</li>
        <li>Moves: {moves.join(', ')}</li>
      </ul>
      <div className="toys">
        <h3>Items</h3>
        <ul className="toy-list">{renderedItems}</ul>
      </div>
      <Route path={`${url}/items/:id`} component={ItemDetail} />
    </div>
  );
};

export default PokemonDetail;
