import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';
import {
  setPage,
  setTotalPages,
  setTotalElements,
} from '../reducers/pagination/paginationSlice.js';

export const getUserLikes = createAsyncThunk(
  'user/likes',
  async ({ page, size, id }, thunkAPI) => {
    const userId = id ? `/${id}` : '';
    try {
      // request to server if we have token in localStorage it will inject src/utils/axiosSetup into request
      const { data } = await myAxios.get(
        `/tweet/like/user${userId}?page=${page}&size=${size}`
      );
      const { content, totalPages, totalElements } = data;

      thunkAPI.dispatch(setPage(page));
      thunkAPI.dispatch(setTotalPages(totalPages));
      thunkAPI.dispatch(setTotalElements(totalElements));
      return content;
    } catch (error) {
      // set message error from server
      const errorMessage = error.response.data || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
