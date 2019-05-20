function controller() {
  function getLogin(req, res) {
    // TODO: show template for logging in via Google OAuth 2.0
    res.render('./sessions/login');
  }

  function postLogin(req, res) {
    // TODO: upon success, check if mailbox is already created
    res.redirect('/mailbox');
  }

  function deleteLogout(req, res) {
    req.logout();
    res.redirect('/session');
  }

  return {
    getLogin,
    postLogin,
    deleteLogout,
  };
}

module.exports = controller;
