import { createSlice } from '@reduxjs/toolkit';

import { findUser } from '../thunk/findUser.js';
import { findMessage } from '../thunk/findMessage.js';

const initialState = {
  findUser: null,
  findMessage: null,
  isLoading: false,
  error: '',
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,

  extraReducers: (builder) => {
    // findUser
    builder.addCase(findUser.pending, (state, action) => {
      state.findUser = null;
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(findUser.fulfilled, (state, action) => {
      state.findUser = action.payload;
      state.isLoading = false;
    });
    builder.addCase(findUser.rejected, (state, action) => {
      state.error = action.payload?.info;
      state.isLoading = false;
    });

    // findMessage
    builder.addCase(findMessage.pending, (state, action) => {
      state.findMessage = null;
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(findMessage.fulfilled, (state, action) => {
      state.findMessage = action.payload;
      state.isLoading = false;
    });
    builder.addCase(findMessage.rejected, (state, action) => {
      state.error = action.payload?.info;
      state.isLoading = false;
    });
  },
});

export default messagesSlice.reducer;
