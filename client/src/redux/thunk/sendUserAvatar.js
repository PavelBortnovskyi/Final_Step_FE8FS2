import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';
import { getUser } from 'src/redux/thunk/getUser';

export const sendUserAvatar = createAsyncThunk(
  'user/profile/avatar_img',
  async (userAvatar, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await myAxios.put(
        '/user/profile/avatar_img',
        userAvatar
      );

      dispatch(getUser());
      return data;
    } catch (error) {
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
