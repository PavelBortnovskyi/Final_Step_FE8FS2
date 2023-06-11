import { Box, Container, IconButton, Tooltip, Typography } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';

import { useTheme } from '@emotion/react';
import { SearchMessages } from './Search/SearchMessages';
import { ConversationList } from './ConversationList/ConversationList';
import { useSelector } from 'react-redux';
import { getAuthorizationData } from 'src/redux/selectors/selectors';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// ************ Messages ************
export const Messages = () => {
  const theme = useTheme();

  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(getAuthorizationData);

  // send user to home if not authorization
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box>
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
        {/* chat list */}
        <ConversationList />

        {/* Search */}
        <SearchMessages />
      </Container>
    </Box>
  );
};
