import { Box, InputBase, alpha, styled } from '@mui/material';
import EmojiEmotionOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import AttachFile from '@mui/icons-material/AttachFile';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getGuestChat } from 'src/redux/selectors/selectors';

// ************ STYLE ************
const Sender = styled('div')(({ theme }) => ({
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

const EmojiIconWrapper = styled('div')(({ theme }) => ({
  padding: '8px',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const SenderInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: '6px 0 10px 10px',
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));
// ************ STYLE ************

// ************ ChatSender ************
export const ChatSender = () => {
  const [messageText, setMessageText] = useState('');

  const { guest, currentChat, socketChat } = useSelector(getGuestChat);

  // set send text
  const sendText = async (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      // TODO: need create send message
      const message = {
        userId: guest.id,
        chatId: currentChat.chatId,
        body: messageText,
      };

      console.log(message);
      console.log(socketChat);

      // send message to DB
      // await newMessage(message);

      // send event about new message to Socket server
      socketChat.emit('/api/v1/message', message);

      // clear sender input
      setMessageText('');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Sender>
        <EmojiIconWrapper>
          <EmojiEmotionOutlinedIcon sx={{ cursor: 'pointer' }} />
        </EmojiIconWrapper>
        <SenderInputBase
          value={messageText}
          placeholder="Type your message"
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={(e) => sendText(e)}
        />
      </Sender>
    </Box>
  );
};
