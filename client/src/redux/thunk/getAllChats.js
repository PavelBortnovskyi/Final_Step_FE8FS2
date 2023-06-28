import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const getAllChats = createAsyncThunk(
  'chat/getAllChats',
  async ({ page = 0, size = 999 }, { rejectWithValue }) => {
    try {
      const { data } = await myAxios.get(`/chat/all?page=${page}&size=${size}`);
      return data;
      //
    } catch (error) {
      // set message error from server
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
