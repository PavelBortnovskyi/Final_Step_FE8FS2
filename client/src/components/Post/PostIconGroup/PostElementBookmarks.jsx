import React from 'react';
import { Box } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark } from 'src/redux/thunk/thunkBookmarks/addBookmark';
import { deleteBookmark } from 'src/redux/thunk/thunkBookmarks/deleteBookmark';

function PostElementBookmarks({ icon, quantity, color, id, isBookmarks }) {
  const dispatch = useDispatch();

  const handleBookmarks = () => {
    if (isBookmarks) {
      dispatch(deleteBookmark({ id }));
    } else {
      dispatch(addBookmark({ id }));
    }
  };

  return (
    <Box
      onClick={handleBookmarks}
      display="flex"
      color={isBookmarks ? `${color}` : ''}
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
