import { createSlice } from '@reduxjs/toolkit';

import { getUser } from '../thunk/getUser.js';
import { findUser } from '../thunk/findUser.js';

const initialState = {
  user: null,
  findUser: null,
  isLoading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,

  extraReducers: (builder) => {
    // getUser
    builder.addCase(getUser.pending, (state, action) => {
      // state.user = null;
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.error = action.payload?.info;
      state.isLoading = false;
    });

    // findUser
    builder.addCase(findUser.pending, (state, action) => {
      state.findUser = null;
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(findUser.fulfilled, (state, action) => {
      state.findUser = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    });
    builder.addCase(findUser.rejected, (state, action) => {
      state.error = action.payload?.info;
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;
