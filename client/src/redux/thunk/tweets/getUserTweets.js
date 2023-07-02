import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';
import {
  setPage,
  setTotalPages,
  setTotalElements,
} from '../../reducers/pagination/paginationSlice.js';

export const getUserTweetsThunk = createAsyncThunk(
  'tweet/getUserTweets',
  async ({ idUser, page, size }, thunkAPI) => {
    try {
      const { data } = await myAxios.get(
        `/tweet/user/${idUser}?page=${page}&size=${size}`
      );
      const { content, totalPages, totalElements } = data;

      thunkAPI.dispatch(setPage(page));
      thunkAPI.dispatch(setTotalPages(totalPages));
      thunkAPI.dispatch(setTotalElements(totalElements));
      console.log(data.content);
      return content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
