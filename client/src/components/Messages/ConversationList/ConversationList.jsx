import { useEffect, useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';

import { Conversation } from './Conversation';
import { getUsersFromAllChats } from 'src/utils/messages/chatConnectionsDB';

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
  const [guestConversation, setGuestConversation] = useState([]);

  // get all chats
  useEffect(() => {
    const getAllChats = async () => {
      try {
        // TODO:
        // request guests from all chats from server | prams: page = 0, pageSize = 10
        const guests = await getUsersFromAllChats();

        console.log('guests:', guests);

        // set guests
        setGuestConversation(guests);
        //
      } catch (error) {
        console.log(error);
      }
    };

    getAllChats();
  }, []);

  console.log(guestConversation);

  return (
    <Box sx={{ marginTop: '20px' }}>
      <BoxSearchPerson>
        <SpeakerNotesIcon sx={{ fontSize: 20, marginRight: '10px' }} />
        <Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>
          Chat list
        </Typography>
      </BoxSearchPerson>
      <Box>users list</Box>
    </Box>
  );
};

//  {
//    !chats ? (
//      <Box>No chats available.</Box>
//    ) : (
//      chats.content.map((chat, index) => (
//        <Box
//          className="xxx"
//          key={index}
//          // onClick={() => handleCurrentChat(chat)}
//        >
//          {/* TODO: Implement chat item rendering */}
//          <Conversation />
//        </Box>
//      ))
//    );
//  }
