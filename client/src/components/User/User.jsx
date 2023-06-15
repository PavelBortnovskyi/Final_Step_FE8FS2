import { Box } from '@mui/material';
import { UserAction } from './UserAction';
import { UserHeder } from './UserHeder';
import { UserInfo } from './UserInfo';
import PostList from '../Post/PostList';

export const User = ({
  userButton,
  lincToFollowers,
  lincToFollowings,
  fullName,
  tweetsCounter,
  hederImg,
  userAvatar,
  userTag,
  userBio,
  userLocation,
  createdAt,
  countUserFollowings,
  countUserFollowers,
}) => {
  return (
    <Box
      sx={{
        borderBottom: '1px solid #38444d',

        width: '100vw',
      }}
    >
      <UserHeder fullName={fullName} tweetsCounter={tweetsCounter} />
      <UserInfo
        userButton={userButton}
        lincToFollowers={lincToFollowers}
        lincToFollowings={lincToFollowings}
        hederImg={hederImg}
        userAvatar={userAvatar}
        fullName={fullName}
        userTag={userTag}
        userBio={userBio}
        userLocation={userLocation}
        createdAt={createdAt}
        countUserFollowings={countUserFollowings}
        countUserFollowers={countUserFollowers}
      />
      <UserAction />
      <PostList />
    </Box>
  );
};
