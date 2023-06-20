import { Box } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addQuote } from 'src/redux/thunk/addQuote';


export const PostElementQuote = ({icon, quantity, color, id}) => {

  const dispatch = useDispatch();

  const handleQuote = () => {
    if (false) {
      // dispatch(deleteBookmark({ id }));
      console.log('delete');

    } else {
      dispatch(addQuote({ id }));
      console.log('add');
    }
  };

  return (
    <Box
    onClick={handleQuote}
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
  )
}
