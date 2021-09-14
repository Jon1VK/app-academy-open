export const fetchAllPokemon = async () => {
  const response = await fetch('/api/pokemon');
  return response.json();
};
