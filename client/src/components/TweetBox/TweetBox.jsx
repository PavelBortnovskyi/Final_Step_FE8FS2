import React, { useState } from 'react';
import { Avatar, Button, Box, TextField } from '@mui/material';
import style from './TweetBox.module.scss';
import CreatePostBar from './CreatePostBar/CreatePostBar';
import AddingFile from './CreatePostBar/AddingFile';

function TweetBox() {
  const [postInputText, setPostInputText] = useState('');
  const [postImage, setPostImage] = useState(null);

  // чи так має збиратись інформація для створення поста??
  //================================================================================================
  let data = {
    postText: postInputText,
    postImage: postImage,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', data);
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });
    console.log(response);
    setPostInputText('');
    setPostImage(null);
  };
  //================================================================================================
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
          {/*При додаванні імпута від матіріала не виходить застилізувати його правильно
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
              handleSubmit();
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
