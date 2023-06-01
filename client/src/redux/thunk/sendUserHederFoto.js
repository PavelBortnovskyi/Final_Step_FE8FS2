import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';
import { getUser } from 'src/redux/thunk/getUser';

export const sendUserHederFoto = createAsyncThunk(
  'user/profile/header_img',
  async (headerImg, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await myAxios.put('/user/profile/header_img', headerImg);

      dispatch(getUser());
      return data;
    } catch (error) {
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
