import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const unLikePost = createAsyncThunk(
  'tweet/likeToTweet',
  async ({ id }, thunkAPI) => {
    try {
      const { data } = await myAxios.post(`/tweet/${id}/unlike`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
