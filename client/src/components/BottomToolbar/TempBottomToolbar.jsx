import { AppBar, Grid, Toolbar, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { LogoutButton } from 'src/UI/LogoutButton/LogoutButton';
import { ThemeSwitcher } from 'src/UI/ThemeSwitcher/ThemeSwitcher';
import { useDispatch } from 'react-redux';
import { getUser } from 'src/redux/thunk/getUser';

export const TempBottomToolbar = () => {
  const dispatch = useDispatch();

  const handleGetUser = () => {
    dispatch(getUser());
  };

  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <Grid container spacing={1}>
          <Grid item xs={0} md={3}></Grid>
          <Grid item xs={6} md={5}>
            {/* <NavLink to="/user">user</NavLink>|
            <NavLink to="/tweet">tweet</NavLink>|
            <NavLink to="/messages">messages</NavLink> */}
            <Button color="gray" onClick={handleGetUser}>
              GetUser
            </Button>
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
