import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';
import { data } from '@emoji-mart/data';

// create chat in DB with id guest
export const getCurrentChat = createAsyncThunk(
  'chat/getCurrentChat',
  async (guestId, { rejectWithValue }) => {
    try {
      const { data } = await myAxios.post(
        `/chat/create?interlocutorId=${guestId}`
      );

      // console.log(data);

      return data;
      //
    } catch (error) {
      // set message error from server
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
