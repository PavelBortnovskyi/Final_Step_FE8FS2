import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const addReplay = createAsyncThunk(
  'addReplay',

  async ({ id }, thunkAPI) => {

    try {
      const { data } = await myAxios.post(
        `/tweet/${id}/reply`
      );
      console.log('replay' + data);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)