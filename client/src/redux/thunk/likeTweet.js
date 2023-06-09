import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const likePost = createAsyncThunk(
  'tweet/likeToTweet',
  async (id, thunkAPI) => {
    try {
      const { data } = await myAxios.post(`/tweet/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
