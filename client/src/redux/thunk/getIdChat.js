import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

// get chat data form DB by id
export const getIdChat = createAsyncThunk(
  'chat/getIdChat',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await myAxios.get(`/chat/${id}`);

      return data;
      //
    } catch (error) {
      // set message error from server
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
