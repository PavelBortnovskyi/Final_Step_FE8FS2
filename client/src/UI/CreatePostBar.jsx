import React from 'react';
import AddImage from './CreatePostBar/BarItem/AddImage';
import Emoji from './CreatePostBar/BarItem/Emoji';
import Gif from './CreatePostBar/BarItem/Gif';
import Schedule from './CreatePostBar/BarItem/Schedule';
import Location from './CreatePostBar/BarItem/Location';
import { Box } from '@mui/material';
import { useMode } from 'src/styles/_materialTheme';

function CreatePostBar({ handleFileSelect, handleEmojiSelect }) {
  const theme = useMode();

  const hoverColor = `${theme.palette.background.hover}`;

  return (
    <Box
      sx={{
        ml: '100px',
        mt: '15px',
        display: 'flex',
        gap: '15px',
      }}
    >
      <AddImage handleFileSelect={handleFileSelect} hover={hoverColor} />

      <Gif hover={hoverColor} />

      <Emoji handleEmojiSelect={handleEmojiSelect} hover={hoverColor} />

      <Schedule hover={hoverColor} />

      <Location hover={hoverColor} />
    </Box>
  );
}

export default CreatePostBar;
