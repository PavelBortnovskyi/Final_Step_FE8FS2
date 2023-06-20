import React from 'react';
import { Box } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark } from 'src/redux/thunk/thunkBookmarks/addBookmark';
import { deleteBookmark } from 'src/redux/thunk/thunkBookmarks/deleteBookmark';

function PostElementBookmarks({  icon, quantity, color, id }) {
  const dispatch = useDispatch();
  const userBookmarks = useSelector((state) => state.userBookmarks);

  const isBookmark = userBookmarks.userBookmarks.some((bookmark) => {
    const idToCheck = bookmark.tweet?.id || bookmark.id;
    return idToCheck === id;
  });

  const handleBookmarks = () => {
    if (isBookmark) {
      dispatch(deleteBookmark({ id }));
      console.log('delete');
      
    } else {
      dispatch(addBookmark({ id }));
      console.log('add');
    }
  };
  
  return (
    <Box
    onClick={handleBookmarks}
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
      {isBookmark ? <BookmarkBorderIcon sx={{ color: '#1d9bf0' }} /> : icon}
      {quantity}
    </Box>
  );
}

export default PostElementBookmarks;
