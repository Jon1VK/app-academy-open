export const fetchAllPokemon = async () => {
  const response = await fetch('/api/pokemon');
  return response.json();
};

export const fetchPokemon = async (id) => {
  const response = await fetch(`/api/pokemon/${id}`);
  return response.json();
};
