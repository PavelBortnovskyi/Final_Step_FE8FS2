import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup.js';

export const createTweet = createAsyncThunk(
  'tweet/tweet',
  async (tweet, { rejectWithValue }) => {
    try {
      const { postInputText, postImages } = tweet;

      const formData = new FormData();
      formData.append('tweetBody', postInputText);
      formData.append('file', postImages);

      const data = await myAxios.put("/tweet/tweet", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      return data;
    } catch (error) {
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
