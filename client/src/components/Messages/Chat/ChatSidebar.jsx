import { SearchTabs } from '../Search/SearchTabs';
import { SearchFieldMessages } from '../Search/SearchFieldMessages';
import { useState } from 'react';
import { ConversationTabs } from '../ConversationList/ConversationTabs';

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

      {/* Contacts list */}
      {!isVisibleResult && <ConversationTabs />}
    </>
  );
};
