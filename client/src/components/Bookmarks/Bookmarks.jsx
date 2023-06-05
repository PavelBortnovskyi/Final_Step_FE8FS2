import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { UserNick } from '../User/UserNIck'
import PostList from '../Post/PostList'
import { useDispatch, useSelector } from 'react-redux'
import { getBookmarks } from 'src/redux/thunk/getBookmarks'


export const Bookmarks = () => {
  const user = useSelector((state) => state.user.user) || "";
  const userBookmarks = useSelector(state => state.userBookmarks.userBookmarks);
  console.log(userBookmarks);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getBookmarks({ page: 0, pageSize: 10 }));
  }, [dispatch]);

  return (

    <Box sx={{ height: '100vh', padding: '4px 0 0 16px' }}>
      <Typography variant="h5">
        Bookmarks
      </Typography>
      <UserNick userTag={user.userTag} />
      {
        user !== '' ?
        userBookmarks.map(tweet => (
          <PostList tweet={tweet} key={tweet.tweetId}/>
        ))
          :
          <Box sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '80px'
          }}>

            <Box sx={{ width: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
              <img src='./img/book-in-bird.png' styles={{ width: '400px', height: '200px' }} alt='bookmarks' />

              <Box sx={{ width: '330px' }}>
                <Typography variant="h4" sx={{ marginTop: '20px', fontWeight: '900' }}>
                  Save Tweets for later
                </Typography>
                <Typography variant="body1">
                  Don’t let the good ones fly away! Bookmark Tweets to easily find them again in the future.
                </Typography>
              </Box>
            </Box>
          </Box>
      }
    </Box>
  )
}
