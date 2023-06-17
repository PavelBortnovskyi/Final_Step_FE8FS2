import { Avatar, Box, alpha, styled } from '@mui/material';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import TimeAgo from 'timeago-react';
import { useDispatch } from 'react-redux';

import UserNames from 'src/UI/UserNames';
import { getGuest } from 'src/redux/thunk/getGuest';
import { getChatMessages } from 'src/redux/thunk/getChatMessages';

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

const GroupChatLogo = styled(Box)`
  width: 56px;
  height: 56px;
  font-size: 56px;
`;

const BoxGroupList = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PeopleAltOutlinedIconStyled = styled(PeopleAltOutlinedIcon)`
  font-size: 56px;
  color: #b1b3b6;
`;

const GroupGuests = styled(Box)`
  display: flex;
  gap: 4px;
`;

const MessageBox = styled(Box)(({ theme }) => ({
  fontSize: '12px',
  color: alpha(theme.palette.text.primary, 0.5),
}));

// ************ STYLE ************

// ************ ContactChat ************
export const ContactChat = ({ chat }) => {
  const dispatch = useDispatch();
  const { chatId, guest, group, messages } = chat;

  // message character limit
  const truncatedText =
    messages.body.length > 30
      ? messages.body.slice(0, 30) + '...'
      : messages.body;

  // set personal chat
  const handleClick = (id) => {
    // get guest data
    dispatch(getGuest(id));
  };

  // set group chat
  const handleGroupChat = (id) => {
    dispatch(getChatMessages(id));
  };

  return !group ? (
    <BoxContactGuest onClick={() => handleClick(guest.id)}>
      <Avatar
        sx={{ width: 56, height: 56 }}
        alt={guest.fullName}
        src={guest.avatarImgUrl || 'img/avatar/empty-avatar.png'}
      />
      <UserNames
        fullName={guest.fullName}
        userTag={guest.userTag}
        postTime={messages.sent}
        text={truncatedText}
      />
    </BoxContactGuest>
  ) : (
    <BoxContactGuest onClick={() => handleGroupChat(chatId)}>
      <GroupChatLogo>
        <PeopleAltOutlinedIconStyled />
      </GroupChatLogo>
      <BoxGroupList>
        {guest.map((item) => (
          <GroupGuests key={item.id} sx={{ fontSize: '16px' }}>
            <Box>{item.fullName}</Box>
            <Box>&#8901;</Box>
            <Box sx={{ fontSize: '14px' }}>{item.userTag}</Box>
          </GroupGuests>
        ))}
        <MessageBox
          sx={{
            fontSize: '14px',
            display: 'flex',
            alignItems: 'baseline',
            gap: '4px',
          }}
        >
          <Box>
            <TimeAgo datetime={messages.sent} />
          </Box>
          <Box>&#8901;</Box>
          <Box>{truncatedText}</Box>
        </MessageBox>
      </BoxGroupList>
    </BoxContactGuest>
  );
};
