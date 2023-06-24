import React from 'react';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import PostIconElementLike from './PostIconElementLike';
import PostIconElementComment from './PostIconElementComment';
import { NavLink, useLocation } from 'react-router-dom';

import { Box } from '@mui/material';
import { useMode } from 'src/styles/_materialTheme';
import PostElementBookmarks from './PostElementBookmarks';
import { PostIconElementRetweet } from './PostIconElementRetweet';
import { PostElementQuote } from './PostElementQuote';

function PostIconList({
  likes,
  reply,
  retweet,
  id,
  isLiked,
  isRetweet,
  isComment,
  isBookmarks,
  isQuoted,
  quote,
  bookmarks,
}) {
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
        <PostIconElementComment quantity={reply} color="#72bcd4" id={id} />
      </NavLink>

      <PostIconElementRetweet
        icon={<RepeatOutlinedIcon fontSize="small" />}
        quantity={retweet}
        isRetweet={isRetweet}
        id={id}
        color="lightgreen"
      />

      <PostIconElementLike
        icon={<FavoriteBorderOutlinedIcon fontSize="small" />}
        quantity={likes}
        color="red"
        id={id}
        isLiked={isLiked}
      />
      <NavLink
        to="/modal/quote"
        state={{ background: location }}
        component={NavLink}
      >
        <PostElementQuote
          isQuoted={isQuoted}
          icon={<BorderColorOutlinedIcon fontSize="small" />}
          quantity={quote}
          id={id}
          color="#8D3256"
        />
      </NavLink>
      <PostElementBookmarks
        isBookmarks={isBookmarks}
        icon={<BookmarkBorderIcon fontSize="small" />}
        quantity={bookmarks}
        id={id}
        color="#1d9bf0"
      />
    </Box>
  );
}

export default PostIconList;
