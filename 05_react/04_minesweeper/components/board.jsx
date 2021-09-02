import React from 'react';
import Tile from './tile';

const Board = ({ grid, handleTileClick }) => {
  const tiles = grid.map((row, i) => {
    const tileRow = row.map((tile, j) => (
      <Tile
        key={j}
        tile={tile}
        onClick={(e) => handleTileClick(tile, e.altKey)}
      />
    ));

    return (
      <div key={i} className="tile-row">
        {tileRow}
      </div>
    );
  });

  return <div className="board">{tiles}</div>;
};

export default Board;
