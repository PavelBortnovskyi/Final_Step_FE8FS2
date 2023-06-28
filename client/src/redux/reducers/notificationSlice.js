import { createSlice } from '@reduxjs/toolkit';

// import { getGuest } from '../thunk/getGuest.js';
import { getCurrentChat } from '../thunk/getCurrentChat.js';
import { getAllChats } from '../thunk/getAllChats.js';
import { getChatMessages } from '../thunk/getChatMessages.js';
import { getIdChat } from '../thunk/getIdChat.js';

const initialState = {
  notification: null,
  isLoading: false,
  error: '',
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,

  reducers: {
    setNotification(state, action) {
      state.notification = action.payload;
    },
  },

  extraReducers: (builder) => {
    // // getGuest
    // builder.addCase(getGuest.pending, (state, action) => {
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
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
