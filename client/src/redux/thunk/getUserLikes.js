// getUserLikes;
import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const getUserLikes = createAsyncThunk(
  'user/likes',
  async (id, { rejectWithValue }) => {
    const userId = id ? `/${id}` : '';
    console.log(userId);
    try {
      // request to server if we have token in localStorage it will inject src/utils/axiosSetup into request
      const { data } = await myAxios.get(`/tweet/like/user${userId}`);

      return data;
    } catch (error) {
      // set message error from server
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
