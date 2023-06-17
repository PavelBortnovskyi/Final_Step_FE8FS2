import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup.js';

export const createTweet = createAsyncThunk(
  'tweet',
  async (tweet, { rejectWithValue }) => {
    try {
      const { postInputText, postImages } = tweet;

      const formData = new FormData();
      formData.append('tweetBody', postInputText);
      // formData.append('attachmentImages', postImages);
      postImages.forEach((image, index) => {
        formData.append(`attachmentImages`, image);
      });

      const data = await myAxios.post('/tweet', formData);

      return data;
    } catch (error) {
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
