import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { signup, login } from '../session/sessionSlice';

const usersAdapter = createEntityAdapter();

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, usersAdapter.addOne)
      .addCase(login.fulfilled, usersAdapter.addOne);
  },
});

export default usersSlice.reducer;
