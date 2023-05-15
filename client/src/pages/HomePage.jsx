import { Box } from '@mui/material';
import MainPage_header from 'src/components/MainPage_header/MainPage_header';
import PostList from 'src/components/Post/PostList';
import TweetBox from 'src/components/TweetBox/TweetBox';

export const HomePage = () => {
  return (
    <Box
      sx={{
        border: '1px solid rgb(56, 68, 77)',
        borderTop: '0px',
      }}
    >
      <MainPage_header />
      <TweetBox />
      <PostList />
    </Box>
  );
};
