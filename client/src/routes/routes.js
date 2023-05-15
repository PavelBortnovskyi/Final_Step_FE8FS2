
import { HomePage } from 'src/pages/HomePage';
import { UserPage } from 'src/pages/UserPage';
import { LoginPage } from 'src/pages/LoginPage';
import { RegistrationPage } from 'src/pages/RegistrationPage';
import { MessagesPage } from 'src/pages/MessagesPage';
import { EditProfileModal } from "src/components/EditProfile/EditProfileModal";


export const mainRoutes = () => {
  return [
    {
      path: "/",
      element: <HomePage />,
      index: true,
    },
    {
      path: "/user",
      element: <UserPage />,
    },

    {
      path: "/explore",
      element: <UserPage />,
    },
    {
      path: "/notifications",
      element: <UserPage />,
    },
    {
      path: '/messages',
      element: <MessagesPage />,
    },
    {
      path: "/bookmarks",
      element: <UserPage />,
    },
    {
      path: "/twitter_blue",
      element: <UserPage />,
    },
    {
      path: "/verified-orgs",
      element: <UserPage />,
    },
    {
      path: "/profile",
      element: <UserPage />,
    },
  ];
};

export const modalRoutes = () => {
  return [
    {
      path: "/modal/login",
      element: <LoginPage />,
    },
    {
      path: "/modal/registration",
      element: <RegistrationPage />,
    },
    {
      path: "/settings/profile",
      element: <EditProfileModal />,
    },
  ];
};
