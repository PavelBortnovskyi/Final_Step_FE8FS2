import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';
import { chatLogout } from '../reducers/chatSlice.js';
import { notAuthenticated } from '../reducers/authSlice.js';

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await myAxios.get('/auth/logout');

      // clear redux store
      dispatch(chatLogout());
      dispatch(notAuthenticated());

      window.localStorage.removeItem('accessToken');

      return data;
    } catch (error) {
      window.localStorage.removeItem('accessToken');
      // set message error from server
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
