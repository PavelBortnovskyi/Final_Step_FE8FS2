import React from 'react';
import AddImage from './CreatePostBar/BarItem/AddImage';
import Emoji from './CreatePostBar/BarItem/Emoji';
import Gif from './CreatePostBar/BarItem/Gif';
import Schedule from './CreatePostBar/BarItem/Schedule';
import Location from './CreatePostBar/BarItem/Location';
import { Box } from '@mui/material';
import { useMode } from 'src/styles/_materialTheme';

function CreatePostBar({ handleFileSelect, handleEmojiSelect, isPicker }) {
  const theme = useMode();

  const hoverColor = `${theme.palette.background.hover}`;

  return (
    <Box
      sx={{
        mt: '15px',
        display: 'flex',
        gap: '15px',
      }}
    >
      <AddImage handleFileSelect={handleFileSelect} hover={hoverColor} />

      <Gif hover={hoverColor} />

      <Emoji
        isPicker={isPicker}
        handleEmojiSelect={handleEmojiSelect}
        hover={hoverColor}
      />

      {/* <Schedule hover={hoverColor} />

      <Location hover={hoverColor} /> */}
    </Box>
  );
}

export default CreatePostBar;
