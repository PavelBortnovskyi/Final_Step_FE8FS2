import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Avatar, Tab, Tabs } from '@mui/material';
import styled from '@emotion/styled';
import { useMode } from 'src/styles/_materialTheme';
import { LogoTwitter } from '../Sidebar/LogoTwitter';

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
        zIndex: 1300,
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
        marginTop: '12px',
        alignItems: 'center',
        }}>
      <Avatar src="./img/avatar2.JPG" sx={{marginRight: '35%'}}/>
      <LogoTwitter/>
      </Box>
      

      <Tabs value={tabIndex} onChange={handleTabChange}>
        <CustomTab label="For you" />
        <CustomTab label="Following" />
      </Tabs>
    </Box>
  );
}

export default MainPage_header;
