import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import pokemonReducer from '../features/pokemon/pokemon_slice';

export default configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
