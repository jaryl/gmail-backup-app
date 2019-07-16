import React from 'react';

import {
  Button,
} from '@material-ui/core';

const Attachment = ({ content, type }) => {
  return (
    <React.Fragment>
      <strong>{type}</strong>
      <Button type="submit" variant="contained" color="primary" size="large">Download</Button>
    </React.Fragment>
  );
};

export default Attachment;
