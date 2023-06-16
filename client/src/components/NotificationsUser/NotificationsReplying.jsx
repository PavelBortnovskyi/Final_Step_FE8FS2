import React from 'react'
import { Avatar, Box, Typography, styled, useTheme } from '@mui/material'
import { Link } from 'react-router-dom';


const StyledLink = styled(Link)(({ theme }) => ({
  border: `0.5px solid ${theme.palette.border.main}`,
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

  const Text = "Text tweet Що таке Lorem Ipsum? Lorem Ipsum - це текст по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів Letraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам комп'ютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum."
  const TextPreview = Text.length > 90 ? Text.slice(0, 90) + "..." : Text;
  const fullName = notification.initiator.fullName || '';
  const FirstName = fullName.length > 24 ? fullName.slice(0, 24) + "..." : fullName;
  

  return (
    <StyledLink to={`/tweet/${notification.tweet.tweetId}`} key={notification.tweet.tweetId}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          paddingBottom: '6px',
        }}>
          <Avatar src={notification.initiator.avatarImgUrl} sx={{ width: '40px', height: '40px' }} />
          <Typography variant='body1' sx={{paddingLeft: '16px', color: `${theme.palette.text.primary}`}}>
            <strong style={{ textTransform: 'capitalize' }}> {FirstName} </strong> Replying your Tweet
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
      
      <Typography variant='body2' sx={{ padding: '10px 0 0 56px', color: `${theme.palette.text.link}`  }}>
        Show all
      </Typography>
    </StyledLink>
  )
}
