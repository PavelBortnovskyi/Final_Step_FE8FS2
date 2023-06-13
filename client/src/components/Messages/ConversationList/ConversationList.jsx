import { useEffect, useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';

import { Conversation } from './Conversation';
import { getChatAll } from 'src/utils/messages/chatConnectionsDB';

// ************ STYLE ************
const BoxSearchPerson = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.border.main}`,
  padding: '6px 0',
}));
// ************ STYLE ************

// ************ ConversationList ************
export const ConversationList = () => {
  // set chats where user be
  const [chats, setChats] = useState([]);

  // get all chats
  useEffect(() => {
    const getAllChats = async () => {
      try {
        // request user chats from server
        // /chat/all&page=${page}&pageSize=${pageSize}   page = 0, pageSize = 10
        const response = await getChatAll();

        // console.log('getAllChats:', response);

        // set chats to redux
        response.content.length && setChats(response);
        //
      } catch (error) {
        console.log(error);
      }
    };

    getAllChats();
  }, []);

  return (
    <Box sx={{ marginBottom: '20px' }}>
      <BoxSearchPerson>
        <SpeakerNotesIcon sx={{ fontSize: 20, marginRight: '10px' }} />
        <Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>
          Chat list
        </Typography>
      </BoxSearchPerson>
      {chats.map((chat, index) => (
        <Box
          className="xxx"
          key={index}
          // onClick={() => handleCurrentChat(chat)}
        >
          {/* // TODO: need did chat list */}
          <Conversation />
        </Box>
      ))}
    </Box>
  );
};
