import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { Scale } from '@mui/icons-material';

const imgStyle = {
  width: '100%',
  borderRadius: '10%',
};

const divStyle = {
  position: 'relative',
  margin: '30px',
};

function AddingFile({ photo, handleCloseFile }) {
  return (
    <div style={divStyle}>
      <div onClick={handleCloseFile}>
        <CancelIcon
          sx={{
            position: 'absolute',
            top: '15px',
            left: '30px',
            color: 'black',
            '&:hover': {
              cursor: 'pointer',
              transition: 'linear, 500ms',
              transform: 'scale(1.3)',
            },
          }}
        />
      </div>

      <img style={imgStyle} src={photo} alt="Adding image" />
    </div>
  );
}

export default AddingFile;
