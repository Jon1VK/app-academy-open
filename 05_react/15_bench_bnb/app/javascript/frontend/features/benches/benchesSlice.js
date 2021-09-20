import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import * as benchesAPI from '../../util/benches_api_util';

const benchesAdapter = createEntityAdapter();

export const fetchBenches = createAsyncThunk(
  'benches/fetchBenches',
  (_, { getState }) => {
    const filters = getState().filters;
    return benchesAPI.fetchBenches(filters);
  }
);

const benchesSlice = createSlice({
  name: 'benches',
  initialState: benchesAdapter.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(fetchBenches.fulfilled, benchesAdapter.setAll);
  },
});

export default benchesSlice.reducer;

export const { selectAll: selectAllBenches } = benchesAdapter.getSelectors(
  (state) => state.benches
);
