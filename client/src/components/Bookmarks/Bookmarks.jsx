import { Box, Button, Typography, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { UserNick } from '../User/UserNIck';
import { useDispatch, useSelector } from 'react-redux';
import { getBookmarks } from 'src/redux/thunk/thunkBookmarks/getBookmarks';
import { useNavigate } from 'react-router-dom';
import { getAuthorizationData } from 'src/redux/selectors/selectors';
import TweetList from 'src/UI/TweetList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteBookmark } from 'src/redux/thunk/thunkBookmarks/deleteBookmark';
import { ArrowBack } from 'src/UI/ArrowBack';
import LoaderSkeleton from 'src/UI/LoaderSkeleton';

export const Bookmarks = () => {
  const theme = useTheme();
  const { isAuthenticated } = useSelector(getAuthorizationData);
  const user = useSelector((state) => state.user.user) || "";
  const userBookmarks = useSelector(state => state.userBookmarks);
  const bookmarksIsLoading = userBookmarks.isLoading;
  const Bookmarks = userBookmarks.userBookmarks || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // send user to home if not authorization
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/modal/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(getBookmarks({ page: 0, pageSize: 20 }));
  }, [dispatch]);



  const deleteAllBookmarks = () => {
    Bookmarks.map(bookmark => {
      const id = bookmark.tweet.id;
      dispatch(deleteBookmark({ id }));
    })
  }

  return (
    <Box sx={{ paddingTop: '4px' }}>

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backdropFilter: 'blur(15px)',
        width: '100%',
        pb: '2px',
        px: '16px',
        position: 'sticky',
        top: '0',
        zIndex: 13,
        borderBottom: `1px solid ${theme.palette.border.main}`
      }}>
        <Box sx={{ display: 'flex' }}>
          <ArrowBack />
          <Box>
            <Typography variant="h5">Bookmarks</Typography>
            <UserNick userTag={user.userTag} />
          </Box>

        </Box>
        <Button
          onClick={deleteAllBookmarks}
          variant="outlined"
          sx={{
            cursor: 'pointer',
            borderRadius: '30px',
            height: '30px',
            border: `1px solid ${theme.palette.border.main}`,
            color: 'rgb(244, 33, 46)',
            // width: '30px',
            '&:hover': {
              background: `${theme.palette.background.hover}`,
              borderRadius: '30px',
            }
          }}>Delete all</Button>
        {/* <MoreVertIcon
          onClick={deleteAllBookmarks}
          sx={{
            cursor: 'pointer',
            height: '30px',
            width: '30px',
            '&:hover': {
              background: `${theme.palette.background.hover}`,
              borderRadius: '50%',
            }
          }} /> */}
      </Box>

      {bookmarksIsLoading && <LoaderSkeleton />}

      {Bookmarks.lenght ? (
        <TweetList tweets={Bookmarks} />
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
