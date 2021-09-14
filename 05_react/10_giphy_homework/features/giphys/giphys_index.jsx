import React from 'react';
import { useSelector } from 'react-redux';

import { selectGiphys } from './giphysSlice';
import GiphysIndexItem from './giphys_index_item';

const GiphysIndex = () => {
  const giphys = useSelector(selectGiphys);

  return (
    <ul>
      {giphys.map((giphy) => (
        <GiphysIndexItem key={giphy.id} giphy={giphy} />
      ))}
    </ul>
  );
};

export default GiphysIndex;
