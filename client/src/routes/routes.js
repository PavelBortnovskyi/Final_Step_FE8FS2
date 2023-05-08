import { HomePage } from 'src/pages/HomePage';
import { UserPage } from 'src/pages/UserPage';
import { LoginPage } from 'src/pages/LoginPage';
import { RegistrationPage } from 'src/pages/RegistrationPage';

export const mainRoutes = () => {
  return [
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
      element: <UserPage />,
      path: '/explore',
    },
    {
      element: <UserPage />,
      path: '/notifications',
    },
    {
      element: <UserPage />,
      path: '/messages',
    },
    {
      element: <UserPage />,
      path: '/bookmarks',
    },
    {
      element: <UserPage />,
      path: '/twitter_blue',
    },
    {
      element: <UserPage />,
      path: '/verified-orgs',
    },
    {
      element: <UserPage />,
      path: '/profile',
    },
  ];
};

export const modalRoutes = () => {
  return [
    {
      path: '/modal/login',
      element: <LoginPage />,
    },
    {
      path: '/modal/registration',
      element: <RegistrationPage />,
    },
  ];
};
