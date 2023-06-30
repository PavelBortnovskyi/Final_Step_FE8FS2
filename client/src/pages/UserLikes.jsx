// UserLikes

import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import PostIconList from 'src/components/Post/PostIconGroup/PostIconList';
import TweetPost from 'src/UI/tweet/TweetPost';

export const UserLikes = () => {
  const userLikes = useSelector((state) => state.userLikes.userLikes) || [];
  const theme = useTheme();
  const likes = userLikes;
  return (
    likes &&
    likes.map((like) => {
      return (
        <Box
          key={like.id}
          sx={{
            mb: '20px',
            '&:hover': {
              backgroundColor: ` ${theme.palette.background.hover}`,
              cursor: 'pointer',
            },
          }}
        >
          <TweetPost tweet={like.tweet} />
          <Box display={'flex'} justifyContent={'center'} sx={{ my: '10px' }}>
            <PostIconList
              isLiked={like.tweet.currUserLiked}
              isQuoted={like.tweet.currUserQuoted}
              isComment={like.tweet.currUserCommented}
              isRetweet={like.tweet.currUserRetweeted}
              likes={
                like.tweet.attachmentImages === undefined
                  ? like.tweet.countLikes
                  : like.tweet.countLikes
              }
              reply={
                like.tweet.attachmentImages === undefined
                  ? like.tweet.countReplies
                  : like.tweet.countReplies
              }
              retweet={
                like.tweet.attachmentImages === undefined
                  ? like.tweet.countRetweets
                  : like.tweet.countRetweets
              }
              id={like.attachmentImages === undefined ? like.tweet.id : like.id}
              quote={
                like.tweet.attachmentImages === undefined
                  ? like.tweet.countQuoteTweets
                  : like.tweet.countQuoteTweets
              }
              isBookmarks={
                like.tweet.attachmentImages === undefined
                  ? like.tweet.currUserBookmarked
                  : like.tweet.currUserBookmarked
              }
              bookmarks={
                like.tweet.attachmentImages === undefined
                  ? like.tweet.countBookmarks
                  : like.tweet.countBookmarks
              }
            />
          </Box>
        </Box>
      );
    })
  );
};
