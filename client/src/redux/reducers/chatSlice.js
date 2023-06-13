import { createSlice } from '@reduxjs/toolkit';

import { getGuest } from '../thunk/getGuest.js';
import { getCurrentChat } from '../thunk/getCurrentChat.js';
import { getAllChats } from '../thunk/getAllChats.js';

const initialState = {
  guest: null,
  currentChat: null,
  allChats: null,
  socketChat: null,
  isLoading: false,
  error: '',
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,

  reducers: {
    chatCloseConnection(state, actions) {
      state.guest = null;
      state.currentChat = null;
    },
    setSocketChat(state, action) {
      state.socketChat = action.payload;
    },
  },

  extraReducers: (builder) => {
    // getGuest
    builder.addCase(getGuest.pending, (state, action) => {
      // state.guest = null;
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

    // getCurrentChat
    builder.addCase(getCurrentChat.pending, (state, action) => {
      // state.guest = null;
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getCurrentChat.fulfilled, (state, action) => {
      state.currentChat = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getCurrentChat.rejected, (state, action) => {
      state.error = action.payload?.info;
      state.isLoading = false;
    });

    // getAllChats
    builder.addCase(getAllChats.pending, (state, action) => {
      // state.guest = null;
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getAllChats.fulfilled, (state, action) => {
      state.allChats = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllChats.rejected, (state, action) => {
      state.error = action.payload?.info;
      state.isLoading = false;
    });
  },
});

export const { chatCloseConnection, setSocketChat } = chatSlice.actions;
export default chatSlice.reducer;
