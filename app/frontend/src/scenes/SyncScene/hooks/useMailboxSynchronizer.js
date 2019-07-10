import useMessageSynchronizer from './useMessageSynchronizer';
import useThreadSynchronizer from './useThreadSynchronizer';

const useMailboxSynchronizer = () => {
  const [messagesState, startMessage, stopMessage] = useMessageSynchronizer();
  const [threadsState, startThread, stopThread] = useThreadSynchronizer();

  const state = {
    messages: messagesState.messages,
    threads: threadsState.threads,
    status: (messagesState.status === 'started' || threadsState.status === 'started') ? 'started' : 'stopped',
  };

  const start = () => {
    startMessage();
    startThread();
  };

  const stop = () => {
    stopMessage();
    stopThread();
  };

  return [
    state,
    start,
    stop,
  ];
};

export default useMailboxSynchronizer;
