import { createSlice } from '@reduxjs/toolkit';

import { registerUser } from '../thunk/registerUser.js';
import { loginUser } from '../thunk/loginUser.js';
import { logoutUser } from '../thunk/logoutUser.js';

const initialState = {
  isAuthenticated: Boolean(localStorage.getItem('accessToken')),
  isLoading: false,
  message: '',
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  extraReducers: (builder) => {
    // register
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
      state.message = '';
      state.error = '';
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.isLoading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload?.info;
      state.isLoading = false;
    });
    // login
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
      state.message = '';
      state.error = '';
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload?.info;
      state.isLoading = false;
    });
    // logout
    builder.addCase(logoutUser.pending, (state, action) => {
      state.isLoading = true;
      state.message = '';
      state.error = '';
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.message = '';
      state.isAuthenticated = false;
      state.isLoading = false;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.error = action.payload?.info;
      state.isLoading = false;
    });
  },
});

export default authSlice.reducer;
