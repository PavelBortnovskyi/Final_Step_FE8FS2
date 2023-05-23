import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  colorTheme: localStorage.getItem('colorTheme') || 'light',
};

export const themeSlice = createSlice({
  name: 'settingsTheme',
  initialState,
  reducers: {
    setColor: (state, actions) => {
      state.colorTheme = actions.payload;
    },
  },
});

export const { setTheme, setColor } = themeSlice.actions;
export default themeSlice.reducer;
