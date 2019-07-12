import React, { useContext, useState, useEffect } from 'react';

import { ApolloContext } from 'react-apollo';

import gql from 'graphql-tag';

import { AuthContext } from '../AuthContext';

const MAILBOXES_QUERY = gql`
query {
  mailboxes {
    id
    email
  }
}
`;

const MailboxContext = React.createContext();

const MailboxContextProvider = (props) => {
  const { client } = useContext(ApolloContext);
  const { loggedIn, token } = useContext(AuthContext);
  const [mailboxes, setMailboxes] = useState();

  useEffect(() => {
    let didCancel = false;

    if (loggedIn) {
      (async function doQuery() {
        try {
          const result = await client.query({ query: MAILBOXES_QUERY });
          if (!didCancel) setMailboxes(result.data.mailboxes);
        } catch (error) {
          console.log(error);
        }
      }());
    } else if (!didCancel) setMailboxes([]);

    return () => { didCancel = true; };
  }, [token]);

  const values = {
    mailboxes,
  };

  return (
    <MailboxContext.Provider value={values} {...props}>
      {props.children}
    </MailboxContext.Provider>
  );
};

export { MailboxContext, MailboxContextProvider };
