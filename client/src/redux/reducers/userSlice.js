import { createSlice } from '@reduxjs/toolkit';

import { getUser } from '../thunk/getUser.js';

const initialState = {
  user: {},
  isLoading: false,
  message: '',
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,

  extraReducers: (builder) => {
    // getUser
    builder.addCase(getUser.pending, (state, action) => {
      state.isLoading = true;
      state.message = '';
      state.error = '';
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.message = action.payload.message;
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
