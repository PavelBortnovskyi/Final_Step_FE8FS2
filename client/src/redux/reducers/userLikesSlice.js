import { createSlice } from '@reduxjs/toolkit';
import { getUserLikes } from '../thunk/getUserLikes.js';

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
      });
  },
});
export default userLikesSlice.reducer;
