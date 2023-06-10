import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Followers } from 'src/components/Followers/Followers';
import { getFollowers } from 'src/redux/thunk/getFollowers';
import { getUserBiId } from 'src/redux/thunk/getUserBiId';

export const FollowersPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const follower = useSelector((state) => state.followers.followers) || [];
  const name = useSelector((state) => state.userBiId.userId.fullName) || '';
  // console.log(id);
  useEffect(() => {
    // if (follower.length === 0) {
    dispatch(getUserBiId(id));
    dispatch(getFollowers(id));
    // return;
    // }
  }, [follower.length]);

  return (
    follower.content && (
      <Box
        sx={{
          display: 'flex',
          direction: 'column',
        }}
      >
        <Followers follow={follower.content} name={name} />
      </Box>
    )
  );
};
