import React from 'react';

import {
  CssBaseline,
  Box,
  Typography,
  Paper,
  Grid,
} from '@material-ui/core';

class MainErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
    // TODO: log error here
  }

  render() {
    if (this.state.hasError) {
      return (
        <Grid container>
           <Grid item sm={2} md={3} lg={4}></Grid>
           <Grid item xs={12} sm={8} md={6} lg={4}>
             <CssBaseline />
             <Paper>
               <Box p={3} mt={6}>
                 <Typography align="center" variant="h6">Something went wrongs</Typography>
                 <Typography align="center" variant="body1">Please refresh your browser.</Typography>
               </Box>
             </Paper>
          </Grid>
          <Grid item sm={2} md={3} lg={4}></Grid>
        </Grid>
      );
    }
    return this.props.children;
  }
}

export default MainErrorBoundary;
