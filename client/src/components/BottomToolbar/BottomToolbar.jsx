import { AppBar, Grid, Toolbar, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

import styles from 'src/styles/BottomToolbar.module.scss';

export const BottomToolbar = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <Grid container spacing={1}>
          <Grid item xs={0} md={3}></Grid>
          <Grid item xs={6} md={5}>
            <div className={styles.title}>Stay up to date</div>
            <div>Chatter users are the first to know the news</div>
          </Grid>
          <Grid
            item
            xs={5}
            md={4}
            sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <Button variant="outlined" color="transparent">
              <NavLink className={styles.whiteLink} to="/login">
                Log in
              </NavLink>
            </Button>
            <Button variant="outlined" color="gray">
              <NavLink className={styles.darkLink} to="/registration">
                Sign up
              </NavLink>
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
