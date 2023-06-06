import { createBrowserRouter } from "react-router-dom";

import { App } from "src/components/App";
import { HomePage } from "src/pages/HomePage";
import { LoginPage } from "src/pages/LoginPage";
import { RegistrationPage } from "src/pages/RegistrationPage";
import { NotfoundPage } from "src/pages/NotfoundPage";
import { UserPage } from "src/pages/UserPage";
import TweetPage from "src/pages/TweetPage";
import { ModalTweetPage } from "src/pages/ModalTweetPage";
import { MessagesPage } from "src/pages/MessagesPage";
import { EditProfileModal } from "src/components/EditProfile/EditProfileModal";
import { Chat } from "src/components/Chat/Chat";
import { PageDeveloping } from "src/components/PageDeveloping/PageDeveloping";
import { FollowersPage } from "src/pages/FollowersPage";
import { FollowingsPage } from "src/pages/FollowingsPage";
import { UserBiIdPage } from "src/pages/UserBiIdPage";
import { Bookmarks } from "src/components/Bookmarks/Bookmarks";
import { NotificationsUser } from "src/components/NotificationsUser/NotificationsUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotfoundPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        index: true,
      },
      {
        path: "/user",
        element: <UserBiIdPage />,
      },
      {
        path: "/tweet",
        element: <TweetPage />,
      },

      {
        path: "/explore",
        element: <PageDeveloping />,
      },
      {
        path: "/notifications",
        element: <NotificationsUser />
      },
      {
        path: "/messages",
        element: <MessagesPage />,
      },
      {
        path: '/bookmarks',
        element: <Bookmarks/>
      },
      {
        path: "/twitter_blue",
        element: <PageDeveloping />,
      },
      {
        path: "/verified-orgs",
        element: <PageDeveloping />,
      },
      {
        path: "/profile",
        element: <UserPage />,
      },
      {
        path: "/modal/login",
        element: <LoginPage />,
      },
      {
        path: "/modal/registration",
        element: <RegistrationPage />,
      },
      {
        path: "/modal/tweet",
        element: <ModalTweetPage />,
      },
      {
        path: "/settings/profile",
        element: <EditProfileModal />,
      },
      {
        path: "/messages",
        element: <Chat />,
      },
      {
        path: "/topics",
        element: <PageDeveloping />,
      },
      {
        path: "/lists",
        element: <PageDeveloping />,
      },
      {
        path: "/members",
        element: <PageDeveloping />,
      },
      {
        path: "/analytics",
        element: <PageDeveloping />,
      },
      {
        path: "/professionals",
        element: <PageDeveloping />,
      },
      {
        path: "/ads",
        element: <PageDeveloping />,
      },
      {
        path: "/monetization",
        element: <PageDeveloping />,
      },
      {
        path: "/privacy",
        element: <PageDeveloping />,
      },
      {
        path: "/help",
        element: <PageDeveloping />,
      },
      {
        path: "/display",
        element: <PageDeveloping />,
      },
      {
        path: "/keyboard",
        element: <PageDeveloping />,
      },
      {
        path: "/search",
        element: <PageDeveloping />,
      },
      {
        path: "/page-developing",
        element: <PageDeveloping />,
      },
      {
        path: "/followers",
        element: <FollowersPage />,
      },
      {
        path: "/followings",
        element: <FollowingsPage />,
      },
    ],
  },
]);
