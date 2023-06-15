import { Box, Tab, Tabs, Typography, styled, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NotificationsFollowed } from './NotificationsFollowed';
import { NotificationsRetweet } from './NotificationsRetweet';
import { NotificationsLike } from './NotificationsLike';
import { useNavigate } from 'react-router-dom';
import { getAuthorizationData } from 'src/redux/selectors/selectors';
import { getNotifications } from 'src/redux/thunk/getNotifications';
import { NotificationsReplying } from './NotificationsReplying';
import { NotificationsEmpty } from './NotificationsEmpty';

const CustomTab = styled(Tab)((props) => ({
  fontWeight: '800',
  width: '33%',
  textTransform: 'capitalize',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '#b3b3b32b',
  },
}));




export const NotificationsUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(getAuthorizationData);
  const [tabIndex, setTabIndex] = useState(0);
  const theme = useTheme();
  const userNotifications = useSelector(state => state.userNotifications.userNotifications);
  const Notifications = userNotifications.content;



  // send user to home if not authorization
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(getNotifications({ page: 0, pageSize: 10 }));
  }, [dispatch]);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  return (
    <Box sx={{ height: '100vh', padding: '8px 0 0 0' }}>
      <Typography variant="h5" sx={{ padding: '0 0 8px 16px', }}>
        Notifications
      </Typography>
      <Tabs value={tabIndex} onChange={handleTabChange}
        sx={{
          borderBottom: `1px solid ${theme.palette.border.main}`,
        }}>
        <CustomTab label="All" key='all' />
        <CustomTab label="Verified" key='Verified' />
        <CustomTab label="Mentions" key='Mentions' />
      </Tabs>

      <Box sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

      }}>
        <NotificationsEmpty userNotifications={userNotifications} tabIndex={tabIndex} />





        {
          tabIndex === 0 && Notifications && Notifications.map(notification => (
            (notification.notificationType === ''
            && <NotificationsFollowed notification={notification} key={notification.id} />)
            ||
            (notification.notificationType === 'LIKE'
            && <NotificationsLike notification={notification} key={notification.id} />)
            ||
            (notification.notificationType === 'REPLY'
            && <NotificationsReplying notification={notification} key={notification.id} />)
            ||
            (notification.notificationType === 'RETWEET'
            && <NotificationsRetweet notification={notification} key={notification.id} />)
          ))
        }

        {
          tabIndex === 2 && Notifications && Notifications.map(notification => (
            notification.notificationType === 'REPLY'
            && <NotificationsReplying notification={notification} key={notification.id} />
          ))
        }
      </Box>
    </Box>
  )
}
