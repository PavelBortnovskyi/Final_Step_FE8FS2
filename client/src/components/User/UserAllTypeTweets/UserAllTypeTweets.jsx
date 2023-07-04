//UserAllTypeTweets

import { Box, Typography } from '@mui/material';

import TweetPost from 'src/UI/tweet/TweetPost';
import PostIconList from 'src/components/Post/PostIconGroup/PostIconList';
import { QuoteTweet } from 'src/components/Replise/QuoteTweet';
import { useMode } from 'src/styles/_materialTheme';
import RepeatIcon from '@mui/icons-material/Repeat';

export const UserAllTypeTweets = ({ tweets }) => {
  const theme = useMode();
  function findeParentTweetId(userTweet) {
    if (userTweet.parentTweet !== null) {
      return findeParentTweetId(userTweet.parentTweet);
    } else if (userTweet.parentTweet === null) {
      return userTweet.id;
    }
  }

  function parentRetweet(userTweet) {
    if (userTweet.parentTweet !== null) {
      return parentRetweet(userTweet.parentTweet);
    } else if (userTweet.parentTweet === null) {
      return (
        <Box
          key={userTweet.id}
          borderBottom={`1px solid ${theme.palette.border.main}`}
          paddingBottom={'8px'}
        >
          <TweetPost tweet={userTweet} />
          <Box display={'flex'} justifyContent={'center'}>
            <PostIconList
              isLiked={userTweet.currUserLiked}
              isQuoted={userTweet.currUserQuoted}
              isComment={userTweet.currUserCommented}
              isRetweet={userTweet.currUserRetweeted}
              likes={userTweet.countLikes}
              reply={userTweet.countReplies}
              retweet={userTweet.countRetweets}
              id={userTweet.id}
              quote={userTweet.countQuoteTweets}
              isBookmarks={userTweet.currUserBookmarked}
              bookmarks={userTweet.countBookmarks}
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
          key={userTweet.id}
          borderBottom={`1px solid ${theme.palette.border.main}`}
          paddingBottom={'8px'}
        >
          <TweetPost tweet={userTweet} />
          <Box display={'flex'} justifyContent={'center'}>
            <PostIconList
              isLiked={userTweet.currUserLiked}
              isQuoted={userTweet.currUserQuoted}
              isComment={userTweet.currUserCommented}
              isRetweet={userTweet.currUserRetweeted}
              likes={
                userTweet.attachmentImages === undefined
                  ? userTweet.tweet.countLikes
                  : userTweet.countLikes
              }
              reply={
                userTweet.attachmentImages === undefined
                  ? userTweet.tweet.countReplies
                  : userTweet.countReplies
              }
              retweet={
                userTweet.attachmentImages === undefined
                  ? userTweet.tweet.countRetweets
                  : userTweet.countRetweets
              }
              id={
                userTweet.attachmentImages === undefined
                  ? userTweet.tweet.id
                  : userTweet.id
              }
              quote={
                userTweet.attachmentImages === undefined
                  ? userTweet.tweet.countQuoteTweets
                  : userTweet.countQuoteTweets
              }
              isBookmarks={
                userTweet.attachmentImages === undefined
                  ? userTweet.tweet.currUserBookmarked
                  : userTweet.currUserBookmarked
              }
              bookmarks={
                userTweet.attachmentImages === undefined
                  ? userTweet.tweet.countBookmarks
                  : userTweet.countBookmarks
              }
            />
          </Box>
        </Box>
      );
    } else if (userTweet.tweetType === 'QUOTE_TWEET') {
      return (
        <Box
          key={userTweet.id}
          borderBottom={`1px solid ${theme.palette.border.main}`}
          display={'flex'}
          flexDirection={'column'}
          paddingBottom={'8px'}
        >
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
              linkTo={findeParentTweetId(userTweet)}
            />
          </Box>
          <Box display={'flex'} justifyContent={'center'}>
            <PostIconList
              isLiked={userTweet.currUserLiked}
              isQuoted={userTweet.currUserQuoted}
              isComment={userTweet.currUserCommented}
              isRetweet={userTweet.currUserRetweeted}
              likes={
                userTweet.attachmentImages === undefined
                  ? userTweet.tweet.countLikes
                  : userTweet.countLikes
              }
              reply={
                userTweet.attachmentImages === undefined
                  ? userTweet.tweet.countReplies
                  : userTweet.countReplies
              }
              retweet={
                userTweet.attachmentImages === undefined
                  ? userTweet.tweet.countRetweets
                  : userTweet.countRetweets
              }
              id={
                userTweet.attachmentImages === undefined
                  ? userTweet.tweet.id
                  : userTweet.id
              }
              quote={
                userTweet.attachmentImages === undefined
                  ? userTweet.tweet.countQuoteTweets
                  : userTweet.countQuoteTweets
              }
              isBookmarks={
                userTweet.attachmentImages === undefined
                  ? userTweet.tweet.currUserBookmarked
                  : userTweet.currUserBookmarked
              }
              bookmarks={
                userTweet.attachmentImages === undefined
                  ? userTweet.tweet.countBookmarks
                  : userTweet.countBookmarks
              }
            />
          </Box>
        </Box>
      );
    } else if (userTweet.tweetType === 'RETWEET') {
      return (
        <Box key={userTweet.id}>
          <Box
            display={'flex'}
            alignItems={'center'}
            color={'rgb(139, 152, 165)'}
            paddingLeft={'10%'}
          >
            <RepeatIcon
              sx={{ color: 'rgb(139, 152, 165)', fontSize: 18, width: '26px' }}
            />
            <Typography>{userTweet.user.userTag} Retweeted</Typography>
          </Box>
          {parentRetweet(userTweet)}
        </Box>
      );
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
