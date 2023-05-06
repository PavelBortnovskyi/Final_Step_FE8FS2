import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from 'src/router/router.js';
import { store } from 'src/redux/store.js';

import { theme } from 'src/styles/materialTheme.js';
import { ThemeProvider } from '@mui/material';
import './styles/_variables.scss';
import 'src/styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);
