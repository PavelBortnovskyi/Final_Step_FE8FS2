// UserLikes

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserLikes } from 'src/redux/thunk/getUserLikes';

import { useMode } from 'src/styles/_materialTheme';
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

  return likes && <TweetList tweets={likes} />;
};
