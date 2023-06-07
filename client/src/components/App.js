import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { Layout } from 'src/layout/Layout';
import { setSocketChat } from 'src/redux/reducers/chatSlice';
import { getAuthorizationData } from 'src/redux/selectors/selectors';
import { getUser } from 'src/redux/thunk/getUser';
import { socketChatUrl } from 'src/utils/socketSetup';

export const App = () => {
  const dispatch = useDispatch();
  // get message from server after authorization
  const { isAuthenticated } = useSelector(getAuthorizationData);

  const socketChatRef = useRef();

  // connection socket server
  useEffect(() => {
    if (!isAuthenticated) return;
    const token = localStorage.getItem('accessToken');

    // create connection socketChatUrl
    socketChatRef.current = io('wss://final-step-fe2fs8tw.herokuapp.com', {
      path: '/chat-ws',
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    // set socket in redux
    dispatch(setSocketChat(socketChatRef.current));

    return () => {
      // disconnect webSocket server when component dismount
      socketChatRef.current.disconnect();
    };
  }, [dispatch, isAuthenticated]);

  // if the user has a token in localStorage, the user is authorized
  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      dispatch(getUser());
    }
  }, [dispatch]);

  return <Layout />;
};
