import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const getTweetReply = createAsyncThunk(
  'tweet/tweetsReply',
  async ({ id, page, pageSize }, thunkAPI) => {
    try {
      const { data } = await myAxios.get(`/tweet/${id}/reply`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
