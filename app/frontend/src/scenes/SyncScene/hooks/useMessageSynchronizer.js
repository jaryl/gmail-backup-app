import { useReducer } from 'react';

const performSync = (token, dispatch) => {
  const params = token ? `?pageToken=${token}` : '';
  window.gapi.client.request({ path: `https://www.googleapis.com/gmail/v1/users/me/messages${params}` })
    .then((response) => {
      // TODO: perform mutation here
      dispatch({
        type: 'tick',
        payload: {
          messages: response.result.messages.length,
          nextPageToken: response.result.nextPageToken,
        },
      });
      if (!response.result.nextPageToken) {
        dispatch({ type: 'stop' });
      } else {
        performSync(response.result.nextPageToken, dispatch);
      }
    }); // TODO: add error handling here?
};

const initialState = {
  messages: 0,
  nextPageToken: null,
  status: 'pending',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'start':
      return {
        messages: 0,
        nextPageToken: null,
        status: 'started',
      };
    case 'stop':
      return {
        ...state,
        nextPageToken: null,
        status: 'stopped',
      };
    case 'tick':
      return {
        ...state,
        messages: state.messages + action.payload.messages,
        nextPageToken: action.payload.nextPageToken,
      };
    default:
      throw new Error('invalid dispatch');
  }
};

const useMessageSynchronizer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const start = () => {
    dispatch({ type: 'start' });
    performSync(null, dispatch);
  };

  return [
    state,
    start,
  ];
};

export default useMessageSynchronizer;
