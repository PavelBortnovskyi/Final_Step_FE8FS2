import { createSlice } from '@reduxjs/toolkit';
import { getNotifications } from '../thunk/getNotifications.js';

const initialState = {
  userNotifications: [],
  socketNotification: [],
  isLoading: false,
  error: '',
};

const getNotificationsSlice = createSlice({
  name: 'userNotifications',
  initialState,

  reducers: {
    setSocketNotification(state, action) {
      state.socketNotification = [...state.socketNotification, action.payload];
    },
    clearSocketNotification(state) {
      state.socketNotification = [];
    },
  },
  

  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.userNotifications = action.payload.content;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSocketNotification, clearSocketNotification } = getNotificationsSlice.actions;
export default getNotificationsSlice.reducer;
