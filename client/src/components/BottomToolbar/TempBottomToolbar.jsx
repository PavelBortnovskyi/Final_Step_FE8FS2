import {
  AppBar,
  Grid,
  Toolbar,
  Button,
  Typography,
  Link,
  Switch,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { LogoutButton } from 'src/UI/LogoutButton/LogoutButton';
import { ThemeSwitcher } from 'src/UI/ThemeSwitcher/ThemeSwitcher';

export const TempBottomToolbar = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <Grid container spacing={1}>
          <Grid item xs={0} md={3}></Grid>
          <Grid item xs={6} md={5}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              You are logged in
            </Typography>
          </Grid>
          <Grid
            item
            xs={5}
            md={4}
            sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <LogoutButton />
            <ThemeSwitcher />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
