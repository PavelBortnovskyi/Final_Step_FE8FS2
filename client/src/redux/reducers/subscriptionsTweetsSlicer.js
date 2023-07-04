import { createSlice } from '@reduxjs/toolkit';
import { getSubscriptionsTweets } from '../thunk/tweets/getSubscriptionsTweets.js';
import { likePost } from '../thunk/tweets/likeTweet.js';
import { createTweet } from '../thunk/tweets/createTweet.js';
import { addBookmark } from '../thunk/thunkBookmarks/addBookmark.js';
import { addQuote } from '../thunk/tweets/addQuote.js';
import { addRetweet } from '../thunk/tweets/addRetweet.js';
import { deleteBookmark } from '../thunk/thunkBookmarks/deleteBookmark.js';
import { deleteTweet } from '../thunk/tweets/deleteTweet.js';
import { createTweetReply } from '../thunk/tweets/replyTweet.js';

const initialState = {
  subscriptionsTweets: [],
  isLoading: false,
  error: '',
};

export const getUserTweetsSlice = createSlice({
  name: 'subscriptionsTweets',
  initialState,
  reducers: {
    resetSubscriptionsTweets(state) {
      state.subscriptionsTweets = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getSubscriptionsTweets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSubscriptionsTweets.fulfilled, (state, action) => {
        const newTweets = action.payload.filter(
          (newTweet) =>
            !state.subscriptionsTweets.some((tweet) => tweet.id === newTweet.id)
        );

        state.subscriptionsTweets = [
          ...state.subscriptionsTweets,
          ...newTweets,
        ];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getSubscriptionsTweets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const likedTweet = action.payload;
        state.subscriptionsTweets = state.subscriptionsTweets.map((tweet) => {
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
        state.subscriptionsTweets = state.subscriptionsTweets.map((tweet) => {
          if (tweet.tweetType === 'RETWEET') {
            return tweet.parentTweet.id === retweetTweet.id
              ? { ...tweet, parentTweet: retweetTweet }
              : tweet;
          } else {
            return tweet.id === retweetTweet.id ? retweetTweet : tweet;
          }
        });
      })
      .addCase(deleteTweet.fulfilled, (state, action) => {
        const deleteTweetUser = action.payload;
        state.subscriptionsTweets = state.subscriptionsTweets.filter(tweet => {
          if (tweet.tweetType === "RETWEET") {
            return tweet.parentTweet.id !== deleteTweetUser.id
          } else {
            return tweet.id !== deleteTweetUser.id
          }
        });
      })
      .addCase(addQuote.fulfilled, (state, action) => {
        const quoteTweet = action.payload.data.parentTweet;
        state.subscriptionsTweets = [
          action.payload.data,
          ...state.subscriptionsTweets.map((tweet) => {
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
        state.subscriptionsTweets = state.subscriptionsTweets.map((tweet) =>
          tweet.id === bookmarkTweet.id ? bookmarkTweet : tweet
        );
      })
      .addCase(createTweet.fulfilled, (state, action) => {
        const newTweet = action.payload;
        state.subscriptionsTweets = [newTweet, ...state.subscriptionsTweets];
      })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        const bookmarkTweet = action.payload;
        state.subscriptionsTweets = state.subscriptionsTweets.map((tweet) =>
          tweet.id === bookmarkTweet.id ? bookmarkTweet : tweet
        );
      })
      .addCase(createTweetReply.fulfilled, (state, action) => {
        const quoteTweet = action.payload.data.parentTweet;
        state.subscriptionsTweets = [
          action.payload.data,
          ...state.subscriptionsTweets.map((tweet) => {
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
export const { resetSubscriptionsTweets } = getUserTweetsSlice.actions;
