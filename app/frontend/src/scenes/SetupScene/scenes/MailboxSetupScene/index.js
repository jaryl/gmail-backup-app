import React from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  CssBaseline,
  Box,
  Paper,
  Grid,
  Avatar,
  Typography,
} from '@material-ui/core';

import { GoogleLogout } from '../../../../components/GoogleButtons';

import useFormSubmission from './hooks/use-form-submission';

import InputForm from './components/form';

const SetupSchema = Yup.object().shape({
  username: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required'),
  passwordConfirmation: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
  base: '',
};

const MailboxSetupScene = () => {
  const {
    handleSubmit,
    profile,
    ready,
  } = useFormSubmission();

  if (!ready) return null; // TODO: replace with loading indicator

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
              validationSchema={SetupSchema}
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
