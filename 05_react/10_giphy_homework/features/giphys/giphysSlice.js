import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as APIUtil from '../../util/api_util';

export const fetchSearchGiphys = createAsyncThunk(
  'giphys/fetchSearchGiphys',
  async (query, { dispatch }) => {
    const giphys = await APIUtil.fetchSearchGiphys(query);
    dispatch(receiveSearchGiphys(giphys));
  }
);

const giphysSlice = createSlice({
  name: 'giphys',
  initialState: [],
  reducers: {
    receiveSearchGiphys(state, action) {
      return action.payload;
    },
  },
});

export default giphysSlice.reducer;

export const { receiveSearchGiphys } = giphysSlice.actions;

export const selectGiphys = (state) => state.giphys;
