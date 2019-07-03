// import gql from 'graphql-tag';
// import ApolloClient from 'apollo-boost';

// const LABELS_QUERY = gql`
//   query ($token: ID!) {
//     mailbox(token: $token) {
//       labels {
//         id
//         name
//       }
//       threads {
//         id
//         snippet
//       }
//     }
//   }
// `;

// // TODO: inject apollo client
// const client = new ApolloClient({
//   uri: 'http://localhost:4000/api',
// });

// const Label = {
//   all: () => client.query({
//     query: LABELS_QUERY,
//     variables: { token: 'e953183d-7e9f-4a75-b5e1-5f7ff8ee6cd7' }, // TODO: pass token to query
//   }).then(results => results.data.mailbox),
// };

// export default { Label };
