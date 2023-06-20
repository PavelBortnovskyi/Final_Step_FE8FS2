import { Client } from '@stomp/stompjs';

import { getTokens } from './tokens.js';

// url socket server
export const socketUrl = 'wss://final-step-fe2fs8tw.herokuapp.com/chat-ws';
export const socketNotificationsUrl =
  'wss://final-step-fe2fs8tw.herokuapp.com/notifications-ws';

// socket connect
export const clientSocket = (onMessageReceived) => {
  const { accessToken } = getTokens();

  // create header
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Origin: 'client',
  };

  try {
    // create connect to socket
    const client = new Client({
      brokerURL: socketUrl,
      connectHeaders: headers,
      // debug: function (str) {
      //   console.log(str);
      // },
    });

    // after activate connect
    const connectCallback = () => {
      console.log('Connected to STOMP server');
      client.subscribe('/topic/chats', onMessageReceived, headers);
    };

    // // TODO:  create code for received messages
    // const onMessageReceived = (message) => {
    //   console.log('Received message:', message.body);
    // };

    // error socket
    const errorCallback = (error) => {
      console.error('*** Error:', error);
    };

    client.onConnect = connectCallback;
    client.onStompError = errorCallback;

    // activate connect
    client.activate();
    //
    return client;
    //
  } catch (error) {
    console.error('Error in clientSocket:', error);
  }
};
