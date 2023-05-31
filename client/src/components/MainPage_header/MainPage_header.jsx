import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Avatar, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Tab, Tabs, styled } from '@mui/material';
import { useMode } from 'src/styles/_materialTheme';
import { LogoTwitter } from '../Sidebar/LogoTwitter';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { SidebarMobileElements } from './SidebarMobile/SidebarMobileElements';
import { SidebarDropdownMenu } from '../Sidebar/SidebarDropdown/SidebarDropdownMenu';
import PopupState from 'material-ui-popup-state';
import { DropdownBtn } from '../Sidebar/SidebarDropdown/DropdownBtn';
import { selectElements } from '../Sidebar/SidebarDropdown/DropdownElements';
import { DropdownFooterSelect } from '../Sidebar/SidebarDropdown/DropdownFooterSelect';
import { User } from '../User/User';
import { UserInfo } from '../User/UserInfo';
import { UserInformationBlock } from '../User/UserInformationBlock';
import { LogoutButton } from 'src/UI/LogoutButton/LogoutButton';
import { ThemeSwitcher } from 'src/UI/ThemeSwitcher/ThemeSwitcher';
import { SidebarMobile } from '../SidebarMobile/SidebarMobile';

const CustomTab = styled(Tab)((props) => ({
  fontWeight: '800',
  width: '50%',
  textTransform: 'capitalize',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '#b3b3b32b',
  },
}));

function MainPage_header() {
  const [tabIndex, setTabIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const theme = useMode();

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return (
    <Box
      sx={{
        backgroundColor: `${theme.palette.background.default}`,
        backdropFilter: 'blur(6px)',
        width: '100%',
        pb: '2px',
        borderBottom: '1px solid rgb(56, 68, 77)',
        position: 'sticky',
        top: '0',
        // zIndex: 1300,
      }}
    >
      <NavLink to="/">
        <Box
          sx={{
            display: { xs: 'none', sm: 'block' },
            paddingTop: '15px',
            pl: '20px',
            fontSize: '20px',
            textDecoration: 'none',
            color: `${theme.palette.text.primary}`,
          }}
        >
          Home
        </Box>
      </NavLink>
      <Box sx={{
        display: { xs: 'flex', sm: 'none' },
        marginTop: '10px',
        alignItems: 'center',
      }}>
        <Avatar
          src="./img/avatar2.JPG"
          sx={{ marginRight: '35%', marginLeft: '10px' }}
          onClick={() => setIsOpen(true)} />

        {/* start ----------------------------------------------------------*/}
        {/* <SidebarMobile toggleDrawer={toggleDrawer}/> */}


        <SwipeableDrawer
          anchor='left'
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onOpen={() => setIsOpen(true)}
          sx={{
            '& .MuiDrawer-paper': {
              backgroundColor: `${theme.palette.background.default}`,
            }
          }}
        >
          <Box
            role="presentation"
            onClick={() => setIsOpen(false)}
            onKeyDown={() => setIsOpen(false)}
            sx={{ width: '75vw' }}
          >
            <Box sx={{ m: '16px' }}>
              <UserInformationBlock w="40" h="40" mt="0" />
            </Box>

            <List>
              {SidebarMobileElements.map((navElement) => (
                <Link
                  to={navElement.route}
                  underline="none"
                  key={navElement.id}
                  component={NavLink}
                >
                  <ListItem key={navElement.id} disablePadding>
                    <ListItemButton sx={{
                      '&:hover': {
                        backgroundColor: `${theme.palette.background.hover}`,
                        borderRadius: '30px',
                      },
                    }}>
                      <ListItemIcon>
                        <navElement.icon sx={{ fontSize: 30, color: `${theme.palette.text.primary}`, }} />
                      </ListItemIcon>
                      <ListItemText primary={navElement.label} sx={{ color: `${theme.palette.text.primary}`, }} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>

            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '4px 0' }}>
              <LogoutButton />
              <ThemeSwitcher />
            </Box>
            <List sx={{ padding: 0 }}>
              {
                selectElements.map(selectEl => (
                  <DropdownFooterSelect
                    key={selectEl.id}
                    mainLabel={selectEl.label}
                    selects={selectEl.selects}
                  />
                ))
              }
            </List>
          </Box>
        </SwipeableDrawer>




        {/* ------------------------------------------------------ */}
        <LogoTwitter />
      </Box>


      <Tabs value={tabIndex} onChange={handleTabChange}>
        <CustomTab label="For you" />
        <CustomTab label="Following" />
      </Tabs>
    </Box>
  );
}

export default MainPage_header;
