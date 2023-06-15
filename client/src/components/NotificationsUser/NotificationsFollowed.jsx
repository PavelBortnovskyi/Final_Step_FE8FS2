import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Typography, useTheme } from '@mui/material';

export const NotificationsFollowed = ({ notification }) => {
  const theme = useTheme();

  const fullName = notification.initiator.fullName || '';
  const FirstName = fullName.length > 24 ? fullName.slice(0, 24) + "..." : fullName;

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
        <PersonIcon sx={{ color: 'rgb(30,155,240)', fontSize: 34, width: '56px' }} />
        <Avatar src={notification.initiator.avatarImgUrl} sx={{ width: '32px', height: '32px' }} />
      </Box>
      <Typography variant='body1' sx={{ paddingLeft: '56px' }}>
        <strong style={{ textTransform: 'capitalize' }}
        >
          {FirstName}
        </strong> followed you
      </Typography>
    </Box>
  )
}
