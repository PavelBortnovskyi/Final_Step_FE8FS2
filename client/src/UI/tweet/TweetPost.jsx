import { Box, Avatar, Typography, CardMedia } from '@mui/material';
import React from 'react';
import UserNames from '../UserNames';
import PostIconList from 'src/components/Post/PostIconGroup/PostIconList';
import TranslatedText from '../TranslatedText/TranslatedText';
import { useMode } from 'src/styles/_materialTheme';
import PostImages from './PostImages';

function TweetPost({
  displayName,
  username,
  verified,
  text,
  images,
  logoUrl,
  showIconList,
  likes,
  reply,
  retweet,
  id,
  isLiked,
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

        <Typography variant="body" sx={{ fontSize: '15px', mb: '20px' }}>
          {text}
        </Typography>
        <TranslatedText text={text} />

        <PostImages images={images} quantity={images.length} />
        {showIconList ? (
          <PostIconList
            likes={likes}
            isLiked={isLiked}
            reply={reply}
            retweet={retweet}
            id={id}
          />
        ) : (
          false
        )}
      </Box>
    </Box>
  );
}

export default TweetPost;
