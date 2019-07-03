import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';

const AUTHENTICATE_MUTATION = gql`
  mutation ($username: String!, $password: String!) {
    authenticate(username: $username, password: $password) {
      token
    }
  }
`;

// TODO: inject apollo client
const client = new ApolloClient({
  uri: 'http://localhost:4000/api',
});

const AuthService = {
  call: ({ username, password }) => new Promise(async (resolve, reject) => {
    try {
      const result = await client.mutate({
        mutation: AUTHENTICATE_MUTATION,
        variables: { username, password },
      });
      resolve({ token: result.data.authenticate.token });
    } catch {
      reject(new Error('Please check your username and password'));
    }
  }),
};

export default AuthService;
