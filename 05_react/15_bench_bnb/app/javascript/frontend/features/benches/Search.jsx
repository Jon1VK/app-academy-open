import React, { useEffect, useState } from 'react';
import { fetchBenches } from './benchesSlice';
import { selectAllBenches } from './benchesSlice';
import { useDispatch, useSelector } from 'react-redux';
import BenchesMap from './BenchesMap';
import BenchesIndex from './BenchesIndex';

const Search = () => {
  const dispatch = useDispatch();
  const benches = useSelector(selectAllBenches);
  const [loading, setLoading] = useState('true');

  useEffect(() => {
    dispatch(fetchBenches()).then(() => setLoading(false));
  }, []);

  return loading ? (
    <div>Loading!</div>
  ) : (
    <div>
      <BenchesMap benches={benches} />
      <BenchesIndex benches={benches} />
    </div>
  );
};

export default Search;
