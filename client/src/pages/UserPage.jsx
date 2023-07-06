import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { User } from 'src/components/User/User';
import { LinkToEditProfile } from 'src/components/User/LinkToEditProfile';
import { getAuthorizationData } from 'src/redux/selectors/selectors';
import { getUserTweetsThunk } from 'src/redux/thunk/tweets/getUserTweets';
import { getUserReplise } from 'src/redux/thunk/getUserReplise';
import { resetUserReplise } from 'src/redux/reducers/userRepliseSlice';
import { resetUserTweets } from 'src/redux/reducers/getUserTweetsSlice';
import { resetUserLikes } from 'src/redux/reducers/userLikesSlice';
import { getUserLikes } from 'src/redux/thunk/getUserLikes';

export const UserPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(getAuthorizationData);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user) || '';

  const lincToFollowings = '/profile/followings';
  const lincToFollowers = '/profile/followers';
  const editProfile = <LinkToEditProfile />;
  const userId = user.id;
  // send user to home if not authorization
  useEffect(() => {
    dispatch(resetUserTweets());
    dispatch(resetUserReplise());
    dispatch(resetUserLikes());

    dispatch(getUserTweetsThunk({ idUser: user.id, page: 0, size: 10 }));
    dispatch(getUserReplise({ idUser: user.id, page: 0, size: 10 }));
    dispatch(getUserLikes({ page: 0, size: 10, id: user.id }));
  }, [dispatch, user]);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',

          direction: 'column',
        }}
      >
        <User
          idUser={user.id}
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
    </>
  );
};
