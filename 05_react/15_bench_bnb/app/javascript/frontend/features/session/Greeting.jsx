import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCurrentUser, logout } from './sessionSlice';

const Greeting = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const handleClick = () => dispatch(logout());

  return currentUser ? (
    <div className="navbar align-items-center my-4">
      <h1 className="m-0">BenchBnB</h1>
      <div>
        <span className="me-3">Welcome, {currentUser.username}</span>
        <a href="#" onClick={handleClick}>
          Logout
        </a>
      </div>
    </div>
  ) : (
    <div className="navbar align-items-center my-4">
      <h1>BenchBnB</h1>
      <div>
        <Link className="me-3" to="/signup">
          Sign Up
        </Link>
        <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

export default Greeting;
