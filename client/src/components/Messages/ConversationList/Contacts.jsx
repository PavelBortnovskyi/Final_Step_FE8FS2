import { useEffect, useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import { Conversation } from './Conversation';
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

// ************ Contacts ************
export const Contacts = () => {
  // get all chats from redux
  const { isLoading, allChats } = useSelector(getChats);

  // get user from redux
  const { user } = useSelector(getUserData);

  // set chats where user be
  const [guestConversation, setGuestConversation] = useState([]);

  console.log('all', allChats);

  useEffect(() => {
    const getAllGuests = () => {
      try {
        if (allChats) {
          // remove user from all chats initiator
          const excludeUser = allChats.content.filter(
            (guest) => guest.initiatorUser?.id !== user.id
          );
          // set guests info initiator chats | content[{..., initiatorUser: {id, ...}}]
          // add preview message
          if (excludeUser) {
            const guests = excludeUser.map((guest) => {
              const messageBody = guest.messages[0]?.body;
              const messageSent = new Date(...guest.messages[0]?.sent);
              return {
                ...guest.initiatorUser,
                messages: {
                  body: messageBody,
                  sent: messageSent,
                },
              };
            });
            setGuestConversation(guests);
          }

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

              return item.users.map((guest) => ({
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

  console.log(guestConversation);

  return (
    <Box sx={{ marginTop: '20px' }}>
      <BoxHeader>
        <PeopleAltIcon sx={{ fontSize: 20, marginRight: '10px' }} />
        <Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>
          Contacts
        </Typography>
      </BoxHeader>

      {isLoading ? (
        <BoxLoading>
          <Loading size={34} />
        </BoxLoading>
      ) : !guestConversation.length ? (
        <Box sx={{ padding: '6px 0' }}>No contacts available.</Box>
      ) : (
        guestConversation.map((guest) => (
          <Box
            key={guest.id}
            // TODO: create chat with user
            // onClick={() => handleCurrentChat(chat)}
          >
            <ContactGuest guest={guest} />
          </Box>
        ))
      )}
    </Box>
  );
};
