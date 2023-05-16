import { Button } from '@mui/material';
import React from 'react';

function TweetButton({ isDisabled, fnc, text, w, h , fw}) {
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
          backgroundColor: 'rgb(29, 155, 240)',
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
