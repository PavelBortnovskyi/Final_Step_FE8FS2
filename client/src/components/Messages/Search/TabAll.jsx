import { Box, Typography, styled } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';

import { TabPeople } from './TabPeople';
import { TabMessages } from './TabMessages';

// ************ STYLE ************
const BoxSearchPerson = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  color: `${theme.palette.primary.main}`,
  borderBottom: `1px solid ${theme.palette.border.main}`,
  padding: '6px 0',
}));
// ************ STYLE ************

// ************ TabAll ************
export const TabAll = () => {
  return (
    <Box>
      <Box sx={{ margin: '0px 0 0 0' }}>
        {/* Title people */}
        <BoxSearchPerson>
          <PeopleAltIcon sx={{ fontSize: 18, marginRight: '10px' }} />
          <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
            People
          </Typography>
        </BoxSearchPerson>

        {/* Body people */}
        <Box>
          <TabPeople />
        </Box>
      </Box>

      <Box sx={{ margin: '30px 0 0 0' }}>
        {/* Title messages */}
        <BoxSearchPerson>
          <ForumOutlinedIcon sx={{ fontSize: 18, marginRight: '10px' }} />
          <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
            Messages
          </Typography>
        </BoxSearchPerson>

        {/* Body messages */}
        <Box>
          <TabMessages />
        </Box>
      </Box>
    </Box>
  );
};
