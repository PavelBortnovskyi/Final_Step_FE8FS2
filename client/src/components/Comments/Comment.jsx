import { Avatar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Post from '../Post/Post';
import TweetPost from 'src/UI/TweetPost';

function Comment({
  displayName,
  username,
  verified,
  text,
  image,
  logoUrl,
  showIconList,
}) {
  return (
    <Box>
      <TweetPost
        displayName={displayName}
        logo={logoUrl}
        username={username}
        verified={verified}
        image={image}
        text={text}
        showIconList={showIconList}
      />
    </Box>
  );
}

export default Comment;
