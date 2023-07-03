import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  ListItemIcon,
  useMediaQuery,
} from '@mui/material';

import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { getAuthorizationData } from 'src/redux/selectors/selectors';
import { Sidebar } from 'src/components/Sidebar/Sidebar';
import { BottomToolbar } from 'src/components/BottomToolbar/BottomToolbar';
import { MainRoutes } from 'src/routes/MainRoutes';
import { ModalRoutes } from 'src/routes/ModalRoutes';

import { RightRoutes } from 'src/routes/RightRoutes';
import { mainSidebarElementsMobile } from 'src/components/SidebarMobile/SidebarMobileElements';
import SmallBtnTweet from 'src/components/Sidebar/SmallBtnTweet/SmallBtnTweet';
import { useMode } from 'src/styles/_materialTheme';

export const Layout = () => {
  // const theme = useTheme();
  const theme = useMode();

  // get Authentication
  const { isAuthenticated } = useSelector(getAuthorizationData);

  // create location for MainRoutes
  const location = useLocation();
  // background from BottomToolbar where state={{ background: location }}
  const background = location.state && location.state.background;

  // get resolution browser window
  const matches = {
    mobile: useMediaQuery(theme.breakpoints.between('xs', 'md')),
    xs: useMediaQuery(theme.breakpoints.between('xs', 'sm')),
    sm: useMediaQuery(theme.breakpoints.between('sm', 'md')),
    md: useMediaQuery(theme.breakpoints.between('md', 'lg')),
    lg: useMediaQuery(theme.breakpoints.between('lg', 'xl')),
    xl: useMediaQuery(theme.breakpoints.up('xl')),
  };

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
            md={2}
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
            sm={9}
            md={6}
            sx={{
              borderLeft: {
                xs: 'none',
                sm: `1px solid ${theme.palette.border.main}`,
              },
              borderRight: {
                xs: 'none',
                sm: `1px solid ${theme.palette.border.main}`,
              },
            }}
          >
            {/* routes for main components */}
            <MainRoutes location={background || location} />
          </Grid>

          <Grid
            item
            md={4}
            sx={{
              display: { xs: 'none', md: 'block' },
            }}
          >
            {/* for chat */}
            <RightRoutes mobile={matches.mobile} />
          </Grid>
        </Grid>

        {isAuthenticated && (
          <Box
            sx={{
              borderTop: `1px solid ${theme.palette.border.main}`,
              display: { xs: 'flex', sm: 'none' },
              justifyContent: 'space-around',
              alignItems: 'center',
              position: 'fixed',
              bottom: 0,
              left: 0,
              // background: `${theme.palette.background.default}`,
              backdropFilter: 'blur(25px)',
              height: '50px',
              width: '100%',
              zIndex: '10',
            }}
          >
            {location.pathname !== '/messages' && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '-84px',
                  right: '28px',
                }}
              >
                <Link
                  to="/modal/tweet"
                  state={{ background: location }}
                  component={NavLink}
                >
                  <SmallBtnTweet />
                </Link>
              </Box>
            )}

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
        )}

        {!isAuthenticated && <BottomToolbar />}

        {/* routes for modal window */}
        <ModalRoutes />
      </Container>
    </ThemeProvider>
  );
};
