import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading, clearData, setError } from '../reducers/tweetSlice.js';
import { myAxios } from 'src/utils/axiosSetup.js';

export const createTweet = createAsyncThunk(
  'tweet/create_tweet',
  async (tweet, { rejectWithValue }) => {
    try {
      const { postInputText, postImage } = tweet;

      const { data } = await myAxios.put('/tweet/create_tweet', {
        attachmentsImages: postImage,
        body: `${postInputText}`,
      });
      return data;
    } catch (error) {
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
