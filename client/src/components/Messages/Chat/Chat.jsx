import {
  Avatar,
  Box,
  Typography,
  Tooltip,
  IconButton,
  styled,
  Container,
  alpha,
} from '@mui/material';
import { useSelector } from 'react-redux';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { useRef, useState, useEffect } from 'react';

import { Loading } from 'src/UI/Loading';
import { getChats } from 'src/redux/selectors/selectors';
import { chatCloseConnection } from 'src/redux/reducers/chatSlice';
import { ChatBody } from './ChatBody';
import { getCurrentChat } from 'src/redux/thunk/getCurrentChat';
import { ChatSender } from './ChatSender';
import { getChatMessages } from 'src/redux/thunk/getChatMessages';

// id:2
// fullName:"User2 Vasilevich"
// userTag:"@user2Tag"
// avatarImgUrl:null
// countUserFollowers:0
// createdAt:"2023-05-29T09:36:03.870049"
// verified:true

// ************ STYLE ************
const ChatContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  /* flex: 1 0 auto; */
  width: 100%;
  gap: 8px;
`;

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

// ************ STYLE ************

// ************ Chat ************
export const Chat = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // get guest data from redux
  const { isLoading, guest } = useSelector(getChats);

  // console.log('guest', guest);
  // console.log('currentChat', currentChat);

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
        // get chat messages from DB
        dispatch(getChatMessages({ chatId: guest.chatId, page: 0 }));

        // get chat data
        dispatch(getCurrentChat(guest.guestData.id));
        //
      } catch (error) {
        console.log(error);
      }
    };

    createChat();
  }, [dispatch, guest]);

  // ************** CHAT FROM DB ***************

  return (
    <Container sx={{ display: 'flex' }}>
      <ChatContainer>
        {!guest ? (
          <ChatHeader>
            <Typography variant="h6">Chat</Typography>

            {isLoading ? (
              <BoxLoading>
                <Loading size={34} />
              </BoxLoading>
            ) : (
              <WelcomeMessage>
                Choose from your existing conversations, start a new one, or
                just keep swimming.
              </WelcomeMessage>
            )}
          </ChatHeader>
        ) : (
          <>
            <GuestInfo>
              <Tooltip title="Close connection">
                <IconButton
                  onClick={handleCloseConnection}
                  sx={{
                    color: `${theme.palette.text.primary}`,
                    alignSelf: 'flex-start',
                  }}
                >
                  <ArrowBackIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </Tooltip>
              <Avatar
                sx={{ width: 56, height: 56, marginBottom: '8px' }}
                alt={guest.guestData.fullName}
                src={
                  guest.guestData.avatarImgUrl || 'img/avatar/empty-avatar.png'
                }
              />
              <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                {guest.guestData.fullName}
              </Typography>
              <Typography>{guest.guestData.userTag}</Typography>
            </GuestInfo>

            {/* Chat */}
            <ChatBody />
            <ChatSender />
          </>
        )}
      </ChatContainer>
    </Container>
  );
};
