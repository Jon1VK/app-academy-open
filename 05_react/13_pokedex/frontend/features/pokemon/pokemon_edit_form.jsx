import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectMoveNames } from '../moves/moves_slice';
import { selectPokemonById, fetchPokemon } from './pokemon_slice';
import PokemonForm from './pokemon_form';
import { selectFetchingPokemon } from '../ui/ui_slice';

const PokemonEditForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pokemon = useSelector((state) => selectPokemonById(state, id));
  const moveNames = useSelector(selectMoveNames);
  const loading = useSelector(selectFetchingPokemon);

  useLayoutEffect(() => {
    dispatch(fetchPokemon(id));
  }, []);

  if (loading) {
    return (
      <div className="pokemon-detail">
        <div id="loading-pokeball-container">
          <div id="loading-pokeball"></div>
        </div>
      </div>
    );
  }

  return <PokemonForm pokemon={pokemon} initialMoves={moveNames} />;
};

export default PokemonEditForm;
