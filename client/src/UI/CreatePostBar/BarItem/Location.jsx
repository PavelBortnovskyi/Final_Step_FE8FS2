import React from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

function Location() {
  return (
    <div>
      <LocationOnOutlinedIcon
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

export default Location;
