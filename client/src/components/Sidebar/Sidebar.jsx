import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { mainSidebarElements } from './sidebarElements';
import Link from '@mui/material/Link';
import { Box, styled } from '@mui/material';
import { SidebarFooter } from './SidebarFooter/SidebarFooter';
import { SidebarDropdown } from './SidebarDropdown/SidebarDropdown';
import SmallBtnTweet from './SmallBtnTweet/SmallBtnTweet';
import TweetButton from 'src/UI/TweetButton';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { MainMenuSidebar } from './MainMenuSidebar';
import { LogoTwitter } from './LogoTwitter';

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  position: 'fixed',
  overflow: 'hidden',
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
  alignContent: 'end',
  alignItems: 'end',
  marginBottom: '18px',
  textAlign: 'start',
}));

export const Sidebar = ({ isAuthenticated }) => {
  const location = useLocation();


  const filteredMainSidebarElements = isAuthenticated
    ? mainSidebarElements.filter((button) => button.label !== 'Settings')
    : mainSidebarElements.filter(
      (button) => button.label === 'Explore' || button.label === 'Settings'
    );

  return (
    <DrawerStyled variant="permanent" anchor="left">
      <BoxContainerStyled>
        <Box>
          <LogoTwitter />

          <List
            sx={{ paddingRight: '10px', width: { xs: '58px', lg: '100%' } }}
          >
            {filteredMainSidebarElements.map((navElement) => (
              <MainMenuSidebar navElement={navElement} key={navElement.id} />
            ))}

            {isAuthenticated && (
              <SidebarDropdown isAuthenticated={isAuthenticated} />
            )}
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
          {isAuthenticated && (
            <Link
              to="/modal/tweet"
              state={{ background: location }}
              component={NavLink}
            >
              <SmallBtnTweet />
            </Link>
          )}
        </Box>

        {isAuthenticated && (
          <SidebarFooter />
        )}
      </BoxContainerStyled>

      {/* }  */}
    </DrawerStyled>
  );
};
