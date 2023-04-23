import { configureStore } from '@reduxjs/toolkit';
import modal from 'src/redux/reducers/modalSlice';
import auth from 'src/redux/reducers/authSlice';

export const store = configureStore({
  reducer: {
    modal,
    auth,
  },
});
