import { Avatar, Box, alpha, styled } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MailIcon from '@mui/icons-material/Mail';

import { MessagesUserNames } from 'src/UI/MessagesUserNames';
import {
  setGuest,
  setNewMessageNotification,
} from 'src/redux/reducers/chatSlice';
import { getChats, getUserData } from 'src/redux/selectors/selectors';

// ************ STYLE ************
const BoxContactGuest = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  gap: '12px',
  padding: '8px',
  borderBottom: ` 1px solid ${theme.palette.border.main}`,

  '&:hover': {
    backgroundColor: alpha(theme.palette.text.primary, 0.1),
    cursor: 'pointer',
  },
}));

const NewMessageBox = styled(Box)`
  position: absolute;
  left: 4px;
  top: 2px;
  z-index: 1;

  & svg {
    font-size: 20px;
    color: #1e9bf0;
  }
`;
// ************ STYLE ************

export const ContactGuest = ({ guestData }) => {
  const dispatch = useDispatch();
  const { id, fullName, avatarImgUrl, userTag, messages } = guestData;

  const { user } = useSelector(getUserData);

  // notification of new message
  const { newMessageNotification, currentChat, currentMessage, guest } =
    useSelector(getChats);
  const [newMessage, setNewMessage] = useState(false);

  useEffect(() => {
    if (
      guest &&
      currentChat &&
      currentMessage &&
      currentChat[0].chatId === currentMessage.chatId
    ) {
      const newArr = newMessageNotification.filter(
        (item) => item !== user.id && item !== guest.id
      );
      dispatch(setNewMessageNotification(newArr));
    }
  }, [dispatch, currentChat, currentMessage, guest]);

  useEffect(() => {
    if (newMessageNotification.includes(id)) {
      setNewMessage(true);
    } else {
      setNewMessage(false);
    }
  }, [id, newMessageNotification]);

  const handleClick = () => {
    // set guest from local data
    dispatch(setGuest(guestData));

    // clear notification
    if (newMessageNotification.includes(id)) {
      const updatedNotification = newMessageNotification.filter(
        (item) => item !== id
      );
      dispatch(setNewMessageNotification(updatedNotification));
    }
  };

  // message character limit
  const truncatedText =
    messages.body.length > 28
      ? messages.body.slice(0, 28) + '...'
      : messages.body;

  return (
    <BoxContactGuest onClick={() => handleClick()}>
      {newMessage && (
        <NewMessageBox>
          <MailIcon />
        </NewMessageBox>
      )}
      <Avatar
        sx={{ width: 56, height: 56 }}
        alt={fullName}
        src={avatarImgUrl || 'img/avatar/empty-avatar.png'}
      />
      <MessagesUserNames
        fullName={fullName}
        userTag={userTag}
        text={truncatedText}
        postTime={messages.sent}
      />
    </BoxContactGuest>
  );
};
