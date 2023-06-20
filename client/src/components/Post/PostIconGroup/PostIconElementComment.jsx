import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSingleTweet } from 'src/redux/selectors/selectors';
import { getTweetByIdThunk } from 'src/redux/thunk/tweets/getTweetById';

import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useMode } from 'src/styles/_materialTheme';

function PostIconElementComment({ quantity, color, id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isModalOpen) {
      dispatch(getTweetByIdThunk(id));
    }
  }, [isModalOpen]);

  const tweet = useSelector(getSingleTweet);
  const post = tweet.singleTweet;
  const theme = useMode();
  return (
    <Box
      onClick={() => setIsModalOpen(!isModalOpen)}
      display="flex"
      sx={{
        color: `${theme.palette.text.primary}`,
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
      <ChatBubbleOutlineOutlinedIcon fontSize="small" />
      {quantity}
    </Box>
  );
}

export default PostIconElementComment;
