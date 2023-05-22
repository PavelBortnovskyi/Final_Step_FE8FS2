import { Button } from '@mui/material';
import React from 'react';
import { useTheme } from '@emotion/react';

function TweetButton({ isDisabled, fnc, text, w, h, fw}) {
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
        '&.Mui-disabled': {
          backgroundColor: `${theme.palette.primary.disabled}`,
          opacity: '0.5',
          color: '#fff',
        },
      }}
    >
      {text}
    </Button>
  );
}

export default TweetButton;
