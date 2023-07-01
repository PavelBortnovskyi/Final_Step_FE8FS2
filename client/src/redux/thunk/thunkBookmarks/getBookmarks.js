import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const getBookmarks = createAsyncThunk(
  'tweet/bookmarks',

  async ({ page, pageSize }, thunkAPI) => {
    try {
      const { data } = await myAxios.get(
        `/tweet/bookmark?page=${page}&size=${pageSize}`
      );
      console.log(data.content);
      return data.content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
