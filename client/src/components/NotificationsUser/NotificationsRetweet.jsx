import { Avatar, Box, Typography, styled, useTheme } from '@mui/material'
import React from 'react'
import RepeatIcon from '@mui/icons-material/Repeat';
import { Link, NavLink } from 'react-router-dom';
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


export const NotificationsRetweet = ({ notification }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const Text = notification.tweet.parentTweet.body || '';
  const TextPreview = Text.length > 90 ? Text.slice(0, 90) + "..." : Text;
  const fullName = notification.initiator.fullName || '';
  const FirstName = fullName.length > 24 ? fullName.slice(0, 24) + "..." : fullName;
  const Images = notification.tweet.parentTweet.attachmentImages || [];

  return (
    <StyledBox>
      <Box sx={{
        display: 'flex',
        justifyContent: 'start',
        paddingBottom: '6px',
      }}>
        <RepeatIcon sx={{ color: 'rgb(0, 186, 124)', fontSize: 34, width: '56px' }} />
        <Link
          key={notification.tweet.id}
          to={`/user/${notification.tweet.id}`}
          onClick={() => {
            dispatch(getUserBiId(notification.initiator.id));
          }}
        >
          <Avatar src={notification.initiator.avatarImgUrl} sx={{ width: '32px', height: '32px' }} />
        </Link>
      </Box>
      <Box sx={{ paddingLeft: '56px' }}>
        <Box sx={{ display: 'flex', alignItems: 'end',}}>
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
            retweeted your Tweet
          </Typography>
        </Box>



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
            <NotificationsBoxImg Images={Images} pl='0' />
            <Typography variant='body2' sx={{ padding: '10px 0 0 0', color: `${theme.palette.text.link}`, borderColor: `${theme.palette.text.link}`, }}>
              Show all
            </Typography>
          </Box>
        </NavLink>

      </Box>
    </StyledBox>
  )
}
