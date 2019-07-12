const GOOGLE_API_BASE = 'https://www.googleapis.com/gmail/v1';

function GoogleApiService(client) {
  this.client = client;

  this.getAllLabels = () => {
    return client.request({ path: `${GOOGLE_API_BASE}/users/me/labels` });
  };

  this.getProfile = () => {
    return client.request({ path: `${GOOGLE_API_BASE}/users/me/profile` });
  };

  this.getAllMessage = (token) => {
    const params = token ? `?pageToken=${token}` : '';
    return client.request({ path: `${GOOGLE_API_BASE}/users/me/messages${params}` });
  };

  this.getMessage = (id) => {
    const params = '?fields=id,threadId,labelIds,historyId,internalDate,snippet,sizeEstimate';
    return client.request({ path: `${GOOGLE_API_BASE}/users/me/messages/${id}${params}` });
  };
}

export default GoogleApiService;
