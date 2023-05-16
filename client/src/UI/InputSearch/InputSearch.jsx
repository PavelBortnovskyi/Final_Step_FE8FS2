import React, { useState } from 'react'
import { Box, TextField, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';




const InputSearchStyled = styled(TextField)((props) => ({
    'input': {
        padding: '12px',
        color: 'rgb(247, 249, 249)',
        maxWidth: '280px',
    },

    '& .MuiInput-root': {
        '&:before': {
            content: 'none',
        },
        '&:after': {
            content: 'none',
        },
    },
}))


export const InputSearch = ({placeholder, fnc}) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const clearInput = () => {
        setInputValue('');
    };

    return (
        <Box sx={{
            '& > :not(style)': { m: 1 },
        }}>

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 12px',
                borderRadius: '30px',
                backgroundColor: 'rgb(39,51,64)',
                boxSizing: 'border-box',
                '&:focus-within': {
                    border: '1px solid rgb(29, 155, 240)',
                    '&:focus-within svg': {
                        color: 'rgb(29, 155, 240)',
                    },
                },
            }}>
                <SearchIcon sx={{
                    color: 'rgb(118, 118, 118)',
                }} />
                <InputSearchStyled
                    id="input-with-sx"
                    autoComplete="off"
                    placeholder={placeholder}
                    variant="standard"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                {inputValue && (
                    <CancelIcon onClick={clearInput} />
                )}
            </Box>
        </Box>
    )
}




// Варіант Артема нижче

// import { useState } from 'react';
// import { Box, InputAdornment, TextField } from '@mui/material';
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

// export const InputSearch = ({ placeholder, fnc }) => {
//     const [showClearIcon, setShowClearIcon] = useState('none');
//     const [inputValue, setInputValue] = useState('');

//     const handleChange = function (event) {
//         setShowClearIcon(event === '' ? 'none' : 'flex');
//     };

//     const handleInput = (e) => {
//         setInputValue(e);
//         console.log(e);
//     };

//     const handleClick = function () {
//         setShowClearIcon('none');
//         setInputValue('');
//     };
//     return (
//         <Box>
//             <TextField
//                 size="small"
//                 variant="outlined"
//                 placeholder={placeholder}
//                 value={inputValue}
//                 onChange={(e) => {
//                     handleInput(e.target.value);
//                     handleChange(e.target.value);
//                 }}
//                 sx={{
//                     width: '100%',
//                     backgroundColor: 'rgb(32, 35, 39)',
//                     borderRadius: '40px',
//                     outline: 'none',
//                     '.Mui-focused': {
//                         backgroundColor: '#000',
//                     },
//                     input: {
//                         '&::placeholder': {
//                             color: 'rgb(231, 233, 234)',
//                         },
//                     },
//                     '.MuiOutlinedInput-root': {
//                         borderRadius: '40px',
//                         color: '#fff',
//                     },
//                 }}
//                 InputProps={{
//                     startAdornment: (
//                         <InputAdornment position="start">
//                             <SearchOutlinedIcon sx={{ color: 'rgb(113, 118, 123)' }} />
//                         </InputAdornment>
//                     ),
//                     endAdornment: (
//                         <InputAdornment
//                             position="end"
//                             style={{ display: showClearIcon }}
//                             onClick={handleClick}
//                         >
//                             <CancelRoundedIcon
//                                 sx={{
//                                     color: 'rgb(29, 155, 240)',
//                                     '&:hover': {
//                                         cursor: 'pointer',
//                                     },
//                                 }}
//                             />
//                         </InputAdornment>
//                     ),
//                 }}
//             />
//         </Box>
//     );
// };

