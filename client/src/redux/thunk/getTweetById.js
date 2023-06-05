import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const getTweetById = createAsyncThunk(
  'tweet/getTweet',
  async (id, thunkAPI) => {
    console.log(id);
    try {
      const { data } = await myAxios.get(`/tweet/tweet/${id}`);

      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
