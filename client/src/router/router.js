import { createBrowserRouter } from 'react-router-dom';

import { App } from 'src/components/App';
import { HomePage } from 'src/pages/HomePage';
import { LoginPage } from 'src/pages/LoginPage';
import { RegistrationPage } from 'src/pages/RegistrationPage';
import { NotfoundPage } from 'src/pages/NotfoundPage';
import { UserPage } from 'src/pages/UserPage';
import TweetPage from 'src/pages/TweetPage';
import { ModalTweetPage } from 'src/pages/ModalTweetPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotfoundPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        index: true,
      },
      {
        path: '/user',
        element: <UserPage />,
      },
      {
        path: '/tweet',
        element: <TweetPage />,
      },

      {
        path: '/explore',
        element: <UserPage />,
      },
      {
        path: '/notifications',
        element: <UserPage />,
      },
      {
        path: '/messages',
        element: <UserPage />,
      },
      {
        path: '/bookmarks',
        element: <UserPage />,
      },
      {
        path: '/twitter_blue',
        element: <UserPage />,
      },
      {
        path: '/verified-orgs',
        element: <UserPage />,
      },
      {
        path: '/profile',
        element: <UserPage />,
      },
      {
        path: '/modal/login',
        element: <LoginPage />,
      },
      {
        path: '/modal/registration',
        element: <RegistrationPage />,
      },
      {
        path: '/modal/tweet',
        element: <ModalTweetPage />,
      },
    ],
  },
]);
