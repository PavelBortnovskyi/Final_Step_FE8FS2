import { HomePage } from 'src/pages/HomePage';
import { UserPage } from 'src/pages/UserPage';
import { LoginPage } from 'src/pages/LoginPage';
import { RegistrationPage } from 'src/pages/RegistrationPage';
import TweetPage from 'src/pages/tweetPage/TweetPage';
import { ModalTweetPage } from 'src/pages/ModalTweetPage';
import { MessagesPage } from 'src/pages/MessagesPage';
import { EditProfileModal } from 'src/components/EditProfile/EditProfileModal';
import { Chat } from 'src/components/Messages/Chat/Chat';
import { RightSection } from 'src/components/RightSection/RightSection';
import { PageDeveloping } from 'src/components/PageDeveloping/PageDeveloping';
import { FollowersPage } from 'src/pages/FollowersPage';
import { FollowingsPage } from 'src/pages/FollowingsPage';
import { UserBiIdPage } from 'src/pages/UserByIdPage';
import { Bookmarks } from 'src/components/Bookmarks/Bookmarks';
import ModalCommentPage from 'src/pages/ModalCommentPage';
import { NotificationsUser } from 'src/components/NotificationsUser/NotificationsUser';
import { ModalQuotePage } from 'src/pages/ModalQuotePage';
import { SearchUserPage } from 'src/pages/SearchUserPage';
import { SocialLogin } from 'src/components/SocialLogin/SocialLogin';

export const mainRoutes = () => {
  return [
    {
      path: '/',
      element: <HomePage />,
      index: true,
    },
    {
      path: '/user/:id',
      element: <UserBiIdPage />,
    },

    {
      path: '/explore',
      element: <PageDeveloping />,
    },
    {
      path: '/notifications',
      element: <NotificationsUser />,
    },
    {
      path: '/tweet/:id',
      element: <TweetPage />,
    },
    {
      path: '/messages',
      element: <MessagesPage />,
    },
    {
      path: '/bookmarks',
      element: <Bookmarks />,
    },
    {
      path: '/twitter_blue',
      element: <PageDeveloping />,
    },
    {
      path: '/verified-orgs',
      element: <PageDeveloping />,
    },
    {
      path: '/profile',
      element: <UserPage />,
    },
    {
      path: '/topics',
      element: <PageDeveloping />,
    },
    {
      path: '/lists',
      element: <PageDeveloping />,
    },
    {
      path: '/members',
      element: <PageDeveloping />,
    },
    {
      path: '/analytics',
      element: <PageDeveloping />,
    },
    {
      path: '/professionals',
      element: <PageDeveloping />,
    },
    {
      path: '/ads',
      element: <PageDeveloping />,
    },
    {
      path: '/monetization',
      element: <PageDeveloping />,
    },
    {
      path: '/privacy',
      element: <PageDeveloping />,
    },
    {
      path: '/help',
      element: <PageDeveloping />,
    },
    {
      path: '/display',
      element: <PageDeveloping />,
    },
    {
      path: '/keyboard',
      element: <PageDeveloping />,
    },
    {
      path: '/search',
      element: <PageDeveloping />,
    },
    {
      path: '/page-developing',
      element: <PageDeveloping />,
    },
    {
      path: '/:id/followers',
      element: <FollowersPage />,
    },
    {
      path: '/:id/followings',
      element: <FollowingsPage />,
    },
    {
      path: '/search-user',
      element: <SearchUserPage />,
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
    {
      path: '/modal/comment',
      element: <ModalCommentPage />,
    },
    {
      path: '/modal/quote',
      element: <ModalQuotePage />,
    },
  ];
};

export const rightRoutes = (mobile) => {
  return [
    {
      path: '/messages',
      element: mobile ? <></> : <Chat />,
    },
    {
      path: '/social-login',
      element: <SocialLogin />,
    },
    {
      path: '*',
      element: <RightSection />,
    },
  ];
};
