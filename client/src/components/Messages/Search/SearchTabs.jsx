// import PropTypes from 'prop-types';
import { Typography, Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { TabAll } from './TabAll';
import { TabPeople } from './TabPeople';
import { TabMessages } from './TabMessages';

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

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
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          // custom props 'colorTheme' in style file - /src/styles/_materialTheme.js
          settheme="dark"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="All" {...tabsProps(0)} />
          <Tab label="People" {...tabsProps(1)} />
          <Tab label="Messages" {...tabsProps(2)} />
        </Tabs>
      </Box>
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
