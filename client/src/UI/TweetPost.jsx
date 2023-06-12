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
        borderBottom: `1px solid ${theme.palette.border.main}`,
        width: '100%',
        color: `${theme.palette.text.primary}`,
        '&:hover': {
          backgroundColor: `${theme.palette.background.hover}`,
          cursor: 'pointer',
        },
      }}
      padding={2}
      display="flex"
    >
      <Box padding={2}>
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
              my: '20px',
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
