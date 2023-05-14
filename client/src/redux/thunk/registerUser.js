import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';
import { getUser } from 'src/redux/thunk/getUser';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (user, { dispatch, rejectWithValue }) => {
    try {
      const { email, fullName, userTag, password, birthday } = user;

      // request for server
      const { data } = await myAxios.post('/auth/register', {
        email,
        fullName,
        userTag,
        password,
        birthday,
      });

      // if a token is received, store it in localStorage
      if (data.ACCESS_TOKEN) {
        window.localStorage.setItem('accessToken', data.ACCESS_TOKEN);

        // get user data
        dispatch(getUser());
      }

      return data;
    } catch (error) {
      // set message error from server
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
