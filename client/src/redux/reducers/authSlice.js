import { createSlice } from '@reduxjs/toolkit';

import { registerUser } from '../thunk/registerUser.js';
import { loginUser } from '../thunk/loginUser.js';
import { getUser } from '../thunk/getUser.js';

const initialState = {
  isAuthenticated: Boolean(localStorage.getItem("accessToken")),
  user: null,
  isLoading: true

  // login: null,
  // email: null,
  // address: '',
  // username: '',
  // orders: [],
  // token: null,
  // isLoading: false,
  // message: '',
  // error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.login = null;
      state.email = null;
      state.address = '';
      state.username = '';
      state.orders = [];
      state.token = null;
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
      state.login = action.payload.login;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.username = action.payload.username;
      state.orders = action.payload.orders;
      state.token = action.payload.token;
      state.message = action.payload.message;
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
      state.login = action.payload?.login;
      state.email = action.payload?.email;
      state.address = action.payload.address;
      state.username = action.payload.username;
      state.orders = action.payload.orders;
      state.token = action.payload?.token;
      state.message = '';
      state.isLoading = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    });
  },
});

// check if there is a token
export const checkIsAuth = (state) => Boolean(state.auth.token);

export const { logout } = authSlice.actions;
export default authSlice.reducer;
