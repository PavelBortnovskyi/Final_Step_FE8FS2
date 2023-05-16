import { useLocation } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import { useSelector } from 'react-redux';

import { getAuthorizationData } from 'src/redux/selectors/selectors';
import { Sidebar } from 'src/components/Sidebar/Sidebar';
import { RightSection } from 'src/components/RightSection/RightSection';
import { BottomToolbar } from 'src/components/BottomToolbar/BottomToolbar';
import { MainRoutes } from 'src/routes/MainRoutes';
import { ModalRoutes } from 'src/routes/ModalRoutes';
import { TempBottomToolbar } from 'src/components/BottomToolbar/TempBottomToolbar';
// import { Main } from 'src/components/Main/Main';
// import { Modal } from 'src/components/Modal/Modal';

export const Layout = () => {
  // get Authentication
  const { isAuthenticated } = useSelector(getAuthorizationData);
  console.log('auth', isAuthenticated);

  // create location for MainRoutes
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <Container
      maxWidth="lg"
      sx={{
        backgroundColor: 'rgb(21,32,43)',
        color: '#FFF',
      }}
    >
      <Grid container>
        <Grid
          item
          sm={2}
          md={3}
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Sidebar isAuthenticated={isAuthenticated} />
        </Grid>

        <Grid
          item
          xs={12}
          sm={10}
          md={6}
          sx={{ borderLeft: '1px solid #333', borderRight: '1px solid #333' }}
        >
          {/* <Main /> */}

          {/* routes for main components */}
          <MainRoutes location={background || location} />
        </Grid>

        <Grid
          item
          md={3}
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        >
          <RightSection isAuthenticated={isAuthenticated} />
        </Grid>
      </Grid>

      {isAuthenticated ? <TempBottomToolbar /> : <BottomToolbar />}

      {/* routes for modal window */}
      <ModalRoutes />
    </Container>
  );
};
