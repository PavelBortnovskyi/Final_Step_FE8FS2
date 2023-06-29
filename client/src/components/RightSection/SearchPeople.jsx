import { useSelector } from 'react-redux';
import { alpha, Avatar, Box, styled, Typography } from '@mui/material';

import { Loading } from 'src/UI/Loading';
import UserNames from 'src/UI/UserNames';
import { NavLink } from 'react-router-dom';
import { getUserData } from 'src/redux/selectors/selectors';

const BoxSearchPerson = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '12px',
  padding: '8px',
  borderBottom: ` 1px solid ${theme.palette.border.main}`,

  '&:hover': {
    backgroundColor: alpha(theme.palette.text.primary, 0.1),
    // cursor: 'pointer',
  },
}));

const NavLinkStyle = styled(NavLink)(({ theme }) => ({
  color: `${theme.palette.text.primary}`,
  underline: "none",
}))

export const SearchPeople = () => {
  const { user } = useSelector(getUserData);
  const { isLoading, searchUser } = useSelector(state => state.searchUser);

  // return hello-string if searchStr is empty
  if ((!searchUser || searchUser.searchStr === '') && !isLoading)
    return (
      <Typography sx={{ margin: '16px' }}>
        Try searching for people
      </Typography>
    );

  // return Loading component if isLoading=true
  if (isLoading) return <Loading size={34} />;

  // check data not empty
  const isResult = searchUser?.content?.length ? true : false;

  // return content after loading
  return (
    <>
      {!isResult ? (
        <Box>
          <Typography variant="h5" sx={{ margin: '16px 0' }}>
            no results
          </Typography>
          <Typography variant="body2">
            The term you entered did not bring up any results
          </Typography>
        </Box>
      ) : (
        <Box>
          {searchUser.content.filter((find) => find.id !== user.id)
            .map((user) => (
              /* <NavLinkStyle
                to={`/user/${user.id}`}
                key={user.id}
              > */
              <BoxSearchPerson key={user.id}>
                <NavLinkStyle
                  to={`/user/${user.id}`}
                  key={user.id}
                >
                  <Avatar
                    sx={{ width: 56, height: 56 }}
                    alt={user.fullName}
                    src={user.avatarImgUrl || 'img/avatar/empty-avatar.png'}
                  />
                </NavLinkStyle>
                <UserNames
                  fullName={user.fullName}
                  isVerified={user.verified}
                  userTag={user.userTag}
                  text={
                    '...found this user'
                  }
                  userId={user.id}
                  id={user.id}
                />

              </BoxSearchPerson>
              /* </NavLinkStyle> */
            ))}
        </Box>

      )}
    </>
  );
};
