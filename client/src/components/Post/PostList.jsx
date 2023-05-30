import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import Post from './Post';
import { useDispatch, useSelector } from 'react-redux';
import { getTweets } from 'src/redux/thunk/getTweets';
import { getUserTweets } from 'src/redux/thunk/getUserTweets';
import { getTweetById } from 'src/redux/thunk/getTweetById';
import {
  getFollowingTweets,
  getTweetByID,
} from 'src/redux/selectors/selectors';

function PostList() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.id);
  console.log(userId);
  useEffect(() => {
    dispatch(getTweets({ page: 0, pageSize: 5 }));
  }, []);
  // const tweets = useSelector(getFollowingTweets);

  // useEffect(() => {
  //   dispatch(getTweetById(userId));
  // }, []);
  // const tweet = useSelector(getTweetByID);
  // console.log(tweet);

  // useEffect(() => {
  //   dispatch(getTweetById(userId));
  // }, []);
  // const tweet = useSelector(getTweetByID);
  // console.log(tweet);

  useEffect(() => {
    dispatch(getUserTweets({ userId: 1, page: 0, pageSize: 1 }));
  }, []);
  const tweet = useSelector(getTweetByID);
  console.log(tweet);

  return (
    <Box>
      <Post
        displayName="Artem Shevchuk"
        username="Jocellyn Flores"
        logoUrl="./img/avatar.JPG"
        verified={true}
        image="https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1"
      />
    </Box>
  );
}

export default PostList;
