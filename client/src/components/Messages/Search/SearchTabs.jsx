// import PropTypes from 'prop-types';
import { Typography, Box, Tab, Tabs, styled, alpha } from '@mui/material';
import { useState } from 'react';
import { TabAll } from './TabAll';
import { TabPeople } from './TabPeople';
import { TabMessages } from './TabMessages';

// ************ STYLE ************
const TabSearch = styled(Tab)(({ theme }) => ({
  color: theme.palette.text.primary,
  transition: 'all 0.3s linear',

  '&:hover': {
    transition: 'all 0.3s linear',
    backgroundColor: alpha(theme.palette.text.primary, 0.1),
    cursor: 'pointer',
  },
}));

const TabHeader = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.border.main}`,
}));
// ************ STYLE ************

// ************ TabPanel ************
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function tabsProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const SearchTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabHeader>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <TabSearch label="All" {...tabsProps(0)} />
          <TabSearch label="People" {...tabsProps(1)} />
          <TabSearch label="Messages" {...tabsProps(2)} />
        </Tabs>
      </TabHeader>
      <TabPanel value={value} index={0}>
        <TabAll />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabPeople />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabMessages />
      </TabPanel>
    </Box>
  );
};
