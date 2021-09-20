import React from 'react';
import BenchesIndexItem from './BenchesIndexItem';

const BenchesIndex = ({ benches }) => {
  const renderedBenches = benches.map((bench) => (
    <BenchesIndexItem key={bench.id} bench={bench} />
  ));

  return <ul>{renderedBenches}</ul>;
};

export default BenchesIndex;
