import { Box } from '@mui/material';
import { SearchTabs } from './SearchTabs';
import { SearchField } from 'src/UI/SearchField';

export const SearchMessages = () => {
  return (
    <>
      <SearchField />
      <Box sx={{ marginTop: '16px' }}>
        <SearchTabs />
      </Box>
    </>
  );
};
