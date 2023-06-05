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
import { PageDeveloping } from 'src/components/PageDeveloping/PageDeveloping';
import { Bookmarks } from 'src/components/Bookmarks/Bookmarks';

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
      element: <PageDeveloping/>
    },
    {
      path: '/notifications',
      element: <PageDeveloping/>
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
      element: <Bookmarks/>
    },
    {
      path: '/twitter_blue',
      element: <PageDeveloping/>
    },
    {
      path: '/verified-orgs',
      element: <PageDeveloping/>
    },
    {
      path: '/profile',
      element: <UserPage />,
    },
    {
      path: '/topics',
      element: <PageDeveloping/>
    },
    {
      path: '/lists',
      element: <PageDeveloping/>
    },
    {
      path: '/members',
      element: <PageDeveloping/>
    },
    {
      path: '/analytics',
      element: <PageDeveloping/>
    },
    {
      path: '/professionals',
      element: <PageDeveloping/>
    },
    {
      path: '/ads',
      element: <PageDeveloping/>
    },
    {
      path: '/monetization',
      element: <PageDeveloping/>
    },
    {
      path: '/privacy',
      element: <PageDeveloping/>
    },
    {
      path: '/help',
      element: <PageDeveloping/>
    },
    {
      path: '/display',
      element: <PageDeveloping/>
    },
    {
      path: '/keyboard',
      element: <PageDeveloping/>
    },
    {
      path: '/search',
      element: <PageDeveloping/>
    },
    {
      path: '/page-developing',
      element: <PageDeveloping/>
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
