import React from 'react';

import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import PostIconElement from './PostIconElement';
import { Box } from '@mui/material';

function PostIconList({ likes, reply, retweet, id }) {
  return (
    <Box
      display="flex"
      sx={{ justifyContent: 'space-between', mt: '20px', width: '90%' }}
    >
      <PostIconElement
        icon={<ChatBubbleOutlineOutlinedIcon fontSize="small" />}
        quantity="19"
        color="blue"
      />

      <PostIconElement
        icon={<RepeatOutlinedIcon fontSize="small" />}
        quantity={retweet}
        color="lightgreen"
      />
      <PostIconElement
        icon={<FavoriteBorderOutlinedIcon fontSize="small" />}
        quantity={likes}
        color="red"
        id={id}
      />
      <PostIconElement
        icon={<PublishOutlinedIcon fontSize="small" />}
        quantity={reply}
        color="lightblue"
      />
    </Box>
  );
}

export default PostIconList;
