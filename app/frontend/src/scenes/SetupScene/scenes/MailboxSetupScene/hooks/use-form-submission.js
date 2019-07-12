import { useState, useContext, useEffect } from 'react';

import gql from 'graphql-tag';
import { ApolloContext } from 'react-apollo';

import { AuthContext } from '../../../../../hooks/AuthContext';
import { GoogleContext } from '../../../../../hooks/GoogleContext';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation (
    $username: ID!,
    $password: String!,
    $name: String!,
    $email: String!,
    $providerId: String!,
    $labels: [LabelInput!]!
  ) {
    register(
      username: $username,
      password: $password,
      name: $name,
      email: $email,
      providerType: GMAIL,
      providerId: $providerId,
      labels: $labels)
    {
      token
    }
  }
`;

// TODO: separate into different hooks for different concerns

const useFormSubmission = () => {
  const [labels, setLabels] = useState([]);

  const { client } = useContext(ApolloContext);
  const { loginWithToken } = useContext(AuthContext);
  const { profile, isAuthenticated, api } = useContext(GoogleContext);

  useEffect(() => { // retrieve labels from Google API
    let didCancel = false;

    (async function doQuery() {
      if (labels.length === 0 && api) {
        const { result } = await api.getAllLabels();
        if (!didCancel) setLabels(result.labels);
      }
    }());

    return () => { didCancel = true; };
  }, [api]);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const variables = {
      username: values.username,
      password: values.password,
      name: profile.name,
      email: profile.email,
      providerId: profile.googleId,
      labels: labels.map(({ id, name, type }) => ({
        providerId: id,
        name,
        type,
      })),
    };

    try {
      const result = await client.mutate({
        mutation: CREATE_ACCOUNT_MUTATION,
        variables,
      });

      loginWithToken(result.data.register.token);
    } catch (error) {
      const formattedErrors = error.graphQLErrors[0].extensions.exception.errors.reduce((errorMap, obj) => { // TODO: extract this into somewhere resuable
        // eslint-disable-next-line no-param-reassign
        errorMap[obj.path] = obj.message;
        return errorMap;
      }, {});
      setErrors(formattedErrors);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    handleSubmit,
    profile,
    ready: (isAuthenticated && labels.length > 0),
  };
};

export default useFormSubmission;
