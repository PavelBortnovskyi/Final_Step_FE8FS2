import { Box, Container, IconButton, Tooltip, Typography } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';

import { useTheme } from '@emotion/react';
import { SearchMessages } from './Search/SearchMessages';
import { ChatList } from './ChatsList/ChatList';

export const Messages = () => {
  const theme = useTheme();

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
        <ChatList />

        {/* Search */}
        <SearchMessages />
      </Container>
    </Box>
  );
};
