import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';
import { setAuthenticated } from '../reducers/authSlice';

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      // request to server if we have token in localStorage it will inject src/utils/axiosSetup into request
      const { data } = await myAxios.get('/user/profile');

      console.log('getUser');

      dispatch(setAuthenticated(true));
      return data;
    } catch (error) {
      // set message error from server
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
