import { createSlice } from '@reduxjs/toolkit';

import { getAllTweetsThunk } from '../thunk/tweets/getAllTweetsThunk.js';
import { likePost } from '../thunk/tweets/likeTweet.js';
import { createTweet } from '../thunk/tweets/createTweet.js';

const initialState = {
  allTweets: [],
  isLoading: false,
  error: '',
};

const getAllTweetsSlice = createSlice({
  name: 'allTweets',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllTweetsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getAllTweetsThunk.fulfilled, (state, action) => {
        state.allTweets = action.payload;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(getAllTweetsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const likedTweet = action.payload;
        state.allTweets = state.allTweets.map((tweet) =>
          tweet.id === likedTweet.id ? likedTweet : tweet
        );
      })
      .addCase(createTweet.fulfilled, (state, action) => {
        const newTweet = action.payload;
        state.allTweets = [newTweet, ...state.allTweets];
      });
  },
});

export default getAllTweetsSlice.reducer;
