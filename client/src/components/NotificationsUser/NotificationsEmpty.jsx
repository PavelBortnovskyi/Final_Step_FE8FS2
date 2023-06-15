import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'

export const NotificationsEmpty = ({ userNotifications, tabIndex }) => {
  const theme = useTheme();

  return (
    <>
      {!userNotifications && tabIndex === 0 && (
        <Box sx={{ width: '340px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px' }}>

          <Typography variant='h4' fontWeight="bold">
            Nothing to see here — yet
          </Typography>
          <Typography variant='body1' sx={{ color: `${theme.palette.text.secondary}` }}>
            From likes to Retweets and a whole lot more, this is where all the action happens.
          </Typography>
        </Box>
      )}
      {tabIndex === 1 && (
        <Box sx={{ width: '340px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px' }}>
          <img src='./img/verification-check.png' styles={{ width: '340px', height: '200px' }} alt='bookmarks' />

          <Typography variant='h4' fontWeight="bold">
            Nothing to see here — yet
          </Typography>
          <Typography variant='body1' sx={{ color: `${theme.palette.text.secondary}` }}>
            From likes to Retweets and a whole lot more, this is where all the action happens.
          </Typography>
        </Box>
      )}
      {!userNotifications && tabIndex === 2 && (
        <Box sx={{ width: '340px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px' }}>
          <Typography variant='h4' fontWeight="bold">
            Nothing to see here — yet
          </Typography>
          <Typography variant='body1' sx={{ color: `${theme.palette.text.secondary}` }}>
            When someone mentions you, you’ll find it here.
          </Typography>
        </Box>
      )}
    </>
  )
}
