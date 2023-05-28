import { keyframes } from '@emotion/react';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Box } from '@mui/material';

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loading = ({ size = 24 }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        // justifyContent: 'center',
        justifyContent: 'start',
        alignItems: 'center',
        flex: '1 0 auto',
      }}
    >
      <AutorenewIcon
        sx={{
          fontSize: `${size}px`,
          animation: `${rotateAnimation} 2s linear infinite`,
        }}
      />
    </Box>
  );
};
