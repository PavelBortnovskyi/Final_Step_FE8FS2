import { Box, Tab, Tabs, Typography, styled, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NotificationsFollowed } from './NotificationsFollowed';
import { NotificationsRetweet } from './NotificationsRetweet';
import { NotificationsLike } from './NotificationsLike';
import { useNavigate } from 'react-router-dom';
import { getAuthorizationData } from 'src/redux/selectors/selectors';

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
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(getAuthorizationData);
  // send user to home if not authorization
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const [tabIndex, setTabIndex] = useState(0);
  const theme = useTheme();
  const user = useSelector((state) => state.user.user) || ""; //удалить, когда будет готов запрос
  const arr = [ './img/06.jpg', './img/06.jpg', './img/06.jpg','./img/06.jpg']; //удалить, когда будет готов запрос
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

      {/* <Box sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '80px'
      }}> */}
      {/* {tabIndex == 0 && (
          <Box sx={{ width: '340px', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

            <Typography variant='h4' fontWeight="bold">
              Nothing to see here — yet
            </Typography>
            <Typography variant='body1' sx={{ color: `${theme.palette.text.secondary}` }}>
              From likes to Retweets and a whole lot more, this is where all the action happens.
            </Typography>
          </Box>
        )}
        {tabIndex == 1 && (
          <Box sx={{ width: '340px', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <img src='./img/verification-check.png' styles={{ width: '340px', height: '200px' }} alt='bookmarks' />

            <Typography variant='h4' fontWeight="bold">
              Nothing to see here — yet
            </Typography>
            <Typography variant='body1' sx={{ color: `${theme.palette.text.secondary}` }}>
              From likes to Retweets and a whole lot more, this is where all the action happens.
            </Typography>
          </Box>
        )}
        {tabIndex == 2 && (
          <Box sx={{ width: '340px', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

            <Typography variant='h4' fontWeight="bold">
              Nothing to see here — yet
            </Typography>
            <Typography variant='body1' sx={{ color: `${theme.palette.text.secondary}` }}>
              When someone mentions you, you’ll find it here.
            </Typography>
          </Box>
        )} */}

      {/* </Box> */}

      <NotificationsFollowed user={user} />
      <NotificationsRetweet user={user} notifications={arr} />
      <NotificationsLike user={user} notifications={arr} />
      {/* <Box>
        <Avatar src={user.avatarImgUrl} />
        <Typography variant='body1' >
        <strong style={{textTransform: 'capitalize'}}> {user.fullName} </strong>{user.userTag}
        </Typography>

      </Box> */}



    </Box>
  )
}
