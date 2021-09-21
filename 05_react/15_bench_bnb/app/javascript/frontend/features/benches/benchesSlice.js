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

export const fetchBench = createAsyncThunk('benches/fetchBench', (id) =>
  benchesAPI.fetchBench(id)
);

export const createBench = createAsyncThunk(
  'benches/createBench',
  (bench, { rejectWithValue }) =>
    benchesAPI.createBench(bench).catch((errors) => rejectWithValue(errors))
);

const benchesSlice = createSlice({
  name: 'benches',
  initialState: benchesAdapter.getInitialState(),
  extraReducers: (builder) => {
    builder
      .addCase(fetchBenches.fulfilled, benchesAdapter.setAll)
      .addCase(fetchBench.fulfilled, (state, action) => {
        benchesAdapter.setOne(state, action.payload.bench);
      })
      .addCase(createBench.fulfilled, (state, action) => {
        benchesAdapter.setOne(state, action.payload.bench);
      });
  },
});

export default benchesSlice.reducer;

export const { selectAll: selectAllBenches, selectById: selectBenchById } =
  benchesAdapter.getSelectors((state) => state.benches);
