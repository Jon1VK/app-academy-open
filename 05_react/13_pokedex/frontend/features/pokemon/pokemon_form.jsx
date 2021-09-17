import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPokemon, editPokemon } from './pokemon_slice';
import { selectErrors } from '../ui/ui_slice';

const PokemonForm = ({
  pokemon = { name: '', image_url: '', poke_type: '', attack: '', defense: '' },
  initialMoves = [],
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const errors = useSelector(selectErrors);
  const [name, setName] = useState(pokemon.name);
  const [image_url, setImageUrl] = useState(pokemon.imageUrl);
  const [poke_type, setPokeType] = useState(pokemon.pokeType);
  const [attack, setAttack] = useState(pokemon.attack);
  const [defense, setDefense] = useState(pokemon.defense);
  const [move, setMove] = useState('');
  const [moves, setMoves] = useState(initialMoves);

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

  const removeMove = (moveToRemove) => {
    setMoves((moves) => moves.filter((move) => move !== moveToRemove));
  };

  const handleSubmit = () => {
    const poke = {
      id: pokemon.id,
      name,
      image_url,
      poke_type,
      attack,
      defense,
      moves,
    };

    if (poke.id) {
      dispatch(editPokemon(poke))
        .unwrap()
        .then(({ pokemon }) => {
          history.push(`/pokemon/${pokemon.id}`);
        })
        .catch((error) => console.log(error));
    } else {
      dispatch(createPokemon(poke))
        .unwrap()
        .then(({ pokemon }) => {
          history.push(`/pokemon/${pokemon.id}`);
        })
        .catch((error) => console.log(error));
    }
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

  const renderedMoves = moves.map((move) => (
    <li key={move} onClick={() => removeMove(move)}>
      {move}
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
          <h3>Moves:</h3>
          <ul>{renderedMoves}</ul>
          <input
            type="text"
            value={move}
            onChange={handleMoveChange}
            placeholder="New Move"
          />
          <button onClick={handleAddMoveClick}>Add Move</button>
        </div>
        <button onClick={handleSubmit}>
          {pokemon.id ? 'Edit Pokemon' : 'Create Pokemon'}
        </button>
      </div>
    </div>
  );
};

export default PokemonForm;
