import { configureStore } from '@reduxjs/toolkit';
import auth from 'src/redux/reducers/authSlice';

export const store = configureStore({
  reducer: {
    auth,
  },
});
