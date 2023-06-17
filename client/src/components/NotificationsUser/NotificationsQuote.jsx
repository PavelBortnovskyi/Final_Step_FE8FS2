import React from 'react'
import Post from '../Post/Post'
import { Avatar, Box, Typography, styled } from '@mui/material'
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import TranslatedText from 'src/UI/TranslatedText/TranslatedText';
import UserNames from 'src/UI/UserNames';



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


export const NotificationsQuote = ({ notification, arrFoto }) => {
  const theme = useTheme();

  const Text = "Text tweet Що таке Lorem Ipsum? Lorem Ipsum - це текст по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів Letraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам комп'ютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum."
  const TextPreview = Text.length > 90 ? Text.slice(0, 90) + "..." : Text;
  const fullName = notification.initiator.fullName || '';
  const FirstName = fullName.length > 24 ? fullName.slice(0, 24) + "..." : fullName;
  // const Images = notification.tweet.attachmentsImages || [];
  const Images = arrFoto;

console.log(notification);
  return (
    <StyledLink to={`/tweet/${notification.tweet.tweetId}`} key={notification.tweet.tweetId}>
Quote
    <Box sx={{
      // height: '300px',
      width: '100%',
      
    }}>
            <Avatar src={notification.initiator.avatarImgUrl} sx={{ width: '32px', height: '32px' }} />

            <Box sx={{ paddingLeft: '56px' }}>
        <Typography variant='body1' sx={{ color: `${theme.palette.text.primary}` }}>
          <strong style={{ textTransform: 'capitalize' }}> {FirstName} </strong> Quote your Tweet
        </Typography>
        <Typography variant='body2'
          sx={{
            paddingTop: '12px',
            color: `${theme.palette.text.secondary}`,
          }}>
          {TextPreview}
        </Typography>

        {/* if img = 1 */}
        {Images.length === 1 && (
          <Box sx={{ height: '100px', paddingTop: '10px', display: 'flex', }}>
            {Images.map(img => (
              <CustomImg img={img} key={img}></CustomImg>
            ))}
          </Box>
        )}

        {/* if img = 2 */}
        {Images.length === 2 && (
          <Box sx={{ paddingTop: '10px', height: '100px', display: 'flex', justifyContent: 'space-between', gap: '10px' }} >
            {Images.map(img => (
              <CustomImg img={img} key={img} ></CustomImg>
            ))}
          </Box>
        )}

        {/* if img > 2 */}
        {Images.length > 2 && (
          <Box sx={{ paddingTop: '10px', height: '100px', display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            {Images.map(img => (
              <CustomImg img={img} key={img} ></CustomImg>
            ))}
          </Box>
        )}
      </Box>
    </Box>



{/* tweet который цитируют */}
{
  notification && (

    <Box
      sx={{
        display: 'flex',
        justifyContent: 'end',
        width: '80%',
        p: '16px',
        color: `${theme.palette.text.primary}`,
        // '&:hover': {
        //   backgroundColor: `${theme.palette.background.hover}`,
        //   cursor: 'pointer',
        // },
      }}
    >
    <Box sx={{
      p: '16px',
      border: '1px solid red',
      borderRadius: '30px'
    }}>

    
      <Box sx={{ pr: '10px', pl: { xs: '5px', sm: '15px' } }}>
        <Avatar src={notification.receiver.avatarImgUrl} />
      </Box>
      <Box
        padding={1}
        sx={{
          width: '100%',
        }}
      >
        <UserNames
          fullName={notification.receiver.fullName}
          userTag={notification.receiver.userTag}
          postTime="10h"
        />

        <Typography variant="body" sx={{ fontSize: '15px' }}>
          {'jsahdjadjashdh   jashdjsdj jsdjkahdj hdjkhasjdhajshdj  sadjashdj  ksjdhakjshdjkahdh sajd hsjdjkahdja jnjadshjkahdjkhajsdhajkhdjashdkjahdjahs notification.tweet.body'}
        </Typography>
        <TranslatedText text={notification.tweet.body} />
        {Images.length > 0 && (
          <Box sx={{ paddingTop: '10px', height: '100px', display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            {Images.map(img => (
              <CustomImg img={img} key={img} ></CustomImg>
            ))}
          </Box>
        )}

      </Box>
      </Box>
    </Box>
  )}
</StyledLink>
  )
}
