// userRepliseSlice
import { createSlice } from '@reduxjs/toolkit';
import { getUserReplise } from '../thunk/getUserReplise.js';
import { addRetweet } from '../thunk/tweets/addRetweet.js';
import { likePost } from '../thunk/tweets/likeTweet.js';
import { addQuote } from '../thunk/tweets/addQuote.js';
import { addBookmark } from '../thunk/thunkBookmarks/addBookmark.js';
import { deleteBookmark } from '../thunk/thunkBookmarks/deleteBookmark.js';
import { unLikePost } from '../thunk/tweets/unlike.js';

const initialState = {
  userReplise: [],
  isLoading: false,
  error: '',
};

export const userRepliseSlice = createSlice({
  name: 'userReply',
  initialState,

  extraReducers: (builder) => {
    builder

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

      // .addCase(addRetweet.fulfilled, (state, action) => {
      //   const retweetTweet = action.payload;
      //   state = state.userReplise.map((tweet) => {
      //     function findeParent(tweet) {
      //       if (tweet.id === retweetTweet.id) {
      //         console.log(retweetTweet);
      //         return { ...tweet, tweet: 'ok' };
      //       } else if (tweet.parentTweet !== null) {
      //         console.log('ok');
      //         findeParent(tweet.parentTweet);
      //       }
      //     }

      //     return findeParent(tweet);
      //   });

      // })

      .addCase(addRetweet.fulfilled, (state, action) => {
        const retweetTweet = action.payload;
        state = state.userReplise.map((tweet) => {
          const parentMatch = findeParent(tweet);
          function findeParent(tweet) {
            if (tweet.id === retweetTweet.id) {
              // console.log(tweet);

              return tweet;
            } else if (tweet.parentTweet !== null) {
              // console.log('ok');
              return findeParent(tweet.parentTweet);
            } else {
              // console.log('we');
              return false;
            }
          }

          return parentMatch ? tweet : tweet;
        });
      })

      .addCase(likePost.fulfilled, (state, action) => {
        const likedTweet = action.payload;

        console.log(likedTweet);
        state.userReplise = state.userReplise.map((tweet) =>
          tweet.id === likedTweet.id ? likedTweet : tweet
        );
      })
      // .addCase(unLikePost.fulfilled, (state, action) => {
      //   const unLikedTweet = action.payload;
      // state.userReplise = state.userReplise.filter(
      //   (post) => post.tweet.id !== unLikedTweet.id
      // );
      // })
      .addCase(addQuote.fulfilled, (state, action) => {
        const quoteTweet = action.payload;
        state.userReplise = state.userReplise.map((tweet) =>
          tweet.id === quoteTweet.id ? quoteTweet : tweet
        );
      });
  },
});
export default userRepliseSlice.reducer;
