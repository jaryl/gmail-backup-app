// import { useState } from 'react';
// import { find } from 'lodash';

// const useMailCache = (mailbox) => {
//   const [threads] = useState(mailbox.threads);
//   const [labels] = useState(mailbox.labels);

//   // TODO: create reducers to update cache upon cache misses

//   const getThread = id => find(threads, { id }); // TODO: dispatch upon cache miss
//   const getLabel = id => find(labels, { id }); // TODO: dispatch upon cache miss
//   const getLabelBySlug = slug => find(labels, { slug }); // TODO: dispatch upon cache miss

//   return {
//     getThread,
//     getLabel,
//     getLabelBySlug,
//     allLabels: labels,
//   };
// };

// export default useMailCache;
