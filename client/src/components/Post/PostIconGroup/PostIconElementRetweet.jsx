import { Box } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addRetweet } from 'src/redux/thunk/tweets/addRetweet';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import { deleteTweet } from 'src/redux/thunk/tweets/deleteTweet';

export const PostIconElementRetweet = ({
  icon,
  quantity,
  color,
  id,
  isRetweet,
}) => {
  const dispatch = useDispatch();

  const handleRetweet = () => {
    console.log(isRetweet);
    if (isRetweet) {
      dispatch(deleteTweet({ id }));
      console.log('delete');
      console.log(id);
    } else {
      dispatch(addRetweet({ id }));
      console.log(id);
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
