import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { NoUserTweets } from 'src/UI/UserActions/NoUserTweets';
import { UserReplise } from 'src/components/Replise/UserReplise';

export const UserReplisePage = () => {
  const userReplise =
    useSelector((state) => state.userReplise.userReplise) || [];
  console.log(userReplise);
  const replise = userReplise;
  return (
    (replise.length === 0 && <NoUserTweets />) ||
    (replise && (
      <Box>
        <UserReplise replise={replise} />
      </Box>
    ))
  );
};
