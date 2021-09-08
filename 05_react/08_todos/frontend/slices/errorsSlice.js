import { createSlice } from '@reduxjs/toolkit';

const errorsSlice = createSlice({
  name: 'errors',
  initialState: [],
  reducers: {
    receiveErrors(state, action) {
      return action.payload;
    },

    clearErrors(state, action) {
      return [];
    },
  },
});

export const { receiveErrors, clearErrors } = errorsSlice.actions;

export default errorsSlice.reducer;

export const selectAllErrors = (state) => state.errors;
