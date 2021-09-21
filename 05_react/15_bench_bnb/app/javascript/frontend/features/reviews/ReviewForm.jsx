import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReview } from './reviewsSlice';
import FormErrors from '../../util/FormErrors';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../session/sessionSlice';

const ReviewForm = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const { id } = useParams();
  const currentUser = useSelector(selectCurrentUser);

  const [review, setReview] = useState({
    rating: '5',
    comment: '',
    bench_id: id,
  });

  const handleChange = (type) => (e) => {
    setReview({ ...review, [type]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReview(review))
      .unwrap()
      .catch((errors) => {
        setErrors(errors);
        if (errors.user_id) {
          alert('You have already reviewed the bench');
        }
      });
  };

  return currentUser ? (
    <div>
      <h3>Add New Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <FormErrors errors={errors['rating']} />
          <label className="form-label" htmlFor="rating">
            Rating
          </label>
          <input
            className="form-control"
            type="number"
            id="rating"
            min="1"
            max="5"
            value={review.rating}
            onChange={handleChange('rating')}
          />
        </div>
        <div className="mb-3">
          <FormErrors errors={errors['comment']} />
          <label className="form-label" htmlFor="comment">
            Comment
          </label>
          <input
            className="form-control"
            type="text"
            id="comment"
            value={review.comment}
            onChange={handleChange('comment')}
          />
        </div>
        <button className="btn btn-primary">Add Review</button>
      </form>
    </div>
  ) : null;
};

export default ReviewForm;
