import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import { Box, Typography } from '@mui/material';

// this component will be looks like "Jocellyn Flores 'Verified icon' @Artem Shevchuk · 4h"
// you have to add all necessary props

function UserNames({ username, verified, displayName, postTime, text }) {
  return (
    <Box
      display="flex"
      sx={{
        flexDirection: 'column',
        gap: '4px',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <Box
        display="flex"
        sx={{
          gap: '4px',
          alignItems: 'baseline',
        }}
      >
        <Typography variant="body1">{username}</Typography>
        <div>
          {verified && (
            <VerifiedUserRoundedIcon
              sx={{ fontSize: '15px', color: '#1d9bf0' }}
            />
          )}
        </div>
        <Typography color="#bdbdbd" sx={{ fontSize: '14px' }}>
          {displayName} ·
        </Typography>
        <Typography color="#bdbdbd" sx={{ fontSize: '14px' }}>
          {postTime}
        </Typography>
      </Box>
      <Typography sx={{ fontSize: '14px' }}>{text}</Typography>
    </Box>
  );
}

export default UserNames;
