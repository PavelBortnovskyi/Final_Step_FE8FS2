import React from 'react';

import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import PostIconElement from './PostIconElement';
import { Box } from '@mui/material';

function PostIconList() {
  return (
    <Box
      display="flex"
      sx={{ justifyContent: 'space-between', width: '80%', mt: '20px' }}
    >
      <PostIconElement
        icon={<ChatBubbleOutlineOutlinedIcon fontSize="small" />}
        quantity="19"
        color="blue"
      />

      <PostIconElement
        icon={<RepeatOutlinedIcon fontSize="small" />}
        quantity="19"
        color="lightgreen"
      />
      <PostIconElement
        icon={<FavoriteBorderOutlinedIcon fontSize="small" />}
        quantity="19"
        color="red"
      />
      <PostIconElement
        icon={<PublishOutlinedIcon fontSize="small" />}
        quantity="19"
        color="lightblue"
      />
    </Box>
  );
}

export default PostIconList;
