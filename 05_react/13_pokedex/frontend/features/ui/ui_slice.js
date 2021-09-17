import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllPokemon,
  fetchPokemon,
  createPokemon,
} from '../pokemon/pokemon_slice';

const initialState = {
  loading: {},
  errors: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    startFetchingPokemon: (state, action) => {
      state.loading.fetchPokemon = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPokemon.pending, (state) => {
        state.loading.fetchingAllPokemon = true;
      })
      .addCase(fetchAllPokemon.fulfilled, (state) => {
        state.loading.fetchingAllPokemon = false;
      })
      .addCase(fetchPokemon.pending, (state) => {
        state.loading.fetchingPokemon = true;
      })
      .addCase(fetchPokemon.fulfilled, (state) => {
        state.loading.fetchingPokemon = false;
      })
      .addCase(createPokemon.fulfilled, (state) => {
        state.errors = [];
      })
      .addCase(createPokemon.rejected, (state, action) => {
        state.errors = action.payload;
      });
  },
});

export default uiSlice.reducer;

export const selectFetchingAllPokemon = (state) =>
  state.ui.loading.fetchingAllPokemon;

export const selectFetchingPokemon = (state) =>
  state.ui.loading.fetchingPokemon;

export const selectErrors = (state) => state.ui.errors;
