
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { mainSidebarElemets } from './sidebarElemets';
import Link from '@mui/material/Link';
import { Box, styled } from '@mui/material';
import { SidebarFooter } from './SidebarFooter/SidebarFooter';
import { SidebarDropdown } from './SidebarDropdown/SidebarDropdown';
import SmallBtnTweet from './SmallBtnTweet/SmallBtnTweet';
import TweetButton from 'src/UI/TweetButton';
import { NavLink, useLocation } from 'react-router-dom';
import { MainMenuSidebar } from './MainMenuSidebar';
import { LogoTwitter } from './LogoTwitter';




export const Sidebar = (/*{isAuthenticated}*/) => {
  const location = useLocation();
  const isAuthenticated = true;  // удалить как будет готова аутентефикация


  const DrawerStyled = styled(Drawer)((props) => ({
    position: 'sticky',
    top: 0,
    zIndex: 10,
    flexShrink: 0,
    // marginRight: '12px',
    paddingRight: '10px',
    width: '100%',
    height: '100vh',
    '& .MuiDrawer-paper': {
      position: 'relative',
      width: '100%',
      border: 'none',
      boxSizing: 'border-box',
      backgroundColor: 'rgb(21,32,43)',
    },
  }))

  const BoxContainerStyled = styled(Box)((props) => ({
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'end',
    // alignItems: {xs: 'end', lg: 'start'},
    marginBottom: '18px',
    textAlign: 'start',
    // mx: '10px',
    // width: '100%', // Добавлено для изменения ширины на маленьких экранах
    //       '@media (min-width: 501px)': { // Медиазапрос для ширины экрана больше 500 пикселей
    //         // width: '50px',
    //         height: '50px',
    //       },
  }))



  const filteredMainSidebarElemets = isAuthenticated
    ? mainSidebarElemets
    : mainSidebarElemets.filter((button) => button.label === 'Explore' || button.label === 'Settings');


  return (
    <DrawerStyled variant="permanent" anchor="left">
      <BoxContainerStyled>
        <Box>
          <LogoTwitter/>

          <List sx={{ width: { xs: '50px', lg: '100%' } }}>
            {filteredMainSidebarElemets.map((navElement) => (
              <MainMenuSidebar navElement={navElement} />
            ))}

            {
              isAuthenticated && <SidebarDropdown />
            }
          </List>

          {
            isAuthenticated && 
            <Box sx={{ marginTop: '20px', marginLeft: '10px', display: { lg: 'block', xs: 'none' } }}>
              <Link to="/modal/tweet" state={{ background: location }} component={NavLink}>
                <TweetButton text="Tweet" w="230" h="50" fw="800" isDisabled={false} />
              </Link>
            </Box>
          }
          {
            isAuthenticated && <SmallBtnTweet />
          }
        </Box>

        {
          isAuthenticated && <SidebarFooter displayName="Алексей SlaAll00" username="slaall00" />
        }
      </BoxContainerStyled>
    </DrawerStyled>
  );
};
