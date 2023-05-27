import { useTheme } from '@emotion/react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const ListItemButtonStyled = styled(ListItemButton)((props) => ({
  height: '50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 4px',
}));

export const MainMenuSidebar = ({ navElement }) => {
  const theme = useTheme();

  const ListItemIconStyled = styled(ListItemIcon)((props) => ({
    fontSize: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: `${theme.palette.text.primary}`,
  }));

  return (
    <Link
      to={navElement.route}
      underline="none"
      key={navElement.id}
      component={NavLink}
    >
      <ListItem
        key={navElement.id}
        disablePadding
        sx={{ color: '#FFF', width: '100%' }}
      >
        <ListItemButtonStyled
          sx={{
            '&:hover': {
              backgroundColor: `${theme.palette.background.hover}`,
              borderRadius: { xs: '50%', lg: '30px' },
            },
          }}
        >
          <ListItemIconStyled>
            <navElement.icon sx={{ fontSize: 30 }} />
          </ListItemIconStyled>

          <ListItemText
            primaryTypographyProps={{ fontSize: '18px' }}
            sx={{
              color: `${theme.palette.text.primary}`,
              minWidth: '200px',
              display: { lg: 'block', xs: 'none' },
            }}
            primary={navElement.label}
          />
        </ListItemButtonStyled>
      </ListItem>
    </Link>
  );
};
