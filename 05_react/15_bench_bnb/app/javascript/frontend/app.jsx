import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './util/route_util';
import Header from './components/Header';
import LoginForm from './features/session/LoginForm';
import SignupForm from './features/session/SignupForm';
import Search from './features/benches/Search';
import BenchForm from './features/benches/BenchForm';
import BenchShow from './features/benches/BenchShow';

const App = () => (
  <div>
    <Header />
    <Switch>
      <AuthRoute path="/login" component={LoginForm} />
      <AuthRoute path="/signup" component={SignupForm} />
      <ProtectedRoute path="/new" component={BenchForm} />
      <Route path="/benches/:id" component={BenchShow} />
      <Route path="/" component={Search} />
    </Switch>
  </div>
);

export default App;
