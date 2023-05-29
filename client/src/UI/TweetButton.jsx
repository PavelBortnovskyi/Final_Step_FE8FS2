import { Button, useTheme } from '@mui/material';
import React from 'react';

function TweetButton({ isDisabled, fnc, text, w, h, fw=400 }) {
  const theme = useTheme();
  return (
    <Button
      onClick={fnc}
      disabled={isDisabled}
      variant="contained"
      sx={{
        width: `${w}px`,
        height: `${h}px`,
        fontSize: '20px',
        fontWeight: `${fw}px`,
        borderRadius: '30px',
        '&.MuiButton-root': {
          color: '#fff',
          '&:hover': {
            backgroundColor: `${theme.palette.primary.hover}`,
          }
        },
        ":disabled": {
      backgroundColor: `${theme.palette.primary.disabled}` 
    }

      }}
    >
      {text}
    </Button>
  );
}

export default TweetButton;
