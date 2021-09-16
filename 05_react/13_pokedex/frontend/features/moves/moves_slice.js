import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchPokemon } from '../pokemon/pokemon_slice';

const movesAdapter = createEntityAdapter();

const movesSlice = createSlice({
  name: 'moves',
  initialState: movesAdapter.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(fetchPokemon.fulfilled, (state, action) => {
      movesAdapter.addMany(state, action.payload.moves);
    });
  },
});

export default movesSlice.reducer;

export const { selectById: selectMoveById } = movesAdapter.getSelectors(
  (state) => state.moves
);
