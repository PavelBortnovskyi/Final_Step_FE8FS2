import React from 'react';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';

function Schedule({ hover }) {
  return (
    <div>
      <PendingActionsOutlinedIcon
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

export default Schedule;
