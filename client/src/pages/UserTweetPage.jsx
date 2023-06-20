// UserTweetPage

import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TweetList from 'src/UI/TweetList';
import { Followers } from 'src/components/Followers/Followers';
import { NotificationsReplying } from 'src/components/NotificationsUser/NotificationsReplying';
import { getFollowers } from 'src/redux/thunk/getFollowers';
import { getUserBiId } from 'src/redux/thunk/getUserBiId';
import { getUserReplise } from 'src/redux/thunk/getUserReplise';
import { getUserTweetsThunk } from 'src/redux/thunk/tweets/getUserTweets';

export const UserTweetPage = ({ idUser }) => {
  const { id } = useParams();
  const user = idUser ? idUser : id;
  // console.log(user);
  const dispatch = useDispatch();
  const userTweets = useSelector((state) => state.userTweets.userTweets) || [];
  const tweets = userTweets.content;
  // console.log(userReplise);
  // const name = useSelector((state) => state.userBiId.userId.fullName) || '';
  useEffect(() => {
    dispatch(getUserTweetsThunk({ userId: user, page: 0, pageSize: 100 }));
  }, [user, dispatch]);

  return (
    // tweets &&
    // tweets.map((tweet) => {
    userTweets && (
      <Box>
        <TweetList tweets={userTweets} />
      </Box>
    )
    // })
  );
};
