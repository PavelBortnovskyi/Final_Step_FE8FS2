import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTweetByID } from 'src/redux/selectors/selectors';
import { getTweetById } from 'src/redux/thunk/tweets/getTweetById';

import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useMode } from 'src/styles/_materialTheme';
import { addReplay } from 'src/redux/thunk/addReplay';

function PostIconElementComment({ quantity, color, id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isModalOpen) {
      dispatch(getTweetById(id));
    }
  }, [isModalOpen]);


  const handleReplay = () => {
    if (false) {
      // dispatch(deleteBookmark({ id }));
      console.log('delete');

    } else {
      dispatch(addReplay({ id }));
      console.log('add');
    }
  };

  const tweet = useSelector(getTweetByID);
  const post = tweet.tweet;
  const theme = useMode();
  return (
    <Box
      onClick={() => {
        setIsModalOpen(!isModalOpen);
        handleReplay();
      }}
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
