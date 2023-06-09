import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const getCountLikes = createAsyncThunk(
  'tweet/countLikes',
  async ({ id }, thunkAPI) => {
    try {
      const { data } = await myAxios.get(`/tweet/get_likes/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
