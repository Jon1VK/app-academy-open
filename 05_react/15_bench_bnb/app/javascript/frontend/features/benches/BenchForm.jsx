import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { createBench } from './benchesSlice';
import FormErrors from '../../util/FormErrors';
import BenchesMap from './BenchesMap';

const BenchForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [errors, setErrors] = useState({});

  const [bench, setBench] = useState({
    description: '',
    image: null,
    seats: '1',
    lat: parseFloat(new URLSearchParams(location.search).get('lat')),
    lon: parseFloat(new URLSearchParams(location.search).get('lon')),
  });

  const handleChange = (type) => (e) => {
    setBench({ ...bench, [type]: e.target.value });
  };

  const handleImageChange = (e) => {
    setBench({ ...bench, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBench(bench))
      .unwrap()
      .then(() => {
        history.push('/');
      })
      .catch((errors) => setErrors(errors));
  };

  const options = {
    draggable: false,
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    center: { lat: bench.lat, lng: bench.lon },
    zoom: 14,
  };

  return (
    <div className="row">
      <div className="col-6">
        <BenchesMap benches={[bench]} options={options} disabled={true} />
      </div>
      <div className="col-6">
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
          <div className="mb-3">
            <label className="form-label" htmlFor="image">
              Image
            </label>
            <input
              className="form-control"
              type="file"
              id="image"
              onChange={handleImageChange}
            />
          </div>
          <button className="btn btn-primary">Add Bench</button>
        </form>
      </div>
    </div>
  );
};

export default BenchForm;
