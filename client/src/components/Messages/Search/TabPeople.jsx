import { alpha, Avatar, Box, styled, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getMessages, getUserData } from 'src/redux/selectors/selectors';
import { Loading } from 'src/UI/Loading';
import { MessagesUserNames } from 'src/UI/MessagesUserNames';
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
  const { user } = useSelector(getUserData);
  const { isLoading, findUser } = useSelector(getMessages);
  // const { currentChat } = useSelector(getChats);

  // set guest from local data
  const handleClick = ({ id, fullName, avatarImgUrl, userTag }) => {
    const guest = {
      id,
      fullName,
      avatarImgUrl,
      userTag,
    };
    dispatch(setGuest(guest));
  };

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
            .map((user) => (
              <BoxSearchPerson key={user.id} onClick={() => handleClick(user)}>
                <Avatar
                  sx={{ width: 56, height: 56 }}
                  alt={user.fullName}
                  src={user.avatarImgUrl || 'img/avatar/empty-avatar.png'}
                />
                <MessagesUserNames
                  fullName={user.fullName}
                  userTag={user.userTag}
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
