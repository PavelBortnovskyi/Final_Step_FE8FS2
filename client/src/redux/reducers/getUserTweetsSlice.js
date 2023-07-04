import { createSlice } from '@reduxjs/toolkit';

import { getUserTweetsThunk } from '../thunk/tweets/getUserTweets.js';
import { likePost } from '../thunk/tweets/likeTweet.js';
import { addBookmark } from '../thunk/thunkBookmarks/addBookmark.js';
import { addQuote } from '../thunk/tweets/addQuote.js';
import { addRetweet } from '../thunk/tweets/addRetweet.js';
import { createTweetReply } from '../thunk/tweets/replyTweet.js';
import { deleteBookmark } from '../thunk/thunkBookmarks/deleteBookmark.js';
import { createTweet } from '../thunk/tweets/createTweet.js';
import { deleteTweet } from '../thunk/tweets/deleteTweet.js';

const initialState = {
  userTweets: [],
  isLoading: false,
  error: '',
};

export const getUserTweetsSlice = createSlice({
  name: 'userTweets',
  initialState,
  reducers: {
    resetUserTweets(state) {
      state.userTweets = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserTweetsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(getUserTweetsThunk.fulfilled, (state, action) => {
        const newTweets = action.payload.filter(
          (newTweet) =>
            !state.userTweets.some((tweet) => tweet.id === newTweet.id)
        );

        state.userTweets = [...state.userTweets, ...newTweets];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUserTweetsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const likedTweet = action.payload;
        state.userTweets = state.userTweets.map((tweet) => {
          if (tweet.tweetType !== 'RETWEET') {
            return tweet.id === likedTweet.id ? likedTweet : tweet;
          } else {
            return tweet.parentTweet && tweet.parentTweet.id === likedTweet.id
              ? { ...tweet, parentTweet: likedTweet }
              : tweet;
          }
        });
      })
      .addCase(addRetweet.fulfilled, (state, action) => {
        const retweetTweet = action.payload;
        state.userTweets = state.userTweets.map((tweet) => {
          if (tweet.tweetType === 'RETWEET') {
            return tweet.parentTweet.id === retweetTweet.id
              ? { ...tweet, parentTweet: retweetTweet }
              : tweet;
          } else {
            return tweet.id === retweetTweet.id ? retweetTweet : tweet;
          }
        });
      })

      .addCase(addQuote.fulfilled, (state, action) => {
        const quoteTweet = action.payload.data.parentTweet;
        state.userTweets = [
          action.payload.data,
          ...state.userTweets.map((tweet) => {
            if (tweet.parentTweet === null) {
              return tweet.id === quoteTweet.id ? quoteTweet : tweet;
            } else if (tweet.tweetType === "RETWEET") {
              return tweet.parentTweet.id === quoteTweet.id ? { ...tweet, parentTweet: quoteTweet } : tweet;
            } else {
              return tweet.parentTweet.id === quoteTweet.id
                ? quoteTweet
                : tweet;
            }
          }),
        ];
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        const bookmarkTweet = action.payload;
        state.userTweets = state.userTweets.map((tweet) => {
          if (tweet.tweetType !== 'RETWEET') {
            return tweet.id === bookmarkTweet.id ? bookmarkTweet : tweet;
          } else {
            return tweet.parentTweet &&
              tweet.parentTweet.id === bookmarkTweet.id
              ? { ...tweet, parentTweet: bookmarkTweet }
              : tweet;
          }
        });
      })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        const bookmarkTweet = action.payload;
        state.userTweets = state.userTweets.map((tweet) => {
          if (tweet.tweetType !== 'RETWEET') {
            return tweet.id === bookmarkTweet.id ? bookmarkTweet : tweet;
          } else {
            return tweet.parentTweet &&
              tweet.parentTweet.id === bookmarkTweet.id
              ? { ...tweet, parentTweet: bookmarkTweet }
              : tweet;
          }
        });
      })
      .addCase(createTweet.fulfilled, (state, action) => {
        const newTweet = action.payload;
        state.userTweets = [newTweet, ...state.userTweets];
      })
      .addCase(deleteTweet.fulfilled, (state, action) => {
        const deleteTweetUser = action.payload;
        state.userTweets = state.userTweets.filter((tweet) => {
          if (tweet.tweetType === "RETWEET") {
            return tweet.parentTweet.id !== deleteTweetUser.id
          } else {
            return tweet.id !== deleteTweetUser.id
          }
        })
      })
      .addCase(createTweetReply.fulfilled, (state, action) => {
        const quoteTweet = action.payload.data.parentTweet;
        state.userTweets = [
          action.payload.data,
          ...state.userTweets.map((tweet) => {
            if (tweet.parentTweet === null) {
              return tweet.id === quoteTweet.id ? quoteTweet : tweet;
            } else {
              return tweet.parentTweet.id === quoteTweet.id
                ? { ...tweet, parentTweet: quoteTweet }
                : tweet;
            }
          }),
        ];
      });
  },
});

export default getUserTweetsSlice.reducer;
export const { resetUserTweets } = getUserTweetsSlice.actions;
