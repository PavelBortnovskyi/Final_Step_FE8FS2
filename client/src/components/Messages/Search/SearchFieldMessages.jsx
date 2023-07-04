import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import debounce from 'lodash.debounce';

import { findUser } from 'src/redux/thunk/findUser';
import { useEffect } from 'react';
import { findMessage } from 'src/redux/thunk/findMessage';

// ************ STYLE ************
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: alpha(theme.palette.text.primary, 0.05),
  border: `1px solid ${theme.palette.border.main}`,
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:hover': {
    backgroundColor: alpha(theme.palette.text.primary, 0.1),
  },
  marginLeft: 0,
  width: '100%',
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

const CancelRoundedIconStyled = styled(CancelRoundedIcon)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  margin: '0 10px',
  '&:hover': {
    cursor: 'pointer',
  },
});

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '90%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create('width'),
    width: '100%',
  },
}));
// ************ STYLE ************

// ************ SearchFieldMessages ************
export const SearchFieldMessages = ({ setIsVisibleResult }) => {
  const dispatch = useDispatch();

  // set link on search input
  const inputRef = useRef();

  // set search text
  const [searchText, setSearchText] = useState('');

  // checking if searchText is not empty to set visible Tabs with result
  useEffect(() => {
    setIsVisibleResult(Boolean(searchText));
  }, [searchText, setIsVisibleResult]);

  // clear search input
  const handleClear = () => {
    setSearchText('');
    dispatch(findUser({ search: '' }));
    dispatch(findMessage({ search: '' }));
    inputRef.current.focus();
  };

  // set debounce on send request search string
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sendSearchString = useCallback(
    debounce((searchString) => {
      dispatch(findUser({ search: searchString }));
      dispatch(findMessage({ search: searchString }));
    }, 500),
    []
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      dispatch(findUser({ search: searchText }));
      dispatch(findMessage({ search: searchText }));
    }
  };

  // set search string
  const handleChange = async (e) => {
    setSearchText(e.target.value);
    sendSearchString(e.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          inputRef={inputRef}
          value={searchText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search by users or messages"
          inputProps={{ 'aria-label': 'search' }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={handleClear}
        >
          <CancelRoundedIconStyled />
        </Box>
      </Search>
    </Box>
  );
};
