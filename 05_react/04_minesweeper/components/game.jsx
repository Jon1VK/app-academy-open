import React, { useState } from 'react';
import * as Minesweeper from '../lib/minesweeper';
import Board from './board';
import Modal from './modal';

const Game = () => {
  const [gameState, setGameState] = useState({
    board: new Minesweeper.Board(9, 10),
  });

  const board = gameState.board;

  const handleTileClick = (tile, flag) => {
    if (flag) {
      tile.toggleFlag();
    } else {
      tile.explore();
    }

    if (board.lost()) {
      board.revealAll();
    }

    setGameState({ board });
  };

  const resetGame = () => {
    setGameState({ board: new Minesweeper.Board(9, 10) });
  };

  const modal =
    board.lost() || board.won() ? (
      <Modal
        content={board.lost() ? 'You lost!' : 'You won!'}
        buttonText="Play again"
        handleButtonClick={resetGame}
      />
    ) : null;

  return (
    <div className="game">
      <h1>Minesweeper</h1>
      <p>
        Click to explore a tile.
        <br />
        Alt + click to flag a tile.
      </p>
      <Board grid={board.grid} handleTileClick={handleTileClick} />
      {modal}
    </div>
  );
};

export default Game;
