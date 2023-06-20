import { useSelector } from 'react-redux';
import { alpha, Avatar, Box, styled, Typography } from '@mui/material';

import { getUserData } from 'src/redux/selectors/selectors';
import { Loading } from 'src/UI/Loading';
import UserNames from 'src/UI/UserNames';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';

const BoxSearchPerson = styled(Box)(({ theme }) => ({
  '&:hover': {
    backgroundColor: alpha(theme.palette.text.primary, 0.1),
    cursor: 'pointer',
  },
}));

export const SearchPeople = () => {
  const { isLoading, findUser } = useSelector(getUserData);
  const theme = useTheme();

  // return hello-string if searchStr is empty
  if ((!findUser || findUser.searchStr === '') && !isLoading)
    return <Typography sx={{ margin: "16px" }}>Try searching for people or messages</Typography>;

  // return Loading component if isLoading=true
  if (isLoading) return <Loading size={34} />;

  // check data not empty
  const isResult = findUser?.content?.length ? true : false;

  // return content after loading
  return (
    <>
      {!isResult ? (
        <Box >
          <Typography variant="h5" sx={{ margin: "16px 0" }}>no results</Typography>
          <Typography variant="body2">The term you entered did not bring up any results</Typography>

        </Box>
      ) : (
        <Box
          sx={{
            marginTop: "16px",
            display: 'flex',
            gap: '8px',
            flexDirection: 'column',
            width: '100%',
          }}
        >

          {findUser.content.map(
            ({ id, fullName, avatarImgUrl, verified, userTag }) => (
              <Link
                to={`/user/${id}`}
                style={{color: `${theme.palette.text.primary}`,}}
                underline="none"
                key={id}
              >
                <BoxSearchPerson

                  sx={{ display: 'flex', gap: '12px', padding: '8px' }}
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
              </Link>
            )
          )}

        </Box>
      )}
    </>
  );
};
