import React from 'react';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { IconButton } from '@mui/material';

function AddImage({ handleFileSelect }) {
  return (
    <IconButton
      color="primary"
      aria-label="upload picture"
      component="label"
      sx={{ mt: '0px', pt: '0px' }}
    >
      <input
        hidden
        type="file"
        onChange={(e) => {
          handleFileSelect(e.target.files[0]);
        }}
      />
      <ImageOutlinedIcon
        sx={{
          fill: 'rgb(29, 155, 240)',
          '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'rgb(24, 44, 63)',
            borderRadius: '50%',
          },
        }}
      />
    </IconButton>
  );
}

export default AddImage;
