import { Box } from '@mui/material';
import { useState } from 'react';
import MainPage_header from 'src/components/MainPage_header/MainPage_header';
import PostList from 'src/components/Post/PostList';
import TweetBox from 'src/components/TweetBox/TweetBox';

export const HomePage = () => {
  const [tab, setTab] = useState(0);

  const handleTab = (num) => {
    setTab(num);
    // console.log('tab in homePage', tab);
  };

  return (
    <Box
      sx={{
        borderTop: '0px',
      }}
    >
      <MainPage_header handleTab={handleTab} />
      <TweetBox />
      <PostList tab={tab} />
    </Box>
  );
};
