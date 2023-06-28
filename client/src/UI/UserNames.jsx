import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import { Box, Typography, alpha, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserBiId } from 'src/redux/thunk/getUserBiId';
import TimeAgo from 'timeago-react';

function UserNames({
  fullName = '',
  isVerified,
  userTag = '',
  postTime,
  text = null,
  color,
  id,
  userId,
}) {
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <Box
      display="flex"
      sx={{
        color: color,
        alignItems: 'baseline',
        justifyContent: 'space-between',
        flexDirection: 'column',
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
        <Link
          to={`/user/${id}`}
          onClick={() => {
            dispatch(getUserBiId(userId));
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: `${theme.palette.text.primary}`,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {fullName}
          </Typography>
        </Link>
        <div>
          {isVerified && (
            <VerifiedUserRoundedIcon
              sx={{ fontSize: '16px', color: '#1d9bf0' }}
            />
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
}

export default UserNames;
