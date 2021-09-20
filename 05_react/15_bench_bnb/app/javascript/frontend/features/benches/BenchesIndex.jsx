import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BenchesIndexItem from './BenchesIndexItem';
import { fetchBenches } from './benchesSlice';
import { selectAllBenches } from './benchesSlice';

const BenchesIndex = () => {
  const dispatch = useDispatch();
  const benches = useSelector(selectAllBenches);
  const [loading, setLoading] = useState('true');

  useEffect(() => {
    dispatch(fetchBenches()).then(() => setLoading(false));
  }, []);

  const renderedBenches = benches.map((bench) => (
    <BenchesIndexItem key={bench.id} bench={bench} />
  ));

  return loading ? <div>Loading!</div> : <ul>{renderedBenches}</ul>;
};

export default BenchesIndex;
