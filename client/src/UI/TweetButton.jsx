import { Button } from '@mui/material';
import React from 'react';
import { useTheme } from '@emotion/react';

function TweetButton({ isDisabled, fnc, text, w, h, fw=400 }) {
  const theme = useTheme();
  return (
    <Button
      disabled={isDisabled}
      variant="contained"
      sx={{
        width: `${w}px`,
        height: `${h}px`,
        fontSize: '20px',
        fontWeight: `${fw}px`,
        borderRadius: '30px',
        backgroundColor: `${theme.palette.primary.disabled}`,
        '&.MuiButton-root': {
          color: '#fff',
          '&:hover': {
            backgroundColor: `${theme.palette.primary.hover}`,
          }
        },
      }}
    >
      {text}
    </Button>
  );
}

export default TweetButton;
