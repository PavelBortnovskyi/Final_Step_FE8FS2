import React from 'react';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';

function Gif({ hover }) {
  return (
    <div>
      <GifBoxOutlinedIcon
        sx={{
          fill: 'rgb(29, 155, 240)',
          '&:hover': {
            cursor: 'pointer',
            backgroundColor: { hover },
            borderRadius: '50%',
          },
        }}
      />
    </div>
  );
}

export default Gif;
