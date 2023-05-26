import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading, clearData, setError } from '../reducers/postSlice.js';
import { myAxios } from 'src/utils/axiosSetup.js';

export const sendData = createAsyncThunk(
  'data/sendData',
  async ({ text, files }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      console.log(1);
      // Perform the API request to send data
      const requestOptions = {
        body: JSON.stringify({ text }),
      };
      // const data = { text };

      const response = await myAxios.put('/tweet/create_tweet', requestOptions);
      const responseData = response.data;
      console.log(responseData);

      dispatch(setLoading(false));
      dispatch(clearData());
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message || 'An error occurred'));
      return rejectWithValue(error.message || 'An error occurred');
    }
  }
);
