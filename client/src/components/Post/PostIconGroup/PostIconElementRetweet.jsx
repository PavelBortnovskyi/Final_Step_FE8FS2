import { Box } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addRetweet } from 'src/redux/thunk/tweets/addRetweet';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';

export const PostIconElementRetweet = ({
  icon,
  quantity,
  color,
  id,
  isRetweet,
}) => {
  const dispatch = useDispatch();

  const handleRetweet = () => {
    if (isRetweet) {
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
      color={isRetweet ? `${color}` : ''}
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
      {isRetweet ? <RepeatOutlinedIcon color={color} /> : icon}
      {quantity}
    </Box>
  );
};
