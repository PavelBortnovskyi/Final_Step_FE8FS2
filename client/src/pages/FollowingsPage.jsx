import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Followers } from 'src/components/Followers/Followers';
import { getFollowings } from 'src/redux/thunk/getFollowings';
import { getUserBiId } from 'src/redux/thunk/getUserBiId';

export const FollowingsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const following = useSelector((state) => state.followings.followings) || [];
  const name = useSelector((state) => state.userBiId.userId) || '';

  useEffect(() => {
    dispatch(getUserBiId(id));

    dispatch(getFollowings(id));
  }, [dispatch, id]);

  return (
    following.content && (
      <Box
        sx={{
          display: 'flex',
          direction: 'column',
        }}
      >
        <Followers
          follow={following.content}
          name={name.fullName}
          countTweets={name.countUserTweets}
        />
      </Box>
    )
  );
};
