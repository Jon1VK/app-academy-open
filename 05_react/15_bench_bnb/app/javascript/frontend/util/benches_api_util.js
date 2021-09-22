import csrf_token from './csrf_token';

export const fetchBenches = ({
  bounds: { north, east, south, west },
  minSeats,
  maxSeats,
}) => {
  const seatsQuery = `min_seats=${minSeats}&max_seats=${maxSeats}`;
  const boundsQuery = `bounds[north]=${north}&bounds[east]=${east}&bounds[south]=${south}&bounds[west]=${west}`;
  return fetch(`/api/benches?${seatsQuery}&${boundsQuery}`).then((response) =>
    response.json()
  );
};

export const fetchBench = (id) =>
  fetch(`/api/benches/${id}`).then((response) => response.json());

export const createBench = async (bench) => {
  const formData = new FormData();

  Object.entries(bench).forEach(([key, value]) => {
    if (value) {
      formData.append(`bench[${key}]`, value);
    }
  });

  const response = await fetch('/api/benches', {
    method: 'POST',
    headers: {
      'X-CSRF-Token': csrf_token,
    },
    body: formData,
  });

  const jsonResponse = await response.json();

  if (!response.ok) {
    return Promise.reject(jsonResponse);
  } else {
    return jsonResponse;
  }
};
