import React from 'react';

import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import PostIconElement from './PostIconElement';
import PostIconElementLike from './PostIconElementLike';
import PostIconElementComment from './PostIconElementComment';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { Box } from '@mui/material';
import { useMode } from 'src/styles/_materialTheme';

function PostIconList({ likes, reply, retweet, id }) {
  const location = useLocation();
  const theme = useMode();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '90%',
        color: `${theme.palette.text.primary}`,
      }}
    >
      <Link
        to="/modal/comment"
        state={{ background: location }}
        component={NavLink}
      >
        <PostIconElementComment quantity={retweet} color="#72bcd4" id={id} />
      </Link>

      <PostIconElement
        icon={<RepeatOutlinedIcon fontSize="small" />}
        quantity="19"
        color="lightgreen"
      />

      <PostIconElementLike
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
