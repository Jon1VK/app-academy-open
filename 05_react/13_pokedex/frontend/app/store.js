import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import pokemonReducer from '../features/pokemon/pokemon_slice';
import itemsReducer from '../features/items/items_slice';
import movesReducer from '../features/moves/moves_slice';

export default configureStore({
  reducer: {
    pokemon: pokemonReducer,
    items: itemsReducer,
    moves: movesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
