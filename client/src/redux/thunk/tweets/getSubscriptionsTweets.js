import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const getSubscriptionsTweets = createAsyncThunk(
  'tweet/getSubscriptionsTweets',
  async ({ page, pageSize }, thunkAPI) => {
    try {
      const { data } = await myAxios.get(
        `tweet/subscriptions?page=${page}&pageSize=${pageSize}`
      );
      return data.content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
