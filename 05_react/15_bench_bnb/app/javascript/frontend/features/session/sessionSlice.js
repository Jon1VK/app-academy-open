import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as sessionAPI from '../../util/session_api_util';

const _nullSession = {
  userId: null,
};

export const signup = createAsyncThunk('session/signup', (user) =>
  sessionAPI.signup(user)
);

export const login = createAsyncThunk('session/login', (user) =>
  sessionAPI.login(user)
);

export const logout = createAsyncThunk('session/logout', (user) =>
  sessionAPI.logout(user)
);

const sessionSlice = createSlice({
  name: 'session',
  initialState: _nullSession,
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.userId = action.payload.id;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.userId = action.payload.id;
      })
      .addCase(logout.fulfilled, () => _nullSession);
  },
});

export default sessionSlice.reducer;
