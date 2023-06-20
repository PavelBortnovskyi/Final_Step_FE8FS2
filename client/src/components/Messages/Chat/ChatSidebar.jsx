import { Box } from '@mui/material';
import { SearchTabs } from '../Search/SearchTabs';
import { SearchFieldMessages } from '../Search/SearchFieldMessages';
import { useState } from 'react';
import { Contacts } from '../ConversationList/TabContacts';
import { ConversationTabs } from '../ConversationList/ConversationTabs';

// ************ STYLE ************
// ************ STYLE ************

// ************ ChatSidebar ************
export const ChatSidebar = () => {
  // set visible Tabs result
  const [isVisibleResult, setIsVisibleResult] = useState(false);

  return (
    <>
      {/* search input */}
      <SearchFieldMessages setIsVisibleResult={setIsVisibleResult} />

      {/* search tabs */}
      {isVisibleResult && <SearchTabs />}

      {/* // TODO: set isVisibleResult */}
      {/* Contacts list */}
      {!isVisibleResult && <ConversationTabs />}
    </>
  );
};
