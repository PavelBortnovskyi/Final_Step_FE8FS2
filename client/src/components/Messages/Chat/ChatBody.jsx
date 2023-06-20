import { styled, Box } from '@mui/material';
import { useState, useRef, useEffect } from 'react';

import { ChatBodyMessage } from './ChatBodyMessage';
import { useDispatch, useSelector } from 'react-redux';
import { getChats } from 'src/redux/selectors/selectors';
import { setCurrentMessage } from 'src/redux/reducers/chatSlice';

// ************ STYLE ************
const Container = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.border.main}`,
  display: 'flex',
  flexDirection: 'column',
  flex: '1 0 auto',
  height: '40vh',
  overflowY: 'scroll',
  padding: '0 6px 12px 0',
  gap: '8px',
}));
// ************ STYLE ************

// ************ ChatBody ************
export const ChatBody = () => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);

  // get guest data from redux
  const { chatMessages, currentMessage, currentChat } = useSelector(getChats);

  // get chat data history
  useEffect(() => {
    const getChatData = () => {
      if (!chatMessages) return;
      try {
        // clear messages
        setMessages([]);
        dispatch(setCurrentMessage(null));

        // set messages from DB
        setMessages([...chatMessages.content].reverse());
      } catch (error) {
        console.log(error);
      }
    };

    getChatData();
  }, [chatMessages]);

  // get current message
  useEffect(() => {
    if (!currentMessage) return;
    try {
      if (currentMessage.chatId === currentChat[0].chatId) {
        setMessages((prev) => [...prev, currentMessage]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentChat, currentMessage]);

  // ************* SCROLL *************
  // setting browser-scroll to useRef() to automatically scroll when message is outside
  const scrollRef = useRef();

  // always scroll to last message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  // ************* SCROLL *************
  return (
    <Container>
      {messages &&
        messages.map((message) => (
          <Box ref={scrollRef} key={message.messageId}>
            <ChatBodyMessage message={message} />
          </Box>
        ))}
    </Container>
  );
};
