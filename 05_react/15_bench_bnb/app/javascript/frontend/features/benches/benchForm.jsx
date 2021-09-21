import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { createBench } from './benchesSlice';
import FormErrors from '../../util/FormErrors';

const BenchForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [errors, setErrors] = useState({});

  const [bench, setBench] = useState({
    description: '',
    seats: '1',
  });

  const handleChange = (type) => (e) => {
    setBench({ ...bench, [type]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const lat = new URLSearchParams(location.search).get('lat');
    const lon = new URLSearchParams(location.search).get('lon');
    const newBench = { ...bench, lat, lon };
    dispatch(createBench(newBench))
      .unwrap()
      .then(() => {
        history.push('/');
      })
      .catch((errors) => setErrors(errors));
  };

  return (
    <div className="my-4">
      <h2>Add New Bench</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <FormErrors errors={errors['description']} />
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <input
            className="form-control"
            type="text"
            id="description"
            value={bench.description}
            onChange={handleChange('description')}
          />
        </div>
        <div className="mb-3">
          <FormErrors errors={errors['seats']} />
          <label className="form-label" htmlFor="seats">
            Number of seats
          </label>
          <input
            className="form-control"
            type="number"
            min="1"
            id="seats"
            value={bench.seats}
            onChange={handleChange('seats')}
          />
        </div>
        <button className="btn btn-primary">Add Bench</button>
      </form>
    </div>
  );
};

export default BenchForm;
