import { styled, Box } from '@mui/material';
import { useState, useRef } from 'react';

import { ChatBodyMessage } from './ChatBodyMessage';

// ************ STYLE ************
const Container = styled(Box)`
  border-bottom: 1px solid #f6f6f6;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  height: 40vh;
  overflow-y: scroll;
  padding: 0 6px 12px 0;
  gap: 8px;
`;
// ************ STYLE ************

// ************ ChatBody ************
export const ChatBody = () => {
  const [messages, setMessages] = useState([]);

  // setting browser-scroll to useRef() to automatically scroll when message is outside
  const scrollRef = useRef();
  return (
    <Container>
      {messages &&
        messages.map((message, index) => (
          <Box ref={scrollRef} key={index}>
            <ChatBodyMessage message={message} />
          </Box>
        ))}
    </Container>
  );
};
