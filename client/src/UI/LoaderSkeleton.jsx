import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { Typography } from '@mui/material';

const Image = styled('img')({
  width: '100%',
});

function LoaderSkeleton() {
  return (
    <>
      <Box sx={{ padding: '20px', width:'100%',}}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ margin: 1 }}>
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
          </Box>
          <Box sx={{ width: '40%' }}>
            <Skeleton width="100%"></Skeleton>
          </Box>
        </Box>
        <Skeleton variant="rectangular" width="100%">
          <div style={{ paddingTop: '57%' }} />
        </Skeleton>
        <Box>
          <Skeleton height="40px" width="100%"></Skeleton>
        </Box>
      </Box>
      <Box sx={{ padding: '20px', width:'100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ margin: 1 }}>
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
          </Box>
          <Box sx={{ width: '40%' }}>
            <Skeleton width="100%"></Skeleton>
          </Box>
        </Box>
        <Skeleton variant="rectangular" width="100%">
          <div style={{ paddingTop: '57%' }} />
        </Skeleton>
        <Box>
          <Skeleton height="40px" width="100%"></Skeleton>
        </Box>
      </Box>
      <Box sx={{ padding: '20px', width:'100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ margin: 1 }}>
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
          </Box>
          <Box sx={{ width: '40%' }}>
            <Skeleton width="100%"></Skeleton>
          </Box>
        </Box>
        <Skeleton variant="rectangular" width="100%">
          <div style={{ paddingTop: '57%' }} />
        </Skeleton>
        <Box>
          <Skeleton height="40px" width="100%"></Skeleton>
        </Box>
      </Box>
    </>
  );
}

export default LoaderSkeleton;
