import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { UserReplise } from 'src/components/Replise/UserReplise';

export const UserReplisePage = () => {
  const userReplise =
    useSelector((state) => state.userReplise.userReplise) || [];
  const replise = userReplise;
  return (
    replise && (
      <Box>
        <UserReplise replise={replise} />
      </Box>
    )
  );
};
