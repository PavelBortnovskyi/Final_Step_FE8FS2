import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import TweetPost from 'src/UI/tweet/TweetPost';
import { getTweetReply } from 'src/redux/thunk/tweets/getTweetReply';
import { useDispatch, useSelector } from 'react-redux';
import { getTweetReplies } from 'src/redux/selectors/selectors';
import { useParams } from 'react-router-dom';

function CommentsList({ tweets }) {
  return (
    <Box>
      {/* {tweetArray !== false &&
        tweetArray.map((post) => {
          return (
            <TweetPost
              key={post.tweetId}
              id={post.tweetId}
              displayName={user.fullName}
              text={post.body}
              username={post.userTag}
              logoUrl={post.userAvatarImage}
              verified={user.isVerified}
              image={post.attachmentsImages[0]}
              likes={post.countLikes}
              reply={post.countReply}
              retweet={post.countRetweets}
            />
          );
        })} */}
    </Box>
  );
}

export default CommentsList;
