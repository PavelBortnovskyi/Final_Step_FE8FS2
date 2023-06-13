import { Avatar, Box, Typography, styled, useTheme } from '@mui/material'
import React from 'react'
import RepeatIcon from '@mui/icons-material/Repeat';


const CustomImg = styled(Box)(({ img }) => {
  return ({
    width: '48%',
    backgroundImage: `url(${img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  });
})



export const NotificationsRetweet = ({ user, notifications }) => {
  const theme = useTheme();

  return (
    <Box sx={{
      border: `0.5px solid ${theme.palette.border.main}`,
      padding: '12px 16px',
    }}>
      <Box>

        <Box sx={{
          display: 'flex',
          justifyContent: 'start',
          paddingBottom: '6px',
        }}>
          <RepeatIcon sx={{ color: 'rgb(0, 186, 124)', fontSize: 34, width: '56px' }} />
          <Avatar src={user.avatarImgUrl} sx={{ width: '32px', height: '32px' }} />
        </Box>
        <Box sx={{ paddingLeft: '56px' }}>
          <Typography variant='body1' >
            <strong style={{ textTransform: 'capitalize' }}> {user.fullName} </strong> Retweeted your Tweet
          </Typography>
          <Typography variant='body2'
            sx={{
              paddingTop: '12px',
              color: `${theme.palette.text.secondary}`,
              maxHeight: '50px', overflow: 'hidden'
            }}>
            Text tweet Що таке Lorem Ipsum?
            Lorem Ipsum - це текст-"ь по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів Letraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам комп'ютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum.
          </Typography>

          {/* if img = 1 */}
          {notifications.length == 1 && (
            <Box sx={{ height: '100px', paddingTop: '10px', display: 'flex',}}>
              {notifications.map(img => (
                <CustomImg img={img} key={img}></CustomImg>
              ))}
            </Box>
          )}

          {/* if img = 2 */}
          {notifications.length == 2 && (
            <Box sx={{ paddingTop: '10px', height: '100px', display: 'flex', justifyContent: 'space-between', gap: '10px' }} >
              {notifications.map(img => (
                <CustomImg img={img} key={img} ></CustomImg>
              ))}
            </Box>
          )}

          {/* if img > 2 */}
          {notifications.length > 2 && (
            <Box sx={{ paddingTop: '10px', height: '100px', display: 'flex',justifyContent: 'space-between', gap: '10px' }}>
              {notifications.map(img => (
                <CustomImg img={img} key={img} ></CustomImg>
              ))}
            </Box>
          )}
        </Box>


      </Box>
      <Typography variant='body2' sx={{ padding: '10px 0 0 56px' }}>
        Show all
      </Typography>
    </Box>
  )
}
