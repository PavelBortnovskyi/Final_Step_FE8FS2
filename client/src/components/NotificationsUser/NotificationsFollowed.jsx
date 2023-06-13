import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Typography, useTheme } from '@mui/material';

export const NotificationsFollowed = ({user}) => {
  const theme = useTheme();

  return (
    <Box sx={{
      border: `0.5px solid ${theme.palette.border.main}`,
      padding: '12px 16px'
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'start',
        paddingBottom: '6px',
      }}>
        <PersonIcon sx={{ color: 'rgb(30,155,240)', fontSize: 34,  width: '56px'}} />
        <Avatar src={user.avatarImgUrl} sx={{ width: '32px', height: '32px' }}/>
      </Box>
      <Typography variant='body1' sx={{paddingLeft: '56px'}}> <strong style={{textTransform: 'capitalize'}}> {user.fullName} </strong> followed you</Typography>
    </Box>
  )
}
