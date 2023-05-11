import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Post from 'src/components/Post/Post';
import { Link } from 'react-router-dom';
import PostIconList from 'src/components/Post/PostIconGroup/PostIconList';
import TweetBox from 'src/components/TweetBox/TweetBox';
import InputAvatar from 'src/UI/InputAvatar';
import TweetButton from 'src/UI/TweetButton';

function TweetPage() {
  return (
    <Box
      sx={{
        borderLeft: '1px solid rgb(56, 68, 77)',
        borderRight: '1px solid rgb(56, 68, 77)',
      }}
    >
      {/* back to home page */}
      <Link to="/">
        <Box
          sx={{
            color: '#fff',
            pt: '15px',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <ArrowBackIcon />
          <Typography variant="h6" fontWeight={800}>
            Tweet
          </Typography>
        </Box>
      </Link>

      <Post
        displayName="Artem Shevchuk"
        username="Jocellyn Flores"
        verified={false}
        text="This glorious backpack has been on many adventures now. It is comfortable, holds a ton which the/a packing cube to increase this. Honestly it is surprising how much it holds. I’m also not the gentlest with my backpacks and this one has help up.."
        image="https://31.media.tumblr.com/b00badbaad9a499a16f36c6ecd1ddccb/tumblr_mkygq9DYRb1ryx1p2o1_400.gif"
      />

      {/* likes */}
      <Box
        sx={{
          display: 'flex',
          gap: '5px',
          py: '20px',
          pl: '10px',
          borderBottom: '1px solid rgb(56, 68, 77)',
        }}
      >
        <Typography fontWeight={800} variant="subtitle1">
          18
        </Typography>
        <Typography fontWeight={400} color="grey" variant="subtitle1">
          Likes
        </Typography>
      </Box>

      {/* Tweet actions like comment or retweet */}
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ borderBottom: '1px solid rgb(56, 68, 77)', py: '20px' }}
      >
        <PostIconList />
      </Grid>

      <Box
        sx={{
          mb: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <InputAvatar
          avatarUrl="/img/avatar.JPG"
          placeholder="Tweet your reply"
        />
        <Box mr="10px">
          <TweetButton text="Reply" />
        </Box>
      </Box>
    </Box>
  );
}

export default TweetPage;
