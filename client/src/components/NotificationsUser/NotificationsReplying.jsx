import React from 'react'
import { Avatar, Box, Typography, styled, useTheme } from '@mui/material'
import { Link, NavLink } from 'react-router-dom';
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


export const NotificationsReplying = ({ notification }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const Text = notification.tweet.body || '';
  const TextPreview = Text.length > 90 ? Text.slice(0, 90) + "..." : Text;
  const fullName = notification.initiator.fullName || '';
  const FirstName = fullName.length > 24 ? fullName.slice(0, 24) + "..." : fullName;

  return (
    <StyledBox>
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
            {FirstName}
          </LinkStyle>
          <Typography variant='subtitle2' sx={{ color: `${theme.palette.text.primary}`, paddingLeft: '6px' }}>
            reply your Tweet
          </Typography>
        </Box>
      </Box>
      <Box sx={{ paddingLeft: '56px' }}>

      <NavLink to={`/tweet/${notification.tweet.parentTweet.id}`}>
          <Box sx={{
            '&:hover > *:last-child': {
              textDecoration: 'underline',
            },
          }}>
            <Typography variant='body2'
              sx={{
                paddingTop: '12px',
                color: `${theme.palette.text.secondary}`,
              }}>
              {TextPreview}
            </Typography>
            <Typography variant='body2' sx={{ padding: '10px 0 0 0', color: `${theme.palette.text.link}`, borderColor: `${theme.palette.text.link}`, }}>
              Show all
            </Typography>
          </Box>
        </NavLink>
      </Box>

      
    </StyledBox>
  )
}
