import { useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import { useSelector } from 'react-redux';

import { getChats, getUserData } from 'src/redux/selectors/selectors';
import { Loading } from 'src/UI/Loading';
import { ContactChat } from './ContactChat';

// ************ STYLE ************
const BoxHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.border.main}`,
  padding: '6px 0',
}));

const BoxLoading = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 14px 0;
`;
// ************ STYLE ************

// ************ TabChats ************
export const TabChats = () => {
  // get all chats from redux
  const { isLoading, allChats } = useSelector(getChats);

  // get user from redux
  const { user } = useSelector(getUserData);

  // set chats where user be
  const [chatList, setChatList] = useState([]);

  console.log('all', allChats);

  useEffect(() => {
    const getAllGuests = () => {
      try {
        if (allChats) {
          const result = allChats.content.map((guest) => {
            // if group chat
            const group = guest.users.length > 1;

            // format messages
            const messageBody = guest.messages[0]?.body;
            const messageSent = new Date(...guest.messages[0]?.sent);

            // create chat obj item
            const updatedGuest = {
              chatId: guest.chatId,
              guest,
              group,
              messages: {
                body: messageBody,
                sent: messageSent,
              },
            };

            // create guest list
            if (group) {
              updatedGuest.guest = [...guest.users, guest.initiatorUser];
            } else {
              if (guest.initiatorUser?.id !== user.id) {
                updatedGuest.guest = guest.initiatorUser;
              } else {
                updatedGuest.guest = guest.users[0];
              }
            }

            return updatedGuest;
          });

          setChatList(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllGuests();
  }, [allChats, user?.id]);

  // console.log(chatList);

  return (
    <Box>
      {/* <BoxHeader>
        <PeopleAltIcon sx={{ fontSize: 18, marginRight: '10px' }} />
        <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
          Contacts
        </Typography>
      </BoxHeader> */}

      {isLoading ? (
        <BoxLoading>
          <Loading size={34} />
        </BoxLoading>
      ) : !chatList.length ? (
        <Box sx={{ padding: '6px 0' }}>No contacts available.</Box>
      ) : (
        chatList.map(
          (chat) =>
            // TODO: set only group chats
            chat.group && (
              <Box key={chat.chatId}>
                <ContactChat chat={chat} />
              </Box>
            )
        )
      )}
    </Box>
  );
};
