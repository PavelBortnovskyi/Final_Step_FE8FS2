import { Box } from '@mui/material';
import React from 'react';

function PostIconElement({ icon, quantity, color }) {
  return (
    <Box
      display="flex"
      sx={{
        gap: '10px',
        '&:hover': {
          color: { color },
          cursor: 'pointer',
          '.MuiSvgIcon-root': {
            fill: color,
          },
        },
      }}
    >
      {icon}
      {quantity}
    </Box>
  );
}

export default PostIconElement;
