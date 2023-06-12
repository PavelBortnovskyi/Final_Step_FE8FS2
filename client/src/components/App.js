import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from 'src/layout/Layout';
import { getAuthorizationData } from 'src/redux/selectors/selectors';
import { getUser } from 'src/redux/thunk/getUser';
import { useSocket } from 'src/utils/socketSetup';
import { getTokens } from 'src/utils/tokens';

import { Stomp, Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// 2
export const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(getAuthorizationData);
  const { accessToken } = getTokens();

  // const stompClientRef = useRef(null);

  // const headers = {
  //   Authorization: `Bearer ${accessToken}`,
  // };

  // useEffect(() => {
  //   const socket = new SockJS(
  //     'https://final-step-fe2fs8tw.herokuapp.com/chat-ws'
  //   );
  //   const client = Stomp.over(() => socket);

  //   client.onConnect = (frame) => {
  //     console.log('STOMP connection established:', frame);
  //     // Подписка на канал с сообщениями
  //     client.subscribe('/topic/chats', (message) => {
  //       // Обработка полученных сообщений
  //       const receivedMessage = JSON.parse(message.body);
  //       console.log('Received message:', receivedMessage);
  //     });
  //   };

  //   client.connect(
  //     { Authorization: `Bearer ${accessToken}` },
  //     () => {
  //       client.onConnect();
  //     },
  //     (error) => {
  //       console.error('STOMP connection error:', error);
  //     }
  //   );

  //   // Отправка сообщения
  //   const sendMessage = (message) => {
  //     client.send('/api/v1/message', {}, JSON.stringify(message));
  //   };

  //   // Пример отправки сообщения
  //   const message = {
  //     chatId: 16,
  //     userId: 4,
  //     body: 'Hello, server!',
  //   };
  //   // sendMessage(message);

  //   // Отключение от сервера сокетов
  //   return () => {
  //     client.onDisconnect();
  //   };
  // }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUser());
    }
  }, [accessToken, dispatch]);

  return <Layout />;
};
