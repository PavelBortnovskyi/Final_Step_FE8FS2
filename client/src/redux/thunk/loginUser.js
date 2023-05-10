import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user, { rejectWithValue }) => {
    try {
      const { login, password } = user;

      // /api/auth/register - path from server/src/routes/auth.js
      // BASE_URL_AXIOS=http://localhost/3004/api - path from client/src/.env

      // request for server
      const { data } = await myAxios.post('/auth/login', {
        login,
        password,
      });

      // if a token is received, store it in localStorage
      if (data.token) {
        window.localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      // set message error from server
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
