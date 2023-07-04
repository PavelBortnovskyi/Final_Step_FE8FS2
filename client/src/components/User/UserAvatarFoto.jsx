import { Box } from '@mui/material';
import { useMode } from 'src/styles/_materialTheme';

export function UserAvatarFoto({ userAvatar }) {
  const theme = useMode();
  return (
    <Box
      sx={{
        overflow: 'hidden',
        width: '134px',
        height: '134px',
        marginTop: '-70px',
        boxShadow: `0px 0px 0px 5px ${theme.palette.background.default}`,
        marginLeft: '15px',
        borderRadius: '9999px',
      }}
    >
      <img
        src={userAvatar}
        alt="user avatar"
        style={{ width: '134px', height: '134px', borderRadius: '9999px' }}
      />
    </Box>
  );
}
