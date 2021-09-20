import React from 'react';
import { selectAllBenches } from './benchesSlice';
import { useSelector } from 'react-redux';
import BenchesMap from './BenchesMap';
import BenchesIndex from './BenchesIndex';

const Search = () => {
  const benches = useSelector(selectAllBenches);

  return (
    <div>
      <BenchesMap benches={benches} />
      <BenchesIndex benches={benches} />
    </div>
  );
};

export default Search;
