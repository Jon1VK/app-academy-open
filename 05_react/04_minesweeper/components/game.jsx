import React, { useLayoutEffect, useState } from 'react';
import * as Minesweeper from '../lib/minesweeper';
import Board from './board';
import Modal from './modal';

const Game = () => {
  const [gameState, setGameState] = useState({
    board: new Minesweeper.Board(9, 9, 0),
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

  const resetGame = (level) => {
    switch (level) {
      case 1:
        setGameState({ board: new Minesweeper.Board(9, 9, 10) });
        break;
      case 2:
        setGameState({ board: new Minesweeper.Board(16, 16, 40) });
        break;
      case 3:
        setGameState({ board: new Minesweeper.Board(30, 16, 100) });
        break;
    }
  };

  let modal =
    board.lost() || board.won() ? (
      <Modal>
        <p id="modal-text">
          {board.won() ? 'You won!' : 'Game over!'} Play Again?
        </p>
        <button onClick={() => resetGame(1)}>Easy</button>
        <button onClick={() => resetGame(2)}>Intermediate</button>
        <button onClick={() => resetGame(3)}>Expert</button>
      </Modal>
    ) : null;

  useLayoutEffect(() => {
    document.getElementById('modal-text').innerText = 'Choose difficulty';
  }, []);

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
