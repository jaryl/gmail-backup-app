import React, { useContext } from 'react';

import { Redirect } from 'react-router-dom';

import {
  CssBaseline,
  Box,
  Paper,
  Grid,
} from '@material-ui/core';

import { Formik } from 'formik';

import { AuthContext } from '../../contexts/AuthContext';

import InputForm from './components/InputForm';

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

  return (
    <React.Fragment>
      { loggedIn ? (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
      ) : (
          <Grid container>
            <Grid item sm={2} md={3} lg={4}></Grid>
            <Grid item xs={12} sm={8} md={6} lg={4}>
              <CssBaseline />
              <Paper>
                <Box p={3} mt={6}>
                  <Formik
                    initialValues={initialValues}
                    render={formikProps => <InputForm {...formikProps} />}
                    onSubmit={handleSubmit}
                   />
                </Box>
              </Paper>
            </Grid>
            <Grid item sm={2} md={3} lg={4}></Grid>
          </Grid>
      )
      }
    </React.Fragment>
  );
};

export default LoginScene;
