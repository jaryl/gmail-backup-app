import React from 'react';

import DownloadLink from 'react-download-link';

import {
  Button,
} from '@material-ui/core';

const Attachment = ({ content, type, filename }) => {
  if (!filename) return null;

  return (
    <React.Fragment>
      <DownloadLink
        label={<Button type="submit" variant="contained" color="primary" size="large">{filename}</Button>}
        filename={filename}
        exportFile={() => content}
      />
    </React.Fragment>
  );
};

export default Attachment;
