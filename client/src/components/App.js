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

  const stompClientRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS(
      'https://final-step-fe2fs8tw.herokuapp.com/chat-ws'
    );
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const stompClient = Stomp.over(() => socket);
    stompClientRef.current = stompClient;

    stompClientRef.current.connect(headers, () => {
      console.log('Connected to WebSocket server');

      stompClientRef.current.subscribe('/api/v1/message', (message) => {
        const receivedMessage = JSON.parse(message.body);
        console.log('Received message:', receivedMessage);
      });
    });

    return () => {
      if (stompClientRef.current && stompClientRef.current.connected) {
        stompClientRef.current.disconnect();
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
