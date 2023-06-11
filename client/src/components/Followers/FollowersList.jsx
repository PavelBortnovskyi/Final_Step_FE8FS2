import { Box } from '@mui/material';

import { UserPageAvatar } from '../User/UserPageAvatar';
import { UserName } from '../User/UserName';
import { UserNick } from '../User/UserNIck';
import { UserBio } from '../User/UserBio';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserBiId } from 'src/redux/thunk/getUserBiId';
import { useMode } from 'src/styles/_materialTheme';

export const FollowersList = ({ follow }) => {
  const dispatch = useDispatch();
  const theme = useMode();
  return follow.map((follower) => {
    const follwId = follower.id;
    return (
      <Link
        key={follower.id}
        to={`/user/${follwId}`}
        onClick={() => {
          dispatch(getUserBiId(follwId));
        }}
      >
        <Box
          sx={{
            paddingTop: '8px',
            paddingBottom: '8px',
            display: 'flex',
            gap: '24px',

            width: '100%',
            color: `${theme.palette.text.primary}`,

            '&:hover': {
              backgroundColor: `${theme.palette.background.hover}`,
              cursor: 'pointer',
            },
          }}
        >
          <UserPageAvatar
            w={'50'}
            h={'50'}
            mt={'20'}
            userAvatar={follower.avatarImgUrl}
          />

          <Box>
            <UserName fullName={follower.fullName} />
            <UserNick userTag={follower.userTag} />
            <UserBio userBio={follower.bio} />
          </Box>
        </Box>
      </Link>
    );
  });
};
