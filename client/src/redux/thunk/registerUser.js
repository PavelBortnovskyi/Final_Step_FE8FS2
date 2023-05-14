import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';
import { data } from '@emoji-mart/data';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (user, { rejectWithValue }) => {
    try {
      const { email, fullName, userTag, password } = user;

      // request for server
      const { data } = await myAxios.post('/auth/register', {
        email,
        fullName,
        userTag,
        password,
      });

      // if a token is received, store it in localStorage
      if (data.token) {
        window.localStorage.setItem('token', data.token);
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
