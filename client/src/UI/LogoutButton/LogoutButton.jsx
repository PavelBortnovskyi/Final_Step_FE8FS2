import { Button, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'src/redux/thunk/logoutUser';
import { useNavigate } from 'react-router-dom';

export const LogoutButton = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logoutUser());
    navigate('/');
  };
  return (
    <Button
      variant="outlined"
      onClick={handleClick}
      sx={{ color: `${theme.palette.text.primary}` }}
    >
      Log out
    </Button>
  );
};
