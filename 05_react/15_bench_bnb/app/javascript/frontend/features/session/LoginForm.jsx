import React from 'react';
import { useDispatch } from 'react-redux';
import UserForm from './UserForm';
import { login } from './sessionSlice';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <UserForm
        submitText="Log In"
        onSubmit={(user) => dispatch(login(user)).unwrap()}
      />
      <Link to="/signup">No account yet? Sign Up!</Link>
    </div>
  );
};

export default LoginForm;
