import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Avatar, Tab, Tabs, styled } from '@mui/material';
import { useMode } from 'src/styles/_materialTheme';
import { LogoTwitter } from '../Sidebar/LogoTwitter';
import { SidebarMobile } from '../SidebarMobile/SidebarMobile';
import { useSelector } from 'react-redux';

const CustomTab = styled(Tab)((props) => ({
  fontWeight: '800',
  width: '50%',
  textTransform: 'capitalize',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '#b3b3b32b',
  },
}));

function MainPage_header({ tabIndex, setTabIndex }) {
  const user = useSelector((state) => state.user.user) || '';

  const [isOpen, setIsOpen] = useState(false);
  const theme = useMode();

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
    // console.log('in Heder ', tabIndex);
    // console.log('tab is', tab);
  };

  return (
    <Box
      sx={{
        backdropFilter: 'blur(15px)',
        width: '100%',
        pb: '2px',
        position: 'sticky',
        top: '0',
        zIndex: 13,
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
            fontWeight: '700',
          }}
        >
          Home
        </Box>
      </NavLink>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          marginTop: '10px',
          alignItems: 'center',
        }}
      >
        <Avatar
          src={user.avatarImgUrl}
          sx={{ marginRight: '35%', marginLeft: '10px', cursor: 'pointer' }}
          onClick={() => setIsOpen(true)}
        />

        <SidebarMobile isOpen={isOpen} setIsOpen={setIsOpen} />

        <LogoTwitter />
      </Box>

      <Tabs value={tabIndex} onChange={handleTabChange}>
        <CustomTab
          label="For you"
          sx={{ color: `${theme.palette.text.primary}` }}
        />
        <CustomTab
          label="Following"
          sx={{ color: `${theme.palette.text.primary}` }}
        />
      </Tabs>
    </Box>
  );
}

export default MainPage_header;
