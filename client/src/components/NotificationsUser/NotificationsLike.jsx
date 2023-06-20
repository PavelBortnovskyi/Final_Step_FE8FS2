import { Avatar, Box, Typography, styled, useTheme } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
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


export const NotificationsLike = ({ notification }) => {
  const theme = useTheme();
  const Text = notification.tweet.body || '';
  const TextPreview = Text.length >= 90 ? Text.slice(0, 90) + "..." : Text;
  const fullName = notification.initiator.fullName || '';
  const FirstName = fullName.length > 24 ? fullName.slice(0, 24) + "..." : fullName;
  const Images = notification.tweet.attachmentImages;

  return (

    <StyledLink to={`/tweet/${notification.tweet.id}`} key={notification.tweet.id}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'start',
        paddingBottom: '6px',
      }}>
        <FavoriteIcon sx={{ color: 'rgb(249, 24, 128)', fontSize: 34, width: '56px' }} />
        <Avatar src={notification.initiator.avatarImgUrl} sx={{ width: '32px', height: '32px' }} />
      </Box>
      <Box sx={{ paddingLeft: '56px' }}>
        <Typography variant='body1' sx={{ color: `${theme.palette.text.primary}` }}>
          <strong style={{ textTransform: 'capitalize' }}>
            {FirstName}
          </strong>
          <span style={{ paddingLeft: '4px' }}>
            liked of your Tweet
          </span>
        </Typography>
        <Typography variant='body2'
          sx={{
            paddingTop: '12px',
            color: `${theme.palette.text.secondary}`,
          }}>
          {TextPreview}
        </Typography>

        
        <NotificationsBoxImg Images={Images} pl='0'/>
      </Box>

      <Typography variant='body2' sx={{ padding: '10px 0 0 56px', color: `${theme.palette.text.link}` }}>
        Show all
      </Typography>
    </StyledLink>
  )
}
