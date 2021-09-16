import React from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';

const PokemonIndexItem = ({ pokemon }) => {
  return (
    <li className="pokemon-index-item">
      <Link to={`/pokemon/${pokemon.id}`}>
        <img src={pokemon.imageUrl} alt={pokemon.name} />
        {pokemon.name}
      </Link>
    </li>
  );
};

export default PokemonIndexItem;
