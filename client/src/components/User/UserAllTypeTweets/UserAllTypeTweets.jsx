//UserAllTypeTweets

import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TweetList from 'src/UI/TweetList';
import TweetPost from 'src/UI/tweet/TweetPost';
import PostIconList from 'src/components/Post/PostIconGroup/PostIconList';
import { QuoteTweet } from 'src/components/Replise/QuoteTweet';
import { useMode } from 'src/styles/_materialTheme';

import { getUserTweetsThunk } from 'src/redux/thunk/tweets/getUserTweets';

export const UserAllTypeTweets = ({ tweets }) => {
  const theme = useMode();

  function parentRetweet(userTweet) {
    if (userTweet.parentTweet !== null) {
      return parentRetweet(userTweet.parentTweet);
    } else if (userTweet.parentTweet === null) {
      return (
        <Box
          borderBottom={`1px solid ${theme.palette.border.main}`}
          paddingBottom={'8px'}
        >
          retweet
          <TweetPost tweet={userTweet} />
          <Box display={'flex'} justifyContent={'center'}>
            <PostIconList
              likes={userTweet.countLikes}
              reply={userTweet.countReply}
              retweet={userTweet.countRetweets}
              id={userTweet.id}
              isLiked={userTweet.currUserLiked}
              isRetweet={userTweet.countRetweets}
              isComment={userTweet.countReplays}
              isBookmark={userTweet.countBookmarks}
            />
          </Box>
        </Box>
      );
    }
  }

  function showUserTweets(userTweet) {
    if (userTweet.tweetType === 'TWEET') {
      return (
        <Box
          borderBottom={`1px solid ${theme.palette.border.main}`}
          paddingBottom={'8px'}
        >
          tweet
          <TweetPost tweet={userTweet} />
          <Box display={'flex'} justifyContent={'center'}>
            <PostIconList
              likes={userTweet.countLikes}
              reply={userTweet.countReply}
              retweet={userTweet.countRetweets}
              id={userTweet.id}
              isLiked={userTweet.currUserLiked}
              isRetweet={userTweet.countRetweets}
              isComment={userTweet.countReplays}
              isBookmark={userTweet.countBookmarks}
            />
          </Box>
        </Box>
      );
    } else if (userTweet.tweetType === 'QUOTE_TWEET') {
      return (
        <Box
          borderBottom={`1px solid ${theme.palette.border.main}`}
          display={'flex'}
          flexDirection={'column'}
          paddingBottom={'8px'}
        >
          QUOTE_TWEET
          <TweetPost tweet={userTweet} />
          <Box width={'90%'} alignSelf={'end'}>
            <QuoteTweet
              parentTweetId={userTweet.parentTweet.id}
              userId={userTweet.parentTweet.user.id}
              userAvatar={userTweet.parentTweet.user.avatarImgUrl}
              w={'16'}
              h={'16'}
              mt={'0'}
              fullName={userTweet.parentTweet.user.fullName}
              useruserTag={userTweet.parentTweet.user.userTag}
              createdAt={userTweet.parentTweet.createdAt}
              body={userTweet.parentTweet.body}
              images={userTweet.parentTweet.attachmentImages}
            />
          </Box>
          <Box display={'flex'} justifyContent={'center'}>
            <PostIconList
              likes={userTweet.countLikes}
              reply={userTweet.countReply}
              retweet={userTweet.countRetweets}
              id={userTweet.id}
              isLiked={userTweet.parentTweet.currUserLiked}
              isRetweet={userTweet.countRetweets}
              isComment={userTweet.countReplays}
              isBookmark={userTweet.countBookmarks}
            />
          </Box>
        </Box>
      );
    } else if (userTweet.tweetType === 'RETWEET') {
      return parentRetweet(userTweet);
    }
  }

  return (
    tweets &&
    tweets.map((userTweet) => {
      return (
        <Box
          key={userTweet.id}
          sx={{
            '&:hover': {
              backgroundColor: ` ${theme.palette.background.hover}`,
              cursor: 'pointer',
            },
          }}
        >
          {showUserTweets(userTweet)}
        </Box>
      );
    })
  );
};
