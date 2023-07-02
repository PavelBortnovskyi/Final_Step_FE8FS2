import { Button, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'src/redux/thunk/logoutUser';
import { useNavigate } from 'react-router-dom';
import { resetSubscriptionsTweets } from 'src/redux/reducers/subscriptionsTweetsSlicer.js';
import { resetUserTweets } from 'src/redux/reducers/getUserTweetsSlice.js';
import { resetAllTweets } from 'src/redux/reducers/getAllTweetsSlicer.js';
import { resetBookmarksState } from 'src/redux/reducers/bookmarksSlise.js';
import { clearSocketNotification } from 'src/redux/reducers/getNotificationsSlice';

export const LogoutButton = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logoutUser());
    dispatch(resetSubscriptionsTweets());
    dispatch(resetUserTweets());
    dispatch(resetAllTweets());
    dispatch(resetBookmarksState());
    dispatch(clearSocketNotification());
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
