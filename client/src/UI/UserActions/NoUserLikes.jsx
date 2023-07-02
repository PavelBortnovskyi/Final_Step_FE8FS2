import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';

import React from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab, Typography } from '@mui/material';
import { useMode } from 'src/styles/_materialTheme';
import { UserLikes } from 'src/pages/UserLikes';
import { UserReplisePage } from 'src/pages/UserReplisePage';
import { UserTweetPage } from 'src/pages/UserTweetPage';
import { useSelector } from 'react-redux';
import LoaderSkeleton from 'src/UI/LoaderSkeleton';

export function NoUserLikes({ idUser, setTabIndex }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: '30px',
      }}
    >
      <Box
        sx={{
          maxWidth: 'calc(300px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            color: `${theme.palette.text.primary}`,
            fontSize: '29px',
            fontWeight: '800',
          }}
        >
          You don’t have any likes yet
        </Typography>
        <Typography
          sx={{
            fontSize: '14px',
            lineHeight: '19px',
            fontWeight: '400',
            color: 'rgb(139, 152, 165)',
          }}
        >
          Tap the heart on any Tweet to show it some love. When you do, it’ll
          show up here.
        </Typography>
      </Box>
    </Box>
  );
}
