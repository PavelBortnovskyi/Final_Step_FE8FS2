import { Avatar, Box, alpha, styled } from '@mui/material';
import { useState, useEffect } from 'react';
import UserNames from 'src/UI/UserNames';

// ************ STYLE ************
const BoxContactGuest = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '12px',
  padding: '8px',
  borderBottom: ` 1px solid ${theme.palette.border.main}`,

  '&:hover': {
    backgroundColor: alpha(theme.palette.text.primary, 0.1),
    cursor: 'pointer',
  },
}));
// ************ STYLE ************

export const ContactGuest = ({ guest }) => {
  const { fullName, avatarImgUrl, userTag, messages } = guest;
  // onClick={() => handleClick(id)}
  // console.log(messages.body);

  // message character limit
  const truncatedText =
    messages.body.length > 40
      ? messages.body.slice(0, 40) + '...'
      : messages.body;

  return (
    <BoxContactGuest>
      <Avatar
        sx={{ width: 56, height: 56 }}
        alt={fullName}
        src={avatarImgUrl && 'img/avatar/empty-avatar.png'}
      />
      <UserNames fullName={fullName} userTag={userTag} text={truncatedText} />
    </BoxContactGuest>
  );
};
