import { Avatar, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Loading } from 'src/UI/Loading';
import { getGuestChat } from 'src/redux/selectors/selectors';

// id:2
// fullName:"User2 Vasilevich"
// userTag:"@user2Tag"
// avatarImgUrl:null
// countUserFollowers:0
// createdAt:"2023-05-29T09:36:03.870049"
// verified:true

export const Chat = () => {
  const { isLoading, guest } = useSelector(getGuestChat);

  // return Loading component if isLoading=true
  if (isLoading) return <Loading size={34} />;

  // check data not empty
  const isResult = guest ? true : false;

  return (
    <>
      {!isResult ? (
        <Box>
          <Typography variant="h5">Error get guest from server</Typography>
        </Box>
      ) : (
        <Box
          className="Chat"
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          <Avatar
            sx={{ width: 56, height: 56 }}
            alt={guest.fullName}
            src={guest.avatarImgUrl && 'img/avatar/empty-avatar.png'}
          />
          <Typography>{guest.fullName}</Typography>
          <Typography>{guest.userTag}</Typography>
          Chat
        </Box>
      )}
    </>
  );
};
