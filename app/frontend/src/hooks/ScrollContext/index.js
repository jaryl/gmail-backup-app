import React, { useRef } from 'react';

const ScrollContext = React.createContext();

const ScrollContextProvider = ({ emailListingRef, ...props }) => {
  const rootRef = useRef(emailListingRef);

  const values = {
    rootRef,
  };

  return (
    <ScrollContext.Provider value={values} {...props}>
      {props.children}
    </ScrollContext.Provider>
  );
};

export { ScrollContext, ScrollContextProvider };
