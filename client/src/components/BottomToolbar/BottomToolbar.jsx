import { AppBar, Grid, Toolbar, Button, Typography, Link } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

export const BottomToolbar = () => {
  const location = useLocation();
  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <Grid container spacing={1}>
          <Grid item xs={0} md={3}></Grid>
          <Grid item xs={6} md={5}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Stay up to date
            </Typography>
            <Typography variant="span">
              Chatter users are the first to know the news
            </Typography>
          </Grid>
          <Grid
            item
            xs={5}
            md={4}
            sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <Button variant="outlined" color="transparent">
              <Link
                component={NavLink}
                to="/modal/login"
                state={{ background: location }}
                color="inherit"
                underline="none"
              >
                Log in
              </Link>
            </Button>
            <Button variant="outlined" color="gray">
              <Link
                component={NavLink}
                to="/modal/registration"
                state={{ background: location }}
                color="inherit"
                underline="none"
              >
                Sign up
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
