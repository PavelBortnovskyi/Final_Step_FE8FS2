import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  text: '',
  files: [],
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setText: (state, action) => {
      state.text = action.payload;
    },
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearData: (state) => {
      state.text = '';
      state.files = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setText, setFiles, setLoading, setError, clearData } =
  dataSlice.actions;
export default dataSlice.reducer;
