import { Box } from '@mui/material';
import React from 'react';
import PostIconList from 'src/components/Post/PostIconGroup/PostIconList';
import { useMode } from 'src/styles/_materialTheme';
import TweetPost from './tweet/TweetPost';

export const TweetList = ({ tweets }) => {
  const theme = useMode();

  return (
    <Box sx={{ pb: '60px' }}>
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
                isQuoted={tweet.currUserQuoted}
                // isBookmarks={tweet.currUserBookmarked}
                isComment={tweet.currUserCommented}
                isRetweet={tweet.currUserRetweeted}
                likes={
                  tweet.attachmentImages === undefined
                    ? tweet.tweet.countLikes
                    : tweet.countLikes
                }
                reply={
                  tweet.attachmentImages === undefined
                    ? tweet.tweet.countReplies
                    : tweet.countReplies
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
                quote={
                  tweet.attachmentImages === undefined
                    ? tweet.tweet.countQuoteTweets
                    : tweet.countQuoteTweets
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
