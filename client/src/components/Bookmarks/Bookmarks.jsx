import { Box, Typography, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { UserNick } from '../User/UserNIck';
import { useDispatch, useSelector } from 'react-redux';
import { getBookmarks } from 'src/redux/thunk/getBookmarks';
import Post from '../Post/Post';
import { Link, useNavigate } from 'react-router-dom';
import { getAuthorizationData } from 'src/redux/selectors/selectors';

export const Bookmarks = () => {
  const theme = useTheme();
  const user = useSelector((state) => state.user.user) || "";
  const userBookmarks = useSelector(state => state.userBookmarks.userBookmarks);
  const Bookmarks = userBookmarks.content || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(getAuthorizationData);
  // send user to home if not authorization
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(getBookmarks({ page: 0, pageSize: 10 }));
  }, [dispatch]);

  return (
    <Box sx={{ paddingTop: '4px' }}>
      <Box sx={{
        backdropFilter: 'blur(15px)',
        width: '100%',
        pb: '2px',
        px: '16px',
        position: 'sticky',
        top: '0',
        zIndex: 13,
        borderBottom: `1px solid ${theme.palette.border.main}`
      }}>
        <Typography variant="h5">Bookmarks</Typography>
        <UserNick userTag={user.userTag} />
      </Box>

      {user !== '' ? (
        Bookmarks.map((bookmark) =>
          <Link to={`/tweet/${bookmark.tweet.id}`} key={bookmark.tweet.id}>
            <Box sx={{ borderBottom: `1px solid ${theme.palette.border.main}`}}>
              <Post tweet={bookmark.tweet} key={bookmark.tweet.id} />
            </Box>

          </Link>)
      ) : (
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '80px',
          }}
        >
          <Box
            sx={{
              width: '400px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src="./img/book-in-bird.png"
              styles={{ width: '400px', height: '200px' }}
              alt="bookmarks"
            />

            <Box sx={{ width: '330px' }}>
              <Typography
                variant="h4"
                sx={{ marginTop: '20px', fontWeight: '900' }}
              >
                Save Tweets for later
              </Typography>
              <Typography variant="body1">
                Don’t let the good ones fly away! Bookmark Tweets to easily find
                them again in the future.
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
