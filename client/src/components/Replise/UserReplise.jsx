import { Box, useTheme } from '@mui/material';
import { TweetReplise } from './TweetReplise';
import TweetPost from 'src/UI/tweet/TweetPost';
import PostIconList from '../Post/PostIconGroup/PostIconList';

export const UserReplise = ({ replise }) => {
  const theme = useTheme();
  const userReplise = replise;

  //робить масив батьківських id твітів
  const nestedIds = [];
  userReplise.forEach((obj) => {
    const parentTweet = obj.parentTweet;
    if (parentTweet && parentTweet.id) {
      nestedIds.push(parentTweet.id);
    }
  });

  const uniqueNestedIds = Array.from(new Set(nestedIds));
  console.log(uniqueNestedIds);

  //робить масив батьківських твітів
  function getUniqueParentTweets(tweets) {
    const uniqueParentTweets = [];

    tweets.forEach(function (tweet) {
      addUniqueParentTweet(tweet.parentTweet);
    });

    function addUniqueParentTweet(parentTweet) {
      if (Array.isArray(parentTweet)) {
        parentTweet.forEach(function (childTweet) {
          addUniqueParentTweet(childTweet.parentTweet);
        });
      } else if (!uniqueParentTweets.includes(parentTweet)) {
        uniqueParentTweets.push(parentTweet);
      }
    }

    return uniqueParentTweets;
  }

  const uniqueParentTweets = getUniqueParentTweets(userReplise);

  //робить масив унікальних батьківських твітів
  const uniqueTweets = Array.from(
    new Set(uniqueParentTweets.map((tweet) => tweet?.id))
  ).map((id) => uniqueParentTweets.find((tweet) => tweet?.id === id));

  function findparent(parent, parentId) {
    if (parent?.parentTweet !== null) {
      return findparent(parent.parentTweet);
    } else if (parent.parentTweet === null && parent.id === parentId) {
      return parent;
    }
  }

  function toObjTweet(parentId, userReplise) {
    return userReplise.map((replise) => {
      let parentTrue;

      if (replise?.parentTweet !== null) {
        parentTrue = findparent(replise?.parentTweet, parentId);
        if (parentTrue) {
          return (
            <Box
              key={replise.id}
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                '&:hover': {
                  background: `${theme.palette.background.hover}`,
                },
              }}
            >
              <Box width={'90%'}>
                <TweetPost tweet={replise} />
                <Box display={'flex'} justifyContent={'center'}>
                  <PostIconList
                    isLiked={replise.currUserLiked}
                    isQuoted={replise.currUserQuoted}
                    isComment={replise.currUserCommented}
                    isRetweet={replise.currUserRetweeted}
                    likes={
                      replise.attachmentImages === undefined
                        ? replise.tweet.countLikes
                        : replise.countLikes
                    }
                    reply={
                      replise.attachmentImages === undefined
                        ? replise.tweet.countReplies
                        : replise.countReplies
                    }
                    retweet={
                      replise.attachmentImages === undefined
                        ? replise.tweet.countRetweets
                        : replise.countRetweets
                    }
                    id={
                      replise.attachmentImages === undefined
                        ? replise.tweet.id
                        : replise.id
                    }
                    quote={
                      replise.attachmentImages === undefined
                        ? replise.tweet.countQuoteTweets
                        : replise.countQuoteTweets
                    }
                    isBookmarks={
                      replise.attachmentImages === undefined
                        ? replise.tweet.currUserBookmarked
                        : replise.currUserBookmarked
                    }
                    bookmarks={
                      replise.attachmentImages === undefined
                        ? replise.tweet.countBookmarks
                        : replise.countBookmarks
                    }
                  />
                </Box>
              </Box>
            </Box>
          );
        }
      } else if (replise.parentTweet === null && replise.id === parentId) {
      }
    });
  }

  function renderReplise(parentId) {
    return toObjTweet(parentId, userReplise);
  }

  function renderParentReplise(tweetId) {
    return uniqueTweets.map((parentTweet) => {
      if (parentTweet?.id === tweetId) {
        return (
          parentTweet && (
            <Box
              key={parentTweet.id}
              sx={{
                '&:hover': {
                  background: `${theme.palette.background.hover}`,
                },
              }}
            >
              <TweetPost tweet={parentTweet} />
              <Box display={'flex'} justifyContent={'center'}>
                <PostIconList
                  isLiked={parentTweet.currUserLiked}
                  isQuoted={parentTweet.currUserQuoted}
                  isComment={parentTweet.currUserCommented}
                  isRetweet={parentTweet.currUserRetweeted}
                  likes={
                    parentTweet.attachmentImages === undefined
                      ? parentTweet.tweet.countLikes
                      : parentTweet.countLikes
                  }
                  reply={
                    parentTweet.attachmentImages === undefined
                      ? parentTweet.tweet.countReplies
                      : parentTweet.countReplies
                  }
                  retweet={
                    parentTweet.attachmentImages === undefined
                      ? parentTweet.tweet.countRetweets
                      : parentTweet.countRetweets
                  }
                  id={
                    parentTweet.attachmentImages === undefined
                      ? parentTweet.tweet.id
                      : parentTweet.id
                  }
                  quote={
                    parentTweet.attachmentImages === undefined
                      ? parentTweet.tweet.countQuoteTweets
                      : parentTweet.countQuoteTweets
                  }
                  isBookmarks={
                    parentTweet.attachmentImages === undefined
                      ? parentTweet.tweet.currUserBookmarked
                      : parentTweet.currUserBookmarked
                  }
                  bookmarks={
                    parentTweet.attachmentImages === undefined
                      ? parentTweet.tweet.countBookmarks
                      : parentTweet.countBookmarks
                  }
                />
              </Box>
            </Box>
          )
        );
      }
    });
  }

  return uniqueNestedIds.map((parentId) => {
    return (
      parentId && (
        <Box key={parentId}>
          <Box
            display={'flex'}
            flexDirection={'column'}
            gap={'8px'}
            borderBottom={`1px solid ${theme.palette.border.main}`}
            width={'100%'}
          >
            <Box sx={{ width: '100%' }}>{renderParentReplise(parentId)}</Box>
            <Box sx={{ width: '100%' }}>{renderReplise(parentId)}</Box>
          </Box>
        </Box>
      )
    );
  });
};
