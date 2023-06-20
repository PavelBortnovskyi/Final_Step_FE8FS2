import Box from '@mui/material/Box';

// import { UserActionButton } from './UserActionButton';
// import { Tab, Tabs } from '@mui/material';
import React from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { useMode } from 'src/styles/_materialTheme';
import { UserLikes } from 'src/pages/UserLikes';
import PostList from '../Post/PostList';
import { UserReplise } from 'src/pages/UserReplise';
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
              // component={NavLink}
              // to={linkTofollowings}
              label="Tweets"
              value="1"
              sx={{ width: '33.33%', color: `${theme.palette.text.primary}` }}
            />
            <Tab
              // component={NavLink}
              // to={linkToFollowers}
              label="Replise"
              value="2"
              sx={{ width: '33.33%', color: `${theme.palette.text.primary}` }}
            />
            {/* <Tab
              // component={NavLink}
              // to={linkToFollowers}
              label="Media"
              value="3"
              sx={{ width: '25%', color: `${theme.palette.text.primary}` }}
            /> */}
            <Tab
              // component={NavLink}
              // to={linkToFollowers}
              label="Likes"
              value="3"
              sx={{ width: '33.33%', color: `${theme.palette.text.primary}` }}
            />
          </TabList>
        </Box>
        <TabPanel sx={{ padding: '0' }} value="1">
          <UserTweetPage idUser={idUser} />
        </TabPanel>
        <TabPanel sx={{ padding: '0' }} value="2">
          <UserReplise />
        </TabPanel>
        <TabPanel sx={{ padding: '0' }} value="3">
          <UserLikes />
        </TabPanel>
      </TabContext>
    </Box>
    // <Box>
    //   <Box
    //     sx={{
    //       "& button": {
    //         padding: "15px",
    //         width: "25%",
    //         borderRadius: "0",
    //         color: "rgb(139, 152, 165)",
    //         "&:hover": {
    //           backgroundColor: "#b3b3b32b",
    //         },
    //       },
    //     }}
    //   >
    //     <UserActionButton textButton="Tweets" />
    //     <UserActionButton textButton="Replise" />
    //     <UserActionButton textButton="Media" />
    //     <UserActionButton textButton="Likes" />
    //   </Box>
    // </Box>
  );
}
