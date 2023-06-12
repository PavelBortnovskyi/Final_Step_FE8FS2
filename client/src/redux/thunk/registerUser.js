import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';
import { getUser } from 'src/redux/thunk/getUser';
import { setAuthToken, setRefreshToken } from 'src/utils/tokens';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (user, { dispatch, rejectWithValue }) => {
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
      if (data.ACCESS_TOKEN) {
        setAuthToken(data.ACCESS_TOKEN);
        setRefreshToken(data.REFRESH_TOKEN);

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
