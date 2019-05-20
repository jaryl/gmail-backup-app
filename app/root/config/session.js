function config(app) {
  return {
    secret: 'some random secret value', // TODO: load this from .env file
    resave: false,
    saveUninitialized: false,
    cookie: { secure: app.get('env') === 'production' },
  };
}

module.exports = config;
