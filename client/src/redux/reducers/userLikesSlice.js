import { createSlice } from '@reduxjs/toolkit';
import { getUserLikes } from '../thunk/getUserLikes.js';
import { unLikePost } from '../thunk/tweets/unlike.js';
import { likePost } from '../thunk/tweets/likeTweet.js';
import { addQuote } from '../thunk/tweets/addQuote.js';
import { deleteBookmark } from '../thunk/thunkBookmarks/deleteBookmark.js';
import { addBookmark } from '../thunk/thunkBookmarks/addBookmark.js';

const initialState = {
  userLikes: [],
  isLoading: false,
  error: '',
};

export const userLikesSlice = createSlice({
  name: 'userLikes',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getUserLikes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserLikes.fulfilled, (state, action) => {
        const newTweets = action.payload.filter(
          (newTweet) =>
            !state.userLikes.some((tweet) => tweet.id === newTweet.id)
        );

        state.userLikes = [...state.userLikes, ...newTweets];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUserLikes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(unLikePost.fulfilled, (state, action) => {
        const unLikedTweet = action.payload;
        state.userLikes = state.userLikes.filter(
          (post) => post.tweet.id !== unLikedTweet.id
        );
      })
      // .addCase(addQuote.fulfilled, (state, action) => {
      //   const quoteTweet = action.payload;
      //   state.userLikes = state.allTweets.map((tweet) =>
      //     tweet.id === quoteTweet.id ? quoteTweet : tweet
      //   );
      // })
      .addCase(addBookmark.fulfilled, (state, action) => {
        const bookmarkTweet = action.payload;
        state.userLikes = state.userLikes.map((tweet) =>
          tweet.tweet.id === bookmarkTweet.id ? bookmarkTweet : tweet
        );
      })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        const bookmarkTweet = action.payload;
        state.userLikes = state.userLikes.map((tweet) =>
          tweet.tweet.id === bookmarkTweet.id ? bookmarkTweet : tweet
        );
      });
  },
});
export default userLikesSlice.reducer;
