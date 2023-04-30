import React, { useState } from 'react';
import { Avatar, Button, Box, TextField } from '@mui/material';
import style from './TweetBox.module.scss';
import CreatePostBar from './CreatePostBar/CreatePostBar';
import AddingFile from './CreatePostBar/AddingFile';

function TweetBox() {
  const [postInputText, setPostInputText] = useState('');
  const [postImage, setPostImage] = useState(null);

  const sendData = (text, image) => {
    const data = {
      text,
      image,
    };
    setPostInputText('');
    setPostImage(null);
  };

  const handleEmojiSelect = (emoji) => {
    setPostInputText(postInputText + emoji);
  };

  const handleFileSelect = (file) => {
    setPostImage(file);
  };
  const handleCloseFile = () => {
    setPostImage(null);
  };
  let objectURL = postImage ? URL.createObjectURL(postImage) : null;
  return (
    <Box pl={1.2} pr={1.2} mt={12.6}>
      <form>
        <Box display="flex" p="20px">
          <Avatar
            sx={{ width: 56, height: 56 }}
            alt="Remy Sharp"
            src="./img/avatar.JPG"
          />
          <input
            className={style.input}
            placeholder="What's happening?"
            type="text"
            value={postInputText}
            onChange={(e) =>
              e.target.value.length < 300
                ? setPostInputText(e.target.value)
                : false
            }
          />
          {/*я не можу сука зробити нормальний інпут з цим єбаним матіріал юі нахуй
            <TextField
            id="standard-basic"
            label="What's happening?"
            variant="standard"
            value={postInputText}
            sx={{
              flex: 1,
              marginLeft: '20px',
              fontSize: '20px',
              border: 'none',
              backgroundColor: 'rgb(21, 32, 43)',
              '&:focus': {
                outline: 'none',
              },
            }}
            onChange={(e) =>
              e.target.value.length < 300
                ? setPostInputText(e.target.value)
                : false
            }
          /> */}
        </Box>
        {postImage && (
          <AddingFile handleCloseFile={handleCloseFile} photo={objectURL} />
        )}
        <Box
          className={style.addTwitFlex}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <CreatePostBar
            handleFileSelect={handleFileSelect}
            handleEmojiSelect={handleEmojiSelect}
          />
          <Button
            disabled={
              postInputText.length == 0 && postImage == null ? true : false
            }
            sx={{
              backgroundColor: '##50b7f5',
              '&:disabled': {
                opacity: '10%',
              },
            }}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              sendData(postInputText, postImage);
            }}
            variant="contained"
            // className={style.tweetButton}
          >
            Tweet
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default TweetBox;
