import { createSlice } from '@reduxjs/toolkit';
import { fetchAllPokemon, fetchPokemon } from '../pokemon/pokemon_slice';

const initialState = {
  loading: {},
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
      });
  },
});

export default uiSlice.reducer;

export const selectFetchingAllPokemon = (state) =>
  state.ui.loading.fetchingAllPokemon;

export const selectFetchingPokemon = (state) =>
  state.ui.loading.fetchingPokemon;
