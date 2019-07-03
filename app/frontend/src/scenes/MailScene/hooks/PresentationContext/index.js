import React, { useState, useReducer } from 'react';

import { find } from 'lodash';

const PresentationContext = React.createContext();

const reducer = (state, action) => {
  const newState = {};
  switch (action.type) {
    case 'select':
      newState[action.payload.labelId] = action.payload.threadId;
      return { ...state, ...newState };
    default:
      throw new Error();
  }
};

const PresentationContextProvider = ({
  labelSlug: initialLabelSlug,
  threadId: initialThreadId,
  mailbox,
  ...props
}) => {
  const { labels, threads } = mailbox;

  const [selectedLabel, setSelectedLabel] = useState(find(labels, { slug: initialLabelSlug }));
  const [selectedThread, setSelectedThread] = useState();

  const [selectedThreadsCache, dispatch] = useReducer(reducer, {});

  const selectThread = (threadId) => {
    dispatch({
      type: 'select',
      payload: { labelId: selectedLabel.id, threadId },
    });
    setSelectedThread(find(threads, { id: threadId }));
  };

  const selectLabelWithSlug = (slug) => {
    const targetLabel = find(labels, { slug });
    setSelectedLabel(targetLabel);
    const targetThread = find(threads, { id: selectedThreadsCache[targetLabel.id] });
    setSelectedThread(targetThread);
  };

  const values = {
    selectedThread,
    selectThread,
    selectedLabel,
    selectLabelWithSlug,
  };

  return (
    <PresentationContext.Provider value={values} {...props}>
      {props.children}
    </PresentationContext.Provider>
  );
};

export { PresentationContext, PresentationContextProvider };
