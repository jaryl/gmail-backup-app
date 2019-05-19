function controller() {
  function getMailbox(req, res) {
    // TODO: otherwise, display mailbox status (thread/message counts, last updated, etc)
    // res.send('mailbox data');
    res.render('mailboxes/show');
  }

  function deleteMailbox(req, res) {
    // TODO: clear mailbox data (wipe everything)
    // TODO: log user out, and redirect to /login
    res.send('mailbox deleted');
  }

  return {
    getMailbox,
    deleteMailbox,
  };
}

module.exports = controller;
