import { createSlice } from '@reduxjs/toolkit';

import { getUser } from '../thunk/getUser.js';

const initialState = {
  user: {},
  findUser: {},
  isLoading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,

  extraReducers: (builder) => {
    // getUser
    builder.addCase(getUser.pending, (state, action) => {
      state.user = {};
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
  },
});

export default userSlice.reducer;
