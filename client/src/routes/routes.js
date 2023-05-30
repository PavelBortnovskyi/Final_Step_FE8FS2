import { HomePage } from 'src/pages/HomePage';
import { UserPage } from 'src/pages/UserPage';
import { LoginPage } from 'src/pages/LoginPage';
import { RegistrationPage } from 'src/pages/RegistrationPage';
import TweetPage from 'src/pages/TweetPage';
import { ModalTweetPage } from 'src/pages/ModalTweetPage';
import { MessagesPage } from 'src/pages/MessagesPage';
import { EditProfileModal } from 'src/components/EditProfile/EditProfileModal';
import { Chat } from 'src/components/Chat/Chat';
import { RightSection } from 'src/components/RightSection/RightSection';

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
      path: '/explore',
      element: <UserPage />,
    },
    {
      path: '/notifications',
      element: <UserPage />,
    },
    {
      path: '/tweet',
      element: <TweetPage />,
    },
    {
      path: '/messages',
      element: <MessagesPage />,
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
    {
      path: '/modal/tweet',
      element: <ModalTweetPage />,
    },
    {
      path: '/settings/profile',
      element: <EditProfileModal />,
    },
  ];
};

export const rightRoutes = () => {
  return [
    {
      path: '/messages',
      element: <Chat />,
    },
    {
      path: '*',
      element: <RightSection />,
    },
  ];
};
