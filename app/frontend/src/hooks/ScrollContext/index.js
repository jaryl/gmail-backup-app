import React, { useState } from 'react';

const ScrollContext = React.createContext();

const ScrollContextProvider = (props) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollHandler = (e) => {
    setScrollPosition(e.target.scrollTop);
    // TODO: debounce scroll handler
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
