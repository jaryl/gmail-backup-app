import React, { useState } from 'react';
import { debounce } from 'lodash';

const ScrollContext = React.createContext();

const ScrollContextProvider = (props) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const debouncedCall = debounce(e => setScrollPosition(e.target.scrollTop), 100);

  const scrollHandler = (e) => {
    e.persist();
    debouncedCall(e);
  };

  const values = {
    scrollHandler,
    scrollPosition,
  };

  return (
    <ScrollContext.Provider value={values} {...props}>
      {props.children}
    </ScrollContext.Provider>
  );
};

export { ScrollContext, ScrollContextProvider };
