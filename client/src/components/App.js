import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from 'src/layout/Layout';
import { getAuthorizationData } from 'src/redux/selectors/selectors';
import { getUser } from 'src/redux/thunk/getUser';
import { useSocket } from 'src/utils/socketSetup';
import { getTokens } from 'src/utils/tokens';

import { Stomp, Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { setSocketChat } from 'src/redux/reducers/chatSlice';

// 3
export const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(getAuthorizationData);
  const { accessToken } = getTokens();

  const stompClientRef = useRef(null);

  //****************** CONNECT TO SOCKET *********************/
  useEffect(() => {
    if (isAuthenticated) {
      // create header
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        Origin: 'client',
      };

      try {
        // create connect to socket
        stompClientRef.current = new Client({
          brokerURL: 'wss://final-step-fe2fs8tw.herokuapp.com/chat-ws',
          connectHeaders: headers,
          debug: function (str) {
            console.log(str);
          },
        });

        // after activate connect
        const connectCallback = () => {
          console.log('Connected to STOMP server');

          stompClientRef.current.subscribe(
            '/topic/chats',
            onMessageReceived,
            headers
          );

          // set socket connect to redux
          dispatch(setSocketChat(stompClientRef.current));
        };

        // error socket
        const errorCallback = (error) => {
          console.error('Error:', error);
        };

        // TODO:  create code for received messages
        const onMessageReceived = (message) => {
          console.log('Received message:', message.body);
        };

        stompClientRef.current.onConnect = connectCallback;
        stompClientRef.current.onStompError = errorCallback;

        // activate connect
        stompClientRef.current.activate();
        //
      } catch (error) {
        console.error('Error activating STOMP connection:', error);
      }

      return () => {
        try {
          stompClientRef.current.deactivate();
          //
        } catch (error) {
          console.error('Error deactivating STOMP connection:', error);

          // Если ошибка связи, попытайтесь переконектиться
          if (error.message === 'Lost connection to server') {
            console.log('Attempting to reconnect...');
            stompClientRef.current.activate();
          }
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
