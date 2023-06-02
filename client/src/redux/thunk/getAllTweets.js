import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllTweets = createAsyncThunk(
  'tweet/all_tweets',
  async ({ page, pageSize }, thunkAPI) => {
    try {
      const { data } = await myAxios.get(
        `/tweet/tweets/${userId}?page=${page}&pageSize=${pageSize}`
      );
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
