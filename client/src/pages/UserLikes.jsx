// UserLikes

import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostIconList from 'src/components/Post/PostIconGroup/PostIconList';
import { getUserLikes } from 'src/redux/thunk/getUserLikes';

import { useMode } from 'src/styles/_materialTheme';
import TweetPost from 'src/UI/tweet/TweetPost';
import TweetList from 'src/UI/TweetList';

export const UserLikes = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const userId = id;
  useEffect(() => {
    dispatch(getUserLikes(userId));
  }, [dispatch, userId]);
  const userLikes = useSelector((state) => state.userLikes.userLikes) || [];

  const likes = userLikes.content;
  const theme = useMode();
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
