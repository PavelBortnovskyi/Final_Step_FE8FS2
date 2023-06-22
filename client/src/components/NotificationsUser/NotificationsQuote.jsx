import React from 'react'
import { Avatar, Box, Typography, styled } from '@mui/material'
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { NotificationsBoxImg } from './NotificationsUI/NotificationsBoxImg';


const StyledLink = styled(Link)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.border.main}`,
  padding: '12px 16px',
  width: '100%',
  '&:hover': {
    background: `${theme.palette.background.hover}`,
  },
  '&:hover > *:last-child': {
    textDecoration: 'underline',
  },
}));


export const NotificationsQuote = ({ notification }) => {
  const theme = useTheme();

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
    <StyledLink to={`/tweet/${notification.tweet.id}`} key={notification.tweet.id}>

      <Box sx={{
        width: '100%',
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          paddingBottom: '6px',
        }}>
          <Avatar src={notification.initiator.avatarImgUrl} sx={{ width: '40px', height: '40px' }} />
          <Typography variant='body1' sx={{ paddingLeft: '16px', color: `${theme.palette.text.primary}` }}>
            <strong style={{ textTransform: 'capitalize' }}>
              {FirstNameInitiator}
            </strong>
            <span style={{ paddingLeft: '4px' }}>Quote your Tweet</span>
          </Typography>
        </Box>

        <Box sx={{ paddingLeft: '56px' }}>
          <Typography variant='body2'
            sx={{
              color: `${theme.palette.text.secondary}`,
            }}>
            {TextPreviewInitiator}
          </Typography>
        </Box>

        <NotificationsBoxImg Images={ImagesInitiator} pl='56'/>
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
            <Box sx={{
              marginLeft: '56px',
              width: '100%',
              p: '16px',
              border: `1px solid ${theme.palette.border.main}`,
              borderRadius: '30px'
            }}>

              <Box sx={{
                display: 'flex',
                alignItems: 'center',
              }}>
                <Avatar src={notification.tweet.parentTweet.user.avatarImgUrl} />
                <Typography variant='body1' sx={{ paddingLeft: '16px', color: `${theme.palette.text.primary}` }}>
                  <strong style={{ textTransform: 'capitalize' }}>
                    {FirstNameUser}
                  </strong>
                </Typography>
              </Box>


              <Box sx={{ paddingLeft: '56px' }}>
                <Typography variant='body2'
                  sx={{
                    color: `${theme.palette.text.secondary}`,
                  }}>
                  {TextPreviewUser}
                </Typography>
              </Box>

              <NotificationsBoxImg Images={ImagesUser} pl='56'/>
            </Box>
          </Box>
        )}
    </StyledLink>
  )
}
