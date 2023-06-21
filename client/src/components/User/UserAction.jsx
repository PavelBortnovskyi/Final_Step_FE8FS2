import Box from '@mui/material/Box';

import React from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { useMode } from 'src/styles/_materialTheme';
import { UserLikes } from 'src/pages/UserLikes';
import { UserReplisePage } from 'src/pages/UserReplisePage';
import { UserTweetPage } from 'src/pages/UserTweetPage';

export function UserAction({ idUser }) {
  const theme = useMode();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ borderBottom: `1px solid ${theme.palette.border.main}` }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: `1px solid ${theme.palette.border.main}` }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              label="Tweets"
              value="1"
              sx={{ width: '33.33%', color: `${theme.palette.text.primary}` }}
            />
            <Tab
              label="Replise"
              value="2"
              sx={{ width: '33.33%', color: `${theme.palette.text.primary}` }}
            />

            <Tab
              label="Likes"
              value="3"
              sx={{ width: '33.33%', color: `${theme.palette.text.primary}` }}
            />
          </TabList>
        </Box>
        <TabPanel sx={{ padding: '0', minHeight: '100vh' }} value="1">
          <UserTweetPage idUser={idUser} />
        </TabPanel>
        <TabPanel sx={{ padding: '0', minHeight: '100vh' }} value="2">
          <UserReplisePage />
        </TabPanel>
        <TabPanel sx={{ padding: '0', minHeight: '100vh' }} value="3">
          <UserLikes />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
