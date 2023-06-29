import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Alert,
  Box,
  InputBase,
  Snackbar,
  alpha,
  styled,
  useTheme,
} from '@mui/material';
import EmojiEmotionOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import { getChats, getTheme, getUserData } from 'src/redux/selectors/selectors';
import { getTokens } from 'src/utils/tokens';

// ************ STYLE ************
const Sender = styled(Box)(({ theme }) => ({
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

const EmojiIconWrapper = styled(Box)(({ theme }) => ({
  padding: '2px',
  height: '100%',
  position: 'relative',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const PickerWrapper = styled(Box)`
  position: relative;
`;

const EmojiEmotionOutlinedIconStyles = styled(EmojiEmotionOutlinedIcon)(
  ({ theme }) => ({
    color: alpha(theme.palette.text.primary, 0.4),
    fontSize: '32px',
  })
);

const SendIconWrapper = styled(Box)(({ theme }) => ({
  padding: '6px',
  margin: '0 4px 0 0px',
  // height: '100%',
  borderRadius: '50%',
  backgroundColor: alpha(theme.palette.primary.main, 0.8),
  // pointerEvents: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ReplyAllIconStyles = styled(ReplyAllIcon)(({ theme }) => ({
  // color: alpha(theme.palette.primary.main, 0.2),
  color: '#fff',
  fontSize: '18px',
  transform: 'rotateZ(90deg)',
}));

const SenderInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  flex: '1 0 auto',
  '& .MuiInputBase-input': {
    padding: '6px 8px 6px 4px',
    // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

const BoxPicker = styled(Box)(({ theme }) => ({
  // flexGrow: '1',
  // display: 'flex',
  position: 'absolute',
  bottom: '4px',
  left: '0px',
  right: '0px',
  '& > div': {
    width: '100%',

    '& > em-emoji-picker': {
      width: '100%',
    },
  },
}));

// ************ STYLE ************

// ************ ChatSender ************
export const ChatSender = () => {
  // link textInput for Enter btn
  const textInputRef = useRef(null);

  // get theme color
  const { colorTheme } = useSelector(getTheme);

  // emoji Picker visible state
  const [openPicker, setOpenPicker] = useState(false);

  const [messageText, setMessageText] = useState('');
  const [errorSocket, setErrorSocket] = useState('');

  const { user } = useSelector(getUserData);
  const { socketChat, currentChat } = useSelector(getChats);

  const { accessToken } = getTokens();

  // set send text
  const sendText = async (e) => {
    const code = e.keyCode || e.which;
    if (code === 13 && messageText !== '') {
      // chatId - chat message recipient
      // userId - message author
      const message = {
        userId: user.id,
        chatId: currentChat[0].chatId,
        body: messageText,
      };

      // send event about new message to Socket server
      try {
        //********* Connect with SockJS (http://final-step ....) */
        // socketChat.send(
        //   '/api/v1/message',
        //   {
        //     Authorization: `Bearer ${accessToken}`,
        //     Origin: 'client',
        //   },
        //   JSON.stringify(message)
        // );
        //**********/

        //********* Connect without SockJS (wss://final-step ....) */
        socketChat.publish({
          destination: '/api/v1/message',
          body: JSON.stringify(message),
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Origin: 'client',
          },
        });
        //**********/
        //
      } catch (error) {
        setErrorSocket('Error connecting to socket server', error);
        const timer = setTimeout(() => {
          setErrorSocket('');
          clearTimeout(timer);
        }, 5000);
      }
      //******************************************************* */

      // clear sender input
      setMessageText('');
    }
  };

  // send text on Enter btn
  const handleSendMessageOnEnter = () => {
    const event = {
      target: textInputRef.current,
      key: 'Enter',
      keyCode: 13,
      which: 13,
    };
    sendText(event);
  };

  return (
    <>
      {
        <Snackbar open={!!errorSocket} autoHideDuration={5000}>
          <Alert severity="error">{errorSocket}</Alert>
        </Snackbar>
      }
      <Box sx={{ flexGrow: 1 }}>
        <PickerWrapper>
          <BoxPicker
            sx={{
              display: openPicker ? 'flex' : 'none',
            }}
          >
            <Picker
              theme={colorTheme}
              data={data}
              previewPosition="none"
              onClickOutside={() => {
                openPicker && setOpenPicker(false);
              }}
              onEmojiSelect={(e) => {
                setMessageText((prev) => prev + e.native);
              }}
              dynamicWidth={true}
              // perLine="4"
            />
          </BoxPicker>
        </PickerWrapper>
        <Sender>
          <EmojiIconWrapper>
            <EmojiEmotionOutlinedIconStyles
              onClick={() => setOpenPicker(!openPicker)}
            />
          </EmojiIconWrapper>
          <SenderInputBase
            ref={textInputRef}
            value={messageText}
            placeholder="Type your message"
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => sendText(e)}
          />
          <SendIconWrapper onClick={handleSendMessageOnEnter}>
            <ReplyAllIconStyles />
          </SendIconWrapper>
        </Sender>
      </Box>
    </>
  );
};
