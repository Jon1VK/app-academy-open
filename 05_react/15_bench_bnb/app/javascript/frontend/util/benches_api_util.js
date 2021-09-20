export const fetchBenches = () =>
  fetch('/api/benches').then((response) => response.json());
