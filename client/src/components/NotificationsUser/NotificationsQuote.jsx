import React from 'react'
import { Avatar, Box, Typography, styled } from '@mui/material'
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { NotificationsBoxImg } from './NotificationsUI/NotificationsBoxImg';
import { getUserBiId } from 'src/redux/thunk/getUserBiId';
import { useDispatch } from 'react-redux';


const StyledBox = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.border.main}`,
  padding: '12px 16px',
  width: '100%',
  '&:hover': {
    background: `${theme.palette.background.hover}`,
  },
}));


const LinkStyle = styled(Link)(({ theme }) => ({
  fontWeight: '700',
  fontSize: '1rem',
  color: `${theme.palette.text.primary}`,
  textTransform: 'capitalize',
  '&:hover': {
    textDecoration: 'underline',
  }
}))

const NavLinkStyle = styled(NavLink)(({ theme }) => ({
  marginLeft: '56px',
  width: '100%',
  padding: '16px',
  border: `1px solid ${theme.palette.border.main}`,
  borderRadius: '30px',
  '&:hover': {
    backgroundColor: `rgba(29, 155, 240, 0.15)`,
  }
}))


export const NotificationsQuote = ({ notification }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const TextInitiator = notification.tweet.body || '';
  const TextPreviewInitiator = TextInitiator.length > 90 ? TextInitiator.slice(0, 90) + "..." : TextInitiator;
  const TextUser = notification.tweet.parentTweet.body || '';
  const TextPreviewUser = TextUser.length > 90 ? TextUser.slice(0, 90) + "..." : TextUser;

  const fullNameInitiator = notification.initiator.fullName || '';
  const FirstNameInitiator = fullNameInitiator.length > 24 ? fullNameInitiator.slice(0, 24) + "..." : fullNameInitiator;
  const fullNameUser = notification.tweet.parentTweet.user.fullName || '';
  const FirstNameUser = fullNameUser.length > 24 ? fullNameUser.slice(0, 24) + "..." : fullNameUser;

  const ImagesInitiator = notification.tweet.attachmentImages || [];
  const ImagesUser = notification.tweet.parentTweet.attachmentImages || [];

  return (
    <StyledBox>
      <Box sx={{
        width: '100%',
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          paddingBottom: '6px',
        }}>
          <Link
            key={notification.tweet.id}
            to={`/user/${notification.tweet.id}`}
            onClick={() => {
              dispatch(getUserBiId(notification.initiator.id));
            }}
          >
            <Avatar src={notification.initiator.avatarImgUrl} sx={{ width: '40px', height: '40px' }} />
          </Link>

          <Box sx={{ display: 'flex', alignItems: 'end', paddingLeft: '16px' }}>
            <LinkStyle
              key={notification.tweet.id}
              to={`/user/${notification.tweet.id}`}
              onClick={() => {
                dispatch(getUserBiId(notification.initiator.id));
              }}
            >
              {FirstNameInitiator}
            </LinkStyle>
            <Typography variant='subtitle2' sx={{ color: `${theme.palette.text.primary}`, paddingLeft: '6px' }}>
              quote your Tweet
            </Typography>
          </Box>
        </Box>


        {/* my tweet */}
        <NavLink to={`/tweet/${notification.tweet.id}`}>
          <Box sx={{
            paddingLeft: '56px',
          }}>
            <Typography variant='body2'
              sx={{
                color: `${theme.palette.text.secondary}`,
              }}>
              {TextPreviewInitiator}
            </Typography>
          </Box>

          <NotificationsBoxImg Images={ImagesInitiator} pl='56' />
        </NavLink>
      </Box>



      {/* tweet который цитируют */}
      {
        notification && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              justifyItems: 'end',
              width: '100%',
              py: '16px',
              color: `${theme.palette.text.primary}`,
            }}
          >
            <NavLinkStyle to={`/tweet/${notification.tweet.parentTweet.id}`}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
              }}>
                <Link
                  key={notification.tweet.id}
                  to={`/user/${notification.tweet.id}`}
                  onClick={() => {
                    dispatch(getUserBiId(notification.tweet.parentTweet.user.id));
                  }}
                >
                  <Avatar src={notification.tweet.parentTweet.user.avatarImgUrl} />
                </Link>

                <Box sx={{ display: 'flex', alignItems: 'end', paddingLeft: '16px' }}>
                  <LinkStyle
                    key={notification.tweet.id}
                    to={`/user/${notification.tweet.id}`}
                    onClick={() => {
                      dispatch(getUserBiId(notification.tweet.parentTweet.user.id));
                    }}
                  >
                    {FirstNameUser}
                  </LinkStyle>
                </Box>
              </Box>

              <Box sx={{ paddingLeft: '56px' }}>
                <Typography variant='body2'
                  sx={{
                    color: `${theme.palette.text.secondary}`,
                  }}>
                  {TextPreviewUser}
                </Typography>
                <NotificationsBoxImg Images={ImagesUser} />
              </Box>
            </NavLinkStyle>
          </Box>
        )}
    </StyledBox>
  )
}

