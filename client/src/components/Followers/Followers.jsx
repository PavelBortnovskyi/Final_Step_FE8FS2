import { Box } from '@mui/material';

import { UserHeder } from '../User/UserHeder';
import { FollowersList } from './FollowersList';
import { FollowTabs } from './FollowTabs';

export const Followers = ({ follow, name, countTweets }) => {
  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Box>
        <UserHeder fullName={name} tweetsCounter={countTweets} />
        <FollowTabs />
      </Box>
      <FollowersList follow={follow} />
    </Box>
  );
};
