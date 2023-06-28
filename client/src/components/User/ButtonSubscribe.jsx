import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowings } from 'src/redux/thunk/getFollowings';
import { subscribeUser } from 'src/redux/thunk/subscribeUser';
import { unsubscribeUser } from 'src/redux/thunk/unsubscribeUser';

export const ButtonSubscribe = ({ userId }) => {
  const dispatch = useDispatch();
  const { followings } = useSelector((state) => state.followings);
  const compairUser =
    followings.content && followings.content.some((item) => item.id === userId);

  useEffect(() => {
    dispatch(getFollowings('profile'));
  }, [dispatch]);

  const handleClick = () => {
    if (!compairUser) {
      dispatch(subscribeUser(userId));
    } else if (compairUser) {
      dispatch(unsubscribeUser(userId));
    }
  };

  return (
    <Box onClick={handleClick}>
      <Typography>{compairUser ? 'Unfollow' : 'Follow'}</Typography>
    </Box>
  );
};

