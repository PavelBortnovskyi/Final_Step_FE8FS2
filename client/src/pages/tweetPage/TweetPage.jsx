import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from 'react-router-dom';
import PostIconList from 'src/components/Post/PostIconGroup/PostIconList';
import TweetPost from 'src/UI/tweet/TweetPost';
import CommentsList from 'src/components/Comments/CommentsList';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleTweet, getTweetReplies } from 'src/redux/selectors/selectors';
import { getTweetByIdThunk } from 'src/redux/thunk/tweets/getTweetById';

import Retweet from './Retweet';
import { useMode } from 'src/styles/_materialTheme';
import { getTweetReply } from 'src/redux/thunk/tweets/getTweetReply';
import TweetList from 'src/UI/TweetList';

function TweetPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  const theme = useMode();
  // getting single tweet
  useEffect(() => {
    dispatch(getTweetByIdThunk(id));
  }, [id]);
  const tweet = useSelector(getSingleTweet);
  const post = tweet?.singleTweet || [];

  console.log(post);
  useEffect(() => {
    dispatch(getTweetReply({ id: id, page: 0, pageSize: 10 }));
    console.log('get replies');
  }, [id]);

  let dataReplies = useSelector(getTweetReplies);
  const tweetsReplies = dataReplies.tweetReplies?.content || [];

  return (
    <Box
      sx={{
        borderLeft: {
          xs: 'none',
          sm: `1px solid ${theme.palette.border.main}`,
        },
        borderRight: {
          xs: 'none',
          sm: `1px solid ${theme.palette.border.main}`,
        },
      }}
    >
      <Box
        sx={{
          color: `${theme.palette.text.primary}`,
          pt: '15px',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          '&:hover': {
            cursor: 'pointer',
          },
        }}
      >
        <ArrowBackIcon onClick={handleGoBack} />
        <Typography variant="h6" fontWeight={800}>
          Tweet
        </Typography>
      </Box>

      {post && <TweetPost tweet={post} />}
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{
          borderBottom: `1px solid ${theme.palette.border.main}`,
          pb: '20px',
        }}
      >
        {post && (
          <PostIconList
            isLiked={post.currUserLiked}
            likes={
              post.attachmentImages === undefined
                ? post.tweet.countLikes
                : post.countLikes
            }
            reply={
              post.attachmentImages === undefined
                ? post.tweet.countReply
                : post.countReply
            }
            retweet={
              post.attachmentImages === undefined
                ? post.tweet.countRetweets
                : post.countRetweets
            }
            id={post.attachmentImages === undefined ? post.tweet.id : post.id}
            isBookmarks={
              post.attachmentImages === undefined
                ? post.tweet.currUserBookmarked
                : post.currUserBookmarked
            }
            bookmarks={
              post.attachmentImages === undefined
                ? post.tweet.countBookmarks
                : post.countBookmarks
            }
          />
        )}
      </Grid>
      <Retweet />
      {tweetsReplies &&
        tweetsReplies.map((post) => (
          <TweetList key={post.id} tweets={tweetsReplies} />
        ))}
    </Box>
  );
}

export default TweetPage;
