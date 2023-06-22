import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const addRetweet = createAsyncThunk(
  'addRetweet',

  async ({ id }, thunkAPI) => {

    try {
      const { data } = await myAxios.post(
        `/tweet/${id}/retweet`
      );
      console.log(id);
      console.log('retweet' + data);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)