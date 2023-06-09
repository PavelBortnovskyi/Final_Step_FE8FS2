import { Box, Avatar, Typography } from '@mui/material';
import React from 'react';
import UserNames from '../UserNames';
import TranslatedText from '../TranslatedText/TranslatedText';
import { useMode } from 'src/styles/_materialTheme';
import PostImages from './PostImages';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { getUserBiId } from 'src/redux/thunk/getUserBiId';
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'end', height: '100%' }}>
              <Link
                key={tweet.id}
                to={`/user/${tweet.user.id}`}
                onClick={() => {
                  dispatch(getUserBiId(tweet.user.id));
                }}
              >
                <Box sx={{ pr: '10px', pl: { xs: '5px', sm: '15px' } }}>
                  <Avatar src={tweet.user.avatarImgUrl} />
                </Box>
              </Link>
              <UserNames
                tweet1={tweet}
                userId={tweet.user.id}
                id={tweet.user.id}
                isVerified={tweet.user.isVerified}
                color={`${theme.palette.text.primary}`}
                fullName={tweet.user.fullName}
                verified={tweet.user.isVerified}
                userTag={tweet.user.userTag}
                postTime="10h"
              />
            </Box>

            <SelectDeleteTweet id={tweet.id} tweet={tweet} />
          </Box>

          <NavLink to={`/tweet/${tweet.id}`}>
            <Box
              padding={1}
              sx={{
                ml: { sm: '5px', md: '50px' },
                color: `${theme.palette.text.primary}`,
                width: { sm: '100%', md: '90%' },
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
