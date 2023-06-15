import React from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

function Location({ hover }) {
  return (
    <div>
      <LocationOnOutlinedIcon
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

export default Location;
