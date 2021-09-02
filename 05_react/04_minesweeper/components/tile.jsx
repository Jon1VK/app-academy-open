import React from 'react';

const Tile = ({ tile, onClick }) => {
  const adjacentBombCount = tile.adjacentBombCount();
  let innerHTML = '';
  let className = 'tile';

  if (tile.explored) {
    className += ' revealed';
    if (tile.bombed) {
      innerHTML = <span>&#128163;</span>;
      className += ' bombed';
    } else if (adjacentBombCount) {
      innerHTML = adjacentBombCount;
      className += ` revealed-${adjacentBombCount}`;
    }
  } else if (tile.flagged) {
    innerHTML = <span>&#128681;</span>;
    className += ' flagged';
  }

  return (
    <div className={className} onClick={onClick}>
      {innerHTML}
    </div>
  );
};

export default Tile;
