import { Box, InputBase, alpha, styled } from '@mui/material';
import EmojiEmotionOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import AttachFile from '@mui/icons-material/AttachFile';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getChats, getUserData } from 'src/redux/selectors/selectors';
import { getTokens } from 'src/utils/tokens';

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

  const { guest, socketChat } = useSelector(getChats);
  const { user } = useSelector(getUserData);

  const { accessToken } = getTokens();

  // set send text
  const sendText = async (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      // chatId - chat message recipient
      // userId - message author
      const message = {
        userId: user.id,
        chatId: guest.chatId,
        // body: JSON.stringify(messageText),
        body: messageText,
      };

      console.log(message);

      // send event about new message to Socket server
      socketChat.publish({
        destination: '/api/v1/message',
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        //   Origin: 'client',
        // },
        body: JSON.stringify(message),
      });

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
