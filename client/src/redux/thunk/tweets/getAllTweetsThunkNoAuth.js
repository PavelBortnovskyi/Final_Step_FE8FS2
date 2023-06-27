import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const getAllTweetsThunkNoAuth = createAsyncThunk(
  'tweet/allTweetsNoAuth',
  async ({ page = 0, size = 20 }, thunkAPI) => {
    try {
      const { data } = await myAxios.get(`tweet/top?page=${page}&size=${size}`);

      return data.content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
