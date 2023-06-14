import { useSelector } from 'react-redux';
import { alpha, Avatar, Box, styled, Typography } from '@mui/material';

import { getUserData } from 'src/redux/selectors/selectors';
import { Loading } from 'src/UI/Loading';
import UserNames from 'src/UI/UserNames';
import { getGuest } from 'src/redux/thunk/getGuest';
import { useDispatch } from 'react-redux';

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
  const { isLoading, findUser } = useSelector(getUserData);

  // return hello-string if searchStr is empty
  if ((!findUser || findUser.searchStr === '') && !isLoading)
    return <Typography>Try searching for people or messages</Typography>;

  // return Loading component if isLoading=true
  if (isLoading) return <Loading size={34} />;

  // set Guest for chat
  const handleClick = (id) => {
    // get guest data
    dispatch(getGuest(id));
  };

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
          {findUser.content.map(
            ({ id, fullName, avatarImgUrl, verified, userTag }) => (
              <BoxSearchPerson key={id} onClick={() => handleClick(id)}>
                <Avatar
                  sx={{ width: 56, height: 56 }}
                  alt={fullName}
                  src={avatarImgUrl && 'img/avatar/empty-avatar.png'}
                />
                <UserNames
                  fullName={fullName}
                  verified={verified}
                  userTag={userTag}
                  text={'Lorem ipsum dolor color red sit amet ...'}
                />
              </BoxSearchPerson>
            )
          )}
        </Box>
      )}
    </>
  );
};
