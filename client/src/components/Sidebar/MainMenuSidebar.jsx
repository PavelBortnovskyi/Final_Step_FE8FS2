import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme,
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

const ListItemIconStyled = styled(ListItemIcon)(({ theme }) => ({
  fontSize: 30,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: `${theme.palette.text.primary}`,
}));

export const MainMenuSidebar = ({ navElement }) => {
  const theme = useTheme();

  return (
    <Link
      to={navElement.route}
      underline="none"
      key={navElement.id}
      component={NavLink}
    >
      <ListItem key={navElement.id} disablePadding sx={{ width: '100%' }}>
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
