import { Box } from '@mui/material';
import { SearchTabs } from './SearchTabs';
import { SearchFieldMessages } from './SearchFieldMessages';
import { useState } from 'react';

// ************ STYLE ************
// ************ STYLE ************

// ************ SearchMessages ************
export const SearchMessages = () => {
  // set visible Tabs result
  const [isVisibleResult, setIsVisibleResult] = useState(false);

  return (
    <>
      <SearchFieldMessages setIsVisibleResult={setIsVisibleResult} />
      {isVisibleResult && <SearchTabs />}
    </>
  );
};
