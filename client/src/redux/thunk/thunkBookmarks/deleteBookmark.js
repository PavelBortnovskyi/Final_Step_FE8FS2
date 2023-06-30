import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const deleteBookmark = createAsyncThunk(
  'tweet/deleteBookmark',

  async ({ id }, thunkAPI) => {
    try {
      const { data } = await myAxios.post(`/tweet/${id}/unbookmark`);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
