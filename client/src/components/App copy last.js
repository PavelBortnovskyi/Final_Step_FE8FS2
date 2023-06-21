import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from 'src/layout/Layout';
import { getAuthorizationData } from 'src/redux/selectors/selectors';
import { getUser } from 'src/redux/thunk/getUser';
import { clientSocket } from 'src/utils/socketSetup';
import { getTokens } from 'src/utils/tokens';
import { setCurrentMessage, setSocketChat } from 'src/redux/reducers/chatSlice';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

export const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(getAuthorizationData);
  const { accessToken } = getTokens();

  // const stompClientRef = useRef(null);

  //****************** CONNECT TO SOCKET *********************/
  // useEffect(() => {
  //   if (isAuthenticated && accessToken) {
  //     try {
  //       // set received messages to redux
  //       const onMessageReceived = (message) => {
  //         console.log('Received message:', message.body);
  //         dispatch(setCurrentMessage(JSON.parse(message.body)));
  //       };
  //
  //       // create connect to socket
  //       stompClientRef.current = clientSocket(onMessageReceived);
  //       dispatch(setSocketChat(stompClientRef.current));
  //       //
  //     } catch (error) {
  //       console.error('Error activating STOMP connection:', error);
  //     }
  //
  //     return () => {
  //       try {
  //         stompClientRef.current.deactivate();
  //         //
  //       } catch (error) {
  //         console.error('Error deactivating STOMP connection:', error);
  //
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
    // Создаем WebSocket-соединение
    const socket = new SockJS('https://final-step-fe2fs8tw.herokuapp.com/chat-ws');
    const stompClient = Stomp.over(socket);

    // Устанавливаем колбэк-функцию при успешном соединении
    stompClient.connect({}, () => {
      // Подписываемся на каналы
      stompClient.subscribe('/topic/chats', (message) => {
        console.log('Received message from /chat:', message.body);
        // Действия с полученным сообщением
      });

      stompClient.subscribe('/topic/notifications', (message) => {
        console.log('Received message from /notification:', message.body);
        // Действия с полученным сообщением
      });
    });

    // Возвращаем функцию для закрытия соединения при размонтировании компонента
    return () => {
      stompClient.disconnect();
    };
  }, []);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUser());
    }
  }, [accessToken, dispatch]);

  return <Layout />;
};
