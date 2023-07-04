import { Box, ListItemButton, ListItemIcon, styled, useTheme } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom'
import { getChats } from 'src/redux/selectors/selectors';
import ErrorIcon from '@mui/icons-material/Error';


const IconNotificationWrap = styled(Box)`
  position: absolute;
  left: 8px;
  top: -4px;
  & svg {
    font-size: 20px;
  }
`;

const ListItemButtonStyled = styled(ListItemButton)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 4px',
  color: 'rgb(30, 155, 240)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  '& > span': {
    display: 'none',
  },
}));


export const FooterMobileVersion = ({ navElement }) => {
  const theme = useTheme();
  const linkRef = useRef(null);

  // TODO: notification of new message
  const { newMessageNotification } = useSelector(getChats);
  const [isNewMessage, setIsNewMessage] = useState(false);
  const location = useLocation();
  //************************************/

  // TODO: notification badge of new notification\
  const socketNotification = useSelector(state => state.userNotifications.socketNotification);
  const [isNewNotification, setIsNewNotification] = useState(false);
  //************************************/
  // checking if the user has a new chat message
  useEffect(() => {
    if (
      navElement.newMessageNotification &&
      newMessageNotification.length &&
      location.pathname !== `/${navElement.route}`
    ) {
      setIsNewMessage(true);
    } else {
      setIsNewMessage(false);
    }
  }, [
    location.pathname,
    navElement.newMessageNotification,
    navElement.route,
    newMessageNotification, // из редакс
  ]);
  //*****************************************/

  // checking if the user has a new Notification
  useEffect(() => {
    if (
      navElement.newNotificationBadge &&
      socketNotification.length &&
      location.pathname !== `/${navElement.route}`
    ) {
      setIsNewNotification(true);
    } else {
      setIsNewNotification(false);
    }
  }, [
    location.pathname,
    navElement.newNotificationBadge,
    navElement.route,
    socketNotification, // из редакс
  ]);
  //*****************************************/

  return (
    <Link
      to={navElement.route}
      underline="none"
      key={navElement.id}
      component={NavLink}
    >
      <ListItemButtonStyled>
        {isNewMessage && (
          <IconNotificationWrap>
            <ErrorIcon />
          </IconNotificationWrap>
        )}
        {isNewNotification && (
          <IconNotificationWrap>
            <ErrorIcon />
          </IconNotificationWrap>
        )}
        <ListItemIcon
          sx={{
            fontSize: 30,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: `${theme.palette.text.primary}`,
            zIndex: '11',
          }}
        >
          <navElement.icon sx={{ fontSize: 30 }} />
        </ListItemIcon>
      </ListItemButtonStyled>

    </Link>
  )
}
