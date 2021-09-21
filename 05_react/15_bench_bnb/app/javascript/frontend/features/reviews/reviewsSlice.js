import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { fetchBench } from '../benches/benchesSlice';
import * as reviewsAPI from '../../util/reviews_api_util';

const reviewsAdapter = createEntityAdapter();

export const createReview = createAsyncThunk(
  'reviews/createReview',
  (review, { rejectWithValue }) =>
    reviewsAPI.createReview(review).catch((errors) => rejectWithValue(errors))
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: reviewsAdapter.getInitialState(),
  extraReducers: (builder) => {
    builder
      .addCase(createReview.fulfilled, reviewsAdapter.addOne)
      .addCase(fetchBench.fulfilled, (state, action) => {
        reviewsAdapter.setAll(state, action.payload.reviews);
      });
  },
});

export default reviewsSlice.reducer;

export const { selectAll: selectAllReviews } = reviewsAdapter.getSelectors(
  (state) => state.reviews
);
