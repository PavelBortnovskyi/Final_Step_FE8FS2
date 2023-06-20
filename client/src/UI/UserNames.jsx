import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import { Box, Typography, alpha, useTheme } from '@mui/material';

// this component will be looks like "Jocellyn Flores 'Verified icon' @Artem Shevchuk · 4h"
// you have to add all necessary props

// modify by Portnov Dmytro

function UserNames({
  fullName = '',
  isVerified,
  userTag = '',
  postTime = '',
  text = null,
  color,
}) {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      sx={{
        color: color,
        alignItems: 'baseline',
        justifyContent: 'space-between',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '4px',
          alignItems: 'baseline',
          marginBottom: '10px',
          width: '100%',
        }}
      >
        <Typography variant="body1">{fullName}</Typography>
        <div>
          {isVerified && (
            <VerifiedUserRoundedIcon
              sx={{ fontSize: '16px', color: '#1d9bf0' }}
            />
          )}
        </div>
        <Typography sx={{ fontSize: '14px' }}>{userTag}</Typography>
        <Typography
          color="#bdbdbd"
          sx={{ fontSize: '14px', marginLeft: '12px' }}
        >
          {postTime}
        </Typography>
      </Box>
      {!!text && (
        <Box
          sx={{
            fontSize: '12px',
            color: alpha(theme.palette.text.primary, 0.5),
          }}
        >
          {text}
        </Box>
      )}
    </Box>
  );
}

export default UserNames;
