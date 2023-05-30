import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const getUserTweets = createAsyncThunk(
  'tweet/getUserTweets',
  async ({ userId, page, pageSize }, thunkAPI) => {
    try {
      const { data } = await myAxios.get(
        `/tweet/tweets?id=${userId}&page=${page}&pageSize=${pageSize}`
      );
      console.log(data);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
