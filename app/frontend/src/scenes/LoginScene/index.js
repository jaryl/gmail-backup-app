import React, { useContext } from 'react';

import { Link, Redirect } from 'react-router-dom';

import {
  CssBaseline,
  Box,
  Paper,
  Grid,
  Button,
} from '@material-ui/core';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { AuthContext } from '../../hooks/AuthContext';

import InputForm from './components/InputForm';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

const LoginScene = (props) => {
  const { loggedIn, login } = useContext(AuthContext);

  const initialValues = {
    username: '',
    password: '',
    base: '',
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await login(values);
    } catch ({ message }) {
      setErrors({ base: message });
    } finally {
      setSubmitting(false);
    }
  };

  if (loggedIn) return <Redirect to={{ pathname: '/0', state: { from: props.location } }} />;

  return (
    <Grid container>
      <Grid item sm={2} md={3} lg={4}></Grid>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <CssBaseline />
        <Paper>
          <Box p={3} mt={6}>

            <Formik
              initialValues={initialValues}
              render={formikProps => <InputForm {...formikProps} />}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            />

            <hr />

            <Button variant="contained" color="secondary" component={Link} to='/setup'>Setup an Account</Button>

          </Box>
        </Paper>
      </Grid>
      <Grid item sm={2} md={3} lg={4}></Grid>
    </Grid>
  );
};

export default LoginScene;
