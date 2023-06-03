import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const getUserTweetsThunk = createAsyncThunk(
  'tweet/getUserTweets',
  async ({ userId, page, pageSize }, thunkAPI) => {
    try {
      const { data } = await myAxios.get(
        `/tweet/tweets/${userId}?page=${page}&pageSize=${pageSize}`
      );
      console.log(data);
      return data.content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
