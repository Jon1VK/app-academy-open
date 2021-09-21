import csrf_token from './csrf_token';

export const createReview = async (review) => {
  const response = await fetch('/api/reviews', {
    method: 'POST',
    headers: {
      'X-CSRF-Token': csrf_token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ review }),
  });

  const jsonResponse = await response.json();

  if (!response.ok) {
    return Promise.reject(jsonResponse);
  } else {
    return jsonResponse;
  }
};
