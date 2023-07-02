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
import LoaderSkeleton from 'src/UI/LoaderSkeleton';

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

  const post = useSelector(getSingleTweet);
  const postLoading = post.isLoading;

  const tweet = post?.singleTweet;
  useEffect(() => {
    dispatch(getTweetReply({ id: id, page: 0, pageSize: 10 }));
  }, [id]);

  let dataReplies = useSelector(getTweetReplies);
  const tweetsReplies = dataReplies.tweetReplies || [];

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
      {postLoading ? (
        <LoaderSkeleton quantity={1} />
      ) : (
        <>
          {' '}
          {!Array.isArray(tweet) && <TweetPost tweet={tweet} />}
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{
              borderBottom: `1px solid ${theme.palette.border.main}`,
              pb: '20px',
            }}
          >
            {!Array.isArray(tweet) && (
              <PostIconList
                isLiked={tweet.currUserLiked}
                isQuoted={tweet.currUserQuoted}
                // isBookmarks={tweet.currUserBookmarked}
                isComment={tweet.currUserCommented}
                isRetweet={tweet.currUserRetweeted}
                likes={tweet.countLikes}
                reply={tweet.countReplies}
                retweet={tweet.countRetweets}
                id={tweet.id}
                quote={tweet.countQuoteTweets}
                isBookmarks={tweet.currUserBookmarked}
                bookmarks={tweet.countBookmarks}
              />
            )}
          </Grid>
          <Reply id={tweet.id} type="reply" />
          {tweetsReplies.length !== 0 ? (
            <TweetList key={tweet.id} tweets={tweetsReplies} />
          ) : (
            false
          )}
        </>
      )}
    </Box>
  );
}

export default TweetPage;
