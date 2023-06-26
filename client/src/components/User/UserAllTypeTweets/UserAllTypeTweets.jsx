//UserAllTypeTweets

import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TweetList from 'src/UI/TweetList';
import TweetPost from 'src/UI/tweet/TweetPost';
import PostIconList from 'src/components/Post/PostIconGroup/PostIconList';
import { ParentReplise } from 'src/components/Replise/ParentReplise';
import { useMode } from 'src/styles/_materialTheme';

import { getUserTweetsThunk } from 'src/redux/thunk/tweets/getUserTweets';

export const UserAllTypeTweets = ({ tweets }) => {
  const theme = useMode();

  function showUserTweets(userTweet) {
    if (userTweet.tweetType === 'TWEET') {
      return (
        <Box
          borderBottom={`1px solid ${theme.palette.border.main}`}
          paddingBottom={'8px'}
        >
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
      console.log('quot');
      return (
        <Box
          borderBottom={`1px solid ${theme.palette.border.main}`}
          display={'flex'}
          flexDirection={'column'}
          paddingBottom={'8px'}
        >
          <TweetPost tweet={userTweet} />
          <Box width={'90%'} alignSelf={'end'}>
            <ParentReplise
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
              isLiked={userTweet.currUserLiked}
              isRetweet={userTweet.countRetweets}
              isComment={userTweet.countReplays}
              isBookmark={userTweet.countBookmarks}
            />
          </Box>
        </Box>
      );
    } else if (userTweet.tweetType === 'RETWEET') {
      return (
        <Box
          borderBottom={`1px solid ${theme.palette.border.main}`}
          paddingBottom={'8px'}
        >
          <TweetPost tweet={userTweet.parentTweet} />
          <Box display={'flex'} justifyContent={'center'}>
            <PostIconList
              likes={userTweet.parentTweet.countLikes}
              reply={userTweet.parentTweet.countReply}
              retweet={userTweet.parentTweet.countRetweets}
              id={userTweet.id}
              isLiked={userTweet.parentTweet.currUserLiked}
              isRetweet={userTweet.parentTweet.countRetweets}
              isComment={userTweet.parentTweet.countReplays}
              isBookmark={userTweet.parentTweet.countBookmarks}
            />
          </Box>
        </Box>
      );
    }
  }

  return (
    tweets &&
    tweets.map((userTweet) => {
      return <Box key={userTweet.id}>{showUserTweets(userTweet)}</Box>;
    })
  );
};
