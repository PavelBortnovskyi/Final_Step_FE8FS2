import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const deleteTweet = createAsyncThunk(
  'deleteTweet',

  async ({ id }, thunkAPI) => {
    console.log(id);
    try {
      const { data } = await myAxios.delete(`tweet/${id}`);
      console.log('delete tweet', data);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }

);