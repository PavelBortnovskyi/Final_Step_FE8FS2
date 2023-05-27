
import { useState } from 'react';
import { Box, InputAdornment, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { styled } from '@mui/material/styles';
import { useTheme } from '@emotion/react';



export const InputSearch = ({ placeholder, fnc }) => {
  const theme = useTheme();
  const [showClearIcon, setShowClearIcon] = useState('none');
  const [inputValue, setInputValue] = useState('');

  const TextFieldStyle = styled(TextField)((props) => ({
    width: '100%',
    borderRadius: '40px',
    outline: 'none',
    backgroundColor: `${theme.palette.background.additional}`,
    '&:hover': {
      outline: 'none',
      border: 'none',
    },
    input: {
      '&:hover': {
        outline: 'none',
        border: 'none',
      },
    },
    '.MuiOutlinedInput-root': {
      borderRadius: '40px',
      color: `${theme.palette.text.secondary}`,
      '&:hover': {
        outline: 'none',
        border: 'none',
      },
    },
  }))

  const handleChange = function (event) {
    setShowClearIcon(event === '' ? 'none' : 'flex');
  };

  const handleInput = (e) => {
    setInputValue(e);
  };

  const handleClick = function () {
    setShowClearIcon('none');
    setInputValue('');
  };
  return (
    <Box m={1}>
      <TextFieldStyle
        size="small"
        variant="outlined"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => {
          handleInput(e.target.value);
          handleChange(e.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon sx={{ color: `${theme.palette.text.secondary}`, }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              style={{ display: showClearIcon }}
              onClick={handleClick}
            >
              <CancelRoundedIcon
                sx={{
                  color: `${theme.palette.primary.main}`,
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
              />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

