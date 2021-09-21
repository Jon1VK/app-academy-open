import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBenches } from '../benches/benchesSlice';
import { selectMaxSeats, selectMinSeats, updateFilter } from './filtersSlice';

const FilterForm = () => {
  const dispatch = useDispatch();
  const minSeats = useSelector(selectMinSeats);
  const maxSeats = useSelector(selectMaxSeats);

  const handleChange = (type) => (e) => {
    dispatch(updateFilter(type, e.target.value));
    dispatch(fetchBenches());
  };

  return (
    <div>
      <form className="row">
        <div className="mb-3 col-auto row align-items-center">
          <div className="col-auto">
            <label className="form-label" htmlFor="">
              Minimum number of seats
            </label>
          </div>
          <div className="col-auto">
            <input
              className="form-control"
              type="number"
              min="1"
              value={minSeats}
              onChange={handleChange('minSeats')}
            />
          </div>
        </div>
        <div className="mb-3 col-auto row align-items-center">
          <div className="col-auto">
            <label className="form-label" htmlFor="">
              Maximum number of seats
            </label>
          </div>
          <div className="col-auto">
            <input
              className="form-control"
              type="number"
              min="1"
              value={maxSeats}
              onChange={handleChange('maxSeats')}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default FilterForm;
