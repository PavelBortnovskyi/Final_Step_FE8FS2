import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';

import { Sidebar } from 'src/components/Sidebar/Sidebar';
// import { Main } from 'src/components/Main/Main';
import { Footer } from 'src/components/Footer/Footer';

// import { Modal } from 'src/components/Modal/Modal';
import { BottomToolbar } from 'src/components/BottomToolbar/BottomToolbar';
import { MainRoutes } from 'src/routes/MainRoutes';
import { ModalRoutes } from 'src/routes/ModalRoutes';

export const Layout = () => {
  // create location for MainRoutes
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid item xs={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={8} sx={{ border: '1px solid', borderTop: 'none' }}>
              {/* <Main /> */}

              {/* routes for main components */}
              <MainRoutes location={background || location} />
            </Grid>
            <Grid item xs={4}>
              <Footer />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <BottomToolbar />

      {/* routes for modal window */}
      <ModalRoutes />
    </>
  );
};
