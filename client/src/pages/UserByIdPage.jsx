import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonSubscribe } from 'src/components/User/ButtonSubscribe';
import { User } from 'src/components/User/User';
import { getUserBiId } from 'src/redux/thunk/getUserBiId';
import { useParams } from 'react-router-dom';
import { LinkToEditProfile } from 'src/components/User/LinkToEditProfile';
import { useNavigate } from 'react-router-dom';
import { getAuthorizationData } from 'src/redux/selectors/selectors';
import { getUserTweetsThunk } from 'src/redux/thunk/tweets/getUserTweets';
import { getUserReplise } from 'src/redux/thunk/getUserReplise';
import { resetUserTweets } from 'src/redux/reducers/getUserTweetsSlice';
import { resetUserReplise } from 'src/redux/reducers/userRepliseSlice';
import { resetUserLikes } from 'src/redux/reducers/userLikesSlice';

export const UserBiIdPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(getAuthorizationData);

  const dispatch = useDispatch();

  const { id } = useParams();
  const user = useSelector((state) => state.userBiId.userId) || '';

  const profile = useSelector((state) => state.user.user) || '';

  let subscribe;

  if (user.id === profile.id) {
    subscribe = <LinkToEditProfile />;
  } else {
    subscribe = <ButtonSubscribe userId={user.id} />;
  }
  const userId = user.id;
  const lincToFollowings = `/${userId}/followings`;
  const lincToFollowers = `/${userId}/followers`;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(getUserBiId(id));
    dispatch(resetUserTweets());
    dispatch(resetUserReplise());
    dispatch(resetUserLikes());

    // dispatch(getUserTweetsThunk({ idUser: id, page: 0, size: 10 }));
    // dispatch(getUserReplise({ idUser: id, page: 0, size: 10 }));
  }, [id, dispatch]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',

          direction: 'column',
        }}
      >
        <User
          idUser={id}
          lincToFollowers={lincToFollowers}
          lincToFollowings={lincToFollowings}
          userButton={subscribe}
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
