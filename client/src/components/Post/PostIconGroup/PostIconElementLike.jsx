import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { likePost } from 'src/redux/thunk/tweets/likeTweet';
import { unLikePost } from 'src/redux/thunk/tweets/unlike';

import FavoriteIcon from '@mui/icons-material/Favorite';

function PostIconElementLike({ icon, quantity, color, id, isLiked }) {
  const dispatch = useDispatch();

  const handleLike = () => {
    if (isLiked) {
      dispatch(unLikePost({ id }));
    } else {
      dispatch(likePost({ id }));
    }
  };
  return (
    <Box
      onClick={handleLike}
      display="flex"
      fontSize="15px"
      color={isLiked ? '#f9197f' : ''}
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
      {isLiked ? <FavoriteIcon sx={{ color: '#f9197f' }} /> : icon}
      {quantity}
    </Box>
  );
}

export default PostIconElementLike;
