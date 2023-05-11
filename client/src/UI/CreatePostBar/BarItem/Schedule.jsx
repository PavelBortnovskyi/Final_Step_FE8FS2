import React from 'react';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';

function Schedule() {
  return (
    <div>
      <PendingActionsOutlinedIcon
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

export default Schedule;
