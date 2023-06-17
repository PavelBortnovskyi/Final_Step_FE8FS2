import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { likePost } from 'src/redux/thunk/likeTweet';
import { unLikePost } from 'src/redux/thunk/unlike';

import FavoriteIcon from '@mui/icons-material/Favorite';
import { getLikedTweet } from 'src/redux/selectors/selectors';

function PostIconElementLike({ icon, quantity, color, id, isLiked }) {
  const dispatch = useDispatch();
  const [isLikedTweet, setIsLikedTweet] = useState(isLiked || false);

  const handleLike = () => {
    if (isLiked) {
      dispatch(unLikePost({ id }));
      console.log('unLiked');
      setIsLikedTweet(false);
    } else {
      dispatch(likePost({ id }));
      console.log('Liked');
      setIsLikedTweet(true);
    }
  };

  // const likedTweet = useSelector(getLikedTweet());
  return (
    <Box
      onClick={handleLike}
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
      {isLiked ? <FavoriteIcon sx={{ color: '#f9197f' }} /> : icon}
      {quantity}
    </Box>
  );
}

export default PostIconElementLike;
