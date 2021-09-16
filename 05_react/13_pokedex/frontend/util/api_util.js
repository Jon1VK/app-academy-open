export const fetchAllPokemon = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch('/api/pokemon');
  return response.json();
};

export const fetchPokemon = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(`/api/pokemon/${id}`);
  return response.json();
};
