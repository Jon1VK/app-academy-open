import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as sessionAPI from '../../util/session_api_util';

const _nullSession = {
  userId: null,
};

export const signup = createAsyncThunk(
  'session/signup',
  (user, { rejectWithValue }) =>
    sessionAPI.signup(user).catch((err) => rejectWithValue(err))
);

export const login = createAsyncThunk(
  'session/login',
  (user, { rejectWithValue }) =>
    sessionAPI.login(user).catch((err) => rejectWithValue(err))
);

export const logout = createAsyncThunk(
  'session/logout',
  (user, { rejectWithValue }) =>
    sessionAPI.logout(user).catch((err) => rejectWithValue(err))
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

export const selectCurrentUser = (state) =>
  state.users.entities[state.session.userId];
