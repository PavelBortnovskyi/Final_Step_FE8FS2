import { createSlice } from '@reduxjs/toolkit';

import { getAllTweetsThunkNoAuth } from '../thunk/tweets/getAllTweetsThunkNoAuth.js';
import { likePost } from '../thunk/tweets/likeTweet.js';
import { addQuote } from '../thunk/tweets/addQuote.js';
import { addBookmark } from '../thunk/thunkBookmarks/addBookmark.js';
import { deleteBookmark } from '../thunk/thunkBookmarks/deleteBookmark.js';
import { createTweet } from '../thunk/tweets/createTweet.js';
import { deleteTweet } from '../thunk/tweets/deleteTweet.js';
import { addRetweet } from '../thunk/tweets/addRetweet.js';
import { createTweetReply } from '../thunk/tweets/replyTweet.js';

const initialState = {
  tweetsNoAuth: [],
  isLoading: false,
  error: '',
};

export const getTweetsNoAuth = createSlice({
  name: 'userTweets',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getAllTweetsThunkNoAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // .addCase(getAllTweetsThunkNoAuth.fulfilled, (state, action) => {
      //   state.tweetsNoAuth = action.payload;
      //   state.isLoading = false;
      //   state.error = null;
      // })
      // .addCase(getAllTweetsThunkNoAuth.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload;
      // });

      .addCase(getAllTweetsThunkNoAuth.fulfilled, (state, action) => {
        const newTweets = action.payload.filter(
          (newTweet) =>
            !state.tweetsNoAuth.some((tweet) => tweet.id === newTweet.id)
        );

        state.tweetsNoAuth = [...state.tweetsNoAuth, ...newTweets];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAllTweetsThunkNoAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const likedTweet = action.payload;
        state.tweetsNoAuth = state.tweetsNoAuth.map((tweet) => {
          if (tweet.tweetType !== 'RETWEET') {
            return tweet.id === likedTweet.id ? likedTweet : tweet;
          } else {
            return tweet.parentTweet && tweet.parentTweet.id === likedTweet.id
              ? { ...tweet, parentTweet: likedTweet }
              : tweet;
          }
        });
      })
      .addCase(addQuote.fulfilled, (state, action) => {
        const quoteTweet = action.payload.data.parentTweet;
        state.tweetsNoAuth = [
          action.payload.data,
          ...state.tweetsNoAuth.map((tweet) => {
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
        state.tweetsNoAuth = state.tweetsNoAuth.map((tweet) => {
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
        state.tweetsNoAuth = state.tweetsNoAuth.map((tweet) => {
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
        state.tweetsNoAuth = [newTweet, ...state.tweetsNoAuth];
      })

      .addCase(deleteTweet.fulfilled, (state, action) => {
        const deleteTweetUser = action.payload;
        state.tweetsNoAuth = state.tweetsNoAuth.filter(tweet => {
          if (tweet.tweetType === "RETWEET") {
            return tweet.parentTweet.id !== deleteTweetUser.id
          } else {
            return tweet.id !== deleteTweetUser.id
          }
        });
      })
      .addCase(addRetweet.fulfilled, (state, action) => {
        const retweetTweet = action.payload;
        state.tweetsNoAuth = state.tweetsNoAuth.map((tweet) => {
          if (tweet.tweetType === 'RETWEET') {
            return tweet.parentTweet.id === retweetTweet.id
              ? { ...tweet, parentTweet: retweetTweet }
              : tweet;
          } else {
            return tweet.id === retweetTweet.id ? retweetTweet : tweet;
          }
        });
      })
      .addCase(createTweetReply.fulfilled, (state, action) => {
        const quoteTweet = action.payload.data.parentTweet;
        state.tweetsNoAuth = [
          action.payload.data,
          ...state.tweetsNoAuth.map((tweet) => {
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

export default getTweetsNoAuth.reducer;
