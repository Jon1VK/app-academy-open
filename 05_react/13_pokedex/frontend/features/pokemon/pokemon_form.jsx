import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPokemon } from './pokemon_slice';
import { selectErrors } from '../ui/ui_slice';

const PokemonForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const errors = useSelector(selectErrors);
  const [name, setName] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [poke_type, setPokeType] = useState('');
  const [attack, setAttack] = useState('');
  const [defense, setDefense] = useState('');
  const [move, setMove] = useState('');
  const [moves, setMoves] = useState([]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleImageUrlChange = (e) => setImageUrl(e.target.value);
  const handlePokeTypeChange = (e) => setPokeType(e.target.value);
  const handleAttackChange = (e) => setAttack(e.target.value);
  const handleDefenseChange = (e) => setDefense(e.target.value);
  const handleMoveChange = (e) => setMove(e.target.value);

  const handleAddMoveClick = () => {
    if (move && !moves.includes(move)) {
      setMoves((moves) => [...moves, move]);
    }
    setMove('');
  };

  const handleCreatePokemonClick = () => {
    const pokemon = {
      name,
      image_url,
      poke_type,
      attack,
      defense,
      moves,
    };

    dispatch(createPokemon(pokemon))
      .unwrap()
      .then(({ pokemon }) => {
        history.push(`/pokemon/${pokemon.id}`);
      })
      .catch((error) => console.log(error));
  };

  const renderedPokemonTypes = window.POKEMON_TYPES.map((pokeType) => (
    <option key={pokeType} value={pokeType}>
      {pokeType}
    </option>
  ));

  const renderedErrors = errors.map((error, idx) => (
    <li key={idx} className="error">
      {error}
    </li>
  ));

  return (
    <div className="pokemon-detail">
      <img src={window.images.pokeLogo} alt="Pokemon Logo" />
      <ul>{renderedErrors}</ul>
      <div className="pokemon-form">
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
        />
        <input
          type="text"
          value={image_url}
          onChange={handleImageUrlChange}
          placeholder="Image Url"
        />
        <select value={poke_type} onChange={handlePokeTypeChange}>
          <option disabled value="">
            Select type
          </option>
          {renderedPokemonTypes}
        </select>
        <input
          type="number"
          value={attack}
          onChange={handleAttackChange}
          min="1"
          placeholder="Attack"
        />
        <input
          type="number"
          value={defense}
          onChange={handleDefenseChange}
          min="1"
          placeholder="Defense"
        />
        <div className="pokemon-moves-form-container">
          <span>Moves: {moves.join(', ')}</span>
          <input
            type="text"
            value={move}
            onChange={handleMoveChange}
            placeholder="New Move"
          />
          <button onClick={handleAddMoveClick}>Add Move</button>
        </div>
        <button onClick={handleCreatePokemonClick}>Create Pokemon</button>
      </div>
    </div>
  );
};

export default PokemonForm;
