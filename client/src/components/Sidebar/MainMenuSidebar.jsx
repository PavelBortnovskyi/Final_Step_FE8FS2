import {
  Box,
  Link,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme,
} from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLoaderData, useLocation } from 'react-router-dom';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import WifiIcon from '@mui/icons-material/Wifi';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ErrorIcon from '@mui/icons-material/Error';

import { getChats } from 'src/redux/selectors/selectors';

const ListItemButtonStyled = styled(ListItemButton)(({ theme }) => ({
  height: '48px',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 4px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  '& > span': {
    display: 'none',
  },
}));

const ListItemIconStyled = styled(ListItemIcon)(({ theme }) => ({
  fontSize: 30,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: `${theme.palette.text.primary}`,
}));

const IconNotificationWrap = styled(Box)`
  position: absolute;
  left: 0px;
  top: 4px;

  & svg {
    font-size: 20px;
  }
`;

export const MainMenuSidebar = ({ navElement }) => {
  const theme = useTheme();
  const linkRef = useRef(null);
  const [isSwappedIcon, setIsSwappedIcon] = useState(false);

  // TODO: notification of new message
  const { newMessageNotification } = useSelector(getChats);
  const [isNewMessage, setIsNewMessage] = useState(false);
  const location = useLocation();
  //************************************/

  const handleMouseDown = (ev) => {
    setIsSwappedIcon(true);
    linkRef.current.click();
  };

  const handleMouseUp = () => {
    setIsSwappedIcon(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsSwappedIcon(!isSwappedIcon);
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsSwappedIcon(!isSwappedIcon);
    }
  };

  //*******************************************/
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
    newMessageNotification,
  ]);
  //*****************************************/

  return (
    <Link
      to={navElement.route}
      underline="none"
      key={navElement.id}
      component={NavLink}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      ref={linkRef}
    >
      <ListItem
        key={navElement.id}
        disablePadding
        sx={{
          width: '100%',
          borderRadius: '100px',
          '&:hover': {
            backgroundColor: `${theme.palette.background.hover}`,
            borderRadius: { xs: '50%', lg: '30px' },
          },
        }}
      >
        <ListItemButtonStyled>
          {isNewMessage && (
            <IconNotificationWrap>
              <ErrorIcon />
            </IconNotificationWrap>
          )}

          <ListItemIconStyled>
            {isSwappedIcon ? (
              <navElement.iconActive sx={{ fontSize: 30 }} />
            ) : (
              <navElement.icon sx={{ fontSize: 30 }} />
            )}
          </ListItemIconStyled>

          <ListItemText
            primaryTypographyProps={{ fontSize: '18px', fontWeight: 'bold' }}
            sx={{
              color: `${theme.palette.text.primary}`,
              minWidth: '130px',
              display: { lg: 'block', xs: 'none' },
            }}
            primary={navElement.label}
          />
        </ListItemButtonStyled>
      </ListItem>
    </Link>
  );
};
