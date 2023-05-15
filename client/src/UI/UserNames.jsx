import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import { Box, Typography } from '@mui/material';

// this component will be looks like "Jocellyn Flores 'Verified icon' @Artem Shevchuk · 4h"
// you have to add all necessary props

function UserNames({ username, verified, displayName, postTime }) {
  return (
    <Box
      display="flex"
      sx={{ gap: '3px', alignItems: 'center', marginBottom: '10px' }}
    >
      <Typography variant="body1">{username}</Typography>
      <div>
        {verified && (
          <VerifiedUserRoundedIcon
            sx={{ fontSize: '15px', color: '#1d9bf0' }}
          />
        )}
      </div>
      <Typography color="#bdbdbd" sx={{ fontSize: '11px' }}>
        @{displayName} ·
      </Typography>
      <Typography color="#bdbdbd" sx={{ fontSize: '11px' }}>
        4h
      </Typography>
    </Box>
  );
}

export default UserNames;
