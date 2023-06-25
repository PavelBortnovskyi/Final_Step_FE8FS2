import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FormControl, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, useTheme } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTweet } from 'src/redux/thunk/tweets/deleteTweet';

export const SelectDeleteTweet = ({ id }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [age, setAge] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);


  const deleteTweetUser = () => {
    dispatch(deleteTweet({ id }));
    setAnchorEl(null);
  }

  const handleChange = (event) => {
    console.log('handleChange', event.target.value);
    setAge(event.target.value);
  };

  const handleClick = (event) => {
    console.log('handleClick', event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    console.log('handleClose');
    setAnchorEl(null);
  };


  return (
    <FormControl sx={{
      '&:hover': {
        // fill: 'rgb(139. 152. 165)',
        backgroundColor: `rgba(29, 155, 240, 0.15)`,
        borderRadius: '50%',
      }
    }}>
      <IconButton
        aria-label="More options"
        aria-controls="custom-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon sx={{
          color: `${theme.palette.text.primary}`,}}/>
      </IconButton>
      <Menu
        id="custom-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          '& .MuiMenu-list': {
            backgroundColor: `${theme.palette.background.default}`
          }}}
            >
            <MenuItem onClick={deleteTweetUser}>
              <ListItemIcon>
                <DeleteForeverOutlinedIcon sx={{color: `${theme.palette.text.primary}`}}/>
              </ListItemIcon>
              <ListItemText primary="Delete"
                sx={{
                  'span': {

                    color: `${theme.palette.text.primary}`,
                  }


                }} />
            </MenuItem>

      </Menu>
    </FormControl >
  )
}
