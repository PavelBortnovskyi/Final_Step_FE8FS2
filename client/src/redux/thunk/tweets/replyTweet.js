import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup.js';

export const createTweetReply = createAsyncThunk(
  'tweet/tweetReply',
  async (tweet, { rejectWithValue }) => {
    try {
      const { id, postInputText, postImages } = tweet;

      const formData = new FormData();
      formData.append('tweetBody', postInputText);
      postImages.forEach((image, index) => {
        formData.append(`attachmentImages`, image);
      });
      const data = await myAxios.post(`/tweet/${id}/reply`, formData);
      return data;
    } catch (error) {
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
