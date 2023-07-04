import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';
import { getUser } from 'src/redux/thunk/getUser';
import { setAuthToken, setRefreshToken } from 'src/utils/tokens';

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

      console.log(data);

      // if a token is received, store it in localStorage
      if (data.ACCESS_TOKEN) {
        setAuthToken(data.ACCESS_TOKEN);
        setRefreshToken(data.REFRESH_TOKEN);
        // get user data
        dispatch(getUser());
      }
      return data;
    } catch (error) {
      console.log({ error });
      // set message error from server
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
