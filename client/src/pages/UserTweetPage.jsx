import { Box } from '@mui/material';

import { useSelector } from 'react-redux';

import { UserAllTypeTweets } from 'src/components/User/UserAllTypeTweets/UserAllTypeTweets';

export const UserTweetPage = ({ idUser }) => {
  const userTweets = useSelector((state) => state.userTweets.userTweets) || [];

  return (
    userTweets && (
      <Box>
        {/* <TweetList tweets={userTweets} /> */}
        <UserAllTypeTweets tweets={userTweets} />
      </Box>
    )
  );
};
