import csrf_token from './csrf_token';

export const fetchBenches = (filters) => {
  const {
    bounds: { north, east, south, west },
  } = filters;
  const boundsQuery = `bounds[north]=${north}&bounds[east]=${east}&bounds[south]=${south}&bounds[west]=${west}`;
  return fetch(`/api/benches?${boundsQuery}`).then((response) =>
    response.json()
  );
};

export const createBench = async (bench) => {
  const response = await fetch('/api/benches', {
    method: 'POST',
    headers: {
      'X-CSRF-Token': csrf_token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bench }),
  });

  const jsonResponse = await response.json();

  if (!response.ok) {
    return Promise.reject(jsonResponse);
  } else {
    return jsonResponse;
  }
};
