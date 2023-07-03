import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const addQuote = createAsyncThunk(
  'addQuote',

  async (tweet, { rejectWithValue }) => {
    try {
      const { id, postInputText, postImages } = tweet;

      const formData = new FormData();
      formData.append('tweetBody', postInputText);
      // formData.append('parentTweetId', id);
      postImages.forEach((image, index) => {
        formData.append(`attachmentImages`, image);
      });
      const data = await myAxios.post(`/tweet/${id}/quote`, formData);
      return data;
    } catch (error) {
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
