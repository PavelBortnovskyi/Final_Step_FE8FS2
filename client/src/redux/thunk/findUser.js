import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const findUser = createAsyncThunk(
  'user/findUser',
  async (name, { rejectWithValue }) => {
    try {
      // request to server if we have token in localStorage it will inject src/utils/axiosSetup into request
      console.log('search: ', name);

      const { data } = await myAxios.get(
        `/user/search?part_of_full_name=${name}`
      );

      console.log(data.content);

      return data;
    } catch (error) {
      // set message error from server
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
