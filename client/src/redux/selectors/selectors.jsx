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
export const getTweetReplies = (state) => state.tweetReplies;

//get user tweets
export const getUserTweets = (state) => state.userTweets;

// get chats data
export const getChats = (state) => state.chat;

// get chats data
export const getMessages = (state) => state.messages;

//get all tweets
export const getAllTweets = (state) => state.allTweets;

//get all tweets from the current user's subscriptions
export const subscriptionsTweets = (state) => state.subscriptionsTweets;

//get single liked tweet
export const getLikedTweet = (state) => state.likedTweet;

// get followers
export const getFollowers = (state) => state.followers;

// get followings
export const getFollowings = (state) => state.followings;

// get user bi id
export const getUserBiId = (state) => state.userBiId;

//get user likes
export const getUserLikes = (state) => state.userLikes;

//get user replise
export const getUserReplise = (state) => state.userReplise;
