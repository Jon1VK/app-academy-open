export const fetchBenches = (filters) => {
  console.log(filters);
  const {
    bounds: { north, east, south, west },
  } = filters;
  const boundsQuery = `bounds[north]=${north}&bounds[east]=${east}&bounds[south]=${south}&bounds[west]=${west}`;
  return fetch(`/api/benches?${boundsQuery}`).then((response) =>
    response.json()
  );
};
