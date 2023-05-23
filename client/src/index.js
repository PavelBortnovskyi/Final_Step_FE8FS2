import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from 'src/router/router.js';
import { store } from 'src/redux/store.js';

// import { useMode } from './styles/_materialTheme';
// import { theme } from 'src/styles/_materialTheme.js';
import { CssBaseline, ThemeProvider } from '@mui/material';

import 'src/styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    {/* <ThemeProvider theme={theme}>
      <CssBaseline /> */}
    <RouterProvider router={router} />
    {/* </ThemeProvider> */}
  </Provider>
);
