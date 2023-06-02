import { useSelector } from 'react-redux';
import { alpha, Avatar, Box, styled, Typography } from '@mui/material';

import { getUserData } from 'src/redux/selectors/selectors';
import { Loading } from 'src/UI/Loading';
import UserNames from 'src/UI/UserNames';
import { getGuest } from 'src/redux/thunk/getGuest';
import { useDispatch } from 'react-redux';

const BoxSearchPerson = styled(Box)(({ theme }) => ({
  '&:hover': {
    backgroundColor: alpha(theme.palette.text.primary, 0.1),
    cursor: 'pointer',
  },
}));

export const TabPeople = () => {
  const dispatch = useDispatch();
  const { isLoading, findUser } = useSelector(getUserData);

  // return hello-string if searchStr is empty
  if ((!findUser || findUser.searchStr === '') && !isLoading)
    return <Typography>Try searching for people or messages</Typography>;

  // return Loading component if isLoading=true
  if (isLoading) return <Loading size={34} />;

  // TODO: function to set guest for chat
  // set Guest for chat
  const handleClick = (id) => {
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
        <Box
          sx={{
            display: 'flex',
            gap: '8px',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          {findUser.content.map(
            ({ id, fullName, avatarImgUrl, verified, userTag }) => (
              <BoxSearchPerson
                key={id}
                sx={{ display: 'flex', gap: '12px', padding: '8px' }}
                onClick={() => handleClick(id)}
              >
                <Avatar
                  sx={{ width: 56, height: 56 }}
                  alt={fullName}
                  src={avatarImgUrl && 'img/avatar/empty-avatar.png'}
                />
                <UserNames
                  fullName={fullName}
                  verified={verified}
                  userTag={userTag}
                  text={
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit ...'
                  }
                />
              </BoxSearchPerson>
            )
          )}
        </Box>
      )}
    </>
  );
};
