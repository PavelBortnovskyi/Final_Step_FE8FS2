import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';
import { getChatMessages } from './getChatMessages.js';

// create chat in DB with id guest
export const getCurrentChat = createAsyncThunk(
  'chat/getCurrentChat',
  async ({ guestId, size }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await myAxios.post(
        `/chat/create?interlocutorId=${guestId}`
      );

      dispatch(getChatMessages({ chatId: data[0].chatId, size: size }));

      return data;
      //
    } catch (error) {
      // set message error from server
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
