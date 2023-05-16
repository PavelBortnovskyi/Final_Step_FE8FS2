
import { useState } from 'react';
import { Box, InputAdornment, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

export const InputSearch = ({ placeholder, fnc }) => {
    const [showClearIcon, setShowClearIcon] = useState('none');
    const [inputValue, setInputValue] = useState('');

    const handleChange = function (event) {
        setShowClearIcon(event === '' ? 'none' : 'flex');
    };

    const handleInput = (e) => {
        setInputValue(e);
        console.log(e);
    };

    const handleClick = function () {
        setShowClearIcon('none');
        setInputValue('');
    };
    return (
        <Box m={1}>
            <TextField
                size="small"
                variant="outlined"
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => {
                    handleInput(e.target.value);
                    handleChange(e.target.value);
                }}
                sx={{
                    width: '100%',
                    borderRadius: '40px',
                    outline: 'none',
                    backgroundColor: 'rgb(39,51,64)',
                    '&:hover': {
                        outline: 'none',
                        border: 'none',
                    },
                    '.Mui-focused': {
                        backgroundColor: 'rgb(21,32,43)',
                    },
                    input: {
                        '&::placeholder': {
                            color: 'rgb(231, 233, 234)',
                        },
                        '&:hover': {
                        outline: 'none',
                        border: 'none',
                    },
                    },
                    '.MuiOutlinedInput-root': {
                        borderRadius: '40px',
                        color: '#fff',
                        '&:hover': {
                        outline: 'none',
                        border: 'none',
                    },
                    },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchOutlinedIcon sx={{ color: 'rgb(113, 118, 123)' }} />
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
                                    color: 'rgb(29, 155, 240)',
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

