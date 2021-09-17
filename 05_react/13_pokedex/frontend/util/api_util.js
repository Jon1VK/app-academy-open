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

export const createPokemon = async (pokemon) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch('api/pokemon', {
    method: 'POST',
    headers: {
      'X-CSRF-Token': document.querySelector('[name="csrf-token"').content,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pokemon,
    }),
  });

  if (!response.ok) {
    throw response.json();
  }

  return response.json();
};
