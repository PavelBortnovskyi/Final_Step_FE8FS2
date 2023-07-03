import Avatar from '@mui/material/Avatar';
import { useMode } from 'src/styles/_materialTheme';

export function UserAvatarBG({ w, h, mt }) {
  const theme = useMode();

  return (
    <Avatar
      color="neutral"
      variant="outlined"
      sx={{
        overflow: 'hidden',
        background: 'rgb(87 75 179)',
        width: `${w}px`,
        height: `${h}px`,
        marginTop: `${mt}px`,

        fontSize: '76px',
        boxShadow: `0px 0px 0px 5px ${theme.palette.background.default}`,
        marginLeft: '15px',
      }}
    ></Avatar>
  );
}
