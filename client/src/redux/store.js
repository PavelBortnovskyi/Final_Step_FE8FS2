import { configureStore } from '@reduxjs/toolkit';
import auth from 'src/redux/reducers/authSlice';
import settingsTheme from 'src/redux/reducers/themeSlice';
import user from 'src/redux/reducers/userSlice';
import tweets from 'src/redux/reducers/getTweetSlice';
import singleTweet from 'src/redux/reducers/getTweetByIdSlice';
import userTweets from 'src/redux/reducers/getUserTweetsSlice';
import chat from 'src/redux/reducers/chatSlice';
import messages from 'src/redux/reducers/messagesSlice';
import followers from 'src/redux/reducers/followersSlice';
import followings from 'src/redux/reducers/followingsSlice';
import userBiId from 'src/redux/reducers/userBiIdSlice';
import userBookmarks from 'src/redux/reducers/bookmarksSlise'
import tweetReplies from 'src/redux/reducers/getTweetReplySlice';
import likedTweet from 'src/redux/reducers/likedTweetSlice';
import userNotifications from 'src/redux/reducers/getNotificationsSlice';
import allTweets from 'src/redux/reducers/getAllTweetsSlicer';
import subscriptionsTweets from 'src/redux/reducers/subscriptionsTweetsSlicer';
import userLikes from 'src/redux/reducers/userLikesSlice';
import userReplise from 'src/redux/reducers/userRepliseSlice';


const rootReducer = {
  auth,
  settingsTheme,
  user,
  tweets,
  singleTweet,
  userTweets,
  tweetReplies,
  likedTweet,
  chat,
  messages,
  followers,
  followings,
  userBiId,
  userBookmarks,
  userNotifications,
  allTweets,
  subscriptionsTweets,
  userLikes,
  userReplise,
  
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Відключення перевірки на серіалізованість
    }),
});
