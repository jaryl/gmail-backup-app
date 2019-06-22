import React from 'react';

import { Redirect } from 'react-router-dom';

import { CssBaseline, Box, Typography, FormControl, TextField, Button, Paper, Grid, Divider } from '@material-ui/core';

import { AuthContext } from '../../contexts/AuthContext';

export default function LoginScene(props) {

  const [values, setValues] = React.useState({
    name: '',
    password: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <AuthContext.Consumer>
      { ({ loggedIn, login }) => loggedIn ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        ) : (
          <Grid container>
            <Grid item sm={2} md={3} lg={4}></Grid>
            <Grid item xs={12} sm={8} md={6} lg={4}>
              <CssBaseline />
              <Paper>
                <Box p={3} mt={6}>
                  <FormControl fullWidth={true}>

                    <Typography variant="h6">Gmail Backup App </Typography>

                    <TextField
                      id="standard-name"
                      label="Name"
                      value={values.name}
                      onChange={handleChange('name')}
                      margin="normal"
                      required
                    />

                    <TextField
                      id="standard-password-input"
                      label="Password"
                      value={values.password}
                      type = "Password"
                      onChange={handleChange('password')}
                      margin="normal"
                      required
                    />

                    <Box my={3}>
                      <Divider />
                    </Box>

                    <Button variant="contained" color="primary" size="large" onClick={() => login(values)}>Login</Button>

                  </FormControl>
                </Box>
              </Paper>
            </Grid>
            <Grid item sm={2} md={3} lg={4}></Grid>
          </Grid>
        )
      }
    </AuthContext.Consumer>
   );
};
