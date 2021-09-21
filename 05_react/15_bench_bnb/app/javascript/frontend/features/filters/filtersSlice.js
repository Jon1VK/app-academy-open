import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bounds: {},
  minSeats: 1,
  maxSeats: 10,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateFilter: {
      reducer: (state, action) => {
        const { filter, value } = action.payload;
        state[filter] = value;
      },
      prepare: (filter, value) => ({ payload: { filter, value } }),
    },
  },
});

export default filtersSlice.reducer;

export const { updateFilter } = filtersSlice.actions;

export const selectMinSeats = (state) => state.filters.minSeats;
export const selectMaxSeats = (state) => state.filters.maxSeats;
