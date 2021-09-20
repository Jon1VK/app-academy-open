import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bounds: {},
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateBounds(state, action) {
      state.bounds = action.payload;
    },
  },
});

export default filtersSlice.reducer;

export const { updateBounds } = filtersSlice.actions;
