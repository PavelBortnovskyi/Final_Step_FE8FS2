import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const findUserRightSection = createAsyncThunk(
  'searchUserRightSection',
  async ({ search, size = 999, page = 0 }, { rejectWithValue }) => {
    try {
      if (search.trim() === '') return { searchStr: search.trim() };

      const { data } = await myAxios.get(
        `/user/search?search_string=${search.trim()}&size=${size}&page=${page}`
      );

      return { ...data, searchStr: search.trim() };
    } catch (error) {
      // set message error from server
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);