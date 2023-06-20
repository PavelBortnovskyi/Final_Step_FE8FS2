import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const addQuote = createAsyncThunk(
  'addQuote',

  async ({ id }, thunkAPI) => {

    try {
      const { data } = await myAxios.post(
        `/tweet/${id}/quote`
      );
      console.log('quote' + data);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)