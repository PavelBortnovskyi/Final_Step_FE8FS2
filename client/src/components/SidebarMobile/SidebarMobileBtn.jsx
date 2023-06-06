import { ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';

export const SidebarMobileBtn = ({navElement}) => {
  const [isSwappedIcon, setIsSwappedIcon] = useState(false);
  const theme = useTheme();

  const handleMouseDown = () => {
    setIsSwappedIcon(true);
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
            >
              <ListItem key={navElement.id} disablePadding>
                <ListItemButton sx={{
                  '&:hover': {
                    backgroundColor: `${theme.palette.background.hover}`,
                    borderRadius: '30px',
                  },
                  '& > span': {
                    display: 'none',
                  }
                }}>
                  <ListItemIcon>
                    {
                      isSwappedIcon ?
                        <navElement.iconActive sx={{ fontSize: 30, color: `${theme.palette.text.primary}`, }} />
                        :
                        <navElement.icon sx={{ fontSize: 30, color: `${theme.palette.text.primary}`, }} />
                    }

                  </ListItemIcon>
                  <ListItemText primary={navElement.label} sx={{ color: `${theme.palette.text.primary}`, }} />
                </ListItemButton>
              </ListItem>
            </Link>
  )
}
