import { createAsyncThunk } from '@reduxjs/toolkit';
import React from 'react'
import { myAxios } from 'src/utils/axiosSetup';

export const getBookmarks = createAsyncThunk(
  'tweet/bookmarks',

  async ({ page, pageSize }, thunkAPI) => {

    try {
      const { data } = await myAxios.get(
        `/tweet/bookmarks/?page=${page}&pageSize=${pageSize}`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)
