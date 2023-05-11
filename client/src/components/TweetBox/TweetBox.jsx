import React, { useState } from 'react';
import { Box } from '@mui/material';
import CreatePostBar from '../../UI/CreatePostBar';
import AddingFile from '../../UI/CreatePostBar/AddingFile';
import InputAvatar from '../../UI/InputAvatar';
import TweetButton from 'src/UI/TweetButton';

function TweetBox() {
  const [postInputText, setPostInputText] = useState('');
  const [postImage, setPostImage] = useState(null);

  // const data = {
  //   postText: postInputText,
  //   postImage: postImage,
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('file', data);
  //   const response = await fetch('/upload', {
  //     method: 'POST',
  //     body: formData,
  //   });
  //   setPostInputText('');
  //   setPostImage(null);
  // };
  const handleEmojiSelect = (emoji) => {
    setPostInputText(postInputText + emoji);
  };

  const handleInput = (ev) => {
    setPostInputText(ev);
  };

  const handleFileSelect = (file) => {
    setPostImage(file);
  };
  const handleCloseFile = () => {
    setPostImage(null);
  };
  const objectURL = postImage ? URL.createObjectURL(postImage) : null;
  return (
    <Box>
      <form>
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
            borderTop: '1px solid rgb(56, 68, 77)',
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
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default TweetBox;
