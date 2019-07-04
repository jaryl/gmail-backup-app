import gql from 'graphql-tag';

const AUTHENTICATE_MUTATION = gql`
  mutation ($username: String!, $password: String!) {
    authenticate(username: $username, password: $password) {
      token
    }
  }
`;

let client = null;

const AuthService = {
  use: (_client) => {
    client = _client;
    client.clearStore();
  },
  authenticate: ({ username, password }) => new Promise(async (resolve, reject) => {
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
