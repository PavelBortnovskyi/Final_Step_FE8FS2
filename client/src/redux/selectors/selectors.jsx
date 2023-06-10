// user-owner Authorization
export const getAuthorizationData = (state) => state.auth;

// MUI Theme
export const getTheme = (state) => state.settingsTheme;

// user-owner data
export const getUserData = (state) => state.user;

// following tweets
export const getFollowingTweets = (state) => state.tweets;

//Single tweet with ID
export const getTweetByID = (state) => state.singleTweet;

//Tweet replies (comments)
export const getTweetReplies = (state) => state.getTweetReplies;

//get user tweets
export const getUserTweets = (state) => state.userTweets;

// get guest for chat
export const getGuestChat = (state) => state.chat;

// get followers
export const getFollowers = (state) => state.followers;

// get followings
export const getFollowings = (state) => state.followings;

// get user bi id
export const getUserBiId = (state) => state.userBiId;
