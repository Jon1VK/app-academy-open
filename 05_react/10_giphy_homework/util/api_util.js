const BASE_URL = 'https://api.giphy.com/v1/gifs/search';
const API_KEY = 'IzV02FqqHaOrCrDiKO1wSKgSvzMWgHqI';
const LIMIT = 2;

export const fetchSearchGiphys = async (query) => {
  const response = await fetch(
    `${BASE_URL}?api_key=${API_KEY}&limit=${LIMIT}&q=${query}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const jsonResponse = await response.json();
  return jsonResponse.data;
};
