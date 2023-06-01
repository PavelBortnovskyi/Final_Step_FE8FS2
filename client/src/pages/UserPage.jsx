import { Box } from '@mui/material';
import { User } from 'src/components/User/User';

export const UserPage = () => {
  return (
    <Box  sx={{
      display: 'flex',
      // display: { xs: 'flex', md: 'block'}, приклад брейкпоінтів
      // gap-5 flex-col flex-auto
      direction: "column",
    }}>
      <User />
    </Box>
      
    // </div>
  );
};
