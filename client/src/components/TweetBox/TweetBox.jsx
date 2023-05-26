import React, { useState } from 'react';
import { Box } from '@mui/material';
import CreatePostBar from '../../UI/CreatePostBar';
import AddingFile from '../../UI/CreatePostBar/AddingFile';
import InputAvatar from '../../UI/InputAvatar';
import TweetButton from 'src/UI/TweetButton';

import { useDispatch } from 'react-redux';
import { sendData } from 'src/redux/thunk/createPost.js';

function TweetBox() {
  const [postInputText, setPostInputText] = useState('');
  const [postImage, setPostImage] = useState(null);

  const dispatch = useDispatch();

  const handleEmojiSelect = (emoji) => {
    setPostInputText(postInputText + emoji);
  };

  const handleInput = (ev) => {
    setPostInputText(ev);
  };

  const handleFileSelect = (file) => {
    // setPostImage(file);
  };
  const handleCloseFile = () => {
    setPostImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the sendData action with the collected data
    dispatch(sendData({ postInputText, postImage }));
    console.log('working');
    // Reset the form fields
    setPostInputText('');
    // setPostImage([]);
  };
  const objectURL = postImage ? URL.createObjectURL(postImage) : null;
  return (
    <Box>
      <form autoComplete="off">
        <InputAvatar
          avatarUrl="/img/avatar.JPG"
          placeholder="What's happening?"
          feature={handleInput}
        />
        {postImage && (
          <AddingFile handleCloseFile={handleCloseFile} photo={objectURL} />
        )}
        <Box
          sx={{
            
            borderBottom: '1px solid rgb(56, 68, 77)',
            paddingBottom: '11px',
          }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <CreatePostBar
            handleFileSelect={handleFileSelect}
            handleEmojiSelect={handleEmojiSelect}
          />

          <Box
            sx={{
              mt: '15px',
              mr: '15px',
            }}
          >
            <TweetButton
              isDisabled={
                postInputText.length === 0 && postImage === null ? true : false
              }
              text="Tweet"
              w="80px"
              h="34px"
              fnc={handleSubmit}
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default TweetBox;