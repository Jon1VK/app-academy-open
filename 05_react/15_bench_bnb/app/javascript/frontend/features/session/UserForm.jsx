import React, { useState } from 'react';
import FormErrors from './FormErrors';

const _nullUser = {
  username: '',
  password: '',
};

const UserForm = ({ submitText, onSubmit }) => {
  const [user, setUser] = useState(_nullUser);
  const [errors, setErrors] = useState({});

  const handleChange = (type) => (e) => {
    setUser({ ...user, [type]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(user);
      setUser(_nullUser);
    } catch (errors) {
      setErrors(errors);
      setUser({ ...user, password: '' });
    }
  };

  return (
    <div>
      <FormErrors errors={errors['auth']} />
      <form onSubmit={handleSubmit}>
        <FormErrors errors={errors['username']} />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange('username')}
        />
        <FormErrors errors={errors['password']} />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange('password')}
        />
        <button>{submitText}</button>
      </form>
    </div>
  );
};

export default UserForm;
