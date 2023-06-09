import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from 'src/layout/Layout';
import { getAuthorizationData } from 'src/redux/selectors/selectors';
import { getUser } from 'src/redux/thunk/getUser';
import { useSocket } from 'src/utils/socketSetup';
import { getTokens } from 'src/utils/tokens';

import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(getAuthorizationData);
  const { accessToken } = getTokens();

  // const stompClientRef = useRef(null);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    console.log('1', headers);

    const socket = new SockJS(
      'https://final-step-fe2fs8tw.herokuapp.com/chat-ws',
      headers
    );

    const stompClient = Stomp.over(() => socket);
    // stompClientRef.current = stompClient;

    stompClient.connect(headers, () => {
      console.log('Connected to WebSocket server');

      stompClient.subscribe('/api/topic/chats', (message) => {
        const receivedMessage = JSON.parse(message.body);
        console.log('Received message:', receivedMessage);
      });
    });

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect();
      }
    };
  }, [accessToken, isAuthenticated]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUser());
    }
  }, [accessToken, dispatch]);

  return <Layout />;
};
