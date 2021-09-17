import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import * as APIUtil from '../../util/api_util';

const pokemonAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.id - b.id,
});

export const fetchAllPokemon = createAsyncThunk(
  'pokemon/fetchAllPokemon',
  async () => await APIUtil.fetchAllPokemon()
);

export const fetchPokemon = createAsyncThunk(
  'pokemon/fetchPokemon',
  async (id) => await APIUtil.fetchPokemon(id)
);

export const createPokemon = createAsyncThunk(
  'pokemon/createPokemon',
  async (pokemon, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await APIUtil.createPokemon(pokemon);
      return fulfillWithValue(response);
    } catch (rejected) {
      const errors = await rejected;
      return rejectWithValue(errors);
    }
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: pokemonAdapter.getInitialState(),
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPokemon.fulfilled, pokemonAdapter.addMany)
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        pokemonAdapter.upsertOne(state, action.payload.pokemon);
      })
      .addCase(createPokemon.fulfilled, (state, action) => {
        pokemonAdapter.addOne(state, action.payload.pokemon);
      });
  },
});

export default pokemonSlice.reducer;

export const { selectAll: selectAllPokemon, selectById: selectPokemonById } =
  pokemonAdapter.getSelectors((state) => state.pokemon);
