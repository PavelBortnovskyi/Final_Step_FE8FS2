import React, { useState } from 'react';
import { Box } from '@mui/material';
import CreatePostBar from '../../UI/CreatePostBar';
import AddingFile from '../../UI/CreatePostBar/AddingFile';
import InputAvatar from '../../UI/InputAvatar';
import TweetButton from 'src/UI/TweetButton';

import { useDispatch } from 'react-redux';
import { createTweet } from 'src/redux/thunk/createTweet.js';

function TweetBox() {
  const [postInputText, setPostInputText] = useState('');
  const [postImages, setPostImages] = useState([]);
  const dispatch = useDispatch();

  const handleEmojiSelect = (emoji) => {
    setPostInputText(postInputText + emoji);
  };

  const handleInput = (ev) => {
    setPostInputText(ev);
  };

  const handleFileSelect = (img) => {
    setPostImages([...postImages, img]);
  };
  const handleDeleteImage = (index) => {
    const updatedImages = [...postImages];
    updatedImages.splice(index, 1);
    setPostImages(updatedImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the createTweet action with the collected data
    dispatch(createTweet({ postInputText, postImages }));
    console.log('working');
    // Reset the form fields
    setPostInputText('');
    setPostImages([]);
  };

  return (
    <Box>
      <form autoComplete="off">
        <InputAvatar
          avatarUrl="/img/avatar.JPG"
          placeholder="What's happening?"
          feature={handleInput}
        />
        {postImages.length > 0 && (
          <AddingFile
            handleDeleteImage={handleDeleteImage}
            images={postImages}
          />
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
                postInputText.length === 0 && postImages.length === 0
                  ? true
                  : false
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
