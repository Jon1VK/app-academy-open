import React from 'react';

const ReviewIndex = ({ reviews }) => {
  const avgRating = reviews.length
    ? reviews.reduce((sum, review) => sum + review.rating, 0.0) / reviews.length
    : '-';

  const renderedRatings = reviews.map((review) => {
    const comment = review.comment && <div>- {review.comment}</div>;
    return (
      <li className="list-group-item" key={review.id}>
        <div>
          Rating {review.rating} by user {review.username}
        </div>
        {comment}
      </li>
    );
  });

  return (
    <div>
      <h3>Reviews</h3>
      <p>Average rating: {avgRating}</p>
      <ul className="mb-3 list-group">{renderedRatings}</ul>
    </div>
  );
};

export default ReviewIndex;
