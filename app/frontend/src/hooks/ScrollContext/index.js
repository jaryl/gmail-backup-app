import React from 'react';

const ScrollContext = React.createContext();

const ScrollContextProvider = ({ targetRef, ...props }) => {
  const values = {
    rootRef: targetRef,
  };

  return (
    <ScrollContext.Provider value={values} {...props}>
      {props.children}
    </ScrollContext.Provider>
  );
};

export { ScrollContext, ScrollContextProvider };
