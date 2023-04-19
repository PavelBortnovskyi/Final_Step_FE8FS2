import { createBrowserRouter } from 'react-router-dom';

import { App } from 'src/components/App';
import { HomePage } from 'src/pages/HomePage';
import { NewsPage } from 'src/pages/NewsPage';
import { NotfoundPage } from 'src/pages/NotfoundPage';
import { UserPage } from 'src/pages/UserPage';

export const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
    errorElement: <NotfoundPage />,
    children: [
      {
        element: <HomePage />,
        index: true,
      },
      {
        element: <UserPage />,
        path: 'user',
      },
      {
        element: <NewsPage />,
        path: 'news',
      },
    ],
  },
]);
