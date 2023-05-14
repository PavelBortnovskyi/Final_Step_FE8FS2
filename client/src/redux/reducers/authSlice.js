import { createSlice } from '@reduxjs/toolkit';

import { registerUser } from '../thunk/registerUser.js';
import { loginUser } from '../thunk/loginUser.js';
import { getUser } from '../thunk/getUser.js';

const initialState = {
  isAuthenticated: Boolean(localStorage.getItem('accessToken')),
  email: null,
  fullName: null,
  userTag: null,
  isLoading: false,
  message: '',
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.email = null;
      state.fullName = null;
      state.userTag = null;
      state.isLoading = false;
      state.message = '';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
      state.message = '';
      state.error = '';
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.userTag = action.payload.userTag;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.isLoading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    });
    // login
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    });
    // getUser
    builder.addCase(getUser.pending, (state, action) => {
      state.isLoading = true;
      state.message = '';
      state.error = '';
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.userTag = action.payload.userTag;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.isLoading = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    });
  },
});

// check if there is a token
// export const checkIsAuth = (state) => Boolean(state.auth.token);

export const { logout } = authSlice.actions;
export default authSlice.reducer;
