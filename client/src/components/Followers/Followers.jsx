import { Box } from '@mui/material';

import { UserHeder } from '../User/UserHeder';
import { FollowersList } from './FpllowersList';
import { FollowTabs } from './FollowTabs';

export const Followers = ({ follow, name }) => {
  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Box
      // sx={{ borderBottom: '1px solid #38444d' }}
      >
        <UserHeder fullName={name} />
        <FollowTabs />
      </Box>
      <FollowersList follow={follow} />
    </Box>
  );
};
