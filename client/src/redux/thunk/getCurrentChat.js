import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';
import { getChatMessages } from './getChatMessages.js';

// create chat in DB with id guest
export const getCurrentChat = createAsyncThunk(
  'chat/getCurrentChat',
  async ({ guestId, pageSize }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await myAxios.post(
        `/chat/create?interlocutorId=${guestId}`
      );

      dispatch(getChatMessages({ chatId: data[0].chatId, pageSize: pageSize }));

      return data;
      //
    } catch (error) {
      // set message error from server
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
