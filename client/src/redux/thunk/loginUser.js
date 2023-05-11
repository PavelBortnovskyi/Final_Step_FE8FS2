import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';
import {getUser} from "src/redux/thunk/getUser";

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user, { dispatch, rejectWithValue }) => {
    try {
      const { email, password } = user;

      // /api/auth/register - path from server/src/routes/auth.js
      // BASE_URL_AXIOS=http://localhost/3004/api - path from client/src/.env

      // request for server
      const { data } = await myAxios.post('/auth/login', {
        email,
        password,
      });

      // if a token is received, store it in localStorage
      if (data.ACCESS_TOKEN) {
        window.localStorage.setItem('accessToken', data.ACCESS_TOKEN);

        dispatch(getUser())
      }
      return data;
    } catch (error) {
      // set message error from server
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
