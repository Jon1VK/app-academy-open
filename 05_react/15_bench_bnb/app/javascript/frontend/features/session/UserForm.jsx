import React, { useState } from 'react';
import FormErrors from '../../util/FormErrors';

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
        <div className="mb-3">
          <FormErrors errors={errors['username']} />
          <label className="form-label" htmlFor="username">
            Username:
          </label>
          <input
            className="form-control"
            type="text"
            name="username"
            id="username"
            value={user.username}
            onChange={handleChange('username')}
          />
        </div>
        <div className="mb-3">
          <FormErrors errors={errors['password']} />
          <label className="form-label" htmlFor="password">
            Password:
          </label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange('password')}
          />
        </div>
        <button className="btn btn-primary">{submitText}</button>
      </form>
    </div>
  );
};

export default UserForm;
