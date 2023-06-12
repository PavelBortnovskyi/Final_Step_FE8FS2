import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { useLocation, useParams, NavLink } from 'react-router-dom';
import { useMode } from 'src/styles/_materialTheme';

export const FollowTabs = () => {
  const theme = useMode();
  const url = useLocation();
  const user = useParams();
  let tab;
  if (url.pathname === `/${user.id}/followings`) {
    tab = '2';
  } else if (url.pathname === `/${user.id}/followers`) {
    tab = '1';
  }
  const [value, setValue] = React.useState(tab);

  const linkToFollowers = `/${user.id}/followers`;
  const linkTofollowings = `/${user.id}/followings`;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: '1px solid rgb(56, 68, 77)' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              component={NavLink}
              to={linkTofollowings}
              label="Following"
              value="2"
              sx={{ width: '50%', color: `${theme.palette.text.primary}` }}
            />
            <Tab
              component={NavLink}
              to={linkToFollowers}
              label="Followers"
              value="1"
              sx={{ width: '50%', color: `${theme.palette.text.primary}` }}
            />
          </TabList>
        </Box>
      </TabContext>
    </Box>
  );
};
