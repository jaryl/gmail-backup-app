import { useReducer } from 'react';

const performSync = (token, dispatch) => {
  const params = token ? `?pageToken=${token}` : '';
  window.gapi.client.request({ path: `https://www.googleapis.com/gmail/v1/users/me/threads${params}` })
    .then((response) => {
      // TODO: perform mutation here
      dispatch({
        type: 'tick',
        payload: {
          threads: response.result.threads.length,
          nextPageToken: response.result.nextPageToken,
        },
      });
      if (!response.result.nextPageToken) {
        dispatch({ type: 'stop' });
      } else {
        performSync(response.result.nextPageToken, dispatch);
      }
    });
};

const initialState = {
  threads: 0,
  nextPageToken: null,
  status: 'stopped',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'start':
      return {
        threads: 0,
        nextPageToken: null,
        status: 'started',
      };
    case 'stop':
      return {
        threads: state.threads,
        nextPageToken: null,
        status: 'stopped',
      };
    case 'tick':
      return {
        threads: state.threads + action.payload.threads,
        nextPageToken: action.payload.nextPageToken,
        status: state.status,
      };
    default:
      throw new Error('invalid dispatch');
  }
};

const useThreadSynchronizer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const start = () => {
    dispatch({ type: 'start' });
    performSync(null, dispatch);
  };

  const stop = () => dispatch({ type: 'stop' });

  return [
    state,
    start,
    stop,
  ];
};

export default useThreadSynchronizer;
