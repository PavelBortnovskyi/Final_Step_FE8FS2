import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { User } from 'src/components/User/User';
import { LinkToEditProfile } from 'src/components/User/LinkToEditProfile';
import { getFollowers } from 'src/redux/thunk/getFollowers';
import { getFollowings } from 'src/redux/thunk/getFollowings';
import { getAuthorizationData } from 'src/redux/selectors/selectors';

export const UserPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(getAuthorizationData);

  const profile = 'profile';
  const user = useSelector((state) => state.user.user) || '';
  const dispatch = useDispatch();
  const lincToFollowings = '/followings';
  const lincToFollowers = '/followers';
  const editProfile = <LinkToEditProfile />;

  // send user to home if not authorization
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // if (following.length === 0) {
    dispatch(getFollowings(profile));
    //   return;
    // }
  }, [dispatch]);

  useEffect(() => {
    // if (follower.length === 0) {
    dispatch(getFollowers(profile));
    // return;
    // }
  }, [dispatch]);
  return (
    <Box
      sx={{
        display: 'flex',
        direction: 'column',
      }}
    >
      <User
        userButton={editProfile}
        lincToFollowers={lincToFollowers}
        lincToFollowings={lincToFollowings}
        fullName={user.fullName}
        tweetsCounter={user.countUserTweets}
        hederImg={user.headerImgUrl}
        userAvatar={user.avatarImgUrl}
        userTag={user.userTag}
        userBio={user.bio}
        userLocation={user.location}
        createdAt={user.createdAt}
        countUserFollowings={user.countUserFollowings}
        countUserFollowers={user.countUserFollowers}
      />
    </Box>
  );
};
