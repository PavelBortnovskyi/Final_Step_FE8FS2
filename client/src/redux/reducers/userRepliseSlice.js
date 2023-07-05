// userRepliseSlice
import { createSlice } from '@reduxjs/toolkit';
import { getUserReplise } from '../thunk/getUserReplise.js';
import { addRetweet } from '../thunk/tweets/addRetweet.js';
import { likePost } from '../thunk/tweets/likeTweet.js';
import { addQuote } from '../thunk/tweets/addQuote.js';
import { addBookmark } from '../thunk/thunkBookmarks/addBookmark.js';
import { deleteBookmark } from '../thunk/thunkBookmarks/deleteBookmark.js';

import { createTweetReply } from '../thunk/tweets/replyTweet.js';
import { getUserBiId } from '../thunk/getUserBiId.js';

const initialState = {
  userReplise: [],
  isLoading: false,
  error: '',
};
export const userRepliseSlice = createSlice({
  name: 'userReply',
  initialState,
  reducers: {
    resetUserReplise(state) {
      state.userReplise = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserBiId.fulfilled, (state, action) => {
        state.userReplise = [];
      })
      .addCase(getUserReplise.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserReplise.fulfilled, (state, action) => {
        const newTweets = action.payload.filter(
          (newTweet) =>
            !state.userReplise.some((tweet) => tweet.id === newTweet.id)
        );

        state.userReplise = [...state.userReplise, ...newTweets];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUserReplise.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addRetweet.fulfilled, (state, action) => {
        const retweetTweet = action.payload;
        state.userReplise = state.userReplise.map((tweet) => {
          if (tweet.id === retweetTweet.id) {
            return { id: tweet.id, ...retweetTweet };
          } else if (retweetTweet.parentTweet === null) {
            const updatedTweet = { ...tweet };
            findAndReplaceParent(updatedTweet, retweetTweet);
            return updatedTweet;
          }
          return tweet;
        });

        function findAndReplaceParent(tweet, retweetTweet) {
          if (tweet.parentTweet !== null) {
            if (tweet.parentTweet.id === retweetTweet.id) {
              tweet.parentTweet = retweetTweet;
            } else {
              findAndReplaceParent(tweet.parentTweet, retweetTweet);
            }
          }
        }
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const likedTweet = action.payload;
        state.userReplise = state.userReplise.map((tweet) => {
          if (tweet.id === likedTweet.id) {
            console.log(likedTweet);
            return { id: tweet.id, ...likedTweet };
          } else if (likedTweet.parentTweet === null) {
            const updatedTweet = { ...tweet };
            findAndReplaceParent(updatedTweet, likedTweet);
            return updatedTweet;
          }
          return tweet;
        });

        function findAndReplaceParent(tweet, likedTweet) {
          if (tweet.parentTweet !== null) {
            if (tweet.parentTweet.id === likedTweet.id) {
              tweet.parentTweet = likedTweet;
            } else {
              findAndReplaceParent(tweet.parentTweet, likedTweet);
            }
          }
        }
      })

      .addCase(deleteBookmark.fulfilled, (state, action) => {
        const bookmarkTweet = action.payload;
        state.userReplise = state.userReplise.map((tweet) => {
          if (tweet.id === bookmarkTweet.id) {
            return { id: tweet.id, ...bookmarkTweet };
          } else if (bookmarkTweet.parentTweet === null) {
            const updatedTweet = { ...tweet };
            findAndReplaceParent(updatedTweet, bookmarkTweet);
            return updatedTweet;
          }
          return tweet;
        });

        function findAndReplaceParent(tweet, bookmarkTweet) {
          if (tweet.parentTweet !== null) {
            if (tweet.parentTweet.id === bookmarkTweet.id) {
              tweet.parentTweet = bookmarkTweet;
            } else {
              findAndReplaceParent(tweet.parentTweet, bookmarkTweet);
            }
          }
        }
      })

      .addCase(addBookmark.fulfilled, (state, action) => {
        const bookmarkTweet = action.payload;
        state.userReplise = state.userReplise.map((tweet) => {
          if (tweet.id === bookmarkTweet.id) {
            return { id: tweet.id, ...bookmarkTweet };
          } else if (bookmarkTweet.parentTweet === null) {
            const updatedTweet = { ...tweet };
            findAndReplaceParent(updatedTweet, bookmarkTweet);
            return updatedTweet;
          }
          return tweet;
        });

        function findAndReplaceParent(tweet, bookmarkTweet) {
          if (tweet.parentTweet !== null) {
            if (tweet.parentTweet.id === bookmarkTweet.id) {
              tweet.parentTweet = bookmarkTweet;
            } else {
              findAndReplaceParent(tweet.parentTweet, bookmarkTweet);
            }
          }
        }
      })

      .addCase(addQuote.fulfilled, (state, action) => {
        const quoteTweet = action.payload.data.parentTweet;
        state.userReplise = state.userReplise.map((tweet) => {
          if (tweet.id === quoteTweet.id) {
            return { id: tweet.id, ...quoteTweet };
          } else if (quoteTweet.parentTweet === null) {
            const updatedTweet = { ...tweet };
            findAndReplaceParent(updatedTweet, quoteTweet);
            return updatedTweet;
          }
          return tweet;
        });

        function findAndReplaceParent(tweet, quoteTweet) {
          if (tweet.parentTweet !== null) {
            if (tweet.parentTweet.id === quoteTweet.id) {
              tweet.parentTweet = quoteTweet;
            } else {
              findAndReplaceParent(tweet.parentTweet, quoteTweet);
            }
          }
        }
      })

      .addCase(createTweetReply.fulfilled, (state, action) => {
        const repliesTweet = action.payload.data.parentTweet;
        state.userReplise = state.userReplise.map((tweet) => {
          if (tweet.id === repliesTweet.id) {
            return { id: tweet.id, ...repliesTweet };
          } else if (repliesTweet.parentTweet === null) {
            const updatedTweet = { ...tweet };
            findAndReplaceParent(updatedTweet, repliesTweet);
            return updatedTweet;
          }
          return tweet;
        });

        function findAndReplaceParent(tweet, repliesTweet) {
          if (tweet.parentTweet !== null) {
            if (tweet.parentTweet.id === repliesTweet.id) {
              tweet.parentTweet = repliesTweet;
            } else {
              findAndReplaceParent(tweet.parentTweet, repliesTweet);
            }
          }
        }
      });
  },
});
export default userRepliseSlice.reducer;
export const { resetUserReplise } = userRepliseSlice.actions;
