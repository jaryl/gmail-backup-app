function controller() {
  function getLogin(req, res) {
    // TODO: show template for logging in via Google OAuth 2.0
    res.send('login');
  }

  function postLogin(req, res) {
    // TODO: upon success, check if mailbox is already created
    res.send('logged in');
  }

  function deleteLogout(req, res) {
    // TODO: logut user
    res.send('logged out');
  }

  return {
    getLogin,
    postLogin,
    deleteLogout,
  };
}

module.exports = controller;
