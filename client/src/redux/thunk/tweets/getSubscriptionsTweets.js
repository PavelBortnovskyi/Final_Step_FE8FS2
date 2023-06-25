import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAxios } from 'src/utils/axiosSetup';
import {
  setPage,
  setTotalPages,
  setTotalElements,
} from '../../reducers/pagination/paginationSlice.js';

// export const getSubscriptionsTweets = createAsyncThunk(
//   'tweet/getSubscriptionsTweets',
//   async ({ page, pageSize }, thunkAPI) => {
//     try {
//       const { data } = await myAxios.get(
//         `tweet/subscriptions?page=${page}&pageSize=${pageSize}`
//       );
//       console.log(data);
//       return data.content;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const getSubscriptionsTweets = createAsyncThunk(
  'tweet/getSubscriptionsTweets',
  async ({ page, pageSize }, thunkAPI) => {
    try {
      const { data } = await myAxios.get(
        `tweet/subscriptions?page=${page}&pageSize=${pageSize}`
      );

      const { content, totalPages, totalElements } = data;

      thunkAPI.dispatch(setPage(page));
      thunkAPI.dispatch(setTotalPages(totalPages));
      thunkAPI.dispatch(setTotalElements(totalElements));
      console.log(data);
      console.log(data);
      return content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
