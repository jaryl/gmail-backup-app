import React from 'react';

import Thread from './components/thread';
import Message from './components/message';

const EmailViewer = ({ thread }) => {
  const conversation = thread.messages.map(message => <Message key={message.id} message={message} />);

  return (
    <React.Fragment>
      <Thread thread={thread} />
      {conversation}
    </React.Fragment>
  );
};

export default EmailViewer;
