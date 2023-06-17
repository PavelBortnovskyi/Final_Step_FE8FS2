import { styled, Box } from '@mui/material';
import { useState, useRef } from 'react';

import { ChatBodyMessage } from './ChatBodyMessage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChats } from 'src/redux/selectors/selectors';

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
  // const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);

  // get guest data from redux
  const { chatMessages } = useSelector(getChats);

  // get chat data
  useEffect(() => {
    const getChatData = async () => {
      if (!chatMessages) return;
      try {
        setMessages(chatMessages.content);
      } catch (error) {
        console.log(error);
      }
    };

    getChatData();
  }, [chatMessages]);

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
