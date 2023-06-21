import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTweetByID} from 'src/redux/selectors/selectors';

// import { getTweetById } from 'src/redux/thunk/tweets/getTweetById';

import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useMode } from 'src/styles/_materialTheme';

function PostIconElementComment({ quantity, color, id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
console.log(`isModalOpen  ` + isModalOpen);
  useEffect(() => {
    console.log('effect');
    if (isModalOpen) {
      console.log(id);
      dispatch(getTweetByID(id));
    }
  }, [isModalOpen]);

  // const add = () => {
  //   dispatch(getTweetById(id));
  // }

// console.log(id);
  const theme = useMode();
  return (
    <Box
      onClick={() => setIsModalOpen(true)
        }
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
