import { Avatar, Box, Tab, Tabs, Typography, styled, useTheme } from '@mui/material'
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
import { NotificationsQuote } from './NotificationsQuote';
import { SidebarMobile } from '../SidebarMobile/SidebarMobile';

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
  const user = useSelector((state) => state.user.user) || '';
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
    dispatch(getNotifications({ page: 0, pageSize: 200 }));
  }, [dispatch]);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const [isOpen, setIsOpen] = useState(false);

  console.log(Notifications);
  return (
    <Box sx={{ padding: '8px 0 0 0' }}>
      <Typography variant="h5"
        sx={{
          backdropFilter: 'blur(15px)',
          width: '100%',
          padding: '8px 0 8px 16px',
          zIndex: 13,
        }}>
        <Box
          sx={{
            display: { xs: 'flex', sm: 'none' },
            marginTop: '10px',
            alignItems: 'center',
          }}
        >
          <Avatar
            src={user.avatarImgUrl}
            sx={{ marginRight: '5%', marginLeft: '10px', cursor: 'pointer' }}
            onClick={() => setIsOpen(true)}
          />
          <SidebarMobile isOpen={isOpen} setIsOpen={setIsOpen} />
          Notifications
        </Box>

      </Typography>
      <Tabs value={tabIndex} onChange={handleTabChange}
        sx={{
          borderBottom: `1px solid ${theme.palette.border.main}`,
          position: 'sticky',
          top: '0',
          backdropFilter: 'blur(15px)',
        }}>
        <CustomTab label="All" key='all' />
        <CustomTab label="Verified" key='Verified' />
        <CustomTab label="Mentions" key='Mentions' />
      </Tabs>

      <Box sx={{
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
            (notification.notificationType === 'QUOTE_TWEET'
              && <NotificationsQuote notification={notification} key={notification.id} />)
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
