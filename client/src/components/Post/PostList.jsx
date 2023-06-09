import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Post from './Post';
import { useDispatch, useSelector } from 'react-redux';
import { getTweets } from 'src/redux/thunk/getTweets';
import { getUserTweetsThunk } from 'src/redux/thunk/getUserTweets';
import {
  getFollowingTweets,
  getUserTweets,
} from 'src/redux/selectors/selectors';
import { Link } from 'react-router-dom';

function PostList() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user) || '';

  const userTweets = useSelector(getUserTweets);
  const userTweetsArray = userTweets.userTweets || [];

  useEffect(() => {
    if (user.id !== undefined && user.id !== '') {
      const userId = user.id;
      dispatch(getUserTweetsThunk({ userId, page: 0, pageSize: 10 }));
    }
  }, [user]);

  //GET ALL TWEETS

  return (
    <Box>
      {userTweetsArray !== false &&
        userTweetsArray.map((tweet) => (
          <Link to={`/tweet/${tweet.tweetId}`} key={tweet.tweetId}>
            <Post tweet={tweet} />
          </Link>
        ))}
    </Box>
  );
}

export default PostList;
