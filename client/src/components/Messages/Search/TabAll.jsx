import { Box, Typography, styled } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';

import { TabPeople } from './TabPeople';
import { TabMessages } from './TabMessages';

// ************ STYLE ************
const BoxSearchPerson = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.border.main}`,
  padding: '6px 0',
}));
// ************ STYLE ************

// ************ TabAll ************
export const TabAll = () => {
  return (
    <Box>
      <Box sx={{ margin: '20px 0 0 0' }}>
        {/* Title people */}
        <BoxSearchPerson>
          <PersonIcon sx={{ fontSize: 20, marginRight: '10px' }} />
          <Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>
            People
          </Typography>
        </BoxSearchPerson>

        {/* Body people */}
        <BoxSearchPerson>
          <TabPeople />
        </BoxSearchPerson>
      </Box>

      <Box sx={{ margin: '20px 0 0 0' }}>
        {/* Title messages */}
        <BoxSearchPerson>
          <EmailIcon sx={{ fontSize: 20, marginRight: '10px' }} />
          <Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>
            Messages
          </Typography>
        </BoxSearchPerson>

        {/* Body messages */}
        <BoxSearchPerson>
          <TabMessages />
        </BoxSearchPerson>
      </Box>
    </Box>
  );
};
