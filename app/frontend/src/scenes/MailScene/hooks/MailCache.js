import { useState } from 'react';

const useMailCache = ({ threadData, labelData }) => {
  const [threads] = useState(threadData);
  const [labels] = useState(labelData);

  // TODO: create reducers to update cache upon cache misses

  const getThread = id => threads[id]; // TODO: dispatch upon cache miss
  const getLabel = id => labels[id]; // TODO: dispatch upon cache miss

  return {
    getThread,
    getLabel,
    allLabels: () => labels.keys(),
  };
};

export default useMailCache;
