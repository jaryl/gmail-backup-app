import React from 'react';

import {
  Typography,
} from '@material-ui/core';

class ListingErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // console.log(error, info);
    // TODO: log error here
  }

  render() {
    if (this.state.hasError) {
      return (
        <React.Fragment>
          <Typography align="center" variant="h6">Something went wrong</Typography>
          <Typography align="center" variant="body1">Please refresh your browser.</Typography>
        </React.Fragment>
      );
    }
    return this.props.children;
  }
}

export default ListingErrorBoundary;
