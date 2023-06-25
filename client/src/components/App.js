import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from 'src/layout/Layout';
import {
  getAuthorizationData,
  getUserData,
} from 'src/redux/selectors/selectors';
import { getUser } from 'src/redux/thunk/getUser';
import { getTokens } from 'src/utils/tokens';
import { setCurrentMessage, setSocketChat } from 'src/redux/reducers/chatSlice';

// import Stomp from 'stompjs';
import { Stomp, Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// url socket server
export const socketUrl = 'wss://final-step-fe2fs8tw.herokuapp.com/chat-ws';

export const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(getAuthorizationData);
  const { user } = useSelector(getUserData);
  const { accessToken } = getTokens();

  // socket connection reference
  const stompClientRef = useRef(null);

  //****************** CONNECT TO SOCKET without SockJS  *****************/
  useEffect(() => {
    if (isAuthenticated && accessToken && user) {
      try {
        // create header
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          Origin: 'client',
        };

        // create connect to socket
        stompClientRef.current = new Client({
          brokerURL: socketUrl,
          connectHeaders: headers,
          // debug: function (str) {
          //   console.log(str);
          // },
        });
        const stompClient = stompClientRef.current;

        // after activate connect
        const connectCallback = () => {
          console.log('Connected to STOMP server');
          //
          // stompClient.subscribe('/topic/chats', onMessageReceived, headers);

          stompClient.subscribe(
            '/topic/notifications',
            (notification) => {
              console.log('notification: ', notification.body);
            },
            headers
          );

          stompClient.subscribe(
            `/topic/chats/${user.email}`,
            onMessageReceived,
            headers
          );
          dispatch(setSocketChat(stompClient));
        };

        // set received messages to redux
        const onMessageReceived = (message) => {
          console.log('Received message:', message.body);
          dispatch(setCurrentMessage(JSON.parse(message.body)));
        };

        // error socket
        const errorCallback = (error) => {
          console.error('*** Error:', error);
        };

        stompClient.onConnect = connectCallback;
        stompClient.onStompError = errorCallback;

        // activate connect
        stompClient.activate();
        //

        //
      } catch (error) {
        console.error('Error activating STOMP connection:', error);
      }

      return () => {
        try {
          stompClientRef.current.deactivate();
          console.log('disconnect');
          //
        } catch (error) {
          console.error('Error deactivating STOMP connection:', error);

          // TODO: work ??? If there is a connection error, try to reconnect.
          if (error.message === 'Lost connection to server') {
            console.log('Attempting to reconnect...');
            stompClientRef.current.activate();
          }
        }
      };
    }
  }, [dispatch, accessToken, isAuthenticated, user]);
  //*********************************************************/

  useEffect(() => {
    if (accessToken) {
      console.log('App auth, token:', isAuthenticated, accessToken);
      dispatch(getUser());
    }
  }, [dispatch, accessToken, isAuthenticated]);

  return <Layout />;
};
