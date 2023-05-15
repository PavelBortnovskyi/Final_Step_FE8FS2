import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  colorTheme: localStorage.getItem('colorTheme') || 'primary',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, actions) => {
      state.theme = actions.payload;
    },
    setColor: (state, actions) => {
      state.color = actions.payload;
    },
  },
});

export const { setTheme, setColor } = themeSlice.actions;
export default themeSlice.reducer;
