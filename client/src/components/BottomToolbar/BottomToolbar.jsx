import {
  AppBar,
  Grid,
  Toolbar,
  Button,
  Typography,
  Link,
  styled,
} from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

const StyledTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: '11px',
    fontWeight: 'normal',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const StyledTypographyTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  [theme.breakpoints.down('md')]: {
    fontSize: '20px',
    fontWeight: 'normal',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

export const BottomToolbar = () => {
  const location = useLocation();
  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <Grid container spacing={1}>
          <Grid item xs={0} sm={2} md={2} lg={3}></Grid>
          <Grid item xs={0} sm={6} md={5} lg={5}>
            <StyledTypographyTitle variant="h5">
              Stay up to date
            </StyledTypographyTitle>
            <StyledTypography variant="span">
              Chatter users are the first to know the news
            </StyledTypography>
          </Grid>
          <Grid
            item
            xs={11}
            sm={4}
            md={5}
            lg={4}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              gap: '10px',
            }}
          >
            <Link
              component={NavLink}
              to="/modal/login"
              state={{ background: location }}
              color="inherit"
              underline="none"
            >
              <Button
                variant="outlined"
                color="transparent"
                sx={{ whiteSpace: 'nowrap' }}
              >
                Log in
              </Button>
            </Link>
            <Link
              component={NavLink}
              to="/modal/registration"
              state={{ background: location }}
              color="inherit"
              underline="none"
            >
              <Button
                variant="outlined"
                color="gray"
                sx={{ whiteSpace: 'nowrap' }}
              >
                Sign up
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
