import { createSlice } from '@reduxjs/toolkit';

import { getGuest } from '../thunk/getGuest.js';

const initialState = {
  guest: null,
  isLoading: false,
  error: '',
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,

  reducers: {
    chatCloseConnection(state, actions) {
      state.guest = null;
    },
  },

  extraReducers: (builder) => {
    // getGuest
    builder.addCase(getGuest.pending, (state, action) => {
      state.guest = null;
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getGuest.fulfilled, (state, action) => {
      state.guest = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getGuest.rejected, (state, action) => {
      state.error = action.payload?.info;
      state.isLoading = false;
    });
  },
});

export const { chatCloseConnection } = chatSlice.actions;
export default chatSlice.reducer;
