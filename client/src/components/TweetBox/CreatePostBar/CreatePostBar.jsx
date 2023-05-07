import React from 'react';
import AddImage from './BarItem/AddImage';
import Emoji from './BarItem/Emoji';
import Gif from './BarItem/Gif';
import Schedule from './BarItem/Schedule';
import Location from './BarItem/Location';
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
