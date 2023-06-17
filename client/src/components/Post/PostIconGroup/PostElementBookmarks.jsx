import React from 'react';
import { Box } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

function PostElementBookmarks({ isBookmarks, icon, quantity, color }) {
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
      {isBookmarks ? <BookmarkBorderIcon sx={{ color: '#1d9bf0' }} /> : icon}
      {quantity}
    </Box>
  );
}

export default PostElementBookmarks;
