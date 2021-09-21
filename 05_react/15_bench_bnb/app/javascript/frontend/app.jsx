import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute } from './util/route_util';
import Header from './components/Header';
import LoginForm from './features/session/LoginForm';
import SignupForm from './features/session/SignupForm';
import { fetchBenches } from './features/benches/benchesSlice';
import Search from './features/benches/Search';
import BenchShow from './features/benches/BenchShow';

const App = () => (
  <div>
    <Header />
    <Switch>
      <AuthRoute path="/login" component={LoginForm} />
      <AuthRoute path="/signup" component={SignupForm} />
      <Route path="/benches/:id" component={BenchShow} />
      <Route path="/" component={Search} />
    </Switch>
  </div>
);

export default App;
