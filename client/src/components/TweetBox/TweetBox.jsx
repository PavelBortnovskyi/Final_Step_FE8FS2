import React, { useState } from 'react';
import { Avatar, Button, Box, styled, FilledInput } from '@mui/material';
import CreatePostBar from './CreatePostBar/CreatePostBar';
import AddingFile from './CreatePostBar/AddingFile';

const InputStyled = styled(FilledInput)((props) => ({
  flex: 1,
  marginLeft: '20px',
  fontSize: '20px',
  border: 'none',
  color: '#fff',
  backgroundColor: 'inherit',
  '&:hover': {
    backgroundColor: 'inherit',
  },
  '&.Mui-focused': {
    '&:after': {
      content: 'none',
    },
  },
}));

function TweetBox() {
  const [postInputText, setPostInputText] = useState('');
  const [postImage, setPostImage] = useState(null);

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const data = {
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
  const objectURL = postImage ? URL.createObjectURL(postImage) : null;
  return (
    <Box pl={1.2} pr={1.2} mt={12.6}>
      <form onChange={(event) => console.log(event.target.value)}>
        <Box display="flex" p="20px">
          <Avatar
            sx={{ width: 56, height: 56 }}
            alt="Remy Sharp"
            src="./img/avatar.JPG"
          />

          <InputStyled
            placeholder="What's happening?"
            disableUnderline={false}
            name="PostText"
            onChange={(event) => setPostInputText(event.target.value)}
          />
        </Box>
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
          <Button
            disabled={
              postInputText.length === 0 && postImage === null ? true : false
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
          >
            Tweet
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default TweetBox;
