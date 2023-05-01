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
        },
      }}
    >
      {/* на весь цей блок потрібно повісити ховер, колір ховера прилітає з пропсів */}
      {icon}
      {quantity}
    </Box>
  );
}

export default PostIconElement;
