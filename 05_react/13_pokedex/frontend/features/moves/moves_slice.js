import {
  createEntityAdapter,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';
import { fetchPokemon, createPokemon } from '../pokemon/pokemon_slice';

const movesAdapter = createEntityAdapter();

const movesSlice = createSlice({
  name: 'moves',
  initialState: movesAdapter.getInitialState(),
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        movesAdapter.setAll(state, action.payload.moves);
      })
      .addCase(createPokemon.fulfilled, (state, action) => {
        movesAdapter.setAll(state, action.payload.moves);
      });
  },
});

export default movesSlice.reducer;

export const { selectAll: selectAllMoves } = movesAdapter.getSelectors(
  (state) => state.moves
);

export const selectMoveNames = createSelector(selectAllMoves, (moves) =>
  moves.map((move) => move.name)
);
