import React from 'react';
import { Box } from '@mui/material';
import TweetPost from 'src/UI/TweetPost';

function Post({ tweet }) {
  return (
    <Box>
      <TweetPost
        showIconList={false}
        id={tweet.id}
        displayName={tweet.user.fullName}
        text={tweet.body}
        username={tweet.user.userTag}
        logoUrl={tweet.user.avatarImgUrl}
        verified={tweet.user.isVerified}
        images={tweet.attachmentImages}
        likes={tweet.countLikes}
        reply={tweet.countReplays}
        retweet={tweet.countRetweets}
      />
    </Box>
  );
}

export default Post;