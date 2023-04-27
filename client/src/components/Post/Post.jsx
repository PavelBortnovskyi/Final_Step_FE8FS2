import React from 'react';
import styles from './Post.module.scss';
import { Avatar, Box, Typography } from '@mui/material';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import PostIconList from './PostIconGroup/PostIconList';

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
        <div>
          <Box display="flex" sx={{ gap: '3px', alignItems: 'center' }}>
            <Typography variant="body1">{username}</Typography>
            <div>
              {verified && (
                <VerifiedUserRoundedIcon sx={{ fontSize: '15px' }} />
              )}
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
        </div>
        <img className={styles.postImage} src={image} alt="" />
        <div>
          <PostIconList />
        </div>
      </Box>
    </Box>
  );
}

export default Post;
