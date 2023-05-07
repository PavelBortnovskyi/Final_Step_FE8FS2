import React from 'react';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';

function Gif() {
  return (
    <div>
      <GifBoxOutlinedIcon
        sx={{
          fill: 'rgb(29, 155, 240)',
          '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'rgb(24, 44, 63)',
            borderRadius: '50%',
          },
        }}
      />
    </div>
  );
}

export default Gif;
