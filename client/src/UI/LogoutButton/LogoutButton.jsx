import { useTheme } from '@emotion/react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'src/redux/thunk/logoutUser';

export const LogoutButton = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logoutUser());
  };
  return (
    <Button variant="outlined"  onClick={handleClick} sx={{color: `${theme.palette.text.primary}`}}>
      Log out
    </Button>
  );
};
