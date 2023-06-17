import { Avatar, Box, alpha, styled } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import UserNames from 'src/UI/UserNames';
import { getGuest } from 'src/redux/thunk/getGuest';

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
  const dispatch = useDispatch();
  const { id, fullName, avatarImgUrl, userTag, messages } = guest;

  const handleClick = (id) => {
    // get guest data
    dispatch(getGuest(id));
  };

  // message character limit
  const truncatedText =
    messages.body.length > 30
      ? messages.body.slice(0, 30) + '...'
      : messages.body;

  return (
    <BoxContactGuest onClick={() => handleClick(id)}>
      <Avatar
        sx={{ width: 56, height: 56 }}
        alt={fullName}
        src={avatarImgUrl || 'img/avatar/empty-avatar.png'}
      />
      <UserNames
        fullName={fullName}
        userTag={userTag}
        text={truncatedText}
        postTime={messages.sent}
      />
    </BoxContactGuest>
  );
};
