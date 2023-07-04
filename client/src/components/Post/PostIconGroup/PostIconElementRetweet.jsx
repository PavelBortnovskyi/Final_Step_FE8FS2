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
    dispatch(addRetweet({ id }));
  };

  return (
    <Box
      onClick={handleRetweet}
      display="flex"
      fontSize="15px"
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
