import React from 'react';
import { Avatar, Box, CardMedia, Typography } from '@mui/material';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import PostIconList from './PostIconGroup/PostIconList';

const ImageStyle = {
  borderRadius: '20px',
  height: 'auto',
  with: '80%',
  marginTop: '10px',
};

function Post({ displayName, username, verified, text, image }) {
  return (
    <Box
      sx={{
        borderBottom: '1px solid rgb(56, 68, 77)',
      }}
      padding={2}
      display="flex"
    >
      <Box padding={2}>
        <Avatar src="./img/avatar.JPG" />
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
          borderRadius: "20px",
        }}
      />

        {/* <img style={ImageStyle} src={image} alt="" /> */}
        <PostIconList />
      </Box>
    </Box>
  );
}

export default Post;
