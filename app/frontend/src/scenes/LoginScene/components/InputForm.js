import React from 'react';

import { Box, Typography, TextField, Button, Divider } from '@material-ui/core';

import { Formik, Form, Field, ErrorMessage } from 'formik';

const InputForm = (props) => {
  const {
    values: { username, password },
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = props;

  return (
    <form onSubmit={handleSubmit}>

      <Typography variant="h6" align="center">Gmail Backup App</Typography>

      <TextField
        id="username"
        name="username"
        label="Username"
        helperText={touched.username ? errors.username : ""}
        error={touched.username && Boolean(errors.username)}
        value={username}
        onChange={handleChange}
        margin="normal"
        error={false}
        fullWidth
      />

      <TextField
        id="password"
        name="password"
        label="Password"
        helperText={touched.password ? errors.password : ""}
        error={touched.password && Boolean(errors.password)}
        value={password}
        onChange={handleChange}
        type = "Password"
        margin="normal"
        error={false}
        fullWidth
      />

      <ErrorMessage name="base" render={message => <Typography variant="caption" color="error">{message}</Typography>} />

      <Box my={3} children={<Divider />} />

      <Button type="submit" variant="contained" color="primary" size="large" disabled={isSubmitting}>Login</Button>

    </form>
  );
};

export default InputForm;
