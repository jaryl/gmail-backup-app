import React, { useContext } from 'react';

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

import { GoogleLogout } from 'react-google-login';

import { AuthContext } from '../../../../contexts/AuthContext';
import { SetupContext } from '../../hooks/SetupContext';

import InputForm from './components/form';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation ($username: String!, $password: String!, $name: String!, $email: String!) {
    register(username: $username, password: $password, name: $name, email: $email) {
      token
    }
  }
`;

const MailboxSetupScene = () => {
  const {
    isAuthenticated,
    profile,
    logout,
    clientId,
  } = useContext(SetupContext);

  const { injectToken } = useContext(AuthContext);

  const { client } = useContext(ApolloContext);

  if (!isAuthenticated()) return null;

  const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
    base: '',
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const variables = {
      ...values,
      name: profile.name,
      email: profile.email,
    };

    try {
      const result = await client.mutate({
        mutation: CREATE_ACCOUNT_MUTATION,
        variables, // TODO: figure out what values to pass in
      });
      injectToken(result.data.register.token);
      // TODO: use result to update login status, and redirect to app
    } catch (error) {
      setErrors({ base: error.message });
    } finally {
      setSubmitting(false);
    }
  };

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
            <GoogleLogout
              clientId={clientId}
              buttonText="Logout"
              onLogoutSuccess={() => logout()}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item sm={2} md={3} lg={4}></Grid>
    </Grid>
  );
};

export default MailboxSetupScene;
