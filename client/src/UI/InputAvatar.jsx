import { Avatar, Box, FilledInput, styled } from '@mui/material';
import React from 'react';

const InputStyled = styled(FilledInput)((props) => ({
  flex: 1,
  marginLeft: '20px',
  fontSize: '20px',
  border: 'none',
  color: '#fff',
  backgroundColor: 'inherit',
  '&:hover': {
    backgroundColor: 'inherit',
  },
  '&.Mui-focused': {
    '&:after': {
      content: 'none',
    },
  },
}));

function InputAvatar({ avatarUrl, placeholder, feature }) {
  return (
    <Box display="flex" p="20px">
      <Avatar sx={{ width: 56, height: 56 }} alt="Remy Sharp" src={avatarUrl} />

      <InputStyled
        placeholder={placeholder}
        disableUnderline={false}
        name="PostText"
        onChange={(event) => feature(event.target.value)}
      />
    </Box>
  );
}

export default InputAvatar;
