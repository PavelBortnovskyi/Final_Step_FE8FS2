import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import PostIconList from 'src/components/Post/PostIconGroup/PostIconList';
import TweetPost from 'src/UI/tweet/TweetPost';

export const UserLikes = () => {
  const userLikes = useSelector((state) => state.userLikes.userLikes) || [];
  const theme = useTheme();
  const newArr = [];

  const changedArray = (arr) => {
    arr.map((obj) => {
      if (obj.tweet) {
        newArr.push(obj.tweet);
      } else {
        newArr.push(obj);
      }
    });
  };
  changedArray(userLikes);

  return (
    newArr &&
    newArr.map((likedTweet) => {
      return (
        <Box
          key={likedTweet.id}
          sx={{
            mb: '20px',
            '&:hover': {
              backgroundColor: ` ${theme.palette.background.hover}`,
              cursor: 'pointer',
            },
          }}
        >
          <TweetPost tweet={likedTweet} />

          <Box display={'flex'} justifyContent={'center'} sx={{ my: '10px' }}>
            <PostIconList
              isLiked={likedTweet.currUserLiked}
              isQuoted={likedTweet.currUserQuoted}
              isComment={likedTweet.currUserCommented}
              isRetweet={likedTweet.currUserRetweeted}
              likes={likedTweet.countLikes}
              reply={likedTweet.countReplies}
              retweet={likedTweet.countRetweets}
              id={likedTweet.id}
              quote={likedTweet.countQuoteTweets}
              isBookmarks={likedTweet.currUserBookmarked}
              bookmarks={likedTweet.countBookmarks}
            />
          </Box>
        </Box>
      );
    })
  );
};
