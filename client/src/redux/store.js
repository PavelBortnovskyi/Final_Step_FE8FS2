import { configureStore } from '@reduxjs/toolkit';
import auth from 'src/redux/reducers/authSlice';
import settingsTheme from 'src/redux/reducers/themeSlice';
// import modal from 'src/redux/reducers/modalSlice';

export const store = configureStore({
  reducer: {
    auth,
    settingsTheme,
    // modal,
  },
});
