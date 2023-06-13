import { Box } from '@mui/material';
import { SearchTabs } from './SearchTabs';
import { SearchFieldMessages } from './SearchFieldMessages';

// ************ STYLE ************
// ************ STYLE ************

// ************ SearchMessages ************
export const SearchMessages = () => {
  return (
    <>
      <SearchFieldMessages />
      <Box sx={{ marginTop: '16px' }}>
        <SearchTabs />
      </Box>
    </>
  );
};
