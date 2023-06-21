import { Avatar, Box } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Post from 'src/components/Post/Post';
import PostIconList from 'src/components/Post/PostIconGroup/PostIconList';
import { getUserBiId } from 'src/redux/thunk/getUserBiId';
import { useMode } from 'src/styles/_materialTheme';
import TweetPost from './tweet/TweetPost';

export const TweetList = ({ tweets }) => {
  const dispatch = useDispatch();
  const theme = useMode();
  return (
    <Box>
      {tweets !== false &&
        tweets.map((tweet) => (
          <Box
            key={tweet.id}
            sx={{
              borderBottom: `1px solid ${theme.palette.border.main}`,
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: ` ${theme.palette.background.hover}`,
                cursor: 'pointer',
              },
            }}
          >
            <Box>
              <TweetPost
                tweet={
                  tweet.attachmentImages === undefined ? tweet.tweet : tweet
                }
              />
            </Box>
            <Box
              sx={{
                width: '90%',
                ml: '65px',
                pr: '10px',
                my: '10px',
              }}
            >
              <PostIconList
                isLiked={tweet.currUserLiked}
                likes={
                  tweet.attachmentImages === undefined
                    ? tweet.tweet.countLikes
                    : tweet.countLikes
                }
                reply={
                  tweet.attachmentImages === undefined
                    ? tweet.tweet.countReply
                    : tweet.countReply
                }
                retweet={
                  tweet.attachmentImages === undefined
                    ? tweet.tweet.countRetweets
                    : tweet.countRetweets
                }
                id={
                  tweet.attachmentImages === undefined
                    ? tweet.tweet.id
                    : tweet.id
                }
                isBookmarks={
                  tweet.attachmentImages === undefined
                    ? tweet.tweet.currUserBookmarked
                    : tweet.currUserBookmarked
                }
                bookmarks={
                  tweet.attachmentImages === undefined
                    ? tweet.tweet.countBookmarks
                    : tweet.countBookmarks
                }
              />
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default TweetList;
