// user-owner Authorization
export const getAuthorizationData = (state) => state.auth;

// MUI Theme
export const getTheme = (state) => state.settingsTheme;

// user-owner data
export const getUserData = (state) => state.user;

// following tweets
export const getFollowingTweets = (state) => state.tweets;

// get guest for chat
export const getGuestChat = (state) => state.chat;
