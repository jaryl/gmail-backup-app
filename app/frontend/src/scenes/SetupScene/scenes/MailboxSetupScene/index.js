import React, { useState, useContext, useEffect } from 'react';

import gql from 'graphql-tag';
import { ApolloContext } from 'react-apollo';

import { Formik } from 'formik';

import {
  CssBaseline,
  Box,
  Paper,
  Grid,
  Avatar,
  Typography,
} from '@material-ui/core';

import { GoogleLogout } from '../../../../components/GoogleButtons';

import { AuthContext } from '../../../../hooks/AuthContext';
import { GoogleContext } from '../../../../hooks/GoogleContext';

import InputForm from './components/form';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation ($username: ID!, $password: String!, $name: String!, $email: String!, $labels: [LabelInput!]!) {
    register(username: $username, password: $password, name: $name, email: $email, labels: $labels) {
      token
    }
  }
`;

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
  base: '',
};

const MailboxSetupScene = () => {
  const [labels, setLabels] = useState([]);
  const { client } = useContext(ApolloContext);

  const {
    profile,
    isAuthenticated,
    ready,
  } = useContext(GoogleContext);

  const { loginWithToken } = useContext(AuthContext);

  useEffect(() => {
    if (labels.length !== 0 || !ready) return;

    window.gapi.client.request({ path: 'https://www.googleapis.com/gmail/v1/users/me/labels' })
      .then(response => setLabels(response.result.labels));
  }, [ready]);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const variables = {
      ...values,
      name: profile.name,
      email: profile.email,
      labels: labels.map(({ id, name, type }) => ({
        externalId: id,
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
      setErrors({ base: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <Grid container>
      <Grid item sm={2} md={3} lg={4}></Grid>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <CssBaseline />
        <Paper>
          <Box p={3} mt={6}>
            <Avatar alt={profile.name} src={profile.imageUrl} />

            <Typography variant="h6">{profile.name}</Typography>
            <Typography variant="body1">{profile.email}</Typography>

            <hr />

            <Formik
              initialValues={initialValues}
              render={formikProps => <InputForm {...formikProps} />}
              onSubmit={handleSubmit}
            />

            <hr />

            <p>If you do not wish to continue, you may log out and this will prevent further access to your Gmail account from this app.</p>
            <GoogleLogout />
          </Box>
        </Paper>
      </Grid>
      <Grid item sm={2} md={3} lg={4}></Grid>
    </Grid>
  );
};

export default MailboxSetupScene;
