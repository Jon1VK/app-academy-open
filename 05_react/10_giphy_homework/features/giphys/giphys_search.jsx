import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchSearchGiphys } from './giphysSlice';
import GiphysIndex from './giphys_index';

const GiphysSearch = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const onQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleButtonClick = () => {
    dispatch(fetchSearchGiphys(query));
    setQuery('');
  };

  return (
    <div>
      <div className="search-bar">
        <input type="text" value={query} onChange={onQueryChange} />
        <button onClick={handleButtonClick}>Search Giphy</button>
      </div>
      <GiphysIndex />
    </div>
  );
};

export default GiphysSearch;
