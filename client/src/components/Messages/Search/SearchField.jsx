import { Box } from '@mui/material';

import { SearchTabs } from './SearchTabs';
import { InputSearch } from 'src/UI/InputSearch/InputSearch';

export const SearchField = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <InputSearch />
      <Box sx={{ marginTop: '16px' }}>
        <SearchTabs />
      </Box>
    </Box>
  );
};
