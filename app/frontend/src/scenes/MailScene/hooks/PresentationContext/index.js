import React, { useState, useReducer } from 'react';

import mailCacheData from './MailCacheData';
import useMailCache from '../MailCache';

import conversationCacheData from './ConversationCacheData';
import useConversationCache from '../ConversationCache';


const PresentationContext = React.createContext();

const reducer = (state, action) => {
  const newState = {};
  switch (action.type) {
    case 'select':
      newState[action.payload.label] = action.payload.threadId;
      return { ...state, ...newState };
    default:
      throw new Error();
  }
};

const PresentationContextProvider = (props) => {
  const [selectedLabel, setSelectedLabel] = useState('all');
  const [selectedThreadsCache, dispatch] = useReducer(reducer, {});

  const mailCache = useMailCache(mailCacheData);
  const conversationCache = useConversationCache(conversationCacheData);

  const selectThread = (label, threadId) => {
    dispatch({
      type: 'select',
      payload: { label, threadId },
    });
  };

  const selectLabel = label => setSelectedLabel(label);

  const values = {
    selectedThread: selectedThreadsCache[selectedLabel],
    selectedThreadForLabel: target => selectedThreadsCache[target],
    selectThread,
    selectedLabel,
    selectLabel,
    allLabels: ['all', 'important'],
    mailCache,
    conversationCache,
  };

  return (
    <PresentationContext.Provider value={values} {...props}>
      {props.children}
    </PresentationContext.Provider>
  );
};

export { PresentationContext, PresentationContextProvider };
