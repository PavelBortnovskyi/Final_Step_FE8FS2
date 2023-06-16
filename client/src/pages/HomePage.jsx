import { Box, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import MainPage_header from 'src/components/MainPage_header/MainPage_header';
import PostList from 'src/components/Post/PostList';
import TweetBox from 'src/components/TweetBox/TweetBox';
import { getAuthorizationData } from 'src/redux/selectors/selectors';

export const HomePage = () => {
  const [tab, setTab] = useState(0);
  const isScreenSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const { isAuthenticated } = useSelector(getAuthorizationData);
  const handleTab = (num) => {
    setTab(num);
  };

  return (
    <Box
      sx={{
        borderTop: '0px',
      }}
    >
      <MainPage_header handleTab={handleTab} />
      {!isScreenSmall && isAuthenticated ? <TweetBox /> : null}
      <PostList tab={tab} />
    </Box>
  );
};
