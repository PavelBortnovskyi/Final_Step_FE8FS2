import React from 'react';
import { Avatar, Box, CardMedia, Typography } from '@mui/material';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import PostIconList from './PostIconGroup/PostIconList';

function Post({ displayName, username, verified, text, image, logoUrl }) {
  console.log(logoUrl);
  return (
    <Box
      sx={{
        borderBottom: '1px solid rgb(56, 68, 77)',
      }}
      padding={2}
      display="flex"
    >
      <Box padding={2}>
        <Avatar src={logoUrl} />
      </Box>

      <Box padding={1}>
        <Box
          display="flex"
          sx={{ gap: '3px', alignItems: 'center', marginBottom: '10px' }}
        >
          <Typography variant="body1">{username}</Typography>
          <div>
            {verified && <VerifiedUserRoundedIcon sx={{ fontSize: '15px' }} />}
          </div>
          <Typography color="#bdbdbd" sx={{ fontSize: '11px' }}>
            @{displayName} ·
          </Typography>
          <Typography color="#bdbdbd" sx={{ fontSize: '11px' }}>
            4h
          </Typography>
        </Box>

        <Typography variant="body" sx={{ fontSize: '15px' }}>
          {text}
        </Typography>

        <CardMedia
          component="img"
          height="auto"
          image={image}
          alt="Paella dish"
          sx={{
            borderRadius: '20px',
            my: '20px',
          }}
        />
        <PostIconList />
      </Box>
    </Box>
  );
}

export default Post;
