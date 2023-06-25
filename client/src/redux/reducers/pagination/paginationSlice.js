// paginationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
  },
});

export const { setPage, setTotalPages, setTotalElements } =
  paginationSlice.actions;
export default paginationSlice.reducer;
