import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { selectCurrentUser } from '../features/session/sessionSlice';

export const AuthRoute = ({ path, exact, component: Component }) => {
  const current_user = useSelector(selectCurrentUser);

  return !current_user ? (
    <Route path={path} exact={exact} component={Component} />
  ) : (
    <Redirect to="/" />
  );
};
