import { useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import { useSelector } from 'react-redux';

import { getChats, getUserData } from 'src/redux/selectors/selectors';
import { Loading } from 'src/UI/Loading';
import { ContactGuest } from './ContactGuest';
import { setGuest } from 'src/redux/reducers/chatSlice';
import { timestampToDate } from 'src/utils/messages/convertToDate';

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
        if (allChats) {
          // console.log('all', allChats);

          const excludeGroup = allChats.content.filter(
            (chat) => chat.users.length === 1
          );

          const setGuests = excludeGroup.map((guest) => {
            const messageBody = guest.messages[0]?.body;
            const messageSent = timestampToDate(guest.messages[0]?.sent);

            const guestData =
              guest.initiatorUser?.id !== user.id
                ? guest.initiatorUser
                : guest.users[0];

            return {
              ...guestData,
              messages: {
                body: messageBody,
                sent: messageSent,
              },
            };
          });
          setGuestConversation(setGuests);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllGuests();
  }, [allChats, user]);

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
              <ContactGuest guestData={guest} />
            </Box>
          );
        })
      )}
    </Box>
  );
};
