import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchPokemon } from '../pokemon/pokemon_slice';

const itemsAdapter = createEntityAdapter();

const itemsSlice = createSlice({
  name: 'items',
  initialState: itemsAdapter.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(fetchPokemon.fulfilled, (state, action) => {
      itemsAdapter.setAll(state, action.payload.items);
    });
  },
});

export default itemsSlice.reducer;

export const { selectAll: selectAllItems, selectById: selectItemById } =
  itemsAdapter.getSelectors((state) => state.items);
