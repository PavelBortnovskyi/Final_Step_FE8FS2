import React from 'react';
import { Box } from '@mui/material';
import TweetPost from 'src/UI/TweetPost';

function Post({
  displayName,
  username,
  verified,
  text,
  image,
  logoUrl,
  likes,
  reply,
  retweet,
  showIconList,
}) {
  return (
    <Box>
      <TweetPost
        displayName={displayName}
        username={username}
        verified={verified}
        text={text}
        image={image}
        logoUrl={logoUrl}
        showIconList={true}
        likes={likes}
        reply={reply}
        retweet={retweet}
      />
    </Box>
  );
}

export default Post;
