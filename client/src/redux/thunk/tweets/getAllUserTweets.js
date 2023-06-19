import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllUserTweets = createAsyncThunk(
  'tweet/all_tweets',
  async ({ page, pageSize }, thunkAPI) => {
    try {
      const { data } = await myAxios.get(
        `/tweet/tweets/${userId}?page=${page}&pageSize=${pageSize}`
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
