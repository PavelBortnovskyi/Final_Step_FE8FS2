import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from 'src/layout/Layout';
import {
  getAuthorizationData,
  getUserData,
} from 'src/redux/selectors/selectors';
import { getUser } from 'src/redux/thunk/getUser';
import { getTokens } from 'src/utils/tokens';
import { notAuthenticated } from 'src/redux/reducers/authSlice';
import { setCurrentMessage, setSocketChat } from 'src/redux/reducers/chatSlice';
import { setSocketNotification } from 'src/redux/reducers/getNotificationsSlice';

// import Stomp from 'stompjs';
import { Stomp, Client } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';

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

        // connect socket
        const connectCallback = () => {
          console.log('Connected to STOMP server');

          // notification chanel
          stompClient.subscribe(
            `/topic/notifications/${user.email}`,
            onNotificationReceived,
            headers
          );

          // chat chanel
          stompClient.subscribe(
            `/topic/chats/${user.email}`,
            onMessageReceived,
            headers
          );

          // set socket connection to redux
          dispatch(setSocketChat(stompClient));

          // send message
          // stompClient.publish({
          //   destination: '/api/v1/message',
          //   body: JSON.stringify({
          //     userId: 1,
          //     chatId: 2,
          //     body: 'test message',
          //   }),
          //   headers: {
          //     Authorization: `Bearer ${accessToken}`,
          //     Origin: 'client',
          //   },
          // });
        };

        // error socket
        const errorCallback = (error) => {
          console.error('*** Error:', error.headers.message);
          if (error.headers.message.includes('UNAUTHORIZED')) {
            console.error('*** Error: token is wrong');
          }
        };

        // create socket connect to server
        stompClientRef.current = new Client({
          brokerURL: socketUrl,
          connectHeaders: headers,
          heartbeatIncoming: 25000,
          heartbeatOutgoing: 25000,
          onConnect: connectCallback,
          onStompError: errorCallback,
          // debug: function (str) {
          //   console.log(str);
          // },
        });
        const stompClient = stompClientRef.current;

        // set received messages to redux
        const onMessageReceived = (message) => {
          // console.log('Received message:', message);
          dispatch(setCurrentMessage(JSON.parse(message.body)));
        };

        // set notification to redux
        const onNotificationReceived = (notification) => {
          // console.log('Received notification:', notification.body);
          dispatch(setSocketNotification(JSON.parse(notification.body)));
        };

        // activate connect
        stompClient.activate();
        //
      } catch (error) {
        console.error('Error activating STOMP connection:', error);
      }

      return () => {
        try {
          stompClientRef.current.deactivate();
          console.log('*** disconnect');
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
      if (!user) {
        dispatch(getUser());
      }
    } else {
      dispatch(notAuthenticated());
    }
  }, [dispatch, accessToken, user]);

  return <Layout />;
};
