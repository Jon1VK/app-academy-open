import React from 'react';
import { selectAllBenches } from './benchesSlice';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from '../../util/route_util';
import BenchesMap from './BenchesMap';
import BenchesIndex from './BenchesIndex';
import BenchForm from './benchForm';
import FilterForm from '../filters/FilterForm';

const Search = () => {
  const benches = useSelector(selectAllBenches);

  return (
    <div>
      <FilterForm />
      <BenchesMap benches={benches} />
      <Switch>
        <ProtectedRoute path="/new" component={BenchForm}></ProtectedRoute>
        <Route path="/">
          <BenchesIndex benches={benches} />
        </Route>
      </Switch>
    </div>
  );
};

export default Search;
