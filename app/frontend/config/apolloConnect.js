import ApolloClient from 'apollo-client';

import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';

const apolloConnect = (getToken) => {
  const link = createHttpLink({ uri: 'http://localhost:4000/api' });

  const withError = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      });
    }
    if (networkError) console.error(`[Network error]: ${networkError}`);
  });

  const withToken = setContext(() => {
    const token = getToken();
    const authorizationHeader = token ? `Bearer ${getToken()}` : '';
    return { headers: { authorization: authorizationHeader } };
  });

  return new ApolloClient({
    link: withToken.concat(withError.concat(link)),
    cache: new InMemoryCache(),
  });
};

export default apolloConnect;
