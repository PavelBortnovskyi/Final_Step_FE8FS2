import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

// get messages of chat from DB
export const getChatMessages = createAsyncThunk(
  'chat/getChatMessages',
  async ({ chatId, page = 0, pageSize = 999 }, { rejectWithValue }) => {
    try {
      const { data } = await myAxios.get(
        `/chat/${chatId}/messages?page=${page}&pageSize=${pageSize}`
      );

      return data;
      //
    } catch (error) {
      // set message error from server
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
