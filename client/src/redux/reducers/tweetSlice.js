import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  text: '',
  files: [],
  loading: false,
  error: null,
};

const tweetSlice = createSlice({
  name: 'tweet',
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
  tweetSlice.actions;
export default tweetSlice.reducer;
