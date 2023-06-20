import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const getTweetByIdThunk = createAsyncThunk(
  'tweet/getTweet',
  async (id, thunkAPI) => {
    try {
      const { data } = await myAxios.get(`/tweet/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
