import {
  Avatar,
  Box,
  Typography,
  Container,
  Tooltip,
  IconButton,
} from '@mui/material';
import { useSelector } from 'react-redux';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { useTheme } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { socketUrl } from 'src/utils/socketSetup';
import { io } from 'socket.io-client';

import { Loading } from 'src/UI/Loading';
import { getGuestChat } from 'src/redux/selectors/selectors';
import { chatCloseConnection } from 'src/redux/reducers/chatSlice';
import { ChatBox, Conversation } from './ChatBox';

// id:2
// fullName:"User2 Vasilevich"
// userTag:"@user2Tag"
// avatarImgUrl:null
// countUserFollowers:0
// createdAt:"2023-05-29T09:36:03.870049"
// verified:true

export const Chat = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // get guest data from redux
  const { isLoading, guest } = useSelector(getGuestChat);

  // close chat
  const handleCloseConnection = () => {
    dispatch(chatCloseConnection());
  };

  // return Loading component if isLoading=true
  // if (isLoading) return <Loading size={34} />;

  // check data not empty
  const isResult = guest ? true : false;

  // ************** CHAT ***************
  // create link on socket
  const socket = useRef();

  // set online guests
  const [onlineUsers, setOnlineUsers] = useState([]);

  // set message for socket server
  const [sendMessage, setSendMessage] = useState(null);

  // receive message from socket server
  const [receiveMessage, setReceiveMessage] = useState(null);

  // set chats where user be
  const [chats, setChats] = useState([]);

  // current chat
  const [currentChat, setCurrentChat] = useState(null);

  // create socket and send guest.id
  useEffect(() => {
    // /chat-ws
    socket.current = io(socketUrl);
    // TODO: send id guest
    socket.current.emit('add-new-user', guest.id);
    // TODO: get users online
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users);
    });
  }, [guest]);

  // send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      // TODO: set event for send message
      socket.current.emit('send-message', sendMessage);
    }
  }, [sendMessage]);

  // receive message from socket server
  useEffect(() => {
    // TODO: get all messages
    socket.current.on('receive-message', (data) => {
      setReceiveMessage(data);
    });
  }, []);

  return (
    <Container>
      {!isResult ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'flex-start',
            margin: '10px 0 26px',
          }}
        >
          <Typography variant="h6">Chat</Typography>
          {isLoading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '14px 0 ',
              }}
            >
              <Loading size={34} />
            </Box>
          )}
        </Box>
      ) : (
        <>
          <Box
            className="Chat"
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              margin: '10px 0 12px',
              paddingBottom: '12px',
              borderBottom: `1px solid ${theme.palette.border.main}`,
            }}
          >
            <Tooltip title="Close connection">
              <IconButton
                onClick={handleCloseConnection}
                sx={{
                  color: `${theme.palette.text.primary}`,
                  alignSelf: 'flex-start',
                }}
              >
                <ArrowCircleLeftOutlinedIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
            <Avatar
              sx={{ width: 56, height: 56, marginBottom: '8px' }}
              alt={guest.fullName}
              src={guest.avatarImgUrl && 'img/avatar/empty-avatar.png'}
            />
            <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
              {guest.fullName}
            </Typography>
            <Typography>{guest.userTag}</Typography>
          </Box>

          {/* body Chat */}
          <ChatBox
            chat={currentChat}
            currentUser={guest.id}
            setSendMessage={setSendMessage}
            receiveMessage={receiveMessage}
          />
        </>
      )}
    </Container>
  );
};
