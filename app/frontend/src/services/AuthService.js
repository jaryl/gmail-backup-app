import gql from 'graphql-tag';
import jwt from 'jsonwebtoken';

const AUTHENTICATE_MUTATION = gql`
  mutation ($username: ID!, $password: String!) {
    authenticate(username: $username, password: $password) {
      token
    }
  }
`;

function AuthService(client) {
  this.client = client;

  this.verify = (token) => {
    if (!token) return false;
    const values = jwt.decode(token);
    return (new Date(values.exp * 1000) > new Date());
  };

  this.authenticate = ({ username, password }) => new Promise(async (resolve, reject) => {
    try {
      const result = await client.mutate({
        mutation: AUTHENTICATE_MUTATION,
        variables: { username, password },
      });
      resolve({ token: result.data.authenticate.token });
    } catch {
      reject(new Error('Please check your username and password'));
    }
  });
}

export default AuthService;
