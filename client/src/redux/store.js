import { configureStore } from "@reduxjs/toolkit";
import auth from "src/redux/reducers/authSlice";
import settingsTheme from "src/redux/reducers/themeSlice";
import user from "src/redux/reducers/userSlice";
import tweets from "src/redux/reducers/getTweetSlice";
import tweet from "src/redux/reducers/getTweetByIdSlice";
import userTweets from "src/redux/reducers/getUserTweetsSlice";
import chat from "src/redux/reducers/chatSlice";
import followers from "src/redux/reducers/followersSlice";
import followings from "src/redux/reducers/followingsSlice";
export const store = configureStore({
  reducer: {
    auth,
    settingsTheme,
    user,
    tweets,
    tweet,
    userTweets,
    chat,
    followers,
    followings,
  },
});
