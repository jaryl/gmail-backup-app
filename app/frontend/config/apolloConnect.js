import ApolloClient from 'apollo-boost';

import { setContext } from 'apollo-link-context';

const apolloConnect = (token) => {
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return new ApolloClient({
    link: authLink,
    uri: 'http://localhost:4000/api',
  });
};

export default apolloConnect;
