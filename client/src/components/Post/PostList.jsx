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

function PostList({ id }) {
  // const tweet = useSelector(getTweetByID);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.user) || '';
  const user = id || profile;
  // console.log(user);

  const userTweets = useSelector(getUserTweets);
  const userTweetsArray = userTweets.userTweets || [];

  // console.log(userTweetsArray !== false ? userTweetsArray : "");

  //GET FOLLOWING TWEETS

  // useEffect(() => {
  //   dispatch(getTweets({ page: 0, pageSize: 5 }));
  // }, []);
  // const tweets = useSelector(getFollowingTweets);

  //GET TWEETS BY ID

  useEffect(() => {
    if (Number(user)) {
      dispatch(getUserTweetsThunk({ userId: user, page: 0, pageSize: 100 }));
    }
    if (user.id !== undefined && user.id !== '') {
      const idUser = user.id;
      // console.log(userId);
      dispatch(getUserTweetsThunk({ userId: idUser, page: 0, pageSize: 100 }));
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
