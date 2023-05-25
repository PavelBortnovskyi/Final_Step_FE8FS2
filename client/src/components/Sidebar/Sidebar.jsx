import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { mainSidebarElements } from './sidebarElements';
import Link from '@mui/material/Link';
import { Box, Typography, styled } from '@mui/material';
import { SidebarFooter } from './SidebarFooter/SidebarFooter';
import { SidebarDropdown } from './SidebarDropdown/SidebarDropdown';
import SmallBtnTweet from './SmallBtnTweet/SmallBtnTweet';
import TweetButton from 'src/UI/TweetButton';
import { NavLink, useLocation } from 'react-router-dom';
import { MainMenuSidebar } from './MainMenuSidebar';
import { LogoTwitter } from './LogoTwitter';
import { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';

export const Sidebar = (/*{isAuthenticated}*/) => {
  const theme = useTheme();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  // console.log(isMobile);

  const isAuthenticated = true; // удалить как будет готова аутентефикация

  const DrawerStyled = styled(Drawer)((props) => ({
    position: 'sticky',
    top: isMobile ? 0 : 'auto',
    bottom: isMobile ? 'auto' : 0,
    // left: 0,
    // right: 0,
    zIndex: 10,
    flexShrink: 0,
    paddingRight: '10px',
    width: '100',
    height: '100vh',
    '& .MuiDrawer-paper': {
      position: 'relative',
      width: '100%',
      border: 'none',
      boxSizing: 'border-box',
      backgroundColor: `${theme.palette.background.default}`,
    },
  }));

  const BoxContainerStyled = styled(Box)((props) => ({
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'end',
    marginBottom: '18px',
    textAlign: 'start',
  }));

  const filteredMainSidebarElements = isAuthenticated
    ? mainSidebarElements.filter((button) => button.label !== 'Settings')
    : mainSidebarElements.filter(
        (button) => button.label === 'Explore' || button.label === 'Settings'
      );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <DrawerStyled variant="permanent" anchor={isMobile ? 'bottom' : 'top'}>
      {/* {
      isMobile ? 
      <Box 
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100vw',
        height: '100px',
      }}
      >
        <Typography variant="subtitle1" gutterBottom>
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur
      </Typography>
      </Box> 
      :  */}
      <BoxContainerStyled>
        <Box>
          <LogoTwitter />

          <List
            sx={{ paddingRight: '10px', width: { xs: '58px', lg: '100%' } }}
          >
            {filteredMainSidebarElements.map((navElement) => (
              <MainMenuSidebar navElement={navElement} key={navElement.id} />
            ))}

            {isAuthenticated && <SidebarDropdown />}
          </List>

          {isAuthenticated && (
            <Box
              sx={{
                marginTop: '20px',
                marginLeft: '10px',
                display: { lg: 'block', xs: 'none' },
              }}
            >
              <Link
                to="/modal/tweet"
                state={{ background: location }}
                component={NavLink}
              >
                <TweetButton
                  text="Tweet"
                  w="230"
                  h="50"
                  fw="800"
                  isDisabled={false}
                />
              </Link>
            </Box>
          )}
          {isAuthenticated && <SmallBtnTweet />}
        </Box>

        {isAuthenticated && (
          <SidebarFooter displayName="Алексей SlaAll00" username="slaall00" />
        )}
      </BoxContainerStyled>

      {/* }  */}
    </DrawerStyled>
  );
};
