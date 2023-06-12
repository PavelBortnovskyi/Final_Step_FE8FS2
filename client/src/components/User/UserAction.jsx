import Box from '@mui/material/Box';
// import { UserActionButton } from './UserActionButton';
// import { Tab, Tabs } from '@mui/material';
import React from 'react';
import { TabContext, TabList } from '@mui/lab';
import { Tab } from '@mui/material';
import { useMode } from 'src/styles/_materialTheme';

export function UserAction() {
  const theme = useMode();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: '1px solid rgb(56, 68, 77)' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              // component={NavLink}
              // to={linkTofollowings}
              label="Tweets"
              value="1"
              sx={{ width: '25%', color: `${theme.palette.text.primary}` }}
            />
            <Tab
              // component={NavLink}
              // to={linkToFollowers}
              label="Replise"
              value="2"
              sx={{ width: '25%', color: `${theme.palette.text.primary}` }}
            />
            <Tab
              // component={NavLink}
              // to={linkToFollowers}
              label="Media"
              value="3"
              sx={{ width: '25%', color: `${theme.palette.text.primary}` }}
            />
            <Tab
              // component={NavLink}
              // to={linkToFollowers}
              label="Likes"
              value="4"
              sx={{ width: '25%', color: `${theme.palette.text.primary}` }}
            />
          </TabList>
        </Box>
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
