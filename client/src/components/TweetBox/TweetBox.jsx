import React, { useState } from 'react';
import { Avatar, Button } from '@mui/material';
import style from './TweetBox.module.scss';
import CreatePostBar from './CreatePostBar/CreatePostBar';

function TweetBox() {
  const [postInputText, setPostInputText] = useState('');

  return (
    <div className={style.tweetBox}>
      <form>
        <div className={style.input}>
          <Avatar
            sx={{ width: 56, height: 56 }}
            alt="Remy Sharp"
            src="./img/avatar.JPG"
          />
          <input
            placeholder="What's happening?"
            type="text"
            value={postInputText}
            onChange={(e) =>
              e.target.value.length < 300
                ? setPostInputText(e.target.value)
                : false
            }
          />
        </div>
        <div className={style.addTwitFlex}>
          <CreatePostBar />
          <Button
            type="submit"
            onClick={(e) => e.preventDefault()}
            className={style.tweetButton}
          >
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TweetBox;
