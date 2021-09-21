import React from 'react';
import { selectAllBenches } from './benchesSlice';
import { useSelector } from 'react-redux';
import { ProtectedRoute } from '../../util/route_util';
import BenchesMap from './BenchesMap';
import BenchForm from './benchForm';
import FilterForm from '../filters/FilterForm';

const Search = () => {
  const benches = useSelector(selectAllBenches);

  return (
    <div>
      <FilterForm />
      <BenchesMap benches={benches} />
      <ProtectedRoute path="/new" component={BenchForm}></ProtectedRoute>
    </div>
  );
};

export default Search;
