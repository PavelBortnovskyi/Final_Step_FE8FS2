import { Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Post from 'src/components/Post/Post';
import PostIconList from 'src/components/Post/PostIconGroup/PostIconList';
import { useMode } from 'src/styles/_materialTheme';


export const TweetList = ({ tweets }) => {
  
  const theme = useMode();

  return (
    <Box sx={{}}>
      {tweets !== false &&
        tweets.map((tweet) => (
          <Box
            key={tweet.attachmentImages === undefined ? tweet.tweet.id : tweet.id}
            sx={{
              borderBottom: `1px solid ${theme.palette.border.main}`,
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: `${theme.palette.background.hover}`,
                cursor: 'pointer',
              },
            }}
          >
            <Link to={`/tweet/${tweet.id}`}>
              <Post tweet={tweet.attachmentImages === undefined ? tweet.tweet : tweet} />
            </Link>
            <Box
              sx={{
                width: '90%',
                ml: '65px',
                pr: '10px',
                my: '10px',
              }}
            >
              <PostIconList
                likes={tweet.attachmentImages === undefined ? tweet.tweet.countLikes : tweet.countLikes}
                reply={tweet.attachmentImages === undefined ? tweet.tweet.countReply : tweet.countReply}
                retweet={tweet.attachmentImages === undefined ? tweet.tweet.countRetweets : tweet.countRetweets}
                id={tweet.attachmentImages === undefined ? tweet.tweet.id : tweet.id}
                isBookmarks={tweet.attachmentImages === undefined ? tweet.tweet.currUserBookmarked : tweet.currUserBookmarked}
              />
            </Box>
          </Box>
        ))}
    </Box>
  )
}


export default TweetList;


