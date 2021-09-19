import React from 'react';
import { useDispatch } from 'react-redux';
import UserForm from './UserForm';
import { signup } from './sessionSlice';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <UserForm
        submitText="Sign Up"
        onSubmit={(user) => dispatch(signup(user)).unwrap()}
      />
      <Link className="btn btn-link px-0" to="/login">
        Already have an account? Log In!
      </Link>
    </div>
  );
};

export default SignupForm;
