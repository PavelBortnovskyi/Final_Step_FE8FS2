import { createSlice } from '@reduxjs/toolkit';

// import { getGuest } from '../thunk/getGuest.js';
import { getCurrentChat } from '../thunk/getCurrentChat.js';
import { getAllChats } from '../thunk/getAllChats.js';
import { getChatMessages } from '../thunk/getChatMessages.js';

const initialState = {
  guest: null,
  currentChat: null,
  chatMessages: null,
  currentMessage: null,
  allChats: null,
  socketChat: null,
  isLoading: false,
  isLoadingCurrentData: false,
  error: '',
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,

  reducers: {
    chatLogout(state, action) {
      state.guest = null;
      state.chatMessages = null;
      state.currentMessage = null;
      state.allChats = null;
      state.currentChat = null;
      state.socketChat = null;
    },
    chatCloseConnection(state, actions) {
      state.guest = null;
      state.chatMessages = null;
      state.currentMessage = null;
      state.currentChat = null;
    },
    setSocketChat(state, action) {
      state.socketChat = action.payload;
    },
    setGuest(state, action) {
      state.guest = action.payload;
    },
    setCurrentMessage(state, action) {
      state.currentMessage = action.payload;
    },
  },

  extraReducers: (builder) => {
    // // getGuest
    // builder.addCase(getGuest.pending, (state, action) => {
    //   // state.guest = null;
    //   state.isLoading = true;
    //   state.error = '';
    // });
    // builder.addCase(getGuest.fulfilled, (state, action) => {
    //   state.guest = action.payload;
    //   state.isLoading = false;
    // });
    // builder.addCase(getGuest.rejected, (state, action) => {
    //   state.error = action.payload?.info;
    //   state.isLoading = false;
    // });

    // getCurrentChat
    builder.addCase(getCurrentChat.pending, (state, action) => {
      // state.guest = null;
      state.isLoadingCurrentData = true;
      state.error = '';
    });
    builder.addCase(getCurrentChat.fulfilled, (state, action) => {
      state.currentChat = action.payload;
      // state.isLoadingCurrentData = false;
    });
    builder.addCase(getCurrentChat.rejected, (state, action) => {
      state.error = action.payload?.info;
      state.isLoadingCurrentData = false;
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

    // getChatMessages
    builder.addCase(getChatMessages.pending, (state, action) => {
      // state.isLoadingCurrentData = true;
      state.error = '';
    });
    builder.addCase(getChatMessages.fulfilled, (state, action) => {
      state.chatMessages = action.payload;
      state.isLoadingCurrentData = false;
    });
    builder.addCase(getChatMessages.rejected, (state, action) => {
      state.error = action.payload?.info;
      state.isLoadingCurrentData = false;
    });
  },
});

export const {
  chatCloseConnection,
  setSocketChat,
  setGuest,
  chatLogout,
  setCurrentMessage,
} = chatSlice.actions;
export default chatSlice.reducer;
