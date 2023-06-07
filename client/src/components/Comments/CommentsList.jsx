import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import TweetPost from 'src/UI/TweetPost';
import { getTweetsFollowing } from 'src/redux/thunk/getTweets.js';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowingTweets } from 'src/redux/selectors/selectors';

function CommentsList() {
  const user = useSelector((state) => state.user.user) || '';
  const dispatch = useDispatch();

  //GET FOLLOWING TWEETS
  useEffect(() => {
    dispatch(getTweetsFollowing({ page: 0, pageSize: 5 }));
  }, [user.id]);
  const tweets = useSelector(getFollowingTweets);
  const tweetArray = tweets.tweets;
  return (
    <Box>
      {tweetArray !== false &&
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
        })}
    </Box>
  );
}

export default CommentsList;
