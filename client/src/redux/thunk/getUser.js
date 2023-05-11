import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (_, { rejectWithValue }) => {
    try {
      // /api/auth/register - path from server/src/routes/auth.js
      // BASE_URL_AXIOS=http://localhost/3004/api - path from client/src/.env

      // request to server if we have token in localStorage it will inject src/utils/axiosSetup into request
      const { data } = await myAxios.get('/auth/user');
      return data;
    } catch (error) {
      // set message error from server
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
