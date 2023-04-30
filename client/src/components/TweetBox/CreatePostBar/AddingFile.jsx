import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';

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
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        />
      </div>

      <img style={imgStyle} src={photo} alt="Adding image" />
    </div>
  );
}

export default AddingFile;
