import React from 'react';
import AddImage from './CreatePostBar/BarItem/AddImage';
import Emoji from './CreatePostBar/BarItem/Emoji';
import Gif from './CreatePostBar/BarItem/Gif';
import Schedule from './CreatePostBar/BarItem/Schedule';
import Location from './CreatePostBar/BarItem/Location';
import { Box } from '@mui/material';

function CreatePostBar({ handleFileSelect, handleEmojiSelect }) {
  return (
    <Box
      sx={{
        ml: '100px',
        mt: '15px',
        display: 'flex',
        gap: '15px',
      }}
    >
      <AddImage handleFileSelect={handleFileSelect} />

      <Gif />

      <Emoji handleEmojiSelect={handleEmojiSelect} />

      <Schedule />

      <Location />
    </Box>
  );
}

export default CreatePostBar;
