// import PropTypes from 'prop-types';
import { Box, Tab, Tabs, styled, alpha } from '@mui/material';
import ContactEmergencyOutlinedIcon from '@mui/icons-material/ContactEmergencyOutlined';
import MarkUnreadChatAltOutlinedIcon from '@mui/icons-material/MarkUnreadChatAltOutlined';
import { useState } from 'react';

import { TabContacts } from './TabContacts';
import { TabChats } from './_temp_TabChats';

// ************ STYLE ************
const TabSearch = styled(Tab)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 'bold',
  transition: 'all 0.3s linear',
  flexDirection: 'row',
  gap: '6px',

  '&:hover': {
    transition: 'all 0.3s linear',
    backgroundColor: alpha(theme.palette.text.primary, 0.1),
    cursor: 'pointer',
  },

  '& .MuiTab-iconWrapper': {
    marginBottom: '2px',
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

// ************ ConversationTabs ************
export const ConversationTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', marginTop: '20px' }}>
      <TabHeader>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <TabSearch
            icon={<ContactEmergencyOutlinedIcon />}
            label="Contacts"
            {...tabsProps(0)}
          />
          <TabSearch
            icon={<MarkUnreadChatAltOutlinedIcon />}
            label="Chats"
            {...tabsProps(1)}
          />
        </Tabs>
      </TabHeader>
      <TabPanel value={value} index={0}>
        <TabContacts />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <TabChats /> */}
        under construction
      </TabPanel>
    </Box>
  );
};
