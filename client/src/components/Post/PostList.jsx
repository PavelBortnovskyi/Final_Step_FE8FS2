import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Post from './Post';
import { useDispatch, useSelector } from 'react-redux';
import { getUserTweetsThunk } from 'src/redux/thunk/tweets/getUserTweets';
import { getAllTweets, getUserTweets } from 'src/redux/selectors/selectors';
import { Link } from 'react-router-dom';
import PostIconList from './PostIconGroup/PostIconList';
import { useMode } from 'src/styles/_materialTheme';

function PostList({ id, tab }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.user) || '';
  const user = id || profile;
  const userTweets = useSelector(getUserTweets);
  const userTweetsArray = userTweets.userTweets || [];

  useEffect(() => {
    if (Number(user)) {
      dispatch(getUserTweetsThunk({ userId: user, page: 0, pageSize: 100 }));
    }
    if (user.id !== undefined && user.id !== '') {
      const idUser = user.id;
      dispatch(getUserTweetsThunk({ userId: idUser, page: 0, pageSize: 100 }));
    }
  }, [user]);

  const theme = useMode();
  return (
    <Box sx={{}}>
      {userTweetsArray !== false &&
        userTweetsArray.map((tweet) => (
          <Box
            key={tweet.id}
            sx={{
              borderBottom: `1px solid ${theme.palette.border.main}`,
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: `${theme.palette.background.hover}`,
                cursor: 'pointer',
              },
            }}
          >
            <Link to={`/tweet/${tweet.id}`}>
              <Post tweet={tweet} />
            </Link>
            <Box
              sx={{
                width: '90%',
                ml: '65px',
                pr: '10px',
                my: '10px',
              }}
            >
              <PostIconList
                likes={tweet.countLikes}
                reply={tweet.countReply}
                retweet={tweet.countRetweets}
                id={tweet.id}
                isLiked={tweet.currUserLiked}
                isRetweet={tweet.countRetweets}
                isComment={tweet.countReplays}
              />
            </Box>
          </Box>
        ))}
    </Box>
  );
}

export default PostList;
