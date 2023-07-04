import {
  Avatar,
  Box,
  Typography,
  Tooltip,
  IconButton,
  styled,
  alpha,
} from '@mui/material';
import { useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { getChats } from 'src/redux/selectors/selectors';
import { chatCloseConnection } from 'src/redux/reducers/chatSlice';
import { ChatBody } from './ChatBody';
import { getCurrentChat } from 'src/redux/thunk/getCurrentChat';
import { ChatSender } from './ChatSender';

// ************ STYLE ************
const ChatContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '8px',
  padding: '0 24px 30px',
  [theme.breakpoints.between('xs', 'md')]: { padding: '0 0 100px 0' },
}));

const ChatHeader = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0 26px;
`;

const BoxLoading = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 14px 0;
`;

const GuestInfo = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  margin: '10px 0 12px',
  paddingBottom: '12px',
  borderBottom: `1px solid ${theme.palette.border.main}`,
}));

const WelcomeMessage = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  flexDirection: 'column',
  margin: '10px 0 12px',
  paddingTop: '12px',
  borderTop: `1px solid ${theme.palette.border.main}`,
  color: alpha(theme.palette.text.primary, 0.5),
}));

const TooltipStyled = styled(Tooltip)(({ theme }) => ({
  position: 'absolute',
  top: '-2px',
  background: alpha(theme.palette.border.main, 0.5),
  borderRadius: '50%',

  '&:hover': {
    background: theme.palette.border.main,
  },
}));

// ************ STYLE ************

// ************ Chat ************
export const Chat = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // get guest data from redux
  const { guest } = useSelector(getChats);

  // close chat
  const handleCloseConnection = () => {
    dispatch(chatCloseConnection());
  };

  // ************** CHAT FROM DB ***************
  // create chat
  useEffect(() => {
    const createChat = () => {
      if (!guest) return;

      try {
        // get chat data
        dispatch(getCurrentChat({ guestId: guest.id, size: 999 }));
        //
      } catch (error) {
        console.log(error);
      }
    };

    createChat();
  }, [dispatch, guest]);
  // ************** CHAT FROM DB ***************

  return (
    <ChatContainer>
      {!guest ? (
        <ChatHeader>
          <Typography variant="h6">Chat</Typography>
          <WelcomeMessage>
            Choose from your existing conversations, start a new one, or just
            keep swimming.
          </WelcomeMessage>
        </ChatHeader>
      ) : (
        <>
          <GuestInfo>
            <TooltipStyled title="Close chat">
              <IconButton
                onClick={handleCloseConnection}
                sx={{
                  color: `${theme.palette.text.primary}`,
                  alignSelf: 'flex-start',
                }}
              >
                <ArrowBackIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </TooltipStyled>
            <Avatar
              sx={{ width: 56, height: 56, marginBottom: '8px' }}
              alt={guest.fullName}
              src={guest.avatarImgUrl || 'img/avatar/empty-avatar.png'}
            />
            <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
              {guest.fullName}
            </Typography>
            <Typography>{guest.userTag}</Typography>
          </GuestInfo>

          {/* Chat */}
          <ChatBody />
          <ChatSender />
        </>
      )}
    </ChatContainer>
  );
};
