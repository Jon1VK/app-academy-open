import React from 'react';
import { selectAllBenches } from './benchesSlice';
import { useSelector } from 'react-redux';
import BenchesMap from './BenchesMap';
import FilterForm from '../filters/FilterForm';

const Search = () => {
  const benches = useSelector(selectAllBenches);

  return (
    <div>
      <FilterForm />
      <BenchesMap benches={benches} />
    </div>
  );
};

export default Search;
