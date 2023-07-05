import { Box } from '@mui/material';
import React from 'react';
import PostIconList from 'src/components/Post/PostIconGroup/PostIconList';
import { useMode } from 'src/styles/_materialTheme';
import TweetPost from './tweet/TweetPost';
import { useSelector } from 'react-redux';

export const TweetList = ({ tweets }) => {
  const tweet = tweets || tweets.tweet;
  const theme = useMode();
  const isLiking = useSelector((state) => state.likedTweet.isLoading);
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
              <TweetPost tweet={tweet} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                my: '10px',
              }}
            >
              <PostIconList
                isLiking={isLiking}
                isLiked={tweet.currUserLiked}
                isQuoted={tweet.currUserQuoted}
                isComment={tweet.currUserCommented}
                isRetweet={tweet.currUserRetweeted}
                likes={tweet.countLikes}
                reply={tweet.countReplies}
                retweet={tweet.countRetweets}
                id={tweet.id}
                quote={tweet.countQuoteTweets}
                isBookmarks={tweet.currUserBookmarked}
                bookmarks={tweet.countBookmarks}
              />
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default TweetList;
