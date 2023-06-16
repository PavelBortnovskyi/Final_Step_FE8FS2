
import { createSlice } from '@reduxjs/toolkit';
import { getNotifications } from '../thunk/getNotifications.js';


const initialState = {
  userNotifications: [],
  isLoading: false,
  error: '',
};

const getNotificationsSlice = createSlice({
  name: 'userNotifications',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.userNotifications = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default getNotificationsSlice.reducer;