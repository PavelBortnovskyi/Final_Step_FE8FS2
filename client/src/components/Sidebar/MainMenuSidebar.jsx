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
import { NavLink } from 'react-router-dom';

import { getChats } from 'src/redux/selectors/selectors';

const ListItemButtonStyled = styled(ListItemButton)(({ theme }) => ({
  height: '48px',
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

export const MainMenuSidebar = ({ navElement }) => {
  const theme = useTheme();
  const linkRef = useRef(null);
  const [isSwappedIcon, setIsSwappedIcon] = useState(false);

  // TODO: notification of new message
  // const { newMessageNotification } = useSelector(getChats);
  // const [isNewMessage, setIsNewMessage] = useState(false);
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

  // TODO: checking if the user has a new chat message // polus
  // useEffect(() => {
  //   if (navElement.newMessageNotification && newMessageNotification.length) {
  //     setIsNewMessage(true);
  //   } else {
  //     setIsNewMessage(false);
  //   }
  // }, [navElement.newMessageNotification, newMessageNotification]);
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
          {/* {isNewMessage && <Box>fe</Box>} */}

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
