import React from 'react'
import { Avatar, Box, Typography, styled, useTheme } from '@mui/material'
import { Link } from 'react-router-dom';


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


export const NotificationsReplying = ({ notification }) => {
  const theme = useTheme();

  const Text = notification.tweet.body || '';
  const TextPreview = Text.length > 90 ? Text.slice(0, 90) + "..." : Text;
  const fullName = notification.initiator.fullName || '';
  const FirstName = fullName.length > 24 ? fullName.slice(0, 24) + "..." : fullName;

  return (
    <StyledLink to={`/tweet/${notification.tweet.id}`} key={notification.tweet.id}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        paddingBottom: '6px',
      }}>
        <Avatar src={notification.initiator.avatarImgUrl} sx={{ width: '40px', height: '40px' }} />
        <Typography variant='body1' sx={{ paddingLeft: '16px', color: `${theme.palette.text.primary}` }}>
          <strong style={{ textTransform: 'capitalize' }}>
            {FirstName}
          </strong>
          <span style={{ paddingLeft: '4px' }}>
            Replying your Tweet
          </span>
        </Typography>
      </Box>
      <Box sx={{ paddingLeft: '56px' }}>

        <Typography variant='body2'
          sx={{
            paddingTop: '12px',
            color: `${theme.palette.text.secondary}`,
          }}>
          {TextPreview}
        </Typography>
      </Box>

      <Typography variant='body2' sx={{ padding: '10px 0 0 56px', color: `${theme.palette.text.link}` }}>
        Show all
      </Typography>
    </StyledLink>
  )
}
