import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { setSocketChat } from 'src/redux/reducers/chatSlice';
import { useRef } from 'react';
import { useEffect } from 'react';

// url socket server
export const socketUrl = 'wss://final-step-fe2fs8tw.herokuapp.com/chat-ws';
export const socketNotificationsUrl =
  'wss://final-step-fe2fs8tw.herokuapp.com/notifications-ws';

export const connectSocket = (accessToken) => {
  // set connect
  const socket = io(socketUrl, {
    path: '/chat-ws',
    extraHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return socket;
};

// set disconnect
export const disconnectSocket = (socket) => {
  if (socket) {
    socket.disconnect();
  }
};

//
export const useSocket = (accessToken, isAuthenticated) => {
  const dispatch = useDispatch();
  const socketChatRef = useRef();

  useEffect(() => {
    if (!isAuthenticated) return;

    socketChatRef.current = connectSocket(accessToken);

    dispatch(setSocketChat(socketChatRef.current));

    return () => {
      disconnectSocket(socketChatRef.current);
    };
  }, [accessToken, isAuthenticated, dispatch]);

  return socketChatRef.current;
};
