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
      const likedTweet = like.tweet;
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
              isLiked={likedTweet.currUserLiked}
              isQuoted={likedTweet.currUserQuoted}
              isComment={likedTweet.currUserCommented}
              isRetweet={likedTweet.currUserRetweeted}
              likes={
                likedTweet.attachmentImages === undefined
                  ? likedTweet.countLikes
                  : likedTweet.countLikes
              }
              reply={
                likedTweet.attachmentImages === undefined
                  ? likedTweet.countReplies
                  : likedTweet.countReplies
              }
              retweet={
                likedTweet.attachmentImages === undefined
                  ? likedTweet.countRetweets
                  : likedTweet.countRetweets
              }
              id={like.attachmentImages === undefined ? like.tweet.id : like.id}
              quote={
                likedTweet.attachmentImages === undefined
                  ? likedTweet.countQuoteTweets
                  : likedTweet.countQuoteTweets
              }
              isBookmarks={
                likedTweet.attachmentImages === undefined
                  ? likedTweet.currUserBookmarked
                  : likedTweet.currUserBookmarked
              }
              bookmarks={
                likedTweet.attachmentImages === undefined
                  ? likedTweet.countBookmarks
                  : likedTweet.countBookmarks
              }
            />
          </Box>
        </Box>
      );
    })
  );
};
