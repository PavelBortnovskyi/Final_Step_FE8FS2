import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

import { SearchTabs } from './SearchTabs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { findUser } from 'src/redux/thunk/findUser';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  // borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.text.primary, 0.15),
  borderRadius: '20px',
  '&:hover': {
    backgroundColor: alpha(theme.palette.text.primary, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  // [theme.breakpoints.up('sm')]: {
  //   marginLeft: theme.spacing(1),
  //   width: 'auto',
  // },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '90%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create('width'),
    width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   width: '12ch',
    //   '&:focus': {
    //     width: '20ch',
    //   },
    // },
  },
}));

export const SearchField = () => {
  const dispatch = useDispatch();

  // set search text
  const [searchText, setSearchText] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      dispatch(findUser({ search: searchText }));
    }
  };

  // TODO: Need create debounce request
  const handleChange = async (e) => {
    setSearchText(e.target.value);

    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });

    dispatch(findUser({ search: e.target.value }));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          value={searchText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search Direct Messages"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
      <Box sx={{ marginTop: '16px' }}>
        <SearchTabs />
      </Box>
    </Box>
  );
};
