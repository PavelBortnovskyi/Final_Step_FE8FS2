import React from 'react';
import styles from './Post.module.scss';
import { Avatar } from '@mui/material';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';

function Post({ displayName, username, verified, text, image }) {
  return (
    <div className={styles.post}>
      <div className={styles.avatar}>
        <Avatar src="./img/avatar.JPG" />
      </div>
      <div className={styles.body}>
        <div className="post__header">
          <div className={styles.headerText}>
            <h3>
              {displayName}
              <span className={styles.headerSpecial}>
                {verified && (
                  <VerifiedUserRoundedIcon className={styles.badge} />
                )}{' '}
                @{username}
              </span>
            </h3>
          </div>
          <div className={styles.headerDescription}>
            <p>{text}</p>
          </div>
        </div>
        <img src={image} alt="" />
        <div className={styles.footer}>
          <ChatBubbleOutlineOutlinedIcon fontSize="small" />
          <RepeatOutlinedIcon fontSize="small" />
          <FavoriteBorderOutlinedIcon fontSize="small" />
          <PublishOutlinedIcon fontSize="small" />
        </div>
      </div>
    </div>
  );
}

export default Post;
