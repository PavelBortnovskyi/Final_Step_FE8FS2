import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const addBookmark = createAsyncThunk(
  'addBookmark',

  async ({ id }, thunkAPI) => {
    try {
      const { data } = await myAxios.post(`/tweet/${id}/bookmark`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
