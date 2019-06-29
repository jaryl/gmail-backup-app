import { useState } from 'react';

const useConversationCache = ({ conversationData }) => {
  const [conversations] = useState(conversationData);

  // TODO: create reducers to update cache upon cache misses

  const getConversation = id => conversations[id]; // TODO: dispatch upon cache miss

  return {
    getConversation,
  };
};

export default useConversationCache;
