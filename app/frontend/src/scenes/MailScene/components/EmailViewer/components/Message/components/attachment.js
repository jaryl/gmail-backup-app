import React from 'react';

import DOMPurify from 'dompurify';

const Attachment = ({ content, type }) => {
  return (
    <React.Fragment>
      <strong>{type}</strong>
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
    </React.Fragment>
  );
};

export default Attachment;
