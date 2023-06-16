import { Box, Avatar, Typography, CardMedia } from '@mui/material';
import React from 'react';
import UserNames from './UserNames';
import PostIconList from 'src/components/Post/PostIconGroup/PostIconList';
import TranslatedText from './TranslatedText/TranslatedText';
import { useMode } from 'src/styles/_materialTheme';

function TweetPost({
  displayName,
  username,
  verified,
  text,
  image,
  logoUrl,
  showIconList,
  likes,
  reply,
  retweet,
  id,
}) {
  const theme = useMode();

  return (
    <Box
      id={id}
      sx={{
        width: '100%',
        pt: '16px',
        pr: '5px',
        color: `${theme.palette.text.primary}`,
        // '&:hover': {
        //   backgroundColor: `${theme.palette.background.hover}`,
        //   cursor: 'pointer',
        // },
      }}
      display="flex"
    >
      <Box sx={{ pr: '10px', pl: { xs: '5px', sm: '15px' } }}>
        <Avatar src={logoUrl} />
      </Box>
      <Box
        padding={1}
        sx={{
          width: '100%',
        }}
      >
        <UserNames
          fullName={username}
          verified={verified}
          userTag={displayName}
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
              mt: '20px',
            }}
          />
        ) : (
          false
        )}

        {showIconList ? (
          <PostIconList likes={likes} reply={reply} retweet={retweet} id={id} />
        ) : (
          false
        )}
      </Box>
    </Box>
  );
}

export default TweetPost;
