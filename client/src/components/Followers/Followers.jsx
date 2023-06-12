import { Box } from '@mui/material';

import { UserHeder } from '../User/UserHeder';
import { FollowersList } from './FollowersList';
import { FollowTabs } from './FollowTabs';

export const Followers = ({ follow, name }) => {
  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Box>
        <UserHeder fullName={name} />
        <FollowTabs />
      </Box>
      <FollowersList follow={follow} />
    </Box>
  );
};
