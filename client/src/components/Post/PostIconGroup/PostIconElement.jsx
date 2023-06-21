import { Box } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addRetweet } from 'src/redux/thunk/tweets/addRetweet';


function PostIconElement({ icon, quantity, color, id }) {
  const dispatch = useDispatch();

  const handleRetweet = () => {
    if (false) {
      // dispatch(deleteBookmark({ id }));
      console.log('delete');

    } else {
      dispatch(addRetweet({ id }));
      console.log('add');
    }
  };

  return (
    <Box
    onClick={handleRetweet}
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
