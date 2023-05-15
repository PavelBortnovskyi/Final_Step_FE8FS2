import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'src/redux/thunk/logoutUser';

export const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logoutUser());
  };
  return (
    <Button variant="outlined" color="transparent" onClick={handleClick}>
      Log out
    </Button>
  );
};
