import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonSubscribe } from 'src/components/User/ButtonSubscribe';
import { User } from 'src/components/User/User';
import { getUserBiId } from 'src/redux/thunk/getUserBiId';
import { useParams } from 'react-router-dom';
import { LinkToEditProfile } from 'src/components/User/LinkToEditProfile';

export const UserBiIdPage = () => {
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

  const lincToFollowings = `/${user.id}/followings`;
  const lincToFollowers = `/${user.id}/followers`;

  const userId = user.id;

  useEffect(() => {
    dispatch(getUserBiId(id));
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
