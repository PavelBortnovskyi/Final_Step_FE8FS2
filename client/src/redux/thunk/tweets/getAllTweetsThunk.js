import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const getAllTweetsThunk = createAsyncThunk(
  'tweet/allTweets',
  async (thunkAPI) => {
    try {
      const { data } = await myAxios.get(`tweet/`);

      return data.content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
