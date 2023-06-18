import { alpha, Avatar, Box, styled, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getChats, getUserData } from 'src/redux/selectors/selectors';
import { Loading } from 'src/UI/Loading';
import UserNames from 'src/UI/UserNames';
import { getGuest } from 'src/redux/thunk/getGuest';
import { findUser } from 'src/redux/thunk/findUser';
import { getCurrentChat } from 'src/redux/thunk/getCurrentChat';
import { useEffect } from 'react';
import { setGuest } from 'src/redux/reducers/chatSlice';

// ************ STYLE ************
const BoxSearchPerson = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '12px',
  padding: '8px',
  borderBottom: ` 1px solid ${theme.palette.border.main}`,

  '&:hover': {
    backgroundColor: alpha(theme.palette.text.primary, 0.1),
    cursor: 'pointer',
  },
}));
// ************ STYLE ************

// ************ TabPeople ************
export const TabPeople = () => {
  const dispatch = useDispatch();
  const { isLoading, findUser, user } = useSelector(getUserData);
  const { currentChat } = useSelector(getChats);

  // set Guest for chat
  const handleClick = (id) => {
    // get chat data
    dispatch(getCurrentChat(id));
  };

  // set chat
  useEffect(() => {
    if (currentChat) {
      // find only personal chats
      const tempChatData = currentChat.find((chat) => chat.users.length === 1);

      // create guest obj
      if (tempChatData) {
        //   const lastMessage = tempChatData.messages.length - 1;

        //   // get last message
        //   const messageBody = tempChatData.messages[lastMessage]?.body;
        //   const messageSent = new Date(
        //     ...tempChatData.messages[lastMessage]?.sent
        //   );
        const guestData =
          tempChatData.initiatorUser?.id !== user.id
            ? tempChatData.initiatorUser
            : tempChatData.users[0];

        const setGuestData = {
          chatId: tempChatData.chatId,
          guestData,
          // messages: {
          //   body: messageBody,
          //   sent: messageSent,
          // },
        };

        dispatch(setGuest(setGuestData));
      }
    }
  }, [currentChat, dispatch, user.id]);

  // return hello-string if searchStr is empty
  if ((!findUser || findUser.searchStr === '') && !isLoading)
    return <Typography>Try searching for people or messages</Typography>;

  // return Loading component if isLoading=true
  if (isLoading) return <Loading size={34} />;

  // check data not empty
  const isResult = findUser?.content?.length ? true : false;

  // return content after loading
  return (
    <>
      {!isResult ? (
        <Box>
          <Typography variant="h5">no results</Typography>
          The term you entered did not bring up any results
        </Box>
      ) : (
        <Box>
          {findUser.content
            .filter((find) => find.id !== user.id)
            .map(({ id, fullName, avatarImgUrl, userTag }) => (
              <BoxSearchPerson key={id} onClick={() => handleClick(id)}>
                <Avatar
                  sx={{ width: 56, height: 56 }}
                  alt={fullName}
                  src={avatarImgUrl || 'img/avatar/empty-avatar.png'}
                />
                <UserNames
                  fullName={fullName}
                  userTag={userTag}
                  // text={''}
                  // postTime={''}
                />
              </BoxSearchPerson>
            ))}
        </Box>
      )}
    </>
  );
};
