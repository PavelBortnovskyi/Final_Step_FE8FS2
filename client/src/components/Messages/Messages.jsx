import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';

import { ChatSidebar } from './Chat/ChatSidebar';
import { getAuthorizationData } from 'src/redux/selectors/selectors';
import { getAllChats } from 'src/redux/thunk/getAllChats';
import { Chat } from './Chat/Chat';

// ************ Messages ************
export const Messages = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(getAuthorizationData);

  const mobile = useMediaQuery(theme.breakpoints.between('xs', 'md'));

  // send user to home if not authorization
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // set all chats to redux
  useEffect(() => {
    dispatch(getAllChats({ page: 0 }));
  }, [dispatch]);

  return (
    <Box sx={{ paddingBottom: '40px' }}>
      <Container>
        {/* Title & action btn */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '10px 0 26px',
          }}
        >
          <Typography variant="h6">Messages</Typography>
          <Box>
            <Tooltip title="Settings">
              <IconButton
                href=""
                sx={{ color: `${theme.palette.text.primary}` }}
              >
                <SettingsOutlinedIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="New message">
              <IconButton
                href=""
                sx={{ color: `${theme.palette.text.primary}` }}
              >
                <MarkEmailReadOutlinedIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Search */}
        <ChatSidebar />

        {/* mobile size browser */}
        {mobile && <Chat />}
      </Container>
    </Box>
  );
};
