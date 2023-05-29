import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';

export const findUser = createAsyncThunk(
  'user/findUser',
  async ({ search, size = 5, page = 0 }, { rejectWithValue }) => {
    try {
      // request to server if we have token in localStorage it will inject src/utils/axiosSetup into request
      //api/v1/user/search?search_string=user&size=2&page=0
      // console.log(
      //   `/user/search?search_string=${search}&size=${size}&page=${page}`
      // );
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
