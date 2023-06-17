import { useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import { useSelector } from 'react-redux';

import { getChats, getUserData } from 'src/redux/selectors/selectors';
import { Loading } from 'src/UI/Loading';
import { ContactGuest } from './ContactGuest';

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

// ************ TabContacts ************
export const TabContacts = () => {
  // get all chats from redux
  const { isLoading, allChats } = useSelector(getChats);

  // get user from redux
  const { user } = useSelector(getUserData);

  // set chats where user be
  const [guestConversation, setGuestConversation] = useState([]);

  useEffect(() => {
    const getAllGuests = () => {
      try {
        console.log(allChats);
        if (allChats) {
          // remove user from all chats initiator
          const excludeUser = allChats.content.filter(
            (guest) =>
              guest.initiatorUser?.id !== user.id && guest.users.length === 1
          );
          // set guests info initiator chats | content[{..., initiatorUser: {id, ...}}]
          // add preview message
          if (excludeUser) {
            const guests = excludeUser.map((guest) => {
              const messageBody = guest.messages[0]?.body;
              const messageSent = new Date(...guest.messages[0]?.sent);
              return {
                chatId: guest.chatId,
                ...guest.initiatorUser,
                messages: {
                  body: messageBody,
                  sent: messageSent,
                },
              };
            });
            setGuestConversation(guests);
          }

          console.log('1', guestConversation);

          /* Метод flatMap() позволяет сформировать массив,
             применяя функцию к каждому элементу, затем уменьшает вложенность,
             делая этот массив плоским, и возвращает его.
          */
          // get guests info member chats | content[{..., users: {id, ...}}]
          // add preview message
          const filteredUsers = allChats.content
            .flatMap((item) => {
              const messageBody = item.messages[0]?.body;
              const messageSent = new Date(...item.messages[0]?.sent);
              const chatId = item.chatId;
              return item.users.map((guest) => ({
                chatId,
                ...guest,
                messages: {
                  body: messageBody,
                  sent: messageSent,
                },
              }));
            })
            .filter(
              (guest) =>
                guest.id !== user.id &&
                !allChats.content.some(
                  (item) => item.initiatorUser.id === guest.id
                )
            );

          // remove duplicate id
          const uniqueFilteredUsers = Array.from(
            new Set(filteredUsers.map((guest) => guest.id))
          ).map((id) => filteredUsers.find((guest) => guest.id === id));

          // set additional guests
          setGuestConversation((prevGuests) => [
            ...prevGuests,
            ...uniqueFilteredUsers,
          ]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllGuests();
  }, [allChats, user?.id]);

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
      ) : !guestConversation.length ? (
        <Box sx={{ padding: '6px 0' }}>No contacts available.</Box>
      ) : (
        guestConversation.map((guest) => {
          return (
            <Box key={guest.id}>
              <ContactGuest guest={guest} />
            </Box>
          );
        })
      )}
    </Box>
  );
};
