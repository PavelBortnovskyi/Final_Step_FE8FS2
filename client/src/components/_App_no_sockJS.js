import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from 'src/layout/Layout';
import { getAuthorizationData } from 'src/redux/selectors/selectors';
import { getUser } from 'src/redux/thunk/getUser';
import { getTokens } from 'src/utils/tokens';
import { setCurrentMessage, setSocketChat } from 'src/redux/reducers/chatSlice';

// import Stomp from 'stompjs';
import { Stomp, Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// url socket server
export const socketUrl = 'ws://localhost:8080/chat-ws';

export const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(getAuthorizationData);
  const { accessToken } = getTokens();

  // socket connection reference
  const stompClientRef = useRef(null);

  //****************** CONNECT TO SOCKET without SockJS  *****************/
  // useEffect(() => {
  //   if (isAuthenticated && accessToken) {
  //     try {
  //       // create header
  //       const headers = {
  //         Authorization: `Bearer ${accessToken}`,
  //         Origin: 'client',
  //       };

  //       // create connect to socket
  //       stompClientRef.current = new Client({
  //         brokerURL: socketUrl,
  //         connectHeaders: headers,
  //         debug: function (str) {
  //           console.log(str);
  //         },
  //       });
  //       const stompClient = stompClientRef.current;

  //       // after activate connect
  //       const connectCallback = () => {
  //         console.log('Connected to STOMP server');
  //         stompClient.subscribe('/topic/chats', onMessageReceived, headers);
  //         stompClient.subscribe(
  //           '/topic/notifications',
  //           (notification) => {
  //             console.log('notification: ', notification.body);
  //           },
  //           headers
  //         );
  //         dispatch(setSocketChat(stompClient));
  //       };

  //       // set received messages to redux
  //       const onMessageReceived = (message) => {
  //         console.log('Received message:', message.body);
  //         dispatch(setCurrentMessage(JSON.parse(message.body)));
  //       };

  //       // error socket
  //       const errorCallback = (error) => {
  //         console.error('*** Error:', error);
  //       };

  //       stompClient.onConnect = connectCallback;
  //       stompClient.onStompError = errorCallback;

  //       // activate connect
  //       stompClient.activate();
  //       //

  //       //
  //     } catch (error) {
  //       console.error('Error activating STOMP connection:', error);
  //     }

  //     return () => {
  //       try {
  //         stompClientRef.current.deactivate();
  //         //
  //       } catch (error) {
  //         console.error('Error deactivating STOMP connection:', error);

  //         // TODO: work ??? If there is a connection error, try to reconnect.
  //         if (error.message === 'Lost connection to server') {
  //           console.log('Attempting to reconnect...');
  //           stompClientRef.current.activate();
  //         }
  //       }
  //     };
  //   }
  // }, [dispatch, accessToken, isAuthenticated]);
  //*********************************************************/

  useEffect(() => {
    if (accessToken) {
      dispatch(getUser());
    }
  }, [accessToken, dispatch]);

  return <Layout />;
};
