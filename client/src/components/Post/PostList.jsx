import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Post from './Post';
import { useDispatch, useSelector } from 'react-redux';
import { getTweets } from 'src/redux/thunk/getTweets';
import { getUserTweetsThunk } from 'src/redux/thunk/getUserTweets';
import { getTweetById } from 'src/redux/thunk/getTweetById';
import {
  getFollowingTweets,
  getUserTweets,
  getTweetByID,
} from 'src/redux/selectors/selectors';

function PostList() {
  // const tweet = useSelector(getTweetByID);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user) || '';
  console.log(user);

  const userTweets = useSelector(getUserTweets);
  const userTweetsArray = userTweets ? userTweets.userTweets : false;

  console.log(userTweetsArray !== false ? userTweetsArray : '');

  //GET FOLLOWING TWEETS

  // useEffect(() => {
  //   dispatch(getTweets({ page: 0, pageSize: 5 }));
  // }, []);
  // const tweets = useSelector(getFollowingTweets);

  // GET SINGLE TWEET BY ID

  // useEffect(() => {
  //   dispatch(getTweetById(userId));
  // }, []);
  // const tweet = useSelector(getTweetByID);
  // console.log(tweet);

  //GET TWEETS BY ID

  useEffect(() => {
    if (user.id !== undefined && user.id !== '') {
      const userId = user.id;
      dispatch(getUserTweetsThunk({ userId, page: 0, pageSize: 18 }));
    }
  }, [user]);

  //GET ALL TWEETS

  return (
    <Box>
      {userTweetsArray !== false &&
        userTweetsArray.map((tweet) => {
          return (
            <Post
              key={tweet.tweetId}
              id={tweet.tweetId}
              displayName={user.fullName}
              text={tweet.body}
              username={tweet.userTag}
              logoUrl={tweet.userAvatarImage}
              verified={true}
              // image="https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1"
            />
          );
        })}
      <Post
        displayName="Artem Shevchuk"
        username="Jocellyn Flores"
        logoUrl="./img/avatar.JPG"
        verified={true}
        image="https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1"
      />
      <Post
        displayName="Artem Shevchuk"
        username="Jocellyn Flores"
        logoUrl="./img/avatar.JPG"
        verified={true}
        image="https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1"
      />
      <Post
        displayName="Artem Shevchuk"
        username="Jocellyn Flores"
        logoUrl="./img/avatar.JPG"
        verified={true}
        image="https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1"
      />
      <Post
        displayName="Artem Shevchuk"
        username="Jocellyn Flores"
        logoUrl="./img/avatar.JPG"
        verified={true}
        image="https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1"
      />
      <Post
        displayName="Artem Shevchuk"
        username="Jocellyn Flores"
        logoUrl="./img/avatar.JPG"
        verified={true}
        image="https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1"
      />
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
