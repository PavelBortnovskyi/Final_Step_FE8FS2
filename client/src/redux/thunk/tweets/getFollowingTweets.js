import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const getTweetsFollowing = createAsyncThunk(
  'tweet/get_following_tweets',
  async ({ page, pageSize }, thunkAPI) => {
    try {
      const { data } = await myAxios.get(
        `/tweet/following_tweets?page=${page}&pageSize=${pageSize}`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
