// getUserReplise
import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const getUserReplise = createAsyncThunk(
  'user/likes',
  async (id, { rejectWithValue }) => {
    const userId = id ? `/${id}` : '';
    try {
      // request to server if we have token in localStorage it will inject src/utils/axiosSetup into request
      const { data } = await myAxios.get(`/tweet/reply/user${userId}`);

      return data;
    } catch (error) {
      // set message error from server
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
