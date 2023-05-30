import {
  Avatar,
  Box,
  Typography,
  Container,
  Tooltip,
  IconButton,
} from '@mui/material';
import { useSelector } from 'react-redux';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { useTheme } from '@emotion/react';
import { useDispatch } from 'react-redux';

import { Loading } from 'src/UI/Loading';
import { getGuestChat } from 'src/redux/selectors/selectors';
import { chatCloseConnection } from 'src/redux/reducers/chatSlice';
import { BodyChat } from './BodyChat';

// id:2
// fullName:"User2 Vasilevich"
// userTag:"@user2Tag"
// avatarImgUrl:null
// countUserFollowers:0
// createdAt:"2023-05-29T09:36:03.870049"
// verified:true

export const Chat = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { isLoading, guest } = useSelector(getGuestChat);

  const handleCloseConnection = () => {
    dispatch(chatCloseConnection());
  };

  // return Loading component if isLoading=true
  // if (isLoading) return <Loading size={34} />;

  // check data not empty
  const isResult = guest ? true : false;

  return (
    <Container>
      {!isResult ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'flex-start',
            margin: '10px 0 26px',
          }}
        >
          <Typography variant="h6">Chat</Typography>
          {isLoading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '14px 0 ',
              }}
            >
              <Loading size={34} />
            </Box>
          )}
        </Box>
      ) : (
        <>
          <Box
            className="Chat"
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              margin: '10px 0 12px',
              paddingBottom: '12px',
              borderBottom: '1px solid #333',
            }}
          >
            <Tooltip title="Close connection">
              <IconButton
                onClick={handleCloseConnection}
                sx={{
                  color: `${theme.palette.text.primary}`,
                  alignSelf: 'flex-start',
                }}
              >
                <ArrowCircleLeftOutlinedIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
            <Avatar
              sx={{ width: 56, height: 56, marginBottom: '8px' }}
              alt={guest.fullName}
              src={guest.avatarImgUrl && 'img/avatar/empty-avatar.png'}
            />
            <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
              {guest.fullName}
            </Typography>
            <Typography>{guest.userTag}</Typography>
          </Box>

          {/* body Chat */}
          <BodyChat />
        </>
      )}
    </Container>
  );
};
