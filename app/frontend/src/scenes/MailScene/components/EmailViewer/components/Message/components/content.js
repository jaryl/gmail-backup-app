import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import DOMPurify from 'dompurify';

const useStyles = makeStyles(() => ({
  paragraph: {
    wordBreak: 'break-word',
  },
}));

const Content = ({ content, type }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <strong>{type}</strong>
      {type === 'text/plain' && <p className={classes.paragraph}>{content}</p>}
      {type === 'text/html' && <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />}
    </React.Fragment>
  );
};

export default Content;
