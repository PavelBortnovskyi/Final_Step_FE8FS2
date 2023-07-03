import { alpha, Box, styled, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getMessages, getUserData } from 'src/redux/selectors/selectors';
import { Loading } from 'src/UI/Loading';
import { useEffect, useState } from 'react';
import { setGuest } from 'src/redux/reducers/chatSlice';
import { timestampToDate } from 'src/utils/messages/convertToDate';
import TimeAgo from 'timeago-react';
import { myAxios } from 'src/utils/axiosSetup';

// ************ STYLE ************
const BoxSearchPerson = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '8px',
  borderBottom: ` 1px solid ${theme.palette.border.main}`,

  '&:hover': {
    backgroundColor: alpha(theme.palette.text.primary, 0.1),
    cursor: 'pointer',
  },
}));

const BoxTime = styled(Box)`
  font-size: 10px;
  color: #9c9c9c;
  margin-top: 6px;
  border-top: 1px solid #f6f6f663;
  font-style: italic;
  min-width: 75px;
`;

const BoxMessages = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 6px;
`;
// ************ STYLE ************

// ************ TabMessages ************
export const TabMessages = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(getUserData);
  const { isLoading, findMessage } = useSelector(getMessages);

  // converted findMessages array
  const [convertedFindMessages, setConvertedFindMessages] = useState([]);
  const [resultFindMessages, setResultFindMessages] = useState([]);

  // set Guest for chat
  const handleClick = ({ id, fullName, avatarImgUrl, userTag }) => {
    const guest = {
      id,
      fullName,
      avatarImgUrl,
      userTag,
    };
    dispatch(setGuest(guest));
  };

  // set chat
  useEffect(() => {
    if (findMessage?.content?.length) {
      //*********** Convert findMessage.content to obj for viewing
      setConvertedFindMessages(
        findMessage.content.reduce((tempArr, item) => {
          // Ищем, есть ли уже чат с таким chatId в result
          const existingChat = tempArr.find(
            (chat) => chat.chatId === item.chatId
          );

          if (existingChat) {
            existingChat.messagesData.push({
              messageId: item.messageId,
              body: item.body,
              sent: item.sent,
            });
          } else {
            tempArr.push({
              chatId: item.chatId,
              // usersId: [item.userId],
              messagesData: [
                {
                  messageId: item.messageId,
                  body: item.body,
                  sent: item.sent,
                },
              ],
            });
          }
          return tempArr;
        }, [])
      );

      //**************************************
    } else {
      setConvertedFindMessages([]);
    }
  }, [dispatch, findMessage]);

  useEffect(() => {
    if (convertedFindMessages.length) {
      (async () => {
        const temp = await Promise.all(
          convertedFindMessages.map(async (item) => {
            const { data } = await myAxios.get(`/chat/${item.chatId}`);

            const guestData =
              data.initiatorUser?.id !== user.id
                ? data.initiatorUser
                : data.users[0];
            return { ...item, guest: guestData };
          })
        );
        setResultFindMessages(temp);
      })();
    } else {
      setResultFindMessages([]);
    }
  }, [convertedFindMessages, dispatch, user.id]);

  // return hello-string if searchStr is empty
  if ((!findMessage || findMessage.searchStr === '') && !isLoading)
    return <Typography>Try searching for people or messages</Typography>;

  // return Loading component if isLoading=true
  if (isLoading) return <Loading size={34} />;

  // check data not empty
  const isResult = resultFindMessages?.length ? true : false;

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
          {resultFindMessages.map(({ chatId, guest, messagesData }) => (
            <BoxSearchPerson key={chatId} onClick={() => handleClick(guest)}>
              {messagesData.map((message, index) => (
                <BoxMessages key={index}>
                  <BoxTime>
                    <TimeAgo datetime={timestampToDate(message.sent)} />
                  </BoxTime>
                  <Box>{message.body}</Box>
                </BoxMessages>
              ))}
            </BoxSearchPerson>
          ))}
        </Box>
      )}
    </>
  );
};
