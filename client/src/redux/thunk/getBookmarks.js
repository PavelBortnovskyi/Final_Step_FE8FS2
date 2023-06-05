import { createAsyncThunk } from '@reduxjs/toolkit';
import React from 'react'

export const getBookmarks = () => createAsyncThunk(
  'tweet/bookmarks',
  async ({ page, pageSize }, thunkAPI) => {
    try {
      const { data } = await myAxios.get(
        `/tweet/bookmarks/?page=${page}&pageSize=${pageSize}`
        // `/tweet/bookmarks/${userId}?page=${page}&pageSize=${pageSize}`
      );
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)
