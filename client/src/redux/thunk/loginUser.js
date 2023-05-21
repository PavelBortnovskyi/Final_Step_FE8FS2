import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';
import { getUser } from 'src/redux/thunk/getUser';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user, { dispatch, rejectWithValue }) => {
    try {
      const { email, password } = user;

      // request for server
      const { data } = await myAxios.post('/auth/login', {
        email,
        password,
      });

      // if a token is received, store it in localStorage
      if (data.ACCESS_TOKEN) {
        await window.localStorage.setItem('accessToken', data.ACCESS_TOKEN);

        // get user data
        dispatch(getUser());
      }

      console.log(data);

      return data;
    } catch (error) {
      // set message error from server
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
