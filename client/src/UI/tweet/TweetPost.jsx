import { Box, Avatar, Typography, CardMedia, FormControl, MenuItem, Select, FormHelperText, InputAdornment, ListItemIcon, IconButton, Menu, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import UserNames from '../UserNames';
import TranslatedText from '../TranslatedText/TranslatedText';
import { useMode } from 'src/styles/_materialTheme';
import PostImages from './PostImages';

import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { getUserBiId } from 'src/redux/thunk/getUserBiId';
import TweetPage from 'src/pages/tweetPage/TweetPage';

import { deleteTweet } from 'src/redux/thunk/tweets/deleteTweet';
import { SelectDeleteTweet } from './SelectDeleteTweet';



function TweetPost({ tweet }) {
  const dispatch = useDispatch();
  const theme = useMode();


  return (
    <>
      {tweet && (
        <Box
          id={tweet.id}
          sx={{
            flexDirection: 'column',
            width: '100%',
            pt: '16px',
            pr: '5px',
            color: `${theme.palette.text.primary}`,
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: ` ${theme.palette.background.hover}`,
              cursor: 'pointer',
            },
          }}
          display="flex"
        >


          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'end', height: '100%' }}>
              <Link
                key={tweet.id}
                to={`/user/${tweet.id}`}
                onClick={() => {
                  dispatch(getUserBiId(tweet.user.id));
                }}
              >
                <Box sx={{ pr: '10px', pl: { xs: '5px', sm: '15px' } }}>
                  <Avatar src={tweet.user.avatarImgUrl} />
                </Box>
              </Link>
              <UserNames
                userId={tweet.user.id}
                id={tweet.id}
                isVerified={tweet.user.isVerified}
                color={`${theme.palette.text.primary}`}
                fullName={tweet.user.fullName}
                verified={tweet.user.isVerified}
                userTag={tweet.user.userTag}
                postTime="10h"
              />
            </Box>

            <SelectDeleteTweet id={tweet.id}/>
          </Box>

          <NavLink to={`/tweet/${tweet.id}`}>
            <Box
              padding={1}
              sx={{
                ml: '50px',
                color: `${theme.palette.text.primary}`,
                width: '90%',
              }}
            >
              <Typography variant="body" sx={{ fontSize: '15px', mb: '20px' }}>
                {tweet.body}
              </Typography>
              <TranslatedText text={tweet.body} />

              <PostImages
                images={tweet.attachmentImages}
                quantity={tweet.attachmentImages.length}
              />
            </Box>
          </NavLink>
        </Box>
      )}
    </>
  );
}

export default TweetPost;
