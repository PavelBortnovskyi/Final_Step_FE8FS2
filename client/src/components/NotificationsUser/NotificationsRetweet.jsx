import { Avatar, Box, Typography, styled, useTheme } from '@mui/material'
import React from 'react'
import RepeatIcon from '@mui/icons-material/Repeat';
import { Link } from 'react-router-dom';


const CustomImg = styled(Box)(({ img }) => {
  return ({
    width: '48%',
    backgroundImage: `url(${img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  });
})

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



export const NotificationsRetweet = ({ notification }) => {
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
          paddingBottom: '6px',
        }}>
          <RepeatIcon sx={{ color: 'rgb(0, 186, 124)', fontSize: 34, width: '56px' }} />
          <Avatar src={notification.initiator.avatarImgUrl} sx={{ width: '32px', height: '32px' }} />
        </Box>
        <Box sx={{ paddingLeft: '56px' }}>
          <Typography variant='body1' sx={{color: `${theme.palette.text.primary}`}}>
            <strong style={{ textTransform: 'capitalize' }}> {FirstName} </strong> Retweeted your Tweet
          </Typography>
          <Typography variant='body2'
            sx={{
              paddingTop: '12px',
              color: `${theme.palette.text.secondary}`,
            }}>
            {TextPreview}
          </Typography>

          {/* if img = 1 */}
          {notification.length === 1 && (
            <Box sx={{ height: '100px', paddingTop: '10px', display: 'flex', }}>
              {notification.map(img => (
                <CustomImg img={img} key={img}></CustomImg>
              ))}
            </Box>
          )}

          {/* if img = 2 */}
          {notification.length === 2 && (
            <Box sx={{ paddingTop: '10px', height: '100px', display: 'flex', justifyContent: 'space-between', gap: '10px' }} >
              {notification.map(img => (
                <CustomImg img={img} key={img} ></CustomImg>
              ))}
            </Box>
          )}

          {/* if img > 2 */}
          {notification.length > 2 && (
            <Box sx={{ paddingTop: '10px', height: '100px', display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
              {notification.map(img => (
                <CustomImg img={img} key={img} ></CustomImg>
              ))}
            </Box>
          )}
        </Box>


      
      <Typography variant='body2' sx={{ padding: '10px 0 0 56px', color: `${theme.palette.text.link}` }}>
        Show all
      </Typography>
    </StyledLink>
  )
}
