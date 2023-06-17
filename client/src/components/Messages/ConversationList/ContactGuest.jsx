import { Avatar, Box, alpha, styled } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import UserNames from 'src/UI/UserNames';
import { setGuest } from 'src/redux/reducers/chatSlice';
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
  const {
    chatId,
    guestData: { id, fullName, avatarImgUrl, userTag },
    messages,
  } = guest;

  const handleClick = () => {
    // set guest from local data
    dispatch(setGuest(guest));
  };

  // message character limit
  const truncatedText =
    messages.body.length > 28
      ? messages.body.slice(0, 28) + '...'
      : messages.body;

  return (
    <BoxContactGuest onClick={() => handleClick()}>
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
