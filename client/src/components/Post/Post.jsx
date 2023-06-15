import React from 'react';
import { Box } from '@mui/material';
import TweetPost from 'src/UI/TweetPost';
import { useSelector } from 'react-redux';

function Post({ tweet }) {
  const user = useSelector((state) => state.user.user) || '';
  return (
    <Box>
      <TweetPost
        showIconList={true}
        id={tweet.tweetId}
        displayName={user.fullName}
        text={tweet.body}
        username={tweet.userTag}
        logoUrl={tweet.userAvatarImage}
        verified={user.isVerified}
        image={tweet.attachmentsImages[0]}
        likes={tweet.countLikes}
        reply={tweet.countReply}
        retweet={tweet.countRetweets}
      />
    </Box>
  );
}

export default Post;
