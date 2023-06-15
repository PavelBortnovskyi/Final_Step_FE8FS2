
import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const getNotifications = createAsyncThunk(
  'notifications/all',

  async ({ page, pageSize }, thunkAPI) => {
    try {
      const { data } = await myAxios.get(
        `/notification/all/?page=${page}&pageSize=${pageSize}`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)