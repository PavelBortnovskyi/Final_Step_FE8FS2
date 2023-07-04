import { useMode } from 'src/styles/_materialTheme';
import { UserAvatarBG } from './UserAvatarBG';
import { Avatar } from '@mui/material';

export function UserPageAvatar({ w, h, mt, userAvatar }) {
  const theme = useMode();

  return (
    (userAvatar && (
      <Avatar
        alt="Remy Sharp"
        src={userAvatar}
        sx={{
          overflow: 'hidden',
          width: `${w}px`,
          height: `${h}px`,
          marginTop: `${mt}px`,
          boxShadow: `0px 0px 0px 5px ${theme.palette.background.default}`,
          marginLeft: '15px',
        }}
      />
    )) || <UserAvatarBG w={w} h={h} mt={mt} />
  );
}
