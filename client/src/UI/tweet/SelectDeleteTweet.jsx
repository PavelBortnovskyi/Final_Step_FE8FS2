import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  FormControl,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeUser } from 'src/redux/thunk/subscribeUser';
import { deleteTweet } from 'src/redux/thunk/tweets/deleteTweet';
import { unsubscribeUser } from 'src/redux/thunk/unsubscribeUser';

export const SelectDeleteTweet = ({ id, tweet }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user) || '';
  const theme = useTheme();
  const userId = tweet.user.id;
  const { followings } = useSelector((state) => state.followings);

  const compairUser =
    followings.content && followings.content.some((item) => item.id === userId);

  const [anchorEl, setAnchorEl] = useState(null);

  const deleteTweetUser = (tweet) => {
    if (user.id === tweet.user.id) {
      dispatch(deleteTweet({ id }));
    } else if (compairUser) {
      dispatch(unsubscribeUser(userId));
    } else if (!compairUser) {
      dispatch(subscribeUser(userId));
    }
    setAnchorEl(null);
  };

  let primaryText = '';

  if (user.id === tweet.user.id) {
    primaryText = 'Delete';
  } else if (compairUser) {
    primaryText = 'Unfollow';
  } else if (!compairUser) {
    primaryText = 'Follow';
  }

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <FormControl
      sx={{
        '&:hover': {
          backgroundColor: `rgba(29, 155, 240, 0.15)`,
          borderRadius: '50%',
        },
      }}
    >
      <IconButton
        aria-label="More options"
        aria-controls="custom-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon
          fontSize="small"
          sx={{
            color: `${theme.palette.text.primary}`,
          }}
        />
      </IconButton>
      <Menu
        id="custom-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          '& .MuiMenu-list': {
            backgroundColor: `${theme.palette.background.default}`,
          },
        }}
      >
        <MenuItem onClick={() => deleteTweetUser(tweet)}>
          <ListItemIcon>
            <DeleteForeverOutlinedIcon
              sx={{ color: `${theme.palette.text.primary}` }}
            />
          </ListItemIcon>
          <ListItemText
            primary={primaryText}
            sx={{
              span: {
                color: `${theme.palette.text.primary}`,
              },
            }}
          />
        </MenuItem>
      </Menu>
    </FormControl>
  );
};
