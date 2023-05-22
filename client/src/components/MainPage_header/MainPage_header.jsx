import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Tab, Tabs } from '@mui/material';
import styled from '@emotion/styled';
import { useMode } from 'src/styles/_materialTheme';

const CustomTab = styled(Tab)((props) => ({
  color: '#fff',
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
            paddingTop: '15px',
            pl: '20px',
            fontSize: '20px',
            textDecoration: 'none',
            color: 'rgb(255, 255, 255)',
          }}
        >
          Home
        </Box>
      </NavLink>

      <Tabs value={tabIndex} onChange={handleTabChange}>
        <CustomTab label="For you" />
        <CustomTab label="Following" />
      </Tabs>
    </Box>
  );
}

export default MainPage_header;
