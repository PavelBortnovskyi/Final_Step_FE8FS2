import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from 'src/layout/Layout';
import { getAuthorizationData } from 'src/redux/selectors/selectors';
import { getUser } from 'src/redux/thunk/getUser';
import { clientSocket } from 'src/utils/socketSetup';
import { getTokens } from 'src/utils/tokens';
import { setCurrentMessage, setSocketChat } from 'src/redux/reducers/chatSlice';

// import Stomp from 'stompjs';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(getAuthorizationData);
  const { accessToken } = getTokens();

  const stompClientRef = useRef(null);

  //****************** CONNECT TO SOCKET *********************/
  useEffect(() => {
    if (isAuthenticated && accessToken) {
      try {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          Origin: 'client',
        };

        // create connection to socket
        const socket = new SockJS(
          'https://final-step-fe2fs8tw.herokuapp.com/chat-ws'
        );

        // for -> import Stomp from 'stompjs' TODO: this old library ?
        // stompClientRef.current = Stomp.over(socket);

        // connect
        stompClientRef.current = Stomp.over(() => socket);
        const stompClient = stompClientRef.current;

        // connect
        stompClient.connect(headers, () => {
          console.log('Connected to WebSocket server');

          // set connect to redux
          dispatch(setSocketChat(stompClient));

          // chat chanel
          stompClient.subscribe('/topic/chats', (message) => {
            const receivedMessage = JSON.parse(message.body);
            console.log('Received message:', receivedMessage);
            dispatch(setCurrentMessage(receivedMessage));
          });

          // notification chanel
          stompClient.subscribe('/topic/notifications', (message) => {
            const receivedNotifications = JSON.parse(message.body);
            console.log('Received notifications:', receivedNotifications);
          });
        });
      } catch (error) {
        console.error('Error activating STOMP connection:', error);
      }

      return () => {
        if (stompClientRef.current && stompClientRef.current.connected) {
          console.log('disconnect socket ->', stompClientRef.current.connected);
          stompClientRef.current.disconnect();
        }
      };
    }
  }, [dispatch, accessToken, isAuthenticated]);
  //*********************************************************/

  useEffect(() => {
    if (accessToken) {
      dispatch(getUser());
    }
  }, [accessToken, dispatch]);

  return <Layout />;
};
