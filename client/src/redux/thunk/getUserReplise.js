import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';
import {
  setPage,
  setTotalPages,
  setTotalElements,
} from '../reducers/pagination/paginationSlice.js';

export const getUserReplise = createAsyncThunk(
  'user/reply',
  async ({ id, page, size }, thunkAPI) => {
    const userId = id ? `/${id}` : '';
    try {
      const { data } = await myAxios.get(
        `/tweet/reply/user${userId}?page=${page}&size=${size}`
      );
      const { content, totalPages, totalElements } = data;

      thunkAPI.dispatch(setPage(page));
      thunkAPI.dispatch(setTotalPages(totalPages));
      thunkAPI.dispatch(setTotalElements(totalElements));
      return content;
    } catch (error) {
      // set message error from server
      const errorMessage = error.response.data || error.message;
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
