import React from 'react';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import PostIconElement from './PostIconElement';
import PostIconElementLike from './PostIconElementLike';
import PostIconElementComment from './PostIconElementComment';
import { NavLink, useLocation } from 'react-router-dom';

import { Box } from '@mui/material';
import { useMode } from 'src/styles/_materialTheme';
import PostElementBookmarks from './PostElementBookmarks';

function PostIconList({ likes, reply, retweet, id, isLiked }) {
  const location = useLocation();
  const theme = useMode();
  return (
    <Box
      sx={{
        mt: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        width: '90%',
        color: `${theme.palette.text.primary}`,
      }}
    >
      <NavLink
        to="/modal/comment"
        state={{ background: location }}
        component={NavLink}
      >
        <PostIconElementComment quantity={retweet} color="#72bcd4" id={id} />
      </NavLink>
      <PostIconElement
        icon={<RepeatOutlinedIcon fontSize="small" />}
        quantity={retweet}
        color="lightgreen"
      />

      <PostIconElementLike
        icon={<FavoriteBorderOutlinedIcon fontSize="small" />}
        quantity={likes}
        color="red"
        id={id}
        isLiked={isLiked}
      />
      <PostIconElement
        icon={<PublishOutlinedIcon fontSize="small" />}
        quantity={reply}
        color="lightblue"
      />
      <PostElementBookmarks
        icon={<BookmarkBorderIcon fontSize="small" />}
        isBookmarks={false}
        quantity="10"
        color="#1d9bf0"
      />
    </Box>
  );
}

export default PostIconList;
