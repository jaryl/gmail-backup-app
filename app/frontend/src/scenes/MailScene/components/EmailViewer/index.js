import React from 'react';

import Thread from './components/thread';
import Message from './components/Message';

const EmailViewer = ({ thread }) => {
  const conversation = thread.messages.map(message => <Message key={message.id} message={message} />);
  const subject = thread.messages[0].snippet; // TODO: replace with actual email subject

  return (
    <React.Fragment>
      <Thread thread={thread} subject={subject} />
      {conversation}
    </React.Fragment>
  );
};

export default EmailViewer;
