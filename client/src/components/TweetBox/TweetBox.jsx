import React, { useState } from 'react';
import { Box } from '@mui/material';
import CreatePostBar from '../../UI/CreatePostBar';
import AddingFile from '../../UI/CreatePostBar/AddingFile';
import InputAvatar from '../../UI/InputAvatar';
import TweetButton from 'src/UI/TweetButton';

import { useDispatch, useSelector } from 'react-redux';
import { createTweet } from 'src/redux/thunk/tweets/createTweet.js';
import { useMode } from 'src/styles/_materialTheme';
import { createTweetReply } from 'src/redux/thunk/tweets/replyTweet';
import { useNavigate } from 'react-router-dom';

function TweetBox({ placeholder, fnc, userAvatar, id=false, isOpen,  setIsOpen}) {
  const theme = useMode();
  const navigate = useNavigate();

  const [postInputText, setPostInputText] = useState('');
  const [postImages, setPostImages] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user) || '';

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

  const handleSubmit = () => {
    if (id) {
      dispatch(createTweetReply({ id, postInputText, postImages }));
    } else {
      dispatch(createTweet({ postInputText, postImages }));
    }
    setIsOpen(false);
    setPostInputText('');
    setPostImages([]);
  };
  
  return (
    <Box>
      <form autoComplete="off">
        <InputAvatar
          value={postInputText}
          avatarUrl={userAvatar || user.avatarImgUrl}
          placeholder={placeholder || "What's happening?"}
          feature={handleInput}
        />
        {postImages.length > 0 && (
          <AddingFile
            quantity={postImages.length}
            handleDeleteImage={handleDeleteImage}
            images={postImages}
          />
        )}
        <Box
          sx={{
            borderBottom: `1px solid ${theme.palette.border.main}`,
            paddingBottom: '11px',
            justifyContent: 'space-between',
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
              h="36"
              isDisabled={
                postInputText.length === 0 && postImages.length === 0
                  ? true
                  : false
              }
              text="Tweet"
              height="36"
              w="80"
              fnc={
                fnc
                  ? () => {
                      fnc(postInputText, postImages);
                      setPostInputText('');
                      setPostImages([]);
                    }
                  : handleSubmit
              }
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default TweetBox;
