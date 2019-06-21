import React from 'react';

import { Box, Typography, FormControl, TextField, Button, Paper, Grid, Divider } from '@material-ui/core';

export default function Login(props) {

  const [values, setValues] = React.useState({
    name: '',
    password: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    console.log(event);
  };

  return (
    <Grid container>
      <Grid item sm={2} md={3} lg={4}></Grid>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper>
          <Box p={3} mt={6}>
            <FormControl fullWidth={true}>

              <Typography variant="h6">Gmail Backup App</Typography>

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

              <Button variant="contained" color="primary" size="large" onClick={handleSubmit}>Login</Button>

            </FormControl>
          </Box>
        </Paper>
      </Grid>
      <Grid item sm={2} md={3} lg={4}></Grid>
    </Grid>
   );
};
