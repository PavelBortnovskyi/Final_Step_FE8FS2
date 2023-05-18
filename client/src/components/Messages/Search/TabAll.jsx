import { Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import { TabPeople } from './TabPeople';
import { TabMessages } from './TabMessages';

export const TabAll = ({ searchPeople = null, searchMessages = null }) => {
  return (
    <Box>
      {/* People panel */}
      {searchPeople && (
        <Box sx={{ margin: '0 0 20px 0' }}>
          {/* Title people */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              borderBottom: '1px solid #273340',
              paddingBottom: '4px',
              // color: '#1d9bf0',
            }}
          >
            <PersonIcon sx={{ fontSize: 24, marginRight: '10px' }} />
            <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
              People
            </Typography>
          </Box>

          {/* Body people */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              // borderBottom: '1px solid #273340',
              padding: '10px 0',
            }}
          >
            <TabPeople searchPeople={searchPeople} />
          </Box>
        </Box>
      )}

      {/* Messages panel */}
      {searchMessages && (
        <Box sx={{ margin: '0 0 20px 0' }}>
          {/* Title messages */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              borderBottom: '1px solid #273340',
              paddingBottom: '4px',
              // color: '#1d9bf0',
            }}
          >
            <EmailIcon sx={{ fontSize: 24, marginRight: '10px' }} />
            <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
              Messages
            </Typography>
          </Box>

          {/* Body messages */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              // borderBottom: '1px solid #273340',
              padding: '10px 0',
            }}
          >
            <TabMessages searchMessages={searchMessages} />
          </Box>
        </Box>
      )}
    </Box>
  );
};
