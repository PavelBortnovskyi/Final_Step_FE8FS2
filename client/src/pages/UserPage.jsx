import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { LinkToEditProfile } from 'src/components/User/LinkToEditProfile';
import { User } from 'src/components/User/User';

import PostList from 'src/components/Post/PostList';

export const UserPage = () => {
  const user = useSelector((state) => state.user.user) || '';
  const lincToFollowings = '/profile/followings';
  const lincToFollowers = '/profile/followers';
  const editProfile = <LinkToEditProfile />;

  return (
    <>
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
      <PostList />
    </>
  );
};
