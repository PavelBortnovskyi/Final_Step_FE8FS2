import { createSlice } from '@reduxjs/toolkit';

// import { getGuest } from '../thunk/getGuest.js';
import { getCurrentChat } from '../thunk/getCurrentChat.js';
import { getAllChats } from '../thunk/getAllChats.js';
import { getChatMessages } from '../thunk/getChatMessages.js';
import { getIdChat } from '../thunk/getIdChat.js';

const initialState = {
  guest: null,
  currentChat: null,
  chatMessages: null,
  currentMessage: null,
  newMessageNotification: [],
  allChats: null,
  idChat: [],
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

      // set newMessageNotification about new message
      if (
        action.payload &&
        // state.currentChat &&
        // action.payload.chatId !== state.currentChat[0].chatId &&
        !state.newMessageNotification.includes(action.payload.userId)
      ) {
        state.newMessageNotification = [
          ...state.newMessageNotification,
          action.payload.userId,
        ];
      }
    },
    setNewMessageNotification(state, action) {
      state.newMessageNotification = action.payload;
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
      state.error = '';
      state.isLoadingCurrentData = true;
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
      state.error = '';
      state.isLoading = true;
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
      state.error = '';
      // state.isLoadingCurrentData = true;
    });
    builder.addCase(getChatMessages.fulfilled, (state, action) => {
      state.chatMessages = action.payload;
      state.isLoadingCurrentData = false;
    });
    builder.addCase(getChatMessages.rejected, (state, action) => {
      state.error = action.payload?.info;
      state.isLoadingCurrentData = false;
    });

    // getIdChat
    builder.addCase(getIdChat.pending, (state, action) => {
      // state.idChat = null;
      state.error = '';
      // state.isLoadingCurrentData = true;
    });
    builder.addCase(getIdChat.fulfilled, (state, action) => {
      state.idChat = [...state.idChat, action.payload];
      // state.isLoadingCurrentData = false;
    });
    builder.addCase(getIdChat.rejected, (state, action) => {
      state.idChat = null;
      state.error = action.payload?.info;
      // state.isLoadingCurrentData = false;
    });
  },
});

export const {
  chatCloseConnection,
  setSocketChat,
  setGuest,
  chatLogout,
  setCurrentMessage,
  setNewMessageNotification,
} = chatSlice.actions;
export default chatSlice.reducer;
