import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountLikes } from 'src/redux/thunk/getCountLikes';
import { likePost } from 'src/redux/thunk/likeTweet';

function PostIconElement({ icon, quantity, color, id }) {
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  // get like quantity
  useEffect(() => {
    if (id !== undefined && id !== '') {
      dispatch(getCountLikes({ id }));
    }
  }, [like]);

  //add like to post
  useEffect(() => {
    if (like && id !== undefined) {
      dispatch(likePost({ id }));
      console.log('added like');
    }
  }, [like, id]);

  return (
    <Box
      onClick={(e) => {
        e.preventDefault();
        setLike(!like);
      }}
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
