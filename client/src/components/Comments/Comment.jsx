import { Avatar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Post from '../Post/Post';

function Comment(props) {
  return (
    <Box>
      {/* src gonna take from props
      <Avatar src="./img/avatar.JPG" /> */}

      <Post
        displayName="Artem Shevchuk"
        logo='./img/avatar.JPG" '
        username="Jocellyn Flores"
        verified={false}
        text="This glorious backpack has been on many adventures now. It is comfortable, holds a ton which the/a packing cube to increase this. Honestly it is surprising how much it holds. I’m also not the gentlest with my backpacks and this one has help up.."
      />
    </Box>
  );
}

export default Comment;
