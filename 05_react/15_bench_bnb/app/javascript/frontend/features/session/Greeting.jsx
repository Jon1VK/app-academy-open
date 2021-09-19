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
    <div>
      <p>Welcome, {currentUser.username}</p>
      <button onClick={handleClick}>Logout</button>
    </div>
  ) : (
    <div>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>
    </div>
  );
};

export default Greeting;
