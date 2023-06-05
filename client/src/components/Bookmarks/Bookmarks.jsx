import { Box, Typography } from '@mui/material'
import React from 'react'
import { UserNick } from '../User/UserNIck'
import PostList from '../Post/PostList'


export const Bookmarks = () => {
  return (
    <Box sx={{ height: '100vh', padding: '4px 0 0 16px' }}>
      <Typography variant="h5">
        Bookmarks
      </Typography>
      <UserNick />

      <PostList />
      {/* <Box sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '80px'
      }}> */}
      
        {/* <Box sx={{ width: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
          <img src='./img/book-in-bird.png' styles={{ width: '400px', height: '200px' }} alt='bookmarks' />

          <Box sx={{ width: '330px' }}>
            <Typography variant="h4" sx={{ marginTop: '20px', fontWeight: '900' }}>
              Save Tweets for later
            </Typography>
            <Typography variant="body1">
              Don’t let the good ones fly away! Bookmark Tweets to easily find them again in the future.
            </Typography>
          </Box>
        </Box> */}
      {/* </Box> */}
    </Box>
  )
}
