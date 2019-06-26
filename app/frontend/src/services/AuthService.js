const AuthService = { // TODO: move this into an actual authentication service
  call: ({ username, password }) => {
    return new Promise((resolve, reject) => {
      if (username === 'admin' && password === '123123123') {
        resolve({ token: 'some-random-token' });
      } else {
        reject(new Error('Please check your username and password'));
      }
    });
  },
};

export default AuthService;
