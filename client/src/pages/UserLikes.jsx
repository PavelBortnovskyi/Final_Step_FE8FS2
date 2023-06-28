// UserLikes

import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import PostIconList from 'src/components/Post/PostIconGroup/PostIconList';
import TweetPost from 'src/UI/tweet/TweetPost';

export const UserLikes = () => {
  const userLikes = useSelector((state) => state.userLikes.userLikes) || [];

  const likes = userLikes;
  return (
    likes &&
    likes.map((like) => {
      return (
        <Box key={like.id}>
          <TweetPost tweet={like.tweet} />
          <Box display={'flex'} justifyContent={'center'}>
            <PostIconList
              likes={like.tweet.countLikes}
              reply={like.tweet.countReply}
              retweet={like.tweet.countRetweets}
              id={like.tweet.id}
              isLiked={like.tweet.currUserLiked}
              isRetweet={like.tweet.countRetweets}
              isComment={like.tweet.countReplays}
              isBookmark={like.tweet.countBookmarks}
            />
          </Box>
        </Box>
      );
    })
  );
};
