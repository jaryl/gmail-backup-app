import ApolloClient from 'apollo-client';

import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { RetryLink } from 'apollo-link-retry';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';

const apolloConnect = (getToken) => {
  const link = ApolloLink.from([
    new RetryLink(),
    new HttpLink({ uri: 'http://localhost:4000/api' }),
  ]);

  const withError = onError((error) => {
    console.error(error);

    const { graphQLErrors, networkError } = error;
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
