import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';

import React from 'react';
import { Typography } from '@mui/material';

export function NoUserLikes() {
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
