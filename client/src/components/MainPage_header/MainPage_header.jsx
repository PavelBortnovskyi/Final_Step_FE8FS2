import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
  const [state, setState] = React.useState({
    left: false,
  });
  const theme = useMode();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };




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
          onClick={toggleDrawer('left', true)} />

{/* start */}
        <SwipeableDrawer
          anchor='left'
          open={state['left']}
          onClose={toggleDrawer('left', false)}
          onOpen={toggleDrawer('left', true)}
          sx={{
            '& .MuiDrawer-paper': {
                backgroundColor: `${theme.palette.background.default}`,
              }
          }}
        >
          <Box
            
            role="presentation"
            onClick={toggleDrawer('left', false)}
            onKeyDown={toggleDrawer('left', false)}
            sx={{ width: '75vw'}}
          >
          <UserInfo/>
            <List>
              {SidebarMobileElements.map((navElement) => (
                <ListItem key={navElement.id} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                    <navElement.icon sx={{ fontSize: 30, color: `${theme.palette.text.primary}`, }} />
                    </ListItemIcon>
                    <ListItemText primary={navElement.label} sx={{color: `${theme.palette.text.primary}`,}}/>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
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
          {/* fin */}
        </SwipeableDrawer>





        {/* ------------- */}
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
