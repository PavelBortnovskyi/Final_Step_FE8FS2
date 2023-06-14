import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from 'src/layout/Layout';
import { getAuthorizationData } from 'src/redux/selectors/selectors';
import { getUser } from 'src/redux/thunk/getUser';
import { useSocket } from 'src/utils/socketSetup';
import { getTokens } from 'src/utils/tokens';

import { Stomp, Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// 3
export const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(getAuthorizationData);
  const { accessToken } = getTokens();

  // const stompClientRef = useRef(null);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  // useEffect(() => {
  // const socket = new SockJS(
  //   'https://final-step-fe2fs8tw.herokuapp.com/chat-ws'
  // );
  // const client = Stomp.over(() => socket);

  // useEffect(() => {
  //   const client = new Client({
  //     brokerURL: 'wss://final-step-fe2fs8tw.herokuapp.com/chat-ws',
  //     connectHeaders: headers,
  //     debug: function (str) {
  //       console.log(str);
  //     },
  //   });

  //   // chatId - chat message recipient
  //   // userId - message author
  //   const connectCallback = () => {
  //     console.log('Connected to STOMP server');
  //     client.subscribe('/topic/chats', onMessageReceived);
  //     client.publish({
  //       destination: '/api/v1/message',
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       body: JSON.stringify({
  //         chatId: 24,
  //         userId: 2,
  //         body: 'Hello, server!',
  //       }),
  //     });
  //   };

  //   const errorCallback = (error) => {
  //     console.error('Error:', error);
  //   };

  //   const onMessageReceived = (message) => {
  //     console.log('Received message:', message.body);
  //   };

  //   client.onConnect = connectCallback;
  //   client.onStompError = errorCallback;

  //   client.activate();

  //   return () => {
  //     client.deactivate();
  //   };
  // }, [accessToken]);

  //*********************************************************/

  useEffect(() => {
    if (accessToken) {
      dispatch(getUser());
    }
  }, [accessToken, dispatch]);

  return <Layout />;
};
