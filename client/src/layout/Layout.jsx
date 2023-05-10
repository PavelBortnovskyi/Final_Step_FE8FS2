import { useLocation } from 'react-router-dom';
import { Container, Grid } from '@mui/material';

import { Sidebar } from 'src/components/Sidebar/Sidebar';
// import { Main } from 'src/components/Main/Main';
import { Footer } from 'src/components/AppBar/AppBar';

// import { Modal } from 'src/components/Modal/Modal';
import { BottomToolbar } from 'src/components/BottomToolbar/BottomToolbar';
import { MainRoutes } from 'src/routes/MainRoutes';
import { ModalRoutes } from 'src/routes/ModalRoutes';

export const Layout = () => {
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
          <Sidebar />
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
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
          <Footer />
        </Grid>
      </Grid>
      <BottomToolbar />

      {/* routes for modal window */}
      <ModalRoutes />
    </Container>
  );
};
