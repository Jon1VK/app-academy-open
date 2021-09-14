import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import * as APIUtil from '../../util/api_util';

const pokemonAdapter = createEntityAdapter();

export const fetchAllPokemon = createAsyncThunk(
  'pokemon/fetchAllPokemon',
  async () => await APIUtil.fetchAllPokemon()
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: pokemonAdapter.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(fetchAllPokemon.fulfilled, pokemonAdapter.setAll);
  },
});

export default pokemonSlice.reducer;

export const { selectAll: selectAllPokemon } = pokemonAdapter.getSelectors(
  (state) => state.pokemon
);
