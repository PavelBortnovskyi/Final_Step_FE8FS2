import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import { Box, Typography, alpha, useTheme } from '@mui/material';
import TimeAgo from 'timeago-react';

// this component will be looks like "Jocellyn Flores 'Verified icon' @Artem Shevchuk · 4h"
// you have to add all necessary props

// modify by Portnov Dmytro

export const MessagesUserNames = ({
  fullName = '',
  verified = false,
  userTag = '',
  text = '',
  postTime = null,
}) => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      sx={{
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: '10px',
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
          {verified ? (
            <VerifiedUserRoundedIcon
              sx={{ fontSize: '16px', color: '#1d9bf0' }}
            />
          ) : (
            <Box>&#8901;</Box>
          )}
        </div>
        <Typography sx={{ fontSize: '14px' }}>{userTag}</Typography>
      </Box>

      {!!text && (
        <Box
          sx={{
            display: 'flex',
            gap: '4px',
            alignItems: 'baseline',
            whiteSpace: 'nowrap',
            fontSize: '14px',
          }}
        >
          <Typography
            sx={{
              color: alpha(theme.palette.text.primary, 0.5),
              fontSize: '14px',
            }}
          >
            <TimeAgo datetime={postTime} />
          </Typography>
          <Box>&#8901;</Box>
          <Box
            sx={{
              color: alpha(theme.palette.text.primary, 0.5),
            }}
          >
            {text}
          </Box>
        </Box>
      )}
    </Box>
  );
};
