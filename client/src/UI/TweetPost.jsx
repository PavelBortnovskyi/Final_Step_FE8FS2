import { Box, Avatar, Typography, CardMedia } from '@mui/material';
import React from 'react';
import UserNames from './UserNames';
import PostIconList from 'src/components/Post/PostIconGroup/PostIconList';
import TranslatedText from './TranslatedText/TranslatedText';

function TweetPost({
  displayName,
  username,
  verified,
  text,
  image,
  logoUrl,
  showIconList,
}) {
  return (
    <Box
      sx={{
        borderBottom: '1px solid rgb(56, 68, 77)',
      }}
      padding={2}
      display="flex"
    >
      <Box padding={2}>
        <Avatar src={logoUrl} />
      </Box>

      <Box padding={1}>
        <UserNames
          username={username}
          verified={verified}
          displayName={displayName}
          postTime="10h"
        />

        <Typography variant="body" sx={{ fontSize: '15px' }}>
          {text}
        </Typography>
        <TranslatedText text={text} />
        {image ? (
          <CardMedia
            component="img"
            height="auto"
            image={image}
            alt="Paella dish"
            sx={{
              borderRadius: '20px',
              my: '20px',
            }}
          />
        ) : (
          false
        )}
        {showIconList ? <PostIconList /> : false}
      </Box>
    </Box>
  );
}

export default TweetPost;
