import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from 'react-router-dom';
import PostIconList from 'src/components/Post/PostIconGroup/PostIconList';
import TweetPost from 'src/UI/tweet/TweetPost';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleTweet, getTweetReplies } from 'src/redux/selectors/selectors';
import { getTweetByIdThunk } from 'src/redux/thunk/tweets/getTweetByIdThunk';

import Reply from './Reply';
import { useMode } from 'src/styles/_materialTheme';
import { getTweetReply } from 'src/redux/thunk/tweets/getTweetReply';
import TweetList from 'src/UI/TweetList';

function TweetPage() {
  const theme = useMode();
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigates back to the previous page
  };
  useEffect(() => {
    dispatch(getTweetByIdThunk({ id: id }));
  }, [id]);

  const tweet = useSelector(getSingleTweet);
  const post = tweet?.singleTweet;

  useEffect(() => {
    dispatch(getTweetReply({ id: id, page: 0, pageSize: 10 }));
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

      {!Array.isArray(post) && <TweetPost tweet={post} />}
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{
          borderBottom: `1px solid ${theme.palette.border.main}`,
          pb: '20px',
        }}
      >
        {!Array.isArray(post) && (
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
      <Reply />
      {tweetsReplies &&
        tweetsReplies.map((post) => (
          <TweetList key={post.id} tweets={tweetsReplies} />
        ))}
    </Box>
  );
}

export default TweetPage;
