import { Link, NavLink, useLocation } from 'react-router-dom';
import { Box, Container, Grid, ListItemIcon } from '@mui/material';
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

import { CssBaseline, ThemeProvider } from '@mui/material';
import { useMode } from 'src/styles/_materialTheme';
import { mainSidebarElementsMobile } from 'src/components/Sidebar/sidebarElementsMobile';

export const Layout = () => {
  // get Authentication
  const { isAuthenticated } = useSelector(getAuthorizationData);

  // create location for MainRoutes
  const location = useLocation();
  const background = location.state && location.state.background;

  const theme = useMode();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="lg"
        sx={{
          bgcolor: `${theme.palette.background.default}`,
          color: `${theme.palette.text.primary}`,
        }}
      >
        <Grid container>
          <Grid
            item
            sm={2}
            md={3}
            sx={{
              display: { xs: 'none', sm: 'flex' },
              justifyContent: 'end',
            }}
          >
            <Sidebar isAuthenticated={isAuthenticated} />
          </Grid>

          <Grid
            item
            xs={12}
            sm={10}
            md={6}
            sx={{
              borderLeft: `1px solid ${theme.palette.border.main}`,
              borderRight: `1px solid ${theme.palette.border.main}`,
            }}
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
            <RightSection />
          </Grid>
        </Grid>

        <Box
          sx={{
            display: { xs: 'flex', sm: 'none' },
            justifyContent: 'space-around',
            alignItems: 'center',
            position: 'fixed',
            bottom: 0,
            left: 0,
            background: `${theme.palette.background.default}`,
            height: '50px',
            width: '100%',
            zIndex: '10',
          }}
        >
          {mainSidebarElementsMobile.map((navElement) => (
            <Link
              to={navElement.route}
              underline="none"
              key={navElement.id}
              component={NavLink}
            >
              <ListItemIcon
                sx={{
                  fontSize: 30,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: `${theme.palette.text.primary}`,
                  zIndex: '11',
                }}
              >
                <navElement.icon sx={{ fontSize: 30 }} />
              </ListItemIcon>
            </Link>
          ))}
        </Box>

        {!isAuthenticated && <BottomToolbar />}

        {/* routes for modal window */}
        <ModalRoutes />
      </Container>
    </ThemeProvider>
  );
};
