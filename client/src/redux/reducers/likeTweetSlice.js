import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  likesCount: null,
  loading: false,
  error: null,
};

const postLike = createSlice({
  name: 'like',
  initialState,
  reducers: {
    incrementLikesCount(state) {
      if (state.likesCount !== null) {
        state.likesCount += 1;
      }
    },
    decrementLikesCount(state) {
      if (state.likesCount !== null) {
        state.likesCount -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(likePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.likesCount = action.payload.likesCount;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { incrementLikesCount, decrementLikesCount } = postLike.actions;
export default postLike.reducer;
